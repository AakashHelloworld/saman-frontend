import React, { useState } from 'react'
import "./ProductHeroSection.css"
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import {BiLocationPlus} from "react-icons/bi"
import {BsCashCoin, BsShop} from "react-icons/bs"
import {TbTruckDelivery} from "react-icons/tb"
import { Star } from '../../Utils/Star';
import axios from "axios"
import { useGlobalContext } from '../../StateManager/context';
import {ImCross} from "react-icons/im"
import { useNavigate } from 'react-router-dom';
import {toast } from "react-toastify"
const ProductHeroSection = ({productData}) => {
    const {dispatch, URL} = useGlobalContext();
    const navigate = useNavigate();
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
    const calculatingAmout =(passingArgument)=>{
        let Amount = 0;
        if(passingArgument.length){
            passingArgument.forEach(data => {
                Amount = Amount + data?.quantity*data?.productId?.price
            });
            return Amount
        }else{
            return Amount
        }

    }

    const cartHandler = async(e)=>{
        const id =productData.id;
        if(id){
        const instance = await axios.create({
            withCredentials: true
          })

          const passingCart = {
                        productId: id,
                        quantity:1,
                        }

          instance.post(`${URL}api/v1/cart`, passingCart).then((data)=>{
            const Amount =calculatingAmout(data.data.data.Cart)
            const passingArgument ={ Cart: data.data.data.Cart,
                                    Amount}
            dispatch({type: "UPDATE__CART", payload: passingArgument})
            toast.success('Product Added to Cart',{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: 0,
                theme: "light",
            })
        })
        }
    }

    const buyhandler = async(e)=>{
        const id =productData.id;
        if(id){
        const instance = await axios.create({
            withCredentials: true
          })

          const passingCart = {
                        productId: id,
                        quantity:1,
                        }

          instance.post(`${URL}api/v1/cart`, passingCart).then((data)=>{
            const Amount =calculatingAmout(data.data.data.Cart)
            const passingArgument ={ Cart: data.data.data.Cart,
                                    Amount}
            dispatch({type: "UPDATE__CART", payload: passingArgument})
            navigate('/cart')
        })
        }
    }

    const locationmodelon =()=>{
        setLocationmodel(true)
    }
    const locationmodeloff =()=>{
        setLocationmodel(false)
    }

  return (
    <>
    <div className='ProductHeroSection'>
        <div className='ProductHeroSection_imageSection'>
            <img src={productData?.image} />
        </div>
        <div className='ProductHeroSection_detail'>
                <h4 className='product_name'>{productData?.name}</h4>
                {
                    <Star num={productData.stock} />
                }
                <h4 className='product_price'>RS: {productData?.price}</h4>
                <div className='inputtagNextPage'>
                    <span>Quantity:</span>
                    <div>
                    <button><AiOutlineMinus /></button>
                    <input type="Number" min='1' max='5' placeholder="1" />
                    <button><AiOutlinePlus /></button>
                    </div>
                </div>
                <div className='ProductHeroSection_button'>
                <button onClick={buyhandler} className='buy_button'>Buy Now</button>
                <button onClick={cartHandler} className='cart_B'>Add to Cart</button>
                </div>
        </div>
        <div className='ProductHeroSection__delivery'>
                <div className='ProductHeroSection__delivery__container'>
                    <h3>Delivery</h3>
                    <div className='ProductHeroSection__delivery__detail__one'>
                        <BiLocationPlus className='delivery_icon' />
                        <p>{location?.name}</p>
                        <button onClick={locationmodelon} className='changelocation'>Change</button>
                    </div>
                    <div className='ProductHeroSection__delivery__detail__one'>
                        <TbTruckDelivery className='delivery_icon' />
                        <p>Standard Delivery ( 4 -5 Days )</p>
                        <p>{location?.price}</p>
                    </div>
                    <div className='ProductHeroSection__delivery__detail__one'>
                        <BsCashCoin className='delivery_icon' />
                        <p>Cash on delivery</p>
                    </div>
                    <div className='ProductHeroSection__delivery__detail__one'>
                        <BsShop className='delivery_icon' />
                        <p className='visit_shop'>Visit Store</p>
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
    </div>
    <div className='Product_description'>
        <h1 className='Product_description_primary'>Description</h1>
        <div className='Product_description__content'>
                <p>{productData.description}</p>
        </div>
    </div>

    </>

  )
}

export default ProductHeroSection