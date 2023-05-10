import { ListExtendedData } from "./ListExtendedData"


export class ListWithDays {
  #arrDataEveryHour
  extendedData
  
  constructor(fetchedData) {
    this.#arrDataEveryHour = []
    this.setModifyData(fetchedData)
    this.extendedData = new ListExtendedData(fetchedData)
  }

  getForecastForEachDay() {
    const arrayWithForecast = []
    
    this?.getAllDates().map((date, index) => {
      if (date !== this?.getAllDates()[index - 1]) {
        const obj = {
          time: date,
          symbol: [this.getWeatherSymbolBasedOnDate(date, ["00", "01", "02", "03", "04", "05"]), this.getWeatherSymbolBasedOnDate(date, ["06", "07", "08", "09", "10", "11"]), this.getWeatherSymbolBasedOnDate(date, ["12", "13", "14", "15", "16", "17"]), this.getWeatherSymbolBasedOnDate(date, ["18", "19", "20", "21", "22", "23"])],
          temp: `${Math.round(Math.max(...this.getTempExtendedDataBasedOnDateArr(date)))}°C / ${Math.round(Math.min(...this.getTempExtendedDataBasedOnDateArr(date)))}°C`
        }
        arrayWithForecast.push(obj)
      }
    })
    return arrayWithForecast
  }

  setModifyData(fetchedData) {
    fetchedData?.timeSeries.map((obj) => {
      this.#arrDataEveryHour.push(obj)
    })
  }
  
  getModifyData() {
    return this.#arrDataEveryHour
  }

  getAllDates() {
    const dates = []
    this.#arrDataEveryHour.forEach((obj) => {
      dates.push(obj.validTime.substring(0, 10))
    }) 
    return dates
  }

  getExtendedData(date) {
    return this.extendedData.getExtendedData(date)
  }

  getTempExtendedDataBasedOnDateArr(date) {
    return this.extendedData.getTempExtendedDataBasedOnDateArr(date)
  }

  getWeatherSymbolBasedOnDate(date, timeInterval) {
    let symbol = 0
    // const timeInterval = this.chooseTheTimeInterval(divisionOfTheDay)
    const symbolIndexArr = this.extendedData.getWeatherSymbolBasedOnDate(date, timeInterval)
    if(this.getMode(symbolIndexArr).length > 1) {
      symbol = Math.max(...this.getMode(symbolIndexArr))
    } else if (this.getMode(symbolIndexArr)[0] !== undefined) {
      symbol = this.getMode(symbolIndexArr)[0]
    }

    return symbol.toString()
  }

  /* chooseTheTimeInterval(divisionOfTheDay) {
    const timeInterval = []

    if(divisionOfTheDay === 'morning') {
      for(let i = 6; i <= 11; i++) {
        if(i < 10) {
        timeInterval.push("0"+(i).toString())
        } else {
          timeInterval.push(i.toString())
        }
      }
    }
    
    return timeInterval
  } */

  getMode (symbolIndexArr) { // typvärde
    // checkAllErrors(mode)
  
    // Inspiration från referens - https://www.youtube.com/watch?v=BB8N3BXfDWY
    const array = []
    const checkMode = {}
    symbolIndexArr.forEach(num => {
      if (checkMode[num]) {
        checkMode[num] += 1
      } else {
        checkMode[num] = 1
      }
    })
    const myKeysValues = Object.values(checkMode)
    myKeysValues.sort((a, b) => { return b - a })
  
    const maxKeyValue = myKeysValues[0]
  
    Object.keys(checkMode).forEach(key => {
      if (checkMode[key] === maxKeyValue) {
        array.push(Number(key))
      }
    })
    array.sort((a, b) => { return a - b })
    return array
  }
}