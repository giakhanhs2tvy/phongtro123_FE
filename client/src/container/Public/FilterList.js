import { useDispatch,useSelector } from 'react-redux';

import React,{useEffect,useState} from 'react'
import * as action from '../../store/action'
function FilterList() {
  
  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.post);
  
  console.log('posts len:'+posts.length)
  
  const handleFilter = (min, max) => {
    // Gọi action để lấy dữ liệu từ API với khoảng giá được chọn
    dispatch(action.getPostsCondition(min, max))
   
  };

  // Các phần khác của component...

  return (
    <div className='flex flex-col gap-4'>
      {/* Các nút lọc */}
      <button onClick={() => handleFilter(0, 1)} className=' hover:text-blue-400'>Lọc khoảng 0-1</button>
      <button onClick={() => handleFilter(1, 3)} className=' hover:text-blue-400'>Lọc khoảng 1-2</button>
      <button onClick={() => handleFilter(3, 5)} className=' hover:text-blue-400'>Lọc khoảng 2-3</button>
      <div className='text-center text-black'>
      {posts?.length >0 && posts.map(item => (
        <div key={item?.id}>{item?.title} </div>
        
      ))}
      
      </div>
    </div>
  );
}
export default FilterList;

