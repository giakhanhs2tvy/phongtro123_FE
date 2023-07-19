import React,{useCallback, useEffect, useState} from 'react'
import { SearchItem,Modal } from '../../components'
import icons from '../../ultils/icon'
import {useSelector,} from 'react-redux'
import {createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'
const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons

const Search = () => {
  const [isShowModal, setisShowModal] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [content, setcontent] = useState('')
  const [name, setname] = useState('')
  const [queries, setQueries] = useState({})
  const {prices,areas,provinces,categories} = useSelector(state =>state.app)
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')
  useEffect(()=>{
    if(!location?.pathname.includes(path.SEARCH)){
      setQueries({})
      setArrMinMax({})
    }
  },[location])
  const handleShowModal=(content,name,defaultText) =>{
      setisShowModal(true)
      setcontent(content)
      setname(name)
      setDefaultText(defaultText)
  }
  const handleSubmit = useCallback((e,query,arrMaxMin) =>{
      e.stopPropagation()
      setisShowModal(false)
      setQueries(prev =>({...prev,...query}))
      arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
  },[isShowModal, queries]
  )
  const handleSearch = () =>{
    const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
    let queryCodesObj = {}
    queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
    const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
    let queryTextObj = {}
    queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
    let titleSearch = `${queryTextObj.category
        ? queryTextObj.category
        : 'Cho thuê tất cả'} ${queryTextObj.province
            ? `tỉnh ${queryTextObj.province}`
            : ''} ${queryTextObj.price
                ? `giá ${queryTextObj.price}`
                : ''} ${queryTextObj.area
                    ? `diện tích ${queryTextObj.area}` : ''} `
    navigate({
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
    }, { state: { titleSearch } })
  }
 
  return (
    <>
    <div className='w-1100 p-[10px] my-3 bg-amber-500 rounded-lg flex items-center justify-between gap-2'>
        <span onClick={()=>handleShowModal(categories,'category','Phòng trọ, nhà trọ')} className='flex-1'>
          <SearchItem Icon1={<MdOutlineHouseSiding/>} Icon2={<BsChevronRight/>}  text={queries.category}  defaultText={'Phòng trọ, nhà trọ'}/>
        </span>
        <span onClick={()=>handleShowModal(provinces,'province','Toàn quốc')} className='flex-1'>
          <SearchItem Icon1={<HiOutlineLocationMarker/>} Icon2={<BsChevronRight/>}  text={queries.province } defaultText={'Toàn quốc'}/>
        </span>
        <span onClick={()=>handleShowModal(prices,'price','Chọn giá')} className='flex-1'>
          <SearchItem Icon1={<TbReportMoney/>} Icon2={<BsChevronRight/>}  text={queries.price } defaultText={'Chọn giá'}/>
        </span>
        <span onClick={()=>handleShowModal(areas,'area','Chọn diện tích')} className='flex-1'>
          <SearchItem Icon1={<RiCrop2Line/>} Icon2={<BsChevronRight/>}  text={queries.area } defaultText={'Chọn diện tích'}/>
        </span>
        
       <button onClick={handleSearch}
       className='flex-1 outline-none w-full bg-secondary text-white py-2 px-4 text-sm rounded-md flex items-center justify-center gap-2 font-medium'>
            <FiSearch/>
            Search
       </button>

    </div>
   { isShowModal && <Modal setIsShowModal={setisShowModal} 
   content={content} 
   name={name} 
   arrMinMax={arrMinMax}
   handleSubmit={handleSubmit} 
   queries={queries}
   defaultText={defaultText}
   />}
    </>
  )
}

export default Search