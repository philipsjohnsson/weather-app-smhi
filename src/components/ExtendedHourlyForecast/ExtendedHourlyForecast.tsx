import { useEffect, useState } from "react"
import TableWeather from "../TableWeather/TableWeather"
import './ExtendedHourlyForecast.css'

const ExtendedHourlyForecast = ({ date, tableList, setShowExtendedHourlyForecast }) => {
  const [tableHeader, setTableHeader] = useState<Array<string>>([])
  

  useEffect(() => {
    setTableHeader(["Day", "Night", "Morning", "Afternoon", "Evening", "Temp (max / min)", "wind"])
  }, [date])

  const closeExtendedData = (event) => {
    setShowExtendedHourlyForecast(false)
  }

  return (
    <div className="hour-container">
      <button onClick={closeExtendedData}>&#x78;</button>
      <TableWeather tableHeader={tableHeader} tableList={tableList} callBackFunction="" showTrButton={true}/>
    </div>
  )
}

export default ExtendedHourlyForecast;