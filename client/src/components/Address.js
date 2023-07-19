import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { InputReadOnly, Select } from '.'
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../services'
const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [reset, setReset] = useState(false)
    const {dataEdit} = useSelector(state => state.post)
   
    useEffect(()=>{
       if(dataEdit){
        let addressArr = dataEdit?.address?.split(',')
        let foundProvince = provinces?.length > 0 && provinces.find(item => item.province_name === addressArr[addressArr.length-1])
        setProvince(foundProvince ? foundProvince.province_id : '')
       }
    },[provinces,dataEdit])
    useEffect(()=>{
        let addressArr = dataEdit?.address?.split(',')
        let foundDistrict = districts?.length > 0 && districts.find(item => item.district_name === addressArr[addressArr.length-2])
        setDistrict(foundDistrict ? foundDistrict.district_id : '')
    },[districts])
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])
    useEffect(() => {
        setDistrict('')
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200) {
                setDistricts(response.data?.results)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])
    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
            province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
        }))

    }, [province, district])
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select
                        
                        type='province'
                        value={province}
                        setValue={setProvince}
                        options={provinces}
                        label={'Tỉnh /Thành phố'}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields} />
                    <Select
                        
                        reset={reset}
                        type='district'
                        value={district}
                        setValue={setDistrict}
                        options={districts}
                        label={' Quận huyện'}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields} />


                </div>
                <div>
                    <InputReadOnly
                        label={'Địa chỉ chính xác'}
                        value={`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}
                    />
                </div>
            </div>
        </div>
    )
}

export default Address