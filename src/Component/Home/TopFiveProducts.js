import React, { useEffect, useState } from 'react'
import {AiFillStar} from "react-icons/ai"
import {Link} from "react-router-dom"
import axios from "axios"
import {Star} from "../../Utils/Star"
import { useGlobalContext } from '../../StateManager/context'
import {Triangle} from "react-loader-spinner"

const SingleProduct = ({data}) =>{
    return<div className='single_product'>
                <Link key={data._id} to={`/product/${data.id}`}>
            <div className='product_image'>
                <img src={data.image} />
            </div>
            <div className='product_detail'>
                <h2 className='product_name'>{data.name.length > 50 ? data.name.slice(0, 50) + "..." :data.name }</h2>
                <h3 className='product_price'>{`RS:${data.price}`}</h3>
                    <Star num={5} />
            </div>
            </Link>
         </div>
}




const TopFiveProducts = () => {
    const {URL, loading, setLoading} = useGlobalContext();
    const [topfive, setTopFive] = useState([]);

    const fetchdata = async()=>{
        setLoading(true);
        const instance = await axios.create({
            withCredentials: true
        })
    instance.get(`${URL}api/v1/products/topfive?sort=price&limit=5`).then((data)=>{
            setTopFive(data.data.data.products)
            setLoading(false)
            console.log(data.data.data.products)
    }).catch((err)=>{
        console.log(err)
    })
}


    useEffect(()=>{
        fetchdata();
    }, [])


  return (
    <div className='home_products'>
    <h3 className='BestProduct_primary'>Best Products</h3>
    <div className='home_products_container'>
          { !loading ?
            <>
            { !!topfive?.length &&
                topfive?.map((data)=>{
                    return<SingleProduct key={data._id}  data={data}/>
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
    </div>
  )
}

export default TopFiveProducts