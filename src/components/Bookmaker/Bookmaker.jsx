import './Bookmaker.css'
import { useEffect, useState } from 'react'

const Bookmaker = ({bm, desiredBms, setDesiredBms}) => {
  const [isChecked, setIsChecked] = useState(desiredBms.includes(bm)?true:false)
  // targetEvents.includes(event.id) ? true : false
  const handleCheck = () => {
    isChecked ?
    setDesiredBms(desiredBms.filter((b) => bm!==b)):
    setDesiredBms([...desiredBms, bm])
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    setIsChecked(desiredBms.includes(bm)?true:false)
  }, [desiredBms, bm])

  return(
    <div className="check-box-option">
      <input type="checkbox" id={bm} name={bm} value={bm} onChange={() => handleCheck()} checked={isChecked} />
      <label htmlFor={bm}>{`${bm}`}</label>
    </div>
  )
}

export default Bookmaker