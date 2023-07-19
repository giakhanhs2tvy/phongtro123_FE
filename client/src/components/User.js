import React from 'react'
import { useSelector } from 'react-redux'
import noavatar from '../assets/no-avatar.png'
const User = () => {
const { currentUser } = useSelector(state => state.user)
  return (
    <div className='flex items-center gap-2'>
        <img  src={currentUser?.avatar || noavatar} className='w-10 h-10 object-cover rounded-full shadow-md border-2 border-white'/>
        <span>Xin Chào,<span className='font-semibold text-pink-500'>{currentUser.name}</span>!</span>
    </div>
  )
}

export default User