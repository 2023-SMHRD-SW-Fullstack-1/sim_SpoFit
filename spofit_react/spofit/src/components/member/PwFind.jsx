import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const PwFind = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerification = () => {
    // 이름, 아이디, 이메일 확인 기능 구현
    console.log('Name:', name);
    console.log('Username:', username);
    console.log('Email:', email);

    axios
      .post(
        'http://localhost:8094/spofit/member/findpassword',
        { m_nick: name, m_id: username, m_email: email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((M_SEQ) => {
        console.log('백에서받은 데이터' , M_SEQ.data); // 서버에서 받은 데이터 출력
        // 이후 데이터와 일치 여부에 따라 페이지 이동 또는 상태 업데이트 등을 처리
        if (M_SEQ.data  !== 0) {
          // 비밀번호 재설정 페이지로 이동
          // 링크를 사용하여 페이지 이동 처리
          sessionStorage.setItem('m_seq',M_SEQ.data);
          window.location.href = '/member/pwchange';
        }else{
          alert("다시 입력해주세요!!");
        }
      })
      .catch((error) => {
        console.error('확인 요청 실패:', error);
      });
  };

  return (
    <div className="pw-find-container">
      <h2 className="pw-find-title">비밀번호 찾기</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="닉네임"
          value={name}
          onChange={handleNameChange}
          className="pw-find-input"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={handleUsernameChange}
          className="pw-find-input"
        />
      </div>
      <div className="input-container">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
          className="pw-find-input"
        />
      </div>
      <button className="verification-button" onClick={handleVerification}>
        확인
      </button>
    
    </div>
  );
};

export default PwFind;