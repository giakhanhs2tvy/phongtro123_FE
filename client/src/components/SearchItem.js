import React, { memo } from 'react'


const SearchItem = ({Icon1,Icon2,text,defaultText}) => {
  return (
    <div className='bg-white p-2 rounded-md text-gray-400 w-full text-sm flex items-center justify-between'>
        <div className='flex gap-1 items-center'>
            {Icon1}
            <span className={`${text && 'font-medium text-gray-600'}`}>
            {text || defaultText}
            </span>
        </div>
       
        {Icon2}
    </div>
  )
}

export default memo(SearchItem)