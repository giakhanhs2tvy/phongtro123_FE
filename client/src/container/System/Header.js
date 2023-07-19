 import React from 'react'
import { Navigation } from '../Public'
 
 const Header = () => {
   return (
     <div className='w-full flex flex-none h-[40px]'>
        <div className='flex items-center justify-center font-bold bg-secondary text-white w-[256px] flex-none'>
            Phongtro123.com

        </div>
        <div className='flex-auto'>
            <Navigation/>
        </div>
        
     </div>
   )
 }
 
 export default Header   