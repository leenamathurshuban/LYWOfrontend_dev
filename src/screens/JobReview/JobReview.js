import React, { useEffect, useState } from "react";
import {
    Container, Row, Col, Tab, Nav, Card, Form, Button, InputGroup, Table, Offcanvas, Accordion, ProgressBar
} from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import angleDown from "../../images/icons/angle-down-arrow.svg"
import EvaluaBtn from "../../images/icons/evalua_icon.svg"
import AutomatBtn from "../../images/icons/automations_icon.svg"
import stopBtn from "../../images/icons/pause-circle-16x16.svg"
import gridView from "../../images/icons/grid_icon.svg"
import listView from "../../images/icons/list_icon.svg"
import baseCheckbox from "../../images/icons/Checkbox_base.svg";
import User01Gray from "../../images/icons/user-01-gray.svg";
import filterLines from "../../images/icons/filter-lines.svg";
import fileIcon from "../../images/icons/file_icon.svg";
import faRingicon from "../../images/icons/Ring.svg";
import RingSucess from "../../images/icons/ring_sucess.svg";
import quizIcon from "../../images/icons/quiz_icon.svg";
import DragDrop from "../../images/icons/dragdrop-bullet.svg";
import deleteDark from "../../images/icons/trash-Dark..svg";
import userDark from "../../images/icons/users-dark.svg";
import ArrowDownDark from "../../images/icons/arrow-narrow-down-dark.svg";
import ExpandButton from "../../images/icons/expand-03-primery.svg";
import ArrowBack from "../../images/icons/arrowBack.svg";
import ArrowNext from "../../images/icons/arrowNext.svg";
import { useParams } from "react-router-dom";
import { getJobAssignmentReview, getJobDetailsApi, getJobGroupParameterListAPI, getScreeningParameterDataAPI } from "../../services/provider";
import Evaluations from "./Evaluations";
import Ratting from "../../components/Ratting";
import CodeBlock from "../../components/CodeBlock";
import CreateGroupModal from "./NewGroupModal";
import { BehaviourResponse } from "../../utils/behaviour";
import FilterApplicantModal from "./FilterApplicant";
const JobReview = () => {
    const codeSnippet = `class WorkloadTracker:
    def __init__(self):
        self.tasks = []

    def add_task(self, task, priority="Medium"):
        self.tasks.append({"task": task, "priority": priority, "completed": False})
        print(f"Added task: {task} (Priority: {priority})")

    def complete_task(self, task):
        for t in self.tasks:
            if t["task"] == task and not t["completed"]:
                t["completed"] = True
                print(f"Marked '{task}' as completed.")
                return
        print(f"Task '{task}' not found or already completed.")

    def show_tasks(self):
        if not self.tasks:
            print("No tasks available.")
            return

        print("\nCurrent Tasks:")
        for t in self.tasks:
            status = "✅ Completed" if t["completed"] else "❌ Pending"
            print(f"- {t['task']} (Priority: {t['priority']}) - {status}")

# Example Usage
tracker = WorkloadTracker()
tracker.add_task("Finish report", "High")
tracker.add_task("Reply to emails", "Low")
tracker.show_tasks()
tracker.complete_task("Finish report")
tracker.show_tasks()

  `;

    const getFileType = (url) => {
        const extension = url?.split('.')?.pop()?.toLowerCase();

        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
        const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi'];
        const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a'];

        if (imageExtensions.includes(extension)) return 'image';
        if (videoExtensions.includes(extension)) return 'video';
        if (audioExtensions.includes(extension)) return 'audio';
        return 'unknown';
    };
    const [show, setShow] = useState(false);
    const [FilterApplicantShow, setFilterApplicantShow] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [groupModal, setGroupModal] = useState(false);
    const [groupParameterId, setGroupParameterId] = useState();
    const handleReviewClose = () => setReviewModal(false);
    const handleClose = () => setShow(false);
    const handleCloseGrpMdl = () => {
        setGroupModal(false)
        setFilterApplicantShow(false)
    }
    const handleShow = () => setShow(true);
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState({})
    const [assetJob, setAssetJob] = useState([]);
    const [localAssetJob, setLocalAssetJob] = useState([]);
    const [assignmentReviewList, setAssignmentReviewList] = useState([]);
    const [jobTest, setJobTest] = useState([]);
    const [sectionWiseData, setSectionWiseData] = useState([]);
    const [questionWiseData, setQuestionWiseData] = useState({});
    const [questionWiseDuplicate, setQuestionWiseDuplicate] = useState({});
    const [rating, setRating] = useState({});
    const [currentId, setCurrentId] = useState(questionWiseData?.user_answer_question?.[0]?.id);
    const [groupParameterList, setGroupParameterList] = useState([]);
    const [ListData, setListData] = useState([]);
    const [selectedListUids, setSelectedListUids] = useState([]);
    const [ListShow, setListShow] = useState(false);
    const [groupState, setGroupState] = useState([
        {
            heading: 'Job Match', isChecked: false, isSelected: false,
            listData: [
                {
                    name: 'Job Groups',
                    data: [
                        { value: 'Excellent', groupname: 'Job Groups', isSelected: false },
                        { value: 'Good', groupname: 'Job Groups', isSelected: false },
                        { value: 'Average', groupname: 'Job Groups', isSelected: false },
                        { value: 'Below Average', groupname: 'Job Groups', isSelected: false }]
                },
                { name: '', data: [] },
                {
                    name: 'Job Match Percentage',
                    data: [
                        { value: '0 - 40 ', groupname: 'Job Match Percentage', isSelected: false },
                        { value: '50 - 60 ', groupname: 'Job Match Percentage', isSelected: false },
                        { value: '60 - 70 ', groupname: 'Job Match Percentage', isSelected: false },
                        { value: '70 - 80 ', groupname: 'Job Match Percentage', isSelected: false },
                        { value: '80 - 90 ', groupname: 'Job Match Percentage', isSelected: false },
                        { value: '90 - 100 ', groupname: 'Job Match Percentage', isSelected: false }
                    ]
                }
            ],
            selectedList: []
        },
        {
            heading: 'Availability', isChecked: false, isSelected: false,
            listData: [
                {
                    name: 'Working Status',
                    data: [
                        { value: 'Currently Working', groupname: 'Working Status', isSelected: false },
                        { value: 'Currently not Working ', groupname: 'Working Status', isSelected: false }
                    ]
                },
                {
                    name: 'Available by',
                    data: [],
                    date: true
                },
                {
                    name: 'Notice Period',
                    data: [
                        { value: 'Less than 30 Days', groupname: 'Notice Period', isSelected: false },
                        { value: '30 - 60 Days', groupname: 'Notice Period', isSelected: false },
                        { value: '60 - 90 Days   ', groupname: 'Notice Period', isSelected: false },
                        { value: 'More than 90', groupname: 'Notice Period', isSelected: false },
                    ]
                },
                {
                    name: "Notice Buy out",
                    data: [
                        { value: 'Available', groupname: 'Notice Buy out', isSelected: false },
                        { value: 'Not Available', groupname: 'Notice Buy out', isSelected: false },
                    ]
                },
                {
                    name: "Willing to Travel for Job",
                    data: [
                        { value: 'Regularly', groupname: 'Willing to Travel for Job', isSelected: false },
                        { value: 'Sometimes', groupname: 'Willing to Travel for Job', isSelected: false },
                        { value: 'Rarely', groupname: 'Willing to Travel for Job', isSelected: false },
                        { value: 'Not Willing to Travel', groupname: 'Willing to Travel for Job', isSelected: false },
                    ]
                }
            ],
            selectedList: []
        },

        {
            heading: 'Personality', isChecked: false, isSelected: false, flag: 'personality_data',
            listData: [
                {
                    name: 'Personality Groups',
                    data: [
                        { value: 'Excellent', groupname: 'Personality Groups', isSelected: false },
                        { value: 'Good', groupname: 'Personality Groups', isSelected: false },
                        { value: 'Average', groupname: 'Personality Groups', isSelected: false },
                        { value: 'Below Average', groupname: 'Personality Groups', isSelected: false }]
                }
            ],
            selectedList: []
        },
    ])

    const getJobAssignmentReviewAPI = async (id) => {
        try {
            const response = await getJobAssignmentReview(id)
            if (response?.data?.success) {
                setAssignmentReviewList(response?.data?.response?.asset_job)
                setSectionWiseData(response?.data?.response?.asset_job[0]?.section_asset)
                setQuestionWiseData(response?.data?.response?.asset_job[0]?.section_asset[0]?.question_section[0])
                setQuestionWiseDuplicate(response?.data?.response?.asset_job[0]?.section_asset[0]?.question_section[0])
            }
        } catch (error) {
            console.log(error);
        }
    }
    const formatKey = (key) => {
        // Convert snake_case to readable format like "Area of Education"
        return key
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    };
    const getScreeningAPI = async (id) => {
        try {
            const response = await getScreeningParameterDataAPI(id)
            if (response?.data?.success) {
                response?.data?.response?.map((item, index) => {
                    // const allSections = response.data.response.flatMap((item) =>
                    //     Object.entries(item).map(([sectionKey, sectionValue]) => ({
                    //         heading: formatKey(sectionKey),
                    //         title: sectionKey !== 'education' ? 'Select to Apply' : '',
                    //         isChecked: false,
                    //         isSelected: false,
                    //         listData: Object.entries(sectionValue).map(([key, values]) => ({
                    //             name: formatKey(key),
                    //             data: values.map(value => ({
                    //                 value,
                    //                 isSelected: false
                    //             }))
                    //         }))
                    //     }))
                    // );
                    const allSections = response.data.response.flatMap((item) =>
                        Object.entries(item).map(([sectionKey, sectionValue]) => {
                            const dynamicListData = Object.entries(sectionValue).map(([key, values]) => ({
                                name: formatKey(key),
                                data: values.map(value => ({
                                    value,
                                    groupname: formatKey(key),
                                    isSelected: false
                                }))
                            }));

                            // 👇 Append static data if it's the 'personality' section
                            const staticGroupsBlock = sectionKey === 'experience'
                                ? [{
                                    name: 'Get Experience',
                                    data: [
                                        { value: 'Fresher', groupname: "Get Experience", isSelected: false },
                                        { value: 'Less than 1 Year', groupname: "Get Experience", isSelected: false },
                                        { value: '1 - 2 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '2 - 4 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '4 - 6 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '6 - 9 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '9 - 12 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '12 - 15 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '15 - 20 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '20 - 25 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '25 - 30 Years', groupname: "Get Experience", isSelected: false },
                                        { value: '30 - 40 Years', groupname: "Get Experience", isSelected: false },
                                        { value: 'Above 40 Years', groupname: "Get Experience", isSelected: false },
                                    ]
                                }]
                                : sectionKey === 'salary_and_travels' ?
                                    [{
                                        name: 'Expected Salary',
                                        data: [
                                            { value: 'Below ₹3 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹3 LPA - ₹5 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹5 LPA - ₹7 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹7 LPA - ₹10 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹10 LPA - ₹12 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹12 LPA - ₹15 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹15 LPA - ₹20 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹20 LPA - ₹25 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹25 LPA - ₹30 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹30 LPA - ₹35 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹35 LPA - ₹40 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹40 LPA - ₹45 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹45 LPA - ₹50 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹50 LPA - ₹55 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: '₹55 LPA - ₹60 LPA', groupname: "Expected Salary", isSelected: false },
                                            { value: 'Above ₹60 LPA', groupname: "Expected Salary", isSelected: false },
                                        ]
                                    }, { name: 'Relocation', data: [{ value: 'Willing to Relocate', groupname: 'Relocation', isSelected: false }] }]
                                    : [];

                            return {
                                heading: formatKey(sectionKey),
                                // title: sectionKey !== 'education' ? 'Select to Apply' : '',
                                isChecked: false,
                                isSelected: false,
                                listData: [...dynamicListData, ...staticGroupsBlock],
                                selectedList: []
                            };
                        })
                    );


                    setGroupState(prevState => {
                        const merged = [...prevState, ...allSections];
                        const sorted = [
                            ...merged.filter(item => !item.uid),
                            ...merged.filter(item => item.uid)
                        ];

                        // remove duplicates by heading
                        const unique = sorted.filter((item, index, self) =>
                            index === self.findIndex(t => t.heading === item.heading)
                        );

                        return unique;
                    });
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getJobDetails = async (id) => {
        const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-api/${id}/`;
        try {
            const response = await getJobDetailsApi(url);
            if (response?.data?.success) {
                if (Array.isArray(response?.data?.response?.asset_job)) {
                    setAssetJob(response?.data?.response?.asset_job)
                    const allSections = response.data.response.asset_job.map((item) => ({
                        heading: formatKey(item.asset_title),
                        // title: 'Select to Apply',
                        uid: item?.uid,
                        assesttitle: item?.asset_title,
                        id: item?.id,
                        isChecked: false,
                        isSelected: false,
                        listData: [
                            {
                                name: 'Groups',
                                data: [
                                    { value: 'Excellent', groupname: 'Groups', isSelected: false },
                                    { value: 'Good', groupname: 'Groups', isSelected: false },
                                    { value: 'Average', groupname: 'Groups', isSelected: false },
                                    { value: 'Below Average', groupname: 'Groups', isSelected: false }]
                            },
                            { name: '', data: [] },
                            {
                                name: 'Over all Score',
                                data: [
                                    { value: '0 - 40', groupname: 'Over all Score', isSelected: false },
                                    { value: '40 - 50', groupname: 'Over all Score', isSelected: false },
                                    { value: '50 - 60', groupname: 'Over all Score', isSelected: false },
                                    { value: '60 - 70', groupname: 'Over all Score', isSelected: false },
                                    { value: '70 - 80', groupname: 'Over all Score', isSelected: false },
                                    { value: '80 - 90', groupname: 'Over all Score', isSelected: false },
                                    { value: '90 - 100', groupname: 'Over all Score', isSelected: false },
                                ]
                            }
                        ],
                        selectedList: []

                    }))

                    setGroupState(prevState => {
                        const merged = [...prevState, ...allSections];

                        // remove duplicates by heading
                        const unique = merged.filter((item, index, self) =>
                            index === self.findIndex(t => t.heading === item.heading)
                        );

                        return unique;
                    });
                }
                if (Array.isArray(response.data.response.skills)) {

                    const allSections = response.data.response.skills.reduce((acc, skill) => {
                        const groupName = skill?.skill_group?.skill_group_name;
                        if (!acc[groupName]) {
                            acc[groupName] = [];
                        }
                        // acc[groupName].push(skill?.skill_name);
                        acc[groupName].push(skill);
                        return acc;
                    }, {});
                    const fullObject = { Skills: allSections }

                    const setUpdate = Object.entries(fullObject).map(([sectionKey, sectionValue]) => ({
                        heading: formatKey(sectionKey),
                        // title: 'Select to Apply',
                        isChecked: false,
                        isSelected: false,
                        listData: Object.entries(sectionValue).map(([key, values]) => ({
                            name: formatKey(key),
                            data: values.map(val => ({
                                value: val.skill_name,
                                val,
                                groupname: formatKey(key),
                                isSelected: false
                            }))
                        })),
                        selectedList: []
                    }))
                    setGroupState(prevState => {
                        const merged = [...prevState, ...setUpdate];

                        // remove duplicates by heading
                        const unique = merged.filter((item, index, self) =>
                            index === self.findIndex(t => t.heading === item.heading)
                        );

                        return unique;
                    });
                }
                if (Array.isArray(response.data.response.question_job)) {
                    const transformed = {
                        heading: "Custom Questions",
                        // title: 'Select to Apply',
                        isChecked: false,
                        isSelected: false,
                        listData: response.data.response.question_job.map(item => ({
                            name: item.question_title,
                            data: item.question_option.part1.map(option => ({
                                value: option,
                                item,
                                groupname: item.question_title,
                                isSelected: false
                            }))
                        })),
                        selectedList: []
                    }
                    setGroupState(prevState => {
                        const merged = [...prevState, transformed];
                        // remove duplicates by heading
                        const unique = merged.filter((item, index, self) =>
                            index === self.findIndex(t => t.heading === item.heading)
                        );
                        return unique;
                    });
                }
                if (Array.isArray(response.data.response.calculation_job)) {
                    const key = response.data.response.calculation_job.find(obj => obj.hasOwnProperty('personality_data')) ? 'personality_data' : null;
                    const personalityKeys = Object.keys(response.data.response.calculation_job[0].personality_data);
                    const personalityValue = Object.values(response.data.response.calculation_job[0].personality_data);
                    const updatedBehaviourResponse = BehaviourResponse.map(item => ({
                        ...item,
                        personality_percentage: response.data.response.calculation_job[0].personality_data[item.behaviour_type_name] || 0 // Default to 0 if no match
                    }));
                    const matchedBehaviours = updatedBehaviourResponse.filter(item =>
                        personalityKeys.includes(item.behaviour_type_name)
                    );
                    // debugger
                    const transformed = {
                        name: 'All Personalites',
                        data: matchedBehaviours.map((val, index) => ({
                            value: `${val?.behaviours_name} ${personalityValue[index]}%`,
                            groupname: 'All Personalites',
                            key: val?.behaviour_type_name,
                            isSelected: false
                        }))
                    };
                    setGroupState(prev =>
                        prev.map(item => {
                            if (key === item?.flag) {
                                return {
                                    ...item,
                                    listData: [...item.listData, transformed] // ← Push to listData here
                                };
                            }
                            return item;
                        })
                    );
                }
                setJobDetails(response?.data?.response)
            }
        } catch (error) {
        }
    }
    const getJobGroupParameterList = async () => {
        try {
            const response = await getJobGroupParameterListAPI(id)
            if (response.data.success) {
                setGroupParameterList(response?.data?.response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getScreeningAPI(id)
        getJobAssignmentReviewAPI(id)
        getJobDetails(id)
        getJobGroupParameterList()
    }, [id])
    const getJobAssignmentReviewList = async (uid) => {
        try {
            const response = await getJobAssignmentReview(id)
            if (response?.data?.success) {
                setAssignmentReviewList(response?.data?.response?.asset_job)
                setSectionWiseData(response?.data?.response?.asset_job[0]?.section_asset)
                const result = response?.data?.response?.asset_job[0]?.section_asset[0]?.question_section?.find(val => val?.uid === uid)
                setQuestionWiseData(result)
                setQuestionWiseDuplicate(result)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleTestJob = (e) => {
        const { value } = e.target;
        const filterData = assignmentReviewList.filter((item) => item?.uid === value);
        setJobTest(filterData)
    }
    const handleSectionWise = (e) => {
        const { value } = e.target;
        assignmentReviewList.map((Val) => {
            const filterData = Val?.section_asset?.filter((item) => item.uid === value);
            setSectionWiseData(filterData)
            setQuestionWiseData(filterData[0]?.question_section[0])
        })
    }
    const handleSectionQuestionbyuser = (obj) => {
        setQuestionWiseData(obj)
        setQuestionWiseDuplicate(obj)
    }
    const handleReviewModal = (data) => {
        setReviewModal(true)
        // setPopupData(data)
        setCurrentId(data?.id)
    }
    const handleEvaluated = () => {
        const duplicate = questionWiseDuplicate;
        const originalObject = duplicate;
        const filteredData = {
            ...originalObject,
            user_answer_question: originalObject?.user_answer_question?.filter(item => item.score > 0),
        };
        setQuestionWiseData(filteredData)
    }
    const handlePending = () => {
        const duplicate = questionWiseDuplicate;
        const originalObject = duplicate;
        const filteredData = {
            ...originalObject,
            user_answer_question: originalObject?.user_answer_question?.filter(item => item.score == 0),
        };
        setQuestionWiseData(filteredData)
    }
    const handleAllEvaiPend = () => {
        setQuestionWiseData(questionWiseDuplicate)
    }


    const getCurrentIndex = () => questionWiseData?.user_answer_question?.findIndex(item => item.id === currentId);

    const goToPrevious = () => {
        const currentIndex = getCurrentIndex();
        if (currentIndex > 0) {
            setCurrentId(questionWiseData?.user_answer_question[currentIndex - 1].id);
        }
    };

    const goToNext = () => {
        const currentIndex = getCurrentIndex();
        if (currentIndex < questionWiseData?.user_answer_question.length - 1) {
            setCurrentId(questionWiseData?.user_answer_question[currentIndex + 1].id);
        }
    };

    const currentItem = questionWiseData?.user_answer_question?.find(item => item.id === currentId);
    useEffect(() => {
        const result = questionWiseData?.user_answer_question?.reduce((acc, item) => {
            acc[item.uid] = item?.score; // use id as key
            return acc;
        }, {})
        setRating(result ? result : {})
    }, [questionWiseData])

    const handleSearchByName = (e) => {
        const { name, value } = e.target;
        const duplicate = questionWiseDuplicate;
        const originalObject = duplicate;
        const filteredData = {
            ...originalObject,
            user_answer_question: originalObject?.user_answer_question?.filter((val) => val?.applicant?.user?.username?.toLowerCase().includes(value.toLowerCase())),
        };
        setQuestionWiseData(filteredData)
    }
    const handleListData = (data) => {
        setListShow(true);
        setListData(data?.job_applicant_group)
    }
    const handleCheckBoxBtn = (uid) => {
        setSelectedListUids((prevSelectedUids) => {
            if (prevSelectedUids.includes(uid)) {
                return prevSelectedUids.filter((id) => id !== uid);
            } else {

                return [...prevSelectedUids, uid];
            }
        });
    }
    const allSelected = selectedListUids.length === ListData?.length;
    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedListUids([]);
        } else {
            setSelectedListUids(ListData.map((user) => user.uid));
        }
    };
    // console.log(assignmentReviewList)
    // console.log('section', sectionWiseData)
    // console.log(questionWiseData)
    // console.log(currentItem)
    console.log(groupParameterList)
    return (
        <>
            <Sidebar />
            <Header />
            {/* {isLoading && (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="ml-3" />
        </div>
      )} */}

            <div className="page-body ps-0">
                <Container fluid className="bg-white">
                    <Row>
                        <Col md={6} className="d-flex justify-content-between align-items-center">
                            <h6 class="my-3 pagetitle"><i class="fa fa-suitcase text-primery me-2"></i>{jobDetails?.job_title}<img src={angleDown} className="ms-2 w-14" /></h6>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end align-items-center">
                            <button type="button" onClick={handleShow} className="icon_btnlink btn btn-primary"><img src={EvaluaBtn} className="me-1" />Evaluations</button>
                            <button type="button" className="icon_btnlink btn btn-primary"><img src={AutomatBtn} className="me-1" />Automations</button>
                            <button type="button" className="icon_btnlink btn btn-primary"><img src={stopBtn} className="me-1" />Stop Applications</button>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="bg-white">
                            <Col md={6}>
                                <Nav variant="pills" className="tab-underline">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first"><i class="far fa-folder"></i>Applications</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second"><i class="fa fa-bar-chart"></i>Insights</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third"><i class="far fa-commenting"></i>Review</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                            </Col>
                            <Col md={6} className="text-end">
                                <button className="btn btn-traspant" onClick={() => setListShow(false)}><img src={gridView} /></button>
                                <button className="btn btn-traspant" onClick={() => setListShow(true)}><img src={listView} /></button>
                            </Col>
                        </Row>
                        <Row >
                            <Tab.Content className="p-3">
                                <Tab.Pane eventKey="first">
                                    <Row className="hori_scroll">
                                        {ListShow && ListData.length > 0 ? (
                                            <Card className="shadow-sm border-0 evaluations_data mt-4 rounded overflow-hidden">
                                                <Card.Header className="py-2">
                                                    <Row>
                                                        <Col md={6} className="d-flex">
                                                            <div className="d-inline">
                                                                <InputGroup className="defult_serachbox">
                                                                    <Button id="basic-addon1">
                                                                        <svg
                                                                            width="18"
                                                                            height="18"
                                                                            viewBox="0 0 18 18"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                                                                                stroke="#667085"
                                                                                stroke-width="1.66667"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                            />
                                                                        </svg>
                                                                    </Button>
                                                                    <Form.Control
                                                                        placeholder="Serach"
                                                                        aria-label="Serach"
                                                                        aria-describedby="basic-addon1"
                                                                    />
                                                                </InputGroup>
                                                            </div>
                                                        </Col>
                                                        <Col md={6} className="d-flex justify-content-end align-items-center">
                                                            <Button className="icon_btnlink"><i className="far fa-check-circle me-2 text-primery"></i>Shortlist</Button>
                                                            <Button className="icon_btnlink"><i className="far fa-times-circle me-2 text-primery"></i>Reject</Button>
                                                            <Button className="icon_btnlink"><i className="fa fa-ban me-2 text-primery"></i>Hold</Button>
                                                            <Button className="icon_btnlink"><i className="fa fa-download me-2 text-primery"></i>Download</Button>
                                                            <Button
                                                                // className="btn btn-light-outline me-3"
                                                                className="icon_btnlink"
                                                                onClick={() => setFilterApplicantShow(true)}
                                                            >
                                                                <svg
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 20 20"
                                                                    className="me-2"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                                                                        stroke="#344054"
                                                                        stroke-width="1.66667"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                </svg>
                                                                filters
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Card.Header>
                                                <Card.Body className="pt-2">
                                                    {/* <div className="applid-filters">
                                                <span className="filter-tag">Filter 1 <i class="fa fa-times" aria-hidden="true"></i></span>
                                                <span className="filter-tag">Filter 2 <i class="fa fa-times" aria-hidden="true"></i></span>
                                                <span className="filter-tag">Filter 3 <i class="fa fa-times" aria-hidden="true"></i></span>
                                                <span className="filter-tag">Filter 4 <i class="fa fa-times" aria-hidden="true"></i></span>
                                            </div> */}
                                                    <div className="elv_datatable jobreview_data">
                                                        <Table striped className="m-0">
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan={1}>&nbsp;</th>
                                                                    <th colSpan={5} className="border-b">
                                                                        <div className="d-flex align-items-end justify-content-between">
                                                                            <strong>Details</strong><button type="button" className="btn btn-link font-sm pb-0"><i class="fas fa-plus-circle"></i></button>
                                                                        </div>
                                                                    </th>
                                                                    <th colSpan={2} className="border-b"><strong>LYWO Score</strong></th>
                                                                    <th colSpan={5} className="border-b"><strong>Progress</strong></th>
                                                                    <th colSpan={2} className="border-b"><strong>Status</strong></th>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        {/* <img src={baseCheckbox} alt="" className="me-2 mw-16" /> */}
                                                                        <span className="me-2" onClick={handleSelectAll}>
                                                                            <svg
                                                                                width="20"
                                                                                height="20"
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <rect
                                                                                    x="0.5"
                                                                                    y="0.5"
                                                                                    width="19"
                                                                                    height="19"
                                                                                    rx="5.5"
                                                                                    fill="#EEF4FF"
                                                                                />
                                                                                <rect
                                                                                    x="0.5"
                                                                                    y="0.5"
                                                                                    width="19"
                                                                                    height="19"
                                                                                    rx="5.5"
                                                                                    stroke="#444CE7"
                                                                                />
                                                                                <path
                                                                                    d="M5.91675 10H14.0834"
                                                                                    stroke="#444CE7"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                />
                                                                                {!allSelected && (
                                                                                    <path
                                                                                        d="M10 5.91675V14.0834"
                                                                                        stroke="#444CE7"
                                                                                        strokeWidth="2"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                    />
                                                                                )}
                                                                            </svg>
                                                                        </span>
                                                                        Candidate Name
                                                                    </th>
                                                                    <th>Education</th>
                                                                    <th>Industry</th>
                                                                    <th>Experience</th>
                                                                    <th>Available By</th>
                                                                    <th>Location</th>
                                                                    <th>Match</th>
                                                                    <th>Personality</th>
                                                                    <th>Step 3</th>
                                                                    <th>Step 4</th>
                                                                    <th>Step 5</th>
                                                                    <th>Step 6</th>
                                                                    <th>Score</th>
                                                                    <th>Tag</th>
                                                                    <th>Decision</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {ListData.map((item, index) => (
                                                                    <tr>
                                                                        <td>
                                                                            <Form.Check
                                                                                className="inline-checkbox me-2_5"
                                                                                name="group1"
                                                                                type="checkbox"
                                                                                checked={selectedListUids.includes(item?.uid)}
                                                                                onChange={() => handleCheckBoxBtn(item?.uid)}
                                                                            />
                                                                            <span className="font-weight-600">
                                                                                {/* Sandeep Kattamuri */}
                                                                                {item?.job_applicant_profile?.user?.username}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="text-elipe-100">
                                                                                {item?.job_applicant_profile?.qualification_applicantprofile?.map(val => val.level).join(',')}
                                                                            </span>
                                                                        </td>
                                                                        <td><span className="text-elipe-100">
                                                                            {item?.job_applicant_profile?.work_applicant?.map(val => val.work_industry).join(',')}
                                                                        </span></td>
                                                                        <td>{item?.job_applicant_profile?.work_applicant?.[0]?.total_work_experience}</td>
                                                                        <td>{item?.job_applicant_profile?.availble_by}</td>
                                                                        <td>{item?.job_applicant_profile?.current_location}</td>
                                                                        <td>{item?.job_match_score}%</td>
                                                                        <td>
                                                                            <div className="d-flex">
                                                                                <img src={User01Gray} />
                                                                                <select className="select-transpant">
                                                                                    {Object.entries(item?.job_applicant_profile?.personality).map(([key, value]) => (
                                                                                        <option>{value}%</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>Invited</td>
                                                                        <td><span className="text-elipe-40">Under Review</span></td>
                                                                        <td><span className="text-elipe-40">Under Review</span></td>
                                                                        <td><span className="text-elipe-40">Under Review</span></td>
                                                                        <td>76%</td>
                                                                        <td>
                                                                            <span className="tag tag-lightprimery">Recall</span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="dic_tag inactive"><i class="fa fa-minus"></i> Inactive</span>
                                                                        </td>
                                                                    </tr>
                                                                ))}

                                                                {/* <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>60%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Revisit</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag active"><i class="far fa-check-circle"></i> Active</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>80%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag rejected"><i class="far fa-times-circle"></i> Rejected</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>40%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag hold"><i class="fa fa-ban"></i> On Hold</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>40%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag Pending"><i class="far fa-circle"></i> Pending</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>40%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag shortlisted"><i class="fa fa-check-circle"></i> Shortlisted</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>40%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag Pending"><i class="far fa-circle"></i> Pending</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>40%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag hold"><i class="fa fa-ban"></i> On Hold</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>40%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag hold"><i class="fa fa-ban"></i> On Hold</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>40%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag Pending"><i class="far fa-circle"></i> Pending</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Form.Check
                                                                            className="inline-checkbox me-2_5"
                                                                            name="group1"
                                                                            type="checkbox"

                                                                        />
                                                                        <span className="font-weight-600">
                                                                            Sandeep Kattamuri
                                                                        </span>
                                                                    </td>
                                                                    <td><span className="text-elipe-100">Masters in Biomedicine</span></td>
                                                                    <td><span className="text-elipe-100">Pharmaceutical</span></td>
                                                                    <td>5 Years</td>
                                                                    <td>15/09/2024</td>
                                                                    <td>Hyderabad</td>
                                                                    <td>40%</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <img src={User01Gray} />
                                                                            <select className="select-transpant">
                                                                                <option>76%</option>
                                                                                <option>70%</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>Invited</td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td><span className="text-elipe-40">Under Review</span></td>
                                                                    <td>76%</td>
                                                                    <td>
                                                                        <span className="tag tag-lightprimery">Recall</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="dic_tag shortlisted"><i class="fa fa-check-circle"></i> Shortlisted</span>
                                                                    </td>
                                                                </tr> */}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td colspan="2"><button type="button" class="btn-light-outline btn btn-primary">Load More</button></td>
                                                                    <td colspan="13" class="text-end pe-3"><span class="pagination_count">Showing 10 items</span></td>
                                                                </tr>
                                                            </tfoot>
                                                        </Table>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ) : (<>
                                            {groupParameterList.map((paraName, paraIndex) => (
                                                <Col md={2}>
                                                    <Card className="status_cardpanel">
                                                        <div className="card-header">
                                                            <h5>{paraName?.parameter_name} <span className="count">{paraName?.parameter_applicant_count}</span></h5>
                                                            <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                        </div>
                                                        <Card.Body>
                                                            {/* {paraName?.parameter_name === "Screening" ? (
                                                            <>
                                                                <button type="button" onClick={() => {
                                                                    setGroupModal(true)
                                                                    setGroupParameterId(paraName?.uid)
                                                                }} className="btn btn-link mb-3"><i className="fa fa-plus me-2"></i>Create a New Group</button>
                                                                {paraName?.groups_parameter?.sort((a, b) => a.id - b.id)?.map((groupItem) => (
                                                                    <>
                                                                        <div className={`sts_databox ${groupItem?.group_name.toLowerCase()}`}>
                                                                            <div className="d-flex justify-content-between">
                                                                                <h6>{groupItem?.group_name}<span className="count">{groupItem?.group_wise_applicant_count}</span></h6>
                                                                            </div>
                                                                            <div className="d-flex justify-content-between align-items-end">
                                                                                <Form>
                                                                                    <Form.Check
                                                                                        type="switch"
                                                                                        id="custom-switch"
                                                                                        label="Auto-Remind"
                                                                                    />
                                                                                </Form>
                                                                                <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {paraName?.groups_parameter?.sort((a, b) => a.id - b.id)?.map((groupItem) => (
                                                                    <div className={`sts_databox ${groupItem?.group_name.toLowerCase()}`}>
                                                                        <h6>{groupItem?.group_name}<span className="count">{groupItem?.group_wise_applicant_count}</span></h6>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        )} */}
                                                            <button type="button" onClick={() => {
                                                                setGroupModal(true)
                                                                setGroupParameterId(paraName?.uid)
                                                            }} className="btn btn-link mb-3"><i className="fa fa-plus me-2"></i>Create a New Group</button>
                                                            {paraName?.groups_parameter?.sort((a, b) => a.id - b.id)?.map((groupItem) => (
                                                                <>
                                                                    <div className={`sts_databox ${groupItem?.group_name.toLowerCase()}`}>
                                                                        <div className="d-flex justify-content-between">
                                                                            <h6>{groupItem?.group_name}<span className="count">{groupItem?.group_wise_applicant_count}</span></h6>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-end">
                                                                            <Form>
                                                                                <Form.Check
                                                                                    type="switch"
                                                                                    id="custom-switch"
                                                                                    label="Auto-Remind"
                                                                                />
                                                                            </Form>
                                                                            <button className="button" class="btn-transpant" onClick={() => handleListData(groupItem)}><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))}
                                                            {/* <div className="sts_databox excellent">
                                                        <h6>Excellent<span className="count">40</span></h6>
                                                    </div>
                                                    <div className="sts_databox good">
                                                        <h6>Good<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox average">
                                                        <h6>Average<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox baverage">
                                                        <h6>Below Average<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox hold">
                                                        <h6>On Hold<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox rejected">
                                                        <h6>Rejected<span className="count">20</span></h6>
                                                    </div> */}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </>)}
                                        {/* <Col md={2}>
                                            <Card className="status_cardpanel">
                                                <div className="card-header">
                                                    <h5>Behaviour <span className="count">150</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <div className="sts_databox incopmlate">
                                                        <h6>Incomplete<span className="count">100</span></h6>
                                                    </div>
                                                    <div className="sts_databox excellent">
                                                        <h6>Excellent<span className="count">40</span></h6>
                                                    </div>
                                                    <div className="sts_databox good">
                                                        <h6>Good<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox average">
                                                        <h6>Average<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox baverage">
                                                        <h6>Below Average<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox hold">
                                                        <h6>On Hold<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox rejected">
                                                        <h6>Rejected<span className="count">20</span></h6>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>                                         */}
                                        {/* <Col md={3}>
                                            <Card className="status_cardpanel screening text-center">
                                                <div className="card-header">
                                                    <h5>Screening <span className="count">150</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <button type="button" onClick={() => setGroupModal(true)} className="btn btn-link mb-3"><i className="fa fa-plus me-2"></i>Create a New Group</button>
                                                    <div className="sts_databoxlg incopmlate">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Incomplete<span className="count">100</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg excellent">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Excellent<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg good">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Good<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg average">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Average<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg baverage">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Below Average<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg hold">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>On Hold<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="sts_databoxlg rejected">
                                                        <div className="d-flex justify-content-between">
                                                            <h6>Rejected<span className="count">40</span></h6>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <Form>
                                                                <Form.Check
                                                                    type="switch"
                                                                    id="custom-switch"
                                                                    label="Auto-Remind"
                                                                />
                                                            </Form>
                                                            <button className="button" class="btn-transpant"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col> */}
                                        {/* <Col md={2}>
                                            <Card className="status_cardpanel">
                                                <div className="card-header">
                                                    <h5>Tech-Quiz1 <span className="count">100</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <div className="text-center"><button type="button" className="btn btn-link mb-3"><i className="fa fa-plus me-2"></i></button></div>
                                                    <div className="sts_databox incopmlate">
                                                        <h6>Incomplete<span className="count">100</span></h6>
                                                    </div>
                                                    <div className="sts_databox excellent">
                                                        <h6>Excellent<span className="count">40</span></h6>
                                                    </div>
                                                    <div className="sts_databox good">
                                                        <h6>Good<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox average">
                                                        <h6>Average<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox baverage">
                                                        <h6>Below Average<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox hold">
                                                        <h6>On Hold<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox rejected">
                                                        <h6>Rejected<span className="count">20</span></h6>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={2}>
                                            <Card className="status_cardpanel">
                                                <div className="card-header">
                                                    <h5>Assignment 1 <span className="count">100</span></h5>
                                                    <button type="button"><i class="fa fa-ellipsis-h"></i></button>
                                                </div>
                                                <Card.Body>
                                                    <div className="text-center"><button type="button" className="btn btn-link mb-3"><i className="fa fa-plus me-2"></i></button></div>
                                                    <div className="sts_databox incopmlate">
                                                        <h6>Incomplete<span className="count">100</span></h6>
                                                    </div>
                                                    <div className="sts_databox excellent">
                                                        <h6>Excellent<span className="count">40</span></h6>
                                                    </div>
                                                    <div className="sts_databox good">
                                                        <h6>Good<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox average">
                                                        <h6>Average<span className="count">45</span></h6>
                                                    </div>
                                                    <div className="sts_databox baverage">
                                                        <h6>Below Average<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox hold">
                                                        <h6>On Hold<span className="count">20</span></h6>
                                                    </div>
                                                    <div className="sts_databox rejected">
                                                        <h6>Rejected<span className="count">20</span></h6>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col> */}
                                        <Col md={3}>
                                            <Card className="status_cardpanel">
                                                <Card.Body className="text-center d-flex align-items-center justify-content-center flex-column">
                                                    <button type="button" className="btn btn-light-primery" onClick={handleShow}><i className="fa fa-plus me-2"></i>Add Evaluation</button>
                                                    <button type="button" className="btn btn-white mt-2"><i className="fa fa-plus me-2"></i>Finalise Selection</button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <Card className="rounded border-0 review_card">
                                        <Card.Header>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Select className="select-md-transpant" onChange={handleTestJob}>
                                                        {assignmentReviewList.map((Val) => (
                                                            <option value={Val?.uid} >{Val?.asset_title}</option>
                                                        ))}
                                                        {/* <option>Assignment 1 </option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option> */}
                                                    </Form.Select>
                                                </Col>
                                                <Col md={6} className="d-flex review_count justify-content-end align-items-center">
                                                    <p className="font-sm font-weight-600 m-0"><img src={userDark} alt="user" /> <strong className="font-weight-700">{questionWiseData?.user_answer_question?.filter(item => item?.score > 0)?.length}</strong> / {questionWiseData?.user_answer_question?.length} Completed</p>
                                                    <ProgressBar className="ms-2" variant="primery" now={questionWiseData?.user_answer_question?.filter(item => item?.score > 0)?.length} />
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                {assignmentReviewList.map((item, index) => (
                                                    <Col md={2} className="queslsit_panel pe-0">
                                                        <Form.Select className="qs_dropdown" onChange={handleSectionWise}>
                                                            {item?.section_asset.map((cVal) => (
                                                                <option value={cVal?.uid}>{cVal?.section_title}</option>
                                                            ))}

                                                            {/* <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option> */}
                                                        </Form.Select>
                                                        <ul className="queslsit">
                                                            {sectionWiseData[0]?.question_section?.map((QuesItem, quesIndex) => (
                                                                <li onClick={() => handleSectionQuestionbyuser(QuesItem)}>
                                                                    <span>Q. {quesIndex + 1}</span>
                                                                    <div className="ratting_warp">
                                                                        <div className="ratting">
                                                                            <span className="avg-text">Avg.</span>
                                                                            <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                            <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                            <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                            <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                            <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                        </div>
                                                                        <p>50 Pending</p>
                                                                    </div>
                                                                </li>
                                                            ))}

                                                            {/* <li>
                                                            <span>Q. 2</span>
                                                            <div className="ratting_warp">
                                                                <div className="ratting">
                                                                    <span className="avg-text">Avg.</span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                </div>
                                                                <p>50 Pending</p>
                                                            </div>
                                                        </li>
                                                        <li className="active">
                                                            <span>Q. 3</span>
                                                            <div className="ratting_warp">
                                                                <div className="ratting">
                                                                    <span className="avg-text">Avg.</span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                </div>
                                                                <p>50 Pending</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span>Q. 4</span>
                                                            <div className="ratting_warp">
                                                                <div className="ratting">
                                                                    <span className="avg-text">Avg.</span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                </div>
                                                                <p>50 Pending</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span>Q. 5</span>
                                                            <div className="ratting_warp">
                                                                <div className="ratting">
                                                                    <span className="avg-text">Avg.</span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                </div>
                                                                <p>50 Pending</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span>Q. 6</span>
                                                            <div className="ratting_warp">
                                                                <div className="ratting">
                                                                    <span className="avg-text">Avg.</span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                </div>
                                                                <p>50 Pending</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span>Q. 7</span>
                                                            <div className="ratting_warp">
                                                                <div className="ratting">
                                                                    <span className="avg-text">Avg.</span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                </div>
                                                                <p>50 Pending</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span>Q. 8</span>
                                                            <div className="ratting_warp">
                                                                <div className="ratting">
                                                                    <span className="avg-text">Avg.</span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                </div>
                                                                <p>50 Pending</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span>Q. 9</span>
                                                            <div className="ratting_warp">
                                                                <div className="ratting">
                                                                    <span className="avg-text">Avg.</span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item active"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                    <span className="rt-item"><i className="fa fa-star"></i></span>
                                                                </div>
                                                                <p>50 Pending</p>
                                                            </div>
                                                        </li> */}
                                                            <li className="justify-content-center">
                                                                <button type="button" className="btn-transpant"><img src={ArrowDownDark} /></button>
                                                            </li>
                                                        </ul>
                                                    </Col>
                                                ))}

                                                <Col md={10} className="ans_panel">
                                                    <div className="que_head">
                                                        <p class="text-sm">{questionWiseData?.question_title}</p>
                                                        <strong className="qus_number">1</strong>
                                                    </div>
                                                    <div className="ans_body">
                                                        <Row className="my-3">
                                                            <Col md={4}>
                                                                <InputGroup className="defult_serachbox">
                                                                    <Button id="basic-addon1">
                                                                        <svg
                                                                            width="18"
                                                                            height="18"
                                                                            viewBox="0 0 18 18"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                                                                                stroke="#667085"
                                                                                stroke-width="1.66667"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                            />
                                                                        </svg>
                                                                    </Button>
                                                                    <Form.Control
                                                                        placeholder="Search"
                                                                        aria-label="Search"
                                                                        aria-describedby="basic-addon1"
                                                                        onChange={handleSearchByName}
                                                                    />
                                                                </InputGroup>
                                                            </Col>
                                                            <Col md={8} className="text-end">
                                                                <ul className="head_filterlist">
                                                                    <li className="" onClick={handleEvaluated}>Evaluated</li>
                                                                    <li className="" onClick={handlePending}>Pending</li>
                                                                    <li className="active" onClick={handleAllEvaiPend}>All</li>
                                                                </ul>
                                                            </Col>
                                                        </Row>
                                                        <div className="all_anslist">
                                                            {questionWiseData?.user_answer_question?.map((user, index) => (
                                                                <Card className="ans_card">
                                                                    <Card.Header className="p-0 pb-2 d-flex align-items-center justify-content-between">
                                                                        <Card.Title>{user?.applicant?.user?.username}</Card.Title>
                                                                        <div className="d-flex">
                                                                            <Ratting rating={rating} setRating={setRating} ID={user?.uid} getJobAssignmentReviewList={getJobAssignmentReviewList} questionWiseData={questionWiseData} />
                                                                            <button onClick={() => handleReviewModal(user)} type="button" className="btn-transpant ms-4">
                                                                                <img src={ExpandButton} alt="" />
                                                                            </button>
                                                                        </div>
                                                                    </Card.Header>
                                                                    <Card.Body className="px-0">
                                                                        {user?.text && (
                                                                            <Card.Text>{user?.text?.replace(/<[^>]*>/g, '')}</Card.Text>
                                                                        )}
                                                                        {getFileType(user?.attach_or_video) === "image" && (
                                                                            <img src={`https://bittrend.shubansoftware.com${user?.attach_or_video}`} width={500} height={400} />
                                                                        )}
                                                                        {getFileType(user?.attach_or_video) === "audio" && (
                                                                            <audio controls className="w-full">
                                                                                <source src={'https://bittrend.shubansoftware.com' + user?.attach_or_video} type="audio/mp3" />
                                                                            </audio>
                                                                        )}
                                                                        {getFileType(user?.attach_or_video) === "video" && (
                                                                            <div className="video-frame">
                                                                                <video controls width="100%" height="430" >
                                                                                    <source src={'https://bittrend.shubansoftware.com' + user?.attach_or_video} type="video/mp4" />
                                                                                </video>
                                                                            </div>
                                                                        )}
                                                                    </Card.Body>
                                                                </Card>
                                                            ))}
                                                            {/* <Card className="ans_card">
                                                                <Card.Header className="p-0 pb-2 d-flex align-items-center justify-content-between">
                                                                    <Card.Title>Sndeep Kattamuri</Card.Title>
                                                                    <div className="d-flex">
                                                                        <Ratting />
                                                                        <button onClick={handleShow} type="button" className="btn-transpant ms-4">
                                                                            <img src={ExpandButton} alt="" />
                                                                        </button>
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Body className="px-0">
                                                                    <Card.Text>
                                                                        Phasellus erat arcu, scelerisque vitae efficitur sed, ornare et purus. Duis vel semper ligula. Proin consectetur magna quis ullamcorper efficitur. Donec suscipit tristique leo, ac porta odio maximus quis. Mauris quis lacinia massa. Curabitur vitae leo quis lorem elementum tincidunt. Morbi et convallis nibh.
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                            <Card className="ans_card">
                                                                <Card.Header className="p-0 pb-2 d-flex align-items-center justify-content-between">
                                                                    <Card.Title>Sndeep Kattamuri</Card.Title>
                                                                    <div className="d-flex">
                                                                        <Ratting />
                                                                        <button onClick={handleShow} type="button" className="btn-transpant ms-4">
                                                                            <img src={ExpandButton} alt="" />
                                                                        </button>
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Body className="px-0">
                                                                    <Card.Text>
                                                                        Phasellus erat arcu, scelerisque vitae efficitur sed, ornare et purus. Duis vel semper ligula. Proin consectetur magna quis ullamcorper efficitur. Donec suscipit tristique leo, ac porta odio maximus quis. Mauris quis lacinia massa. Curabitur vitae leo quis lorem elementum tincidunt. Morbi et convallis nibh.
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                            <Card className="ans_card">
                                                                <Card.Header className="p-0 pb-2 d-flex align-items-center justify-content-between">
                                                                    <Card.Title>Sndeep Kattamuri</Card.Title>
                                                                    <div className="d-flex">
                                                                        <Ratting />
                                                                        <button onClick={handleShow} type="button" className="btn-transpant ms-4">
                                                                            <img src={ExpandButton} alt="" />
                                                                        </button>
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Body className="px-0">
                                                                    <Card.Text>
                                                                        Phasellus erat arcu, scelerisque vitae efficitur sed, ornare et purus. Duis vel semper ligula. Proin consectetur magna quis ullamcorper efficitur. Donec suscipit tristique leo, ac porta odio maximus quis. Mauris quis lacinia massa. Curabitur vitae leo quis lorem elementum tincidunt. Morbi et convallis nibh.
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card> */}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>
            {/*======MORE FILTER======*/}
            <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop={false}
                placement="end"
                className="shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={filterLines} alt="" />
                        More Filters
                    </Offcanvas.Title>
                    <span className="applied_count">Applied (2)</span>
                </Offcanvas.Header>
                <Offcanvas.Body className="filter_warp">
                    <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>
                        <div className="filter_item">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Match</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <ul className="filter_itemlist">
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="1"
                                                    type="checkbox"
                                                    label="0% - 50%"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="2"
                                                    type="checkbox"
                                                    label="50% - 70%"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="3"
                                                    type="checkbox"
                                                    label="More than 70%"
                                                />
                                            </li>
                                        </ul>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                        <div className="filter_item">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Personality</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <ul className="filter_itemlist">
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="leader"
                                                    type="checkbox"
                                                    label="Leader"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="influencer2"
                                                    type="checkbox"
                                                    label="Influencer"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="team"
                                                    type="checkbox"
                                                    label="Team Player"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="perfectionist"
                                                    type="checkbox"
                                                    label="Perfectionist"
                                                />
                                            </li>
                                        </ul>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                        <div className="filter_item">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Status</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <ul className="filter_itemlist">
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="4"
                                                    type="checkbox"
                                                    label="Shortlisted"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="5"
                                                    type="checkbox"
                                                    label="On Hold"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="6"
                                                    type="checkbox"
                                                    label="Rejected"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="7"
                                                    type="checkbox"
                                                    label="Review Pending"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="inline-checkbox"
                                                    id="8"
                                                    type="checkbox"
                                                    label="Reminder Sent"
                                                />
                                            </li>
                                        </ul>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                    </Accordion>
                </Offcanvas.Body>
                <div className="offcanvas-footer text-end">
                    <Button
                        variant="light"
                        className="me-3"
                    >
                        Clear All
                    </Button>
                    <Button onClick={handleClose} variant="primary">
                        Apply
                    </Button>
                </div>
            </Offcanvas>

            {/*======New Group======
            <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop={false}
                placement="end"
                className="newgroup_drawer lg-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <span className="font-weight-400">New Group</span> - Screening
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="filter_warp">
                    <Form className="row">
                        <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
                            <Form.Label>Group Title</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Group Title"
                            name="grouptitle"
                            />
                        
                        </Form.Group>
                        <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
                            <Form.Label>Add Filters</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Type here to search"
                            name="typehere"
                            />
                            <div className="taglist">
                                <span className="tag-gary">Education <i className="fa fa-times"></i></span>
                                <span className="tag-gary">Experience <i className="fa fa-times"></i></span>
                                <span className="tag-gary">Target Hire <i className="fa fa-times"></i></span>
                                <span className="tag-gary">Preferred locations <i className="fa fa-times"></i></span>
                            </div>
                        </Form.Group>
                        <Col md={12}>
                            <Form.Label>Filters</Form.Label>
                            <div className="border-1 p-3 rounded">
                                <Row>
                                    <Form.Group className="col-md-6 mb-2" controlId="jobTitle">
                                        <Form.Label>Education</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Select Education</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 mb-2" controlId="jobTitle">
                                        <Form.Label>Target hire date</Form.Label>
                                        <Form.Control
                                        type="date"
                                        placeholder="05/10/2024"
                                        name="targetdate"
                                        />
                                    
                                    </Form.Group>
                                    <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
                                        <Form.Label>Experience</Form.Label>
                                    </Form.Group>
                                </Row>
                            </div>
                        </Col>
                    </Form>
                </Offcanvas.Body>
                <div className="offcanvas-footer text-end">
                    <Button
                        variant="light"
                        className="me-3"
                    >
                        Clear All
                    </Button>
                    <Button onClick={handleClose} variant="primary">
                        Create Group
                    </Button>
                </div>
            </Offcanvas>*/}

            {/*======Evaluations======*/}
            {/* <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop={false}
                placement="end"
                className="evaluations_drawer lg-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Evaluations
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="add_evaluwarp">
                    <Tab.Container id="left-tabs-example1" defaultActiveKey="evaluation">
                        <Row>
                            <Col sm={12}>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="evaluation">Select Evaluation</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="order">Set order of Evaluation</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="evaluation">
                                        <p className="base-text my-3">Evaluations have not been added. You can choose up to 4 evaluations from the list below for this position</p>
                                        <Card className="border-0 evaluations_data">
                                            <Card.Header className="px-0 pb-3">
                                                <Row>
                                                    <Col md={5}>
                                                        <InputGroup className="defult_serachbox">
                                                            <Button id="basic-addon1">
                                                                <svg
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 18 18"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                                                                        stroke="#667085"
                                                                        stroke-width="1.66667"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                </svg>
                                                            </Button>
                                                            <Form.Control
                                                                placeholder="Search"
                                                                aria-label="Search"
                                                                aria-describedby="basic-addon1"
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </Card.Header>
                                            <Card.Body className="p-0 mt-3">
                                                <ul class="head_filterlist">
                                                    <li class="active">View all</li>
                                                    <li class="">Quiz</li>
                                                    <li class="">Assignment</li>
                                                </ul>
                                                <div className="elv_datatable shadow-none">
                                                    <Table striped className="m-0">
                                                        <thead>
                                                            <tr>
                                                                <th>Evaluation Title</th>
                                                                <th>Type</th>
                                                                <th>Duration</th>
                                                                <th>Avg. Score</th>
                                                                <th>Questions</th>
                                                                <th>Pass Ratio</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Pre-interview round for creative director</span>
                                                                </td>
                                                                <td><img className="me-1" src={fileIcon} alt="" />Assignment</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={faRingicon} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Quiz for Backend Developer</span>
                                                                </td>
                                                                <td><img className="me-1" src={quizIcon} alt="" />Quiz</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={faRingicon} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Assignment for Figma Designer</span>
                                                                </td>
                                                                <td><img className="me-1" src={quizIcon} alt="" />Quiz</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={RingSucess} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="success" now={60} /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Pre-interview round for creative director</span>
                                                                </td>
                                                                <td><img className="me-1" src={fileIcon} alt="" />Assignment</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={faRingicon} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ cursor: 'pointer' }}>
                                                                    <Form.Check
                                                                        className="inline-checkbox me-1"
                                                                        id="1"
                                                                        type="checkbox"
                                                                    />
                                                                    <span class="font-weight-600">Pre-interview round for creative director</span>
                                                                </td>
                                                                <td><img className="me-1" src={fileIcon} alt="" />Assignment</td>
                                                                <td>26.4 Min</td>
                                                                <td>40% <img src={faRingicon} className="ms-1" alt="" /></td>
                                                                <td>112</td>
                                                                <td><div className="d-flex align-items-center"><span>40%</span> <ProgressBar variant="warning" now={60} /></div></td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td colSpan={2}>
                                                                    <Button
                                                                        className="btn-light-outline"
                                                                    >
                                                                        Load More
                                                                    </Button>
                                                                </td>
                                                                <td colSpan={4} className="text-end pe-3">
                                                                    <span className="pagination_count">
                                                                        Showing 10 items
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </Table>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="order">
                                        <p className="base-text my-3">Drag and drop to reorder assignments</p>
                                        <Table className="m-0 evelu_order">
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>1</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>2</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>3</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>4</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ cursor: "pointer" }}><img src={DragDrop} alt="" /></td>
                                                <td style={{ width: "30px" }}>5</td>
                                                <td>Assignment for Figma Designer</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Pass Criteria</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 60%</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span>Duration</span>
                                                        <Form.Select className="select-sm w-80 ms-2">
                                                            <option> 30mins</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </Form.Select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn-transpant"><img src={deleteDark} alt="" /></button>
                                                </td>
                                            </tr>
                                        </Table>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Offcanvas.Body>
                <div className="offcanvas-footer text-end">
                    <span className="me-4 font-sm">0/4</span>
                    <Button onClick={handleClose} variant="primary">
                        Select
                    </Button>
                </div>
            </Offcanvas> */}
            <Evaluations
                show={show}
                handleClose={handleClose}
                assetJob={assetJob}
                setAssetJob={setAssetJob}
                localAssetJob={localAssetJob}
                setLocalAssetJob={setLocalAssetJob}
                id={id}
            />
            <CreateGroupModal
                show={groupModal}
                handleClose={handleCloseGrpMdl}
                assetJob={assetJob}
                setAssetJob={setAssetJob}
                jobDetails={jobDetails}
                localAssetJob={localAssetJob}
                setLocalAssetJob={setLocalAssetJob}
                id={id}
                groupState={groupState}
                setGroupState={setGroupState}
                groupParameterId={groupParameterId}
                getJobGroupParameterList={getJobGroupParameterList}
            />

            <FilterApplicantModal
                show={FilterApplicantShow}
                handleClose={handleCloseGrpMdl}
                assetJob={assetJob}
                setAssetJob={setAssetJob}
                jobDetails={jobDetails}
                localAssetJob={localAssetJob}
                setLocalAssetJob={setLocalAssetJob}
                id={id}
                groupState={groupState}
                setGroupState={setGroupState}
                groupParameterId={groupParameterId}
                getJobGroupParameterList={getJobGroupParameterList}
            />
            {/*======Answer======*/}
            <Offcanvas
                show={reviewModal}
                onHide={handleReviewClose}
                backdrop={false}
                placement="end"
                className="ansexp_drawer lg-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Answer
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="ansexp_warp">
                    <div className="que_head">
                        <p class="text-sm">{questionWiseData?.question_title}</p>
                    </div>
                    <div className="d-flex justify-content-end align-items-center my-3">
                        <span className="count">100/150</span>
                        <button className="btn-back" onClick={goToPrevious}><img src={ArrowBack} alt="" /></button>
                        <button className="btn-next" onClick={goToNext}><img src={ArrowNext} alt="" /></button>
                    </div>
                    <Card className="ans_card">
                        <Card.Header className="p-0 pb-1 d-flex align-items-center justify-content-between border-0">
                            <Card.Title>{currentItem?.applicant?.user?.username}</Card.Title>
                            <Ratting rating={rating} setRating={setRating} ID={currentItem?.uid} getJobAssignmentReviewList={getJobAssignmentReviewList} questionWiseData={questionWiseData} />
                        </Card.Header>
                        <Card.Body className="px-0">
                            {/* <Card.Text>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate scelerisque mi, in iaculis ante tempor et. Aliquam fermentum, sem eu tincidunt vehicula, purus velit molestie sem, sed sodales libero elit ut massa. Maecenas egestas sit amet sem vitae ornare. Curabitur faucibus maximus neque, quis sollicitudin velit ornare vel. Donec nec mollis metus. Curabitur auctor mollis metus sit amet tristique. Nulla ut maximus ante.</p>
                                <p>Phasellus erat arcu, scelerisque vitae efficitur sed, ornare et purus. Duis vel semper ligula. Proin consectetur magna quis ullamcorper efficitur. Donec suscipit tristique leo, ac porta odio maximus quis. Mauris quis lacinia massa. Curabitur vitae leo quis lorem elementum tincidunt. Morbi et convallis nibh.
                                </p>
                                <p>Etiam at consequat mi, nec scelerisque erat. Fusce condimentum cursus metus, ultricies scelerisque tortor. Aenean est tellus, varius ullamcorper felis quis, mollis finibus eros. In efficitur sed nisl semper vulputate. Duis vitae mi non neque volutpat aliquam vel et nulla. Curabitur rutrum vulputate lorem et sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Sed turpis risus, tempor eget cursus nec, aliquet ac tellus.
                                </p>
                                <p>Ut ut fringilla tellus, vel rhoncus neque. Proin turpis mi, feugiat id maximus eget, aliquet id purus. Donec tellus purus, viverra id dolor quis, fringilla varius augue. Pellentesque pellentesque ut nunc eu gravida. Etiam rhoncus auctor dui quis maximus. Sed tempor, libero a efficitur auctor, augue turpis volutpat nulla, ac pellentesque magna purus ac turpis. In hac habitasse platea dictumst. Phasellus ligula mi, sodales vitae velit sit amet, eleifend varius ligula.
                                </p>
                            </Card.Text>
                            <div className="video-frame">
                                <iframe width="100%" height="430" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                                </iframe>
                            </div>
                            <CodeBlock language="javascript" code={codeSnippet} /> */}
                            {currentItem?.text && (
                                <Card.Text>{currentItem?.text?.replace(/<[^>]*>/g, '')}</Card.Text>
                            )}
                            {getFileType(currentItem?.attach_or_video) === "image" && (
                                <img src={`https://bittrend.shubansoftware.com${currentItem?.attach_or_video}`} width={500} height={400} />
                            )}
                            {getFileType(currentItem?.attach_or_video) === "audio" && (
                                <audio controls className="w-full">
                                    <source src={'https://bittrend.shubansoftware.com' + currentItem?.attach_or_video} type="audio/mp3" />
                                </audio>
                            )}
                            {getFileType(currentItem?.attach_or_video) === "video" && (
                                <div className="video-frame">
                                    <video controls width="100%" height="430" >
                                        <source src={'https://bittrend.shubansoftware.com' + currentItem?.attach_or_video} type="video/mp4" />
                                    </video>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default JobReview;
