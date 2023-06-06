import React, { useEffect } from 'react'
import { useUpdateListWithDays } from '../contexts/WeatherContext'
import useFetch from './useFetch'
// import { useUpdateListWithDays } from '../hooks/useWeatherData'

export const useWeatherData = (): { setWeatherData: (url: string) => Promise<void>, data: any, error: boolean, loading: boolean } => {
  const { setData: weatherSetData, data, error, loading } = useFetch()
  const modifyData = useUpdateListWithDays()

  useEffect(() => {
    if (data !== null) {
      modifyData?.updateWeatherData(data)
    }
  }, [data])

  const setWeatherData = async (url: string): Promise<void> => {
    console.log(url)

    await weatherSetData(url)
  }

  return { setWeatherData, data, error, loading }
}
