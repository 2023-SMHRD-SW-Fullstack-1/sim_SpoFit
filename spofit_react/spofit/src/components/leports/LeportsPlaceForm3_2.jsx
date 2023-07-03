import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {useMediaQuery} from 'react-responsive';


const LeportsPlaceForm3_2 = () => {
  const homeNav = useNavigate();
  const lS_home=()=>{
    homeNav('/leports/leportssearch')
  }
  const isDesktop = useMediaQuery({query: '(min-width: 801px)'});
  const isMobile = useMediaQuery({query: '(max-width: 800px)'});
  return (
    
    <div className='searchResult'>
      {isDesktop && <strong className='leportsNameTitle1'> 혼자 또는 둘이서 즐길 수 있는 대표적인 실내 레포츠</strong>}
      {isMobile && <strong className='leportsNameTitle2'>레포츠 종류</strong>}
    <Container>
      {isDesktop ? 
      <div>
        
        <Row  id='img-container'>
          <Col><img width='120px'src='https://cdn-icons-png.flaticon.com/512/684/684065.png'/>
          <span className='leportsName'> 헬스/휘트니스</span>
          </Col>
          <Col><img width='120px'src='https://cdn-icons-png.flaticon.com/512/2935/2935181.png'/>
          <span className='leportsName'> 수영</span>
          </Col>
          <Col><img width='120px'src='https://cdn-icons-png.flaticon.com/512/2789/2789890.png'/>
          <span className='leportsName'> 요가</span>
          </Col>
          <Col><img width='120px'src='https://cdn-icons-png.flaticon.com/512/1403/1403737.png'/>
          <span className='leportsName'> 실내 양궁 </span>
          </Col>
        </Row>
        <Row  id='img-container1'>
          <Col><img width='120px'src='https://cdn-icons-png.flaticon.com/512/2736/2736136.png'/>
          <span className='leportsName'>복싱</span>
          </Col>
          <Col><img width='120px'src='https://cdn-icons-png.flaticon.com/512/5985/5985422.png'/>
          <span className='leportsName'>스케이트</span>
          </Col>
          <Col><img width='120px'src='https://i.pinimg.com/originals/db/4b/c5/db4bc5a3b1742850fac91f64fbc371b1.png'/>
          <span className='leportsName'>클라이밍</span>
          </Col>
          <Col><img width='120px'src='https://cdn-icons-png.flaticon.com/512/1973/1973974.png'/>
          <span className='leportsName'>테니스</span>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Button className='leportsSeach-homeBtn' onClick={()=>{lS_home()}} variant="outline-dark">처음으로</Button>{' '}
          </Col>
        </Row>
    </div>
    :
  <div>
    <Row  id='img-container'>
        <Col><img width='80px'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqMpI-D3zfORzKoHgz0S63iAynu8r4xr_DVVwYBw7LCGBKZuuJLdTx1jdGbHgnxyyr0rg&usqp=CAU'/>
          <span className='leportsName'> 실내 배구</span>
        </Col>
        <Col><img width='80px'src='https://cdn-icons-png.flaticon.com/512/4363/4363824.png'/>
          <span className='leportsName'> 볼링</span>
        </Col>
        <Col><img width='80px'src='https://cdn-icons-png.flaticon.com/512/2070/2070457.png'/>
          <span className='leportsName'> 실내 농구</span>
        </Col>
          
      </Row>
      <Row  id='img-container1'>
          <Col><img width='80px'src='https://cdn-icons-png.flaticon.com/512/3784/3784383.png'/>
            <span className='leportsName'> 배드민턴 </span>
          </Col>
          <Col><img width='80px'src='https://cdn-icons-png.flaticon.com/512/491/491972.png'/>
            <span className='leportsName'>실내 골프</span>
          </Col>
          <Col><img width='80px'src='https://banner2.cleanpng.com/20180530/ick/kisspng-squash-ball-game-tennis-sport-squash-sport-5b0e859f707707.6120857715276783674607.jpg'/>
            <span className='leportsName'>스쿼시</span>
          </Col>
          
      </Row>
      <Row  id='img-container2'>
          <Col>
            <img width='80px'src='https://i.pinimg.com/originals/db/4b/c5/db4bc5a3b1742850fac91f64fbc371b1.png'/>
            <span className='leportsName'>클라이밍</span>
          </Col>
          <Col>
            <img width='80px'src='https://cdn-icons-png.flaticon.com/512/1973/1973974.png'/>
            <span className='leportsName'>테니스</span>
          </Col>
      </Row>
        
      <Row  id='img-container1'>
          <Col>
            <Button className='leportsSeach-homeBtn' onClick={()=>{lS_home()}} variant="outline-dark">처음으로</Button>{' '}
          </Col>
      </Row>
      </div>
    }

  </Container>
  </div>
  )
}

export default LeportsPlaceForm3_2