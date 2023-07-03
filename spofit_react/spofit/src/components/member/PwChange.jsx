import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox

}
from 'mdb-react-ui-kit';


const PwChange = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const m_seq = sessionStorage.getItem('m_seq');
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    // 비밀번호 재설정 기능 구현
    axios
      .post(
        'http://localhost:8094/spofit/member/changepassword',
        {
          m_seq : m_seq,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }
      )
      .then((response) => {
        console.log('서버에서 받은 데이터', response.data); // 서버에서 받은 데이터 출력
        // 이후 서버 응답에 따른 처리 로직 추가
        if (response.data === 'SUCCESS') {
          // 비밀번호 변경 성공 처리
          sessionStorage.removeItem('m_seq');
          window.location.href = '/member/memberlogin';
        } else {
          // 비밀번호 변경 실패 처리
          alert('비밀번호가 일치하지 않습니다.');
        }
      })
      .catch((error) => {
        console.error('비밀번호 변경 실패:', error);
      });
  };

  return (

    <div className='pwChangeDiv'>

    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            {/* 로그인 */}
          <div className="text-center mb-3">
            <p>비밀번호 재설정</p>
          </div>

          <div className="pw-change-container">
          <p className="pw-change-info">*새로운 비밀번호를 입력해주세요!</p>
          </div>
          <MDBInput wrapperClass='mb-4' label='새로운 비밀번호' id='form1' type='password' 
          value={newPassword} onChange={handleNewPasswordChange}/>
          {/* <p className="pw-change-info">*비밀번호를 다시 입력해 주세요</p> */}
          <MDBInput wrapperClass='mb-4' label='비밀번호 확인' id='form2' type='password'
           value={confirmPassword} onChange={handleConfirmPasswordChange}/>

          <MDBBtn className="mb-4 w-100" onClick={handleResetPassword}>Sign in</MDBBtn>

    </MDBContainer>
    </div> 

          
  );
};

export default PwChange;