import { useEffect } from 'react'
import { useUpdateListWithDays, useListWithDays } from '../contexts/WeatherContext'
import useFetch from './useFetch'
// import { type IWeatherContext } from '../contexts/types/IWeatherContext'

interface IWeatherContext {
  getForecastForEachDay: () => Array<{ time: string, timeString: string, temp: string, symbol: string[] }>
  getExtendedData: (date: string) => Array<{ time: string, timeString: string, temp: string, symbol: string[] }>
}

interface IWeatherForecast {
  time: string
  timeString: string
  temp: string
  symbol: string[]
}

interface returnFunctions {
  setWeatherData: (url: string) => Promise<void>
  getWeatherData: () => IWeatherForecast[]
  getExtendedDataEachHour: (date: string) => IWeatherForecast[]
  data: any
  error: boolean
  loading: boolean
}

export const useWeatherData = (): returnFunctions => {
  const { setData: weatherSetData, data, error, loading } = useFetch()
  const modifyDataContext = useUpdateListWithDays()
  const dataContext = useListWithDays() as IWeatherContext

  useEffect(() => {
    if (data !== null) {
      modifyDataContext?.updateWeatherData(data)
    }
  }, [data])

  const setWeatherData = async (url: string): Promise<void> => {
    await weatherSetData(url)
  }

  const getWeatherData = (): IWeatherForecast[] => {
    return dataContext?.getForecastForEachDay()
  }

  const getExtendedDataEachHour = (date: string): IWeatherForecast[] => {
    return dataContext?.getExtendedData(date)
  }

  return { setWeatherData, getExtendedDataEachHour, getWeatherData, data, error, loading }
}
