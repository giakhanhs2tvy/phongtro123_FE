import React,{useEffect} from 'react'
import { Button, Item } from '../../components'
import {useDispatch,useSelector} from 'react-redux'
import { getPostsLimit } from '../../store/action/post'
import { useSearchParams } from 'react-router-dom'


const List = ({categoryCode}) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts,filter } = useSelector(state => state.post)
    let page = searchParams.get('page')
    let offset = page ? (page-1) : 0
    useEffect(()=>{
      if(!filter) dispatch(getPostsLimit(offset)) 

  },[offset])
     useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (categoryCode) searchParamsObject.categoryCode = categoryCode
         dispatch(getPostsLimit(searchParamsObject))   
    }, [categoryCode,searchParams])

  
    
   

 
  
  return (
    <div className='w-full bg-white shadow-md rounded-md p-2'>
        <div className='flex items-center justify-between my-3 '>
            <div className='font-medium text-lg '>
                Danh sách tin đăng
            </div>
            <div className='text-sm '>
                Cập nhật : 03/06/2023
            </div>
        </div>
        <div className='flex items-center gap-2 py-2'>
            <div>Sắp xếp:</div>
            <Button text='Mặc định' bgColor='bg-gray-300'/>
            <Button text='Mới nhất' bgColor='bg-gray-300'/>
        </div>
        <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    return (
                        <Item
                            key={item?.id}
                            address={item?.address}
                            attributes={item?.attributes}
                            description={JSON.parse(item?.description)}
                            images={JSON.parse(item?.images?.image)}
                            star={+item?.star}
                            title={item?.title}
                            user={item?.user}
                            id={item?.id}
                        />
                    )
                })}
            </div>
        
    </div>
  )
}

export default List