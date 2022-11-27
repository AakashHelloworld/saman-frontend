import React from 'react'
import Navbar from '../Component/Home/Navbar'
import SearchSection from '../Component/Home/SearchSection'
import CartSection from "../Component/CartSection Component/CartSection.js"
import Footer from '../Component/Home/Footer'
const Cart = () => {
  return (
    <>
    <Navbar/>
    <SearchSection/>
    <div className='cart__section'>
    <CartSection />
    </div>
    <Footer/>
    </>
  )
}

export default Cart