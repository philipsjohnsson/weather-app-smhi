import React, { useRef, useState, useEffect } from 'react'
import './Search.css'
import Dropdown from '../Dropdown/Dropdown'
import useFetch from '../../hooks/useFetch'
import useComponentVisible from '../../hooks/useComponentVisible'
// import useDelayTime from '../../hooks/useDelayTime'

function Search ({ setChoosenCity }): JSX.Element {
  const inputSearch = useRef<HTMLInputElement>(null)
  const { setData, data, error, loading } = useFetch()
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible()
  const [delayTime, setDelayTime] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => () => {
    if (delayTime !== null) {
      clearTimeout(delayTime)
    }
  }, [delayTime])

  const btnSearch = async (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (inputSearch.current !== null && inputSearch.current.value.trim().length > 2) {
      if ('key' in event && event.key === 'Enter') {
        event.preventDefault()

        await fetchData(inputSearch.current.value.trim())
        inputSearch.current.value = ''
      } else {
        if (delayTime !== null) {
          clearTimeout(delayTime)
        }

        const timer = setTimeout(() => {
          if (inputSearch.current !== null && inputSearch.current.value.trim().length > 2) {
            fetchData(inputSearch.current.value.trim())
              .catch(() => {
                // Handle the error
                setIsComponentVisible(false)
              })
          }
        }, 200)

        setDelayTime(timer)
      }
    } else {
      setIsComponentVisible(false)
    }
  }

  const showInputField = (): void => {
    if (inputSearch.current !== null && inputSearch.current.value.length > 2) {
      setIsComponentVisible(true)
    } else {
      setIsComponentVisible(false)
    }
  }

  const fetchData = async (userInput: string): Promise<void> => {
    if (process.env.REACT_APP_API_KEY_POSITIONSTACK !== undefined) {
      try {
        await setData(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_API_KEY_POSITIONSTACK}&query=${userInput}`)
        console.log(data)
        setIsComponentVisible(true)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const callbackDropdownOptionPressed = (coordinates: string[]): void => {
    console.log('is it visible')
    setIsComponentVisible(false)
    setChoosenCity.setLat(coordinates[0])
    setChoosenCity.setLon(coordinates[1])
    if (inputSearch.current != null) {
      inputSearch.current.value = ''
    }
  }

  return (
    <div className="search-container">
      <div>
        <input
          className="input-field"
          type="text"
          ref={inputSearch}
          required
          placeholder="Search for a city in Sweden"
          onKeyDown={btnSearch}
          onMouseDown={showInputField} />
      </div>
      <div ref={ref}>
        {(data && isComponentVisible) &&
          <Dropdown
            options={{ data, loading, error }}
            callbackDropdownOptionPressed={callbackDropdownOptionPressed} 
          />}
      </div>
    </div>
  )
}

export default Search
