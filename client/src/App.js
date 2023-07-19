import {Routes, Route} from 'react-router-dom';
import { Home,Login ,HomePage,Rental, DetailPage, SearchDetail} from './container/Public';
import { path } from './ultils/constant';
import { System,CreatePost, ManagePost, EditAcount } from './container/System';


function App() {
  return (
    <div className=" w-full bg-primary m-auto">
      <Routes>
        <Route path={path.HOME} element={<Home/>}>
          <Route path='*' element={<HomePage/>}/>
          {/* <Route path=':page' element={<HomePage/>}/> */}
          <Route path='login' element={<Login/>}/>
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental/>}/>
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental/>}/>
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental/>}/>
          <Route path={path.NHA_CHO_THUE} element={<Rental/>}/>
          <Route path={path.SEARCH} element={<SearchDetail/>}/>
          <Route path='detail/*' element={<DetailPage/>}/>
          
        </Route>
        <Route path={path.SYSTEM} element={<System />} >
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAcount />} />

        </Route>
        
      </Routes>
    </div>
  );
}

export default App;