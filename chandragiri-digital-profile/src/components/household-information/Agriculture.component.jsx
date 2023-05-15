import React from 'react';
import { Table } from 'react-bootstrap';
import DetailBlock from './detail-block.component';
import uuid from 'react-uuid';
import SubDetailBlock from './sub-detail-block.component';

function Agriculture({ detail }) {
  return (
    <div className='survey-block mb-4'>
      <h5 className='survey-block_title '>{detail.title}</h5>
      <div className="survey-block_content">
        <DetailBlock detail={detail.detail} ></DetailBlock>

      </div>
      {(detail.land_own_detail?.length > 0) && (<div className="survey-block_content">
        <h5 className='mb-3'>तपाईको स्वामित्वमा रहेका जग्गाका विवरण</h5>
        {detail.land_own_detail.map(member => {
          return (
            <SubDetailBlock key={uuid()} subDetail={member} />
          )
        })}
      </div>)}
      {(detail.yearly_agriculture_production) && (<div className="survey-block_content">
        {(Object.keys(detail.yearly_agriculture_production).length > 0) && (
          <div className="survey-block_table">
            <h6 className='survey-block_table--title'>तपाईको वार्षिक बाली उत्पादन तथा बिक्रि कति छ ?</h6>
            <div className="theme-table-wrap">
              <Table responsive className='theme-table'>
                <thead>
                  <tr>
                    <th>श्रेणी</th>
                    <th>बाली</th>
                    <th>उत्पादन (के. जी.)</th>
                    <th>खेती गरिएको क्षेत्रफल</th>
                    <th>इकाई (रोपनीमा)</th>
                    <th>बिक्री परिमाण (के. जी.)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.values(detail.yearly_agriculture_production).map((crops) => {
                      return (
                        <>
                          <tr >
                            <td rowSpan={crops.details.length + 1}>
                              <b>{crops.title}</b>
                            </td>
                          </tr>
                          {Object.values(crops.details).map((cr) => {
                            return (
                              <>
                                <tr>
                                  <td>{cr.crop_name}</td>
                                  <td>{cr.production}</td>
                                  <td>{cr.farm_area}</td>
                                  <td>{cr.unit}</td>
                                  <td>{cr.sales_quantity}</td>
                                </tr>
                              </>
                            )
                          })}
                        </>
                      )
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
      )}
    </div >
  )
}

export default Agriculture