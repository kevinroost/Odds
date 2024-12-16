import './EventComp.css'
import { useState } from 'react'

const Event = ({event, targetEvents, setTargetEvents}) => {
  const [isChecked, setIsChecked] = useState(true)
  // targetEvents.includes(event.id) ? true : false
  const handleCheck = () => {
    isChecked ?
    setTargetEvents(targetEvents.filter((e) => e!==event.id)):
    setTargetEvents([...targetEvents, event.id])
    setIsChecked(!isChecked)
    console.log(targetEvents);
  }

  return(
    <div className="check-box-option">
      <input type="checkbox" id={event.id} name={event.id} value={event.id} onChange={() => handleCheck()} checked={isChecked} />
      <label htmlFor={event.id}>{`${event.away_team} @ ${event.home_team}`}</label>
    </div>
  )
}

export default Event