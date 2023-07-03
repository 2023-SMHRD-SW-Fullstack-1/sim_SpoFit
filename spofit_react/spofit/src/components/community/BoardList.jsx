import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../LApp.css';
import Paging from './Paging';

const BoardList = ({idx}) => {
  const [boardList , setBoardList] = useState([])
  const userSeq = sessionStorage.getItem('accessMemberSeq');
  const userNick = sessionStorage.getItem('accessMemberNick');
  console.log(userSeq)
  console.log(userNick)
	
  const nav = useNavigate();
  //페이지 관련 함수
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수

  // axios spring에서 데이터 가져오기
  useEffect(()=>{
    axios.get('http://localhost:8094/spofit/community')
    .then((res)=>{
      console.log('결과', res.data);
      setBoardList(res.data)
    })
  },[])

    // userSeq 값에 따라 글쓰기 버튼 보이게 하기
    const getWriteBtn = () => {
      if (userSeq) {
        return (
          <div className="board-list-writeBtn">
            <Link to="/community/boardcreate/자유게시판">
              <button>글쓰기</button>
            </Link>
          </div>
        )
      } else {
        return null;
      }
    }

   // 페이징 - 현재 페이지에 해당하는 아이템들 가져오기
   // return dummyList 를 boardList로 바꿔주면 된다.
   const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return boardList.slice(startIndex, endIndex);
  };

  return (
    <div >
      

      {/* BoardList : 자유게시판 조회하기 */}
      <div className="board-list-container h5">
      <h5 >자유게시판</h5>
       </div>
      <div>
      
        <div className="board-list">
        
        <p className="board-list-container p">
          자유게시판을 이용하시기 전에 공지사항 '자유게시판 이용 수칙'을 확인하여 주시기
          바랍니다.
        </p>
        <table className="board-list-container table">
          <thead>
            <tr className="board-table-th">
              <th>제목</th>
              <th>조회수</th>
              <th>작성일</th>
              <th>닉네임</th>
            </tr>
          </thead>
          <tbody className='boardlist-tbody'>
            {/* 서버에서 가져온 데이터 출력 */}
            {getCurrentPageItems().map((item) => (
              <tr key={item.b_seq}>
                <td >
                  <p 
                    onClick={() => {
                      nav(`/community/BoardDetail/${item.b_seq}`);
                    }}
                  >
                    {item.b_title}
                  </p>
                </td>
                <td className='boardlist-tbody-text'>{item.b_views}</td>
                <td className='boardlist-tbody-text'>{item.b_dt}</td>
                <td className='boardlist-tbody-text'>{item.m_nick}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {getWriteBtn()}
      
        {/* Paging 컴포넌트 추가 */}
        {/* DB - 스프링에서 가져온 게시판 목록 페이징하려면 밑에거 사용하기 */}
        <Paging page={page} count={boardList.length} setPage={setPage} />
      </div>
      </div>
    </div>
  );
}

export default BoardList;