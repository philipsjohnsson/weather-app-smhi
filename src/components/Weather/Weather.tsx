import { useEffect, useState } from "react";
import TableWeather from "../TableWeather/TableWeather";
import './Weather.css'
import { getDate } from '../../util/helpDateFunctions'
import { useListWithDays } from '../../hooks/useListWithDays'
import { useUpdateListWithDays } from "../../hooks/useListWithDays"

const Weather = () => {
  const [showTable, setShowTable] = useState<boolean>(false)
  const [showExtendedHourlyForecast, setShowExtendedHourlyForecast] = useState<boolean>(false)
  const [dateInLetters, setDateInLetters] = useState<String>("")
  const [tableListEveryDay, setTableListEveryDay] = useState<Array<any>>([])
  const [tableHeaderEveryDay, setTableHeaderEveryDay] = useState<Array<string>>([])
  const [tableHeaderExtendedForecast, setTableHeaderExtendedForecast] = useState<Array<string>>([])
  const [tableListExtendedForecast, setTableListExtendedForecast] = useState<Array<string> | null>([])
  // const modifyWeatherDataContext = useUpdateListWithDays()
  const weatherDataContext = useListWithDays()

  useEffect(() => {
    setShowTable(false)
    setTableListEveryDay(weatherDataContext.getForecastForEachDay())
    console.log(weatherDataContext.getForecastForEachDay())
    setTableHeaderEveryDay(["Day", "Night", "Morning", "Afternoon", "Evening", "Temp (max / min)", "wind"])
  }, [weatherDataContext])

  useEffect(() => {
    setShowTable(true)
    setShowExtendedHourlyForecast(false)
  }, [tableListEveryDay])

  const callbackShowExtendedForecast = (date: string) => {
    setShowExtendedHourlyForecast(true)
    setTableHeaderExtendedForecast(["Tid", "Väder", "Temp.", "vind"])
    setTableListExtendedForecast(weatherDataContext?.getExtendedData(date))
    setDateInLetters(getDate(date))
  }

  const closeExtendedData = (event) => {
    setShowExtendedHourlyForecast(false)
  }

  return (
    <div>
      {showTable && <div className="forecast-days">
        <TableWeather 
          tableHeader={tableHeaderEveryDay} 
          tableList={tableListEveryDay} 
          callBackFunction={callbackShowExtendedForecast} 
          showTrButton={true} 
        />
      </div>}
      {showExtendedHourlyForecast && <div className="position-handle">
        <div className="hour-container">
          <div className="forecast-wrapper-popup overlay" onClick={closeExtendedData}>
            <div className="forecast-box popup" onClick={(event) => { event.stopPropagation() }}>
              <div className="header-container">
                <div className="header-text">{dateInLetters}</div>
                <button 
                  onClick={closeExtendedData} 
                  className="close-btn">&#x78;
                </button>
              </div>
              <div className="content-container">
                <TableWeather 
                  tableHeader={tableHeaderExtendedForecast} 
                  tableList={tableListExtendedForecast} 
                  callBackFunction="" 
                  showTrButton={false} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Weather;