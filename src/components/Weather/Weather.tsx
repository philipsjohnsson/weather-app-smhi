import { useEffect, useState } from "react";
import { ListWithDays } from "../../util/ListWithDays";
import TableWeather from "../TableWeather/TableWeather";

const Weather = ({ weatherData }) => {
  const [listWithDaysInstance, setListWithDaysInstance] = useState<Array<any> | null>()
  const [tableList, setTableList] = useState<Array<any>>([])
  const [showTable, setShowTable] = useState<boolean>(false)
  const [showExtendedHourlyForecast, setShowExtendedHourlyForecast] = useState<boolean>(false)

  useEffect(() => {
    setShowTable(false)
    const listWithDays = new ListWithDays(weatherData) // Flytta skapandet till Home...
    setListWithDaysInstance(listWithDays)

    console.log(weatherData)

    const test = listWithDays.getForecastForEachDay()
    console.log(test)
    setTableList(test)
    setShowTable(true)

  }, [weatherData])

  useEffect(() => {
    console.log(listWithDaysInstance)
  }, [listWithDaysInstance])

  useEffect(() => {
    console.log(tableList)
  }, [tableList])

return (
  <div>
    {(listWithDaysInstance && showTable) && <TableWeather tableList={tableList} setShowExtendedHourlyForecast={setShowExtendedHourlyForecast} classTr="weather-info-tr"/>}
    {showExtendedHourlyForecast && <button>X</button>}
  </div>
)
}

export default Weather;