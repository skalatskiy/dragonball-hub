import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import MainPage from './pages/main.page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Navigate to='/main' /> }/>
          <Route path="/main" element={ <MainPage /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
