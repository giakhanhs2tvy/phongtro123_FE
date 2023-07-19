import React, { useEffect } from 'react'
import icons from '../ultils/icon'
import * as action from '../store/action'
import { useDispatch, useSelector} from 'react-redux';
import { createSearchParams, useNavigate,useSearchParams } from "react-router-dom";
const SidebarItem = ({title,contentLeft,contentRight}) => {
    const [searchParams] = useSearchParams()
  
    let page = searchParams.get('page')
    // const {filter} = useSelector(state => state.post)
    const {GrNext} = icons
    const dispatch = useDispatch()
    const navigate = useNavigate()
    var min,max
    const handleFilter = (text,filterType) =>{
        if(text.includes("Dưới")){
             min=0
             max= parseFloat(text.split("Dưới")[1])
        }
        else if(text.includes("Trên")){
            min = parseFloat(text.split("Trên")[1])
            max = 1000
        }
        else{
            const numberStrings = text.split("Từ")[1].split("-").map((numberString) => numberString.trim());
              if (numberStrings.length === 2) {
             min = parseFloat(numberStrings[0]);
             max = parseFloat(numberStrings[1]);
            }
        }
      
    if(filterType === 'byPrice') {
         navigate({
            pathname: "/",
            search: createSearchParams({
              minPrice: min, 
              maxPrice: max,
              
            }).toString()
          });
     dispatch(action.getPostsCondition(min, max,page)) 
     }
    else if(filterType === 'byArea') {
        navigate({
            pathname: "/",
            search: createSearchParams({
              minArea: min, 
              maxArea: max,
              
            }).toString()
          });
        dispatch(action.getPostsByArea(min, max,page)) 
     }
}   
   
  return (
    <div className=' text-black p-2 bg-white'>
        <span className='font-medium'>{title}</span>
        <div className='flex gap-5'>
        <div className='p-2'>
            {contentLeft?.length > 0 && contentLeft.map(item =>{
                return(
                    <div className='flex items-center gap-1 py-2 text-sm cursor-pointer hover:text-orange-600'>
                        <GrNext size={10}/>
                        
                        <button onClick={() => handleFilter(`${item.value}`,`${item.filterType}`)} className=' hover:text-blue-400'>{item.value}</button>
                    </div>
                )
            })}
        </div>
        <div className='p-2'>
            {contentRight?.length > 0 && contentRight.map(item =>{
                return(
                    <div className='flex items-center gap-1 py-2 text-sm cursor-pointer hover:text-orange-600'>
                        <GrNext size={10}/>
                        
                        <button onClick={() => handleFilter(`${item.value}`,`${item.filterType}`)} className=' hover:text-blue-400'>{item.value}</button>
                    </div>
                )
            })}
        </div>
        </div>
    </div>
  )
}

export default SidebarItem