import React, { useEffect, useState } from 'react'
import { GrPrevious } from 'react-icons/gr'
import { getNumbersPrice, getNumbersArea } from '../ultils/Common/getNumbers'

const Modal = ({setIsShowModal,content,name,handleSubmit,queries,arrMinMax,defaultText}) => {
    const [present1,setPresent1] = useState(name ==='price' && arrMinMax?.priceArr ? arrMinMax?.priceArr[0] : name ==='area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[0] : 0)
    const [present2,setPresent2] = useState(name ==='price' && arrMinMax?.priceArr ? arrMinMax?.priceArr[1] : name ==='area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[1]: 100)
    
    console.log(arrMinMax)
    const [activedEl, setActivedEl] = useState('')
    useEffect(()=>{
      const activeTrackEl =  document.getElementById('track-active')
      if(activeTrackEl){
      if(present2 < present1)
      {
        activeTrackEl.style.left = `${present2}%`
        activeTrackEl.style.right = `${100 - present1}%`
      }
      else
    {
        activeTrackEl.style.left = `${present1}%`
        activeTrackEl.style.right = `${100 - present2}%`
    }
 } },[present1,present2])
    const handleClickTrack = (e) =>{
        e.stopPropagation()
        const trackEl = document.getElementById('track')
        const trackRec = trackEl.getBoundingClientRect()
        let percent = Math.round((e.clientX - trackRec.left)*100 / trackRec.width)
       if((Math.abs(percent - present1)) < (Math.abs(percent - present2))) {
         setPresent1(percent) 
       }
       else{
        setPresent2(percent)
       } 
    }
    const convert100toTarget = (percent) =>{
        let result = 0 
        // 10 * 1.5 = 15 % 5 = 0 < 2,5 -> rs = 15 / 5 = 3 * 5 / 10 = 1.5
        // 9 * 1.5 = 14 % 5 = 4 > 2,5 -> rs = 3 * 5 /10
        if(name==='price'){
            if(Math.round((percent * 1.5)) % 5 > 2.5){
                result = (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
           }
           result = (Math.round(Math.round((percent * 1.5)) / 5) * 5) / 10
        }
        else{
           result = (Math.round(Math.round((percent * 0.9)) / 5) * 5) 
        }
       return result
    }
    const convertAgain100 = (percent) =>{
        return (name ==='price') ? Math.floor((percent/15)*100) : Math.floor((percent/90)*100)
    }
    
    const handleActive = (code, value) => {
        setActivedEl(code)
        let arrMaxMin = name === 'price' ? getNumbersPrice(value) : getNumbersArea(value)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setPresent1(0)
                setPresent2(convertAgain100(1))
            }
            if (arrMaxMin[0] === 20) {
                setPresent1(0)
                setPresent2(convertAgain100(20))
            }
            if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setPresent1(100)
                setPresent2(100)
            }
        }
        if (arrMaxMin.length === 2) {
            setPresent1(convertAgain100(arrMaxMin[0]))
            setPresent2(convertAgain100(arrMaxMin[1]))
        }
    }
    const handleBeforeSubmit = (e) =>{
        let min = present1 <= present2 ? present1 : present2
        let max = present2 >= present1 ? present2 : present1
        let arrMinMax = [convert100toTarget(min), convert100toTarget(max)] 
        handleSubmit(e,{
            [`${name}Number`]: arrMinMax,
            [name]: `Từ ${convert100toTarget(min)} - ${convert100toTarget(max)} ${name === 'price' ? 'triệu' : 'm2'}`
        }, {
            [`${name}Arr`]: [min, max]
        }) 
    }
    
  return (
    
    <div onClick={(e)=>{setIsShowModal(false)}}
    className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-60 z-10 flex items-center justify-center'>
        <div onClick={(e)=>{
            e.stopPropagation()
            setIsShowModal(true)
        }}
        className='w-[700px] h-[500px] bg-white rounded-md relative'>
            <div onClick={(e)=>{
                 e.stopPropagation()
                 setIsShowModal(false)
            }} className='h-[45px] px-4 flex items-center justify-between  border-b border-gray-200 cursor-pointer'>
                <span >
                    <GrPrevious size={20}/>
                </span>
                
                
            </div>
                
            {(name ==='category' || name ==='province') &&
              <div className='flex flex-col p-4'>
                    <span className='py-2 flex gap-2 items-center border-b border-gray-200'>
                        <input
                            type="radio"
                            name={name}
                            value={defaultText || ''}
                            id='default'
                            checked={!queries[`${name}Code`] ? true : false}
                            onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                        />
                        <label htmlFor='default'>{defaultText}</label>
                    </span>
                    {content?.map(item=>{
                        return(
                            <div className='py-2 flex items-center gap-2 border-b border-gray-200'>
                                <input type='radio'
                                name={name}
                                id={item.code} 
                                value={item.code}
                                checked={item.code === queries[`${name}Code`] ? true : false}
                                onClick={(e)=>handleSubmit(e,{[name] : item.value, [`${name}Code`] : item.code})}/>
                                <label htmlFor={item.code} >{item.value} </label>
                            </div>
                        )
                    })}
                </div>
                }
            {(name ==='price' || name ==='area') && <div className='p-10 mt-[36px]'>
                <div className='flex flex-col items-center justify-center relative'>
                    <span className='absolute top-[-48px] bottom-0 font-bold text-lg text-orange-600'>
                    {(present1 === 100 && present2 === 100) ? 
                    `Trên ${ convert100toTarget(present1)} ${ name==='price' ? 'Triệu' : 'm2'} +` : `Từ ${present1 > present2 ? convert100toTarget(present2) : convert100toTarget(present1)} đến ${present2 < present1 ? convert100toTarget(present1) : convert100toTarget(present2)} ${name==='price' ? 'Triệu' : 'm2'}`
                    }
                    
                    </span>
                    <div onClick={handleClickTrack} id='track' className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full'></div>
                    <div onClick={handleClickTrack} id='track-active' className='slider-track-active h-[5px] absolute top-0 bottom-0  bg-orange-600 rounded-full'></div>
                        <input
                        type='range'
                        min='0'
                        max='100'
                        step='1'
                        value={present1}
                        className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                        onChange={(e)=>setPresent1(+e.target.value)}
                        />
                        <input
                        type='range'
                        min='0'
                        max='100'
                        step='1'
                        value={present2}
                        className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                        onChange={(e)=>setPresent2(+e.target.value)}
                        />
                        <div className='absolute top-6 right-0 left-0 flex justify-between items-center'>
                            <span className=''>0</span>
                            <span className='mx-[-10px]'>{name==='price' ? '15 triệu +' :'90 m2 +'}</span>
                        </div>
                    
                    
                </div>
                <div className='mt-[72px]'>
                        <h4 className='font-medium mb-4'>Chọn nhanh:</h4>
                        <div className='flex gap-2 items-center flex-wrap w-full'>
                            {content?.map(item => {
                                return (
                                    <button
                                        key={item.code}
                                        onClick={() => handleActive(item.code, item.value)}
                                        className={`px-4 py-2  rounded-md cursor-pointer ${item.code === activedEl ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    >
                                        {item.value}
                                    </button>
                                )
                            })}
                        </div>

                    </div>
            </div>
            }
            {(name ==='price' || name ==='area') && 
            <button
            type='button'
            className='w-full bg-[#FFA500] py-2 font-medium uppercase rounded-bl-md rounded-br-md absolute bottom-0'
            onClick={handleBeforeSubmit}
            >
                áp dụng
            </button>
            }
        </div>
    </div>
  )
}

export default Modal