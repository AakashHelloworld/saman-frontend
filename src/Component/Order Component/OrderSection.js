import React,{useState} from 'react'
import "./OrderSection.css"
import { BsCashCoin } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import {BiLocationPlus} from "react-icons/bi"
import { useGlobalContext } from '../../StateManager/context'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ImCross } from 'react-icons/im'
import {toast} from "react-toastify"
const SingleOrder =({data, quantity})=>{
    return<div className='single__cart'>
            <div className='single__cart__detail'>
                <img src={data?.image} />
                <h3 className='cartproduct__name'>{data?.name}</h3>
            </div>
            <div className='cartpriceContainer'>
                <h3 className='cartpriceContainer__price'>RS:{data?.price}</h3>
                <h3 className='single__cart__quantity'>Quantity: {quantity?quantity:""}</h3>
            </div>
          </div>
}

const OrderSection = () => {
    const {URL} = useGlobalContext();
    const {CartReadytoOrder} = useGlobalContext();
    const [locationmodel, setLocationmodel] = useState(false);
    const locations = [
        {
            name:'Lumbini',
            price:80
        },
        {
            name:'Kathmandu',
            price:100
        },
        {
            name:'Palpa',
            price:80
        },
        {
            name:'Pokhara',
            price:100
        },
        {
            name:'Dharan',
            price:130
        }
    ]
    const [location, setLocation] = useState({name:'Lumbini',price: 80})
    const locationchangehandler =(e)=>{
        console.log(e.target.value);
        const location = locations.filter((data)=>data.name == e.target.value)[0];
        setLocation(location)
    }
    const navigate = useNavigate();
    const finalOrder =async()=>{
        if(CartReadytoOrder?.amount && CartReadytoOrder.product?.length){
            let Ordered =[];
            CartReadytoOrder.product.forEach((data)=>{
                let item ={
                         productId: data.productId._id,
                         quantity:data.quantity
                        }
                Ordered.push(item)
                    }   
            )
            console.log(Ordered, "heelo worldwr")
            let passingArgument ={
                location: location?.name,
                amount:CartReadytoOrder?.amount + location?.price,
                orderedItems: Ordered
            }
            const instance = await axios.create({
                withCredentials: true
            })
              instance.post(`${URL}api/v1/order`,passingArgument).then((data)=>{
                console.log(data.data);
                toast.success('Sucessfully submitted please wait for the reply',{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: 0,
                    theme: "light",
                })
                navigate('/orders')
        })
        }}
        const locationmodelon =()=>{
            setLocationmodel(true)
        }
        const locationmodeloff =()=>{
            setLocationmodel(false)
        }
    

  return (
    <div className='orderHeroSection'>
        <div className='orderHeroSection__container'>
                {   CartReadytoOrder?.product?.length &&
                    CartReadytoOrder?.product?.map((data)=>{
                        return <SingleOrder key={data?._id} data={data?.productId} quantity={data?.quantity} />
                    })
                }
        </div>
        <div className='checkoutSection'>
        <div className='order__delivery'>
                <div className='order__delivery__container'>
                    <h3>Delivery</h3>
                    <div className='order__delivery__detail__one'>
                        <BiLocationPlus className='delivery_icon' />
                        <p>{location?.name}</p>
                        <button onClick={locationmodelon} className='changelocation'>Change</button>
                    </div>
                    <div className='order__delivery__detail__one'>
                        <TbTruckDelivery className='delivery_icon' />
                        <p>Standard Delivery ( 4 -5 Days )</p>
                        <p>{location?.price}</p>
                    </div>
                    <div className='order__delivery__detail__one'>
                        <BsCashCoin className='delivery_icon' />
                        <p>Cash on delivery</p>
                    </div>
                </div>
                { locationmodel &&
                <div className='locationmodel__container'>
                    <div className='locationmodel' >
                    <ImCross className='locationmodel_off__icon' onClick={locationmodeloff} />
                    <select className='location__select' onChange={(e)=> locationchangehandler(e)}>
                        <option value={'Lumbini'}>Lumbini</option>
                        <option value={'Kathmandu'}>Kathmandu</option>
                        <option value={'Dharan'}>Dharan</option>
                        <option value={'Pokhara'}>Pokhara</option>
                        <option value={'Palpa'}>Palpa</option>
                    </select>


                    </div>
                </div>
                }
        </div>
            <div className='checkoutSection__total'>
                <h2>Total</h2>
                <h3>Rs {CartReadytoOrder?.amount} + {location?.price}</h3>
            </div>
        <button onClick={finalOrder} className='checkoutSection__button'>Place Order</button>
        </div>
    </div>
  )
}

export default OrderSection