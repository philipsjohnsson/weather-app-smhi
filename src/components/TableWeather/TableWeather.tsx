import { useEffect, useState } from 'react'
import './TableWeather.css'

const TableWeather = ({ tableHeader, tableList, callBackFunction, showTrButton }) => {

  useEffect(() => {
    console.log(tableList)
  }, [tableList])

  const test = (event: React.MouseEvent<HTMLTableRowElement>) => {
    console.log(event.currentTarget.dataset.time)

    callBackFunction(event.currentTarget.dataset.time)
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
          <tr onClick={!showTrButton ? test : undefined} className={!showTrButton ? "weather-info-tr" : ""} data-time={obj.time}>
            <td>{obj.time}</td>
            {obj.symbol.map((arrSym: string) => (
              <td key={arrSym}>
                {arrSym !== '0' && <img src={require(`../../pictures/${arrSym}.png`)} alt="weather symbol" width="75px" />}
              </td>
            ))}
            <td>{obj.temp}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default TableWeather;