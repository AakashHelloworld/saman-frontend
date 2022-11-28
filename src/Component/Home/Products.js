import React, { useState, useEffect } from 'react';
import axios from "axios";
import {AiFillStar} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Star } from '../../Utils/Star';
import { useGlobalContext } from '../../StateManager/context';
import {Audio, Triangle} from "react-loader-spinner"

const SingleProduct = ({data}) =>{
    return<div className='single_product'>
    <Link to={`/product/${data._id}`}>
            <div className='product_image'>
                <img src={data.image} />
            </div>
            <div className='product_detail'>
                <h2 className='product_name'>{data.name.length > 50 ? data.name.slice(0, 50) + "..." :data.name }</h2>
                <h3 className='product_price'>{`RS:${data.price}`}</h3>
                <Star num={4} />
            </div>
            </Link>
         </div>
}
const Products = () => {
    const {URL, loading, setLoading} = useGlobalContext();
    const [productdata, setProductdata] = useState([]);
    const[loadmorecondition, setLoadmorecondition] = useState(true)
    const [loadmoreloading, setLoadmoreloading] = useState(false)
    const[activepage, setActivepage] = useState(1);
    const fetchdata = async()=>{
        setLoading(true);
        setLoadmoreloading(true);
        const instance = await axios.create({
            withCredentials: true
        })
          instance.get(`${URL}api/v1/products?page=${activepage}&limit=5`).then((data)=>{
            console.log(data?.data?.data?.products)
            const products = data?.data?.data?.products;
            setLoading(false)
            setLoadmoreloading(false)
            if(products.length){
            setProductdata((data)=>{
                return[...data, ...products]
                setLoadmoreloading(false)
            })
        }else{
            setLoadmorecondition(false)
        }
            
    })
}
   useEffect(()=>{
    fetchdata();
   },[setActivepage, activepage])
   const pageHandler =()=>{
    setActivepage((prev)=>prev+1);
   }


  return (
    <div className='home_products'>
    <h3 className='BestProduct_primary'>Products</h3>
    <div className='home_products_container'>
           { !loading ?
            <>
            {!!productdata.length &&
                productdata?.map((data)=>{
                    return <SingleProduct key={data.id} data={data}/>
                })

            }
            </> :       
            <div style={{display:'flex', justifyContent: 'center'}}>
            <Triangle
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
            </div>
           }
    </div>
    { loadmorecondition &&
    <div className='load_more_container'>
            <button className='load_more_button' onClick={pageHandler}>
                { !loadmoreloading ? "LOAD MORE"
                : (
            <Audio
                height="20"
                width="30"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
          )
                }
            </button>
    </div>
    }
    </div>)
}

export default Products

// grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));