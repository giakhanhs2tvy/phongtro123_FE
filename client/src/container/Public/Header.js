import React, { useCallback, useRef,useEffect,useState } from 'react'
import logo from '../../assets/logo.PNG';
import {Button, User} from '../../components';
import icons from '../../ultils/icon';
import menuManage from '../../ultils/menuManage';
import { useNavigate,Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/action'

const {AiOutlinePlusCircle,AiOutlineLogout,BsChevronDown} = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowMenu, setisShowMenu] = useState(false)
  const {isLoggIn} = useSelector(state => state.auth);
  const [searchParams] = useSearchParams();
  const headerRef = useRef()
  const goLogin = useCallback((flag) =>{
    navigate('/login',{state:{flag}})
  },[])
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
}, [searchParams.get('page')])
  return (
    <div ref={headerRef} className=' w-1100 flex  items-center justify-between '>  <Link to ={'/'}>

            <img
                src={logo}
                alt='logo'
                className='w-[240px] h-[70px] object-contain'
            />
        </Link>
        <div className='flex items-center gap-1'>
            
          {!isLoggIn && <div className='flex items-center gap-1'>
            
           <span>Rental Hihi xin chào !</span>
           
            <Button text={'Đăng ký'} 
            textColor='text-white' 
            bgColor='bg-secondary'
            onClick={() => goLogin(true)}/>
            <Button text={'Đăng nhập'} 
            textColor='text-white' 
            bgColor='bg-secondary' 
            onClick={() => goLogin(false)}/>
           </div>}
           {isLoggIn && <div className='flex items-center gap-3'>
            
           <User/>
           <div className='relative'>
            <Button text={'Quản lí tài khoản'} 
            textColor='text-white' 
            bgColor='bg-blue-600'
            IcAfter={BsChevronDown}
            onClick={()=> setisShowMenu(prev => ! prev)}
            />
            {isShowMenu && <div className='absolute border border-red-500 top-full left-0 bg-white shadow-md p-4 w-[200px] flex flex-col gap-2'>
             { menuManage.map(item =>{
              return(
                <Link key={item.id} to={item.path} className='hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2 flex items-center gap-2'>
                  {item?.icon}
                  {item.text}
                </Link>
              )
             })
             }
             <span className='hover:text-orange-500 text-blue-600 border-b cursor-pointer flex items-center gap-2' 
             onClick={() => {
              setisShowMenu(false)
              dispatch(action.logout())
              } }>
              <AiOutlineLogout/>
              Đăng xuất
              </span>
            </div>}
           </div> 
           </div>}
            <Button text={'Đăng tin mới'} 
            textColor='text-white' 
            bgColor='bg-primary2' 
            IcAfter={AiOutlinePlusCircle} />
        </div>
    </div>
  )
}

export default Header