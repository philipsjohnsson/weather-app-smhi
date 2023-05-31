import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Search from '../../components/Search/Search'
import Weather from '../../components/Weather/Weather'
import { useUpdateListWithDays } from '../../hooks/useListWithDays'

function Home (): JSX.Element {
  const { getData: weatherGetData, data, error, loading } = useFetch()
  const [lon, setLon] = useState(null)
  const [lat, setLat] = useState(null)
  const modifyWeatherDataContext = useUpdateListWithDays()

  useEffect(() => {
    if (data) {
      modifyWeatherDataContext?.updateWeatherData(data)
    }
  }, [data])

  useEffect(() => {
    if (lon !== null && lat !== null) {
      console.log('TEST TEST')
      weatherGetData(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
    }
  }, [lat, lon])

  return (
    <div>
      <Search setChoosenCity={{ setLat, setLon }} />
      {(loading) && <div>test test loading</div>}
      {(error) && <div>Something went wrong! Please try again</div>}
      {(data && (!error)) && <Weather />}
    </div>
  )
}

export default Home
