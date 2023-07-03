import React from 'react'
import './common.css'
import { IoBasketballSharp } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';


const Header1 = () => {
    

    const userSeq = sessionStorage.getItem('accessMemberSeq');  // 세션 받아오기 사용자 SEQ
    const userNick = sessionStorage.getItem('accessMemberNick'); // 세션 받아오기 NICK
    console.log('세션 유저 seq : ',userSeq)
    console.log('세션 닉네임 :  ', userNick)

    const [isActive, setIsActive] = useState(false);
  
    const handleClick = () => {
        setIsActive(prevState => !prevState);
      }; 

  return (
    <div id='header'>
        <nav className={`headerNav ${isActive ? 'active1' : ''}`}>





            <div className="headerNav_logo">
                <Link to='/' className='headerLogoName'>SP<i><IoBasketballSharp/></i>-FIT</Link>
            </div>
            <ul className={`headerNav_menu ${isActive ? 'active1' : ''}`}>
                <li>
                <Nav className="me-auto">
                    <NavDropdown title="레포츠" id='headerMenuText1'>
                    <NavDropdown.Item><strong>레포츠</strong></NavDropdown.Item>
                    <NavDropdown.Item href="/leports/leportssearch"className='headerMenuTextBox'>- 레포츠 조회</NavDropdown.Item>
                    <NavDropdown.Item href="/leports/leportsplace"className='headerMenuTextBox'>- 시설 찾기</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </li>
                <li>
                <Nav className="me-auto">
                    <NavDropdown title="챌린지 / 커뮤니티" id='headerMenuText2'>
                    <NavDropdown.Item><strong>챌린지</strong></NavDropdown.Item>
                    <NavDropdown.Item href="/challenge/challengecreate"className='headerMenuTextBox'>- 챌린지 생성하기</NavDropdown.Item>
                    <NavDropdown.Item href="/challenge/challengemanagement"className='headerMenuTextBox'>- 챌린지 관리하기</NavDropdown.Item>
                    <NavDropdown.Item href="/challenge/challengeshare"className='headerMenuTextBox'>- 챌린지 공유</NavDropdown.Item>
                    <hr/>
                    <NavDropdown.Item href="/community/noticelist"className='headerMenuTextBox'>- 공지사항</NavDropdown.Item>
                    <NavDropdown.Item href="/community/boardlist"className='headerMenuTextBox'>- 자유게시판</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </li>
                
                <li className='menuMypage_LJ'><Link to='/member/mypage' className='headerMenuText'>마이페이지</Link></li>
            </ul>
            <ul className={`headerNav_loginJoin ${isActive ? 'active1' : ''}`}>
                    {userSeq ? (
                        <>
                            <li id='headerMenuText1'>{userNick}님 환영합니다!</li>
                            <li className='menu_LJ'>
                                <a href='#' className='headerMenuText' onClick={() => { sessionStorage.clear();
                                        window.location.reload();
                                    }}
                                > 로그아웃
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='menu_LJ'>
                                <a href='/member/memberlogin' className='headerMenuText'>
                                    로그인
                                </a>
                            </li>
                            <li className='menu_LJ'>
                                <a href='/member/memberjoin' className='headerMenuText'>
                                    회원가입
                                </a>
                            </li>
                        </>
                    )}
                </ul>
                <a
                    href="#"
                    className="headerNavToggle"
                    onClick={() => {
                        handleClick();
                    }}
                >
                    <GiHamburgerMenu />
                </a>
            </nav>
        </div>
  )
}

export default Header1