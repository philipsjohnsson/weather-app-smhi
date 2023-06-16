import React, { useRef, useState, useEffect } from 'react'
import './Search.css'
import Dropdown from '../Dropdown/Dropdown'
import useFetch from '../../hooks/useFetch'
import useComponentVisible from '../../hooks/useComponentVisible'

interface ISetChoosenCity {
  setLat?: React.Dispatch<React.SetStateAction<string | null>>
  setLon?: React.Dispatch<React.SetStateAction<string | null>>
}

interface SearchProps extends ISetChoosenCity {
  setChoosenCity: ISetChoosenCity
}

function Search ({ setChoosenCity }: SearchProps): JSX.Element {
  const inputSearch = useRef<HTMLInputElement>(null)
  const { setData, data, error, loading } = useFetch()
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible()
  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
    console.log(data)
    if (data !== null) {
      setIsComponentVisible(true)
    } else {
      setIsComponentVisible(false)
    }
  }, [data])

  useEffect(() => {
    const fetchTheSearchInput = async (input: string): Promise<void> => {
      await setCitiesOptions(input)
    }

    if (searchInput.length > 2) {
      void fetchTheSearchInput(searchInput)
    }
  }, [searchInput])

  const setCitiesOptions = async (userInput: string): Promise<void> => {
    try {
      if (process.env.REACT_APP_API_KEY_POSITIONSTACK !== undefined) {
        await setData(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_API_KEY_POSITIONSTACK}&query=${userInput}`)
        setIsComponentVisible(true)
      }
    } catch (err) {
      setIsComponentVisible(false)
    }
  }

  const delaySetSearchInput = (): (() => void) | undefined => {
    if (inputSearch.current !== null && inputSearch.current.value.trim().length > 2) {
      const timerSearch = setTimeout(() => {
        if (inputSearch.current !== null) {
          setSearchInput(inputSearch.current.value.trim())
        }
      }, 500)

      return () => { clearTimeout(timerSearch) }
    }
  }

  const callbackDropdownOptionPressed = (coordinates: string[]): void => {
    setIsComponentVisible(false)

    if (((setChoosenCity?.setLat) != null) && ((setChoosenCity?.setLon) != null)) {
      setChoosenCity.setLat(coordinates[0])
      setChoosenCity.setLon(coordinates[1])
    }
    if (inputSearch.current !== null) {
      inputSearch.current.value = ''
    }
  }

  const showDropDown = (): void => {
    if (inputSearch.current !== null && inputSearch.current.value.length > 2) {
      setIsComponentVisible(true)
    } else {
      setIsComponentVisible(false)
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
          onKeyUp={delaySetSearchInput}
          onMouseDown={showDropDown}
        />
      </div>
      <div ref={ref}>
        {((Boolean(data)) && isComponentVisible) &&
            <Dropdown options={{ data, loading, error }} callbackDropdownOptionPressed={callbackDropdownOptionPressed}
          />}
      </div>
    </div>
  )
}

export default Search
