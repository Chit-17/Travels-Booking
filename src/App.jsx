import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SearchPage from './Pages/SearchPage.jsx'
import VehicleDetails from './Pages/VehicleDetails.jsx'
import AuthPage from './app/AuthPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/vehicle/:id" element={<VehicleDetails />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App
