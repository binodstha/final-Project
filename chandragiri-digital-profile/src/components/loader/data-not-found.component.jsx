import React from "react";
import NotDataIcon from '../../assets/images/icons/not-found.svg';
import { Image } from 'react-bootstrap';


  function DataNotFound() {
    return (
      <div className="data-not-found">
        <Image src={NotDataIcon} />
        <p>No data found</p>
      </div>
    )
  }

export default DataNotFound;