import { getExtendedDataHelp, getTempExtendedDataBasedOnDateArr, getWeatherSymbolBasedOnDateHelp } from '../util/helpExtendedDataFunctions'
import { getDate, getMonthName } from '../util/helpDateFunctions'

export function calculateForecastForEachDay (arrayWeatherForecast) {
  const arrayWithForecast = []

  getAllDates(arrayWeatherForecast).map((date, index) => {
    if (date !== getAllDates(arrayWeatherForecast)[index - 1]) {
      const obj = {
        time: date,
        timeString: `${getDate(date)} ${date.substring(8, 10)}. ${getMonthName(date)} `,
        symbol: [getWeatherSymbolBasedOnDate(arrayWeatherForecast, date, ['00', '01', '02', '03', '04', '05']), getWeatherSymbolBasedOnDate(arrayWeatherForecast, date, ['06', '07', '08', '09', '10', '11']), getWeatherSymbolBasedOnDate(arrayWeatherForecast, date, ['12', '13', '14', '15', '16', '17']), getWeatherSymbolBasedOnDate(arrayWeatherForecast, date, ['18', '19', '20', '21', '22', '23'])],
        temp: `${Math.round(Math.max(...getTempExtendedDataBasedOnDateArr(arrayWeatherForecast, date)))}°C / ${Math.round(Math.min(...getTempExtendedDataBasedOnDateArr(arrayWeatherForecast, date)))}°C`
      }
      arrayWithForecast.push(obj)
    }
  })
  return arrayWithForecast
}

function getAllDates (arrayWeatherForecast) {
  const dates: string[] = []
  arrayWeatherForecast.forEach((obj) => {
    dates.push(obj.validTime.substring(0, 10))
  })
  return dates
}

function getWeatherSymbolBasedOnDate (arrayWeather, date: string, timeInterval: string[]) {
  let symbol = 0
  const symbolIndexArr = getWeatherSymbolBasedOnDateHelp(arrayWeather, date, timeInterval)

  if (getMode(symbolIndexArr).length > 1) {
    symbol = Math.max(...getMode(symbolIndexArr))
  } else if (getMode(symbolIndexArr)[0] !== undefined) {
    symbol = getMode(symbolIndexArr)[0]
  }

  return symbol.toString()
}

function getMode (symbolIndexArr: number[]) {
  const array: number[] = []
  const checkMode: Record<number, number> = {}
  symbolIndexArr.forEach((num) => {
    if (checkMode[num]) {
      checkMode[num] += 1
    } else {
      checkMode[num] = 1
    }
  })
  const myKeysValues = Object.values(checkMode)
  myKeysValues.sort((a, b) => b - a)

  const maxKeyValue = myKeysValues[0]

  Object.keys(checkMode).forEach((key) => {
    if (checkMode[Number(key)] === maxKeyValue) {
      array.push(Number(key))
    }
  })
  array.sort((a, b) => a - b)
  return array
}
