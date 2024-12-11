import { useState, useEffect } from 'react'

import * as oddsService from '../../services/oddsService'

import { deconstructCSV } from '../../CSVFunctions'

import testData from '../../data/testData'

import './Odds.css'

// components
import EventOdds from '../../components/EventOdds/EventOdds'

const Odds = ({events, setEvents, testMode, setFinalString, targetEvents, setTargetEvents, fetchProps}) => {
  // const [sports, setSports] = useState([])
  const [predictions, setPredictions] = useState([])
  const [loadingProps, setLoadingProps] = useState(false)

  
  const markets = ['player_points_alternate', 'player_points', 'player_rebounds', 'player_assists', 'player_threes', 'player_blocks', 'player_steals', 'player_turnovers'].join(',')
  
  const reset = () => {
    setEvents([])
    setTargetEvents([])
    setPredictions([])
  }
  
  const getEvents = async () => {

    if (!testMode) {
      
      const fetchEvents = async () => {
        await reset()
        const eventData = await oddsService.getEvents()
        setEvents(eventData)
      }
      await fetchEvents()
      // fetchPropsFromEventID()
    } else {
      await setEvents(testData)
    }  
  }
  
  
  useEffect(() => {

    setTargetEvents(events.map ((e) => {
      return e.id
    }))
    
  }, [events, setTargetEvents])

  const getProps = () => {
    const fetchProps = async (eventIdArr, markets) => {
      await setLoadingProps(true)
      const propsData = await oddsService.getPlayerProps(eventIdArr, markets)
      setPredictions(propsData)
      setLoadingProps(false)
    }
    
    if (!testMode) {
      if (targetEvents.length > 0) {
        fetchProps(targetEvents, markets.split(','))
      }
    } else {
      setPredictions(events)
    }
  }
  
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
  
  
  return (
    <main>
      <h1>HI MITCHELL AND HUFF</h1>
      <div>
        <button onClick={() => getEvents()}>GIMME EVENTS</button>
      </div>
      <div>
        <button onClick={() => reset()}>RESET</button>
      </div>
      
      <div className='check-boxes'>
        {events.map((event, i) => (
          <EventOdds 
            event={event}
            events={events}
            setEvents={setEvents}
            key={i}
            targetEvents={targetEvents}
            setTargetEvents={setTargetEvents}
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
              return <>
                <p key={pro.id}>{pro.id}</p>
              </>
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
