import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Paging from './Paging';

const NoticeList = () => {
  //로그인 정보 
  const userSeq = sessionStorage.getItem('accessMemberSeq');
  const [adminMSeq, setAdminMSeq] = useState(null);

  //페이지 관련 함수
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수
  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return noticeList.slice(startIndex, endIndex);
  };

  // 공지사항 확대 + 버튼 기능
  const [plustNotice, setPlusNotice] = useState(null);

  //선택된 아이템과 plusNotice의 값이 같은지
  const handlePlus = (e) => {
    if (plustNotice !== e) {
      increaseViews(e);
    }
    setPlusNotice(e === plustNotice ? null : e);
  };
  

  const [noticeList, setNoticeList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  //공지사항 가져오기 
  useEffect(() => {
    axios
      .get('http://localhost:8094/spofit/noticelist')
      .then((res) => {
        setNoticeList(res.data);
        console.log('res.data:', res.data);
      })
      .catch((error) => {
        console.error('공지사항을 가져오는 중 오류가 발생했습니다: ', error);
      });
  }, []);

  //관리자 여부 확인하기
useEffect(() => {
  if (userSeq) {
    axios
      .get("http://localhost:8094/spofit/noticelist/admin_yn")
      .then((res) => {
        setAdminMSeq(res.data);
        console.log("관리자 확인 res.data:", res.data);
      })
      .catch((error) => {
        console.error("관리자 정보를 가져오는 중 오류가 발생했습니다: ", error);
      });
  } else {
    setAdminMSeq(null);
  }
}, [userSeq]);

    // 조회수 증가
  const increaseViews = (b_seq) => {
  axios
    .put(`http://localhost:8094/spofit/noticelist/inc_views/${b_seq}`)
    .then((res) => {
      console.log("조회수가 증가되었습니다.");
      
      // 게시물의 조회수를 증가
      const updatedNoticeList = noticeList.map((notice) => {
        if (notice.b_seq === b_seq) {
          return { ...notice, b_views: notice.b_views + 1 };
        } else {
          return notice;
        }
      });

      // State 업데이트
      setNoticeList(updatedNoticeList);
    })
    .catch((error) => {
      console.error("조회수를 증가시키던 중 오류 발생:", error);
    });
};
  
  //수정
  const startEdit = (index) => {
    setEditingIndex(index);
  };
  //공지사항 수정
  const updateNotice = (e, b_seq) => {
   e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const content = formData.get("content");

  axios
    .put(`http://localhost:8094/spofit/noticelist/update/${b_seq}`, {
      b_title: title,
      b_content: content,
    })
    .then((res) => {
      console.log(res.data);
      // 수정한 내용을 반영하여 목록 업데이트
      setNoticeList(
        noticeList.map((item) => (item.b_seq === b_seq ? { ...item, b_title: title, b_content: content } : item))
      );
      // 수정 완료 후, 수정 중인 글 인덱스 초기화
      setEditingIndex(null);
      alert("수정되었습니다.");
    })
    .catch((error) => {
      console.error(error);
      alert("Error!");
    });
};
 
 // 글 삭제
const deleteNotice = (b_seq) => {
  console.log("글 삭제", b_seq);
  if (window.confirm("정말 삭제하시겠습니까?")) {
    axios
      .delete(`http://localhost:8094/spofit/noticelist/delete/${b_seq}`)
      .then((res) => {
        console.log(res.data);
        alert("삭제되었습니다.");
        // 아이템 삭제 후 목록 업데이트
        setNoticeList(noticeList.filter((item) => item.b_seq !== b_seq));
      })
      .catch((error) => {
        console.error(error);
        alert("Error!");
      });
  }
};


return (
  <div>
    <div className="notice-list__main-title"><h2 >공지사항</h2></div>
  <div className="notice-list">
    
    <h4 className="notice-list__subtitle">SPO-FIT의 공지사항입니다.</h4>
    <div className='notice-list_table-container'>
    <table className="notice-list__table">
      <thead>
        <tr className="notice-list__table-header">
          <th className="notice-list__table-header-category">공지사항</th>
          <th className="notice-list__table-header-title">제목</th>
          <th className="notice-list__table-header-author">글쓴이</th>
          <th className="notice-list__table-header-views">조회수</th>
          <th className="notice-list__table-header-datetime">날짜</th>
          <th className="notice-list__table-header-details">상세보기</th>
        </tr>
      </thead>
      <tbody>
        
        {noticeList.map((item, index) => (
          <>
            <tr key={item.b_seq} className="notice-list__table-row">
              <td className="notice-list__table-type">
                <span>[</span>
                {item.b_type}
                <span>]</span>
              </td>
              {editingIndex === index ? (
                <td colSpan="4" className="notice-list__table-edit">
                  <form onSubmit={(e) => updateNotice(e, item.b_seq)} className="notice-list__table-edit-form">
                    <input type="text" name="title" defaultValue={item.b_title} className="notice-list__table-edit-title" />
                    <input type="text" name="content" defaultValue={item.b_content} className="notice-list__table-edit-content" />
                    <button type="submit" className="notice-list__table-edit-save">저장</button>
                    <button onClick={() => setEditingIndex(null)} className="notice-list__table-edit-cancel">취소</button>
                  </form>
                </td>
              ) : (
                <>
                  <td className="notice-list__table-title">{item.b_title}</td>
                  <td className="notice-list__table-author">관리자</td>
                  <td className="notice-list__table-views">{item.b_views}</td>
                  <td className="notice-list__table-datetime">{item.b_dt}</td>
                </>
              )}
              <td className="notice-list__table-actions">
                <button onClick={() => handlePlus(item.b_seq)} className="notice-list__table-expand-show">{plustNotice === item.b_seq ? '-' : '+'}</button>
                {adminMSeq == userSeq && (
                  <>
                    <button onClick={() => startEdit(index)} className="notice-list__table-actions-edit">수정</button>
                    <button onClick={() => deleteNotice(item.b_seq)} className="notice-list__table-actions-delete">삭제</button>
                  </>
                )}
              </td>
            </tr>
            {plustNotice === item.b_seq ? (
              <tr className="notice-list__table-expand-row">
                <td colSpan="6" className="notice-list__table-expand">
                  <div className="notice-list__table-expand-content">{item.b_content}</div>
                  <div className="notice-list__table-expand-image">
                    {item.b_file && (
                      <img
                        width="250px"
                        src={`http://localhost:8094/spofit/${item.b_file}`}
                        alt="이미지"
                        className="notice-list__table-expand-image-src"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ) : null}
          </>
        ))}
        
      </tbody>
    </table>
    </div>
      
    <div className="notice-list__actions">
      {adminMSeq == userSeq && (
        <div className='notice-list__actions-write-container'>
        <Link to="/community/boardcreate/공지사항">
          <button className="notice-list__actions-write">글쓰기</button>
        </Link> </div>
      )}
    </div>
    <div className="notice-list__paging">
      <Paging page={page} count={noticeList.length} setPage={setPage} />
    </div>
    </div>
  </div>
);
}

export default NoticeList;

