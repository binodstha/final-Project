import React from 'react';
import { Table } from 'react-bootstrap';
import uuid from 'react-uuid';
function FinancialDetail({ detail }) {
  return (
    <div className='survey-block mb-4'>
      <h5 className='survey-block_title'>{detail.title}</h5>
      <div className="survey-block_content">
        {(detail?.income?.length > 0) && (<div className="survey-block_table mb-4">
          <h6 className='survey-block_table--title'>आय स्रोत विवरण (वार्षिक)</h6>
          <div className="theme-table-wrap">
            <Table responsive className='theme-table'>
              <thead>
                <tr>
                  <th>आयका स्रोतहरु</th>
                  <th>वार्षिक आय (हजारमा)</th>
                </tr>
              </thead>
              <tbody>
                {detail.income.map(income => {
                  return (
                    <>
                      {(income.source !== "कुल") && (<tr key={uuid()}>
                        <td>{income.source} {(income.status !== undefined) && (<span class={`update-status ${income.status}`}>*{ income.status }</span>) }</td>
                        <td>{income.amount}</td>
                      </tr>)}
                    </>
                  )
                })}
              </tbody>
              <tfoot>
                {detail.income.map(income => {
                  return (
                    <>
                      {(income.source === "कुल") && (<tr key={uuid()}>
                        <td>{income.source} </td>
                        <td>{income.amount}</td>
                      </tr>)}
                    </>
                  )
                })}
              </tfoot>
            </Table>
          </div>
        </div>)}

        {(detail.expense?.length > 0) && (<div className="survey-block_table  mb-4">
          <h6 className='survey-block_table--title'>खर्च विवरण (वार्षिक)</h6>
          <div className="theme-table-wrap">
            <Table responsive className='theme-table'>
              <thead>
                <tr>
                  <th>खर्चका स्रोतहरु</th>
                  <th>वार्षिक खर्च (हजारमा)</th>
                </tr>
              </thead>
              <tbody>
                {detail.expense.map(expense => {
                  return (<>
                    {
                      (expense.source !== "कुल") &&
                      (<tr key={uuid()}>
                        <td>{expense.source}  {(expense.status !== undefined) && (<span class={`update-status ${expense.status}`}  >*{ expense.status }</span>) }</td>
                        <td>{expense.amount}</td>
                      </tr>)
                    }
                  </>)
                })}
              </tbody>
              <tfoot>
                {detail.expense.map(expense => {
                  return (<>
                    {
                      (expense.source === "कुल") &&
                      (<tr key={uuid()}>
                        <td>{expense.source}</td>
                        <td>{expense.amount}</td>
                      </tr>)
                    }
                  </>)
                })}
              </tfoot>
            </Table>
          </div>
        </div>)}

        {(detail.saving_detail?.length > 0) && (<div className="survey-block_table mb-4">
          <h6 className='survey-block_table--title'>बचत सम्बन्धी विवरण</h6>
          <div className="theme-table-wrap">
            <Table responsive className='theme-table'>
              <thead>
                <tr>
                  <th>बचतको क्षेत्र</th>
                  <th>रकम (रु. हजारमा)</th>
                </tr>
              </thead>
              <tbody>
                {detail.saving_detail.map(saving => {
                  return (<tr key={uuid()}>
                    <td>{saving.saving_area}  {(saving.status !== undefined) && (<span class={`update-status ${saving.status}`}  >*{ saving.status }</span>) }</td>
                    <td>{saving.saving_amount}</td>
                  </tr>)
                })}
              </tbody>
            </Table>
          </div>
        </div>)}

        {(detail.investment_detail?.length > 0) && (<div className="survey-block_table mb-4">
          <h6 className='survey-block_table--title'>लगानी सम्बन्धी विवरण</h6>
          <div className="theme-table-wrap">
            <Table responsive className='theme-table'>
              <thead>
                <tr>
                  <th>लगानीको क्षेत्र</th>
                  <th>रकम (रु. हजारमा)</th>
                </tr>
              </thead>
              <tbody>
                {detail.investment_detail.map(invest => {
                  return (<tr key={uuid()}>
                    <td>{invest.investment_area}  {(invest.status !== undefined) && (<span class={`update-status ${invest.status}`}  >*{ invest.status }</span>) }</td>
                    <td>{invest.investment_amount}</td>
                  </tr>)
                })}
              </tbody>
            </Table>
          </div>
        </div>)}
        {(detail.loan_detail?.length > 0) && (<div className="survey-block_table">
          <h6 className='survey-block_table--title'>ऋण सम्बन्धी विवरण</h6>
          <div className="theme-table-wrap">
            <Table responsive className='theme-table'>
              <thead>
                <tr>
                  <th>ऋणको प्रयोजन </th>
                  <th>ऋण लिएको स्रोत</th>
                  <th>रकम (रु. हजारमा)</th>
                </tr>
              </thead>
              <tbody>
                {detail.loan_detail.map(loan => {
                  return (<tr key={uuid()}>
                    <td>{loan.loan_purpose}  {(loan.status !== undefined) && (<span class={`update-status ${loan.status}`}>*{ loan.status }</span>) }</td>
                    <td>{loan.source_of_loan}</td>
                    <td>{loan.loan_amount}</td>
                  </tr>)
                })}
              </tbody>
            </Table>
          </div>
        </div>)}
      </div>
    </div>
  )
}

export default FinancialDetail