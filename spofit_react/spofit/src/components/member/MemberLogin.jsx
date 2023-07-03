import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Member.css'
import Button from 'react-bootstrap/Button';


const LoginPage = () => {
      // useState를 사용하여 상태(state)를 관리
      const [showPassword, setShowPassword] = React.useState(false); // 패스워드 보이기/숨기기 상태
      const [username, setUsername] = React.useState(''); // 아이디 입력 상태
      const [password, setPassword] = React.useState(''); // 비밀번호 입력 상태

      // 아이디 입력 값 변경 이벤트 핸들러
      const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };

      // 비밀번호 입력 값 변경 이벤트 핸들러
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      // 패스워드 보이기/숨기기 토글 이벤트 핸들러
      const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

      const handleLogin = () => {
        // 로그인 기능 구현
        console.log('Username:', username);
        console.log('Password:', password);
        // 이후 서버와 통신하여 로그인 요청을 처리하거나 상태를 업데이트할 수 있음
     
     
        // 서버로 로그인 요청 보내기
        axios
      .post('http://localhost:8094/spofit/member/login', { m_id: username, m_pw: password },{ headers:{ 'Content-Type' : "application/json"}})
      .then((response) => {
        const loginResult = response.data[1];
        console.log('로그인 리저트 : '+loginResult);
        if (loginResult != null) {
          alert('환영합니다!!');
          console.log('로그인 성공!');
          sessionStorage.setItem('accessMemberSeq', response.data[0]);
          sessionStorage.setItem('accessMemberNick', response.data[1]);
          window.location.href = '/';
        } else{
          alert('로그인에 실패하였습니다.');
          console.log('로그인 실패');
        }
      })
      .catch((error) => {
        console.error('로그인 요청 실패:', error);
      });
  };

  return (
    <div>

    <div id="login-container">

      {/* 로고 */}
      <div className="logo-container">
        <h1 className='logoN'><b>SPO-FIT</b></h1>
      </div>

      {/* 로그인 제목 */}
      <h2 className="login-title">Login</h2>

      {/* 아이디 입력란 */}
      <div className="input-container">
        <input
          type="text"
          placeholder="ID"
          value={username}
          onChange={handleUsernameChange}
          className="login-input"
          />
      </div>

      {/* 비밀번호 입력란 */}
      <div className="input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="login-input"
          />
        {/* 패스워드 보이기/숨기기 버튼 */}
        <span
          className={`password-toggle ${showPassword ? 'show' : ''}`}
          onClick={toggleShowPassword}
        >
          {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
        </span>
      </div>

      {/* 로그인 버튼 */}
      <Button variant="secondary" className="login-button" onClick={handleLogin}>
        LOGIN
      </Button>


      {/* 아이디 찾기, 비밀번호 찾기, 회원가입 링크 */}
      <div className="login-links">
       
        <Link to='/member/idfind'className='lL1'> 아이디 찾기 /</Link>
        <Link to='/member/pwfind'className='lL1'>&nbsp;비밀번호 찾기 /</Link> 
        <Link to='/member/memberjoin'className='lL1'>&nbsp;회원가입</Link> 

      </div>
    </div>
    </div>
  );
};

export default LoginPage;