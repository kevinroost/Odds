import { useState, useEffect } from 'react'

import * as oddsService from '../../services/oddsService'

import { deconstructCSV } from '../../CSVFunctions'

import testData from '../../data/testData'

import './Odds.css'

// components
import Event from '../../components/EventComp/EventComp'
import Bookmaker from '../../components/Bookmaker/Bookmaker'

const Odds = (
  {
    events, 
    setEvents, 
    testMode, 
    setFinalString, 
    targetEvents, 
    setTargetEvents, 
    predictions, 
    setPredictions, 
    today, 
    setToday, 
    bms, 
    desiredBms, 
    setDesiredBms,
    includeAlts,
    setIncludeAlts
  }) => {
  // const [sports, setSports] = useState([])
  const [loadingProps, setLoadingProps] = useState(false)

  
  const markets = ['player_points', 'player_points_alternate', 'player_rebounds', 'player_assists', 'player_threes', 'player_blocks', 'player_steals', 'player_turnovers'].join(',')

  //, 'player_points_alternate', 'player_rebounds', 'player_assists', 'player_threes', 'player_blocks', 'player_steals', 'player_turnovers'
  
  
  const getProps = () => {
    const fetchProps = async (eventIdArr, markets, bms) => {
      await setLoadingProps(true)
      const propsData = await oddsService.getPlayerProps(eventIdArr, markets, bms)
      setPredictions(propsData)
      setLoadingProps(false)
    }
    
    if (!testMode) {
      if (targetEvents.length > 0) {
        fetchProps(targetEvents, markets.split(','), desiredBms)
      }
    } else {
      setPredictions(events)
    }
  }
  console.log(predictions);
  
  const createString = () => {
    let result = ''
    predictions.forEach((pre) => {
      console.log(pre);
      result = result.concat('', `${deconstructCSV(pre)}`)
    })
    console.log('FINAL',result);
    setFinalString(result)
    let csvContent = "data:text/csv;charset=utf-8," 
    + result;
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "api_data.csv");
    document.body.appendChild(link); // Required for FF
    
    link.click();
  }


  useEffect(() => {

    setTargetEvents(events.map((e) => {
      return e.id
    }))
    
  }, [events, setTargetEvents])

  
  
  
  return (
    <main>
      <h1>HI MITCHELL AND HUFF</h1>
      <div>
        <button style={{border: (today?'blue solid 3px':'none')}} onClick={() => setToday(true)}>TODAY'S EVENTS</button>
        <button style={{border: (!today?'blue solid 3px':'none')}} onClick={() => setToday(false)}>ALL EVENTS</button>
      </div>
      
      <div className='check-boxes'>
        {events.map((event, i) => (
          <Event 
          event={event}
          setEvents={setEvents}
          key={i}
          targetEvents={targetEvents}
          setTargetEvents={setTargetEvents}
          />
        ))}
      </div>
      <p>ALT CHECKBOX</p>
      <h3>SELECT BOOKMAKERS</h3>
      <div className='check-boxes'>
        {bms.map((bm) => (
          <Bookmaker 
            bm={bm}
            key={bm}
            desiredBms={desiredBms}
            setDesiredBms={setDesiredBms}
            />
        ))}
      </div>
      <button onClick={() => getProps()}>FETCH PROPS</button>
  
      
      {
        predictions && predictions.length > 0
        ? 
          <>
            <p>
              Fetched props for events:
            </p>
            {/* <p>...fetching props {predictions.length} / {targetEvents.length}</p> */}
            {predictions.map((pro) => {
              return <p key={pro.id}>{`${pro.away_team} @ ${pro.home_team}`}</p>
            })}
            <button onClick={() => createString()}>CREATE STRING</button>
          </>
        
        :
            !loadingProps?<h3>NO PREDICTIONS</h3>:<h3>fetching....</h3>
      }
    </main>
  )
}

export default Odds
