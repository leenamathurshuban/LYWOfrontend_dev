import React, { useEffect, useRef, useState } from "react";
import {
    Container, Row, Col, Tab, Nav, Card, Form, Button, InputGroup, Table, Offcanvas, Accordion, Badge, Stack, ProgressBar,
    Dropdown, OverlayTrigger, Tooltip, Tabs,
    FormGroup, Modal
} from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import angleDown from "../../images/icons/angle-down-arrow.svg"
import EvaluaBtn from "../../images/icons/evalua_icon.svg"
import AutomatBtn from "../../images/icons/automations_icon.svg"
import stopBtn from "../../images/icons/pause-circle-16x16.svg"
import LeaderIcn from "../../images/icons/Leader-icon.svg";
import gridView from "../../images/icons/grid_icon.svg"
import listView from "../../images/icons/list_icon.svg"
import Dragableicn from "../../images/icons/dragable-six-dots.svg"
import ApplicantStaChrt from "../../images/icons/Applicant_Status_chart.svg"
import AvabCandite from "../../images/icons/aval_candi_grap.svg"
import SaleryRange from "../../images/icons/salery_ranggrap.svg"
import PersonalityGrp from "../../images/icons/Personality_grap.svg"
// import listView from "../../images/icons/list_icon.svg"
import CopyBtn from "../../images/icons/copy_gray.svg"
import baseCheckbox from "../../images/icons/Checkbox_base.svg";
import User01Gray from "../../images/icons/user-01-gray.svg";
import filterLines from "../../images/icons/filter-lines.svg";
import SReminder from "../../images/icons/send-01-primery.svg";
import Hold from "../../images/icons/hold-primery.svg";
import Reject from "../../images/icons/user-x-01-primery.svg";
import ShortList from "../../images/icons/user-check-01-primery.svg";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
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

import Finalise from "../../images/icons/finalise.svg";

import Barchart from "../../images/icons/bar-chart-07.svg";
import Folder from "../../images/icons/folder.svg";
import Messagedot from "../../images/icons/message-dots-circle-b.svg";
import Review from "../../images/icons/review.svg";

import list from "../../images/icons/list.svg";
import trash from "../../images/icons/trash-light.svg";




import sorticn from "../../images/icons/switch-vertical-01.svg";
import printicn from "../../images/icons/printer.svg";
import downloadicn from "../../images/icons/download-b.svg";

import checkgreen from "../../images/icons/Checkicon__1.svg"
import xcircle from "../../images/icons/x-circle.svg"
import slashCircle from "../../images/icons/slash-circle-01.svg"
import placeholdericon from "../../images/icons/placeholder.svg"
import sendmsg from "../../images/icons/send-011.svg"
import downloadicon from "../../images/icons/download-001.svg"






import { useParams } from "react-router-dom";
import { ApplicationDeatilsApi, chatPostAPI, getAssetDataDetailsAPI, getCandidateListForSingleJob, getJobAssignmentReview, getJobDetailsApi, getJobGroupParameterListAPI, getScreeningParameterDataAPI, insightsListAPI, jobApplicantUpdateAPI, postJobGroupParameterListByFetchAPI, UpdateMultipleJobApi } from "../../services/provider";
import Evaluations from "./Evaluations";
import Ratting from "../../components/Ratting";
import CodeBlock from "../../components/CodeBlock";
import CreateGroupModal from "./NewGroupModal";
import { BehaviourResponse } from "../../utils/behaviour";
import FilterApplicantModal from "./FilterApplicant";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import SideCard from "./Step/SideCard";
import Step3 from "./Step/Step3";
import Step4 from "./Step/Step4";
import Step5 from "./Step/Step5";
import CandidateQuestionList from "./Step/CandidateQuestionList";
import AvailabilityPieChart from "./GraphChart/AvailabilityPieChart";
import PersonalityGraph from "./GraphChart/PersonalityGraph";
import SalaryRangeGraph from "./GraphChart/SalaryRangeGraph";
import ApplicantStatusGraph from "./GraphChart/ApplicantStatusGraph";
import AreaEducationChart from "./GraphChart/AreasEducationChart";
import EducationLevelGraph from "./GraphChart/EducationLevelGraph";
import SkillGraphComponent from "./GraphChart/SkillsGraph";
import IndustryExperienceChart from "./GraphChart/IndustryExperience";
import ExperienceGraphComponent from "./GraphChart/ExperienceGraph";
import CustomerChartComponent from "./GraphChart/CustomerChart";
import AssetOverAllGraphComponent from "./GraphChart/AssetOverallGraph";
import { transformOverallAndSectionData } from "../../utils/assetgraphLogic";

