import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/action'
import moment from 'moment'
import { Button, UpdatePost } from '../../components'
import { apiDeletePost } from '../../services'
const ManagePost = () => {
    const [showEditForm, setShowEditForm] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(false)
    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState('')
    const {postOfUser,dataEdit} = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(()=>{
        !dataEdit && dispatch(actions.getUserPosts())
    },[dataEdit,dataUpdate])
    useEffect(()=>{
        setPosts(postOfUser)
    },[postOfUser])
    console.log(postOfUser)
    useEffect(()=>{
        !dataEdit && setShowEditForm(false)
    },[dataEdit])
    const checkStatus= timeString =>  moment(timeString,"DD/MM/YYYY").isSameOrAfter(new Date().toDateString())
    const handleDeletePost = async (postId) =>{
        const response = await apiDeletePost(postId)
        if(response.data.err ===0) setDataUpdate(prev =>!prev)
    }
    useEffect(() =>{
        
        if(status === 1){
            const activePosts = postOfUser?.filter(item => checkStatus(item?.overviews?.expire?.split(' ')[2]))
            setPosts(activePosts)
        }   
        else if(status === 2){
            const expiredPosts = postOfUser?.filter(item => !checkStatus(item?.overviews?.expire?.split(' ')[2]))
            setPosts(expiredPosts)
       }
       else{
            setPosts(postOfUser)
       }
    },[status])
    return (
        <div className=' flex flex-col gap-6'>
            <div className='py-4 flex items-center justify-between border-b border-gray-200'>
                <h1 className='text-3xl font-medium '>Quản lý bài đăng</h1>
                <select
                onChange={e =>setStatus(+e.target.value)}
                value={status}
                className='outline-none p-2 border border-gray-200 rounded-md'>
                   <option value='0'>Lọc theo trạng thái</option> 
                   <option value="1">Đang hoạt động</option> 
                   <option value="2">Đã hết hạn</option> 
                </select>
            </div>
            <table className='w-full table-auto'>
                <thead>
                    <tr className=' w-full flex bg-gray-100'>
                        <th className='border flex-1 p-2 '>Mã tin</th>
                        <th className='border flex-1 p-2 '>Ảnh đại diện</th>
                        <th className='border flex-1 p-2 '>Tiêu đề</th>
                        <th className='border flex-1 p-2 '>Giá</th>
                        <th className='border flex-1 p-2 '>Ngày bắt đầu</th>
                        <th className='border flex-1 p-2 '>Ngày hết hạn</th>
                        <th className='border flex-1 p-2 '>Trạng thái</th>
                        <th className='border flex-1 p-2 '>Tuỳ chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.map(item=>{
                        return(
                            <tr key={item.id} className='items-center h-16 flex'>
                                <td className='border flex-1 h-full flex items-center justify-center text-center p-2'>
                                    {item?.overviews?.code}
                                </td>
                                <td className=' p-2 border flex-1 h-full flex items-center justify-center'>
                                    <img src={JSON.parse(item?.images?.image)[0] || ''} alt='avatar' className='w-10 h-10 object-cover rounded-sm'></img>
                                </td>
                                <td className='border flex-1 h-full flex items-center justify-center text-center p-2'> 
                                    {item?.title}
                                </td>
                                <td className='border flex-1 h-full flex items-center justify-center text-center p-2'>
                                    {item?.attributes?.price}
                                </td>
                                <td className='border flex-1 h-full flex items-center justify-center text-center p-2'>
                                    {item?.overviews?.create}
                                </td>
                                <td className='border flex-1 h-full flex items-center justify-center text-center p-2'>
                                    {item?.overviews?.expire}
                                </td>
                                <td className='border flex-1 h-full flex items-center justify-center text-center p-2'>
                                    {checkStatus(item?.overviews?.expire?.split(' ')[2]) ? 'Đang hoạt động' :'Đã hết hạn'}
                                </td>
                                <td className='border flex-1  items-center  h-full text-center flex justify-around p-2 '>                                   
                                    <Button text={'Update'}
                                    bgColor={'bg-green-400'}
                                    textColor={'text-white'}
                                    onClick={()=>{
                                        setShowEditForm(true)
                                        dispatch(actions.editData(item))
                                    }}
                                    />
                                     <Button text={'Delete'}
                                    bgColor={'bg-red-600'}
                                    textColor={'text-white'}
                                    onClick={()=>{
                                        handleDeletePost(item.id)
                                    }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {showEditForm && <UpdatePost setShowEditForm={setShowEditForm}/>}
        </div>
    )
}

export default ManagePost