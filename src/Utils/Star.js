import {AiFillStar} from "react-icons/ai"

export const Star =({num})=>{
    if(num == 1){
        return <div className='review_primary_icons'><AiFillStar className='review_primary_icon'/></div>

    }else if(num == 2){
        return<div className='review_primary_icons'><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/></div>

    }else if(num ==3){
        return <div className='review_primary_icons'><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/></div>

    }else if(num ==4){
        return <div className='review_primary_icons'><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/></div>

    }else if(num==5){
        return <div className='review_primary_icons'><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/><AiFillStar className='review_primary_icon'/></div>

    }
}