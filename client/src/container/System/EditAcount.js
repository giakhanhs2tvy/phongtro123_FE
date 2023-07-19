import React from 'react'
import { Button, InputFormv2, InputReadOnly } from '../../components'
import nonavatar from '../../assets/no-avatar.png'
const EditAcount = () => {
  return (
    <div className='flex flex-col items-center h-full'>
        <div className='text-3xl w-full  text-start font-medium py-4 mb-8  border border-gray-200'>Chỉnh sửa thông tin cá nhân</div>
        <div className='w-3/5 flex flex-col py-6 gap-4 '>
            <InputReadOnly label={'Mã thành viên'} direction={'flex-row '}/>
            <InputReadOnly label={'Số điện thoại'} direction={'flex-row '} editPhone/>
            <InputFormv2 label={'Tên hiển thị '} direction={'flex-row '}/>
            <InputFormv2 label={'Email'} direction={'flex-row '}/>
            <InputFormv2 label={'Zalo'} direction={'flex-row '}/>
            <InputFormv2 label={'Facebook'} direction={'flex-row '}/>
            <div className='flex'>
                <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
                <small className='text-blue-500 flex-auto'>Đổi mật khẩu</small>
            </div>
            <div className='flex py-6'>
                <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
                <img src={nonavatar} alt='avatar' className='w-20 h-20 object-cover rounded-full border border-gray-200'/>
            </div>
            <Button
                text={'Cập nhật'}
                bgColor={'bg-pink-400'}
                textColor={'text-white'}
            />
        </div>
    </div>
  )
}

export default EditAcount