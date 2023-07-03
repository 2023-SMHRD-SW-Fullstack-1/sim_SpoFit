import React from 'react'
import '../../Papp.css'

const ChallengeViewer = ({chal_goal_dt, chal_title, chal_context}) => {
  return (
    <div className='viewer-total-container'>
        <div className='viewer-inner-container'>


            <div className='viewer-writer-box' id='headerMenuText1'>
                C H A L L E N G E
            </div>

            <div className='viewer-doc-box'> 
                <div className='viewer-title-box'>
                    <h3 className='viewer-text-title'>{chal_title}</h3>
                </div>

                <div className='viewer-context-box'>
                    <h6 className ='viewer-text-context'>
                        {chal_context}
                    </h6>
                </div>
            </div>

            <div className='viewer-challenge-info-box'>
                <div className='viewer-dt-box'>
                    <h1> {chal_goal_dt} </h1>

                    D A Y S
                </div>
            </div>


        </div>
    </div>
  )
}

export default ChallengeViewer