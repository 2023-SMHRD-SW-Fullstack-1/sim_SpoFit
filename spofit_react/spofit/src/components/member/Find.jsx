import React from 'react';
import  { useState } from 'react';
import axios from 'axios';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Member.css'
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
}
from 'mdb-react-ui-kit';
const Find = () => {
  const findId = () => {
    //사용자가 입력한 이름과 이메일 값을 불러오기 위한 변수
    // const nameVal = document.getElementById('nameInput').value;
    const emailVal = document.getElementById('emailInput').value;
     //Spring에 요구하는 연결주소
    const url = "http://localhost:8094/spofit/member/findid";
     //axios요청, 사용자가 입력한 이름과 이메일 값을 담아서 요청 (post)
    axios.post(url,
      {
        // 사용자의 이름과 이메일을 보냄
          "m_email" : emailVal
      },
      {
        // 자료 형식 지정
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      .then((response)=>{
        const userId = response.data;
        if(userId !== 'NONE'){
          alert(`해당하는 유저의 아이디는 ${userId} 입니다!`);
        }else{
          alert('일치하는 정보가 없습니다. 다시입력해주세요.')
        }
        // response.data !=='NONE' ? console.log(response.data) : console.log('실패');
      })
  }


  //패스워드 찾기
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
  //화면구성
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  return (
    <div className='findDiv'>

    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            아이디 찾기
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            비밀번호 찾기
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

            {/* 아이디 찾기 */}
          <div className="text-center mb-3">
            <p>아이디 찾기</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='email' className='form1' type='text' 
          id='emailInput'/>
          
          <MDBBtn className="mb-4 w-100" onClick={()=>findId()}>확인</MDBBtn>
          

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          {/* 비밀번호 찾기 */}
          <div className="text-center mb-3">
            <p>비밀번호 찾기</p>
          </div>
          {/* 닉네임 */}
          <MDBInput wrapperClass='mb-4' label='Nick name' id='form1' type='text'
          value={name} onChange={handleNameChange}/>
          {/* 아이디 */}
          <MDBInput wrapperClass='mb-4' label='Id' id='form1' type='text'
          value={username} onChange={handleUsernameChange}
          className="pw-find-input"/>
          {/* 이메일 */}
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' 
          value={email} onChange={handleEmailChange}/>
          
          <MDBBtn className="mb-4 w-100"  onClick={handleVerification}>확인</MDBBtn>
    
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
    </div>
  )
}

export default Find