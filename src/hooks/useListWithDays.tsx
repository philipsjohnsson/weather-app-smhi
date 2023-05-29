import React, { useContext, useState } from 'react'
import { getExtendedDataHelp, getTempExtendedDataBasedOnDateArr, getWeatherSymbolBasedOnDateHelp } from '../util/helpExtendedDataFunctions'
import { calculateForecastForEachDay } from '../util/helpDataFunctions'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()
const ThemeUseContext = React.createContext()

export function useListWithDaysArr() {
  return useContext(ThemeContext)
}

export function useUpdateListWithDays() {
  return useContext(ThemeUpdateContext)
}

export function useListWithDays() {
  return useContext(ThemeUseContext)
}

export const ThemeProvider = ({ children }) => {
  const [arrayWeatherForecast, setArrayWeatherForecast] = useState([])

  function updateWeatherData(dataObj) {
    const weatherArr = []
    dataObj?.timeSeries.map((obj) => {
      weatherArr.push(obj)
    })
    setArrayWeatherForecast(weatherArr)
  }

  function getForecastForEachDay() {
    return calculateForecastForEachDay(arrayWeatherForecast)
  }

  function getExtendedData(date) {
    return getExtendedDataHelp(arrayWeatherForecast, date)
  }

  const object = {
    updateWeatherData
  }

  const objectWeather = {
    getForecastForEachDay,
    getExtendedData
  }

  return (
    <ThemeContext.Provider value={arrayWeatherForecast}>
      <ThemeUpdateContext.Provider value={object}>
        <ThemeUseContext.Provider value={objectWeather}>
          {children}
        </ThemeUseContext.Provider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}