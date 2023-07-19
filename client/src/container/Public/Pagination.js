import React, { useEffect, useState,memo } from 'react'
import PageNum from '../../components/PageNum'
import { useSelector } from 'react-redux'
import icons from '../../ultils/icon'
const Pagination = ({number}) => {
    const {GrLinkNext,GrLinkPrevious} = icons
    const {count,posts} = useSelector(state => state.post)
    const [arrPage, setarrPage] = useState([])
    const [currentPage, setcurrentPage] = useState(+number || 1)
    const [isHiddenEnd, setisHiddenEnd] = useState(false)
    const [isHiddenStart, setisHiddenStart] = useState(false)

    useEffect(() =>{
        let maxPage = Math.floor(count / 8)
        if(count % 8 !== 0)  maxPage = maxPage+1
       
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
        let start = (currentPage - 2)  <= 1 ? 1 : (currentPage - 2)
        let temp =[]
        for(let i = start; i <= end ; i++) temp.push(i)
        setarrPage(temp)
        currentPage >= (maxPage -2) ? setisHiddenEnd(true) : setisHiddenEnd(false)
        currentPage <=3 ? setisHiddenStart(true) : setisHiddenStart(false)
    },[count,posts,currentPage])
    
  return (
    <div className='flex items-center justify-center gap-3 py-5'>
        {!isHiddenStart && <PageNum icon={<GrLinkPrevious/>} setCurrentPage={setcurrentPage} text={1} />}
        {!isHiddenStart && <PageNum text={'...'}/>}
        {arrPage.map(item=>{
            return(
                <PageNum
                key={item}
                text={item}
                currentPage={currentPage}
                setCurrentPage={setcurrentPage}
                />
            )
        })}
        {!isHiddenEnd && <PageNum text={'...'}/>}
        {!isHiddenEnd && <PageNum icon={<GrLinkNext/>} setCurrentPage={setcurrentPage} text={Math.floor(count / posts.length)} />}
    </div>
  )
}

export default memo(Pagination)