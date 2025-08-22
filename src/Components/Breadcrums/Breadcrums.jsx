import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrums = ({ product }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm font-medium my-5 mx-[10%] md:mx-[8%] sm:mx-[5%]">
      HOME 
      <img src={arrow_icon} alt="arrow" className="h-3 sm:h-2.5" />
      SHOP 
      <img src={arrow_icon} alt="arrow" className="h-3 sm:h-2.5" />
      {product.category}
      <img src={arrow_icon} alt="arrow" className="h-3 sm:h-2.5" />
      {product.name}
    </div>
  )
}

export default Breadcrums
