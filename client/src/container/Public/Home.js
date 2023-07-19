import React, { useEffect } from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';
import {Navigation,Search} from './index';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/action'
export const Home = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const { isLoggIn } = useSelector(state => state.auth)
  useEffect(()=>{
    setTimeout(()=>{
      isLoggIn &&  dispatch(action.getCurrent())
   },1000)
  },[isLoggIn])
  
  return (
    <div className='w-full  flex flex-col items-center '>
       <Header/>
        <Navigation/>
        <Search />
        {/* {isLoggedIn && <Search />} */}
        <div className='w-1100 flex flex-col items-center justify-start '>
            <Outlet/>
        </div>
    </div>
  )
}
export default Home;