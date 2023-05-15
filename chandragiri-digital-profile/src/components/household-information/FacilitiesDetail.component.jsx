import React from "react";
import DetailBlock from './detail-block.component';
import { Table } from 'react-bootstrap';
import uuid from "react-uuid";
function FacilitiesDetail({ detail }) {
  return (
    <div className='survey-block mb-4'>
      <h5 className='survey-block_title'>{detail.title}</h5>
      <div className="survey-block_content">
        <DetailBlock detail={detail.detail} />
      </div>
      {(detail.facility_use?.length > 0) && (<div className="survey-block_table">
        <div className="survey-block_content">
          <h5 className='survey-block_table--title'>निम्न कुन कुन सुविधाहरु परिवारले उपभोग गरेको छ ?
            {(detail.facility_use_status !== undefined) && (<span class={`update-status ${detail.facility_use_status}`}>*{detail.facility_use_status}</span>)}
          </h5>
          <div className="theme-table-wrap">
            <Table responsive className='theme-table'>
              <thead>
                <tr>
                  <th>सुविधा</th>
                  <th>छ / छैन</th>
                </tr>
              </thead>
              <tbody>
                {detail.facility_use.map(facility => {
                  return (<tr key={uuid()}>
                    <td>{facility.facility_name}</td>
                    <td>{facility.available} </td>
                  </tr>)
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default FacilitiesDetail