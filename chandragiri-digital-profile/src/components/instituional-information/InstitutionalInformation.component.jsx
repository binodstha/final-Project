import React from 'react';
import { Button, Table, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { confirmAlert } from 'react-confirm-alert';
import { setInstitutionInfo, setInstitutionCatList } from '../../redux/customer-service/customer-service.actions';
import {
  selectInstitutionInfo,
  selectInstitutionCategory
} from '../../redux/customer-service/customer-service.selectors';
import ViewInstitutionalInfoModal from './ViewInstitutionalInfo.modal';
import AddInstitutionalInfoModal from './AddInstitutionalInfo.modal';
import EditInstitutionalInfoModal from './EditInstitutionalInfo.modal';
import Loader from '../loader/loader.component';
import DataNotFound from '../loader/data-not-found.component';
import './institutionalinfo.styles.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import agent from '../../agent';
import uuid from 'react-uuid';


class InstitutionalInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institututionCatList: [],
      editDataset: null,
      editId: null,
      addModalShow: false,
      viewModelShow: false,
      editModelShow: false,
      institututionData: null,
      isSuccess: false,
      successMsg: "",
      formAttribute: [],
    }
  }

  async componentDidMount() {
    const { setInstitutionInfo, setInstitutionCatList } = this.props;
    setInstitutionInfo(await agent.publicDigitalData.getInstitutionalInfo())
    setInstitutionCatList(await agent.publicDigitalData.getInstitutionalCatList())
  }

  handleModalShow = () => {
    this.setState({ "addModalShow": !this.state.addModalShow });
  }

  successResponse = async (val) => {
    if (val) {
      this.setState({
        'isSuccess': true,
        'successMsg': val
      });
      setTimeout(() => {
        this.setState({
          'isSuccess': false,
          'successMsg': ""
        });
      }, 5000)
    }
  }


  handleEditModalShow = async (slug, id) => {
    if (slug !== undefined && id !== undefined) {
      let formAttribute = await agent.publicDigitalData.getInstitutionalDatasetAttribute(slug)
      const institututionData = await agent.publicDigitalData.getInstitutionalInfoData(slug, id);
      formAttribute = formAttribute.map(attr => {
        attr.value = institututionData[attr.column_name] !== null ? institututionData[attr.column_name] : undefined
        return attr
      })
      this.setState({
        editDataset: slug,
        editId: id,
        formAttribute: formAttribute
      })
    } else {
      this.setState({
        formAttribute: []
      })
    }
    this.setState({
      editModelShow: !this.state.editModelShow
    });
  }

  handleViewModalShow = async (slug, id) => {
    if (slug !== undefined && id !== undefined)
      this.setState({
        institututionData: await agent.publicDigitalData.getInstitutionalInfoData(slug, id)
      });
    this.setState({
      viewModelShow: !this.state.viewModelShow
    })
  }

  handleDataDelete = async (slug, id) => {
    const { setInstitutionInfo } = this.props;
    confirmAlert({
      message: 'Are you sure you want to delete?.',
      customUI: ({ onClose }) => {
        return (
          <div>
            <div className='confirm-alert'>
              <h1 className='confirm-alert-title'>Are you sure You want to delete this file?</h1>
              <div className='text-end'>
                <Button className='btn confirm-alert-button me-2' onClick={async () => {
                  const delResponse = await agent.publicDigitalData.delInstitutionalInfoData(slug, id);
                  if (delResponse.errors === undefined) {
                    this.successResponse(delResponse.message)
                    setInstitutionInfo(await agent.publicDigitalData.getInstitutionalInfo())
                  }
                  onClose();
                }}>Yes</Button>
                <Button className='btn btn-secondary confirm-alert-button' onClick={onClose}>No</Button>
              </div>

            </div >
          </div >
        );
      }
    });
  }

  render() {
    const { institutionInfo, institutionCategory } = this.props;
    return (
      <div className="right-content">
        {this.state.isSuccess ?
          <Alert variant='success' onClose={() => this.setState({ 'isSuccess': false })} dismissible>{this.state.successMsg} </Alert> : null
        }
        <div className='sub-main_title d-flex justify-content-end align-items-center'>
          <div className='download-btn d-flex'>
            <Button onClick={() => this.handleModalShow()}><i className="fa-solid fa-plus me-2"></i> Add</Button>
          </div>
        </div>

        {(institutionInfo !== null) ? (
          <>
            {
              (Object.keys(institutionInfo).length !== 0) ? (
                <>
                  {institutionInfo.map(category => {
                    return (
                      <div className="activity" key={uuid()}>
                        <h2 className="category-name">{category.name_npl}</h2>
                        {category.datasets.map(dataset => {
                          return (
                            <div className='activity-wrap' key={uuid()}>
                              <h5 className="dataset-name">{dataset.name}</h5>
                              <div className="theme-table-wrap">
                                <div className="theme-table">
                                  <Table className='table-striped'>
                                    <thead>
                                      <tr>
                                        <th>Firm Name</th>
                                        <th>Proproiter Name</th>
                                        <th>Type</th>
                                        <th className='text-center table_w-200'>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {dataset.data_list.map(dataList => {
                                        return (
                                          <tr key={uuid()}>
                                            <td>{dataList.name}</td>
                                            <td>{dataList.proprietor_name}</td>
                                            <td>{dataList.type}</td>
                                            <td className='text-center'>
                                              <div className='activity-actions'>
                                                <Button onClick={() => this.handleEditModalShow(dataset.slug, dataList.id)} className='activity-actions_btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Button>
                                                <Button onClick={() => this.handleDataDelete(dataset.slug, dataList.id)} className='activity-actions_btn btn-danger'><i className="fa-solid fa-trash-can"></i></Button>
                                                <Button onClick={() => this.handleViewModalShow(dataset.slug, dataList.id)} className='activity-actions_btn btn-success'><i className="fa-regular fa-eye"></i></Button>
                                              </div>
                                            </td>
                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </>
              ) : (<DataNotFound />)}

          </>
        ) : (<Loader />)}



        {(institutionCategory.length > 0) && (
          <>
            <AddInstitutionalInfoModal
              modalShow={this.state.addModalShow}
              institutionCategory={institutionCategory}
              handleClose={this.handleModalShow}
              successResponse={this.successResponse}
            />
          </>
        )}
        {(this.state.formAttribute.length > 0) && (
          <>
            <EditInstitutionalInfoModal
              modalShow={this.state.editModelShow}
              formAttribute={this.state.formAttribute}
              slug={this.state.editDataset}
              id={this.state.editId}
              handleClose={this.handleEditModalShow}
              successResponse={this.successResponse}
            />
          </>
        )}
        <ViewInstitutionalInfoModal
          modalShow={this.state.viewModelShow}
          institututionData={this.state.institututionData}
          handleClose={this.handleViewModalShow}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  institutionInfo: selectInstitutionInfo,
  institutionCategory: selectInstitutionCategory
})

const mapDispatchToProps = dispatch => ({
  setInstitutionInfo: customerService => dispatch(setInstitutionInfo(customerService)),
  setInstitutionCatList: customerService => dispatch(setInstitutionCatList(customerService))
})

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionalInformation);