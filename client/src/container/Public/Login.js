import React, {useState,useEffect} from 'react'
import { Button, InputForm } from '../../components';
import { useLocation,useNavigate } from 'react-router-dom';

import * as action from '../../store/action';
import {useDispatch,useSelector} from 'react-redux';
import validate from '../../ultils/Common/vallidateFields';
const Login = () => {
  const {isLoggIn} = useSelector(state => state.auth)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [invalidFields, setInvalidFields] = useState([])
  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [payload,setPayload] = useState({
      name:'',
      phone:'',
      password:''
  })
  useEffect(()=>{
    setIsRegister(location.state?.flag)
  },[location.state?.flag])
  
  useEffect(()=>{
    isLoggIn && navigate('/')
  },[isLoggIn])
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const finalPayload = isRegister ? payload : {
      phone: payload.phone,
      password :payload.password
    }
    let invalids = validate(finalPayload,setInvalidFields)
   
    if(invalids === 0) isRegister ? dispatch(action.register(payload)) : dispatch(action.login(payload))
  
  }
  
  
  return (
    <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
        <h3 className='font-semibold text-2xl mb-3'>{isRegister ? 'Register': 'Login'} </h3>
        <div className='w-full flex flex-col gap-5'>
          {isRegister && <InputForm invalidFields={invalidFields} setInvalidFields={setInvalidFields} label={'Username'} value={payload.name} setValue={setPayload} type={'name'}/>}
          <InputForm invalidFields={invalidFields} setInvalidFields={setInvalidFields} label={'Phone number'} value={payload.phone} setValue={setPayload} type={'phone'}/>
          <InputForm invalidFields={invalidFields} setInvalidFields={setInvalidFields} label={'Password'} value={payload.password} setValue={setPayload} type={'password'}/>
          <Button
              text={isRegister ? 'Register': 'Login'}
              textColor='text-white'
              bgColor='bg-secondary'
              fullWidth
              onClick={handleSubmit}
          />
        </div>
        <div className='mt-7 flex items-center justify-between'>
          {isRegister 
                ? <small>You has been account
                  <span
                  onClick={() => {setIsRegister(false)  
                    setPayload({
                    phone: '',
                    password: '',
                    name: ''
                })}}
                   className='text-blue-500 cursor-pointer'>Login now</span>
                  </small>
              :
          <>
            <small className='text-[blue] hover:text-[red] cursor-pointer'>Forgot Password?</small>
            <small 
            onClick={() => {setIsRegister(true)
              setPayload({
                phone: '',
                password: '',
                name: ''
            })}}
            className='text-[blue] hover:text-[red] cursor-pointer'>
            Create new account
            </small>
          </>}
        </div>
    </div>
  )
}

export default Login