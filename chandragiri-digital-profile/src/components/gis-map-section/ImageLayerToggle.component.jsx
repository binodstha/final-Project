import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form } from "react-bootstrap";
import { toggleShowImageLayer } from "../../redux/customer-service/customer-service.actions";
import { selectShowImageLayer } from "../../redux/customer-service/customer-service.selectors";

const ImageLayerToggle = ({ showImageLayer, toggleShowImageLayer }) => {
  return (
    <div className="layer-checkbox">
      <Form.Check
        inline
        label="Chandragiri Layer"
        name="group1"
        type="checkbox"
        checked={showImageLayer}
        onChange={toggleShowImageLayer}
        id="inline1"
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  showImageLayer: selectShowImageLayer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShowImageLayer: (dataset) => dispatch(toggleShowImageLayer(dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageLayerToggle);
