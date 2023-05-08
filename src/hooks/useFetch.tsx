import { useState } from "react"

const useFetch = () => {
  const [fetchedData, setData] = useState<any>(null) // make this a type, interface
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

    const getData = async (url: string) => {
      try {
        const data = await fetch(`${url}`)
        const dataJson = await data.json()
        console.log(dataJson)
        setData(dataJson.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

  return { getData, fetchedData, error, loading }
}

export default useFetch