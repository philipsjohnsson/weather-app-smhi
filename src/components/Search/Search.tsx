import React, { useRef, useState, useEffect } from 'react'
import './Search.css'
import Dropdown from '../Dropdown/Dropdown'
import useFetch from '../../hooks/useFetch'
import useComponentVisible from '../../hooks/useComponentVisible'
import useDelayTime from '../../hooks/useDelayTime'

function Search ({ setChoosenCity }): JSX.Element {
  const inputSearch = useRef<HTMLInputElement>(null)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)
  const { getData, data, error, loading } = useFetch()
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible()
  const delayTime = useDelayTime(200)

  useEffect(() => () => {
    clearTimeout(debounceTimer)
  }, [debounceTimer])

  const btnSearch = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>): void => {
    if ('key' in event && event.key === 'Enter' && inputSearch.current !== null) {
      event.preventDefault()

      void fetchData(inputSearch.current.value.trim())
      inputSearch.current.value = ''
    } else {
      clearTimeout(debounceTimer)

      const timer = setTimeout(() => {
        if (inputSearch.current !== null && inputSearch.current !== undefined) {
          void fetchData(inputSearch.current.value.trim())
        }
      }, 200)

      setDebounceTimer(timer)
    }

    /* if ('key' in event && event.key === 'Enter') {
      event.preventDefault();
      delayTime(fetchData, inputSearch.current.value.trim());
      inputSearch.current.value = '';
    } else {
      delayTime(fetchData, inputSearch.current.value.trim());
    } */
  }

  const showInputField = (): void => {
    if (inputSearch.current !== null && inputSearch.current.value.length > 2) {
      setIsComponentVisible(true)
    } else {
      setIsComponentVisible(false)
    }
  }

  const fetchData = async (userInput: string): Promise<void> => {
    if (userInput.length > 2 && (process.env.API_POSS !== undefined &&
      process.env.REACT_APP_API_KEY_POSITIONSTACK !== undefined)) {
      await getData(`${process.env.API_POSS}?access_key=${process.env.REACT_APP_API_KEY_POSITIONSTACK}&query=${userInput}`)

      setIsComponentVisible(true)
    }
  }

  const callbackDropdownOptionPressed = (coordinates: string): void => {
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
        type="text" ref={inputSearch}
        required
        placeholder="Search for a city in Sweden"
        onKeyDown={btnSearch}
        onMouseDown={showInputField} />
      </div>
      <div ref={ref}>
        {data && isComponentVisible &&
        <Dropdown options={{ data, loading, error }} callbackDropdownOptionPressed={callbackDropdownOptionPressed} />}
      </div>
    </div>
  )
}

export default Search
