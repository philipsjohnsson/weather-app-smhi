import { useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
// import useFetch from '../../hooks/useFetch'

const Search = ({ getData }) => {

  const inputSearch = useRef<HTMLInputElement | null>(null)

  const btnSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(inputSearch)
    if(inputSearch) {
      getData(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_API_KEY_POSITIONSTACK}&query=${inputSearch.current.value}`)
    }
  }

  return (
    <div>
      <form onSubmit={btnSearch} >
        <input type="text" ref={inputSearch} required minLength={2} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Search;