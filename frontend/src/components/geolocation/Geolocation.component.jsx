import React from "react";
import {  Button, Table, Alert, Pagination } from "react-bootstrap";
import AddGeolocationModal from "./AddGeolocation.modal";
import DataNotFound from "../loader/data-not-found.component";
import "./geolocation.styles.scss";



import axios from "axios";

class GeolocationComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modelShow: false,
      viewModelShow: false,
      categoryList: [],
      geodataList: [],
      pagination: {
        totalCategories: 0,
        currentPage: 1,
        next: null,
        previous: null,
      },
      successMsg: null,
      isSuccess: false,
    };
  }

  componentDidMount() {
    this.handleFetchGeodata(this.state.pagination.currentPage);
    this.handleFetchCategories();
  }

  successResponse = async (val) => {
    this.handleFetchGeodata(this.state.pagination.currentPage);
    this.setState({
      isSuccess: true,
      successMsg: "Categories has been successfully added",
    });

    setTimeout(() => {
      this.setState({ isSuccess: false, successMsg: null });
    }, 5000);
  };

  handleModalShow = () => {
    this.setState({ modelShow: !this.state.modelShow });
  };

  handleViewModalShow = (service, type) => {
    this.setState({ viewModelShow: !this.state.viewModelShow });
    if (service !== undefined) {
      this.setState({ service: service });
      this.setState({ showDetail: type });
    }
  };

  handleFetchGeodata = (page = this.state.pagination.currentPage) => {
    const apiUrl = "http://localhost:8800/admin/geodata"; // Replace with your API URL
    axios
      .get(apiUrl, {
        params: {
          page: page,
          limit: 10,
        },
      })
      .then((response) => {
        this.setState({ geodataList: response.data.results });
        this.setState({ pagination: response.data.pagination });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleFetchCategories = (page = this.state.pagination.currentPage) => {
    const apiUrl = "http://localhost:8800/admin/categories"; // Replace with your API URL
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ categoryList: response.data.results });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleGeodataDelete = (id) => {
    if (
      window.confirm("Are you sure want to delete the geolocation") === true
    ) {
      axios
        .delete(`http://localhost:8800/admin/geodata/${id}`)
        .then((response) => {
          this.handleFetchGeodata(this.state.pagination.currentPage);
          this.setState({
            isSuccess: true,
            successMsg: "Geolocation has been successfully deleted",
          });

          setTimeout(() => {
            this.setState({ isSuccess: false, successMsg: null });
          }, 5000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  render() {
    return (
      <div className="right-content complain-block ">
        <div className="sub-main">
          {this.state.isSuccess && (
            <Alert
              variant="success"
              onClose={() => this.setState({ isSuccess: false })}
              dismissible
            >
              {this.state.successMsg}
            </Alert>
          )}
          <div className="sub-main_title d-flex justify-content-between align-items-center">
            <h2>GeoLocation</h2>
            <div className="download-btn d-flex">
              <Button onClick={() => this.handleModalShow()}>
                <i className="fa-solid fa-plus me-2"></i> New Geolocation
              </Button>
            </div>
          </div>

          <div className="sub-main_body">
            <div className="mb-4">
              {this.state.geodataList.length > 0 ? (
                <>
                  <div className="theme-table-wrap">
                    <div className="theme-table">
                      <Table responsive className="table-striped">
                        <thead>
                          <tr>
                            <th className="text-center table_w-25">ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Detail</th>
                            <th className="text-center table_w-50">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.geodataList.map((geodata) => (
                            <tr key={`geodata-list-${geodata.id}`}>
                              <td>{geodata.id}</td>
                              <td>{geodata.name}</td>
                              <td>{geodata.category}</td>
                              <td className="details">{geodata.detail}</td>

                              <td className="text-center d-flex">
                                <Button className="activity-actions_btn btn-primary btn me-1">
                                  <i className="fa-regular fa-eye"></i>
                                </Button>
                                <Button
                                  className="activity-actions_btn btn-danger btn btn-primary me-0"
                                  onClick={() =>
                                    this.handleGeodataDelete(geodata.id)
                                  }
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <div className="pagination-wrap">
                    <p>
                      Showing <b>{this.state.geodataList.length}</b> out of{" "}
                      <b>{this.state.pagination.totalCategories}</b> entries
                    </p>
                    <Pagination>
                      <Pagination.Prev
                        active={this.state.pagination.previous}
                        onClick={() =>
                          this.handleFetchGeodata(
                            this.state.pagination.previous.page
                          )
                        }
                      >
                        Previous
                      </Pagination.Prev>
                      <Pagination.Item active={true}>
                        {this.state.pagination.currentPage}
                      </Pagination.Item>
                      <Pagination.Next
                        active={this.state.pagination.next}
                        onClick={() =>
                          this.handleFetchGeodata(
                            this.state.pagination.next.page
                          )
                        }
                      >
                        Next
                      </Pagination.Next>
                    </Pagination>
                  </div>
                </>
              ) : (
                <DataNotFound />
              )}
            </div>
          </div>
          <AddGeolocationModal
            modalShow={this.state.modelShow}
            handleClose={this.handleModalShow}
            successResponse={this.successResponse}
            categoryList={this.state.categoryList}
          />
          {/* {this.state.service !== null && (
                <ViewServiceModal
                  service={this.state.service}
                  showDetail={this.state.showDetail}
                  viewModelShow={this.state.viewModelShow}
                  handleClose={this.handleViewModalShow}
                />
              )} */}
        </div>
      </div>
    );
  }
}

export default GeolocationComponent;
