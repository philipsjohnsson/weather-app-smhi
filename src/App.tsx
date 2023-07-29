import React from 'react'
import './App.css'
import Home from './pages/Home/Home'
import { ThemeProvider } from './contexts/WeatherContext'

function App (): JSX.Element {
  return (
    <div className="App">
        <ThemeProvider>
          <Home />
        </ThemeProvider>
    </div>
  )
}

export default App
