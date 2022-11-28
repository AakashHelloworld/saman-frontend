import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {ImCross} from "react-icons/im"
import {toast } from "react-toastify"
import "./loginsignup.css"
import {Audio} from "react-loader-spinner"

import { useGlobalContext } from '../StateManager/context'
axios.defaults.withCredentials = true;
export const SignIn = () => {
  const {URL, loading, setLoading} = useGlobalContext();
  const navigate = useNavigate();
  const [signindata, setSignindata] = useState({Username:"", Email:"", Password:"", ConfirmPassword:""});


const changeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setSignindata((data) => {
      return { ...signindata, [name]: value };
    });
}

const submitHandler = async (e) =>{
    e.preventDefault();
    setLoading(true)
    const instance = await axios.create({
      withCredentials: true,
      headers: {authorization: "Bearer"}
    })
    instance.post(`${URL}api/v1/users/signup`,signindata ).then((data)=>{
      setLoading(false)
      toast.success('SignUp Sucessfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: 0,
        theme: "light",
        });
      navigate("/")
    }).catch((err)=>{
      setLoading(false)
      toast.error(err.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: 0,
        theme: "light",
        });
    })

  } 

  const backtohome = ()=>{
    navigate('/');
  }

  return (
    <>
    <div className="login__section">
    <div className='login__container'>
        <div className='login__off'>
            <button className='login__off__button'> <ImCross onClick={backtohome}className="login__off__icon" /></button>
        </div>
          <h3 className='login__primary'>SIGNUP</h3>
          <form className='login__form'>

          <input onChange={(e)=> changeHandler(e)} name="Username" className='login__form__input' type="text" placeholder='Username' />

          <input type="email" onChange={(e)=> changeHandler(e)} name='Email' className='login__form__input' placeholder='Email' />

          <input type="password" onChange={(e)=> changeHandler(e)} name='Password' className='login__form__input' placeholder='Password' />

          <input type="password" onChange={(e)=> changeHandler(e)} name='ConfirmPassword' className='login__form__input' placeholder='Confirm Password' />

          <button onClick={submitHandler} className='login__submit'>
          { !loading ?"SIGNUP":(
            <Audio
                height="20"
                width="30"
                radius="9"
                color="white"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
          )}
          </button>
          </form>
    </div>
    </div>

</>
  )
}









