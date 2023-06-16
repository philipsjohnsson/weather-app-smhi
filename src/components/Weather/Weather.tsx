import React, { useEffect, useState } from 'react'
import TableWeather from '../TableWeather/TableWeather'
import './Weather.css'
import { getDate } from '../../util/forecastDateFunctions'
import { useListWithDays } from '../../contexts/WeatherContext'
import { useWeatherData } from '../../hooks/useWeatherData'

interface IWeatherContext {
  getForecastForEachDay: () => Array<{ time: string, timeString: string, temp: string, symbol: string[] }>
  getExtendedData: (date: string) => Array<{ time: string, timeString: string, temp: string, symbol: string[] }>
}

function Weather (): JSX.Element {
  const [showTable, setShowTable] = useState<boolean>(false)
  const [showExtendedHourlyForecast, setShowExtendedHourlyForecast] = useState<boolean>(false)
  const [dateInLetters, setDateInLetters] = useState<string>('')
  const [tableListEveryDay, setTableListEveryDay] = useState<Array<{ time: string, timeString: string, temp: string, symbol: string[] }>>([])
  const [tableHeaderEveryDay, setTableHeaderEveryDay] = useState<string[]>([])
  const [tableHeaderExtendedForecast, setTableHeaderExtendedForecast] = useState<string[]>([])
  const [
    tableListExtendedForecast,
    setTableListExtendedForecast
  ] = useState<Array<{ time: string, timeString: string, temp: string, symbol: string[] }>>([])
  const weatherDataContext = useListWithDays() as IWeatherContext
  const useWeatherDataManagement = useWeatherData()

  useEffect(() => {
    setShowTable(false)
    setTableListEveryDay(useWeatherDataManagement.getWeatherData())
    setTableHeaderEveryDay(['Day', 'Night', 'Morning', 'Afternoon', 'Evening', 'Temp (max / min)', 'wind'])
  }, [weatherDataContext])

  useEffect(() => {
    setShowTable(true)
    setShowExtendedHourlyForecast(false)
  }, [tableListEveryDay])

  const callbackShowExtendedForecast = (date: string): void => {
    setShowExtendedHourlyForecast(true)
    setTableHeaderExtendedForecast(['Tid', 'Väder', 'Temp.', 'vind'])
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
