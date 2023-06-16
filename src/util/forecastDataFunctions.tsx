import { getTempExtendedDataBasedOnDateArr, getWeatherSymbolBasedOnDateHelp } from './forecastExtendedDataFunctions'
import { getDate, getMonthName } from './forecastDateFunctions'

interface IWeatherForecast {
  time: string
  timeString: string
  temp: string
  symbol: string[]
  wind: string
}

interface IWeatherTimeserie {
  validTime: string
  parameters: Array<{
    name: string
    levelType: string
    level: number
    unit: string
    values: number[]
  }>
}

export function calculateForecastForEachDay (arrayWeatherForecast: IWeatherTimeserie[]): IWeatherForecast[] {
  const arrayWithForecast: IWeatherForecast[] = []

  getAllDates(arrayWeatherForecast).forEach((date, index) => {
    if (date !== getAllDates(arrayWeatherForecast)[index - 1]) {
      const obj = {
        time: date,
        timeString: `${getDate(date)} ${date.substring(8, 10)}. ${getMonthName(date)} `,
        symbol: [
          getWeatherSymbolBasedOnDate(arrayWeatherForecast, date, ['00', '01', '02', '03', '04', '05']),
          getWeatherSymbolBasedOnDate(arrayWeatherForecast, date, ['06', '07', '08', '09', '10', '11']),
          getWeatherSymbolBasedOnDate(arrayWeatherForecast, date, ['12', '13', '14', '15', '16', '17']),
          getWeatherSymbolBasedOnDate(arrayWeatherForecast, date, ['18', '19', '20', '21', '22', '23'])
        ],
        temp: `${Math.round(Math.max(...getTempExtendedDataBasedOnDateArr(arrayWeatherForecast, date, 't')))}°C / 
          ${Math.round(Math.min(...getTempExtendedDataBasedOnDateArr(arrayWeatherForecast, date, 't')))}°C`,
        wind: `${Math.round(Math.max(...getTempExtendedDataBasedOnDateArr(arrayWeatherForecast, date, 'ws')))} m/s`
      }
      arrayWithForecast.push(obj)
    }
  })

  return arrayWithForecast
}

function getAllDates (arrayWeatherForecast: IWeatherTimeserie[]): string[] {
  const dates: string[] = []
  arrayWeatherForecast.forEach((obj) => {
    dates.push(obj.validTime.substring(0, 10))
  })

  return dates
}

function getWeatherSymbolBasedOnDate (arrayWeatherForecast: IWeatherTimeserie[], date: string, timeInterval: string[]): string {
  let symbol = 0
  const symbolIndexArr = getWeatherSymbolBasedOnDateHelp(arrayWeatherForecast, date, timeInterval)

  if (getMode(symbolIndexArr).length > 1) {
    symbol = Math.max(...getMode(symbolIndexArr))
  } else if (getMode(symbolIndexArr)[0] !== undefined) {
    symbol = getMode(symbolIndexArr)[0]
  }

  return symbol.toString()
}

function getMode (symbolIndexArr: number[]): number[] {
  const array: number[] = []
  const checkMode: Record<number, number> = {}
  symbolIndexArr.forEach((num) => {
    if (checkMode[num] !== undefined) {
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
