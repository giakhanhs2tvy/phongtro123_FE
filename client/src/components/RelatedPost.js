import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import * as actions from '../store/action'
import Sitem from './Sitem'
const RelatedPost = () => {
    const dispatch = useDispatch()
    const {newPosts} = useSelector(state => state.post)
    
    useEffect(()=>{
        dispatch(actions.getNewPosts())
    },[])
    
  return (
    <div className='bg-white rounded-md p-4 w-full'>
        <h3 font-semibold text-lg mb-4>Tin Mới Đăng</h3>
        <div className='flex flex-col gap-3'>
            
            {newPosts?.map(item => {
                    return (
                        <Sitem
                            key={item.id}
                            title={item.title}
                            price={item?.attributes?.price}
                            createdAt={item.createdAt}
                            image={JSON.parse(item.images.image)}
                        />
                    )
                })}
        </div>
    
    </div>
  )
}

export default RelatedPost