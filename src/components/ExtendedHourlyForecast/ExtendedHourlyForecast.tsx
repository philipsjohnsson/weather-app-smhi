import { useEffect, useRef, useState } from "react"
import TableWeather from "../TableWeather/TableWeather"
import './ExtendedHourlyForecast.css'

const ExtendedHourlyForecast = ({ date, listWithDaysInstance, setShowExtendedHourlyForecast }) => {
  const [tableHeader, setTableHeader] = useState<Array<string>>([])
  const [tableListExtendedForecast, setTableListExtendedForecast] = useState<Array<string>>([])

  useEffect(() => {
    setTableHeader(["Tid", "Väder", "Temp.", "vind"])
    setTableListExtendedForecast(listWithDaysInstance.getExtendedData(date))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const closeExtendedData = (event) => {
    setShowExtendedHourlyForecast(false)
  }

  return (
    <div className="hour-container">
      <div className="forecast-wrapper-popup overlay"> 
        <div className="forecast-box popup">
          <div className="header-container">
            <div className="header-text">{date}</div>
            <button onClick={closeExtendedData} className="close-btn">&#x78;</button>
          </div>
          <div className="content-container">
            <TableWeather tableHeader={tableHeader} tableList={tableListExtendedForecast} callBackFunction="" showTrButton={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtendedHourlyForecast;