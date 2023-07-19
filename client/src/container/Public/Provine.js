import React from 'react'
import { ProviceBtn } from '../../components'
import { location } from '../../ultils/constant'
const Provine = () => {
  return (
    <div className='flex items-center justify-center gap-5 shadow-md py-5'>
         { location.map(item =>{
          return(
            <ProviceBtn 
            key={item.id}
            image={item.image}
             name={item.name}/>)
          })}
      </div>
  )
}

export default Provine