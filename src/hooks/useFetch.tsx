import { useState } from 'react'

const useFetch = () => {
  const [data, setData] = useState<any>(null) // make this a type, interface
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const getData = async (url: string) => {
    try {
      setLoading(true)
      setError(false)
      const response = await fetch(url)
      const responseJson = await response.json()
      if (responseJson.error) {
        throw new Error('Something went wrong!')
      } else {
        setData(responseJson)
      }
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return { getData, data, error, loading }
}

export default useFetch
