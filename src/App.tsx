import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import { ThemeProvider } from './hooks/useListWithDays'

function App () {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
