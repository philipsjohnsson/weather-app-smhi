import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Search from '../../components/Search/Search'
import Weather from '../../components/Weather/Weather'
import { useUpdateListWithDays } from '../../hooks/useListWithDays'

const Home = () => {

  const { getData: weatherGetData, data: weatherData, error: weatherError, loading: weatherLoading } = useFetch()
  const [lon, setLon] = useState(null)
  const [lat, setLat] = useState(null)
  const modifyWeatherDataContext = useUpdateListWithDays()

  useEffect(() => {
    console.log('USE EFFECT data changed: ')
    console.log(weatherData)
    if(weatherData) {
      console.log(weatherData)
      modifyWeatherDataContext?.updateWeatherData(weatherData)
    }
  }, [weatherData])

  useEffect(() => {
    if (!lat || !lon) {
      return
    } else {
      weatherGetData(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon])

  return (
    <div>
      <Search setChoosenCity={{ setLat, setLon }} />
      {(weatherLoading) && <div>test test loading</div>}
      {(weatherError) && <div>Something went wrong! Please try again</div>}
      {(weatherData && (!weatherError)) && <Weather />}
    </div>
  )
}

export default Home;