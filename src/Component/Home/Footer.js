import React from 'react'
import "./Footer.css"
import Image from "../../Image/white_logo.png"
const Footer = () => {
  return (
    <div className='footer__section'>
      <div className='first__detail'>

        <h3>Customer Care</h3>
        <div className='first__detail__more'>
          <p>Help Center</p>
          <p>How to Buy</p>
          <p>Returns and Refunds</p>
          <p>Contact Us</p>


        </div>
        <h3>Earn with Saman</h3>
        <div className='first__detail__more'>
          <p>Sell on Saman</p>
          <p>Code of Conduct</p>
        </div>
      </div>
      <div className='second__detail'>
        <h3>Saman</h3>
        <div className='second__detail__more'>
          <p>About Saman</p>
          <p>Careers</p>
          <p>Saman Blog</p>
          <p>Terms and Condition</p>
        </div>
      </div>
      <div className='third__detail'>
        <img src={Image} />
      </div>
    </div>
  )
}

export default Footer