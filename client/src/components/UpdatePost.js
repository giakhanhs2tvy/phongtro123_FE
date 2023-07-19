import React from 'react'
import CreatePost from '../container/System/CreatePost'

const UpdatePost = ({setShowEditForm}) => {
  return (
    <div 
     className='absolute top-0 left-0 right-0  bg-overlay-70 flex justify-center' 
     onClick={e=>{
        e.stopPropagation()
        setShowEditForm(false)
    }}>
        <div className='bg-white w-1100'
            onClick={e => e.stopPropagation()}
        >
            <CreatePost isEdit/>
        </div>
    </div>
  )
}

export default UpdatePost