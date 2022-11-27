import React from 'react'
import Footer from '../Component/Home/Footer'
import Navbar from '../Component/Home/Navbar'
import SearchSection from '../Component/Home/SearchSection'
import OrderSection from '../Component/Order Component/OrderSection'

const Order = () => {
  return (
    <>
        <Navbar />
        <SearchSection />
        <div className='orderSection'>
            <OrderSection />
        </div>
        <Footer />
    </>

    )
}

export default Order