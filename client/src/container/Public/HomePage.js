import React,{useEffect} from 'react'
import Search from './Search'
import {text} from '../../ultils/constant'
import Provine from './Provine'
import List from './List'
import Pagination from './Pagination'
import { useSearchParams } from 'react-router-dom'
import SidebarItem from '../../components/SidebarItem'
import { useDispatch,useSelector } from 'react-redux'
import * as action from '../../store/action'
import { prices,acreages } from '../../ultils/constant'
import RelatedPost from '../../components/RelatedPost'

const HomePage = () => {
  const [prams] = useSearchParams()
 
  const {categories} = useSelector(state => state.app)
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(action.getCategories())
    dispatch(action.getPrices())
    dispatch(action.getAreas())
    dispatch(action.getProvinces())
  },[])
  return (
    <div className=' w-full flex flex-col gap-3 border border-red-600 '>
      
      <div>
          <h1 className='text-[28px] font-bold'>{text.HOME_TITLE}</h1>
          <p className='text-sm text-gray-700'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Provine/>
      <div className='w-full flex '>
          <div className='w-[70%] border border-blue-600'>
          <List />
          <Pagination number={prams.get('page')}/>
        
          </div>
          <div className='w-[30%] border border-green-600 flex flex-col gap-4'>
             <SidebarItem title='Danh sách cho thuê' contentLeft={categories}/>
             <SidebarItem title='Xem theo giá' contentLeft={prices.pricesL} contentRight={prices.pricesR}/>
             <SidebarItem title='Xem theo diện tích' contentLeft={acreages.acreagesL} contentRight={acreages.acreagesR}/>
             <RelatedPost/>
          </div>
      </div>
      </div>
  )
}

export default HomePage