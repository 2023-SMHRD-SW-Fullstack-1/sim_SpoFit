import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import saveListIcon from "../../image/challengeSaveListIcon.png";
import './MyPage.css';
import ChallengeViewer from '../challenge/ChallengeViewer'


const MyPage = () => {
  const [userImage, setUserImage] = useState('');
  const [newUserwriter, setNewUserWriter] = useState('');
  const [m_Profile, setM_Profile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userwriter, setUserWriter] = useState('');
  const userSeq = sessionStorage.getItem('accessMemberSeq'); // 로그인한 사용자의 SEQ
  const userNick = sessionStorage.getItem('accessMemberNick'); // 로그인한 사용자의 Nick

  const boardSeq = sessionStorage.getItem('boardMSeq'); // 커뮤니티에서 받아온 글 작성자 SEQ
  const boardNick = sessionStorage.getItem('boardMNick'); // 커뮤니티에서 받아온 글 작성자 Nick



  // 할당된 SEQ를 사용해 사용자의 마이페이지를 표시한다.
  const displaySeq = boardSeq || userSeq;
  console.log('디스플레이 : ', displaySeq);
  const displayNick = boardSeq ? boardNick : userNick;
  console.log(displayNick)

  // 로그인한 사용자와 페이지 사용자가 동일한지 여부 확인
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    // 로그인한 사용자와 페이지 사용자가 동일한지 여부 확인 및 상태 설정
    setIsCurrentUser(userSeq === displaySeq);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // 페이지 이탈 시 'boardSeq' 및 'boardNick' 정보 삭제
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  // 페이지 이탈 시 'boardSeq' 및 'boardNick' 정보 삭제
  const handleBeforeUnload = () => {
    sessionStorage.removeItem("boardMSeq");
    sessionStorage.removeItem("boardMNick");
  };


  // 편집 버튼 이벤트 토글 핸들러
  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  // 회원 전용 페이지와 프로필 이미지 불러오기 설정
  useEffect(() => {
    if (userSeq < 1) {
      alert('회원 전용 페이지입니다.');
      window.location.href = '/member/memberlogin';
    } else {
      axios
        .get('http://localhost:8094/spofit/member/loadfreepost',
          {
            params: {
              'm_seq': displaySeq
            }
          }
        )
        .then((response) => {
          if (response.data == null) {
            setUserWriter('자신을 소개해주세요!');
            setNewUserWriter('자신을 소개해주세요!');
          } else {
            setUserWriter(response.data);
            setNewUserWriter("");
          }
        })

      axios
        .get("http://localhost:8094/spofit/member/getprofileimage", {
          params: {
            'm_seq': displaySeq
          },
          responseType: "blob"
        })
        .then((response) => {
          const imagePath = URL.createObjectURL(response.data);
          setUserImage(imagePath);

        });
    }
  }, [displaySeq]);


  // 자기소개 업데이트 함수
  const handleUserwriterUpdate = async () => {
    try {
      await axios.post('http://localhost:8094/spofit/member/updatemypage', { m_freepost: newUserwriter, m_seq: userSeq });

      alert('수정완료');
      setUserWriter(newUserwriter);
      setEditMode(false);
    } catch (error) {
      console.error("자기소개 수정 실패: ", error);
      alert('Error!');
    }
  };


  // 프로필 사진 변경을 위한 제출 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (m_Profile) {
      formData.append('file', m_Profile);
    }

    axios
      .post('http://localhost:8094/spofit/member/updateprofile', formData, {
        params: {
          m_seq: userSeq
        }
      })
      .then((res) => {
        alert('프로필사진이 변경 되었습니다.');
        setUserImage(res.data.userImage);
      })
      .catch((error) => {
        console.error(error);
        alert('프로필 사진 변경이 실패하였습니다.');
      });
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      setM_Profile(file);
      previewFile(file);
    }
  };

  // 파일 미리보기 함수
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };


  //챌린지 slider
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  }

  //챌린지 선택시 이동 설정
  const loadView = (e) => {
    sessionStorage.setItem('challengeSequence', e);
    window.location.href = '/challenge/challengeview'
  }

  //챌린지 변수 
  const [doingList, setDoingList] = useState([]);
  const [doneList, setDoneList] = useState([]);


  //화면 로딩시 챌린지 목록 가져오기
  useEffect(() => {
    //accessMemberSeq
    if (userSeq < 1) {
      alert('로그인이 필요한 페이지 입니다')
      return window.location.href = "/member/memberLogin"
    }
    // 진행중인 챌린지 목록 가져오기 
    axios.get('http://localhost:8094/spofit/challenge/doinglist', {
      params: {
        m_seq: displaySeq
      }
    })
      .then((res) => {
        console.log('결과', res.data);
        setDoingList(res.data);
      })
    // 완료한 챌린지 목록 가져오기
    axios.get('http://localhost:8094/spofit/challenge/donelist', {
      params: {
        m_seq: displaySeq
      }
    })
      .then((res) => {
        console.log('결과', res.data);
        setDoneList(res.data);
      })
  }, [displaySeq]);


  return (
    <div className="m_mypage-profile">
      <div className="m_mypage-content">
        <div className="m_mypage-left">
          {/* 프로필 사진, 닉네임, 파일 선택, 사진 변경 버튼 */}
          <div className="m_mypage-profile-container">
            <div className="signup-profileImg-label">
              <img src={userImage || previewImage} alt="프로필 사진" />
            </div>
          </div>

          {/* 파일 선택, 사진 변경 버튼 */}
          <input
            type="file"
            accept="image/*"
            className="file-upload"
            onChange={handleFileUpload}
            id="file-upload"
            style={{ display: "none" }}
          />
          <div className='custom-btnbox'>
            {isCurrentUser && (
              <>
                <label htmlFor="file-upload" className="custom-button">프로필 선택</label>
                <button onClick={handleSubmit} className="custom-button">프로필 변경</button>
              </>
            )}
          </div>
        </div>

        <div className="m_mypage-right">  
          <div className="m_mypage-nickname-label">닉네임 : {displayNick}</div>
          <div className="m_mypage-introduction-container">
            {!userwriter? <h4 className='itdText'>자신을 소개해보세요 !</h4> : ''}
            {!editMode ? (
              <p>{userwriter}</p>
            ) : (
              <textarea className='textareaBox'
                value={newUserwriter}
                onChange={(e) => setNewUserWriter(e.target.value)}
                placeholder="자신을 소개해보세요!"
                ></textarea>
                )}
           
                </div>

            {/* 수정 버튼 위치 변경: m_mypage-introduction-container 내부로 이동 */}
            {!editMode ? (
              isCurrentUser && <button onClick={handleEditMode} className="edit-introduction-btn1">수정</button>
              ) : (
  <div className='ecBtns'>
    <button onClick={handleUserwriterUpdate} className="edit-introduction-btn">완료</button>&nbsp;
    <button onClick={handleEditMode} className="cancel-introduction-btn">취소</button>
  </div>
                
)}
        </div>
      </div>


      <div className='challenge-tsBox'>
        {/* 진행중인 챌린지 목록 */}
        <h2 className="challenge-title">진행중인 챌린지</h2>
        <div className="challenge-section">
          <Slider {...settings}>
            {doingList.length > 0 &&
              doingList.map((item) => (
                <ChallengeViewer chal_goal_dt={item.chal_goal_dt}
                  chal_title={item.chal_title}
                  chal_context={item.chal_context}>

                </ChallengeViewer>
              ))}
          </Slider>
        </div>

        {/* 완료한 챌린지 목록 */}
        <h2 className="challenge-title">완료한 챌린지</h2>
        <div className="challenge-section">
          <Slider {...settings}>
            {doneList.length > 0 &&
              doneList.map((item) => (
                <div key={item.chal_seq}>
                  <div onClick={(e) => { loadView(item.chal_seq) }} className="challenge-save-item">
                    <img src={saveListIcon} className="challenge-savelist-img" alt="챌린지 이미지" />
                    <h3 className="challenge-save-font">{item.chal_title}</h3>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MyPage;