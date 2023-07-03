import React from "react";
import Paging from "../community/Paging";
import "../../LApp.css";
import { useState, useEffect } from "react";

import axios from 'axios';
import ChallengeViewer from "./ChallengeViewer";

const ChallengeShare = () => {

  {/* 챌린지 공유하기  
        1. 일단 한페이지에 ... 6개 보이게 -> div 공간 -> 백그라운드컬러..로 공간 
        2. 한개의 컴포넌트는 있다 생각하고 페이지 구성만 하기 -> 페이징, 각각 객체를 눌렀을때 온클릭
      */}
      // 페이지 관련 함수
  const[sharedList, setSharedList] = useState([]);
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const itemsPerPage = 6; // 한 페이지에 보여줄 아이템 수

  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sharedList.slice(startIndex, endIndex); 
  };

  useEffect(() => {
    // 진행중인 챌린지 목록 가져오기
    axios.get('http://localhost:8094/spofit/challenge/sharedlist')
      .then((res) => {
        setSharedList(res.data);
      })
  }, []); 
  return (
    <div>
      <div className="challengeshare-maintitle-container">
        <h3 className="challengeshare-maintitle-text">ChallengeShare</h3>
        <br/>
        <hr/>
      </div>
      
      <div className="challenge-share-grid">
    {/* getCurrentPageItems 함수를 사용하여 페이지당 아이템 렌더링 */}
    {getCurrentPageItems().map(item => (
      <div key={item.chal_seq}>
        <div  className='challenged-save-item'>
          <ChallengeViewer chal_goal_dt={item.chal_goal_dt} chal_title={item.chal_title} chal_context={item.chal_context}></ChallengeViewer>
          <h3 className='challenge-save-font'>{item.chal_title}</h3>
        </div>
      </div>
    ))}
  </div>
      <div className="challengeshare-paging-container">
      <Paging page={page} 
      count={sharedList.length} 
      setPage={setPage} />
      
      </div>
    </div>
  );
};

export default ChallengeShare;
