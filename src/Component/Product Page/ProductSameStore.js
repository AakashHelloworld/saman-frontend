import React, {useState, useEffect} from 'react'
import "./ProductSameStore.css"
import { AiFillStar } from 'react-icons/ai'
import axios from "axios"
import {Star} from "../../Utils/Star"
import { Link } from 'react-router-dom'
const SingleProduct = ({data}) =>{
    return<div className='single_product'>
    <Link to={`/product/${data._id}`}>
            <div className='product_image'>
                <img src={data.image} />
            </div>
            <div className='product_detail'>
                <h2 className='product_name'>{data.name.length > 50 ? data.name.slice(0, 50) + "..." :data.name }</h2>
                <h3 className='product_price'>{`RS:${data.price}`}</h3>
               =<Star num={5} />
            </div>
            </Link>
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