export interface IWeatherContext {
  getForecastForEachDay: () => Array<{ time: string, timeString: string, temp: string, symbol: string[] }>
  getExtendedData: (date: string) => Array<{ time: string, timeString: string, temp: string, symbol: string[] }>
}
