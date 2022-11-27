import React from 'react'
import "./ShopHeroSection.css"
import {GoVerified} from "react-icons/go"
import { Star } from '../../Utils/Star';
import { Link } from 'react-router-dom';
const SingleProduct = ({storeData}) =>{

    return<div className='single_product'>
    <Link></Link>
            <div className='product_image'>
                <img src={storeData.image} />
            </div>
            <div className='product_detail'>
                <h2 className='product_name'>{storeData.name.length > 50 ? storeData.name.slice(0, 50) + "..." :storeData.name }</h2>
                <h3 className='product_price'>{`RS:${storeData.price}`}</h3>
                <Star num={storeData?.stock} />
            </div>
         </div>
}
const ShopHeroSection = ({storeData}) => {

  return (
    <>
    <div className='ShopHeroSection'>
        <div className='primary__ShopHeroSection'>
        <h3 className='shop_name'>{storeData.name} <span className='verified_container'>{<> <GoVerified className='verified_icon'/><span className='verified_text'>Verified</span></>}</span></h3>
        <p className='store__description'>{storeData.description}</p>
        <h4 className='store_average'>4<span>/5</span></h4>
        </div>
       <Star num={5} />
    </div>
    <div className='ShopProducts'>
    <h3 className='ShopProducts__primary'>Products</h3>
    <div className='ShopProducts__container'>
    {
        storeData?.products?.map((storeData)=>{

            return<SingleProduct storeData={storeData} />
        })
    }
    </div>
    </div>
    </>
  )
}

export default ShopHeroSection