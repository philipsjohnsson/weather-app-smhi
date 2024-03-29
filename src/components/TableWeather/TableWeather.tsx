import React from 'react'
import './TableWeather.css'

interface TableWeatherProps {
  tableHeader: string[]
  callBackFunction: (arg: string) => void
  tableList: Array<{
    time: string
    timeString: string
    temp: string
    symbol: string[]
    wind: string
  }> | null
  showTrButton: boolean
}

function TableWeather ({ tableHeader, tableList, callBackFunction, showTrButton }: TableWeatherProps): JSX.Element {
  const clickedOnButtonCallback = (event: React.MouseEvent<HTMLTableRowElement>): void => {
    if (event.currentTarget.dataset.time !== undefined) {
      callBackFunction(event.currentTarget.dataset.time)
    }
  }

  return (
    <div>
      <table className="table" cellSpacing="0">
        <thead>
          <tr>
            {tableHeader.map((element: string, index: number) => (
              <th key={index}>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableList?.map((obj, i: number) => (
            <tr
              key={i}
              onClick={showTrButton ? clickedOnButtonCallback : undefined}
              className={showTrButton ? 'weather-info-tr' : ''}
              data-time={obj.time}
            >
              <td>{obj.timeString}</td>
              {obj.symbol.map((arrSym: string, index: number) => (
                <td key={`${i}-${index}`}>
                  {arrSym !== '0' && <img src={require(`../../assets/pictures/${arrSym}.png`)} alt="weather symbol" width="75px" />}
                </td>
              ))}
              <td>{obj.temp}</td>
              <td>{obj.wind}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableWeather
