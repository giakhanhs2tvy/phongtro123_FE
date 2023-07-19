import React from 'react'
import  {Header, Sidebar } from './'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { path } from '../../ultils/constant'

const System = () => {
    const { isLoggIn } = useSelector(state => state.auth) 
    if(!isLoggIn) return <Navigate to={path.LOGIN} replace={true} />
  return (
    <div className='w-full h-screen flex flex-col items-center'>
        <Header/>
        <div className='flex w-full flex-auto'>
            <Sidebar/>
            <div className='flex-auto bg-white shadow-md p-4 h-full'>
                <Outlet/>   
            </div>
        </div>
    </div>
  )
}

export default System