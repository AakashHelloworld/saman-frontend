import React from 'react'
import Navbar from '../Component/Home/Navbar'
import SearchSection from '../Component/Home/SearchSection'
import Footer from "../Component/Home/Footer"
import StoresSection from '../Component/StoresPageComponent/StoresSection'
const Stores = () => {
  return (
    <>
    <Navbar/>
    <SearchSection/>
    <div  className='stores__section'>
        <StoresSection/>
    </div>
    <Footer />
    </>
  )
}

export default Stores