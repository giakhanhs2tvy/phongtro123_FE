import React from 'react'
import { InputFormv2, InputReadOnly, Select } from '.'
import { useSelector } from 'react-redux'

const gender = [
  { code: 'male', value: 'Nam' },
  { code: 'female', value: 'Nữ' }
]
const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { categories } = useSelector(state => state.app)
  const { currentUser } = useSelector(state => state.user)

  return (
    <div>
      <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
      <div className='w-full flex flex-col gap-6'>
        <Select
          options={categories}
          label={'Loại chuyên mục'}
          value={payload.categoryCode}
          setValue={setPayload}
          name={'categoryCode'}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields} />
        <InputFormv2
          label={'Tiêu đề'}
          value={payload.title}
          setValue={setPayload}
          name={'title'}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields} />
        <div className='flex flex-col gap-2'>
          <label htmlFor='desc'>Nội dung mô tả</label>
          <textarea name='description' id='desc' rows={10} cols={30}
            value={payload.description}
            onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
            className='w-full rounded-md border border-gray-300 p-2'>

          </textarea>
          <small className='text-red-500'>
                {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.message}
            </small>
        </div>
        <div className='w-1/2 flex flex-col gap-4'>
          <InputReadOnly label={'Thông tin liên hệ'} value={currentUser?.name} />
          <InputReadOnly label={'Điện thoại'} value={currentUser?.phone} />
          <InputFormv2
            label={'Giá cho thuê'}
            unit={'đồng'}
            value={payload.priceNumber}
            setValue={setPayload}
            name={'priceNumber'}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields} />
          <InputFormv2
            label={'Diện tích'}
            unit={'m2'}
            value={payload.areaNumber}
            setValue={setPayload}
            name={'areaNumber'}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields} />
          <Select
            options={gender}
            label={'Đối tượng cho thuê'}
            value={payload.target}
            setValue={setPayload}
            name={'target'}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields} />
        </div>
      </div>

    </div>
  )
}

export default Overview