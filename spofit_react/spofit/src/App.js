import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import BoardList from './components/community/BoardList';
import NoticeList from './components/community/NoticeList';
import BoardDetail from './components/community/BoardDetail';
//IdFind 링크 주소 변경 
import IdFind from './components/member/Find';
//MemberJoin 링크 주소 변경 
import MemberJoin from './components/member/Join';
//MemberJoin,Login 링크 주소 변경 
import MemberLogin from './components/member/LoginJoin';
import PwChange from './components/member/PwChange';
import MyPage from './components/member/MyPage';
//Pwfind 링크 주소 변경
import PwFind from './components/member/Find';
import LeportsPlace from './components/leports/LeportsPlace';
import LeportsSearch from './components/leports/LeportsSearch';
//ChallengeCreate 링크 주소 변경
import ChallengeCreate from './components/challenge/Challenge_create';
import ChallengeManagement from './components/challenge/ChallengeManagement';
import ChallengeSearch from './components/challenge/ChallengeSearch';
import ChallengeShare from './components/challenge/ChallengeShare';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeportsPlaceForm2_1 from './components/leports/LeportsPlaceForm2_1';
import LeportsPlaceForm2_2 from './components/leports/LeportsPlaceForm2_2';
import LeportsPlaceForm3_1 from './components/leports/LeportsPlaceForm3_1';
import LeportsPlaceForm3_2 from './components/leports/LeportsPlaceForm3_2';
import LeportsPlaceForm3_3 from './components/leports/LeportsPlaceForm3_3';
import LeportsPlaceForm3_4 from './components/leports/LeportsPlaceForm3_4';

import Header from './components/common/Header1';
import Footer from './components/common/Footer';
import LeportsPlaceForm from './components/leports/LeportsPlaceForm';
import BoardCreate from './components/community/BoardCreate';
import './MemberJoinapp.css'
import ChallengeView from './components/challenge/ChallengeView';




function App() {
  
  return (
    <div className="App">
      <Header/>
     <Routes>
      {/* 메인 페이지 */}
     <Route path='/' element={<Main/>}></Route>
    
     {/* 커뮤니티 페이지 */}
     <Route path='/community/boardlist' element={<BoardList/>}></Route>
     <Route path='/community/noticelist' element={<NoticeList/>}></Route>
     <Route path='/community/boarddetail/:b_seq' element={<BoardDetail/>}></Route>
     <Route path='/community/boardcreate/:b_type' element={<BoardCreate/>}></Route>


     {/* 회원 페이지  */}
     <Route path='/member/idfind' element={<IdFind/>}></Route>
     <Route path='/member/memberjoin' element={<MemberJoin/>}></Route>
     <Route path='/member/memberlogin' element={<MemberLogin/>}></Route>
     <Route path='/member/mypage' element={<MyPage/>}></Route>
     <Route path='/member/pwfind' element={<PwFind/>}></Route>
     <Route path='/member/pwChange' element={<PwChange/>}></Route>

     {/* 레포츠 조회 페이지 */}
     <Route path='/leports/leportsplace' element={<LeportsPlace/>}></Route>
     <Route path='/leports/leportssearch' element={<LeportsSearch/>}></Route>
     <Route path='/leports/leportssearch/LeportsPlaceForm' element={<LeportsPlaceForm/>}></Route>
     <Route path='/leports/leportssearch/LeportsPlaceForm2_1' element={<LeportsPlaceForm2_1/>}></Route>
     <Route path='/leports/leportssearch/LeportsPlaceForm2_2' element={<LeportsPlaceForm2_2/>}></Route>
     <Route path='/leports/leportssearch/LeportsPlaceForm3_1' element={<LeportsPlaceForm3_1/>}></Route>
     <Route path='/leports/leportssearch/LeportsPlaceForm3_2' element={<LeportsPlaceForm3_2/>}></Route>
     <Route path='/leports/leportssearch/LeportsPlaceForm3_3' element={<LeportsPlaceForm3_3/>}></Route>
     <Route path='/leports/leportssearch/LeportsPlaceForm3_4' element={<LeportsPlaceForm3_4/>}></Route>
     
     

      {/* 챌린지 페이지 */}
      
      <Route path='/challenge/challengecreate' element={<ChallengeCreate/>}></Route>
      <Route path='/challenge/challengemanagement' element={<ChallengeManagement/>}></Route>
      <Route path='/challenge/challengesearch' element={<ChallengeSearch/>}></Route>
      <Route path='/challenge/challengeshare' element={<ChallengeShare/>}></Route>
      <Route path='/challenge/challengeview' element={<ChallengeView/>}></Route>


      <Route></Route>
      </Routes>
      <Footer/>


    </div>
  );
}

export default App;
