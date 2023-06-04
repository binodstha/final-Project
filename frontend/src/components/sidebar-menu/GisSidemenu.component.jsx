import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setDatasetCatrgories,
  updateCategoryChecked,
} from "../../redux/dataset/dataset.actions";
import { selectDatasetCategories } from "../../redux/dataset/dataset.selectors";
import { Accordion, Button, Form, Image } from "react-bootstrap";

import axios from "axios";

function style(style) {
  return {
    background: style ? (style.fill ? style.fillColor : "none") : "green",
    border: style ? `${style.color} solid` : "green",
  };
}

class GisSidemenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      categoryList: [],
    };
  }

  async componentDidMount() {
    this.handleFetchCategories();
  }

  handleFetchCategories = () => {
    const { setDatasetCatrgories } = this.props;
    const apiUrl = "http://localhost:8800/admin/categories"; // Replace with your API URL
    axios
      .get(apiUrl)
      .then((response) => {
        const categoryList = response.data.results.map((category) => {
          category.is_checked = false;
          return category;
        });
        console.log(categoryList);
        setDatasetCatrgories(categoryList);
        this.setState({ categoryList: response.data.results });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  openSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  render() {
    const { datasetCategories, updateDatasetChecked } = this.props;
    return (
      <div
        className={`sidemenu gis-menu ${
          this.state.showSidebar ? "collapse-show" : ""
        }`}
      >
        <Button className="openNav" onClick={this.openSidebar}>
          <i
            className={`fa-solid fa-caret-${
              this.state.showSidebar ? "left" : "right"
            }`}
          ></i>
        </Button>
        <div className="gis-sidenav">
          <Accordion defaultActiveKey="1" alwaysOpen>
            {console.log("datasetCategories", datasetCategories)}
            <Accordion.Item eventKey="1">
              <Accordion.Header>Public Data</Accordion.Header>
              <Accordion.Body>
                <div className="land-type sidebar-checkbox">
                  {datasetCategories.map((category) => (
                    <Form.Group
                      key={`dataset-${category.id}`}
                      className="d-flex mb-4"
                      controlId={category.id}
                    >
                      <Form.Check
                        className="checkboxes me-3"
                        checked={category.is_checked}
                        onChange={() => updateDatasetChecked(category)}
                      />
                      <Form.Label>
                        {/* {(dataset.geom_type === "ST_Point") ? (<>
                       {
                         (dataset.style.shape === "icon") ?
                           (<Image src={dataset.style.style.icon} />) :
                           (<span className='type-color water' style={style(dataset.style.style)}></span>)
                       }
                     </>)
                       : (<span className='type-color water' style={style(dataset.style.style)}></span>)} */}
                        {category.title}
                      </Form.Label>
                    </Form.Group>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  datasetCategories: selectDatasetCategories,
});

const mapDispatchToProps = (dispatch) => ({
  setDatasetCatrgories: (dataset) => dispatch(setDatasetCatrgories(dataset)),
  updateDatasetChecked: (dataset) => dispatch(updateCategoryChecked(dataset)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GisSidemenuComponent);
