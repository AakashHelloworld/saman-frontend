import React from 'react'
import { Link } from 'react-router-dom'

const Category =({data})=>{
    return<div className='category'>
    <Link to={`/products/search/${data.toLowerCase()}`}>
        <h3 className='category_secondary'>
        {data}
        </h3>
    </Link>
            </div>
}



const CategoryList = () => {
    const Categories = [
        "Fashion",
        "Mobile",
        "Laptop",
        "Shoes",
        "Watches"
    ]
  return (
    <div className='categories_section'>
            <h3 className='category_primary'>Categories</h3>
            <div className='cateories'>
        {
            Categories.map((data)=>{
                return <Category  key={data} data={data}/>
            })
        }
        </div>
    </div>
  )
}

export default CategoryList