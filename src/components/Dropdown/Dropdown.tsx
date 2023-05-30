import React, { useEffect } from 'react'
import './Dropdown.css'
import useComponentVisible from '../../hooks/useComponentVisible'

function Dropdown ({ options, callbackDropdownOptionPressed }): JSX.Element {
  useEffect(() => {
    console.log(options)
  }, [options])

  const pressedOption = (event): void => {
    callbackDropdownOptionPressed(event.currentTarget.dataset.coordinates.split('-'))
  }

  return (
    <div className="dropdown-container">
      <div className="dropdown">
        {options.loading && <div className="dropdown-option">
          <div className="dropdown-option-text">Loading...</div>
        </div>}
        {options.error && <div className="dropdown-option">error</div>}
        {options.data?.data.map((obj, i) => (
          <div
            className="dropdown-option"
            key={i}
            onClick={pressedOption}
            data-coordinates={`${obj.latitude}-${obj.longitude}`}
          >
            <div className="dropdown-option-text">
              <div>{obj.name}</div>
              ,
              {' '}
              <div>
                {obj.region}
                ,
                {' '}
                {obj.country}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
