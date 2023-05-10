import { useEffect, useState } from 'react'
import './TableWeather.css'

const TableWeather = ({ tableList, setShowExtendedHourlyForecast, classTr }) => {

  useEffect(() => {
    console.log(tableList)
  }, [tableList])

  const test = (event) => {
    console.log('TEST')
    setShowExtendedHourlyForecast(true)
  }

  return (
    <div>
      <table className="table" cellSpacing="0">
        <tr>
          <th>Day</th>
          <th>Night</th>
          <th>Morning</th>
          <th>Afternoon</th>
          <th>Evening</th>
          <th>Temp (max / min)</th>
          <th>wind</th>
        </tr>
        {tableList.map((obj) => (
          <tr onClick={test} className={classTr}>
            <td>{obj.time}</td>
            {obj.symbol.map((arrSym: string) => (
              <td>{arrSym !== '0' && <img src={require(`../../pictures/${arrSym}.png`)} alt="weather symbol" width="75px"></img>}</td>
            ))}
            <td>{obj.temp}</td>
          </tr>
          ))}
      </table>
    </div>
  )
}

export default TableWeather;