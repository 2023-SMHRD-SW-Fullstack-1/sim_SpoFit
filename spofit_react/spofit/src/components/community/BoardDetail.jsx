import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../LApp.css';
import Comment from './Comment';

const BoardDetail = () => {
  const { b_seq } = useParams();
  const [board, setBoard] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(board.b_content);
  const [updatedTitle, setUpdatedTitle] = useState(board.b_title);
  
  const userSeq = sessionStorage.getItem('accessMemberSeq');
  const userNick = sessionStorage.getItem('accessMemberNick');
  
  
  console.log('디테일 페이지 진입');
  
  console.log('userSeq:',userSeq)
  console.log('userNick:', userNick);
  console.log('board.m_seq:', board.m_seq);
  console.log('board.m_nick :', board.m_nick);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8094/spofit/community/boarddetail/${b_seq}`)
      .then((res) => {
        console.log('결과', res.data);
        setBoard(res.data);
        if (res.data.b_file) {
          setImageUrl(`${res.data.b_file}`);
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error!');
      });
 
    //조회수 증가 처리
      axios
      .put(`http://localhost:8094/spofit/community/boarddetail/inc_views/${b_seq}`)
            .then((res) => {
        console.log("조회수 증가 등록 완료");
      })
      .catch((error) => {
        console.error(error);
        alert("조회수가 처리 오류가 발생했습니다.");
      });
  }, [b_seq]);
  // 관리자 확인 함수
  const isAdmin = () => {
    return userSeq === "165" && userNick === "관리자";
  };

  // 작성자 확인 함수
  const isAuthor = () => {
    return userSeq && Number(userSeq) === board.m_seq;
  };



  // 목록으로 돌아가기 버튼 클릭 이벤트 처리
  const handleBackToList = () => {
    nav('/community/boardlist');
  };

  // 삭제 버튼 눌렀을 때
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:8094/spofit/community/boarddelete/${b_seq}`)
        .then((res) => {
          console.log(res.data);
          alert("삭제되었습니다.");
          nav("/community/boardlist");
        })
        .catch((error) => {
          console.error(error);
          alert("Error!");
        });
    }
  };

  //수정버튼
  const handleEdit = () => {
    setEditing(true);
    setUpdatedContent(board.b_content); // 기존 글의 내용으로 초기화
    setUpdatedTitle(board.b_title);
  };

  // 저장 버튼 클릭 시 수정된 내용 저장하기
  const handleSave = () => {
    if (window.confirm("정말 수정하시겠습니까?")) {
      axios
        .put(`http://localhost:8094/spofit/community/boardupdatedetail/${b_seq}`, {
          b_content: updatedContent,
          b_title: updatedTitle,
        })
        .then((res) => {
          console.log(res.data);
          alert("수정되었습니다.");
          setBoard({
            ...board,
            b_content: updatedContent,
            b_title: updatedTitle,
          });
          setEditing(false);
          // 수정 후에 상세 페이지로 이동
          nav(`/community/boarddetail/${b_seq}`);
        })
        .catch((error) => {
          console.error(error);
          alert("Error!");
        });
    }
  };

  //수정 취소
  const handleCancel = () => {
    setEditing(false);
    setBoard({ ...board, b_content: board.b_content, b_title:board.b_title });
  };

  //제목 바뀔때마다 업데이트
  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  //내용 바뀔때마다 업데이트
  const handleChange = (e) => {
    setUpdatedContent(e.target.value);
  };

  //작성자 눌렀을때 그 사람 마이페이지 가기
  const navMypage = () => {
     
  sessionStorage.setItem('boardMSeq', board.m_seq);
  sessionStorage.setItem('boardMNick', board.m_nick);
  // const boardMSeq = sessionStorage.getItem('boardMSeq');
  // const boardMNick = sessionStorage.getItem('boardMNick');
  // console.log('boardMSeq:', boardMSeq);
  // console.log('boardMNick:', boardMNick);
  // nav(`/member/mypage/${boardMSeq}`);
  nav(`/member/mypage`);
};
            

  return (
    <div className="board-detail-container">
      <h5 className="board-detail-title"></h5>
      <div className="board-detail-content">
        <h2 className="board-detail-header">
          제목: {editing ? (
            <input
              className="board-detail-edit-title"
              type="text"
              value={updatedTitle}
              onChange={handleTitleChange}
            />
          ) : (
            board.b_title
          )}
        </h2>
      </div>
  
      <div className="board-detail-description">
        {editing ? (
          <label className="board-detail-edit-label">
            내용:
            <textarea
              className="board-detail-edit-textarea"
              value={updatedContent}
              onChange={handleChange}
            />
          </label>
        ) : (
          <p className="board-detail-content-text">내용: {board.b_content}</p>
        )}
        <p className="board-detail-author" onClick={navMypage}>작성자: 
        {board.m_nick}</p>
        <p className="board-detail-created-at">작성일: {board.b_dt}</p>
        <p className="board-detail-views">조회수: {board.b_views}</p>
        {imageUrl && (
          <img
            className="board-detail-image"
            width="250px"
            src={`http://localhost:8094/spofit/${imageUrl}`}
            alt="이미지"
          />
        )}
      </div>

      <div className='board-detail-back-button-container'>
      <button
        className="board-detail-back-button"
        onClick={handleBackToList}
      > 
        자유게시판목록
      </button></div>

      {editing ? (
        <div className="board-detail-edit-buttons">
          <button className="board-detail-save-button" onClick={handleSave}>
            저장
          </button>
          <button className="board-detail-cancel-button" onClick={handleCancel}>
            취소
          </button>
        </div>
      ) : (
        <div className="board-detail-buttons">
         {board && (isAdmin() || isAuthor()) && (
       <>
       <button
        className="board-detail-edit-button"
        onClick={handleEdit}
      >
        수정
      </button>
      <button
        className="board-detail-delete-button"
        onClick={handleDelete}
      >
        삭제
      </button>
        </>
        )}
    </div>
      )}
      
      <div className="comment-horizon">
        <p className="comment-horizonline">댓글창</p>
      </div>
      <Comment b_seq={b_seq} />
    </div>
  );
}

export default BoardDetail;