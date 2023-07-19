import React, { memo,useState } from 'react'
import icons from '../ultils/icon'
import { Link } from 'react-router-dom'

const indexs =[0,1,2,3]

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill} = icons
const Item = ({address, attributes, description , title, user,star,images,id} ) => {
    const [isHoverHeart,setIsHoverHeart] = useState(false)

    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<GrStar className='inline-block mb-1' size={18} color='orange' />)
        return stars

    }
  return (
    <div className='w-full flex border border-t-red-600 p-3 gap-3'>
        <Link to={`/detail/${title}/${id}`} className='w-2/5 flex flex-wrap gap-[2px] relative cursor-pointer'>
            {images.length > 0 && images.filter((item,index)=> indexs.some(item => item === index))?.map(item=>{
                return(
                    <img src={item} alt='test' className='w-[140px] h-[120px] object-cover'/>
                )
            })}
                
                
                <span className='bg-overlay-60 text-white left-[6px] bottom-2 absolute rounded-sm px-1 text-sm'>{`${images.length} ảnh`}</span>
                <span className=' right-2 bottom-2 absolute'
                      onMouseEnter={() =>{setIsHoverHeart(true)}}
                      onMouseLeave={() =>{setIsHoverHeart(false)}}
                >
                { isHoverHeart ? <RiHeartFill size={24} color='pink'/> :  <RiHeartLine size={24} color='white'/>}</span>
        </Link >
        <div className='w-3/5'>
            <div className='flex justify-between gap-4'>
                <Link to={`/detail/${title}/${id}`} className=' text-red-500 font-medium cursor-pointer'>
                {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                    {title}

                </Link>
                <div>
                    <BsBookmarkStarFill size={24} color='orange'/>
                </div>
               
            </div> 
                <div className='flex gap-6 mt-1'> 
                    <span className='font-bold text-green-600'>{attributes?.price}</span>
                    <span>{attributes?.average}</span>
                    <span>
                        {`${address.split(',')[address.split(',').length-2]},${address.split(',')[address.split(',').length-1]}`}
                    </span>
                </div>
                <div className='flex justify-end text-gray-500 text-sm'>{attributes?.published}</div>
                <div className=' text-sm m-2 h-[60px] text-ellipsis overflow-hidden'>
               {description}
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <img src='https://th.bing.com/th/id/R.7a002dc6a7d1141f419ee440fc8549bc?rik=g60351TXpeKGSQ&pid=ImgRaw&r=0' alt='avatar' width={30} height={30} className='object-cover rounded-full'/>
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button 
                        type='button'
                        className='bg-blue-600 text-white rounded-md p-[3px]'
                        >
                            {`Gọi ${user?.phone}`}
                        </button> 
                        <button 
                        type='button'
                        className='text-blue-700  rounded-md border border-blue-700 p-[2px]'
                        >
                            Nhắn zalo
                        </button> 
                    </div>
                </div>

        </div>
    </div>
  )
}

export default (Item) 