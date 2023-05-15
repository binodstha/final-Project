import React from "react";
import { Badge, Button, Table, Alert, Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerServiceComplainList } from "../../redux/customer-service/customer-service.selectors";
import { setCustomerComplain } from "../../redux/customer-service/customer-service.actions";
import AddComplainModal from "./AddComplain.modal";
import Loader from "../loader/loader.component";
import DataNotFound from "../loader/data-not-found.component";
import ViewComplainModal from "./ViewComplain.modal";
import agent from "../../agent";
import "./complainbox.styles.scss";

class ComplainBoxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelShow: false,
      viewModelShow: false,
      modalComplain: null,
      isSuccess: false,
    };
  }
  async componentDidMount() {
    const { customerComplain } = this.props;
    customerComplain(await agent.publicDigitalData.getComplainBox());
  }

  successResponse = async (val) => {
    if (val) {
      const { customerComplain } = this.props;
      customerComplain(await agent.publicDigitalData.getComplainBox());
      this.setState({ isSuccess: true });
      setTimeout(() => {
        this.setState({ isSuccess: false });
      }, 5000);
    }
  };

  handleModalShow = () => {
    this.setState({ modelShow: !this.state.modelShow });
  };
  handleViewModalShow = (complain) => {
    this.setState({ viewModelShow: !this.state.viewModelShow });
    this.setState({ modalComplain: complain });
  };

  gotoPage = async (page) => {
    const { complainList, customerComplain } = this.props;
    if (
      page > 0 &&
      page !== complainList.page &&
      page <= complainList.total_page
    ) {
      customerComplain(await agent.publicDigitalData.getComplainBox(page));
    }
  };

  render() {
    const { complainList } = this.props;
    return (
      <div className="right-content complain-block ">
        <div className="sub-main">
          {this.state.isSuccess ? (
            <Alert
              variant="success"
              onClose={() => this.setState({ isSuccess: false })}
              dismissible
            >
              Your Complaint has been successfully submitted
            </Alert>
          ) : null}
          <div className="sub-main_title d-flex justify-content-between align-items-center">
            <h2>MY COMPLAINTS</h2>
            <div className="download-btn d-flex">
              <Button onClick={() => this.handleModalShow()}>
                <i className="fa-solid fa-plus me-2"></i> New complain
              </Button>
            </div>
          </div>

          {complainList !== null ? (
            <>
              <div className="sub-main_body">
                <div className="mb-4">
                  {complainList?.complain.length > 0 ? (
                    <>
                      <div className="theme-table-wrap">
                        <div className="theme-table">
                          <Table responsive className="table-striped">
                            <thead>
                              <tr>
                                <th className="table_w-50">S.N</th>
                                <th className="table_w-300">Title</th>
                                <th>Details</th>
                                <th className="text-center">Date</th>
                                <th className="text-center table_w-200">
                                  Status
                                </th>
                                <th className="text-center table_w-200">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="ht-100">
                              {complainList.complain.map((complain, index) => {
                                return (
                                  <tr key={`complain-${index}`}>
                                    <td className="text-center">
                                      {(complainList.page - 1) *
                                        complainList.perpage +
                                        index +
                                        1}
                                    </td>
                                    <td>{complain.title}</td>
                                    <td className="details">
                                      {complain.details}
                                    </td>
                                    <td className="text-center">
                                      {complain.date}
                                    </td>
                                    <td className="text-center">
                                      <Badge bg={`${complain.status}`}>
                                        {complain.status}
                                      </Badge>
                                    </td>
                                    <td className="text-center">
                                      <Button
                                        onClick={() =>
                                          this.handleViewModalShow(complain)
                                        }
                                        className="activity-actions_btn btn-success btn btn-primary me-0"
                                      >
                                        <i className="fa-regular fa-eye"></i>
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                      <div className="pagination-wrap">
                        <p>
                          Showing {complainList.complain.length} out of
                          {complainList.total_count} entries
                        </p>
                        <Pagination>
                          <Pagination.Prev
                            active={complainList.is_first}
                            onClick={() => this.gotoPage(complainList.page - 1)}
                          >
                            Previous
                          </Pagination.Prev>
                          {Array.from(
                            Array(complainList.total_page),
                            (e, i) => {
                              return (
                                <Pagination.Item
                                  key={i}
                                  active={i + 1 === complainList.page}
                                  onClick={() => this.gotoPage(i + 1)}
                                >
                                  {i + 1}
                                </Pagination.Item>
                              );
                            }
                          )}
                          <Pagination.Next
                            active={complainList.is_last}
                            onClick={() => this.gotoPage(complainList.page + 1)}
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
              <AddComplainModal
                modalShow={this.state.modelShow}
                handleClose={this.handleModalShow}
                successResponse={this.successResponse}
                allowAdd={complainList.allow_add_complain}
              />
              <ViewComplainModal
                complain={this.state.modalComplain}
                viewModelShow={this.state.viewModelShow}
                handleClose={this.handleViewModalShow}
              />
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  complainList: selectCustomerServiceComplainList,
});

const mapDispatchToProps = (dispatch) => ({
  customerComplain: (customerService) =>
    dispatch(setCustomerComplain(customerService)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplainBoxComponent);
