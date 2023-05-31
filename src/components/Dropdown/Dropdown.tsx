import React from 'react'
import './Dropdown.css'
// import useComponentVisible from '../../hooks/useComponentVisible'
import { type DropDownProps } from './DropDownProps'

function Dropdown ({ options, callbackDropdownOptionPressed }: DropDownProps): JSX.Element {
  const pressedOption = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.currentTarget.dataset.coordinates !== undefined) {
      callbackDropdownOptionPressed(event.currentTarget.dataset.coordinates.split('-'))
    }
  }

  return (
    <div className="dropdown-container">
      <div className="dropdown">
        {options.loading && <div className="dropdown-option">
          <div className="dropdown-option-text">Loading...</div>
        </div>}
        {options.error && <div className="dropdown-option">Something went wrong</div>}
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
              <div>
                {obj.region}
                ,
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
