import React from 'react';
import { TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAboutApp } from '../../redux/about-app/about-app.selectors';
import { selectShowImageLayer } from "../../redux/customer-service/customer-service.selectors";

const ImageTileLayer = ({ showImageLayer, aboutApp }) => {
  return (
    <>
      {(showImageLayer) && (
        <TileLayer
          attribution={aboutApp.attr}
          url={aboutApp.basemap}
        />
      )}
    </>
  )
}
const mapStateToProps = createStructuredSelector({
  aboutApp: selectAboutApp,
  showImageLayer: selectShowImageLayer
})
export default connect(mapStateToProps)(ImageTileLayer);