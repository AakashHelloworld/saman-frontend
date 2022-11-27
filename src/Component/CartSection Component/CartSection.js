import React,{useState, useEffect} from 'react'
import "./CartSection.css"
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import {MdOutlineDelete} from "react-icons/md"
import {useGlobalContext} from "../../StateManager/context"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const SingleCart = ({data})=>{
    const {URL} = useGlobalContext();
    const [quantityState, setQuantityState] = useState(data.quantity);
    const {Cart, dispatch} = useGlobalContext();

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

    const addQuantity = async() =>{
        if(quantityState<5){
            let passingArgument = {
                productId: data.productId._id,
                _id:data._id,
                quantity: quantityState+1 
            }   
            const instance = await axios.create({
                withCredentials: true
            })
              instance.patch(`${URL}api/v1/cart`,passingArgument).then((data)=>{
                console.log(data?.data?.data?.updateUser?.Cart, "hes")
                const Amount = calculatingAmout(data?.data?.data?.updateUser?.Cart)
                const passingArgument =
                { Cart: data?.data?.data?.updateUser?.Cart,
                  Amount
                }
                dispatch({type: "ADDSUB_CART",
                        payload: passingArgument
                    });
            setQuantityState((prev)=> {
                return(prev + 1)});
              });
        }else{
            setQuantityState(5)
        }
    }
    const subQuantity = async() =>{
        if((quantityState>1)){
            let passingArgument = {
                productId: data.productId._id,
                _id:data._id,
                quantity: quantityState-1 
            }
            const instance = await axios.create({
                withCredentials: true
            })
              instance.patch(`${URL}api/v1/cart`,passingArgument).then((data)=>{
                const Amount = calculatingAmout(data?.data?.data?.updateUser?.Cart)
                const passingArgument =
                { Cart: data?.data?.data?.updateUser?.Cart,
                  Amount
                }
                dispatch({type: "ADDSUB_CART",
                        payload: passingArgument
            })
            setQuantityState((prev)=> {return(prev - 1)});
              });
        }else{
            setQuantityState(1)
        }
    }


    const deleteHandler = async(e) =>{
        console.log(data._id, "hello world")
        let CartId = data._id;
        e.preventDefault();
        const instance = await axios.create({
            withCredentials: true
          })
          instance.post(`${URL}api/v1/cart/delete/${CartId}`).then((data)=>{
            console.log(data.data.data.Cart)

            const Amount = calculatingAmout(data.data.data.Cart)
            const passingArgument = {
                Cart:data?.data?.data?.Cart,
                Amount: Amount
            }
            dispatch({type:"UPDATE__CART", payload:passingArgument})

          });
    }

    return<div  className='single__cart'>
            <div className='single__cart__detail'>
                <img src={data?.productId?.image} />
                <h3 className='cartproduct__name'>{data?.productId?.name}</h3>
            </div>
            <div className='cartpriceContainer'>
                <h3 className='cartpriceContainer__price'>RS:{data.productId.price}</h3>
            </div>
            <div className='cartQuantity'>
            <div className='cartQuantityContainer'>
                <button onClick={subQuantity}><AiOutlineMinus /></button>
                <input bg-disabled="true" readOnly type="Number" value={quantityState} min='1' max='5' placeholder="1" />
                <button onClick={addQuantity}><AiOutlinePlus /></button>
            </div>
            <button onClick={deleteHandler} className='cartQuantity__delete'><MdOutlineDelete className='cartQuantity__delete_icon'/> </button>
            </div>
          </div>
}
 
const CartSection = () => {
    const {dispatch, Cart, CartAmount} = useGlobalContext();
    const navigate = useNavigate();
    const readytoOrderController = () =>{

        if(Cart.length){
            const passingArgument = {
                amount:CartAmount,
                product:Cart
            }
            dispatch({type: "READY_TO_CART", payload:passingArgument})
            navigate("/order");

        }

    }


  return (
    <div  className='cartHeroSection'>
    <div className='cartHeroSection__container'>
            {   !!Cart?.length &&
                Cart.map((data)=>{
                    return<SingleCart key={data._id} data={data}/>
                })

            }
    </div>
    <div className='checkoutSection'>
    <div className='checkoutSection__total'>
        <h2>Total</h2>
        <h3>Rs {CartAmount}</h3>
    </div>
        <button onClick={readytoOrderController} className='checkoutSection__button'>PROCEED TO CHECKOUT</button>
    </div>
    </div>
  )
}

export default CartSection