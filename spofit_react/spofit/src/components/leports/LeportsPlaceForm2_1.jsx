import React from 'react'
import './Leports.css'
import { Link } from 'react-router-dom'

const LeportsPlace = () => {

  return (
    <div>
      <div className='page1'>

      <div className='select1'>

        <p>인원을 선택해주세요</p>
      </div>
      <div className="text-on-img">
      <div className="background-wrap3">
        <div className="content">
        <Link to='/leports/leportssearch/LeportsPlaceForm3_1' className='linkText'><span>여러명이서</span></Link> 
        </div>
      </div>
      <div className="background-wrap4">
        <div className="content">
          <Link to='/leports/leportssearch/LeportsPlaceForm3_2' className='linkText'><span>둘 이하</span></Link> 
        </div>
      </div>
    </div>
      </div>
    
  </div>

  )
}

export default LeportsPlace