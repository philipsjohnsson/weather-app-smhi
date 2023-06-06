import { useState } from 'react'

const useFetch = () => {
  const [data, setTheData] = useState<any>(null) // make this a type, interface
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const setData = async (url: string) => {
    try {
      setLoading(true)
      setError(false)
      console.log(error)
      const response = await fetch(url)
      const responseJson = await response.json()
      console.log(responseJson)
      /* if (responseJson.error) {
        throw new Error('Something went wrong!')
      } else {
        setData(responseJson)
      } */
      setTheData(responseJson)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return { setData, data, error, loading }
}

export default useFetch
