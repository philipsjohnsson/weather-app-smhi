export function getExtendedDataHelp(arrayWeather, date) {
  const timeIntervalArr = []
  arrayWeather?.forEach((obj) => {
    if(date === obj.validTime.substring(0, 10)) {
      const specificTime = {
        time: null,
        timeString: null,
        symbol: [],
        temp: null
      }
      specificTime.time = obj.validTime.substring(11, 16)
      specificTime.timeString = obj.validTime.substring(11, 16)
      obj?.parameters.forEach((element) => {
        if(element.name === 't') {
          specificTime.temp = element.values[0]
        } 
        
        if(element.name === 'Wsymb2') {
          specificTime.symbol.push(element.values[0])
        }
      })
      timeIntervalArr.push(specificTime)
    }
  })
  return timeIntervalArr
}

export function getTempExtendedDataBasedOnDateArr(arrayWeather, date) {
  const tempArr = []
  arrayWeather?.forEach((obj) => {
    if(date === obj.validTime.substring(0, 10)) {
      obj?.parameters.forEach((para) => {
        if(para.name === 't') {
          tempArr.push(para.values[0])
        }
      })  
    }
  })
  return tempArr
}

export function getWeatherSymbolBasedOnDateHelp(arrayWeather, date, timeInterval) {
  const symbolArr = []

  arrayWeather?.forEach((obj) => {
    if(date === obj.validTime.substring(0, 10) && timeInterval.includes(obj.validTime.substring(11, 13))) {
      obj?.parameters.forEach((para) => {
        if(para.name === 'Wsymb2') {
          symbolArr.push(para.values[0])
        }
      })
    }
  })
  return symbolArr
}