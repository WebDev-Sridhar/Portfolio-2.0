import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { MyProvider } from "./context/MyContext";
import { AdminProvider } from "./context/AdminContext";

export default function App(){
  return (
    <MyProvider>
      <AdminProvider>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </AdminProvider>
    </MyProvider>
  )
}
