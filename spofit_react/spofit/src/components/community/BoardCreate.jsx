import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import '../../LApp.css';
import { useParams } from 'react-router-dom';

const BoardCreate = () => {
  const [b_title, setB_Title] = useState('');
  const [b_content, setB_Content] = useState('');
  const [b_file, setB_File] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const { b_type } = useParams();
  const [userSeq, setUserSeq] = useState(null);
  const [userNick, setUserNick] = useState(null);
 
  const nav = useNavigate();

  useEffect(() => {
    setUserSeq(sessionStorage.getItem('accessMemberSeq'));
    setUserNick(sessionStorage.getItem('userNick'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('b_title', b_title);
    formData.append('b_content', b_content);
    formData.append('m_seq', userSeq);
    formData.append('m_nick', userNick);
    for (let i = 0; i < b_file.length; i++) {
      formData.append('b_file', b_file[i]);
    }

    axios
      .post(`http://localhost:8094/spofit/community/boardcreate?b_type=${b_type}`, formData)
      .then((res) => {
        console.log(res.data);
        alert('등록되었습니다.');
        setB_Title('');
        setB_Content('');
        setB_File([]);
        setPreviewImages([]);
        nav(-1);
      })
      .catch((error) => {
        console.error(error);
        alert('Error!');
      });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('b_title', b_title);
  //   formData.append('b_content', b_content);
  //   formData.append('m_seq', userSeq);
  //   formData.append('m_nick', userNick);
  //   if (b_file.length > 0) { // b_file 상태에 이미지 파일이 있는지 확인
  //     for (let i = 0; i < b_file.length; i++) {
  //       formData.append('b_file', b_file[i]);
  //     }
  //   }
  
  //   axios
  //     .post(`http://localhost:8094/spofit/community/boardcreate?b_type=${b_type}`, formData)
  //     .then((res) => {
  //       console.log(res.data);
  //       alert('등록되었습니다.');
  //       setB_Title('');
  //       setB_Content('');
  //       setB_File([]);
  //       setPreviewImages([]);
  //       nav(-1);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert('Error!');
  //     });
  // };
  

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    const imagesArray = Array.from(selectedImages);
    setB_File(imagesArray); // 선택한 파일들을 상태에 저장

    const previewArray = [];
    for (let i = 0; i < imagesArray.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewArray.push(reader.result); // 미리보기 이미지를 배열에 추가
        if (previewArray.length === imagesArray.length) {
          setPreviewImages(previewArray); // 모든 미리보기 이미지 저장
        }
      };
      reader.readAsDataURL(imagesArray[i]); // 파일을 읽어와서 미리보기 이미지 생성
    }
  };

  const backBoardList = () => {
    alert('글 작성을 취소합니다.');
    nav('/community/boardlist');
  };

  return (
    <div className="board-create-container">
      <h5 className="board-create-header">글 작성하기</h5>
  
      <form onSubmit={handleSubmit} className="board-create-form">
        <div className="board-create-title-container">
          <label htmlFor="b_title" className="board-create-title-label">
            제목 :
          </label>
          <input
            type="text"
            id="b_title"
            value={b_title}
            onChange={(e) => setB_Title(e.target.value)}
            placeholder="제목을 입력하세요."
            className="board-create-title-input"
          />
        </div>
  
        <div className="board-create-content-container">
          <label className="board-create-content-label">내용 : </label>
          <textarea
            id="b_content"
            value={b_content}
            onChange={(e) => setB_Content(e.target.value)}
            placeholder="내용을 입력하세요."
            className="board-create-content-textarea"
          ></textarea>
        </div>
  
        <div className="board-create-image-upload-container">
          <label htmlFor="b_file" className="board-create-image-upload-label">
            이미지 업로드
          </label>
          <input
            type="file"
            id="b_file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="board-create-image-upload-input"
          />
        </div>
  
        {previewImages.map((previewImage, index) => (
          <div key={index} className="board-create-preview-container">
            <p className="board-create-preview-text">
              이미지 미리보기 {index + 1}
            </p>
            <img
              src={previewImage}
              alt={`Preview ${index + 1}`}
              width="200"
              className="board-create-preview-image"
            />
          </div>
        ))}
  
        <div className="board-create-buttons-container">
          <button type="submit" className="board-create-button-submit">
            글 등록
          </button>
          <button onClick={backBoardList} className="board-create-button-cancel">
            작성 취소
          </button>
        </div>
      </form>
    </div>
  );
 }
export default BoardCreate;  