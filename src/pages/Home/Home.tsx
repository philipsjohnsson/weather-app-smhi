import React, { useEffect, useState } from 'react'
import Search from '../../components/Search/Search'
import Weather from '../../components/Weather/Weather'
import { useWeatherContext } from '../../hooks/useWeatherContext'
import './Home.css'

function Home (): JSX.Element {
  const [lon, setLon] = useState<string | null>(null)
  const [lat, setLat] = useState<string | null>(null)
  const useWeatherDataManagement = useWeatherContext()

  useEffect(() => {
    if (lon !== null && lat !== null) {
      void useWeatherDataManagement
        .setWeatherData(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
    }
  }, [lat, lon])

  return (
    <div className="container">
      <Search setChoosenCity={{ setLat, setLon }} />
      {(useWeatherDataManagement.loading) && <div>test test loading</div>}
      {(useWeatherDataManagement.error) && <div>Something went wrong! Please try again</div>}
      {((Boolean(useWeatherDataManagement.data)) && (!useWeatherDataManagement.error)) && <Weather />}
    </div>
  )
}

export default Home
