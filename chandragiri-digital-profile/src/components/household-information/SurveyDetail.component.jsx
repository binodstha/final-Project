import React from 'react'
import DetailBlock from './detail-block.component';
function SurveryDetail({ detail }) {
  return (
    <div className='survey-block mb-4'>
      <h5 className='survey-block_title'>{ detail.title }</h5>
      <div className="survey-block_content">
        <DetailBlock detail={detail.detail} />
      </div>
    </div>
  )
}

export default SurveryDetail
