import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Search from '../../components/Search/Search'
import Weather from '../../components/Weather/Weather'
// import useFetch from '../../hooks/useFetch'

const Home = () => {

  const { getData, data: coordinates, error: locationError, loading: locationLoading } = useFetch()
  const { getData: weatherGetData, data: weatherData, error, loading: weatherLoading } = useFetch()
  const [showButtons, setShowButtons] = useState(true)
  
  useEffect(() => {
    console.log('We are inside of use effect')
    setShowButtons(true)
  }, [coordinates])

  useEffect(() => {
    console.log('USE EFFECT data changed: ')
    console.log(weatherData)
  }, [weatherData])

  const specificPlacedPicked = (event) => {
    event.preventDefault()
    // globalData.updateLocation(objLatitudeLongitude)

    weatherGetData(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${event.currentTarget.value}/lat/${event.currentTarget.name}/data.json`)
    
    setShowButtons(false)
  }

  return (
      <div>
        <Search getData={getData} />
        {locationLoading && <div>test test loading</div>}
        {locationError && <div>Something went wrong!</div>}
        {/* {data && <InfoSpecficPlace dataLocation={data} />} */}
        {(coordinates && showButtons) && coordinates.data.map((obj) => (
            <button className="btn-info-specific-place" onClick={specificPlacedPicked} name={obj.latitude} value={obj.longitude} >
              <div>{obj.name}</div>
              <div>{obj.country}, {obj.region}</div>
            </button>
          ))}
        {weatherData && <Weather weatherData={weatherData} />}
      </div>
    )
}

export default Home;