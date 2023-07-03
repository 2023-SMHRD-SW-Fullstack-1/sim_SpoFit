import React, {useEffect, useState} from 'react'
import Footer from '../common/Footer'
import axios from 'axios'
import './Challenge.css'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'

const ChallengeCreate = () => {
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
    setDoList([...doList, {cus_check_seq: keyNum, cus_num : keyNum, cus_context: '도전항목 입력'}])}
    else{
      const doNum = listNum +1;
      setListNum(doNum)
      setDoList([...doList, {cus_check_seq: doNum, cus_num : doNum, cus_context: '도전항목 입력'}])
    }
    }
    

  
  const deleteItem=(doNum)=>{
    setDoList(doList.filter((btn) => btn !== doNum));
  };
  
  // 설명 변수
  const [isContextVisible, setContextVisible] = useState(false);
  const [inputContext, setInputText] = useState(''); //실제 값이 들어가는 공간
  
  // 설명 열기 닫기 설정
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
    <div className='challengeCreateBox'>
      <div className='challengeBox'>
        <div className='challengeName'>
          {/* 제목 입력 */}    {/* 설명 입력 */}
          챌린지 명 : <input maxLength={200} id ="challengeNameInput" defaultValue={title}></input> 
        </div>
        <div>

      {/* 설명 열고 닫는 버튼 */}
      <button onClick={toggleInput} id='btn'>
        {isContextVisible ? '설명 닫기' : '설명 열기'}
      </button>

      {/* 설명 설정 (열면 보임)*/}
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
      {/* 설명 닫기 */}
       </div> 


        {/* 도전 항목 관리 */}
        <div className='challengeList'>
          {/* 항목 생성 (MAP) */}
        {doList.size !=0 && 
            doList.map((doNum) =>(
            <div key={doNum.cus_check_seq}>
              <input id={'input'+doNum.cus_num} type='text' defaultValue={doNum.cus_context}/> 
              <button onClick={() => deleteItem(doNum)}>삭제</button> 
            </div>)) 
            // : 
            // doList.map((doNum) =>(
            //   <div key={doNum}>
            //     <input id={'input'+doNum.chal_num} type='text' defaultValue={doNum.chal_context}/> 
            //     <button onClick={() => deleteItem(doNum)}>삭제</button> 
            //   </div>))
            }
          <br/>
        <button onClick={()=>{addButton()}} id='addButton'>챌린지 항목 추가하기</button>
        </div>
        
        {/* 분리 */}
        <br></br>
        <div className='goal'>
        {/* 목표기간 설정 */}
        목표기간 <input type='number' id='goalDt' value={gdt}></input> 일

        </div>
        {/* 분리 */}
        <br></br>

        
       
    </div>
    <div className='btn'>
    {/*  */}
    <button onClick={()=>{saveChallenge()}}> <Link to='/leports/leportssearch'>보관함에 저장하기</Link> </button>

    {/* 챌린지 탐색 페이지로 이동 */}
    <button> <Link to='/challenge/challengesearch'>운동별 챌린지 찾기</Link> </button>

    {/* 챌린지 커뮤니티로 이동 */}
    <button> <Link to='/challenge/challengeshare'>유저 챌린지 구경하기</Link> </button>
    </div>

    {/* 진행중인 챌린지에 반영하기 ( 공유 여부 추가 ) */}
    <br/>
    <select type='option' id='shareOption'>
      <option value='Y'>공유 허용</option>
      <option value='N'>공유하지 않음</option>
    </select>
    <button onClick={()=>{startChallenge()}}> 챌린지 시작하기 </button>
    
   </div>
  )
}

export default ChallengeCreate