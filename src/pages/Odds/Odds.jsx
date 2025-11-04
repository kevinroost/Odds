import { useState, useEffect } from 'react'

import * as oddsService from '../../services/oddsService'

import { deconstructCSV } from '../../CSVFunctions'

import './Odds.css'

// components
import Event from '../../components/EventComp/EventComp'
import Bookmaker from '../../components/Bookmaker/Bookmaker'
import AltCheckbox from '../../components/AltCheckbox/AltCheckbox'


const Odds = (
  {
    events, 
    setEvents, 
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
    setIncludeAlts,
    alts,
    testMode, 
    sport
  }) => {
  // const [sports, setSports] = useState([])
  const [loadingProps, setLoadingProps] = useState(false)

  const markets = {
    'basketball': [
      'player_points', 
      'player_rebounds', 
      'player_assists', 
      'player_threes', 
      'player_blocks', 
      'player_steals', 
      'player_turnovers'
    ],
    'football': [
      'player_pass_attempts',
      'player_pass_completions',
      'player_pass_interceptions',
      'player_pass_tds',
      'player_pass_yds',
      'player_receptions',
      'player_reception_tds',
      'player_reception_yds',
      'player_rush_tds',
      'player_rush_yds',
      'player_rush_attempts',
      // 'player_assists',
      // 'player_pass_longest_completion',
      // 'player_reception_longest',
      // 'player_rush_longest',
      // 'player_rush_reception_yds',
      // 'player_sacks',
      // 'player_tds_over',
      // 'player_1st_td',
      // 'player_anytime_td',
      // 'player_last_td'
    ]
  }

  
  const getProps = () => {
    const fetchProps = async (eventIdArr, markets, bms) => {
      await setLoadingProps(true)
      const propsData = await oddsService.getPlayerProps(eventIdArr, markets, bms, includeAlts, alts[sport])
      setPredictions(propsData)
      setLoadingProps(false)
    }
    
    if (!testMode) {
      if (targetEvents.length > 0) {
        fetchProps(targetEvents, markets[sport], desiredBms)
      }
    } else {
      setPredictions(events)
    }
  }
  
  const createString = () => {
    let result = ''
    predictions.resArr.forEach((pre) => {
      result = result.concat('', `${deconstructCSV(pre, sport)}`)
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
      <section className='flex-row'>
        <section className='option'>
          <h3><span>1. </span> SELECT EVENTS</h3>
          <h3>
            <button style={{border: (today?'rgb(79, 130, 251) solid 3px':'none')}} onClick={() => setToday(true)}>TODAY'S EVENTS</button>
            <button style={{border: (!today?'rgb(79, 130, 251) solid 3px':'none')}} onClick={() => setToday(false)}>ALL EVENTS</button>
          </h3>
          <h3>
            <button onClick={() => setTargetEvents(events.map((e) => {return e.id}))}>SELECT ALL</button>
            <button onClick={() => setTargetEvents([])}>DESELECT ALL</button>
          </h3>
        
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
        </section>

        <section className='option'>
          <h3><span>2. </span> SELECT BOOKMAKERS</h3>
          <h3>
            <button onClick={() => setDesiredBms(bms)}>SELECT ALL</button>
            <button onClick={() => setDesiredBms([])}>DESELECT ALL</button>
          </h3>
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
        </section>
      </section>
      <div className='flex-row'>
        <AltCheckbox includeAlts={includeAlts} setIncludeAlts={setIncludeAlts}/>
      </div>
      <div className='check-box-option'>
        <h3>4. </h3> <button onClick={() => getProps()}>FETCH PROPS</button>
      </div>
      
      {
        predictions.resArr.length > 0
        ? 
          <>
            <h4>{`Remaining Requests: ${predictions.remainingRequests}`}</h4>
            <p>
              Fetched props for events:
            </p>
            {predictions.resArr.map((pro, i) => {
              return <p key={i}>{`${pro.away_team} @ ${pro.home_team}`}</p>
            })}
            <span>5. </span> <button onClick={() => createString()}>CREATE STRING</button>
          </>
        :
            !loadingProps?<h3>NO PREDICTIONS</h3>:<h3>fetching....</h3>
      }
    </main>
  )
}

export default Odds
