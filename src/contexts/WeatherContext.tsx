import React, { type ReactNode, useContext, useState } from 'react'
import { getExtendedDataHelp } from '../util/forecastExtendedDataFunctions'
import { calculateForecastForEachDay } from '../util/forecastDataFunctions'

interface IobjWeatherData {
  approvedTime: string
  geometry: {
    coordinates: number[]
    type: string
  }
  referenceTime: string
  timeSeries: IWeatherTimeserie[]
}

interface IWeatherForecast {
  time: string
  timeString: string
  temp: string
  symbol: string[]
}

interface IWeatherTimeserie {
  validTime: string
  parameters: Array<{
    name: string
    levelType: string
    level: number
    unit: string
    values: number[]
  }>
}

interface IThemeUseContext {
  getForecastForEachDay: () => IWeatherForecast[]
  getExtendedData: (date: string) => IWeatherForecast[]
}

interface IThemeUpdateContext {
  updateWeatherData: (dataObj: IobjWeatherData) => void
}

const ThemeContext = React.createContext<IWeatherTimeserie[]>([])
const ThemeUpdateContext = React.createContext<IThemeUpdateContext | null>(null)
const ThemeUseContext = React.createContext<IThemeUseContext | null>(null)

export function useListWithDaysArr (): IWeatherTimeserie[] {
  return useContext(ThemeContext)
}

export function useUpdateListWithDays (): IThemeUpdateContext | null {
  return useContext(ThemeUpdateContext)
}

export function useListWithDays (): IThemeUseContext | null {
  return useContext(ThemeUseContext)
}

export function ThemeProvider ({ children }: { children: ReactNode }): JSX.Element {
  const [arrayWeatherForecast, setArrayWeatherForecast] = useState<IWeatherTimeserie[]>([])

  function updateWeatherData (dataObj: IobjWeatherData): void {
    const weatherArr: IWeatherTimeserie[] = []
    dataObj?.timeSeries.forEach((obj: IWeatherTimeserie) => {
      weatherArr.push(obj)
    })
    console.log(weatherArr)
    setArrayWeatherForecast(weatherArr)
  }

  function getForecastForEachDay (): IWeatherForecast[] {
    const test = calculateForecastForEachDay(arrayWeatherForecast)
    console.log(test)
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
