import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../Component/Home/Navbar'
import SearchSection from '../Component/Home/SearchSection'
import axios from "axios"
import "./SearchPage.css"
import { Star } from '../Utils/Star';
import { Link } from 'react-router-dom';
import Footer from "../Component/Home/Footer"
import { useGlobalContext } from '../StateManager/context';
const SingleProduct = ({data}) =>{
  return<div className='single_product'>
  <Link to={`/product/${data?._id}`}>
          <div className='product_image'>
              <img src={data?.image} />
          </div>
          <div className='product_detail'>
              <h2 className='product_name'>{data.name.length > 50 ? data.name.slice(0, 50) + "..." :data.name }</h2>
              <h3 className='product_price'>{`RS:${data.price}`}</h3>
              <Star num={3} />
          </div>
          </Link>
       </div>
}



const SearchPage = () => {
    const [searchproducts, setSearchProducts] = useState();
    const location = useLocation().pathname.split('/')[3];
    const {URL} = useGlobalContext()
    console.log(location, "current Id")
    useEffect(()=>{
        const fetchdata = async()=>{
            const instance = await axios.create({
                withCredentials: true
              })
              instance.get(`${URL}api/v1/products/search/${location}` ).then((data)=>{
              console.log(data?.data?.data?.Products) 
              setSearchProducts(data?.data?.data?.Products)
            })
            }
            fetchdata()

    },[location])
  return (
    <>
    <Navbar/>
    <SearchSection/>
    <div className='SearchPage__container'>
    <div className='SearchPage'>
            {   !!searchproducts?.length ?
            searchproducts.map((data)=>{
                return  <SingleProduct data={data} key={data?._id} />
            }) : <h1 className='noproduct'>No Product</h1>
            }
    </div>
    </div>
    <Footer />
    </>
  )
}

export default SearchPage