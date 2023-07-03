import React, { useState } from 'react'
import MapContainer from './MapContainer'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function LeportsPlace() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const area =['광주','목포','여수','순천','나주','광양','담양','곡성',
        '구례','고흥','보성','화순','장흥','강진','해남',
        '영암','무안','함평','영광','장성','완도','진도','신안'];
        

  const homeNav = useNavigate();
  const lS_home=()=>{
    homeNav('/leports/leportssearch')
  }

  //입력받은 텍스트 값 가져오기
  const onChange = (e) => {
    setInputText(e.target.value)
    
  }
  //입력 받은 값 +선택한 옵션값을 place (useState)에 넣어주기 
  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(selectedArea+InputText)
   
    if(InputText==''){
      alert('키워드를 입력해 주세요!')
    }
    setInputText('')
  }

const[selectedArea,setSelectesArea]=useState();

  const [aaa, setAaa] = useState(false);

  return (
    <div className='page'>

        <div className='searchOption'>
            <select id='select_option' onChange={(e)=>{setSelectesArea(e.target.value);}}>
              <option>선택</option>
              {area.map((area,idx)=>(<option key ={idx} value={area}>{area}</option>))}
            </select>


            <form className="inputForm" onSubmit={handleSubmit}>
              <input className='searchInput' placeholder=" 레포츠명을 입력해주세요-" onChange={onChange} value={InputText} />{' '}
              <Button  type="submit" variant="primary" className='search-button' onClick={() => setAaa(true)} >검색</Button>{' '}
            </form>
            <Button className='leportsSeach-homeBtn2' onClick={()=>{lS_home()}} variant="outline-info">레포츠 찾기</Button>
          </div>
          <br/><br/><br/>
          <hr style={{width:'750px',marginLeft:'30%'}}/>

      
      <MapContainer searchPlace={Place} aaa={aaa} setAaa= {setAaa} setPlace={setPlace} />
          
    </div>
    
  )
}

export default LeportsPlace