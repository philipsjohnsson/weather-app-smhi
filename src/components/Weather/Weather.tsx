import React, { useEffect, useState } from 'react'
import TableWeather from '../TableWeather/TableWeather'
import './Weather.css'
import { getDate } from '../../util/forecastDateFunctions'
import { useListWithDays } from '../../contexts/WeatherContext'
import { useWeatherContext } from '../../hooks/useWeatherContext'

interface IWeatherContext {
  getForecastForEachDay: () => Array<{ time: string, timeString: string, temp: string, symbol: string[], wind: string }>
  getExtendedData: (date: string) => Array<{ time: string, timeString: string, temp: string, symbol: string[], wind: string }>
}

interface IWeatherForecast {
  time: string
  timeString: string
  temp: string
  symbol: string[]
  wind: string
}

function Weather (): JSX.Element {
  const [showTable, setShowTable] = useState<boolean>(false)
  const [showExtendedHourlyForecast, setShowExtendedHourlyForecast] = useState<boolean>(false)
  const [dateInLetters, setDateInLetters] = useState<string>('')
  const [tableListEveryDay, setTableListEveryDay] = useState<IWeatherForecast[]>([])
  const [tableHeaderEveryDay, setTableHeaderEveryDay] = useState<string[]>([])
  const [tableHeaderExtendedForecast, setTableHeaderExtendedForecast] = useState<string[]>([])
  const [
    tableListExtendedForecast,
    setTableListExtendedForecast
  ] = useState<IWeatherForecast[]>([])
  const weatherDataContext = useListWithDays() as IWeatherContext
  const useWeatherDataManagement = useWeatherContext()

  useEffect(() => {
    setShowTable(false)
    console.log(useWeatherDataManagement.getWeatherData())
    setTableListEveryDay(useWeatherDataManagement.getWeatherData())
    setTableHeaderEveryDay(['Day', 'Night', 'Morning', 'Afternoon', 'Evening', 'Temp (max / min)', 'Wind'])
  }, [weatherDataContext])

  useEffect(() => {
    setShowTable(true)
    setShowExtendedHourlyForecast(false)
  }, [tableListEveryDay])

  const callbackShowExtendedForecast = (date: string): void => {
    setShowExtendedHourlyForecast(true)
    setTableHeaderExtendedForecast(['Time', 'Weather', 'Temp.', 'Wind'])
    setTableListExtendedForecast(useWeatherDataManagement?.getExtendedDataEachHour(date))
    setDateInLetters(getDate(date))
  }

  const closeExtendedData = (): void => {
    setShowExtendedHourlyForecast(false)
  }

  return (
    <div>
      {showTable && (
        <div className="forecast-days">
          <TableWeather
            tableHeader={tableHeaderEveryDay}
            tableList={tableListEveryDay}
            callBackFunction={callbackShowExtendedForecast}
            showTrButton
          />
        </div>
      )}
      {showExtendedHourlyForecast && (
        <div className="position-handle">
          <div className="hour-container">
            <div
              className="forecast-wrapper-popup overlay"
              role="button"
              tabIndex={0}
              onClick={closeExtendedData}
              onKeyDown={closeExtendedData}
            >
              <div
                className="forecast-box popup"
                role="button"
                tabIndex={0}
                onClick={(event) => { event.stopPropagation() }}
                onKeyDown={(event) => { event.stopPropagation() }}
              >
                <div className="header-container">
                  <div className="header-text">{dateInLetters}</div>
                  <button
                    type="button"
                    onClick={closeExtendedData}
                    className="close-btn"
                  >
                    &#x78;
                  </button>
                </div>
                <div className="content-container">
                  <TableWeather
                    tableHeader={tableHeaderExtendedForecast}
                    tableList={tableListExtendedForecast}
                    callBackFunction={() => {}}
                    showTrButton={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather
