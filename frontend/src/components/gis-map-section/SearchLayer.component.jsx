import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSearchList } from "../../redux/gis-data/gis-data.selectors";
import { Marker, Popup } from "react-leaflet";
import { Image } from "react-bootstrap";
import { pointerIcon } from "../../utils/util";
import StartPin from "../../assets/images/icons/start.png";
class SearchLayer extends React.Component {

  render() {
    const { searchList } = this.props;
    return (
      <>
        {searchList.map((layer) => (
         

          <Marker
          position={[layer.lat, layer.lng]}
          icon={pointerIcon(StartPin)}
        >
          <Popup className="map-popup">
            <div className="popup-detail">
              {layer.image && <Image src={layer.image}></Image>}
              <p>
                <span>Name : </span>
                {layer.name}
              </p>
              <p>
                <span>Detail : </span>
                {layer.detail}
              </p>
            </div>
          </Popup>
        </Marker>
        ))}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchList: selectSearchList,
});

export default connect(mapStateToProps)(SearchLayer);
