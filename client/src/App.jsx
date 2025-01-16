import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import { useState } from 'react'
import AllNote from './Components/showNotes'
import RefreshHandler from './Components/RefreshHandler'


function App() {
  let [isAuthenticated,setIsAuthenticated]=useState(false);

  const PrivateRoute=({element})=>{
    return isAuthenticated ? element:<Navigate to='/login' />
  }

  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>}/>
      <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/notes' element={<PrivateRoute element={<AllNote/>}/>}/>
    </Routes>

    </>
  )
}

export default App
