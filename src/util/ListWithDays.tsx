import { ListExtendedData } from './ListExtendedData'
import { getDate, getMonthName } from './helpDateFunctions'

export class ListWithDays {
  #arrDataEveryHour
  extendedData

  constructor (fetchedData) {
    this.#arrDataEveryHour = []
    this.setModifyData(fetchedData)
    this.extendedData = new ListExtendedData(fetchedData)
  }

  getForecastForEachDay () {
    const arrayWithForecast = []

    this?.getAllDates().map((date, index) => {
      if (date !== this?.getAllDates()[index - 1]) {
        const obj = {
          time: date,
          timeString: `${getDate(date)} ${date.substring(8, 10)}. ${getMonthName(date)} `,
          symbol: [this.getWeatherSymbolBasedOnDate(date, ['00', '01', '02', '03', '04', '05']), this.getWeatherSymbolBasedOnDate(date, ['06', '07', '08', '09', '10', '11']), this.getWeatherSymbolBasedOnDate(date, ['12', '13', '14', '15', '16', '17']), this.getWeatherSymbolBasedOnDate(date, ['18', '19', '20', '21', '22', '23'])],
          temp: `${Math.round(Math.max(...this.getTempExtendedDataBasedOnDateArr(date)))}°C / ${Math.round(Math.min(...this.getTempExtendedDataBasedOnDateArr(date)))}°C`
        }
        arrayWithForecast.push(obj)
      }
    })
    return arrayWithForecast
  }

  setModifyData (fetchedData) {
    this.#arrDataEveryHour = []
    fetchedData?.timeSeries.map((obj) => {
      this.#arrDataEveryHour.push(obj)
    })
  }

  getAllDates () {
    const dates: string[] = []
    this.#arrDataEveryHour.forEach((obj) => {
      dates.push(obj.validTime.substring(0, 10))
    })
    return dates
  }

  getExtendedData (date: string) {
    return this.extendedData.getExtendedData(date)
  }

  getTempExtendedDataBasedOnDateArr (date: string) {
    return this.extendedData.getTempExtendedDataBasedOnDateArr(date)
  }

  getWeatherSymbolBasedOnDate (date: string, timeInterval: string[]) {
    let symbol = 0
    const symbolIndexArr = this.extendedData.getWeatherSymbolBasedOnDate(date, timeInterval)

    if (this.getMode(symbolIndexArr).length > 1) {
      symbol = Math.max(...this.getMode(symbolIndexArr))
    } else if (this.getMode(symbolIndexArr)[0] !== undefined) {
      symbol = this.getMode(symbolIndexArr)[0]
    }

    return symbol.toString()
  }

  getMode (symbolIndexArr: number[]) {
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
      console.log(key)
      if (checkMode[Number(key)] === maxKeyValue) {
        array.push(Number(key))
      }
    })
    array.sort((a, b) => a - b)
    return array
  }
}
