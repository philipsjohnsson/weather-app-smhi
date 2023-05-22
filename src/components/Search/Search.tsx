import { useRef, useState, useEffect } from 'react'
import './Search.css'
import Dropdown from '../Dropdown/Dropdown'
import useFetch from '../../hooks/useFetch'
import useComponentVisible from '../../hooks/useComponentVisible'
import useDelayTime from '../../hooks/useDelayTime'

const Search = ({ setChoosenCity }) => {
  const inputSearch = useRef<HTMLInputElement | null>(null)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)
  const { getData, data, error, loading } = useFetch()
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible()
  const delayTime = useDelayTime(200)

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer)
    }
  }, [debounceTimer])

  const btnSearch = async (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    console.log('input pressed')
    if (!inputSearch.current) {
      return
    }

    if ('key' in event && event.key === 'Enter') {
      event.preventDefault()
      fetchData(inputSearch.current.value.trim())
      inputSearch.current.value = ''
    } else {
      clearTimeout(debounceTimer)

      const timer = setTimeout(() => {
        fetchData(inputSearch.current.value.trim())
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

  const showInputField = () => {
    if(inputSearch.current.value.length > 2) {
      setIsComponentVisible(true)
    }
  }

  const fetchData = async (userInput) => {
    if (userInput.length > 2) {
      getData(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_API_KEY_POSITIONSTACK}&query=${userInput}`)
      
      setIsComponentVisible(true)
    }
  }

  const callbackDropdownOptionPressed = (coordinates: string) => {
    setIsComponentVisible(false)
    setChoosenCity.setLat(coordinates[0])
    setChoosenCity.setLon(coordinates[1])
    if (inputSearch.current) {
      inputSearch.current.value = ''
    }
  }

  return (
    <div className="search-container">
      <div>
        <input className="input-field" type="text" ref={inputSearch} required placeholder="Search for a city in Sweden" onKeyDown={btnSearch} onMouseDown={showInputField} />
      </div>
      <div ref={ref}>
        {data && isComponentVisible && <Dropdown options={{ data, loading, error }} callbackDropdownOptionPressed={callbackDropdownOptionPressed} />}
      </div>
    </div>
  )
}

export default Search;
