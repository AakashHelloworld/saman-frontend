import React,{useState, useEffect} from 'react'
import Footer from '../Component/Home/Footer'
import Navbar from '../Component/Home/Navbar'
import SearchSection from '../Component/Home/SearchSection'
import "./OrderTrack.css"
import axios from "axios"
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../StateManager/context'
const Orders = () => {
    const [orders, setOrders]=  useState([]);
    const {URL} = useGlobalContext(); 

    const fetchmyOrders =async()=>{
        const instance = await axios.create({
            withCredentials: true
        })
          instance.get(`${URL}api/v1/order`).then((data)=>{
            console.log(data.data.data.AllOrder);
            setOrders(data.data.data.AllOrder)
    })
    }
        useEffect(()=>{
            fetchmyOrders();
            console.log("hey")
        },[])
  return (
    <>
        <Navbar />
        <SearchSection/>
        <div className='all_orders'>
        {  !!orders?.length &&
            orders.map((data)=>{
                return(

                    <div key={data?._id} className='single_order_item'>
                    <Link to={`/ordertrack/${data?._id}`}>
                        <h3>Order Number: {data?._id}</h3>
                        <h2 className='order_amount_primary'>Amount: <span> {data?.amount}</span></h2>
                        <h2 className='order_date_primary'>Date: <span>{data?.created}</span></h2>
                    </Link>
                    </div>
                )
            })
        }
        </div>
        <Footer/>
    </>
  )
}

export default Orders