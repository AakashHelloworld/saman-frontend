import React,{useState, useEffect} from 'react'
import Navbar from '../Component/Home/Navbar'
import SearchSection from '../Component/Home/SearchSection'
import ShopHeroSection from '../Component/StorePageComponent/ShopHeroSection'
import Review from "../Component/Product Page/Review"
import Footer from "../Component/Home/Footer"
import axios from  "axios"
import { useLocation } from 'react-router-dom'
import { useGlobalContext } from '../StateManager/context'
const Store = () => {
  const {dispatch} = useGlobalContext();
  const [storeData, setStoreData] = useState({})

  const location = useLocation().pathname.split('/')[2];

  useEffect(()=>{
    console.log(location)
    const data = axios.get(`http://localhost:4000/api/v1/shops/${location}`).then((data)=>{
      console.log(data?.data?.data?.shop)
      setStoreData(data?.data?.data?.shop)
  }).catch((err)=>{
        console.log(err)
      })

  }, [storeData?.id])

  return (
    <>
    <Navbar/>
    <SearchSection/>
    <div className='store__section'>
        <ShopHeroSection storeData={storeData}/>
        <Review review={storeData?.reviews?.length ? storeData?.reviews : []} shopid={storeData?._id} />
    </div>
    <Footer />
    </>
  )
}

export default Store