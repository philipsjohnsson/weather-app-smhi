import { useEffect, useState } from "react";
import { ListWithDays } from "../../util/ListWithDays";
import TableWeather from "../TableWeather/TableWeather";
import ExtendedHourlyForecast from "../ExtendedHourlyForecast/ExtendedHourlyForecast";

const Weather = ({ weatherData }) => {
  const [listWithDaysInstance, setListWithDaysInstance] = useState<Array<any> | null>()
  const [tableList, setTableList] = useState<Array<any>>([])
  const [showTable, setShowTable] = useState<boolean>(false)
  const [showExtendedHourlyForecast, setShowExtendedHourlyForecast] = useState<boolean>(false)
  const [date, setDate] = useState<string | null>(null)
  const [tableHeader, setTableHeader] = useState<Array<string>>([])
  const [classTr, setClassTr] = useState<string | null>(null)

  useEffect(() => {
    setShowTable(false)
    const listWithDays = new ListWithDays(weatherData) // Flytta skapandet till Home...
    setListWithDaysInstance(listWithDays)
    setTableHeader(["Day", "Night", "Morning", "Afternoon", "Evening", "Temp (max / min)", "wind"])
    setClassTr("weather-info-tr")

    const test = listWithDays.getForecastForEachDay()
    setTableList(test)
    setShowTable(true)

  }, [weatherData])

  useEffect(() => {
    setClassTr("nothing")
    showExtendedHourlyForecast ? setShowTable(false) : setShowTable(true)
  }, [showExtendedHourlyForecast])

  const tableFnc = (date: string) => {
    setShowExtendedHourlyForecast(true)
    setClassTr("nothing")
    setDate(date)
  }

return (
  <div>
    {showTable ? <TableWeather tableHeader={tableHeader} tableList={tableList} callBackFunction={tableFnc} classTr="weather-info-tr"/> : <TableWeather tableHeader={tableHeader} tableList={tableList} callBackFunction="" classTr="nothing" /> }
    {showExtendedHourlyForecast && <ExtendedHourlyForecast date={date} tableList={tableList} setShowExtendedHourlyForecast={setShowExtendedHourlyForecast} />}
  </div>
)
}

export default Weather;