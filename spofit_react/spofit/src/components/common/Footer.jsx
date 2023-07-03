import React from 'react'
import { IoBasketballSharp } from 'react-icons/io5';

const Footer = () => {
  return (
    <div id='footer'>
        {/* footer 영역 SPO-FIT 넣어주기 */}
        <div className='footerLogoName'>
           <h4>SP<i><IoBasketballSharp/></i>-FIT</h4>
        </div>
        <div className='pName'>
          박정현/김소희/서유광/이선아
        </div>

    </div>
  )
}

export default Footer