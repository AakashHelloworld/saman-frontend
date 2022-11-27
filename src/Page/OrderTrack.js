import React, {useState,useEffect} from 'react'
import Navbar from '../Component/Home/Navbar'
import SearchSection from '../Component/Home/SearchSection'
import { GoPackage } from 'react-icons/go'
import {GiHelicopter} from "react-icons/gi"
import {SiHackthebox} from "react-icons/si"
import "./OrderTrack.css"
import {ImMan} from "react-icons/im"
import Footer from '../Component/Home/Footer'
import { useLocation } from 'react-router-dom'
import axios from "axios"
import { useGlobalContext } from '../StateManager/context'
const SingleOrder =({data})=>{
    return<div className='single__cart'>
            <div className='single__cart__detail'>
                <img src={data?.productId?.image} />
                <h3 className='cartproduct__name'>{data?.productId?.name}</h3>
            </div>
            <div className='cartpriceContainer'>
                <h3 className='cartpriceContainer__price'>RS:{data?.productId?.price}</h3>
                <h3 className='single__cart__quantity'>Quantity: {data.quantity}</h3>
            </div>
          </div>
}


const OrderTrack = () => {
    const {URL} = useGlobalContext();
        const [ordertrackdata, setOrdertrackdata] = useState({});

        const location = useLocation().pathname.split('/')[2]

        const fetchingData = async()=>{
            const instance = await axios.create({
                withCredentials: true,

            })
            instance.get(`${URL}api/v1/order/${location}`).then((data)=>{
                setOrdertrackdata(data?.data?.data?.singleOrder);
        })
        }
        useEffect(()=>{
        fetchingData()
        }, [])

  return (
    <>
    <Navbar />
    <SearchSection />
    <div className='order__track'>
        <div className='order__track_container'>
            <div style={{borderColor:'rgb(52 211 153)'}}>
                <GoPackage className='packaging_icon' />
                <h3 style={{color:'rgb(52 211 153)'}}>Packaging</h3>
            </div>
            <div>
                <GiHelicopter className='traveling_icon' />
                <h3>Traveling</h3>
            </div>
            <div>
                <SiHackthebox className='deliver_icon' />
                <h3>Delived</h3>
            </div>
            <div>
                <ImMan className="receive_icon" />
                <h3>Recieved</h3>
            </div>
        </div>
        <div className='orderHeroSection__container'>
                <h3 className='orderHeroSection__container__primary'>Total: Rs {ordertrackdata?.amount}</h3>
                <div>
                <h3>
                    Location: {ordertrackdata?.location}
                </h3>
                <div className='total__order'>
                {ordertrackdata?.orderedItems?.length &&
                    ordertrackdata?.orderedItems?.map((data)=>{
                        return <SingleOrder key={data.productName} data={data} />
                    })
                }
                </div>
                </div>
        </div>

    </div>
    <Footer />
    </>
  )
}

export default OrderTrack