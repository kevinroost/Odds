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

  
  const markets = ['player_points_alternate', 'player_points', 'player_rebounds', 'player_assists', 'player_threes', 'player_blocks', 'player_steals', 'player_turnovers'].join(',')
  
  
  const getEvents = async () => {
    console.log(events);
    console.log(targetEvents);
    if (!testMode) {
      
      const fetchEvents = async () => {
        setEvents([])
        setTargetEvents([])
        const eventData = await oddsService.getEvents()
        setEvents(eventData)
      }
      fetchEvents()
      // fetchPropsFromEventID()
    } else {
      setEvents(testData)
    }  
    setTargetEvents(events.map ((e) => {
      return e.id
    }))
  }
  
  
  // useEffect(() => {
  //   if (!testMode) {
      
  //     const fetchEvents = async () => {
  //       const eventData = await oddsService.getEvents()
  //       setEvents(eventData)
  //     }
  //     fetchEvents()
  //     // fetchPropsFromEventID()
  //   } else {
  //     setEvents(testData)
  //   }  
  //   setTargetEvents(events.map ((e) => {
  //     return e.id
  //   }))
  //   console.log('TARGET', targetEvents);
  // }, [events])


  const getProps = () => {
    const fetchProps = async (eventIdArr, markets) => {
      const propsData = await oddsService.getPlayerProps(eventIdArr, markets)
      setPredictions(propsData)
    }
    if (!testMode) {
      if (targetEvents.length > 0) {
          fetchProps(targetEvents.slice(0, 1), markets.split(',')[0])
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
    // let csvContent = "data:text/csv;charset=utf-8," 
    // + result;
    // var encodedUri = encodeURI(csvContent);
    // var link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "api_data.csv");
    // document.body.appendChild(link); // Required for FF
    
    // link.click();
  }
  
  
  return (
    <main>
      <h1>HI MITCHELL AND HUFF</h1>
      <div>
        <button onClick={() => getEvents()}>GIMME EVENTS</button>
      </div>
      {
        events
        ?
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
          <button onClick={() => getProps()}>FETCH PROPS</button>
        </div>
        
        :
        <p>...loading</p>
      }
      {
        predictions && predictions.length > 0
        ? 
        <>
          <p>
            Fetched props for events:
          </p>
          {predictions.map((pro) => {
            console.log('iddddd', pro);
            return <p key={pro.id}>{pro.id}</p>
          })}
          <button onClick={() => createString()}>CREATE STRING</button>
        </>
          :
        <h3>NO PREDICTIONS</h3>
      }
    </main>
  )
}

export default Odds
