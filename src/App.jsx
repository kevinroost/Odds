// npm modules
import { useEffect, useState } from 'react'
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
  const [finalString, setFinalString] = useState([])

  const testMode = false

  // const navigate = useNavigate()

  // const handleLogout = () => {
  //   authService.logout()
  //   setUser(null)
  //   navigate('/')
  // }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
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
  // }, [testMode])


  return (
    <>
      {/* <NavBar user={user} handleLogout={() => handleLogout()} /> */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Odds 
              testData={testData}
              testMode={testMode}
              events={events}
              setEvents={setEvents}
              finalString={finalString}
              setFinalString={setFinalString}
              targetEvents={targetEvents}
              setTargetEvents={setTargetEvents}
              // fetchEvents={fetchEvents}
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
