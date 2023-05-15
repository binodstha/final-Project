import React from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import DetailBlock from './detail-block.component';
import uuid from 'react-uuid';
function FarmingDetail({ detail }) {
  return (
    <div className='survey-block mb-4'>
      <h5 className='survey-block_title'>{detail.title}</h5>
      <div className="survey-block_content">
        <div className="survey-block_table mb-4">
          {(detail.quadruped_and_livestock_farming !== undefined) && (<Row>
            <Col lg={10}>
              <div className="survey-block_content-block">
                <h5 className="mx-w-400">{detail.quadruped_and_livestock_farming?.label}</h5>
                <p>{detail.quadruped_and_livestock_farming?.value}</p>
              </div>
            </Col>
          </Row>)}
          {(detail.quadruped_and_livestock_farming?.value === "छ" || detail.quadruped_and_livestock_farming?.value === undefined) && (
            <div className="theme-table-wrap">
              <Table responsive className='theme-table'>
                <thead>
                  <tr>
                    <th>चौपाया तथा पशुपंक्षीको नाम {(detail.yearly_farming_production_status !== undefined) && (<span class={`update-status ${detail.yearly_farming_production_status}`}>*{ detail.yearly_farming_production_status }</span>) }</th>
                    <th>नम्बरहरू</th>
                    <th>मासु उत्पादन (के.जी.)</th>
                    <th>दूध उत्पादन (लिटर)</th>
                    <th>अण्डा</th>
                    <th>हड्डी र छाला (के.जी.)</th>
                    <th>ऊन (के.जी.)</th>
                    <th>अन्य</th>
                    <th>वार्षिक आय बिक्री (रु.)</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.yearly_farming_production?.map(farming => {
                    return (<tr key={uuid()}>
                      <th>{farming.quadruped_and_livestock_name}</th>
                      <th>{farming.numbers}</th>
                      <th>{farming.meat_production}</th>
                      <th>{farming.milk_production}</th>
                      <th>{farming.eggs}</th>
                      <th>{farming.bone_and_skin}</th>
                      <th>{farming.wools}</th>
                      <th>{farming.others}</th>
                      <th>{farming.yearly_income_from_sales}</th>
                    </tr>)
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </div>
        <Row>
          <Col lg={10}>
            <div className="survey-block_content-block">
              <h5 className="mx-w-400">{detail.if_fish_bee_silk_rearing_done?.label}</h5>
              <p>{detail.if_fish_bee_silk_rearing_done?.value}</p>
            </div>
          </Col>
        </Row>
        {(detail.if_fish_bee_silk_rearing_done?.value === "छ") && (
          //
          <DetailBlock detail={detail.fish_bee_silk_rearing_done} />
        )}
      </div>
    </div>
  )
}

export default FarmingDetail;