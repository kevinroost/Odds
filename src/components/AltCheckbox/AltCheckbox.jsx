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
    <h3>
      <input type="checkbox" id={'inclAlts'} name={'inclAlts'} value={'inclAlts'} onChange={() => handleCheck()} checked={isChecked} />
      <label htmlFor={'inclAlts'}>Include Alts?</label>
    </h3>
  )
}

export default AltCheckbox