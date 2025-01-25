import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../App.css"
import "../index.css"
import Footer from '../components/Footer'
const Main = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Main