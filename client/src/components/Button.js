import React,{memo} from 'react'


const Button = ({text,textColor,bgColor,IcAfter,onClick,fullWidth}) => {
  return (
    <button 
        type='button'
        className={`p-2 ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md flex items-center justify-center gap-1` }
        onClick={onClick}
    >
      <span>{text} </span>
      {IcAfter &&<span> <IcAfter/></span>}
    </button>
  )
}

export default memo(Button);