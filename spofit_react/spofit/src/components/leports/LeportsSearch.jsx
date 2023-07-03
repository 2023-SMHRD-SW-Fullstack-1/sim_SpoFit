import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {useMediaQuery} from 'react-responsive';
import { LuMousePointerClick } from "react-icons/lu";



const LeportsSearch = () => {
  const isDesktop = useMediaQuery({query: '(min-width: 801px)'});
  const isMobile = useMediaQuery({query: '(max-width: 800px)'});
  const searchNav= useNavigate();
  const handleCheck=()=>{
    searchNav("/leports/leportssearch/LeportsPlaceForm")
  }
  return (
    <div>
        {/* 레포츠 탐색하기 
         
         내게 맞는 레포츠 찾기 버튼이 나옴
         -> 버튼 클릭시 설문 진행
         -> 설문 진행에 따라 상단 (---) 색 변화 주기
         -> 상단(---) 클릭시 해당 설문 문항으로 이동
         -> 사진 클릭 시 다음 문항
         -> 한 설문에는 하나의 문항만 체크
         -> 결과 확인 클릭 시 추천 레포츠 리스트 결과화면으로 이동함
         -> 결과 화면의 운동에 각각 근처 위치 찾기 버튼
         -> 근처 위치 찾기 버튼 클릭시 시설 찾기 이동
         
        */}
       
        <div className='page1'>

        <div className='select1'>
          <p><strong>레포츠를 조회 할 수 있어요!</strong></p>
        </div>
        <div class="jb-wrap">
          <div class="jb-image"><img width='500px'src="https://media.istockphoto.com/id/1208604845/ko/%EB%B2%A1%ED%84%B0/%EA%B1%B4%EA%B0%95%ED%95%9C-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%8A%A4%ED%83%80%EC%9D%BC%EA%B3%BC-%EC%85%80%ED%94%84-%EC%BC%80%EC%96%B4-%EC%BB%A8%EC%85%89.jpg?s=612x612&w=0&k=20&c=vwdIONmnV0t5TH1rfM79tKtdF3gI3bm-RHwBgin79gI=" alt=""/></div>
          <div class="jb-text">
            <Link to='/leports/leportssearch/LeportsPlaceForm' className='lk1'><p><b>레포츠 조회</b></p></Link>
          </div>
        </div>
       
     
        
          </div>
       
        
    </div>
  )
}

export default LeportsSearch