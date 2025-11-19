// npm modules
import { useEffect, useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'

import * as oddsService from './services/oddsService'

//data
import testData from './data/testData'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import Odds from './pages/Odds/Odds'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [events, setEvents] = useState([])
  const [targetEvents, setTargetEvents] = useState([])
  const bms = [
    'ballybet', 
    'betmgm', 
    'betonlineag', 
    'betrivers', 
    'betus', 
    'bovada', 
    'draftkings', 
    'fanduel', 
    'lowvig', 
    'mybookieag', 
    'williamhill_us'
  ]
  const [desiredBms, setDesiredBms] = useState(['fanduel', 'williamhill_us'])
  const [finalString, setFinalString] = useState([])
  const [predictions, setPredictions] = useState({status: 999, resArr: [], remainingRequests: 0})
  const [today, setToday] = useState(true)
  const [includeAlts, setIncludeAlts] = useState(true)
  const [sport, setSport] = useState('basketball_nba')


  const testMode = false

  const alts = {
    'americanfootball_nfl': [
      ',player_pass_attempts_alternate' +
      ',player_pass_completions_alternate' +
      ',player_pass_interceptions_alternate' +
      ',player_pass_tds_alternate' +
      ',player_pass_yds_alternate' +
      ',player_receptions_alternate' +
      ',player_reception_tds_alternate' +
      ',player_reception_yds_alternate' +
      ',player_rush_tds_alternate' +
      ',player_rush_yds_alternate' +
      ',player_rush_attempts_alternate'
    ],
    'basketball_nba': [
      ',player_points_alternate'
    ]
  }

  // const navigate = useNavigate()

  // const handleLogout = () => {
  //   authService.logout()
  //   setUser(null)
  //   navigate('/')
  // }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const reset = () => {
    setEvents([])
    setTargetEvents([])
    setPredictions({status: 999, resArr: []})
  }

  const getEvents = useCallback(async () => {

    if (!testMode) {
      
      const fetchEvents = async () => {
        await reset()
        const eventData = await oddsService.getEvents(today, sport)
        setEvents(eventData)
      }
      await fetchEvents()
      // fetchPropsFromEventID()
    } else {
      await setEvents(testData)
    }  
  }, [testMode, today, sport])

  useEffect(() => {
    getEvents()
  }, [getEvents])

  return (
    <>
      {/* <NavBar user={user} handleLogout={() => handleLogout()} /> */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Odds 
              today={today}
              setToday={setToday}
              testData={testData}
              events={events}
              setEvents={setEvents}
              bms={bms}
              desiredBms={desiredBms}
              setDesiredBms={setDesiredBms}
              getEvents={getEvents}
              finalString={finalString}
              setFinalString={setFinalString}
              targetEvents={targetEvents}
              setTargetEvents={setTargetEvents}
              predictions={predictions}
              setPredictions={setPredictions}
              reset={reset}
              includeAlts={includeAlts}
              setIncludeAlts={setIncludeAlts}
              alts={alts}
              // fetchEvents={fetchEvents}
              testMode={testMode}
              sport={sport}
              setSport={setSport}
              />
          } 
          />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
