import React, { useState } from 'react';
import axios from 'axios';

const MemberJoin = () => {
  const [formData, setFormData] = useState({
    m_id: '',
    m_nick: '',
    m_email: '',
    newPassword: '',
    confirmPassword: '',
    m_jumin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
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
  const maskedJumin = '******';

  return (
    <div className="m-join-container">
      <h2 className="m-join-title">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="m-join-input-container">
          <input
            type="text"
            name="m_id"
            placeholder="아이디를 입력해주세요."
            value={formData.m_id}
            onChange={handleChange}
            className="m-join-input"
          />
        </div>
        <div className="m-join-input-container">
          <input
            type="text"
            name="m_nick"
            placeholder="닉네임을 입력해주세요."
            value={formData.m_nick}
            onChange={handleChange}
            className="m-join-input"
          />
        </div>
        <div className="m-join-input-container">
          <input
            type="email"
            name="m_email"
            placeholder="이메일을 입력해주세요."
            value={formData.m_email}
            onChange={handleChange}
            className="m-join-input"
          />
        </div>
        <div className="m-join-input-container">
          <input
            type="password"
            name="newPassword"
            placeholder="비밀번호를 입력해주세요."
            value={formData.newPassword}
            onChange={handleChange}
            className="m-join-input"
          />
        </div>
        <div className="m-join-input-container">
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 확인해주세요."
            value={formData.confirmPassword}
            onChange={handleChange}
            className="m-join-input"
          />
        </div>
        <div className="m-join-input-container">
          <input
            type="number"
            name="m_jumin1"
            placeholder="(ex. 980101)"
            value={formData.m_jumin1}
            onChange={handleChange}
            className="m-join-input jumin-input"
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 6);
            }}
            style={{ width: '100px' }}
          />
          <span className="jumin-separator">-</span>
          <input
            type="number"
            name="m_jumin2"
            placeholder=""
            value={formData.m_jumin2}
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 1);
            }}
            className="m-join-input jumin-input small-input"
            style={{ width: '20px' }}
          />
          <span className="jumin-mask">{maskedJumin}</span>
        </div>
        <button type="submit" className="reset-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default MemberJoin;