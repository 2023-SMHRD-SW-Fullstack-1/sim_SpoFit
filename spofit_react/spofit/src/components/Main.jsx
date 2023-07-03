import React, { useEffect, useState } from 'react'
import'./Main.css'
import {useMediaQuery} from 'react-responsive';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaCrown } from 'react-icons/fa';
import { FcAdvance } from 'react-icons/fc';
import Slider from "react-slick";
import ShareChallenge from './ShareChallenge';
import TypeIt from "typeit-react";
import img1 from '../image/searchImg1.png'
import img2 from '../image/searchImg2.png'
import img3 from '../image/PlaceImg1.png'
import img4 from '../image/PlaceImg2.png'
import img5 from '../image/challengeImg1.png'
import img6 from '../image/challengeImg2.png'
import ScrollOut from "scroll-out";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';





const Main = () => {

const isDesktop = useMediaQuery({query: '(min-width: 1001px)'});
const isMobile = useMediaQuery({query: '(max-width: 1000px)'});

const mainNav =useNavigate();
  const mainNavv1=()=>{
      mainNav('/leports/leportssearch')
  }
  const mainNavv2=()=>{

    mainNav('/challenge/challengeshare')
  }
    const mainNavv3=()=>{

      mainNav('/community/noticelist')
    }


    const [buttonText, setButtonText] = useState("Freeze");
    const [instance, setInstance] = useState(null);
  
    const toggleFreeze = () => {
      if (instance.is("frozen")) {
        instance.unfreeze();
        setButtonText("Freeze");
        return;
      }
  
      instance.freeze();
      setButtonText("Unfreeze");
    };

  return (
    <div>
        {/* SPOFIT메인 페이지 */}
    
        {isDesktop &&    
        <div>
          <div className='main1'>
            <h1 className='mainImg_title1'>Pick Your Challenge</h1>
          </div>
          <div className='main_hrs1'>
            <hr className='main_hr1'/>
            <b className='mainHrB1'>&nbsp;&nbsp;SpoFit introduct&nbsp;&nbsp;</b>
            <hr className='main_hr1'/>
          </div>
        </div>
        }

        {isMobile &&    
        <div>
          <div className='main2'>
            <h1 className='mainImg_title2'>Pick Your Challenge</h1>
          </div>
          <div className='main_hrs2'>
            <hr className='main_hr2'/>
            <b className='main_hr_b2'>&nbsp;&nbsp;SpoFit introduct&nbsp;&nbsp;</b>
            <hr className='main_hr2'/>
          </div>
        </div>
        }
            
        <div className='mainImgs'>
      <Container>
            <Row>
            <Col>
          <div>
            <div className='mainImg'>
              <img src={img1} className='mainImg-a'/>
              <img src={img2} className='mainImg-b'/>
            </div>
            <div className="imgText3">
              <h5>레포츠를 검색</h5>
            </div>
          </div>
            </Col>
            <Col>
          <div>
            <div className='mainImg'>
              <img src={img3} className='mainImg-a'/>
              <img src={img4} className='mainImg-b'/>
            </div>
            <div className="imgText3">
              <h5>위치를 찾기 </h5>
            </div>
          </div>
          </Col>
          <Col>
          <div>
            <div className='mainImg'>
              <img src={img5} className='mainImg-a'/>
              <img src={img6} className='mainImg-b'/>
            </div>
            <div className="imgText3">
              <h5>나만의 챌린지를 만들기</h5>
            </div>
          </div>
          </Col>
        </Row>
  </Container>
        </div>
 
          
      
        {isDesktop ? 
        <div className='mainBtns1'>
          
          <Link to ='/leports/leportssearch' id='shareLink'><strong className='mainIconText1'>&nbsp;&nbsp;레포츠 조회 바로가기&nbsp;</strong> <img src='https://cdn-icons-png.flaticon.com/512/122/122932.png' width='50px' />&nbsp;</Link>
          <Link to ='/challenge/challengeshare' id='shareLink'> <strong className='mainIconText1'>&nbsp;&nbsp;&nbsp;챌린지 바로가기&nbsp;</strong> <img src='https://cdn-icons-png.flaticon.com/512/3629/3629889.png' width='50px' />&nbsp;</Link>
          <Link to ='/community/noticelist' id='shareLink'><strong className='mainIconText1'>&nbsp;&nbsp;&nbsp;커뮤니티 바로가기 &nbsp;</strong> <img src='https://cdn-icons-png.flaticon.com/512/5231/5231460.png' width='60px' />&nbsp;</Link>
       
        </div>
        :<div className='mainBtns2'>
          <ButtonGroup aria-label="Basic example">
          <Button variant="outline-dark" onClick={()=>{mainNavv1()}}><strong className='mainIconText2'>&nbsp;&nbsp;레포츠 조회 &nbsp;&nbsp;</strong> <img src='https://cdn-icons-png.flaticon.com/512/122/122932.png' width='50px' />&nbsp;</Button>
          <Button variant="outline-dark" onClick={()=>{mainNavv2()}} ><strong className='mainIconText2'>&nbsp;&nbsp;챌린지  &nbsp;&nbsp;</strong> <img src='https://cdn-icons-png.flaticon.com/512/3629/3629889.png' width='50px' />&nbsp;</Button>
          <Button variant="outline-dark" onClick={()=>{mainNavv3()}}><strong className='mainIconText2'>&nbsp;&nbsp;커뮤니티 &nbsp;&nbsp;</strong> <img src='https://cdn-icons-png.flaticon.com/512/5231/5231460.png' width='60px' />&nbsp;</Button>
          </ButtonGroup>
      </div>
        }
       <br/>
       <br/>

 

        <div className='share'>
        <div className='shareText'>
          <h1><FaCrown />&nbsp;&nbsp;베스트 챌린지&nbsp;&nbsp;<FaCrown /></h1>
          <br/>
          <Link to ='/challenge/challengeshare' id='shareLink'><span><FcAdvance/> &nbsp;공유 챌린지 바로가기 </span></Link>
        </div>
       <div className='view-slick-container1'>

          <h2> <FaCrown /> 공유된 이달의 챌린지 </h2>
           <ShareChallenge/>
        </div>
        </div>

       
        
    </div>
  )
}

export default Main