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

interface IWeatherForecast {
  time: string
  timeString: string
  temp: string
  symbol: string[]
  wind: string
}

export function getExtendedDataHelp (arrayWeather: IWeatherTimeserie[], date: string): IWeatherForecast[] {
  const timeIntervalArr: IWeatherForecast[] = []

  arrayWeather?.forEach((obj) => {
    if (date === obj.validTime.substring(0, 10)) {
      const specificTime = {
        time: '' as string,
        timeString: '' as string,
        symbol: [] as string[],
        temp: '' as string,
        wind: '' as string
      }

      specificTime.time = obj.validTime.substring(11, 16)
      specificTime.timeString = obj.validTime.substring(11, 16)

      obj?.parameters.forEach((element) => {
        if (element.name === 't') {
          specificTime.temp = element.values[0].toString()
        }

        if (element.name === 'Wsymb2') {
          specificTime.symbol.push(element.values[0].toString())
        }

        if (element.name === 'ws') {
          specificTime.wind = `${Math.round(element.values[0]).toString()} m/s`
        }
      })

      timeIntervalArr.push(specificTime)
    }
  })

  return timeIntervalArr
}

export function getTempExtendedDataBasedOnDateArr (arrayWeather: IWeatherTimeserie[], date: string, wishedSymbol: string): number[] {
  const tempArr: number[] = []
  arrayWeather?.forEach((obj) => {
    if (date === obj.validTime.substring(0, 10)) {
      obj?.parameters.forEach((para) => {
        if (para.name === wishedSymbol) {
          tempArr.push(para.values[0])
        }
      })
    }
  })

  return tempArr
}

export function getWeatherSymbolBasedOnDateHelp (arrayWeather: IWeatherTimeserie[], date: string, timeInterval: string[]): number[] {
  const symbolArr: number[] = []

  arrayWeather?.forEach((obj) => {
    if (date === obj.validTime.substring(0, 10) && timeInterval.includes(obj.validTime.substring(11, 13))) {
      obj?.parameters.forEach((para) => {
        if (para.name === 'Wsymb2') {
          symbolArr.push(para.values[0])
        }
      })
    }
  })

  return symbolArr
}
