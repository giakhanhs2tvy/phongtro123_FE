import React from 'react'

const InputForm = ({label,value,setValue,type,keyPayload,invalidFields,setInvalidFields}) => {
  return (
    <div>
        <label htmlFor={keyPayload} className='text-sx'>{label}</label>
        <input
            type={type || 'text'}
            id={keyPayload} 
            value={value}
            onFocus={() =>{setInvalidFields([])}}
            onChange={(e) => setValue(prev => ({ ...prev, [type]: e.target.value }))}
            className='outline-none w-full bg-[#e8f0fe] p-2 rounded-md'
        />
        {invalidFields.length > 0 && invalidFields.some(i => i.name === type) && <small className='text-red-500 italic'>{invalidFields.find(i => i.name === type)?.message}</small>} 
    </div>
  )
}

export default InputForm