import React, { useState,useEffect } from 'react'
import Search from './Search'
import {formatVietnameseToString, text} from '../../ultils/constant'
import Provine from './Provine'
import List from './List'
import Pagination from './Pagination'

import SidebarItem from '../../components/SidebarItem'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { prices,acreages } from '../../ultils/constant'
import RelatedPost from '../../components/RelatedPost'

const Rental = () => {
  const {  categories } = useSelector(state => state.app)
  const [categoryCurrent, setCategoryCurrent] = useState({})
  const [categoryCode, setCategoryCode] = useState('none')
  const location = useLocation()
  
  useEffect(() => {
      const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
      
      setCategoryCurrent(category)
      if (category) {
          setCategoryCode(category.code)
      }
  }, [location])
  return (
    <div className=' w-full flex flex-col gap-3 border border-red-600 '>
      
      <div>
          <h1 className='text-[28px] font-bold'>{categoryCurrent?.header}</h1>
          <p className='text-sm text-gray-700'>{categoryCurrent?.subheader}</p>
      </div>
      <Provine/>
      <div className='w-full flex '>
          <div className='w-[70%] border border-blue-600'>
          <List categoryCode={categoryCode}/>
          <Pagination />
        
          </div>
          <div className='w-[30%] border border-green-600 flex flex-col gap-4'>
             {/* <SidebarItem title='Danh sách cho thuê' contentLeft={categories}/> */}
             <SidebarItem title='Xem theo giá' contentLeft={prices.pricesL} contentRight={prices.pricesR}/>
             <SidebarItem title='Xem theo diện tích' contentLeft={acreages.acreagesL} contentRight={acreages.acreagesR}/>
             <RelatedPost/>
          </div>
      </div>
      </div>
  )
}

export default Rental