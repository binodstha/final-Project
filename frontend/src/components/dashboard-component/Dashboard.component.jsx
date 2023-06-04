import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MapContainer, ScaleControl, ZoomControl, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { setCustomerServiceDashboard } from '../../redux/customer-service/customer-service.actions';
import { selectCustomerServiceDashboard, selectCenter } from '../../redux/customer-service/customer-service.selectors';
import { selectAboutApp } from '../../redux/about-app/about-app.selectors';
import ImageLayerToggle from '../gis-map-section/ImageLayerToggle.component';
import ImageTileLayer from '../gis-map-section/ImageTileLayer.comonent';
import Loader from '../loader/loader.component';
import domtoimage from "dom-to-image-more";
import './dashboard.styles.scss';
import L from 'leaflet';
import agent from '../../agent';

function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.flyTo(coords, zoom);
  return null;
}
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class DashboardComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showMap: true
    }
  }

  async componentDidMount() {

   
  }

  mapToggleChecked = () => {
    this.setState({
      showMap: !this.state.showMap
    })
  }

  render() {
    const { center, aboutApp } = this.props;
    return (
      <>
         <div className='right-content'>
          <div className="dashboard-status">
            <div className="dashboard-status-block">
              <h5>5</h5>
              <p>Users</p>
            </div>
            <div className="dashboard-status-block">
              <h5>5</h5>
              <p>Categories</p>
            </div>
            <div className="dashboard-status-block">
              <h5>30</h5>
              <p>Users</p>
            </div>
          </div>
          <div className="map__section" id="map">
            <MapContainer className="leaflet_map"
              center={aboutApp.center}
              zoom={aboutApp.zoom}
              scrollWheelZoom={false}
              zoomControl={false}
              maxZoom={aboutApp.maxZoom}
              minZoom={aboutApp.minZoom}>
              <ZoomControl position="bottomright" />
              <ChangeMapView coords={center} zoom={aboutApp.zoom} />
              <ScaleControl position="bottomleft" />
              <TileLayer
                attribution={aboutApp.attr}
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
              />

            </MapContainer>

          </div >
        </div>
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  aboutApp: selectAboutApp,
  center: selectCenter,
})



export default connect(mapStateToProps)(DashboardComponent);