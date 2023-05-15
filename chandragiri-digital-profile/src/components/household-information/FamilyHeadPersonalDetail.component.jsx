import React from 'react';
import DetailBlock from './detail-block.component';
import SubDetailBlock from './sub-detail-block.component';
import uuid from 'react-uuid';

class FamilyHeadPersonalDetail extends React.Component {
  render() {
    const { detail } = this.props;
    return (
      <div className='survey-block mb-4'>
        <h5 className='survey-block_title'>{detail.title}</h5>
        {(detail.detail) && (<><div className="survey-block_content">
          <DetailBlock detail={detail.detail} />
        </div>
          <hr />
        </>)}
        <div className="survey-block_content">
          <h5 className='mb-3'>परिवार सदस्य विवरण</h5>
          {detail.member_detail.map(member => {
            return (<SubDetailBlock key={uuid()} subDetail={member} />)
          })}
        </div>
      </div>
    )
  }
}

export default FamilyHeadPersonalDetail