import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import{ useEffect } from 'react'
import Slider from 'react-slick';
import { FcLike } from "react-icons/fc";



const ShareChallenge = () => {
  const [shareChallenge,setShareChallenge] =useState([{'chal_title':'ttt'},{'chal_title':'ttt'},{'chal_title':'ttt'},{'chal_title':'ttt'},{'chal_title':'ttt'}]);
//챌린지에서 공유된 챌린지에서 추천수 높은순으로 5개 가져와 

useEffect(()=>{

  axios.get('http://localhost:8094/spofit/main/likelist')
  .then((res)=>{
    console.log(res.data);
    setShareChallenge(res.data)
  })

},[])
const settings = {
    
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows :true,
  responsive: [
    { breakpoint: 1600, // 화면의 넓이가 600px 이상일 때
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
    }},
    { breakpoint: 1200, // 화면의 넓이가 320px 이상일 때
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }}
  ]
}


  return (
        <div className='shareBox'>
          <Slider {...settings}>

        <div className='view-slick-item'>
            <Card style={{ width: '18rem' }} className='view-slick-item'>

            <Card.Body>
                <Card.Title><span className='cardTitle'>{shareChallenge[0].chal_title}</span></Card.Title>
                <Card.Text>
                 추천수 <FcLike/> &nbsp; {shareChallenge[0].chal_likes}
                </Card.Text>
                <br/>
                <Button variant="outline-success">이동하기</Button>
            </Card.Body>
            </Card>
        </div>
        <div className='view-slick-item'>
            <Card style={{ width: '18rem' }} className='view-slick-item'>

            <Card.Body>
                <Card.Title><span className='cardTitle'>{shareChallenge[1].chal_title}</span></Card.Title>
                <Card.Text>
                추천수 <FcLike/> &nbsp; {shareChallenge[0].chal_likes}

                </Card.Text>
                <br/>
                <Button variant="outline-success">이동하기</Button>
            </Card.Body>
            </Card>
        </div>
        <div className='view-slick-item'>
            <Card style={{ width: '18rem' }} className='view-slick-item'>

            <Card.Body>
                <Card.Title className='cardTitle'><span>{shareChallenge[2].chal_title}</span></Card.Title>
                <Card.Text>
                추천수 <FcLike/> &nbsp; {shareChallenge[0].chal_likes}

                </Card.Text>
                <br/>
                <Button variant="outline-success">이동하기</Button>
            </Card.Body>
            </Card>
        </div>
        <div className='view-slick-item'>
            <Card style={{ width: '18rem' }} className='view-slick-item'>

            <Card.Body>
                <Card.Title className='cardTitle'><span>{shareChallenge[3].chal_title}</span></Card.Title>
                <Card.Text>
                추천수 <FcLike/> &nbsp; {shareChallenge[0].chal_likes}
                </Card.Text>
                <br/>
                <Button variant="outline-success">이동하기</Button>
            </Card.Body>
            </Card>
        </div>
        <div className='view-slick-item'>
            <Card style={{ width: '18rem' }} className='view-slick-item'>

            <Card.Body>
                <Card.Title className='cardTitle'><span>{shareChallenge[4].chal_title}</span></Card.Title>
                <Card.Text>
                추천수 <FcLike/> &nbsp;  {shareChallenge[0].chal_likes}
                </Card.Text>
                <br/>
                <Button variant="outline-success">이동하기</Button>
            </Card.Body>
            </Card>
        </div>
        <div className='view-slick-item'>
            <Card style={{ width: '18rem' }} className='view-slick-item'>

            <Card.Body>
                <Card.Title className='cardTitle'><span>{shareChallenge[0].chal_title}</span></Card.Title>
                <Card.Text>
                추천수 <FcLike/> &nbsp; {shareChallenge[0].chal_likes}
                </Card.Text>
                <br/>
                <Button variant="outline-success">이동하기</Button>
            </Card.Body>
            </Card>
        </div>

          </Slider>    
        </div>
  )
}

export default ShareChallenge