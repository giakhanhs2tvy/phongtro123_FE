const validate = (payload,setInvalidFields) =>{
    let invalids = 0
    let fields = Object.entries(payload)
    
    fields.forEach(item =>{
      if(item[1] === ''){
          setInvalidFields(prev => [...prev,{
            name : item[0],
            message : 'This field can not empty!'
          }])
          invalids++
        }
      
    })
    fields.forEach(item =>{
      switch(item[0]){
        case 'password':
          if(item[1].length <6){
            setInvalidFields(prev => [...prev,{
              name : item[0],
              message : 'Password must minimum 6 letter!'
            }])
            invalids++
          }
          break;
        case 'phone':
            if(!item[1].match(/^\d+$/)){
              setInvalidFields(prev => [...prev,{
                name : item[0],
                message : 'Phone must is number!'
              }])
              invalids++
            }
            break;
        case 'priceNumber':
            case 'areaNumber':
                if(!+item[1]){
                    setInvalidFields(prev =>[...prev,{
                        name : item[0],
                        message : 'Trường này phải là số !'
                    }])
                    invalids++
                }
                break;
        default:
            break;
      }
    })
    return invalids
  }
export default validate