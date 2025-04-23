import React, { useEffect, useState } from 'react';
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    Form,
    InputGroup,
    Modal,
    Nav,
    Offcanvas,
    ProgressBar,
    Row,
    Tab,
    Table,
} from "react-bootstrap";
import { assetSapicreateJobGroupPostAPI, EvalationAssestDetails, EvalationAssestList, UpdateJobForm } from '../../services/provider';
import { removeToken } from '../../helpers/helper';
import { useNavigate } from 'react-router-dom';
import fileIcon from "../../images/icons/file_icon.svg";
import quizIcon from "../../images/icons/quiz_icon.svg";
import faRingicon from "../../images/icons/Ring.svg";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
import RingSucess from "../../images/icons/ring_sucess.svg";
import DragDrop from "../../images/icons/dragdrop-bullet.svg";
import usericon from "../../images/icons/user-01-gray.svg";

const CreateGroupModal = ({ show, handleClose, assetJob, setAssetJob, localAssetJob, setLocalAssetJob, id, groupState, setGroupState, groupParameterId }) => {
    const [tabActive, setTabActive] = useState("evaluation");
    console.log("get==========uid=======>", groupParameterId)
    // const [groupState, setGroupState] = useState([
    //     {
    //         heading: 'Job Match', title: 'Select to Apply', isChecked: false, isSelected: true,
    //         listData: [
    //             {
    //                 name: 'Groups',
    //                 data: [{ value: 'Excellent', isSelected: false }, { value: 'Good', isSelected: false }, { value: 'Average', isSelected: false }, { value: 'Below Average', isSelected: false }]
    //             },
    //             {
    //                 name: 'Job Match Percentage',
    //                 data: [
    //                     { value: '0% - 40% ', isSelected: false },
    //                     { value: '50% - 60% ', isSelected: false },
    //                     { value: '60% - 70% ', isSelected: false },
    //                     { value: '70% - 80% ', isSelected: false },
    //                     { value: '80% - 90% ', isSelected: false },
    //                     { value: '90% - 100% ', isSelected: false }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         heading: 'Education', isChecked: false, isSelected: false,
    //         listData: [
    //             {
    //                 name: 'Require Education',
    //                 data: [{ value: 'Master', isSelected: false }, { value: 'Bachelors', isSelected: false }, { value: 'PG', isSelected: false }, { value: 'Diploma', isSelected: false }]
    //             },
    //             {
    //                 name: 'Areas of Education',
    //                 data: [
    //                     { value: 'Mathematics', isSelected: false },
    //                     { value: 'Science', isSelected: false },
    //                     { value: 'Computer', isSelected: false },
    //                     { value: 'Engineering', isSelected: false },
    //                     { value: 'Electronic', isSelected: false },
    //                 ]
    //             }
    //         ]
    //     },

    //     {
    //         heading: 'Availability', title: 'Select to Apply', isChecked: false, isSelected: false,
    //         listData: [
    //             {
    //                 name: 'Working Status',
    //                 data: [{ value: 'Currently Working', isSelected: false }, { value: 'Currently not Working ', isSelected: false }]
    //             },
    //             {
    //                 name: 'Available by',
    //                 data: [],
    //                 date:true
    //             },
    //             {
    //                 name: 'Notice Period',
    //                 data: [
    //                     { value: 'Less than 30 Days', isSelected: false },
    //                     { value: '30 - 60 Days', isSelected: false },
    //                     { value: '60 - 90 Days   ', isSelected: false },
    //                     { value: 'More than 90', isSelected: false },
    //                 ]
    //             },
    //             {
    //                 name: "Notice Buy out",
    //                 data: [
    //                     { value: 'Available', isSelected: false },
    //                     { value: 'Not Available', isSelected: false },                        
    //                 ]
    //             },
    //             {
    //                 name: "Willing to Travel for Job",
    //                 data: [
    //                     { value: 'Regularly', isSelected: false },
    //                     { value: 'Sometimes', isSelected: false },
    //                     { value: 'Rarely', isSelected: false },
    //                     { value: 'Not Willing to Travel', isSelected: false },                        
    //                 ]
    //             }
    //         ]
    //     },
    //     { 
    //         heading: 'Skills', title: 'Select to Apply', isChecked: false, isSelected: false,
    //         listData: [
    //             {
    //                 name: 'Groups',
    //                 data: [{ value: 'Excellent', isSelected: false }, { value: 'Good', isSelected: false }, { value: 'Average', isSelected: false }, { value: 'Below Average', isSelected: false }]
    //             },
    //             {
    //                 name: 'Job Match Percentage',
    //                 data: [
    //                     { value: '0% - 40% ', isSelected: false },
    //                     { value: '50% - 60% ', isSelected: false },
    //                     { value: '60% - 70% ', isSelected: false },
    //                     { value: '70% - 80% ', isSelected: false },
    //                     { value: '80% - 90% ', isSelected: false },
    //                     { value: '90% - 100% ', isSelected: false }
    //                 ]
    //             }
    //         ]
    //      },
    //     { heading: 'Language', title: 'Select to Apply', isChecked: false, isSelected: false },
    //     { heading: 'Custom Questions', title: 'Select to Apply', isChecked: false, isSelected: false },
    //     { heading: 'Personality', title: 'Select to Apply', isChecked: false, isSelected: false },
    //     { heading: 'Experience', title: 'Select to Apply', isChecked: false, isSelected: false },
    //     { heading: 'Roles', title: 'Select to Apply', isChecked: false, isSelected: false },
    //     { heading: 'Salary & Travel ', title: 'Select to Apply', isChecked: false, isSelected: false },
    // ])
    const [selectedGroup, setSelectedGroup] = useState({});
    const [payloadList, setPayloadList] = useState({})
    const handleSelect = (key) => {
        setTabActive(key);
    };
    const handleBoxClick = (index, obj) => {
        setSelectedGroup(obj)
        setGroupState((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    // Allow toggling only if:
                    // 1. The item is not already selected, and the selectedCount is less than 4.
                    // 2. The item is already selected (to allow deselecting).
                    if (!item.isSelected) {
                        return { ...item, isSelected: !item.isSelected };
                    } else if (item.isSelected) {
                        return { ...item, isSelected: !item.isSelected };
                    }
                }
                // else {
                //     if (item.isSelected) {
                //         return { ...item, isSelected: !item.isSelected }
                //     }
                // }
                return item;
            })
        );
    };
    const handleCheck = (index, obj) => {
        // e.stopPropagation();
        // setSelectedGroup(obj)
        // setGroupState((prev) =>
        //     prev.map((item, i) => {
        //         if (i === index) {
        //             // Allow toggling only if:
        //             // 1. The item is not already selected, and the selectedCount is less than 4.
        //             // 2. The item is already selected (to allow deselecting).
        //             if (!item.isChecked) {
        //                 return { ...item, isChecked: !item.isChecked };
        //             } else if (item.isChecked) {
        //                 return { ...item, isChecked: !item.isChecked };
        //             }
        //         }
        //         return item;
        //     })
        // );
    }
    const handleGroupItem = (selectedItem, listIndex, dataindex, selectedValue) => {
        // setGroupState(prev =>
        //     prev.map(item => {
        //         if (selectedItem.heading === item.heading) {
        //             return {
        //                 ...item,
        //                 listData: item.listData.map((listItem, listIdx) => {
        //                     if (listIdx === listIndex) {
        //                         return {
        //                             ...listItem,
        //                             data: listItem.data.map((dataItem, dataIdx) => {
        //                                 if (dataIdx === dataindex) {
        //                                     return {
        //                                         ...dataItem,
        //                                         isSelected: !dataItem.isSelected
        //                                     };
        //                                 }
        //                                 return dataItem;
        //                             })
        //                         };
        //                     }
        //                     return listItem;
        //                 })
        //             };
        //         }
        //         return item;
        //     })
        // );
        setGroupState(prev =>
            prev.map(item => {
                if (selectedItem.heading === item.heading) {
                    // Check current selected state
                    const isCurrentlySelected = item.listData[listIndex].data[dataindex].isSelected;
                    const isNowSelected = !isCurrentlySelected;
                    // Update listData
                    const updatedListData = item.listData.map((listItem, listIdx) => {
                        if (listIdx === listIndex) {
                            return {
                                ...listItem,
                                data: listItem.data.map((dataItem, dataIdx) => {
                                    if (dataIdx === dataindex) {
                                        return {
                                            ...dataItem,
                                            isSelected: isNowSelected
                                        };
                                    }
                                    return dataItem;
                                })
                            };
                        }
                        return listItem;
                    });

                    // Update selectedList in the same item
                    let updatedSelectedList = item.selectedList || [];

                    if (isNowSelected) {
                        // Push only if not already included
                        if (!updatedSelectedList.includes(selectedValue)) {
                            updatedSelectedList = [...updatedSelectedList, selectedValue];
                        } else {
                            updatedSelectedList = updatedSelectedList.filter(val => val !== selectedValue);
                        }
                    } else {
                        // Remove it if deselected
                        updatedSelectedList = updatedSelectedList.filter(val => val !== selectedValue);
                    }

                    return {
                        ...item,
                        isSelected: selectedValue ? false : true,
                        isChecked: selectedValue ? true : false,
                        // listData: updatedListData,
                        selectedList: updatedSelectedList
                    };
                }
                return item;
            })
        );
    }
    useEffect(() => {
        const findObj = groupState.find((val) => val?.heading == selectedGroup?.heading)
        setSelectedGroup(findObj)
    }, [groupState])
    useEffect(() => {
        if (selectedGroup?.heading && selectedGroup?.selectedList?.length) {
            const formatted = selectedGroup?.selectedList?.reduce((acc, item) => {
                const key = item.groupname.toLowerCase().replace(/ /g, '_');
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(item.value.trim());
                return acc;
            }, {});
            setPayloadList({
                ...payloadList,
                [selectedGroup?.heading]: formatted
            })
        }
    }, [selectedGroup])
    const handleCreateGroup = async () => {
        try {
            const payload = {
                job_group_parameter: groupParameterId,
                group_name: 'test',
                group_filter: payloadList
            }
            debugger
            // const response = await assetSapicreateJobGroupPostAPI(payload)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(groupState)
    console.log(selectedGroup)
    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            backdrop={true}
            placement="end"
            className="creategroup_drawer lg-drawer shadow-md border-0"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Create New Group
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="add_evaluwarp">
                <Tab.Container id="left-tabs-example1" activeKey={tabActive} onSelect={handleSelect}>
                    <Row>
                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="evaluation">
                                    <label className="form-label">Group Title</label>
                                    <Row>
                                        <Col md={12} className='d-flex'>
                                            <Form.Control
                                                placeholder="Group Title"
                                                aria-label="Search"
                                                aria-describedby="basic-addon1"
                                            />
                                            <Button variant="primary" className='btn-sm ms-3 min-w-120' onClick={handleCreateGroup}>
                                                Create Group
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Card className="mt-4">
                                        <Card.Header className="d-flex align-items-center justify-content-between">
                                            <h6 className="m-0">Screening Parameters</h6>
                                            <div className='right_count'>
                                                <img src={usericon} />
                                                <p className="base-text my-0 me-3 ms-1">150/250</p>
                                                <p className="base-text text-gray-300 my-0">Clear Filters</p>
                                            </div>
                                        </Card.Header>
                                        <Card.Body className="p-3">
                                            <div className="behav_assmnt">
                                                {groupState.map((item, index) => (
                                                    <Col key={index} md={3}>
                                                        <div
                                                            className={`assmntbox ${item?.isSelected ? "active" : ""}`}
                                                            onClick={() => handleBoxClick(index, item)}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <div className="assmntbox-head">
                                                                <h6>{item.heading}</h6>
                                                                <Form.Check checked={item.isChecked} onChange={() => handleCheck(index, item)} />
                                                            </div>
                                                            <div className="assmntbox-body">
                                                                {item?.selectedList?.map((val) => (
                                                                    <p>{val.value}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </div>
                                            <div className="educational-card">
                                                <div className="custom-card">
                                                    <div className='ctm-cardheader'>
                                                        <h6>{selectedGroup?.heading}</h6>
                                                        <p>{selectedGroup?.heading ? "Candidates with any of the following attributes will be prioritized and filtered for selection." : "Select filter to start."}</p>
                                                        {selectedGroup?.heading && <Button variant="link" className='reset-btn'>Reset</Button>}
                                                    </div>
                                                    {selectedGroup?.listData?.map((item, listIndex) => (
                                                        <div className="starttag_box">
                                                            <div className="stagbox_head">
                                                                <h6>{item.name}</h6>
                                                            </div>
                                                            <div className="stag_list mt-2">
                                                                {selectedGroup?.heading === "Roles" && (
                                                                    <Form.Control
                                                                        name="role"
                                                                        type="text"
                                                                        placeholder="Search Role"
                                                                        style={{ width: "350px" }}
                                                                        //   value={profileformData?.AvailableBy}
                                                                        //   onChange={handleProfileDetailsChange}
                                                                        //   isInvalid={!!errors.AvailableBy}
                                                                        className="form-control-sm mb-3"
                                                                    />
                                                                )}
                                                                {item.data.map((val, dataindex) => (
                                                                    <span
                                                                        // className={`stag_item ${SelectSkillsData.includes(skill) ? "active" : ""
                                                                        //     }`}
                                                                        className={`stag_item ${selectedGroup.selectedList.includes(val) && 'active'}`}
                                                                        onClick={() => handleGroupItem(selectedGroup, listIndex, dataindex, val)}
                                                                    >
                                                                        <span
                                                                            // className={`imprt_icon ${mustHaveSkills.includes(skill) ? "text-primery" : ""} `}
                                                                            className="imprt_icon text-primery"
                                                                        //  onClick={() => handleMustHaveSkill(skill)}
                                                                        >
                                                                            <i class="fas fa-circle"></i>
                                                                            {/* <i class={`${mustHaveSkills.includes(skill) ? "fa" : "far"}  fa-star`} aria-hidden="true"></i> */}
                                                                        </span>
                                                                        {val.value}
                                                                    </span>
                                                                ))}
                                                                {item?.date && (
                                                                    <Form.Control
                                                                        name="AvailableBy"
                                                                        type="date"
                                                                        placeholder="DD/MM/YYYY"
                                                                        style={{ width: "350px" }}
                                                                        //   value={profileformData?.AvailableBy}
                                                                        //   onChange={handleProfileDetailsChange}
                                                                        //   isInvalid={!!errors.AvailableBy}
                                                                        className="form-control-sm"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className='d-flex align-items-center mt-3'>
                                                        {selectedGroup?.heading === "Salary And Travels" && (
                                                            <>
                                                                <Form.Check
                                                                // name="AvailableBy"
                                                                // type="checkbox"
                                                                // placeholder="DD/MM/YYYY"
                                                                // style={{ width: "350px" }}
                                                                //   value={profileformData?.AvailableBy}
                                                                //   onChange={handleProfileDetailsChange}
                                                                //   isInvalid={!!errors.AvailableBy}
                                                                // className="form-control-sm"
                                                                />
                                                                <label className="ms-2 text-sm">Require Relocation Assistance</label>
                                                            </>
                                                        )}

                                                    </div>
                                                    {/* <p className="error"></p> */}
                                                    {/* <p>-----------------------or-------------------</p>
                                                    <div key={0} className="row mb-3">
                                                        <strong className="col-md-3 strong-label">
                                                            groupName
                                                        </strong>
                                                        <div className="col-md-9">
                                                            <span
                                                                // key={idx}
                                                                // className={`skill-tag mb-2 mr-2 ${selectedSkills.includes(skill.uid) ? "selected" : ""
                                                                className={`skill-tag mb-2 mr-2"
                                                                        }`}
                                                            // onClick={() => handleSkillSelect(skill, index, groupName?.skill_group_name)}
                                                            >
                                                                skill_name
                                                            </span>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default CreateGroupModal