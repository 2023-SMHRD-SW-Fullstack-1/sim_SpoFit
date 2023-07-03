import React from 'react'
import axios from 'axios'
import Footer from '../common/Footer'

const IdFind = () => {

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


  return (
    <div>
        {/* 아이디 찾기 
        이름, 이메일 입력받기 , 확인 버튼 클릭 시 DB에서 데이터 확인하여
        사용자 아이디 출력해주기
        비밀번호 찾기, 회원가입 버튼
        */}

        <table>
          <tbody>
        <tr> 
          <td><input type='text' placeholder='이메일을 입력하세요'
           id='emailInput'></input></td>
        </tr>
        </tbody>
        </table>
        {/* 입력한 자료 제출하는 메서드 호출 */}
        <button onClick={()=>findId()}>확인</button>
        <br></br>
        {/* 비밀번호 찾기 화면으로 이동 */}
        <a href=""> 비밀번호 찾기 </a>
        <br></br>
        {/* 회원가입 화면으로 이동 */}
        <a href=""> 회원가입 </a>
        <Footer></Footer>
    </div>
    
  )
 
}

export default IdFind