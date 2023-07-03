import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../LApp.css";

const Comment = ({ b_seq }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userSeq, setUserSeq] = useState(null);
  const [userNick, setUserNick] = useState(null);

  //현재 로그인한 사용자 정보 가져오기 
  useEffect(() => {
    setUserSeq(sessionStorage.getItem('accessMemberSeq'));
    setUserNick(sessionStorage.getItem('userNick'));
    console.log('코멘트 페이지');
    console.log('userSeq:',userSeq);
    console.log('userNick : ', userNick);
    
  }, []);
  //댓글 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8094/spofit/community/boarddetail/${b_seq}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error!");
      });
  }, [b_seq]);

  //새로운 댓글 생성하기
  const handleCreateComment = () => {
    axios
      .post(
        `http://localhost:8094/spofit/community/boarddetail/${b_seq}/comments`,
        {
          cmt_context: newComment,
          m_seq: userSeq
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setComments([...comments, res.data]);
        setNewComment("");
      })
      .catch((error) => {
        console.error(error);
        alert("Error!");
      });
  };


  // 댓글 수정 토글
  const handleToggleEdit = (cmt_seq) => {
    setComments(
      comments.map((comment) =>
        comment.cmt_seq === cmt_seq
          ? { ...comment, editing: !comment.editing }
          : comment
      )
    );
  };

  // 기존 댓글 수정 후 저장하기
  const handleCommentSave = (cmt_seq, updatedContent) => {
    axios
      .put(
        `http://localhost:8094/spofit/community/boarddetail/${b_seq}/comments/${cmt_seq}`,
        {
          cmt_context: updatedContent,
        }
      )
      .then((res) => {
        setComments(
          comments.map((comment) =>
            comment.cmt_seq === cmt_seq ? { ...res.data, editing: false } : comment
          )
        );
      })
      .catch((error) => {
        console.error(error);
        alert("Error!");
      });
  };

  // 댓글 삭제하기
  const handleCommentDelete = (cmt_seq) => {
    axios
      .delete(
        `http://localhost:8094/spofit/community/boarddetail/${b_seq}/comments/${cmt_seq}`
      )
      .then(() => {
        setComments(comments.filter((comment) => comment.cmt_seq !== cmt_seq));
      })
      .catch((error) => {
        console.error(error);
        alert("Error!");
      });
  };

  return (
    <div className="comment-board">
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.cmt_seq} className="comment-container">
            {comment.editing ? (
              <input
                className="comment-input"
                type="text"
                defaultValue={comment.cmt_context}
                onChange={(e) =>
                  setComments(
                    comments.map((c) =>
                      c.cmt_seq === comment.cmt_seq ? { ...comment, cmt_context: e.target.value } : c,
                    ),
                  )
                }
              />
            ) : (
              <p className="comment-text">댓글 : {comment.cmt_context}</p>
            )}
            <p className="comment-nick">작성자 : {comment.m_nick}</p>
            <p className="comment-date">작성일 : {comment.cmt_dt}</p>
            {comment.m_seq == userSeq && (
              <>
                <button className="comment-toggle-edit" onClick={() => handleToggleEdit(comment.cmt_seq)}>
                  {comment.editing ? "취소" : "댓글수정"}
                </button>
                {comment.editing ? (
                  <button
                    className="comment-save"
                    onClick={() => handleCommentSave(comment.cmt_seq, comment.cmt_context)}
                  >
                    댓글 저장
                  </button>
                ) : (
                  <button className="comment-delete" onClick={() => handleCommentDelete(comment.cmt_seq)}>
                    댓글 삭제
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="new-comment-container">
        <input
          className="new-comment-input"
          type="text"
          placeholder="댓글을 작성하세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="new-comment-submit" onClick={handleCreateComment}>
          댓글 작성
        </button>
      </div>
    </div>
  );
};

export default Comment;
