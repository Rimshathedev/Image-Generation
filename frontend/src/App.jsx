import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  useState(()=>{
    let user = localStorage.getItem("token")
    if(!user){
      window.location.href = "/login"
    }else{
      window.location.href = "/dashboard"
    }
  },[])
  
  return (
    <>
      
    </>
  )
}

export default App
