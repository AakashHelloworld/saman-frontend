import React, {useState, useEffect} from 'react'
import "./ProductSameStore.css"
import { AiFillStar } from 'react-icons/ai'
import axios from "axios"

const SingleProduct = ({data}) =>{
    const star =(num)=>{
        if(num == 1){
            return <div className='product_icons'><AiFillStar className='product_icon'/></div>
    
        }else if(num == 2){
            return<div className='product_icons'><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/></div>
    
        }else if(num ==3){
            return <div className='product_icons'><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/></div>
    
        }else if(num ==4){
            return <div className='product_icons'><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/></div>
    
        }else if(num==5){
            return <div className='product_icons'><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/><AiFillStar className='product_icon'/></div>
    
        }
    }
    return<div className='single_product'>
            <div className='product_image'>
                <img src={data.image} />
            </div>
            <div className='product_detail'>
                <h2 className='product_name'>{data.name.length > 50 ? data.name.slice(0, 50) + "..." :data.name }</h2>
                <h3 className='product_price'>{`RS:${data.price}`}</h3>
                {
                    star(data?.stock)
                }
            </div>
         </div>
}

const ProductSameStore = ({data}) => {

  return (
    <div className='ProductSameStore'>
        <h3 className='ProductSameStore__primary'>Products of same store</h3>
        <div className='ProductSameStore_products'>
                { !!data.length ?
                    data?.map((data, index)=>{
                        if(index<5){
                        return <SingleProduct key={data._id} data={data} />
                        }
                    }) : <h3>No Product Left</h3>
                }
        </div>
    </div>
  )
}

export default ProductSameStore