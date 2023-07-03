import React, { useEffect, useState } from 'react'
import '../../Papp.css'
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import saveListIcon from "../../image/challengeSaveListIcon.png";
import ChallengeViewer from './ChallengeViewer';

// 진행중 챌린지 관리

const ChallengeManagement = () => {



  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows :true,
    responsive: [
      { breakpoint: 1500, // 화면의 넓이가 600px 이상일 때
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
      }},
      { breakpoint: 1100, // 화면의 넓이가 320px 이상일 때
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }}
    ]
    
}
  
  // const [doingPage, setDoingPage] = useState(1); 
  // const [donePage, setDonePage] = useState(1);
  // const [savePage, setSavePage] = useState(1); 

  const itemsPerPage = 3; //페이지당 3개 아이템 

  //페이징 할 리스트 관리 
  const[doingList, setDoingList] = useState([]);
  const[doneList, setDoneList] = useState([]);
  const[saveList, setSaveList] = useState([]);

  // const getCurrentDoingItems = () => {
  //   const startIndex = (doingPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return doingList.slice(startIndex, endIndex);
  // };
  // const getCurrentDoneItems = () => {
  //   const startIndex = (donePage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return doneList.slice(startIndex, endIndex);
  // };
  // const getCurrentSaveItems = () => {
  //   const startIndex = (savePage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return saveList.slice(startIndex, endIndex);
  // };
  
  const accessMemberSeq = sessionStorage.getItem("accessMemberSeq");
  //클릭시 해당 View로 이동시키는 방법
  const loadChange=(e)=>{
    sessionStorage.setItem('challengeSequence', e);
    window.location.href = '/challenge/challengecreate'
  }

  const loadView=(e)=>{
    sessionStorage.setItem('challengeSequence', e);
    window.location.href = '/challenge/challengeview'
  }
  useEffect(()=>{
    //accessMemberSeq
    if(accessMemberSeq < 1){
      alert('로그인이 필요한 페이지 입니다')
      return window.location.href="/member/memberLogin"
      }
// 진행중인 챌린지 목록 가져오기 
    axios.get('http://localhost:8094/spofit/challenge/doinglist',{ 
    params : { 
      m_seq : accessMemberSeq
    }
  })
    .then((res)=>{
      console.log('결과', res.data);
      setDoingList(res.data);
      console.log(res.data);
    })
// 완료한 챌린지 목록 가져오기
    axios.get('http://localhost:8094/spofit/challenge/donelist',{ 
    params : { 
      m_seq : accessMemberSeq
    }
  })
    .then((res)=>{
      console.log('결과', res.data);
      setDoneList(res.data);
    })
    axios.get('http://localhost:8094/spofit/challenge/savelist',{ 
    params : { 
      m_seq : accessMemberSeq
    }
  })
    .then((res)=>{
      setSaveList(res.data);
    })
} ,[])
// >>>>>>> Stashed changes
// >>>>>>> park_connectToSpring_idFind

  return (
    <div className='challenge-containerSize'>
    <div>
        {/* 챌린지관리하기 페이지
        진행중인 챌린지 영역
        챌린지 제목, 리스트(체크 할 수 있게 하기), 달력 보여주기
        양 옆의 버튼으로 넘어가서 보여주기
        챌린지 완료 버튼 클릭시 완료한 챌린지로 가게 하기
        챌린지 삭제 버튼 클릭 시 챌린지 DB에서 삭제

        완료한 챌린지
        챌린지 보이게 하고 양 옆 버튼 
        */}

        {/* 진행중인 챌린지 리스트 제공 */}

  <div className="challengeManageContainer">
    <br></br>
    <h3 className='challenge-manage-title'> 챌린지 관리 </h3>
    <br></br>
      <h2 className="challenge-title">진행중인 챌린지</h2>
    <div className="challenge-section">
    <Slider {...settings}>
        {doingList.length>0 && doingList.map(item=>(
          <div key={item.chal_seq}>
          <div  onClick={(e)=>{loadView(item.chal_seq)}} className='challenged-save-item'>
            {/* <img src={saveListIcon} className='challenge-savelist-img'/> */}
            <ChallengeViewer chal_goal_dt={item.chal_goal_dt} chal_title={item.chal_title} chal_context={item.chal_context}></ChallengeViewer>
         
        </div>
        </div>
        ))}
    </Slider>
    </div>
   
       
      <h2 className="challenge-title">완료한 챌린지</h2>
      <div className="challenge-section">
      <Slider {...settings}>
        {doneList.length>0 && doneList.map(item=>(
          <div key={item.chal_seq}>
          <div  onClick={(e)=>{loadView(item.chal_seq)}} className='challenged-save-item'>
            {/* <img src={saveListIcon} className='challenge-savelist-img'/> */}
            <ChallengeViewer chal_goal_dt={item.chal_goal_dt} chal_title={item.chal_title} chal_context={item.chal_context}></ChallengeViewer>
          
        </div>
        </div>
        ))}
         </Slider>
    </div>

       
      <h2 className="challenge-title">챌린지 보관함</h2>
     

      <div className="challenge-section3">
      <Slider {...settings}>
        {saveList.length >=0 && saveList.map(item=>(
          <div key={item.cus_seq}>
          <div  onClick={(e)=>{loadChange(item.cus_seq)}} className='challenge-save-item'>
            <img src={saveListIcon} className='challenge-savelist-img'/>
          <h3 className='challenge-save-font'>{item.cus_title}</h3>
        </div>
        </div>
        ))}
        </Slider>
    </div>
        </div>
        
  </div>
  <div className='paper'></div>
    </div>
    
  )
}

export default ChallengeManagement