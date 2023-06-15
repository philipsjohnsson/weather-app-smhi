import { useState, useEffect } from 'react'

interface IuseFetch {
  setData: (url: string) => Promise<void>
  data: any
  error: boolean
  loading: boolean
}

const useFetch = (): IuseFetch => {
  const [data, setTheData] = useState<any>(null) // make this a type, interface
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log(data)
  }, [data])

  const setData = async (url: string): Promise<void> => {
    try {
      setLoading(true)
      setError(false)
      const response = await fetch(url)
      const responseJson = await response.json()
      setTheData(responseJson)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return { setData, data, error, loading }
}

export default useFetch
