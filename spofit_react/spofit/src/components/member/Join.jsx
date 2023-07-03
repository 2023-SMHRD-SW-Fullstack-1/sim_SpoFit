import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';
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

function App() {
    const isMobile = useMediaQuery({query: '(max-width: 1000px)'});
     // useState를 사용하여 상태(state)를 관리
     const [username, setUsername] = useState(''); // 아이디 입력 상태
     const [password, setPassword] = useState(''); // 비밀번호 입력 상태

     // 아이디 입력 값 변경 이벤트 핸들러
     const handleUsernameChange = (e) => {
       setUsername(e.target.value);
     };

     // 비밀번호 입력 값 변경 이벤트 핸들러
     const handlePasswordChange = (e) => {
       setPassword(e.target.value);
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
         alert(username+'님 환영합니다!!');
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
 const [formData, setFormData] = useState({
    m_id: '',
    m_nick: '',
    m_email: '',
    newPassword: '',
    confirmPassword: '',
    m_jumin: '',
  });
  const [joinUsername, setJoinUsername] = useState("");
  const handleJoinChange = (e) => {
    setJoinUsername(e.target.value);
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(formData)
  
    if (name === 'm_jumin1') {
      const formattedValue = value.slice(0, 6);
      setFormData((prevFormData) => ({
        ...prevFormData,
        m_jumin1: formattedValue,
        m_jumin: formattedValue + prevFormData.m_jumin.slice(6),
      }));
    } else if (name === 'm_jumin2') {
      const formattedValue = value.slice(0, 1);
      setFormData((prevFormData) => ({
        ...prevFormData,
        m_jumin2: formattedValue,
        m_jumin: prevFormData.m_jumin.slice(0, 6) + formattedValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post('http://localhost:8094/spofit/member/join', {
      ...formData,
      m_pw: formData.newPassword,
      m_pwConfirm: formData.confirmPassword,
    })
    .then((response) => {
      const result = response.data;
      if (result === 'SUCCESS') {
        alert('가입 성공 !')
        window.location.href = '/member/memberlogin';
      } else if (result === 'DUPLICATE_ID') {
        alert('아이디가 이미 사용 중입니다.');
      } else if (result === 'DUPLICATE_NICKNAME') {
        alert('닉네임이 이미 사용 중입니다.');
      } else if (result === 'PASSWORD_MISMATCH') {
        alert('비밀번호가 일치하지 않습니다.');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    })
    .catch((error) => {
      console.error('회원가입 실패:', error);
    });
};


 //화면구성
  const [justifyActive, setJustifyActive] = useState('tab2');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <div className='LoginJoinDiv'>

    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

            {/* 로그인 */}
          <div className="text-center mb-3">
            <p>login</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='ID' id='form1' type='text' 
          value={username} onChange={handleUsernameChange}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
          value={password} onChange={handlePasswordChange}/>


          <MDBBtn className="mb-4 w-100" onClick={handleLogin}>Sign in</MDBBtn>
          <div className="text-center">
                <Link to='/member/idfind'className='lL1'> 아이디 찾기 &nbsp;</Link>
                <Link to='/member/pwfind'className='lL1'>&nbsp;비밀번호 찾기 &nbsp;</Link> 
         </div>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          {/* 회원가입 */}
          <div className="text-center mb-3">
            <p>join</p>
          </div>
          <form onSubmit={handleSubmit}>

          <MDBInput wrapperClass='mb-4' label='ID' id='form1' type='text' name='m_id'
          value={formData.m_id} onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' label='NickName' id='form1' type='text' name='m_nick'
          value={formData.m_nick} onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' name='m_email'
          value={formData.m_email} onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' name='newPassword'
          value={formData.newPassword} onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' label='Repeat Password' id='form1' type='password' name='confirmPassword'
          value={formData.confirmPassword} onChange={handleChange}/>
        <MDBRow>
                <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='(ex. 980101)' id='form11' type='text'
                    value={formData.m_jumin1} onChange={handleChange} onInput={(e) => {e.target.value = e.target.value.slice(0, 6);}}/>
                </MDBCol>

                <MDBCol col='6'>
                    <span> - </span>
                    <input type="number" name="m_jumin2" className='joinNum1' placeholder="" value={formData.m_jumin2}
                    onChange={handleChange} onInput={(e) => {e.target.value = e.target.value.slice(0, 1); }}
                    />
                    {isMobile ? 
                    <span className="jumin-mask">&nbsp;* * * * * *</span>:
                    <span className="jumin-mask">&nbsp;&nbsp;&nbsp;* &nbsp;&nbsp;* &nbsp;&nbsp;* &nbsp;&nbsp;* &nbsp;&nbsp;* &nbsp;&nbsp;*</span>
                    }
                </MDBCol>
        </MDBRow>
          
          <MDBBtn className="mb-4 w-100" type="submit">Sign up</MDBBtn>
          </form>
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
    </div>
  );
}

export default App;