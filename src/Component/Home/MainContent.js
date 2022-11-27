import React from 'react'
import CategoryList from './CategoryList'
import "./MainContent.css"
import Products from './Products'
import TopFiveProducts from './TopFiveProducts'
const MainContent = () => {
  return (
    <div className='maincontent_section'>
    <div className='maincontent_section_container'>
        <CategoryList />
        <TopFiveProducts />
        <Products />
    </div>
    </div>
  )
}

export default MainContent