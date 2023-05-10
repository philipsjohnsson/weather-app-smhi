import { useState } from "react"

const useFetch = () => {
  const [data, setData] = useState<any>(null) // make this a type, interface
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

    const getData = async (url: string) => {
      try {
        // setData(null)
        setLoading(true)
        setError(false)
        console.log('_-------_')
        console.log(url)
        const response = await fetch(url)
        console.log(response)
        const responseJson = await response.json()
        console.log(responseJson)
        if(responseJson.error) {
          throw new Error('Something went wrong!')
        } else {
          setData(responseJson)
          console.log('data inside of useFetch')
        }
      } catch (error) {
        console.log('WE ARE INSIDE OF ERROR')
        console.log(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

  return { getData, data, error, loading }
}

export default useFetch