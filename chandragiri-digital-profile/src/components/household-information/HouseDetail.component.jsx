import React from "react";
import DetailBlock from "./detail-block.component";
import SubDetailBlock from "./sub-detail-block.component";
import SubDetailFieldset from "./SubDetailFieldset.component";
import uuid from "react-uuid";
function HouseDetail({ detail }) {
  const getPageMargins = () => {
    return `@page { margin: 10px !important; }`;
  };
  return (
    <div className='survey-block mb-4'>
      <style>{getPageMargins}</style>
      <h5 className='survey-block_title'>{detail.title}</h5>
      <div className="survey-block_content">
        <DetailBlock detail={detail.detail} ></DetailBlock>
      </div>
      <div className="survey-block_content">
        {(detail?.health_service?.length > 0) && (
          <div className="survey-block_table mb-4">
            {detail.health_service.map(texture => {
              return (<SubDetailFieldset key={uuid()} subDetail={texture} />)
            })}
          </div>
        )}

        {(detail?.educational_service) && (
          <div className="survey-block_table mb-4">
            <SubDetailBlock key={uuid()} subDetail={detail?.educational_service} />
          </div>
        )}

        {(detail?.work_divison) && (
          <div className="survey-block_table mb-4">
            <SubDetailBlock key={uuid()} subDetail={detail.work_divison} />
          </div>
        )}
        {(detail?.house_rent?.length > 0) && (
          <div className="survey-block_table mb-4">
            {detail.house_rent.map(rent => {
              return (<SubDetailBlock key={uuid()} subDetail={rent} />)
            })}
          </div>
        )}
        {(detail?.house_texture?.length > 0) && (
          <div className="survey-block_table mb-4">
            {detail.house_texture.map(texture => {
              return (<SubDetailBlock key={uuid()} subDetail={texture} />)
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default HouseDetail;