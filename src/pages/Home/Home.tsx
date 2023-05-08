import { useRef, useState } from 'react'
import Search from '../../components/Search/Search'
import useFetch from '../../hooks/useFetch'
// import useFetch from '../../hooks/useFetch'

const Home = () => {
  const { getData, fetchedData, error, loading } = useFetch()

  const setLocation = (event) => {
    
  }

  return (
      <div>
        <Search getData={getData} />
        
        <div>
        {fetchedData && fetchedData.map((obj) => (
            <button onClick={setLocation}>test</button>
          ))}
      </div>
      </div>
    )
}

export default Home;