import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { MyProvider } from "./context/MyContext";


export default function App(){
  return (
   <MyProvider>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </MyProvider>
  )
}
