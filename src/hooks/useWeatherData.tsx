import { useEffect } from 'react'
import { useUpdateListWithDays, useListWithDays } from '../contexts/WeatherContext'
import useFetch from './useFetch'
import { type IWeatherForecast } from '../contexts/types/IWeatherForecast'
// import { useUpdateListWithDays } from '../hooks/useWeatherData'

export const useWeatherData = ():
{ setWeatherData: (url: string) => Promise<void>, getWeatherData: () => IWeatherForecast, data: any, error: boolean, loading: boolean } => {
  const { setData: weatherSetData, data, error, loading } = useFetch()
  const modifyDataContext = useUpdateListWithDays()
  const dataContext = useListWithDays()

  useEffect(() => {
    if (data !== null) {
      modifyDataContext?.updateWeatherData(data)
    }
  }, [data])

  const setWeatherData = async (url: string): Promise<void> => {
    console.log(url)

    await weatherSetData(url)
  }

  const getWeatherData = (): IWeatherForecast => {
    return dataContext?.getForecastForEachDay()
  }

  return { setWeatherData, getWeatherData, data, error, loading }
}
