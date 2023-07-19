import React,{useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'
import { apiGetCategory } from '../../services/category'
import { formatVietnameseToString } from '../../ultils/constant'
import { useDispatch,useSelector } from 'react-redux'
import * as action from '../../store/action'
const notActive = 'hover:bg-secondary h-full flex items-center px-4 bg-secondary'
const active = 'hover:bg-primary2 h-full flex items-center px-4 bg-secondary '
const Navigation = () => {

  
  const {categories} = useSelector(state => state.app)
  
  const dispatch = useDispatch()
  useEffect(()=>{
   
    dispatch(action.getCategories())
  },[])

  return (
    <div className='w-full flex justify-center items-center
    h-[40px] bg-secondary text-white mb-2'>
        <div className='w-1100 h-full flex items-center text-sm font-medium '>
        <div className='h-full flex items-center justify-center'>
              <NavLink to={'/'}
              className={({isActive})=> isActive ?  active: notActive }
              >
                Trang chủ
              </NavLink>
            </div>
           {categories?.length >0 && categories.map((item)=>{
            return (
            <div key={item.code} className='h-full flex items-center justify-center'>
              <NavLink 
              to={formatVietnameseToString(item.value)}
              className={({isActive})=> isActive ?  notActive : active }
              >
                {item.value}
              </NavLink>
            </div>
            )
           
           })}
        </div>
    </div>
  )
}

export default Navigation