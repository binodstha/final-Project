import React from "react";
import { Button, Table, Alert, Pagination } from "react-bootstrap";
import AddCategoriesModal from "./AddCategories.modal";
import DataNotFound from "../loader/data-not-found.component";
import axios from "axios";

import "./categories.styles.scss";

class CategoriesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelShow: false,
      viewModelShow: false,
      modalComplain: null,
      categoryList: [],
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
    this.handleFetchCategories(this.state.pagination.currentPage);
  }

  successResponse = async (val) => {
    this.handleFetchCategories(this.state.pagination.currentPage);
    this.setState({
      isSuccess: true,
      successMsg: "Categories has been successfully added",
    });

    setTimeout(() => {
      this.setState({ isSuccess: false,successMsg: null  });
    }, 5000);
  };

  handleModalShow = () => {
    this.setState({ modelShow: !this.state.modelShow });
  };
  handleViewModalShow = (complain) => {
    this.setState({ viewModelShow: !this.state.viewModelShow });
    this.setState({ modalComplain: complain });
  };

  handleFetchCategories = (page = this.state.pagination.currentPage) => {
    const apiUrl = "http://localhost:8800/admin/categories"; // Replace with your API URL
    axios
      .get(apiUrl, {
        params: {
          page: page,
          limit: 10,
        },
      })
      .then((response) => {
        this.setState({ categoryList: response.data.results });
        this.setState({ pagination: response.data.pagination });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleCategoryDelete = (id) => {
    if (window.confirm("Are you sure want to delete the category") === true) {
      axios
        .delete(`http://localhost:8800/admin/categories/${id}`)
        .then((response) => {
          this.handleFetchCategories(this.state.pagination.currentPage);
          this.setState({
            isSuccess: true,
            successMsg: "Categories has been successfully deleted",
          });
      
          setTimeout(() => {
            this.setState({ isSuccess: false,successMsg: null  });
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
          {this.state.isSuccess ? (
            <Alert
              variant="success"
              onClose={() => this.setState({ isSuccess: false })}
              dismissible
            >
              {this.state.successMsg}
            </Alert>
          ) : null}
          <div className="sub-main_title d-flex justify-content-between align-items-center">
            <h2>CATEGORIES</h2>
            <div className="download-btn d-flex">
              <Button onClick={() => this.handleModalShow()}>
                <i className="fa-solid fa-plus me-2"></i> New Categories
              </Button>
            </div>
          </div>

          <div className="sub-main_body">
            <div className="mb-4">
              {this.state.categoryList.length > 0 ? (
                <>
                  <div className="theme-table-wrap">
                    <div className="theme-table">
                      <Table responsive className="table-striped">
                        <thead>
                          <tr>
                            <th className="table_w-50">ID</th>
                            <th className="table_w-300">Categories</th>
                            <th>Description</th>
                            <th className="table_w-25">Action</th>
                          </tr>
                        </thead>
                        <tbody className="ht-100">
                          {this.state.categoryList.map((category) => (
                            <tr key={`categories-${category.id}`}>
                              <td>{category.id}</td>
                              <td>{category.title}</td>
                              <td>{category.desc}</td>
                              <td className="text-center">
                                <Button
                                  className="activity-actions_btn btn-danger btn btn-primary me-0"
                                  onClick={() =>
                                    this.handleCategoryDelete(category.id)
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
                      Showing <b>{this.state.categoryList.length}</b> out of{" "}
                      <b>{this.state.pagination.totalCategories}</b> entries
                    </p>
                    <Pagination>
                      <Pagination.Prev
                        active={this.state.pagination.previous}
                        onClick={() =>
                          this.handleFetchCategories(
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
                          this.handleFetchCategories(
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
          <AddCategoriesModal
            modalShow={this.state.modelShow}
            handleClose={this.handleModalShow}
            successResponse={this.successResponse}
          />
        </div>
      </div>
    );
  }
}

export default CategoriesComponent;
