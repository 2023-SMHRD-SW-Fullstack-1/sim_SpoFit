import React from 'react'
import { Link } from 'react-router-dom'
import './Leports.css'
const LeportsPlaceForm = () => {

  
  return (
    <div>
      <div className='page1'>
        
      <div className='select1'>
        선호하는 장소를 선택해주세요
      </div>
      <div className="text-on-img">
      <div className="background-wrap1">
        <div className="content">
        <Link to='/leports/leportssearch/LeportsPlaceForm2_1' className='linkText'><span>실내</span></Link> 
        </div>
      </div>
      <div className="background-wrap2">
        <div className="content">
          <Link to='/leports/leportssearch/LeportsPlaceForm2_2' className='linkText'><span>실외</span></Link> 
        </div>
      </div>
    </div>
      </div>
    
  </div>




  )
}

export default LeportsPlaceForm