import CandidateChat from "../../components/Chats/CandidateChat";
import { useSelector } from "react-redux";

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

    const CustomToolbar = () => (
        <div id="toolbar">
            <button className="ql-bold">

            </button>
            <button className="ql-italic">

            </button>
            <button className="ql-underline">

            </button>
            <button className="ql-strike">

            </button>
            <button className="ql-link">

            </button>
        </div>
    );


    const [selectedpersonality, setSelectedpersonality] = useState({
        modal_name: "",
        modal_data: {}
    })


    const [activeIndex, setActiveIndex] = useState(null);


    // Handle click on Col
    const handleCardClick = (behaviour) => {
        setSelectedpersonality({
            modal_isOpen: true,
            modal_data: behaviour
        });
    };

    // Close modal
    const handleCloseModal = () => {
        setSelectedpersonality({
            modal_isOpen: false,
            modal_data: {}
        });
    };

    const user = useSelector((state) => state.login?.loginUserInfo);
    const [recallshow, recallsetShow] = useState(false);

    const recallClose = () => recallsetShow(false);
    const recallShow = () => recallsetShow(true);


    const [stopappshow, stopappsetShow] = useState(false);




    const stopappClose = () => stopappsetShow(false);
    const stopappShow = () => stopappsetShow(true);

    const [holdappshow, holdappsetShow] = useState(false);
    const holdappClose = () => holdappsetShow(false);
    const holdappShow = () => holdappsetShow(true);



    const [sortmodalshow, sortmodalsetShow] = useState(false);
    const sortmodalClose = () => sortmodalsetShow(false);
    const sortmodalShow = () => sortmodalsetShow(true);






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
    const [uploadProgress, setUploadProgress] = useState(0);
    const [expandedGroup, setExpandedGroup] = useState(null);
    const [FilterApplicantShow, setFilterApplicantShow] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");

    const [activeAccordion, setActiveAccordion] = useState('0');

    const handleSaveTemplate = () => {
        setActiveAccordion('1'); // This will open the second accordion (eventKey="1")
    };

    const [modalShow, setModalShow] = React.useState(false);


    const [remindmodalShow, setremindModalShow] = React.useState(false);



    const [isLikeUid, setIsLikeUid] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");
    const [fileUrl, setFileUrl] = useState(null);

    const MAX_DESCRIPTION_WORDS = 500;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const [fileName, setFileName] = useState("");

    const [description, setDescription] = useState("");

    const handleWrapperClick = () => {
        if (quillRef.current) {
            quillRef.current.focus(); // Focus the editor manually
        }
    };

    const handleSelectedLikeItems = (item) => {
        // setIsLike(item.label);
        // setIsLikeUid((prevSelectedItems) => [...prevSelectedItems, item.value]);
        setIsLikeUid([item.value]);
        // setIsLikeDropdown(false);
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "#deebff"
                : state.isFocused
                    ? "#deebff" // Color on hover
                    : "inherit",
            color: state.isSelected ? "#000" : "black",
            cursor: "pointer", // Optional: improves UX on hover
        }),
    };

    const [errors, setErrors] = useState({
        jobTitle: "",
        isLike: "",
        noOfPosition: "",
        department: "",
        location: "",
        travelOption: "",
        description: "",
        jobType: "",
        workPlaceType: "",
        detailed_description: ""
    });

    const handleEditorChange = (value) => {
        const wordCount = value.trim().split(/\s+/).length;

        if (wordCount <= MAX_DESCRIPTION_WORDS) {
            setDescription(value);
            setDescriptionError("");
        } else {
            setDescriptionError(
                `You have reached the maximum limit of ${MAX_DESCRIPTION_WORDS} words.`
            );
        }
    };


    const handleEditorChange1 = (value) => {
        const wordCount = value.trim().split(/\s+/).length;

        if (wordCount <= MAX_DESCRIPTION_WORDS) {
            setDescription(value);
            setDescriptionError("");
        } else {
            setDescriptionError(
                `You have reached the maximum limit of ${MAX_DESCRIPTION_WORDS} words.`
            );
        }
    };


    const handleEditorChange2 = (value) => {
        const wordCount = value.trim().split(/\s+/).length;

        if (wordCount <= MAX_DESCRIPTION_WORDS) {
            setDescription(value);
            setDescriptionError("");
        } else {
            setDescriptionError(
                `You have reached the maximum limit of ${MAX_DESCRIPTION_WORDS} words.`
            );
        }
    };


    const handleEditorChange3 = (value) => {
        const wordCount = value.trim().split(/\s+/).length;

        if (wordCount <= MAX_DESCRIPTION_WORDS) {
            setDescription(value);
            setDescriptionError("");
        } else {
            setDescriptionError(
                `You have reached the maximum limit of ${MAX_DESCRIPTION_WORDS} words.`
            );
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Check if the file size exceeds 5MB
        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage(
                "Attachement failed. The attachment exceeds the allowed file size."
            );
            return; // Exit early if the file is too large
        } else {
            setErrorMessage(""); // Clear error message if file is valid
        }

        // Set the file name to display it
        setFileName(file.name);

        if (file.type.startsWith("image/")) {
            // Handle Image Upload
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //   // Insert image into Quill editor
            //   const quill = quillRef.current.getEditor();
            //   const range = quill.getSelection();
            //   if (range) {
            //     quill.insertEmbed(range.index, "image", reader.result);
            //   }
            // };
            // reader.readAsDataURL(file);
            const uploadSimulation = setInterval(() => {
                setUploadProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(uploadSimulation);
                        return 100;
                    }
                    return prevProgress + 10; // Increment progress
                });
            }, 300);
        } else if (file.type === "application/pdf") {
            // Handle PDF Upload
            const fileUrl = URL.createObjectURL(file);
            setFileUrl(fileUrl);
            // Optionally, insert PDF link into the editor
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            if (range) {
                quill.insertEmbed(range.index, "link", fileUrl);
            }
            const uploadSimulation = setInterval(() => {
                setUploadProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(uploadSimulation);
                        return 100;
                    }
                    return prevProgress + 10; // Increment progress
                });
            }, 300);
        } else {
            alert("Please upload a valid image or PDF file.");
        }
    };
    const fileInputRef = useRef(null);
    const removeFileValue = () => {
        fileInputRef.current.value = "";
        setUploadProgress(0)
        setFileName("")
    }


    const [activeTab, setActiveTab] = useState("evaluated");

    //   const handleEvaluated = () => setActiveTab("evaluated");
    //   const handlePending = () => setActiveTab("pending");
    //   const handleAllEvaiPend = () => setActiveTab("all");




    const [reviewModal, setReviewModal] = useState(false);

    const [answerModal, setAnswerModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const quillRef = useRef(null);

    const [groupModal, setGroupModal] = useState(false);
    const [groupParameterId, setGroupParameterId] = useState();
    const [paramUid, setParamUid] = useState()
    const [groupTitleName, setGroupTitleName] = useState("");
    const [candidateQuestionShow, setCandidateQuestionShow] = useState(false);
    const [candidateQuestionList, setCandidateQuestionList] = useState([])

    const handleReviewClose = () => {
        setReviewModal(false);
        setCandidateEmail('')
        setCandidateQuestionShow(false)
    };

    const handleAnswerClose = () => setAnswerModal(false);

    const handleClose = () => setShow(false);
    const handleCloseGrpMdl = () => {
        setGroupModal(false)
        setFilterApplicantShow(false)
    }

    const handleShow = () => setShow(true);

    const [showInstruction, setShowInstruction] = useState(false)

    const handleInstructionModel = () => setShowInstruction(false);



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
    const [ListGrid, setListGrid] = useState([]);
    const [count, setCount] = useState(10);
    const [selectedListUids, setSelectedListUids] = useState([]);
    const [ListShow, setListShow] = useState(false);
    const [candidateEmail, setCandidateEmail] = useState('')
    const [candidateInfo, setCandidateInfo] = useState({})
    const [candidateDetails, setCandidateDetails] = useState({})
    const [assetData, setAssetData] = useState({})
    const [applicantPersonality, setApplicantPersonality] = useState();
    const [personalityData, setPersonalityData] = useState();
    const [reviewEventKey, setReviewEventKey] = useState('first')
    const [personalityAll, setPersonalityAll] = useState()
    const [InsightsGraphData, setInsightsGraphData] = useState({})

    const [mode, setMode] = useState(false); // 'overall' | 'section'

    const [ids, setIds] = useState([])
    const [payloadList, setPayloadList] = useState({
        roles: [],
        skills: [],
        language: {
            speak: [],
            read_and_write: []
        },
        education: {
            area_of_education: [],
            required_education: []
        },
        job_match: {
            job_groups: [],
            job_match_percentage: []
        },
        asset_data: [],
        experience: {
            industries: [],
            get_experience: []
        },
        personality: {
            all_personalites: [],
            personality_groups: []
        },
        availability: {
            available_by: [],
            notice_period: [],
            notice_buy_out: [],
            working_status: [],
            willing_to_travel_for_job: []
        },
        custom_questions: [],
        salary_and_travel: {
            relocation: [],
            expected_salary: [],
            current_location: [],
            require_relocation_assistance: []
        }
        // "roles": [],

        // "skills": [],

        // "language": {

        //     "speak": [],
        //     "read_and_write": []
        // },

        // "education": {
        //     "area_of_education": [],
        //     "required_education": ["Below Secondary Education"]
        // },

        // "job_match": {
        //     "job_groups": [],
        //     "job_match_percentage": []
        // },

        // "asset_data": [],

        // "experience": {
        //     "industries": [],
        //     "get_experience": []
        // },

        // "personality": {
        //     "all_personalites": [],
        //     "personality_groups": []
        // },

        // "availability": {
        //     "available_by": [],
        //     "notice_period": [],
        //     "notice_buy_out": [],
        //     "working_status": [],
        //     "willing_to_travel_for_job": []
        // },

        // "custom_questions": [],

        // "salary_and_travel": {
        //     "relocation": [],
        //     "expected_salary": [],
        //     "current_location": [],
        //     "require_relocation_assistance": []
        // }
    })
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
                const personalityKeys = Object.keys(response?.data?.response?.calculation_job[0].all_fetched_personality_data);
                const updatedBehaviourResponse = BehaviourResponse.map(item => ({
                    ...item,
                    personality_percentage: response?.data?.response?.calculation_job[0].all_fetched_personality_data[item.behaviour_type_name] || 0 // Default to 0 if no match
                }));
                const matchedBehaviours = updatedBehaviourResponse.filter(item =>
                    personalityKeys.includes(item.behaviour_type_name)
                );
                setPersonalityAll(matchedBehaviours)
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
                    setPersonalityData(matchedBehaviours)
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
    const getInsightsGraphList = async () => {
        try {
            const res = await insightsListAPI(id)
            if (res?.data?.success) {
                setInsightsGraphData(res?.data?.response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // 
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Reorder widgets
        </Tooltip>
    );


    const getListGridData = async () => {
        try {
            const res = await getCandidateListForSingleJob(id)
            if (res?.data?.success) {
                setListGrid(res.data.response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleLoadMore = () => {
        const nextData = ListGrid.slice(count, count + 10);
        setListData([...ListData, ...nextData]);
        setCount(count + 10);
    };
    // 
    useEffect(() => {
        getScreeningAPI(id)
        getJobAssignmentReviewAPI(id)
        getJobDetails(id)
        getJobGroupParameterList()
        getInsightsGraphList()
        getListGridData()
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
        // const { value } = e.target;
        const { value } = e;
        const filterData = assignmentReviewList.filter((item) => item?.uid === value);
        setJobTest(filterData)
    }
    const handleSectionWise = (e) => {
        // const { value } = e.target;
        const { value } = e;
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
        setActiveTab("evaluated");
    }

    const handlePending = () => {
        const duplicate = questionWiseDuplicate;
        const originalObject = duplicate;
        const filteredData = {
            ...originalObject,
            user_answer_question: originalObject?.user_answer_question?.filter(item => item.score == 0),
        };
        setQuestionWiseData(filteredData)
        setActiveTab("pending");
    }

    const handleAllEvaiPend = () => {
        setQuestionWiseData(questionWiseDuplicate)
        setActiveTab("all");
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
    const allSelected = selectedListUids.length === ListData.filter(user => user?.job_applicant_status !== "Reject").length;
    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedListUids([]);
        } else {
            // setSelectedListUids(ListData.map((user) => user.uid));
            setSelectedListUids(
                ListData.filter(user => user?.job_applicant_status !== "Reject")
                    .map(user => user.uid)
            );
        }
    };
    const getFilterApplicantListBycandidateReview = async () => {
        try {
            const payload = {
                job_group_parameter: groupParameterId,
                group_name: groupTitleName,
                group_filter: payloadList
            }
            const response = await postJobGroupParameterListByFetchAPI(paramUid, payload)
            if (response?.data?.success) {
                setListData(response?.data?.response)
                handleCloseGrpMdl()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const ApplicantEmailDetails = async () => {
        try {
            const response = await ApplicationDeatilsApi(candidateEmail);
            if (response?.data?.success) {
                setCandidateDetails(response?.data?.response);
                //personmality -------->
                const personalityKeys = Object.values(response?.data?.response?.applicant_personality_data);
                const updatedBehaviourResponse = BehaviourResponse.map(item => ({
                    ...item,
                    personality_percentage: response.data.response.applicant_personality_data[item.behaviour_type_name] || 0 // Default to 0 if no match
                }));
                const matchedBehaviours = updatedBehaviourResponse.filter(item =>
                    personalityKeys.includes(item.behaviour_type_name)
                );
                setApplicantPersonality(matchedBehaviours)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        ApplicantEmailDetails();
    }, [candidateEmail])
    const fetchListAPIByKey = async (uid, groupname, gId) => {
        setListShow(true);
        setGroupParameterId(uid)
        setGroupTitleName(groupname)
        setParamUid(gId)
        try {
            const payload = {
                job_group_parameter: uid,
                group_name: groupname,
                group_filter: {}
            }
            const response = await postJobGroupParameterListByFetchAPI(gId, payload)
            if (response?.data?.success) {
                setListData(response?.data?.response)
                handleCloseGrpMdl()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getAssetEvalutionData = async () => {
        try {
            const res = await getAssetDataDetailsAPI(id, candidateDetails?.uid)
            if (res?.success) {
                setAssetData(res.response)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSendMessage = async () => {
        // e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("sender", user?.uid);
            formData.append("job", id);
            formData.append("job_applicant", candidateInfo?.uid);
            if (description.trim()) formData.append("message", description);

            const response = await chatPostAPI(formData);
            if (response.data.success) {
                setDescription("")
                setModalShow(false)
                sortmodalsetShow(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleStatusGroup = async (status, applicant_uid) => {
        try {
            const formData = new FormData();
            if (Array.isArray(applicant_uid)) {
                formData.append('job_applicant_uid', JSON.stringify(selectedListUids))
            } else {
                formData.append('job_applicant_uid', JSON.stringify([applicant_uid]))
            }
            formData.append('job_groups', JSON.stringify([paramUid]))
            formData.append('parameter_uid', groupParameterId)
            formData.append('job_applicant_status', status)
            const res = await jobApplicantUpdateAPI(formData)
            if (res?.data?.success) {
                fetchListAPIByKey(groupParameterId, groupTitleName, paramUid)
                setSelectedListUids([]);
                if (status == 'Reject' || status == 'Select') {
                    handleSendMessage()
                }
                holdappClose()
            }
        } catch (error) {
            console.log(error);
            holdappClose()
        }
    }
    useEffect(() => {
        getAssetEvalutionData()
    }, [candidateDetails])
    const assignmentListOption = assignmentReviewList.map((opt) => ({ value: opt.uid, label: opt.asset_title }))
    const sectionAssetfun = (Arry) => {
        if (Arry.length > 0) {
            const matchSection = Arry.map((opt) => ({ value: opt.uid, label: opt.section_title }))
            return matchSection
        }
    }
    const handleSwitchgraph = (index) => {
        if (!ids.includes(index)) {
            setIds([...ids, index])
        } else {
            const filter = ids.filter((cv) => cv != index)
            setIds(filter)
        }
    }
    const AssetGraphData = transformOverallAndSectionData(InsightsGraphData?.asset_data?.length > 0 ? InsightsGraphData?.asset_data : [])

    const coloringByStatus = (value) => {
        if (value == "Active" || value == "Inactive") {
            return value.toLowerCase()
        } else if (value == "Reject") {
            return "rejected"
        } else if (value == "On Hold") {
            return "hold"
        } else if (value == "Select") {
            return "shortlisted"
        }

    }
    const iconByStatus = (value) => {
        if (value == "Active") {
            return 'far fa-check-circle'
        } else if (value == "Inactive") {
            return 'fa fa-minus'
        } else if (value == "Reject") {
            return "far fa-times-circle"
        } else if (value == "On Hold") {
            return "fa fa-ban"
        } else if (value == "Select") {
            return "fa fa-check-circle"
        }

    }
    const handleCommonEvent = async (status) => {
        const uids = [];
        uids.push(id)
        const formData = new FormData();
        formData.append('job_uids', JSON.stringify(uids))
        formData.append('job_status', status)
        const res = await UpdateMultipleJobApi(formData)
        if (res.data.success) {
            getJobDetails(id)
            stopappClose()
        }
    }
    // console.log(assignmentReviewList)
    // console.log('section', sectionWiseData)
    // console.log(questionWiseData)
    // console.log(currentItem)
    console.log(groupParameterList)
    console.log(groupParameterId)
    console.log(ListData)
    console.log(mode)
    console.log('=======================ListShow', ListShow, ListData)
    console.log(jobDetails)
    return (
        <>
            <Sidebar />
            <Header />
            {/* {isLoading && (
                    <div className="loader-overlay">
                        <Spinner animation="border" role="status" className="ml-3" />
                    </div>
                )} */}

            <div className="page-body ps-0 pe-0">
                <Container fluid className="bg-white">
                    <Row>
                        <Col md={6} className="d-flex justify-content-between align-items-center">
                            <h6 class="my-3 ps-4 pagetitle" style={{ 'textTransform': "capitalize" }} ><i class="fa fa-suitcase text-primery me-2"></i>{jobDetails?.job_title}<img src={angleDown} className="ms-2 w-14" /></h6>
                        </Col>
                        <Col md={6} className="d-flex pe-4 justify-content-end align-items-center">
                            <button type="button" onClick={handleShow} className="icon_btnlink btn btn-primary"><img src={EvaluaBtn} className="me-1" />Evaluations</button>
                            <button type="button" onClick={() => setShowInstruction(true)} className="icon_btnlink btn btn-primary"><img src={AutomatBtn} className="me-1" />Automations</button>
                            <button type="button" onClick={() => stopappsetShow(true)} className="icon_btnlink btn btn-primary"><img src={stopBtn} className="me-1" />{jobDetails?.job_status == "Active" ? "Active" : "Stop Applications"}</button>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Tab.Container id="left-tabs-example" activeKey={reviewEventKey} onSelect={k => setReviewEventKey(k)}>
                        <Row className="bg-white">
                            <Col md={6}>
                                <Nav variant="pills" className="tab-underline tab-staic-dark ps-4">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first"><img src={Folder} className="img-fluid" alt="folder" />  &nbsp;Applications</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second"><img src={Barchart} className="img-fluid" alt="folder" /> &nbsp; Insights</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third"><img src={Review} className="img-fluid" alt="folder" />&nbsp;  Review</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="forth"><img src={Messagedot} className="img-fluid" alt="folder" /> &nbsp;Chat</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                            </Col>
                            <Col md={6} className="text-end pe-3">
                                <button className="btn btn-traspant" onClick={() => setListShow(false)}><img src={gridView} /></button>
                                <button className="btn btn-traspant"
                                    onClick={() => {
                                        setListShow(true)
                                        setListData(ListGrid.slice(0,10))
                                    }}
                                ><img src={listView} /></button>
                            </Col>
                        </Row>
                        <Row >
                            <Tab.Content className="job-kanban-panel">
                                <Tab.Pane eventKey="first">
                                    <Row className="hori_scroll evalutaion-page-tab-scroller  p-2">
                                        {ListShow && ListData?.length > 0 ? (
                                            <Card className="shadow-sm border-0 evaluations_data  rounded overflow-hidden">
                                                <Card.Header className="py-3">
                                                    <Row>
                                                        <Col md={5} className="d-flex">
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
                                                        <Col md={7} className="d-flex justify-content-end align-items-center list-kanban">

                                                            <Button className="icon_btnlink" onClick={() => handleStatusGroup('Select', selectedListUids)}>
                                                                <img src={checkgreen} className="img-fluid" />
                                                                Select</Button>
                                                            <Button className="icon_btnlink" onClick={() => handleStatusGroup('Reject', selectedListUids)}>
                                                                <img src={xcircle} className="img-fluid" />
                                                                Reject</Button>
                                                            <Button className="icon_btnlink" onClick={() => handleStatusGroup('On Hold', selectedListUids)}>
                                                                <img src={slashCircle} className="img-fluid" />

                                                                On Hold</Button>


                                                            <Button className="icon_btnlink" onClick={() => handleStatusGroup('Active', selectedListUids)}>
                                                                <img src={placeholdericon} className="img-fluid" />
                                                                Clear Round</Button>
                                                            <Button className="icon_btnlink" onClick={() => setremindModalShow(true)}>
                                                                <img src={sendmsg} className="img-fluid" />
                                                                Send Message</Button>


                                                            <Button className="icon_btnlink" onClick={() => handleStatusGroup('InActive', selectedListUids)}>
                                                                <img src={downloadicon} className="img-fluid" />
                                                                Download</Button>

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
                                                                    <th></th>
                                                                    <th colSpan={5} className="border-b">
                                                                        <div className="d-flex align-items-end justify-content-between">
                                                                            <strong>Details</strong>

                                                                            {/* <button type="button" className="btn btn-link font-sm pb-0"><i class="fas fa-plus-circle"></i></button> */}


                                                                        </div>
                                                                    </th>  <th></th>

                                                                    <th colSpan={2} className="border-b"><strong>LYWO Score</strong></th>
                                                                    <th></th>
                                                                    <th colSpan={6} className="border-b"><strong>Progress</strong></th>
                                                                    <th></th>
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
                                                                    <th></th>
                                                                    <th>Education</th>
                                                                    <th>Industry</th>
                                                                    <th>Experience</th>
                                                                    <th>Available By</th>
                                                                    <th>Location</th>
                                                                    <th></th>
                                                                    <th>Match</th>
                                                                    <th>Personality</th>
                                                                    <th></th>
                                                                    <th>Step 3</th>
                                                                    <th>Step 4</th>
                                                                    <th>Step 5</th>
                                                                    <th>Step 6</th>
                                                                    <th>Score</th>
                                                                    <th>Tag</th>
                                                                    <th></th>
                                                                    <th>Decision</th>
                                                                    <th style={{ width: "42px" }}></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {ListData.map((item, index) => (
                                                                    <tr>
                                                                        <td colSpan={2}>
                                                                            <Form.Check
                                                                                className="custom-checkbox me-2_5"
                                                                                name="group1"
                                                                                type="checkbox"
                                                                                checked={selectedListUids.includes(item?.uid)}
                                                                                onChange={() => handleCheckBoxBtn(item?.uid)}
                                                                                disabled={item?.job_applicant_status == "Reject"}
                                                                            />
                                                                            <span className="font-weight-600" style={{ textTransform: 'capitalize', cursor: 'pointer' }} onClick={() => {
                                                                                setReviewModal(true)
                                                                                setCandidateEmail(item?.job_applicant_profile?.user?.email)
                                                                                setCandidateInfo(item)
                                                                            }}>
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
                                                                        <td colSpan={2} >{item?.job_applicant_profile?.current_location}</td>
                                                                        <td>{item?.job_match_score}%</td>
                                                                        <td colSpan={2}>
                                                                            <div className="d-flex">
                                                                                <img src={User01Gray} />

                                                                                {/* <Select
                                                                                    key={index}
                                                                                    options={Object.entries(item?.job_applicant_profile?.personality || {}).map(
                                                                                    ([key, value]) => ({
                                                                                        value: value,
                                                                                        label: `${value}%`
                                                                                    })
                                                                                    )}
                                                                                    className="select-transpant"
                                                                                    styles={customStyles}
                                                                                    placeholder=""
                                                                                /> */}

                                                                                <select className="select-transpant">
                                                                                    {Object.entries(item?.job_applicant_profile?.personality).map(([key, value]) => (
                                                                                        <option>{value}%</option>
                                                                                    ))}
                                                                                </select>
                                                                                {/* <Select className="select-transpant" options={Object.entries(item?.job_applicant_profile?.personality).map(([key, value]) => ({value:value,label:`${value}%`}))} /> */}
                                                                            </div>
                                                                        </td>
                                                                        <td>Invited</td>
                                                                        <td><span className="text-elipe-40">Under Review</span></td>
                                                                        <td><span className="text-elipe-40">Under Review</span></td>
                                                                        <td><span className="text-elipe-40">Under Review</span></td>
                                                                        <td>76%</td>
                                                                        <td colSpan={2} >
                                                                            <span onClick={recallShow} className="tag tag-lightprimery" style={{ cursor: 'pointer' }} >Recall</span>
                                                                        </td>

                                                                        <td >
                                                                            <span className={`dic_tag ${coloringByStatus(item?.job_applicant_status)}`}><i class={iconByStatus(item?.job_applicant_status)}></i> {item?.job_applicant_status == "Reject" ? "Rejected" : item?.job_applicant_status == "Select" ? "Selected" : item?.job_applicant_status}</span>
                                                                        </td>
                                                                        <td className="action" style={{ width: "42px" }}>
                                                                            <Dropdown className="action_dropdown">
                                                                                <Dropdown.Toggle
                                                                                    variant="success"
                                                                                    id="dropdown-basic"
                                                                                    className="btn-transpant"
                                                                                >
                                                                                    <img src={threeDots} />
                                                                                </Dropdown.Toggle>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item href={""} onClick={() => handleStatusGroup('Inactive', item?.uid)} disabled={item?.job_applicant_status == "Reject"}>
                                                                                        Inactive
                                                                                    </Dropdown.Item>
                                                                                    <Dropdown.Item href={""} onClick={() => handleStatusGroup('Active', item?.uid)} disabled={item?.job_applicant_status == "Reject"}>
                                                                                        Active
                                                                                    </Dropdown.Item>
                                                                                    <Dropdown.Item href={""} onClick={() => handleStatusGroup('Reject', item?.uid)} disabled={item?.job_applicant_status == "Reject"}>
                                                                                        Reject
                                                                                    </Dropdown.Item>
                                                                                    <Dropdown.Item href={""} onClick={() => handleStatusGroup('On Hold', item?.uid)} disabled={item?.job_applicant_status == "Reject"}>
                                                                                        On Hold
                                                                                    </Dropdown.Item>
                                                                                    <Dropdown.Item href={""} onClick={() => handleStatusGroup('Select', item?.uid)} disabled={item?.job_applicant_status == "Reject"}>
                                                                                        Select
                                                                                    </Dropdown.Item>


                                                                                    <Dropdown.Item href={""} onClick={() => setremindModalShow(true)} >
                                                                                        Send Message
                                                                                    </Dropdown.Item>

                                                                                </Dropdown.Menu>
                                                                            </Dropdown>
                                                                        </td>
                                                                    </tr>
                                                                ))}

                                                                {/* <tr>
                                                                        <td>
                                                                            <Form.Check
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                                className="custom-checkbox me-2_5"
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
                                                                    <td colspan="2"><button type="button" class="btn-light-outline btn btn-primary" onClick={handleLoadMore}>Load More</button></td>
                                                                    <td colspan="13" class="text-end pe-3"><span class="pagination_count">Showing {ListData.length} items</span></td>
                                                                </tr>
                                                            </tfoot>
                                                        </Table>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ) : (
                                            <>
                                                {groupParameterList.map((paraName, paraIndex) => (
                                                    <Col
                                                        md={2}
                                                        key={paraName.uid}
                                                        className={expandedGroup === paraName.uid ? 'expanded-col ps-1 pe-1' : 'ps-1 pe-1'} >
                                                        <Card className="status_cardpanel">
                                                            <div className="card-header">
                                                                <h5>{paraName?.parameter_name} <span className="count">{paraName?.parameter_applicant_count}</span></h5>
                                                                {/* <button type="button"><i class="fa fa-ellipsis-h"></i></button> */}
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
                                                                {(paraName?.parameter_name !== "Application" && paraName?.parameter_name !== "Behaviour") && (
                                                                    <button type="button" onClick={() => {
                                                                        setGroupModal(true)
                                                                        setGroupParameterId(paraName?.uid)
                                                                    }} className="btn btn-link mb-3 create-group-card ms-auto me-auto">
                                                                        <i className="fa fa-plus "></i> <span className="ms-2">  Create a New Group </span>
                                                                    </button>
                                                                )}
                                                                <div className="eval-vertical-scrool ct_scrollbar ">
                                                                    {paraName?.groups_parameter?.sort((a, b) => a.id - b.id)?.map((groupItem) => (
                                                                        <>

                                                                            <div className={`sts_databox ${groupItem?.group_name.toLowerCase()}`}
                                                                                onClick={() => setExpandedGroup(prev =>
                                                                                    prev === paraName.uid ? null : paraName.uid
                                                                                )}
                                                                            >
                                                                                <div className="d-flex justify-content-between">
                                                                                    <h6>{groupItem?.group_name}
                                                                                        {(paraName?.parameter_name == "Application" || paraName?.parameter_name == "Behaviour") && (
                                                                                            <span className="count">{groupItem?.group_wise_applicant_count}</span>
                                                                                        )}
                                                                                    </h6>
                                                                                    {(paraName?.parameter_name == "Application" || paraName?.parameter_name == "Behaviour") ? (
                                                                                        ""
                                                                                    ) : (groupItem?.group_wise_applicant_count > 0 && <span className="badge bg-outline-success">{groupItem?.group_wise_applicant_count} pending</span>)}
                                                                                </div>
                                                                                <div className="remind-checkbox ">
                                                                                    <div className="d-flex justify-content-between align-items-end">
                                                                                        <Form>
                                                                                            <Form.Check
                                                                                                type="switch"
                                                                                                id="custom-switch"
                                                                                                label="Auto-Remind"
                                                                                            />
                                                                                        </Form>
                                                                                        {/* <button className="button" class="btn-transpant" onClick={() => {
                                                                                        handleListData(groupItem);
                                                                                        setGroupParameterId(paraName?.uid)
                                                                                        setGroupTitleName(groupItem?.group_name)
                                                                                        setParamUid(groupItem?.uid)
                                                                                    }}><i class="fa fa-list-ul" aria-hidden="true"></i></button> */}
                                                                                        <div className="right-cols">
                                                                                            <button className="button" class="btn-transpant me-2">
                                                                                                <img src={trash} className="img-fluid" alt="Trash" />
                                                                                            </button>

                                                                                            <button className="button" class="btn-transpant" onClick={() =>
                                                                                                // handleListData(groupItem)
                                                                                                fetchListAPIByKey(paraName?.uid, groupItem?.group_name, groupItem?.uid)
                                                                                            }>
                                                                                                {/* <i class="fa fa-list-ul" aria-hidden="true"></i> */}
                                                                                                <img src={list} className="img-fluid" alt="Trash" />


                                                                                            </button>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </>

                                                                    ))}
                                                                </div>
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
                                                <Col md="auto flex-fill col-md-2 last-row-flex-001 ps-1 pe-1">
                                                    <Card className="status_cardpanel">
                                                        <Card.Body className="text-center d-flex align-items-center justify-content-center flex-column">
                                                            <button type="button" className="btn btn-light-primery w-100" onClick={handleShow}><i className="fa fa-plus me-2"></i>Add Evaluation</button>
                                                            <button type="button" className="btn btn-white mt-2 w-100"><img src={Finalise} className="imgfluid me-2" alt="finalise" />  Finalise Selection</button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </>
                                        )}
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
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second" className="insights_tab">
                                    <Row>
                                        <Col md={12}>
                                            <div className="head-insight-filters">
                                                <ul className="head_filterlist">
                                                    <li className="active">All Candidates</li>
                                                    <li>Quiz 1</li>
                                                    <li>Quiz 2</li>
                                                    <li>Assignment 1</li>
                                                    <li>Assignment 2</li>
                                                    <li>Final Short List</li>
                                                </ul>

                                                <ul className="head_sortlist">
                                                    <li>
                                                        <OverlayTrigger
                                                            placement="left"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={renderTooltip}
                                                        >
                                                            <Dropdown className="action_dropdown">
                                                                <Dropdown.Toggle
                                                                    variant="success"
                                                                    id="dropdown-basic"
                                                                    className="btn-transpant btn-action-reorder"
                                                                >
                                                                    <img src={sorticn} className="img-fluid" alt="Sort Icon" />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="reorder-doprodown-custom" >
                                                                    <Dropdown.Item >
                                                                        <img src={Dragableicn} className="imglfluid me-2" alt="Drag icon" />
                                                                        Applicant Status
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item >
                                                                        <img src={Dragableicn} className="imglfluid me-2" alt="Drag icon" />
                                                                        Salary & Availability
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item >
                                                                        <img src={Dragableicn} className="imglfluid me-2" alt="Drag icon" />
                                                                        Personality
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item >
                                                                        <img src={Dragableicn} className="imglfluid me-2" alt="Drag icon" />
                                                                        Education
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item >
                                                                        <img src={Dragableicn} className="imglfluid me-2" alt="Drag icon" />
                                                                        Skills
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item >
                                                                        <img src={Dragableicn} className="imglfluid me-2" alt="Drag icon" />
                                                                        Experience
                                                                    </Dropdown.Item>

                                                                    <Dropdown.Item >
                                                                        <img src={Dragableicn} className="imglfluid me-2" alt="Drag icon" />
                                                                        Custom Questions
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item >
                                                                        <img src={Dragableicn} className="imglfluid me-2" alt="Drag icon" />
                                                                        Assignments
                                                                    </Dropdown.Item>
                                                                    <button className="btn btn-md btn-primary mt-3 ms-auto me-auto">Apply</button>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </OverlayTrigger>
                                                    </li>
                                                    <li><button> <img src={printicn} className="img-fluid" alt="Print icon" /></button></li>
                                                    <li><button> <img src={downloadicn} className="img-fluid" alt="Download icon" /></button></li>
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Card className="shadow-sm border-0 grap_card mt-3 radius-sm">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Applicant Status</Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp">
                                                        {/* <img src={ApplicantStaChrt} alt="" /> */}
                                                        <ApplicantStatusGraph InsightsGraphData={InsightsGraphData} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Card className="shadow-sm border-0 grap_card mt-3 radius-sm">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Availability Of candidates</Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp avialable-candinate-chart">
                                                        {/* <img src={AvabCandite} alt="" /> */}
                                                        <AvailabilityPieChart InsightsGraphData={InsightsGraphData} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card className="shadow-sm border-0 grap_card mt-3 radius-sm experience-chart">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Salary Range  (₹ LPA)</Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp salary-range-chart">
                                                        {/* <img src={SaleryRange} alt="" /> */}
                                                        <SalaryRangeGraph InsightsGraphData={InsightsGraphData} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Card className="shadow-sm border-0 grap_card mt-3 radius-sm">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Personality</Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp">
                                                        {/* <img src={PersonalityGrp} alt="" /> */}
                                                        <PersonalityGraph InsightsGraphData={InsightsGraphData} personalityAll={personalityAll} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Card className="avialable-candinate-chart shadow-sm border-0 grap_card mt-3 radius-sm area-ofeducation-chart">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Areas Of Education</Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp">
                                                        {/* <img src={AvabCandite} alt="" /> */}
                                                        <AreaEducationChart InsightsGraphData={InsightsGraphData} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card className="shadow-sm border-0 grap_card mt-3 radius-sm">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Education Level </Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp">
                                                        {/* <img src={SaleryRange} alt="" /> */}
                                                        <EducationLevelGraph InsightsGraphData={InsightsGraphData} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Card className="shadow-sm border-0 grap_card mt-3 radius-sm">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Skills</Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp">
                                                        {/* <img src={PersonalityGrp} alt="" /> */}
                                                        <SkillGraphComponent InsightsGraphData={InsightsGraphData} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Card className="shadow-sm border-0 grap_card mt-3 radius-sm avialable-candinate-chart ">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Past Industry Experience </Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp">
                                                        {/* <img src={AvabCandite} alt="" /> */}
                                                        <IndustryExperienceChart InsightsGraphData={InsightsGraphData} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card className="shadow-sm border-0 grap_card mt-3 radius-sm experience-chart">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Card.Title>Experience</Card.Title>
                                                        <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                    </div>
                                                    <div className="chart_warp">
                                                        {/* <img src={SaleryRange} alt="" /> */}
                                                        <ExperienceGraphComponent InsightsGraphData={InsightsGraphData} />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {InsightsGraphData?.custom_question_data?.map((item, index) => (
                                            <Col md={6}>
                                                <Card className="shadow-sm border-0 grap_card mt-3 radius-sm avialable-candinate-chart">
                                                    <Card.Body>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <Card.Title>{index == 0 && "Custom Questions"}</Card.Title>
                                                            <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                        </div>
                                                        <div className="chart_warp">
                                                            <CustomerChartComponent InsightsGraphData={item} index={index} />
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}

                                        {AssetGraphData?.map((item, index) => (
                                            <Col md={6}>
                                                <Card className="shadow-sm border-0 grap_card mt-3 radius-sm experience-chart assets-chart">
                                                    <Card.Body>
                                                        <Row className="align-items-center">
                                                            <Col md="6">
                                                                {item?.title}
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <Form.Label
                                                                        className="mb-0"
                                                                        style={{ color: ids.includes(index) ? "grey" : "black", }}
                                                                    >
                                                                        {!ids.includes(index) ? "Over all Score" : "Over all Score"}
                                                                    </Form.Label>

                                                                    <Form.Check
                                                                        type="switch"
                                                                        id="custom-switch"
                                                                        // checked={isYes?.CurrentlyWorkingToggle}
                                                                        // onChange={() => setMode(!mode)}
                                                                        onChange={() => handleSwitchgraph(index)}
                                                                    />

                                                                    <Form.Label
                                                                        className="mb-0"
                                                                        style={{ color: ids.includes(index) ? "black" : "grey", }}
                                                                    >
                                                                        {ids.includes(index) ? "Section wise Scores" : "Section wise Scores"}
                                                                    </Form.Label>

                                                                    <button className="btn-icon"><img src={CopyBtn} alt="" /></button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="chart_warp">
                                                            <AssetOverAllGraphComponent
                                                                key={index}
                                                                overallData={item.overallData}
                                                                sectionWiseData={item.sectionWiseData}
                                                                sectionNames={item.sectionNames} idsMode={ids.includes(index)} />
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    {/* <Row>
                                        
                                        </Row> */}
                                </Tab.Pane>
                                {/* <Tab.Pane eventKey="second">Second tab content</Tab.Pane> */}
                                <Tab.Pane eventKey="third">
                                    <Card className="rounded border-0 review_card">
                                        <Card.Header className="review-sticky" >
                                            <Row>
                                                <Col md={6}>
                                                    {/* <Form.Select className="select-md-transpant" onChange={handleTestJob}>
                                                            {assignmentReviewList.map((Val) => (
                                                                <option value={Val?.uid} >{Val?.asset_title}</option>
                                                            ))}                                                       
                                                        </Form.Select> */}
                                                    <Select
                                                        options={assignmentListOption}
                                                        onChange={handleTestJob}
                                                        defaultValue={assignmentListOption[0]}
                                                        className="select-md-transpant react_selectbox select-default"
                                                    />
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
                                                    <Col md={2} className="queslsit_panel scroll-column">
                                                        {/* <Form.Select className="qs_dropdown" onChange={handleSectionWise}>
                                                                {item?.section_asset.map((cVal) => (
                                                                    <option value={cVal?.uid}>{cVal?.section_title}</option>
                                                                ))}
                                                            </Form.Select> */}
                                                        <Select
                                                            options={sectionAssetfun(item?.section_asset)}
                                                            onChange={handleSectionWise}
                                                            defaultValue={sectionAssetfun(item?.section_asset)[0]}
                                                            className="qs_dropdown react_selectbox"
                                                            styles={customStyles}
                                                        />
                                                        <ul className="queslsit">
                                                            {sectionWiseData[0]?.question_section?.map((QuesItem, quesIndex) => (
                                                                <li onClick={() => handleSectionQuestionbyuser(QuesItem)} className={`${QuesItem.uid == questionWiseData.uid && "question-active"}`} >
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
                                                            {/* <li className="justify-content-center">
                                                                <button type="button" className="btn-transpant"><img src={ArrowDownDark} /></button>
                                                            </li> */}
                                                        </ul>
                                                    </Col>
                                                ))}

                                                <Col md={10} className="ans_panel">
                                                    <div className="question-box-eval">
                                                        <div className="que_head">
                                                            <p class="text-sm">{questionWiseData?.question_title}</p>
                                                        </div>
                                                        <Row className="my-3 mb-0">
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
                                                                    <li className={activeTab === "evaluated" ? "active" : ""} onClick={handleEvaluated}>Evaluated</li>
                                                                    <li className={activeTab === "pending" ? "active" : ""} onClick={handlePending}>Pending</li>
                                                                    <li className={activeTab === "all" ? "active" : ""} onClick={handleAllEvaiPend}>All</li>
                                                                </ul>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                    <div className="ans_body">

                                                        <div className="all_anslist">
                                                            {questionWiseData?.user_answer_question?.map((user, index) => (
                                                                <Card className="ans_card"  >
                                                                    <Card.Header className="p-0 pb-2 d-flex align-items-center justify-content-between">

                                                                        <Card.Title>
                                                                            {user?.job_applicant?.job_applicant_profile?.user?.username}
                                                                        </Card.Title>

                                                                        <div className="d-flex">

                                                                            <Ratting rating={rating} setRating={setRating} ID={user?.uid} getJobAssignmentReviewList={getJobAssignmentReviewList} questionWiseData={questionWiseData} />

                                                                            {/* <button onClick={() => handleReviewModal(user)} type="button" className="btn-transpant ms-4">
                                                                                    <img src={ExpandButton} alt="" />
                                                                                </button> */}

                                                                            {/* reviewModal */}




                                                                            <button
                                                                                onClick={() => {
                                                                                    setSelectedUser(user);
                                                                                    setAnswerModal(true);  // New
                                                                                }}
                                                                                type="button" className="btn-transpant ms-4"
                                                                            >
                                                                                <img src={ExpandButton} alt="Expand" />
                                                                            </button>

                                                                        </div>
                                                                    </Card.Header>
                                                                    <Card.Body className="px-0 pb-0">
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

                                <Tab.Pane eventKey="forth">
                                    <Card className="rounded border-0 review_card">
                                        <div className="p-3 tab-content">
                                            <div className="row g-0 "  >
                                                <CandidateChat jobDetails={jobDetails} />
                                            </div>
                                        </div>
                                    </Card>
                                </Tab.Pane>


                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </Container>
            </div >
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
                                                    className="custom-checkbox"
                                                    id="1"
                                                    type="checkbox"
                                                    label="0% - 50%"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
                                                    id="2"
                                                    type="checkbox"
                                                    label="50% - 70%"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
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
                                                    className="custom-checkbox"
                                                    id="leader"
                                                    type="checkbox"
                                                    label="Leader"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
                                                    id="influencer2"
                                                    type="checkbox"
                                                    label="Influencer"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
                                                    id="team"
                                                    type="checkbox"
                                                    label="Team Player"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
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
                                                    className="custom-checkbox"
                                                    id="4"
                                                    type="checkbox"
                                                    label="Shortlisted"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
                                                    id="5"
                                                    type="checkbox"
                                                    label="On Hold"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
                                                    id="6"
                                                    type="checkbox"
                                                    label="Rejected"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
                                                    id="7"
                                                    type="checkbox"
                                                    label="Review Pending"
                                                />
                                            </li>
                                            <li>
                                                <Form.Check
                                                    className="custom-checkbox"
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
            </Offcanvas >

            {/* ======Automation Group====== */}

            <Offcanvas
                show={showInstruction}
                onHide={handleInstructionModel}
                backdrop={true}
                placement="end"
                className="lg-drawer automate-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Automation Settings
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="filter_warp">
                    <p style={{ fontSize: "12px", lineHeight: "18px" }} >Nullam fringilla placerat diam vel lacinia. Integer malesuada turpis vitae ipsum imperdiet laoreet. Ut ut tempor urna, vitae egestas arcu. Maecenas a leo in lectus aliquam suscipit sit amet eget mauris. Aenean ac euismod nunc.</p>

                    <div className="automation-setting-box">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Auto Reminder</Accordion.Header>
                                <Accordion.Body className="pt-0">
                                    <div className="autoremider-body">
                                        <Tabs
                                            defaultActiveKey="Application"
                                            id="automation-tab-example"
                                            className="mb-3"
                                        >
                                            <Tab eventKey="Application" title="Application">
                                                <Form.Group className="mb-2">
                                                    <Form.Label>
                                                        Reminder Interval
                                                    </Form.Label>
                                                    <div className="row p-2">
                                                        <div className="col-md-2 ps-1 pe-1">
                                                            <Form.Control
                                                                type="text"
                                                                id="inputText5"
                                                                aria-describedby="passwordHelpBlock"
                                                                placeholder="Every 1"
                                                                style={{ height: '38px' }}
                                                            />
                                                        </div>
                                                        <div className="col-md-2  ps-1 pe-1">
                                                            <Select
                                                                className="react_selectbox"
                                                                options={[
                                                                    { value: 'day', label: 'Day' },
                                                                    { value: 'Night', label: 'Night' }
                                                                ]}
                                                                defaultValue={{ value: 'day', label: 'Day' }}
                                                                isSearchable={false}
                                                                onChange={(selectedOption) => console.log(selectedOption)}
                                                                styles={customStyles}
                                                            />
                                                        </div>
                                                        <div className="col-md-2  ps-1 pe-1">
                                                            <Select
                                                                className="react_selectbox"
                                                                options={[
                                                                    { value: 'untilcompleted', label: 'Until Completed' },
                                                                    { value: 'completed', label: 'Completed' }
                                                                ]}
                                                                defaultValue={{ value: 'untilcompleted', label: 'Until Completed' }}
                                                                isSearchable={false}
                                                                onChange={(selectedOption) => console.log(selectedOption)}
                                                                // onChange={handleSelectedLikeItems}
                                                                styles={customStyles}
                                                            />
                                                        </div>
                                                        <div className="col-md-2 d-flex align-items-center  ps-1 pe-1">
                                                            <Form.Check // prettier-ignore
                                                                type="switch"
                                                                id="custom-switch"
                                                                label="Auto Remind"
                                                                className="mt-1"

                                                            />
                                                        </div>
                                                    </div>
                                                </Form.Group>

                                                <Form.Group className="mb-2" controlId="jobDescription">
                                                    <Form.Label>
                                                        Message Template
                                                    </Form.Label>

                                                    <div className="texteditor_warp" onClick={handleWrapperClick}>
                                                        <ReactQuill
                                                            value={description}
                                                            onChange={handleEditorChange}
                                                            theme="snow"
                                                            ref={quillRef}
                                                            className="custom-quill"
                                                            modules={{
                                                                toolbar: [["bold", "italic", "underline", "strike"], ["link"]],
                                                            }}
                                                        />


                                                    </div>

                                                    <div className="d-flex justify-content-between custom-checkbox mt-3">
                                                        <Form.Check // prettier-ignore
                                                            type="checkbox"
                                                            id={`default-checkbox`}
                                                            label={`Do not prompt me to edit emails every time i enable automation. `}
                                                        />

                                                        <Button variant="primary" style={{ color: '#fff' }} onClick={handleSaveTemplate}  >Save Template</Button>
                                                    </div>

                                                    {descriptionError && (
                                                        <div className="error">{descriptionError}</div>
                                                    )}
                                                    {errors.detailed_description && (
                                                        <div className="error">{errors.detailed_description}</div>
                                                    )}
                                                </Form.Group>

                                            </Tab>
                                            <Tab eventKey="Behaviour" title="Behaviour">
                                                Tab content for Behaviour
                                            </Tab>
                                            <Tab eventKey="Testquiz" title="Test Quiz" >
                                                Tab content for Test Quiz
                                            </Tab>
                                            <Tab eventKey="Assignment" title="Assignment" >
                                                Tab content for Assignment
                                            </Tab>
                                        </Tabs>
                                    </div>


                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Auto Short List  <Form className="ms-3">
                                    <Form.Check
                                        type="switch"
                                        id="auto-switch"
                                        label="Enable auto shortlist throughout the pipeline"
                                    />
                                </Form> </Accordion.Header>
                                <Accordion.Body className="pt-0">
                                    <div className="autoremider-body">
                                        <Tabs
                                            defaultActiveKey="Application"
                                            id="automation-tab-example"
                                            className="mb-3"
                                        >
                                            <Tab eventKey="Application" title="Application">

                                                <Form.Group className="mb-2" controlId="jobDescription">
                                                    <Form.Label>
                                                        Message Template
                                                    </Form.Label>

                                                    <div className="texteditor_warp" onClick={handleWrapperClick}>
                                                        <ReactQuill
                                                            value={description}
                                                            onChange={handleEditorChange1}
                                                            theme="snow"
                                                            ref={quillRef}
                                                            modules={{
                                                                toolbar: [["bold", "italic", "underline", "strike"], ["link"]],
                                                            }}
                                                        />


                                                    </div>

                                                    <div className="d-flex justify-content-between custom-checkbox mt-3">
                                                        <Form.Check // prettier-ignore
                                                            type="checkbox"
                                                            id={`default-checkbox`}
                                                            label={`Do not prompt me to edit emails every time i enable automation. `}
                                                        />

                                                        <Button variant="primary" style={{ color: '#fff' }}   >Save Template</Button>
                                                    </div>

                                                    {descriptionError && (
                                                        <div className="error">{descriptionError}</div>
                                                    )}
                                                    {errors.detailed_description && (
                                                        <div className="error">{errors.detailed_description}</div>
                                                    )}
                                                </Form.Group>

                                            </Tab>
                                            <Tab eventKey="Behaviour" title="Behaviour">
                                                Tab content for Behaviour
                                            </Tab>
                                            <Tab eventKey="Testquiz" title="Test Quiz" >
                                                Tab content for Test Quiz
                                            </Tab>
                                            <Tab eventKey="Assignment" title="Assignment" >
                                                Tab content for Assignment
                                            </Tab>
                                        </Tabs>
                                    </div>

                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Rejected candidates response </Accordion.Header>
                                <Accordion.Body className="pt-0">
                                    <div className="autoremider-body">
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch-2"
                                            label="Enable auto reject throughout the pipeline (Poor Group only)"
                                        />

                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch-3"
                                            label="Auto Reject Candidates who have not been selected once the job application is closed "
                                        />
                                        <Tabs
                                            defaultActiveKey="Application"
                                            id="automation-tab-example"
                                            className="mb-3"
                                        >
                                            <Tab eventKey="Application" title="Application">


                                                <Form.Group className="mb-2" controlId="jobDescription">
                                                    <Form.Label>
                                                        Message Template
                                                    </Form.Label>

                                                    <div className="texteditor_warp" onClick={handleWrapperClick}>
                                                        <ReactQuill
                                                            value={description}
                                                            onChange={handleEditorChange2}
                                                            theme="snow"
                                                            ref={quillRef}
                                                            modules={{
                                                                toolbar: [["bold", "italic", "underline", "strike"], ["link"]],
                                                            }}
                                                        />


                                                    </div>

                                                    <div className="d-flex justify-content-between custom-checkbox mt-3">
                                                        <Form.Check // prettier-ignore
                                                            type="checkbox"
                                                            id={`default-checkbox`}
                                                            label={`Do not prompt me to edit emails every time i enable automation. `}
                                                        />

                                                        <Button variant="primary" style={{ color: '#fff' }}  >Save Template</Button>
                                                    </div>

                                                    {descriptionError && (
                                                        <div className="error">{descriptionError}</div>
                                                    )}
                                                    {errors.detailed_description && (
                                                        <div className="error">{errors.detailed_description}</div>
                                                    )}
                                                </Form.Group>

                                            </Tab>
                                            <Tab eventKey="Behaviour" title="Behaviour">
                                                Tab content for Behaviour
                                            </Tab>
                                            <Tab eventKey="Testquiz" title="Test Quiz" >
                                                Tab content for Test Quiz
                                            </Tab>
                                            <Tab eventKey="Assignment" title="Assignment" >
                                                Tab content for Assignment
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Finalised Candidates response</Accordion.Header>
                                <Accordion.Body className="pt-0">
                                    <div className="autoremider-body">
                                        <Form.Check // prettier-ignore
                                            type="switch"
                                            id="custom-switch-3"
                                            label="Send Auto Response to user who have been shortlised"
                                        />
                                        <Form.Group className="mb-2" controlId="jobDescription">
                                            <Form.Label>
                                                Message Template
                                            </Form.Label>

                                            <div className="texteditor_warp" onClick={handleWrapperClick}>
                                                <ReactQuill
                                                    value={description}
                                                    onChange={handleEditorChange3}
                                                    theme="snow"
                                                    ref={quillRef}
                                                    modules={{
                                                        toolbar: [["bold", "italic", "underline", "strike"], ["link"]],
                                                    }}
                                                />
                                            </div>

                                            <div className="d-flex justify-content-between custom-checkbox mt-3">
                                                <Form.Check // prettier-ignore
                                                    type="checkbox"
                                                    id={`default-checkbox`}
                                                    label={`Do not prompt me to edit emails every time i enable automation. `}
                                                />

                                                <Button variant="primary" style={{ color: '#fff' }}  >Save Template</Button>
                                            </div>

                                            {descriptionError && (
                                                <div className="error">{descriptionError}</div>
                                            )}
                                            {errors.detailed_description && (
                                                <div className="error">{errors.detailed_description}</div>
                                            )}
                                        </Form.Group>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Offcanvas.Body>

            </Offcanvas>

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
                                                                            className="custom-checkbox me-1"
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
                                                                            className="custom-checkbox me-1"
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
                                                                            className="custom-checkbox me-1"
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
                                                                            className="custom-checkbox me-1"
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
                                                                            className="custom-checkbox me-1"
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
                payloadList={payloadList} setPayloadList={setPayloadList}
                getJobGroupParameterMethod={getFilterApplicantListBycandidateReview}
            />
            {/*======Answer======*/}
            <Offcanvas
                show={answerModal}
                onHide={() => {
                    setAnswerModal(false);
                    setSelectedUser(null);
                }}
                backdrop={true}
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
                            <Card.Title>{currentItem?.job_applicant?.job_applicant_profile?.user?.username}</Card.Title>
                            <Ratting rating={rating} setRating={setRating} ID={currentItem?.uid} getJobAssignmentReviewList={getJobAssignmentReviewList} questionWiseData={questionWiseData} />
                        </Card.Header>
                        <Card.Body className="px-0 pb-0">
                            {currentItem?.text && (
                                <Card.Text>{currentItem?.text?.replace(/<[^>]*>/g, '')}</Card.Text>
                            )}
                            {getFileType(currentItem?.attach_or_video) === "image" && (
                                <img src={`https://bittrend.shubansoftware.com${currentItem?.attach_or_video}`} className="img-fluid" />
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
            {/*======Applicant Profile======*/}
            <Offcanvas
                show={reviewModal}
                onHide={handleReviewClose}
                backdrop={true}
                placement="end"
                className="apcnt_prfle lg-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <h5>{candidateDetails?.user?.username}</h5>
                        <div className="d-flex">
                            <p className="subtitle">Assignment for Figma Designer</p>
                            <span className="status">Incomplete</span>
                        </div>
                    </Offcanvas.Title>
                    <div className="d-flex ml-auto">
                        <Button variant="link" onClick={() => setremindModalShow(true)} className="btn-sm btn-link-muted" disabled={candidateInfo?.job_applicant_status == "Reject"}><img className="me-2" src={SReminder} />Send Reminder</Button>
                        <Button variant="link" onClick={() => holdappsetShow(true)} className="btn-sm btn-link-muted" disabled={candidateInfo?.job_applicant_status == "Reject"}><img className="me-2" src={Hold} />Hold</Button>
                        <Button variant="link" onClick={() => setModalShow(true)} className="btn-sm btn-link-muted" disabled={candidateInfo?.job_applicant_status == "Reject"}><img className="me-2" src={Reject} />Reject</Button>
                        <Button variant="link" onClick={() => sortmodalsetShow(true)} className="btn-sm btn-link-muted" disabled={candidateInfo?.job_applicant_status == "Reject"}><img className="me-2" src={ShortList} />Short List</Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {candidateQuestionShow ? (
                        <CandidateQuestionList data={candidateQuestionList} />
                    ) : (
                        <Row>
                            <Col md={9}>
                                <Tab.Container id="left-tabs-example" defaultActiveKey="Application">
                                    <Nav variant="pills" className="tab-underline under-border-2">
                                        <Nav.Item>
                                            <Nav.Link eventKey="Application">Application </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Resume">Resume</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Personality">Personality</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Evaluations">Evaluations</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="Messages">Messages <span className="count badge ms-2">1</span></Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="Application">
                                            <Step1 candidateDetails={candidateDetails} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Resume">
                                            <Step2 candidateDetails={candidateDetails} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Personality">
                                            <Step3 applicantPersonality={applicantPersonality} personalityData={personalityData} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Evaluations">
                                            <Step4 data={assetData} setCandidateQuestionShow={setCandidateQuestionShow}
                                                setCandidateQuestionList={setCandidateQuestionList} handleReviewClose={handleReviewClose} setReviewEventKey={setReviewEventKey} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Messages">
                                            <Step5 data={assetData} reviewModal={reviewModal} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Col>
                            <Col md={3}>
                                <SideCard candidateDetails={candidateDetails} applicantPersonality={applicantPersonality} data={assetData} />
                            </Col>
                        </Row>
                    )}
                </Offcanvas.Body>
            </Offcanvas>


            {/* Reject Model */}

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                centered
                className="model-md custom-backdrop-2 comman-model"
                backdropClassName="custom-backdrop"
            >
                <Modal.Header closeButton style={
                    {
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                    }
                }>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Do you wish to reject {candidateInfo?.job_applicant_profile?.user?.username}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-2" controlId="jobDescription">
                        <Form.Label>
                            Message Template
                        </Form.Label>

                        <div className="texteditor_warp" onClick={handleWrapperClick}>
                            <ReactQuill
                                value={description}
                                onChange={handleEditorChange}
                                theme="snow"
                                ref={quillRef}
                                className="custom-quill "
                                modules={{
                                    toolbar: [["bold", "italic", "underline", "strike"], ["link"]],
                                }}
                            // style={{ 
                            //     minHeight: '200px',
                            //     height: 'auto'
                            // }}
                            />
                        </div>

                        <div className="d-flex justify-content-between custom-checkbox align-items-center mt-3">
                            <Form.Check // prettier-ignore
                                type="checkbox"
                                id={`default-checkbox`}
                                label={`Update Template`}
                                style={{ fontSize: '12px', lineHeight: '18px', marginLeft: '6px' }}
                            />

                            <div className="jobs-footer text-end">
                                <Button
                                    variant="light"
                                    className="me-3"
                                    style={{ fontSize: '12px', lineHeight: '18px', width: '113px', height: '38px' }}
                                    onClick={() => setDescription("")}
                                >
                                    Clear All
                                </Button>
                                <Button onClick={() => handleStatusGroup('Reject', candidateInfo?.uid)} variant="primary" style={{ fontSize: '12px', lineHeight: '18px', width: '113px', height: '38px' }} >
                                    Reject
                                </Button>
                            </div>

                        </div>

                        {descriptionError && (
                            <div className="error">{descriptionError}</div>
                        )}
                        {errors.detailed_description && (
                            <div className="error">{errors.detailed_description}</div>
                        )}
                    </Form.Group>

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setModalShow(false)} className="btn btn-primary" >Reject</Button>
                </Modal.Footer> */}
            </Modal>



            {/* Send Message Model */}

            <Modal
                show={remindmodalShow}
                onHide={() => setremindModalShow(false)}
                centered
                className="model-md custom-backdrop-2 comman-model"
                backdropClassName="custom-backdrop"
            >
                <Modal.Header closeButton style={
                    {
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                    }
                }>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Send Reminder
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Label>
                            Reminder Interval
                        </Form.Label>
                        <div className="row p-2">
                            <div className="col-md-3 ps-1 pe-1">
                                <Form.Control
                                    type="text"
                                    id="inputText5"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Every 1"
                                    style={{ minHeight: '37px' }}
                                />
                            </div>
                            <div className="col-md-3  ps-1 pe-1">
                                <Select
                                    className="react_selectbox"
                                    options={[
                                        { value: 'day', label: 'Day' },
                                        { value: 'Night', label: 'Night' }
                                    ]}
                                    defaultValue={{ value: 'day', label: 'Day' }}
                                    isSearchable={false}
                                    onChange={(selectedOption) => console.log(selectedOption)}
                                    styles={customStyles}
                                />
                            </div>
                            <div className="col-md-3  ps-1 pe-1">
                                <Select
                                    className="react_selectbox"
                                    options={[
                                        { value: 'untilcompleted', label: 'Until Completed' },
                                        { value: 'completed', label: 'Completed' }
                                    ]}
                                    defaultValue={{ value: 'untilcompleted', label: 'Until Completed' }}
                                    isSearchable={false}
                                    onChange={(selectedOption) => console.log(selectedOption)}
                                    // onChange={handleSelectedLikeItems}
                                    styles={customStyles}
                                />
                            </div>
                            <div className="col-md-3 d-flex align-items-center  ps-1 pe-1">

                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    label="Auto Remind"
                                    className="mt-1"
                                    style={{ fontSize: '12px', lineHeight: '18px', fontWeight: '500' }}

                                />
                            </div>

                        </div>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="jobDescription">
                        <Form.Label>
                            Message Template
                        </Form.Label>

                        <div className="texteditor_warp" onClick={handleWrapperClick}>
                            <ReactQuill
                                value={description}
                                onChange={handleEditorChange}
                                theme="snow"
                                ref={quillRef}
                                className="custom-quill"
                                modules={{
                                    toolbar: [["bold", "italic", "underline", "strike"], ["link"]],
                                }}
                            />
                        </div>

                        <div className="d-flex justify-content-between custom-checkbox align-items-center mt-3">
                            <Form.Check // prettier-ignore
                                type="checkbox"
                                id={`default-checkbox`}
                                label={`Update Template`}
                                style={{ fontSize: '12px', lineHeight: '18px', marginLeft: '6px' }}
                            />

                            <div className="jobs-footer text-end">
                                <Button
                                    variant="light"
                                    className="me-3"
                                    style={{ fontSize: '12px', lineHeight: '18px', width: '113px', height: '38px' }}
                                >
                                    Clear All
                                </Button>
                                <Button onClick={handleClose} variant="primary" style={{ fontSize: '12px', lineHeight: '18px', width: '160px', height: '38px' }} >
                                    Send Message
                                </Button>
                            </div>

                        </div>

                        {descriptionError && (
                            <div className="error">{descriptionError}</div>
                        )}
                        {errors.detailed_description && (
                            <div className="error">{errors.detailed_description}</div>
                        )}
                    </Form.Group>

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setModalShow(false)} className="btn btn-primary" >Reject</Button>
                </Modal.Footer> */}
            </Modal>


            {/* OnHold Model */}


            <Modal
                show={holdappshow}
                onHide={holdappClose}
                className="confirmation-model custom-backdrop-2 comman-model"
                backdropClassName="custom-backdrop"
                centered>
                <Modal.Header closeButton style={
                    {
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                    }
                }>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Do you want to put {candidateInfo?.job_applicant_profile?.user?.username} on hold?</h4>
                    <p>This will keep the candidate <br></br> at the current stage.</p>
                    <div className="jobs-footer text-end d-flex justify-content-between mt-3">
                        <Button
                            variant="light"
                            className="me-3 w-50 btn btn-outline"
                            //style={{fontSize:'12px', lineHeight:'18px', width:'113px', height:'38px'}}
                            onClick={holdappClose}
                        >
                            No
                        </Button>
                        <Button className="w-50 btn btn-primary" variant="primary"
                            // style={{fontSize:'12px', lineHeight:'18px', width:'113px', height:'38px'}}
                            onClick={() => handleStatusGroup('On Hold', candidateInfo?.uid)}
                        >
                            Yes
                        </Button>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
          <Button variant="secondary" onClick={recallClose}>
            Close
          </Button>
          <Button variant="primary" onClick={recallClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
            </Modal>
            {/* shortlist */}
            <Modal
                show={sortmodalshow}
                onHide={() => sortmodalsetShow(false)}
                centered
                className="model-md custom-backdrop-2 sort-list-modal comman-model"
                backdropClassName="custom-backdrop"
            >
                <Modal.Header closeButton style={
                    {
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                    }
                }>
                    <div>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Do you wish to shortlist {candidateInfo?.job_applicant_profile?.user?.username}?
                        </Modal.Title>
                        <p className="mb-0 " style={{ fontSize: '14px', lineHeight: '24px' }}>Shortlist will add the candidate to the Final Selection.</p>
                    </div>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-2" controlId="jobDescription">
                        <Form.Label>
                            Message
                        </Form.Label>

                        <div className="texteditor_warp" onClick={handleWrapperClick}>
                            <ReactQuill
                                value={description}
                                onChange={handleEditorChange}
                                theme="snow"
                                ref={quillRef}
                                className="custom-quill "
                                modules={{
                                    toolbar: [["bold", "italic", "underline", "strike"], ["link"]],
                                }}
                            // style={{ 
                            //     minHeight: '200px',
                            //     height: 'auto'
                            // }}
                            />
                        </div>

                        <div className="d-flex justify-content-between custom-checkbox align-items-center mt-3">
                            <Form.Check // prettier-ignore
                                type="checkbox"
                                id={`default-checkbox`}
                                label={`Update Template`}
                                style={{ fontSize: '12px', lineHeight: '18px', marginLeft: '6px' }}
                            />

                            <div className="jobs-footer text-end">
                                <Button
                                    variant="light"
                                    className="me-3"
                                    style={{ fontSize: '12px', lineHeight: '18px', width: '113px', height: '38px' }}
                                    onClick={() => setDescription("")}
                                >
                                    Clear All
                                </Button>
                                <Button onClick={() => handleStatusGroup('Select', candidateInfo?.uid)} variant="primary" style={{ fontSize: '12px', lineHeight: '18px', width: '113px', height: '38px' }} >
                                    ShortList
                                </Button>
                            </div>

                        </div>

                        {descriptionError && (
                            <div className="error">{descriptionError}</div>
                        )}
                        {errors.detailed_description && (
                            <div className="error">{errors.detailed_description}</div>
                        )}
                    </Form.Group>

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setModalShow(false)} className="btn btn-primary" >Reject</Button>
                </Modal.Footer> */}
            </Modal>

            {/* recall */}



            <Modal show={recallshow} className="comman-model" onHide={recallClose} centered>
                <Modal.Header closeButton style={
                    {
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                    }
                }>
                    <Modal.Title>Add Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p style={{ fontSize: '12px', lineHeight: '18px', fontWeight: '500', color: '#344054' }}>Tags</p>
                    <div className="tagarea">

                    </div>




                    <div className="jobs-footer text-end d-flex justify-content-between mt-3">
                        <Button
                            variant="light"
                            className="me-3 w-50 btn btn-outline"
                            //style={{fontSize:'16px', lineHeight:'24px', width:'113px', height:'38px'}}
                            onClick={recallClose}
                        >
                            Reset
                        </Button>
                        <Button className="w-50 btn btn-primary" variant="primary"
                        //style={{fontSize:'16px', lineHeight:'24px', width:'113px', height:'38px'}} 
                        >
                            Save
                        </Button>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
          <Button variant="secondary" onClick={recallClose}>
            Close
          </Button>
          <Button variant="primary" onClick={recallClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
            </Modal>


            {/* stop application model */}


            <Modal show={stopappshow} onHide={stopappClose} className="confirmation-model comman-model" centered>
                <Modal.Header closeButton style={
                    {
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                    }
                }>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h4>Are you sure you wish to {jobDetails?.job_status == "Application-Stopped" ? "restart" : "stop"}  applications for the job?</h4>
                    <p>You will no longer receive new applications for the job.</p>
                    <div className="jobs-footer text-end d-flex justify-content-between mt-3">
                        <Button
                            variant="light"
                            className="me-3 w-50 btn btn-outline"
                            //style={{fontSize:'12px', lineHeight:'18px', width:'113px', height:'38px'}}
                            onClick={stopappClose}
                        >
                            Reset
                        </Button>
                        <Button className="w-50 btn btn-primary" variant="primary"
                            onClick={() => handleCommonEvent(jobDetails?.job_status == "Application-Stopped" ? "Active" : "Application-Stopped")}
                        // style={{fontSize:'12px', lineHeight:'18px', width:'113px', height:'38px'}}
                        >
                            Save
                        </Button>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
          <Button variant="secondary" onClick={recallClose}>
            Close
          </Button>
          <Button variant="primary" onClick={recallClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
            </Modal>
        </>
    );
};

export default JobReview;