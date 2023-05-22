import { useEffect, useState } from 'react'
import './TableWeather.css'

const TableWeather = ({ tableHeader, tableList, callBackFunction, showTrButton }) => {

  useEffect(() => {
    console.log(tableList)
  }, [tableList])

  const callback = (event: React.MouseEvent<HTMLTableRowElement>) => {
    console.log(event.currentTarget.dataset.time)

    callBackFunction(event.currentTarget.dataset.time)
  }

  return (
    <div>
      <table className="table" cellSpacing="0">
        <tr>
          {tableHeader.map((element: string) => (
            <th>{element}</th>
          ))}
        </tr>
        {tableList.map((obj) => (
          <tr onClick={!showTrButton ? callback : undefined} className={!showTrButton ? "weather-info-tr" : ""} data-time={obj.time}>
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