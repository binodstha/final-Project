import React, { forwardRef } from "react";
import { Badge, Button, Table, Alert, Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerServiceServices } from "../../redux/customer-service/customer-service.selectors";
import { setCustomerServices } from "../../redux/customer-service/customer-service.actions";
import { selectProfile } from "../../redux/profile/profile.secector";
import AddServiceModal from "./AddService.modal";
import Loader from "../loader/loader.component";
import DataNotFound from "../loader/data-not-found.component";
import "./services.styles.scss";
import agent from "../../agent";
import ViewServiceModal from "./ViewService.modal";

class ServicesComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modelShow: false,
      viewModelShow: false,
      service: null,
      isSuccess: false,
      showDetail: "detail",
    };
  }
  async componentDidMount() {
    const { customerServices } = this.props;
    customerServices(await agent.publicDigitalData.getService());
  }

  successResponse = async (val) => {
    const { customerServices } = this.props;
    if (val) {
      customerServices(await agent.publicDigitalData.getService());
      this.setState({ isSuccess: true });
    }
    setTimeout(() => {
      this.setState({ isSuccess: false });
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

  gotoPage = async (page) => {
    const { serviceList, customerServices } = this.props;
    if (
      page > 0 &&
      page !== serviceList.page &&
      page <= serviceList.total_page
    ) {
      customerServices(await agent.publicDigitalData.getService(page));
    }
  };

  render() {
    const { serviceList, profile } = this.props;
    return (
      <div className="right-content complain-block ">
        <style type="text/css" media="print">
          {"\
   @page { size: landscape; }\
"}
        </style>
        <div className="sub-main">
          {this.state.isSuccess ? (
            <Alert
              variant="success"
              onClose={() => this.setState({ isSuccess: false })}
              dismissible
            >
              तपाईंको सेवा अनुरोध सफलतापूर्वक पेश गरिएको छ।
            </Alert>
          ) : null}
          <div className="sub-main_title d-flex justify-content-between align-items-center">
            <h2>सेवा प्रकार</h2>
            <div className="download-btn d-flex">
              <Button onClick={() => this.handleModalShow()}>
                <i className="fa-solid fa-plus me-2"></i>नयाँ सेवा
              </Button>
            </div>
          </div>
          {serviceList !== null ? (
            <>
              <div className="sub-main_body">
                <div className="mb-4">
                  {serviceList?.service_type.length > 0 ? (
                    <>
                      <div className="theme-table-wrap">
                        <div className="theme-table">
                          <Table responsive className="table-striped">
                            <thead>
                              <tr>
                                <th className="text-center table_w-25">S.N</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Details</th>
                                <th className="text-center table_w-75">Date</th>
                                <th className="text-center table_w-50">
                                  Status
                                </th>
                                <th className="text-center table_w-50">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {serviceList.service_type.map(
                                (service, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="text-center">
                                        {(serviceList.page - 1) *
                                          serviceList.perpage +
                                          index +
                                          1}
                                      </td>
                                      <td>{service.title}</td>
                                      <td>{service.type}</td>
                                      <td className="details">
                                        {service.details}
                                      </td>
                                      <td className="text-center">
                                        {service.service_added_date}
                                      </td>
                                      <td className="text-center">
                                        <Badge bg={`${service.status}`}>
                                          {service.status}
                                        </Badge>
                                      </td>
                                      <td className="text-center d-flex">
                                        <Button
                                          onClick={() =>
                                            this.handleViewModalShow(
                                              service,
                                              "detail"
                                            )
                                          }
                                          className="activity-actions_btn btn-primary btn me-1"
                                        >
                                          <i className="fa-regular fa-eye"></i>
                                        </Button>
                                        {service.response !== null && (
                                          <Button
                                            onClick={() =>
                                              this.handleViewModalShow(
                                                service,
                                                "comment"
                                              )
                                            }
                                            className="activity-actions_btn btn-success btn"
                                          >
                                            <i className="fa-regular fa-comment-dots"></i>
                                          </Button>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                      <div className="pagination-wrap">
                        <p>
                          Showing {serviceList.service_type.length} out of&nbsp;
                          {serviceList.total_count} entries
                        </p>
                        <Pagination>
                          <Pagination.Prev
                            active={serviceList.is_first}
                            onClick={() => this.gotoPage(serviceList.page - 1)}
                          >
                            Previous
                          </Pagination.Prev>
                          {Array.from(Array(serviceList.total_page), (e, i) => {
                            return (
                              <Pagination.Item
                                key={i}
                                active={i + 1 === serviceList.page}
                                onClick={() => this.gotoPage(i + 1)}
                              >
                                {i + 1}
                              </Pagination.Item>
                            );
                          })}
                          <Pagination.Next
                            active={serviceList.is_last}
                            onClick={() => this.gotoPage(serviceList.page + 1)}
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
              <AddServiceModal
                modalShow={this.state.modelShow}
                handleClose={this.handleModalShow}
                successResponse={this.successResponse}
                departments={serviceList.departments}
                wards={serviceList.wards}
                profile={profile}
              />
              {this.state.service !== null && (
                <ViewServiceModal
                  service={this.state.service}
                  showDetail={this.state.showDetail}
                  viewModelShow={this.state.viewModelShow}
                  handleClose={this.handleViewModalShow}
                />
              )}
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
  serviceList: selectCustomerServiceServices,
  profile: selectProfile,
});

const mapDispatchToProps = (dispatch) => ({
  customerServices: (customerService) =>
    dispatch(setCustomerServices(customerService)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesComponent);

export const FunctionalServicesComponent = forwardRef((props, ref) => {
  return <ServicesComponent ref={ref} text={props.text} />;
});
