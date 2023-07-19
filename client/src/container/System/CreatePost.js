import React, { useEffect, useState, } from 'react'
import { Address, Overview, Loading, Button } from '../../components'
import { BsCameraFill } from 'react-icons/bs'
import { getCodes, getCodesArea } from '../../ultils/Common/getCodes'
import { apiUpdatePosts, apiUploadImages } from '../../services'
import { FiDelete } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { apiCreateNewPosts } from '../../services'
import * as actions from '../../store/action'
import validate from '../../ultils/Common/vallidateFields'
const CreatePost = ({ isEdit }) => {
    const [invalidFields, setInvalidFields] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const dispatch= useDispatch()
    const { dataEdit } = useSelector(state => state.post)
    
    const [payload, setPayload] = useState({
        categoryCode: dataEdit?.categoryCode || '',
        title: dataEdit?.title || '',
        priceNumber: dataEdit?.priceNumber * 1000000 || 0,
        areaNumber: dataEdit?.areaNumber || 0,
        images: dataEdit?.images ? JSON?.parse(dataEdit?.images?.image) : '',
        address: dataEdit?.address || '',
        priceCode: dataEdit?.priceCode || '',
        areaCode: dataEdit?.areaCode || '',
        description: dataEdit?.description || '',
        target: dataEdit?.overviews?.target || '',
        province: dataEdit?.province || ''
    })
    const { prices, areas, categories } = useSelector(state => state.app)
    const { currentUser } = useSelector(state => state.user)
    useEffect(() => {
        if(dataEdit){
        let images = JSON.parse(dataEdit?.images?.image)
        images && setImagesPreview(images)}
    }, [dataEdit])

    const handleFiles = async (e) => {
        setisLoading(true)
        e.stopPropagation()
        let images = []
        const files = e.target.files
        const formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', 'bcadpkbo')
            const response = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data.secure_url]

        }
        setisLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
    }
    const handleDelete = (image) => {
        setImagesPreview(prev => prev.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images.filter(item => item !== image)
        }))
    }

    const handleSubmit = async () => {
        let priceCodeArr = getCodes(payload.priceNumber, prices, 1, 15)
        let priceCode = priceCodeArr[priceCodeArr.length - 1]?.code
        let areaCodeArr = getCodesArea(payload.areaNumber, areas, 0, 90)
        let areaCode = areaCodeArr[areaCodeArr.length - 1]?.code

        let finalPayload = {
            ...payload,
            priceCode,
            areaCode,
            userId: currentUser.id,
            priceNumber: +payload.priceNumber / Math.pow(10, 6),
            label: `${categories.find(item => item.code === payload?.categoryCode)?.value}${payload?.address?.split(',')[0]}`
        }
       
        const results = validate(finalPayload, setInvalidFields)
        
        if (results === 0) {
            if(dataEdit && isEdit) {
                finalPayload.postId = dataEdit?.id
                finalPayload.overviewId = dataEdit?.overviewId
                finalPayload.imagesId = dataEdit?.imagesId
                finalPayload.attributesId = dataEdit?.attributesId
                    const response = await apiUpdatePosts(finalPayload)
                    //const response = await apiCreateNewPosts(finalPayload)
                     if (response?.status === 200) 
                     resetPayload()
                     dispatch(actions.resetData())
        }}
    }
    const resetPayload =()=>{
        setPayload({
            categoryCode: '',
            title: '',
            priceNumber: 0,
            areaNumber: 0,
            images: '',
            address: '',
            priceCode: '',
            areaCode: '',
            description: '',
            target: '',
            province: '',
        })
    }
    return (
        <div className='px-6'>
            <h1 className='text-3xl font-medium border-b border-gray-200 py-4'>{isEdit ? 'Chỉnh sửa tin đăng' : 'Đăng tin mới'}</h1>
            <div className='flex gap-2'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    <Address

                        payload={payload}
                        setPayload={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields} />
                    <Overview
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload}
                        setPayload={setPayload} />
                    <div className='w-full '>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                        <div className='w-full'>

                            <label className='w-full border-2 flex flex-col items-center justify-center my-4 h-[200px] border-dashed border-gray-400 rounded-md' htmlFor='file'>
                                {isLoading ? <Loading /> :
                                    <div className='flex flex-col items-center justify-center'>
                                        <BsCameraFill size={50} color='blue' />
                                        Thêm ảnh
                                    </div>}
                            </label>
                            <input onChange={handleFiles} hidden type='file' id='file' multiple />
                            <small className='text-red-500'>
                                {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.message}
                            </small>
                            <div className='w-full'>
                                <h3 className='font-medium py-4'>Preview</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview.map(item => {
                                        return (
                                            <div key={item} className='relative w-1/3 h-1/3 '>
                                                <img src={item} className='w-full h-full object-cover rounded-md ' />
                                                <span
                                                    title='Delete'
                                                    onClick={() => { handleDelete(item) }}
                                                    className='absolute bg-gray-200 top-[-12px] right-[-12px] p-1 border border-gray-400 rounded-full' ><FiDelete /></span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button text={'Tạo mới'} bgColor={'bg-green-600'} onClick={handleSubmit} textColor={'text-white'} />
                    <div className='h-[500px]'>

                    </div>
                </div>
                <div className='w-1/3 flex-none'>
                    <Loading />
                </div>
            </div>
        </div>
    )
}

export default CreatePost