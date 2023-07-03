import React, {useEffect, useState } from "react";
import axios from 'axios'
import './Challenge.css'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import {useMediaQuery} from 'react-responsive';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTooltip,
} from "mdb-react-ui-kit";

export default function App() {
  
const isDesktop = useMediaQuery({query: '(min-width: 1001px)'});
const isMobile = useMediaQuery({query: '(max-width: 1000px)'});
const [startDate, setStartDate] = useState(new Date());



        //선택한 챌린지가 있는경우 세션으로 값을 받아올 것 'challengeSequence'
        // sessionStorage.setItem('challengeSequence', 1)
        const [challengeSequence, setChallengeSequence] = useState(sessionStorage.getItem('challengeSequence'))
        
        // sessionStorage.removeItem('challengeSequence');
        //회원이 로그인한 세션 값 받아올 것 'accessMember'
        const accessMemberSeq = sessionStorage.getItem('accessMemberSeq');
        // sessionStorage.removeItem('accessMember');
        
        
        // 챌린지 생성 페이지 
        // 기능 : 챌린지 제목, 챌린지 설명, 챌린지 과제, 목표 일자 
        // 기능2 : 작성중인 챌린지 저장하기, 작
        
        // 챌린지 과제 변수
        const [listNum, setListNum] = useState(0);
        const [doList, setDoList] = useState([]);
        
        // 챌린지 항목 기능
        
        const addButton=()=>{
          const doNum = listNum +1;
          if(challengeSequence >0){
          const keyNum = doList[doList.length-1].cus_check_seq +1;
          setListNum(doNum)
          setDoList([...doList, {cus_check_seq: keyNum, cus_num : keyNum, cus_context: ''}])}
          else{
            const doNum = listNum +1;
            setListNum(doNum)
            setDoList([...doList, {cus_check_seq: doNum, cus_num : doNum, cus_context: ''}])
          }
          }
          
      
        
        const deleteItem=(doNum)=>{
          setDoList(doList.filter((btn) => btn !== doNum));
        };
        
        // 설명 변수
        const [isContextVisible, setContextVisible] = useState(false);
        const [inputContext, setInputText] = useState(''); //실제 값이 들어가는 공간
        
        // 설명 열기 닫기 설정z
        const toggleInput = () => {
          setContextVisible(!isContextVisible);
        };
        
        // 설명 내용 입력을 위한 설정
        const handleInputChange = (e) => {
          setInputText(e.target.value);
        };
        
        //챌린지 시작하기 버튼
        //시작 버튼을 누르면 (공유 여부와 함께 전송)
        //이때, 반드시 member는 있어야 함
        const nav=useNavigate();
        const startChallenge=()=>{
          
          var result = [];
          
          
          for(let i = 0; i<doList.length; i++){
            
            result.push(
              {
                "chal_num" : doList[i].key,
                "chal_context" :document.getElementById("input"+doList[i].cus_num).value
              })
              
            }
          if(result.length < 1){
            return alert("도전항목은 최소 1개 이상이어야 합니다")
          }else if(document.getElementById('challengeNameInput').value == null){
            return alert("챌린지 제목을 입력하세요")
          }else if(document.getElementById('challengeDoc').value == null){
            return alert("챌린지 설명을 적어주세요")
          }else if(document.getElementById('goalDt').value < 1){
            return alert("목표 기간은 최소 1일 이상이어야 합니다")
          }
          saveChallenge()
          axios.post('http://localhost:8094/spofit/challenge/sharechallenge',
          {
            "m_seq" : accessMemberSeq,
            "cus_seq" : challengeSequence,
            "chal_title" : document.getElementById('challengeNameInput').value,
            "chal_doc" : inputContext,
            "challengeList" : result,
            "chal_gdt" : document.getElementById('goalDt').value,
            "share_yn" : document.getElementById('shareOption').value
          })
          .then((res)=>{
            res.data > 0 ? alert('내 챌린지로 이동하였습니다') : alert('실패')
            nav('/challenge/challengemanagement');
          }
          )
        }
        
        //타이틀, 설명, 목표 일자 usestate 설정
        const[title, setTitle] = useState('');
        const[gdt, setGdt] = useState();
      
        //받아온 챌린지 시퀀스가 있다면 챌린지  정보를 불러올 것
        useEffect(()=>{
          if(accessMemberSeq < 1){
            alert('로그인이 필요한 페이지 입니다')
            return window.location.href="/member/memberLogin"
          }
          
          if(challengeSequence>0){
            
            axios.get('http://localhost:8094/spofit/challenge/loadcuschallenge',
            {
              params:{
                'chal_seq' : challengeSequence,
              }
            })
            .then((response)=>{
              //타이틀, 설명, 목표 일자 설정 필요 
              console.log(response.data)
              setInputText(response.data.cus_doc)
              setGdt(response.data.cus_gdt)
              setTitle(response.data.cus_title)
              //리스트 업데이트
              setDoList(response.data.challengeList)
            })
          }
        },[])
        
        
        //axios를 통한 데이터베이스에 저장 (보관함에 저장하기)
        const saveChallenge=()=>{
          //  const url = 'http://localhost:8094/spofit/challenge/savechallenge';
          
          //aixos 전달을 위한 리스트 항목 정리 
         
      
          var result = [];
        
          for(let i = 0; i<doList.length; i++){
           
           result.push(
           {
           "chal_num" : doList[i].key,
           "chal_context" :document.getElementById("input"+doList[i].cus_num).value
           })
            
          }
           
          if(result.length < 1){
            return alert("도전항목은 최소 1개 이상이어야 합니다")
          }else if(document.getElementById('challengeNameInput').value == null){
            return alert("챌린지 제목을 입력하세요")
          }else if(inputContext.length <1){
            return alert("챌린지 설명을 적어주세요")
          }else if(document.getElementById('goalDt').value < 1){
            return alert("목표 기간은 최소 1일 이상이어야 합니다")
          }
          // axios 요청, 입력한 제목, 설명, 리스트 항목(번호, 내용), 목표일자 , 사용자정보(세션), 제작자 정보(??) 전송
          axios
          .post(
           'http://localhost:8094/spofit/challenge/savechallenge',
            {
              "m_seq" : accessMemberSeq,
              "cus_seq" : challengeSequence,
              "chal_title" : document.getElementById('challengeNameInput').value,
              "chal_doc" : inputContext,
              "challengeList" : result,
              "chal_gdt" : document.getElementById('goalDt').value
            },
            {
              // 자료 형식 지정
              headers: {
                'Content-Type': 'application/json',
              },
            }
            )
            .then((response) => {
              //저장된 cus_seq 반환
              if (response.data > 0) {
                // 세션에 저장된 값이 없는 경우에만 세션을 생성 
                if(challengeSequence<1){
                sessionStorage.setItem('challengeSequence', response.data)
                setChallengeSequence(sessionStorage.getItem('challengeSequence'))
                }
                alert("저장되었습니다");
              } else {
                alert("저장에 실패하였습니다");
              }
            });
      
          }
      
          //페이지 벗어나면 동작시키기
          window.onbeforeunload = function (event) {
            // 표준에 따라 기본 동작 방지
              // event.preventDefault();
              sessionStorage.removeItem('challengeSequence')
              // ajax 호출
          }
          
      
      

  return (
    <div className="createDiv">

    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard
            id="list1"
            style={{ borderRadius: ".85rem", backgroundColor: "#eff1f2" }}
            >
            <MDBCardBody className="py-4 px-4 px-md-5">
              <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <h1 className="myChallengeName"><b>My Challenge</b></h1>
              </p>
             
              
              <div className="pb-2">
                <h4>챌린지명</h4>
                <MDBCard id="list2">
                  <MDBCardBody>
                    <div className="d-flex flex-row align-items-center">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="challengeNameInput"
                        maxLength={200} defaultValue={title}
                        placeholder="챌린지명을 입력해주세요"/>
                      
                           <DatePicker
                          className="me-3" selected={startDate} onChange={(date) => {setStartDate(date)}} />
                        
                    
                    </div>
                  </MDBCardBody>
                </MDBCard>
                    <div>
                          <MDBBtn onClick={toggleInput} id='btn1'color="info">
                              {isContextVisible ? '설명 닫기' : '설명 열기'}
                          </MDBBtn>
                          {isContextVisible && (
                            <div className='textBox'>
                                <textarea
                                id='challengeDoc'
                                value={inputContext}
                                onChange={handleInputChange}
                                maxLength={500}
                                />
                            </div>
      )}
                  </div>
              </div>
              <div className='challengeList'>
          
          <br/>
          {isDesktop ?
          <Button variant="outline-primary" onClick={()=>{addButton()}} id='addButton1'>챌린지 항목 추가</Button>
          :
          <Button variant="outline-primary" onClick={()=>{addButton()}} id='addButton1'>항목 추가</Button>}

        </div>
              <hr className="my-4" />
               {/* 항목 생성 (MAP) */}
            {doList.size !=0 && 
            doList.map((doNum) =>(
              <div className="addDiv" key={doNum.cus_check_seq}>
                <input type="text" className="form-control form-control-lg1" id={'input'+doNum.cus_num} 
                placeholder="도전항목을 입력해주세요" defaultValue={doNum.cus_context}/>
                <MDBTooltip tag="a"title="Delete todo">
                    <MDBIcon fas icon="trash-alt" onClick={() => deleteItem(doNum)}  color="danger" />
                </MDBTooltip>
            </div>)) 
          
            }                 
                <br/><br/> <br/>
                  <div className="goal">
                    <h5>목표 기간&nbsp;&nbsp;&nbsp;</h5><input type='number' id='goalDt' value={gdt}></input> 
                    <h5>일</h5>
                  </div>
                  <br/><br/> <br/>
              <Button variant="secondary" className="btn1" onClick={()=>{saveChallenge()}}> 보관함에 저장하기 </Button>

    {/* 챌린지 탐색 페이지로 이동 */}
    <Button variant="secondary" className="btn1"> <Link to='/leports/leportssearch'className="lL2">레포츠 찾기</Link> </Button>

    {/* 챌린지 커뮤니티로 이동 */}
    <Button variant="secondary" className="btn1"> <Link to='/challenge/challengeshare' className="lL2">유저 챌린지 구경하기</Link> </Button>
    <select type='option' id='shareOption'>
      <br/>

      <option value='Y'>공유 허용</option>
      <option value='N'>공유하지 않음</option>
    </select>

    <Button variant="primary" className="btn1" id="marginBtn" onClick={()=>{startChallenge()}}> 챌린지 시작하기 </Button>
    <br/>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
            </div>
  );
}