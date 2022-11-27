import React, { useEffect, useState } from 'react'
import { Star } from '../../Utils/Star';
import {GoVerified} from "react-icons/go";
import "./storeSection.css"
import axios from "axios"
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../StateManager/context';
const SingleProduct = ({data}) =>{

    return<div className='single_product'>
        <Link to={`/product/${data?._id}`} >
            <div className='product_image'>
                <img src={data.image} />
            </div>
            <div className='product_detail'>
                <h2 className='product_name'>{data.name.length > 50 ? data.name.slice(0, 50) + "..." :data.name }</h2>
                <h3 className='product_price'>{`RS:${data.price}`}</h3>
                <Star num={data?.stock} />
            </div>
        </Link>
         </div>
}


const SingleStore = ({data})=>{
    return     <>
    <div className='ShopHeroSection'>
    <Link to={`/store/${data._id}`}>
        <div className='primary__ShopHeroSection'>
        <h3 className='shop_name'>{data?.name} <span className='verified_container'>{<> <GoVerified className='verified_icon'/><span className='verified_text'>Verified</span></>}</span></h3>
        <p className='store__description'>{data?.description}</p>
        <h4 className='store_average'>4<span>/5</span></h4>
        </div>
       <Star num={5} />
       </Link>
    </div>
    <div className='ShopProducts'>
    <h3 className='ShopProducts__primary'>Products of {data?.name}</h3>
    <div className='ShopProducts__container'>
    {
        data?.products?.map((data, index)=>{
            if(index<5){
            return<SingleProduct data={data} />
            }
        })
    }
    </div>
    </div>

    </>
}

const StoresSection = () => {
    const {URL} = useGlobalContext();
    const [shopdata, setShopdata] = useState([]);
    useEffect(()=>{
            const fetchingData =async()=>{
                const instance = await axios.create({
                    withCredentials: true
                })
                  instance.get(`${URL}api/v1/shops`).then((data)=>{
                    console.log(data?.data?.data?.ShopAll);
                    setShopdata(data?.data?.data?.ShopAll)
            })
            }
            fetchingData();
            
    }, [])

  return (
    <div className='StoreHeroSection__container'>
        <div className='StoreHeroSection'>
    {
        !!shopdata.length &&
        shopdata?.map((data, index)=>{
            return <SingleStore key={data._id} data={data} />
            
        })
    }
    </div>
    </div>
  )
}

export default StoresSection