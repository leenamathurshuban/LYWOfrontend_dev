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
import { BehaviourResponse } from '../../utils/behaviour';

const CreateGroupModal = ({ show, handleClose, assetJob, setAssetJob, jobDetails, localAssetJob, setLocalAssetJob, id, groupState, setGroupState, groupParameterId, getJobGroupParameterList }) => {
    const [tabActive, setTabActive] = useState("evaluation");
    const [groupTitle, setGroupTitle] = useState("");
    const [selectedGroup, setSelectedGroup] = useState({});
    const [payloadList, setPayloadList] = useState({
        job_match: { job_groups: [], job_match_percentage: [] },

        education: { required_education: [], area_of_education: [] },

        availability: { working_status: "", available_by: "", notice_period: [], notice_buy_out: "", willing_to_travel_for_job: "" },

        skills: [], //pass skill group object with their skills in this array

        language: { read_and_write: [], speak: [] },

        custom_questions: [], //pass questions object with their options selected in this array

        personality: { personality_groups: [], all_personalites: [] },

        experience: { get_experience: [], industries: [] },

        roles: [],
        asset_data: [],

        salary_and_travel: { expected_salary: [], current_location: "", relocation: "", require_relocation_assistance: "" }
    })
    const handleSelect = (key) => {
        setTabActive(key);
    };
    const handleBoxClick = (index, obj) => {
        setSelectedGroup(obj)
        // setGroupState((prev) =>
        //     prev.map((item, i) => {
        //         if (i === index) {                    
        //             if (!item.isSelected) {
        //                 return { ...item, isSelected: !item.isSelected };
        //             } else if (item.isSelected) {
        //                 return { ...item, isSelected: !item.isSelected };
        //             }
        //         }
        //         // else {
        //         //     if (item.isSelected) {
        //         //         return { ...item, isSelected: !item.isSelected }
        //         //     }
        //         // }
        //         return item;
        //     })
        // );
        setGroupState((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    // Toggle only the selected item
                    return { ...item, isSelected: !item.isSelected };
                } else {
                    // All others should be unselected
                    return { ...item, isSelected: false };
                }
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
        if (selectedItem?.heading === 'Job Match' || selectedItem?.heading === 'Personality' || selectedItem?.heading === 'Technical Round For EHS Manager' || selectedItem?.heading === 'Pre-Interview Round For Creative Director') {
            setGroupState(prev =>
                prev.map(item => {
                    if (selectedItem.heading === item.heading) {
                        const isCurrentlySelected = item.listData[listIndex].data[dataindex].isSelected;
                        const isNowSelected = !isCurrentlySelected;

                        const selectedGroupName = item.listData[listIndex].name;

                        const updatedListData = item.listData.map((listItem, listIdx) => {
                            if (listItem.name === selectedGroupName) {
                                // Update only the clicked group
                                return {
                                    ...listItem,
                                    data: listItem.data.map((dataItem, dataIdx) => {
                                        if (listIdx === listIndex && dataIdx === dataindex) {
                                            return { ...dataItem, isSelected: isNowSelected };
                                        }
                                        return dataItem;
                                    })
                                };
                            } else {
                                // Deselect all from the other group
                                return {
                                    ...listItem,
                                    data: listItem.data.map(dataItem => ({
                                        ...dataItem,
                                        isSelected: false
                                    }))
                                };
                            }
                        });

                        // Collect only selected values from the current group
                        const updatedSelectedList = updatedListData
                            .flatMap(group => group.data)
                            .filter(option => option.isSelected)
                            .map(option => option);

                        return {
                            ...item,
                            listData: updatedListData,
                            selectedList: updatedSelectedList,
                            isChecked: updatedSelectedList.length > 0,
                            isSelected: updatedSelectedList.length > 0
                        };
                    }
                    return item;
                })
            );

        } else {
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

    }
    const handleAvailableByDate = (selectedItem, e) => {
        const { name, value } = e.target
        const newValue = { value: value, groupname: "Available by", isSelected: false }
        setGroupState(prev =>
            prev.map(item => {
                if (selectedItem.heading === item.heading) {
                    let updatedSelectedList = item.selectedList || [];

                    if (!updatedSelectedList.includes(newValue)) {
                        updatedSelectedList = [...updatedSelectedList, newValue];
                    } else {
                        updatedSelectedList = updatedSelectedList.filter(val => val !== newValue);
                    }
                    return {
                        ...item,
                        isSelected: newValue ? false : true,
                        isChecked: newValue ? true : false,
                        selectedList: updatedSelectedList
                    };
                }
                return item;
            })
        );
    }
    const handleRequireRelacation = (selectedItem, e) => {
        const { name, value, checked } = e.target
        const newValue = { value: checked ? "Yes" : "No", groupname: "Require Relocation Assistance", isSelected: false }
        setGroupState(prev =>
            prev.map(item => {
                if (selectedItem.heading === item.heading) {
                    let updatedSelectedList = item.selectedList || [];

                    if (!updatedSelectedList.includes(newValue)) {
                        updatedSelectedList = [...updatedSelectedList, newValue];
                    } else {
                        updatedSelectedList = updatedSelectedList.filter(val => val !== newValue);
                    }
                    return {
                        ...item,
                        isSelected: newValue ? false : true,
                        isChecked: newValue ? true : false,
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
                if (selectedGroup?.heading == 'Skills') {
                    acc[key].push(item.val);
                } else if (selectedGroup?.heading == 'Custom Questions') {
                    const obj = item?.item;
                    obj.selected_answer = [item?.value];
                    acc[key].push(obj);
                } else if (key == 'all_personalites') {
                    acc[key].push(item?.key);
                } else {
                    acc[key].push(item.value.trim());
                }
                return acc;
            }, {});
            // setPayloadList({
            //     ...payloadList,
            //     [selectedGroup?.heading]: formatted
            // })
            // let flattened=null;
            // if(selectedGroup?.heading == 'Custom Questions' || selectedGroup?.heading == 'Skills'){
            // flattened = Object.values(formatted).flat();
            // }
            // setPayloadList(prev => ({
            //     ...prev,
            //     [selectedGroup?.heading.toLowerCase().replace(/ /g, '_')]: {
            //         ...prev[selectedGroup?.heading.toLowerCase().replace(/ /g, '_')],
            //         ...formatted
            //     }
            // }));
            const headingKey = selectedGroup.heading.toLowerCase().replace(/ /g, '_');

            const isFlat = ['Custom Questions', 'Skills', 'Roles'].includes(selectedGroup.heading);
            const flattened = isFlat ? Object.values(formatted).flat() : null;
            if (headingKey == 'job_match') {
                if (formatted.job_match_percentage) {
                    formatted.job_groups = [];
                } else if (formatted.job_groups) {
                    formatted.job_match_percentage = [];
                }
                setPayloadList(prev => ({
                    ...prev,
                    [headingKey]: {
                        ...formatted
                    }
                }));
            } else if (headingKey == 'personality') {
                if (formatted.all_personalites) {
                    formatted.personality_groups = [];
                } else if (formatted.personality_groups) {
                    formatted.all_personalites = [];
                }
                setPayloadList(prev => ({
                    ...prev,
                    [headingKey]: {
                        ...formatted
                    }
                }));
            } else if (headingKey == 'technical_round_for_ehs_manager' || headingKey == 'pre-interview_round_for_creative_director') {
                formatted.asset_title = selectedGroup?.assesttitle;
                formatted.uid = selectedGroup?.uid;
                formatted.id = selectedGroup?.id;
                if (formatted.over_all_score) {
                    formatted.groups = [];
                } else if (formatted.groups) {
                    formatted.over_all_score = [];
                }
                // setPayloadList(prev => ({
                //     ...prev,
                //     ["asset_data"]: [
                //         formatted
                //     ]
                // }));
                setPayloadList(prev => {
                    const existing = prev.asset_data || [];
                    const filtered = existing.filter(item => item.uid !== formatted.uid); // Remove old with same uid
                    return {
                        ...prev,
                        asset_data: [...filtered, formatted] // Add current one
                    };
                });
            } else {
                const uniqueKey = headingKey == "salary_and_travels" ? "salary_and_travel" : headingKey;
                setPayloadList(prev => ({
                    ...prev,
                    [uniqueKey]: isFlat ? flattened : {
                        ...prev[uniqueKey],
                        ...formatted
                    }
                }));
            }
        }
    }, [selectedGroup])
    const handleBlueDots = (item) => {
        if (selectedGroup?.heading === "Job Match") {
            return ('')
        } else if (selectedGroup?.heading === "Availability") {
            if (item?.groupname === 'Willing to Travel for Job') {
                if (jobDetails?.requires_travel === item?.value) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            }
        } else if (selectedGroup?.heading === "Personality") {
            if (item?.groupname === 'Groups') {
                return ('')
            } else {
                const personalityKeys = Object.keys(jobDetails.calculation_job[0].personality_data);
                const personalityValue = Object.values(jobDetails.calculation_job[0].personality_data);
                const updatedBehaviourResponse = BehaviourResponse.map(item => ({
                    ...item,
                    personality_percentage: jobDetails.calculation_job[0].personality_data[item.behaviour_type_name] || 0 // Default to 0 if no match
                }));
                const matchedBehaviours = updatedBehaviourResponse.filter(item =>
                    personalityKeys.includes(item.behaviour_type_name)
                );
                const newArrray = matchedBehaviours.flatMap((val, index) => (`${val?.behaviours_name} ${personalityValue[index]}%`))
                if (newArrray.includes(item?.value)) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            }
        } else if (selectedGroup?.heading === "Skills") {
            const matchArray = jobDetails?.must_have_skills?.map((val) => val?.skill_name);
            if (matchArray.includes(item?.value)) {
                return (
                    <span className="imprt_icon text-primery"><i class="fa  fa-star" aria-hidden="true"></i>
                    </span>
                )
            } else {
                return (
                    <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                )
            }

        } else if (selectedGroup?.heading === "Custom Questions") {
            if (item?.item?.questions_answer?.includes(item?.value)) {
                return (
                    <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                )
            }
        } else if (selectedGroup?.heading === "Education") {
            const fetchEducation = jobDetails?.area_of_education?.map((val) => val?.qualification_name)
            if (item?.groupname === 'Area Of Education') {
                if (fetchEducation.includes(item?.value)) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            } else if (item?.groupname === 'Required Education') {
                if (jobDetails?.minimum_education === item?.value) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            }
        } else if (selectedGroup?.heading === "Language") {
            if (item?.groupname === 'Read And Write') {
                const rwl = jobDetails?.read_write_language?.map((val) => val?.language_name)
                if (rwl.includes(item?.value)) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            } else if (item?.groupname === 'Speak') {
                const spokenlang = jobDetails?.spoken_language?.map((val) => val?.language_name)
                if (spokenlang.includes(item?.value)) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            }
        } else if (selectedGroup?.heading === "Experience") {
            if (item?.groupname === 'Industries') {
                const Industries = jobDetails?.shortlisted_industry?.map((val) => val?.industry_name)
                if (Industries.includes(item?.value)) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            }
        } else if (selectedGroup?.heading === "Roles") {
            if (item?.groupname === 'Role') {
                const role = jobDetails?.restricted_roles?.map((val) => val?.is_like_name)
                if (role.includes(item?.value)) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            }
        } else if (selectedGroup?.heading === "Salary And Travels") {
            if (item?.groupname === 'Current Location') {
                const location = jobDetails?.preferred_geography?.map((val) => val?.location_name)
                if (location.includes(item?.value)) {
                    return (
                        <span className="imprt_icon text-primery"><i class="fas fa-circle"></i></span>
                    )
                }
            }
        }
        // else {
        //     return (
        //         <span
        //             // className={`imprt_icon ${mustHaveSkills.includes(skill) ? "text-primery" : ""} `}
        //             className="imprt_icon text-primery"
        //         //  onClick={() => handleMustHaveSkill(skill)}
        //         >
        //             <i class="fas fa-circle"></i>
        //             {/* <i class={`${mustHaveSkills.includes(skill) ? "fa" : "far"}  fa-star`} aria-hidden="true"></i> */}
        //         </span>
        //     )
        // }
    }
    const handleCreateGroup = async () => {
        try {
            const payload = {
                job_group_parameter: groupParameterId,
                group_name: groupTitle,
                group_filter: payloadList
            }
            const response = await assetSapicreateJobGroupPostAPI(payload)
            if (response.data.success) {
                setSelectedGroup({})
                setPayloadList({})
                setGroupTitle('')
                getJobGroupParameterList()
                handleClose()
            }
            debugger
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
                                                onChange={(e) => setGroupTitle(e.target.value)}
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
                                                                        {handleBlueDots(val)}
                                                                        {val.value}
                                                                    </span>
                                                                ))}
                                                                {item?.name === '' && (
                                                                    <p>-------------------or------------------</p>
                                                                )}
                                                                {item?.date && (
                                                                    <Form.Control
                                                                        name="available_by"
                                                                        type="date"
                                                                        placeholder="DD/MM/YYYY"
                                                                        style={{ width: "350px" }}
                                                                        //   value={profileformData?.AvailableBy}
                                                                        //   onChange={handleProfileDetailsChange}
                                                                        //   isInvalid={!!errors.AvailableBy}
                                                                        onChange={(e) => handleAvailableByDate(selectedGroup, e)}
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
                                                                    name="require_relocation_assistance"
                                                                    // type="checkbox"
                                                                    // placeholder="DD/MM/YYYY"
                                                                    // style={{ width: "350px" }}
                                                                    //   value={profileformData?.AvailableBy}
                                                                    onChange={(e) => handleRequireRelacation(selectedGroup, e)}
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