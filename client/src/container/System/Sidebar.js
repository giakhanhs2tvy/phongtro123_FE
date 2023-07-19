import React from 'react'
import noavatar from '../../assets/no-avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import menuSidebar from '../../ultils/menuSidebar'
import { NavLink } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import * as action from '../../store/action'
const Sidebar = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const activeStyle = 'hover:bg-gray-200 py-2 flex items-center gap-2 rounded-md font-bold '
    const notActiveStyle = 'hover:bg-gray-200 py-2 flex items-center gap-2 rounded-md'
    return (

        <div className='w-[256px] flex-none p-4 flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 items-center'>

                    <img src={currentUser?.avatar || noavatar} className='w-10 h-10 object-cover rounded-full shadow-md border-2 border-white' />
                    <div className='flex flex-col justify-center'>
                        <span className='font-semibold'>{currentUser.name}</span>
                        <span className='text-sm'>{currentUser.phone}</span>
                    </div>
                </div>
                <span>Mã thành viên: <small className='font-medium'>{currentUser?.id?.replace(/\D/g, "").slice(0, 8)}</small></span>
            </div>
            <div>
              {menuSidebar.map(item => {
                return (
                    <NavLink key={item.id} to={item.path} className={({ isActive }) => isActive ? activeStyle : notActiveStyle}>
                        {item?.icon}
                        {item.text}
                    </NavLink>
                )
            })
            }
            <span className={notActiveStyle} onClick={() =>dispatch(action.logout())}><AiOutlineLogout/> Thoát</span>  
            </div>
            
        </div>
    )
}

export default Sidebar