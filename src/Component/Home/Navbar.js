import React, {useEffect, useState} from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
import axios from "axios"
import { useGlobalContext } from '../../StateManager/context';
const Navbar = () => {
  const {URL} = useGlobalContext();
  const [userActive, setUserActive] = useState(false);
  const {dispatch,Username } = useGlobalContext();

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

  const isMe = async()=>{
    const instance = await axios.create({
      withCredentials: true,
    })
    instance.get(`${URL}api/v1/users/isme`).then((data)=>{
      console.log(data)
      setUserActive(true)
      const CartAmount = calculatingAmout(data?.data?.user?.Cart)
      const passingData = {Username: data?.data?.user?.Username,
                           Userid: data?.data?.user?._id,
                           Cart: data?.data?.user?.Cart,
                           CartAmount
                          }
      dispatch({type: "UPDATE_USER", payload: passingData})
    }).catch((err)=>{
    })

  }

  useEffect(()=>{
    isMe();
  },[])



  return (
    <div className='navbar'>
    <div className='navbar__top'>
        <Link to="/"><li>HOME</li></Link>
        <Link to={'/stores'}><li>SHOP</li></Link>
        { !userActive  ? <>
        <Link to={'/signup'}><li>SIGN UP</li></Link>
        <Link to={'/login'}><li>LOGIN</li></Link>
        </>:
        <>
        <Link><li>{Username?.toUpperCase()}</li></Link>
        <Link ><li>LOGOFF</li></Link>
        <Link to={"/cart"}><li>CART</li></Link>
        <Link to={'/orders'} >ORDER</Link>
        </>
        }
    </div>

    </div>
  )
}

export default Navbar