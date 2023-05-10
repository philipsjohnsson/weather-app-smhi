export class ListExtendedData {
    #extendedData
    #data
    
    constructor(data) {
      this.setExtendedData(data)
    }
  
    setExtendedData(data) {
      this.#data = data
    }
  
    getExtendedData(date) {
      console.log(this.#data)
      console.log('DATE')
      const timeIntervalArr = []
      this.#data?.timeSeries.forEach((obj) => {
        
        if(date === obj.validTime.substring(0, 10)) {
          console.log(obj)
          const specificTime = {
            time: null,
            temp: null
            
          }
          specificTime.time = obj.validTime.substring(11, 16)
          obj?.parameters.forEach((element) => {
            if(element.name === 't') {
              specificTime.temp = element.values[0]
            }
          });
          timeIntervalArr.push(specificTime)
        }
      })
      return timeIntervalArr
    }
  
    getTempExtendedDataBasedOnDateArr(date) {
      const tempArr = []
      this.#data?.timeSeries.forEach((obj) => {
        if(date === obj.validTime.substring(0, 10)) {
          // setTemp(dates)
          obj?.parameters.forEach((para) => {
            if(para.name === 't') {
              tempArr.push(para.values[0])
            }
          })
          // returnera en specifik array med temperaturerna för detta datum
          
        }
      })
      return tempArr
    }
  
    getWeatherSymbolBasedOnDate(date, timeInterval) {
      const symbolArr = []
      this.#data?.timeSeries.forEach((obj) => {
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
  }