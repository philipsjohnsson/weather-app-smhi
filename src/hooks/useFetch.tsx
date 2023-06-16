import { useState } from 'react'

interface FetchResult {
  setData: (url: string) => Promise<void>
  data: any
  error: boolean
  loading: boolean
}

const useFetch = (): FetchResult => {
  const [data, setTheData] = useState<any>(null) // make this a type, interface
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

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
