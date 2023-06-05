export interface IWeatherTimeserie {
  validTime: string
  parameters: Array<{
    name: string
    levelType: string
    level: number
    unit: string
    values: number[]
  }>
}
