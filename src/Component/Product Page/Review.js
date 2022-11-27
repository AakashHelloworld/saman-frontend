import React, {useEffect, useState} from 'react'
import "./Review.css"
import StarRatingComponent from 'react-star-rating-component';
import {MdOutlineDelete} from "react-icons/md";
import axios from "axios"
import { useGlobalContext } from '../../StateManager/context';
import {Star} from "../../Utils/Star"


const SingleReview = ({data, productid, shopid, setReviewCollection}) =>{
  console.log(productid ? "product" : "shop")
  console.log(shopid)
    const {dispatch, URL} =useGlobalContext();
    const reviewDeleteHandler = async() =>{
        const instance = await axios.create({
            withCredentials: true
        })
          instance.delete(`${URL}api/v1/${productid ? "reviews":"shopreviews"}/delete/${data._id}/${productid ? productid : shopid}`).then((data)=>{
            console.log(data?.data?.data?.remainingReview)
            setReviewCollection(data?.data?.data?.remainingReview);
          });
          dispatch({type: "Run_reducer", payload: "hello reducer"})
    }

    const {Userid} = useGlobalContext();
    return<div className='singleReview'>
    <div className='singleReviewname_delete'>
                <h3 className='singleReview__primary'>{data?.user?.Username}</h3>

                { (Userid == data?.user?._id) &&
                <button onClick={reviewDeleteHandler} className='review__delete'><MdOutlineDelete className='review__delete_icon'/> </button>
                }
    </div>
                {
                    <Star num={data?.rating} />
                }
                <h3 className='singleReview__secondary'>{data?.review}</h3>
          </div>
}

const Review = ({review, productid, shopid}) => {
  const {URL} = useGlobalContext();
  const [reviewCollection, setReviewCollection] = useState([])
  useEffect(()=>{
    setReviewCollection(review)
  }, [review])
    const [createReviewData , setCreateReviewData ] = useState({review:"", rating:5});
    const changeHandler =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setCreateReviewData((data)=>{ return{...createReviewData, [name]:value}})
    }        
    const reviewChangeHandler =(next,prev,name) =>{
        setCreateReviewData((data)=> {return{...createReviewData, [name]:next}})
    }                                                  

    const submitHandler = async(e)=>{
        e.preventDefault();
        const instance = await axios.create({
            withCredentials: true
          })
          if(productid){
          instance.post(`${URL}api/v1/products/${productid}/reviews`, createReviewData).then((data)=>{ 
            console.log(data?.data?.data, "hello world")
            setReviewCollection(data?.data?.data?.newReview)    
            setCreateReviewData({review:"", rating:5})     
          });
        }
        if(shopid){
            instance.post(`${URL}api/v1/shops/${shopid}/shopreviews`,createReviewData ).then((data)=>{ 
              console.log(data?.data?.data, "hello world")
              setReviewCollection(data?.data?.data?.newReview)  
              setCreateReviewData({review:"", rating:5})        
          });
        }
    }
  return (
    <div className='review__section'>
            <h3 className='review__section__primary'>Reviews</h3>
            <div className='review__section__container'>
            <div className='average_review'>
                    <h3 className='average_rating'>4<span>/5</span></h3>
                    {
                        <Star num={5} />

                    }
                    <p className='average_no_rating'>131 Ratings</p>
            </div>
            <div className='create_review'> 
                    <input value={createReviewData.review} name="review" type="text" onChange={(e)=> changeHandler(e)} placeholder="Review" className='review_inputtag' />
                    <StarRatingComponent
                        name="rating"
                        value={createReviewData.rating}
                        starColor={"#faca51"}
                        className="create_icon"
                        onStarClick={reviewChangeHandler}
                     />
                     <button className='review__submit' onClick={submitHandler}>Submit</button>
            </div>
            </div>
            <div className='all_reviews'>  
                    { !!reviewCollection?.length ?
                      reviewCollection.map((data)=>
                        {
                            return <SingleReview key={data.id} setReviewCollection={setReviewCollection} reviewCollection={reviewCollection} data={data} shopid={shopid ? shopid : ""} productid={productid? productid : ""} />
                        }) : <h3 className='noreview'>No Review</h3>
                    }
            </div>
    </div>
  )
}

export default Review