import React,{useState, useEffect} from 'react'
import Footer from '../Component/Home/Footer'
import Navbar from '../Component/Home/Navbar'
import SearchSection from '../Component/Home/SearchSection'
import ProductHeroSection from '../Component/Product Page/ProductHeroSection'
import ProductSameStore from '../Component/Product Page/ProductSameStore'
import Review from '../Component/Product Page/Review'
import axios from 'axios';
import {useLocation} from "react-router-dom";
import { useGlobalContext } from '../StateManager/context'
import {Triangle} from "react-loader-spinner"
const ProductPage = () => {
  const [productData, setProductData] = useState({})
  const [similarShopProducts, setSimilarShopProducts] = useState([]);
  const {URL, loading, setLoading} = useGlobalContext();
  const location = useLocation().pathname.split('/')[2];
  useEffect(() => {
    setLoading(true)
    const data = axios.get(`${URL}api/v1/products/${location}`).then((data)=>{
    setProductData(data.data.data.product)
    setLoading(false)
  }).catch((err)=>{
      setLoading(false)
    console.log(err)
  })
  }, [location])

  useEffect(()=>{
    if(productData.id && productData.shop.id){
    const data = axios.get(`${URL}api/v1/shops/${productData.shop.id}`).then((data)=>{
      setSimilarShopProducts(data?.data?.data?.shop?.products)

  }).catch((err)=>{
        console.log(err)
      })
    }

  }, [productData?.id,productData?.shop?.id, location ])
   
  return (
    <>
     <Navbar/>
      <SearchSection/>
    <div className='ProductPage_section'>
    { !loading ? (
      <>
      <ProductHeroSection productData={productData} />
      <Review review={productData?.reviews?.length ? productData?.reviews : []} productid={productData?.id}/>
      <ProductSameStore data={similarShopProducts || []} />
      </>
    ) : (<Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />)
    }
    </div>
    <Footer/>
    </>
  )
}

export default ProductPage