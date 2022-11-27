import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import Navbar from '../Component/Home/Navbar';
import Banner from '../Component/Home/Banner';
import MainContent from '../Component/Home/MainContent';
import Footer from '../Component/Home/Footer';
import SearchSection from '../Component/Home/SearchSection';
import { useGlobalContext } from '../StateManager/context';

const Home = () => {
  const {URL} = useGlobalContext();
  const [data, setData] = useState([]);

    const fetchData = async (e)=>{
      const instance = await axios.create({
        withCredentials: true
      })
      instance.get(`${URL}api/v1/products`).then((res)=>{
        setData(res.data.data.products)
      })
    
    };


  useEffect(()=>{
      fetchData();    
  },[])



  

  return (
    <>
      <Navbar/>
      <SearchSection/>
      <Banner/>
      <MainContent/>
      <Footer/>
    </>
  )
}

export default Home 