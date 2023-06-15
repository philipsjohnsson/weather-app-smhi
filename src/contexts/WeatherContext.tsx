import React, { useContext, useState } from 'react'
import { getExtendedDataHelp } from '../util/helpExtendedDataFunctions'
import { calculateForecastForEachDay } from '../util/helpDataFunctions'
import { type IWeatherForecast } from './types/IWeatherForecast'
import { type IWeatherParameter } from './types/IParameter'
import { type IWeatherTimeserie } from './types/IWeatherTimeserie'



const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()
const ThemeUseContext = React.createContext()

export function useListWithDaysArr () {
  return useContext(ThemeContext)
}

export function useUpdateListWithDays () {
  return useContext(ThemeUpdateContext)
}

export function useListWithDays () {
  return useContext(ThemeUseContext)
}

export function ThemeProvider ({ children }) {
  const [arrayWeatherForecast, setArrayWeatherForecast] = useState([])

  function updateWeatherData (dataObj): void {
    console.log(dataObj)
    const weatherArr: IWeatherTimeserie[] = []
    dataObj?.timeSeries.forEach((obj: IWeatherTimeserie) => {
      weatherArr.push(obj)
    })
    console.log(weatherArr)
    setArrayWeatherForecast(weatherArr)
  }

  function getForecastForEachDay (): IWeatherForecast[] {
    return calculateForecastForEachDay(arrayWeatherForecast)
  }

  function getExtendedData (date: string): IWeatherForecast[] {
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
