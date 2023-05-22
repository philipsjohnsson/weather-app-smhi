import { useEffect, useState } from "react";
import { ListWithDays } from "../../util/ListWithDays";
import TableWeather from "../TableWeather/TableWeather";
import ExtendedHourlyForecast from "../ExtendedHourlyForecast/ExtendedHourlyForecast";
import './Weather.css'

const Weather = ({ weatherData }) => {
  const [listWithDaysInstance, setListWithDaysInstance] = useState<Array<any> | null>([])
  const [tableList, setTableList] = useState<Array<any>>([])
  const [showTable, setShowTable] = useState<boolean>(false)
  const [showExtendedHourlyForecast, setShowExtendedHourlyForecast] = useState<boolean>(false)
  const [date, setDate] = useState<string | null>(null)
  const [tableHeader, setTableHeader] = useState<Array<string>>([])

  useEffect(() => {
    setShowTable(false)
    const listWithDays = new ListWithDays(weatherData) // Flytta skapandet till Home...
    console.log(listWithDays)
    setListWithDaysInstance(listWithDays)
    setTableHeader(["Day", "Night", "Morning", "Afternoon", "Evening", "Temp (max / min)", "wind"])

    const test = listWithDays.getForecastForEachDay()
    console.log(test)
    setTableList(test)
  }, [weatherData])

  useEffect(() => {
    setShowTable(true)
    setShowExtendedHourlyForecast(false)
  }, [tableList]) 


  const tableFnc = (date: string) => {
    setShowExtendedHourlyForecast(true)
    setDate(date)
  }

return (
  <div>
    {showTable && <div className="forecast-days"><TableWeather tableHeader={tableHeader} tableList={tableList} callBackFunction={tableFnc} showTrButton={showExtendedHourlyForecast} /></div>}
    {showExtendedHourlyForecast && <div className="position-handle"><ExtendedHourlyForecast date={date} listWithDaysInstance={listWithDaysInstance} setShowExtendedHourlyForecast={setShowExtendedHourlyForecast} /></div>}
  </div>
)
}

export default Weather;