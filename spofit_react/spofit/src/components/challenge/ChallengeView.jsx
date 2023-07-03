import React, { useEffect, useState } from 'react'
import '../../Papp.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
// import 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
// import { ViewContainer } from '@fullcalendar/core/internal'



const ChallengeView = () => {

  // challengeView const
  const [chalTitle, setChalTitle] = useState('');
  const [chalDt, setChalDt] = useState();
  const [checkList, setCheckList] = useState([{check_title:'', check_seq:'', check_context:''}]);

  const [choiceDay, setChoiceDay] = useState(new Date());
  const [viewAble, setViewAble] = useState(false);

  //doing_seq세션 담기
  const chal_seq = sessionStorage.getItem("challengeSequence");
  const m_seq = sessionStorage.getItem("accessMemberSeq");

   //페이지 벗어나면 동작시키기
   
   //다이어리 const
   const [diaryDt, setDiaryDt] = useState();
   const [diaryTitle, setDiaryTitle] = useState();
   const [diaryContext, setDiaryContext] = useState();
   const [doingSeq, setDoingSeq] = useState();
   //전체 일자에 대한 diary 기록
   const [totalList, setTotalList] = useState([]);
   
  //이벤트(일정) 등록될 diary 기록
  const [eventList, setEventList] = useState([]);

  
  window.onbeforeunload = function (event) {
    // 표준에 따라 기본 동작 방지
      // event.preventDefault();
      sessionStorage.removeItem('challengeSequence')
    }
    // ajax 호출
  

const handleDateClick = (arg) => { // bind with an arrow function
  //날짜를 클릭했을때 => 화면 이동과 날짜 설정 , 해당 이벤트에 대한 일정 로드
  //1. 화면 이동 
  setViewAble(true);
  setChoiceDay(arg.dateStr)
}
  
  
  useEffect(()=>{
    if(m_seq < 1){
      alert("로그인이 필요한 페이지 입니다")
      window.location.href= '/member/memberLogin'
    }else if(chal_seq<1){
      alert("선택한 챌린지가 없습니다")
      window.location.href ='/challenge/challengeManagement'
    }
    
    axios.post('http://localhost:8094/spofit/doingchallenge/select',
    {
      chal_seq : chal_seq,
        m_seq : m_seq,
    })
      .then((response)=>{
      setDoingSeq(response.data.doing_seq)
      setChalTitle(response.data.challenge.chal_title)
      setChalDt(response.data.chal_sdt+"\r\n~\r\n"+response.data.chal_edt)
      setCheckList(response.data.challenge.challengeList)
      console.log(response.data.doing_seq)
      
    })

    
    
  },[])
  
const loadDiary=()=>{
  if(doingSeq > 0){
     
    axios.post('http://localhost:8094/spofit/diary/loaddiary',
      {
            doing_seq : doingSeq
      })
        .then((response)=>{  
          setEventList(response.data)
        })
      } 
    }
    
    useEffect (()=>{
      loadDiary()
    },[doingSeq])
    
    
    
    //다이어리에 일정 추가하기
    const addDiary=()=>{
      //choice day 에 title, context 를 입력 doing_seq로 식별
      if(diaryContext == null){
        alert('기록할 내용을 입력하세요')
        return
      }else if(diaryTitle == null){
        alert('기록할 제목을 입력하세요')
      return
    }
    
    axios.post('http://localhost:8094/spofit/diary/savediary',
    {
        doing_seq : doingSeq,
        diary_dt : choiceDay,
        diary_title : diaryTitle,
        diary_context : diaryContext
      })
      .then((res)=>{
        res.data > 0 ? alert("저장되었습니다") : alert("알 수 없는 이유로 저장에 실패하였습니다");
        loadDiary()
      })
    }

    //챌린지를 완료 상태로 변경하기
    const handleComplete=()=>{
      axios.get('http://localhost:8094/spofit/challenge/updatecomplete', {
        params:{
        doing_seq : doingSeq
      }
      })
      .then((res)=>{
        res.data > 0 ? alert("챌린지를 완료하였습니다") : alert("알 수 없는 이유로 저장에 실패하였습니다");
        window.location.href = '/challenge/challengemanagement'
      })
    }
    
    return (
      <div>
      {/* 메인 컴포넌트 */}
    <div className= {viewAble ? 'challenge-view-container1' : 'challenge-view-container'}>
      <div className='challenge-top-container'>
        <div className='challenge-view-title'>
          {/* 위 제목 작성 */}
        <h3> {chalTitle} </h3>

        </div>
        <div className='challenge-view-dt'>
          {/* 위 날짜 작성 */}
        <h5> {chalDt} </h5>

        </div>  
        </div>
      <div className='challenge-middle-container'>
        <div className='challenge-middle-side'>
          {/* 메인 사이드바 */}
        </div>
        <div className='challenge-middle-content'>
          {/* 메인 작성 된 공간 */}
          {checkList.map((item)=>(
            <div key={item.check_seq}>
            <label htmlFor={item.check_seq}> {item.check_context}</label>&nbsp;&nbsp;
            <input type='checkbox' name={item.check_seq} id='checkList' value={item.check_seq}></input>
            </div>
          ))}

        </div>

      </div>
     <div className='challenge-bottom-container'>
     <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        events={eventList.map((item)=>({title : `${item.diary_title}`, date : `${item.diary_dt}`}
        ))}
        />
     </div>
     <Button variant="primary" onClick={()=>{handleComplete()}}className='tB2'>챌린지 완료</Button>
     </div>
     

     {/* 우측 컴포넌트 */}
     <div className= {viewAble ? 'challenge-view-right-container1': 'challenge-view-right-container'} >
      <div className='challenge-right-top-container'>
        <div className='dateCloseBox'>
          <input type='date' value={choiceDay} disabled/> 
          <CloseButton onClick={()=>{setViewAble(false)}}></CloseButton>
        </div>
        <br></br>

        Title : <input className='challenge-diary-input' onChange={(e)=>{setDiaryTitle(e.target.value)}}></input>
        <br/>
        <h3> Context </h3> 
        <div className='tBbox'>
        <textarea  className='addTarea'onChange={(e)=>{setDiaryContext(e.target.value)}}></textarea>
        <Button variant="primary" onClick={addDiary} className='tB'>일정 추가하기</Button>
        </div>
      </div>

      <div className='challenge-right-middle-container'>
      <Accordion defaultActiveKey="0">
        {eventList.filter((e)=>e.diary_dt==choiceDay).map((e, idx)=>
            <Accordion.Item eventKey={e.diary_seq}>
            {/* <Accordion.Header>{e.diary_title}</Accordion.Header> */}
            <Accordion.Header>{e.diary_title} </Accordion.Header> 
            <Accordion.Body>
              {e.diary_context}
            </Accordion.Body>
          </Accordion.Item>
          )
        }
    </Accordion>
      </div>
     </div>
     </div>
  )
}

export default ChallengeView