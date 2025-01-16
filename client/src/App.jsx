import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserForm from './pages/UserForm'
import {Toaster}  from 'react-hot-toast'
import Sucess from './pages/Sucess'
import Hero from './pages/Hero'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Hero/>}/>
      <Route path='/user' element={<UserForm/>}/>
      <Route path='/success' element={<Sucess/>}/>
      <Route path='/admin-signup' element={<Signup/>}/>
      <Route path='/admin-login' element={<Login/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
    </Routes>
    <Toaster/>

    </>
  )
}

export default App