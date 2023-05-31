export interface TableWeatherProps {
  tableHeader: string[]
  callBackFunction: (arg: string) => void
  tableList: Array<{ 'time': string, 'timeString': string, 'temp': string, 'symbol': string[] }> | null
  showTrButton: boolean
}
