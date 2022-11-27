import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ImCross } from 'react-icons/im'
import {toast } from "react-toastify"
import { useGlobalContext } from '../StateManager/context'
export const LogIn = () => {
  const {URL} = useGlobalContext();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
                                          Email:"",
                                          Password:""
  })
  const changeHandler=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((data) => {
      return { ...loginData, [name]: value };
    });

  }

  const loginHandler = async(e)=>{
    e.preventDefault();
    const instance = await axios.create({
      withCredentials: true
    })
    instance.post(`${URL}api/v1/users/login`,loginData ).then((data)=>{
      console.log(data)
      toast.success('Login Sucessfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: 0,
        theme: "light",
        });
      navigate("/");
    }).catch((err)=>{
      toast.success(err.message, {
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
   
    <div className="login__section">
    <div className='login__container'>
        <div className='login__off'>
            <button className='login__off__button'> <ImCross onClick={backtohome} className="login__off__icon" /></button>
        </div>
          <h3 className='login__primary'>LOGIN</h3>
          <form className='login__form'>

          <input type="email" onChange={(e)=> changeHandler(e)} name='Email' className='login__form__input' placeholder='Email' />

          <input type="password" onChange={(e)=> changeHandler(e)} name='Password' className='login__form__input' placeholder='Password' />

          <button onClick={loginHandler} className='login__submit'>LOGIN</button>
          </form>
    </div>
    </div>
  )
}
