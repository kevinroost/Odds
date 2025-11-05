import './AltCheckbox.css'
import { useState } from 'react'

const AltCheckbox = ({includeAlts, setIncludeAlts}) => {
  const [isChecked, setIsChecked] = useState(includeAlts)
  // targetEvents.includes(event.id) ? true : false
  const handleCheck = () => {
    setIncludeAlts(!includeAlts)
    setIsChecked(!isChecked)
  }

  return(
    <h3 className='check-box-option'>
      <label htmlFor={'inclAlts'}><h3>4. Include Alts?</h3> </label>
      <input type="checkbox" id={'inclAlts'} name={'inclAlts'} value={'inclAlts'} onChange={() => handleCheck()} checked={isChecked} />
    </h3>
  )
}

export default AltCheckbox