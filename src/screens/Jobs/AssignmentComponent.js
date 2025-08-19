import React, { useEffect, useRef, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
    Accordion,
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    Form,
    InputGroup,
    Modal,
    Nav,
    ProgressBar,
    Row,
    Spinner,
    Tab,
    Table,
} from "react-bootstrap";
import Select from "react-select";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import faRingicon from "../../images/icons/Ring.svg";
import checkVerified from "../../images/icons/check-verified-02.svg";
import clockStopwatch from "../../images/icons/clock-stopwatch.svg";
import threeDots from "../../images/icons/dots-vertical_icon.svg";
import expandIcon from "../../images/icons/expand-01.svg";
import eyePrimery from "../../images/icons/eye_icon_primery.svg";
import fileIcon from "../../images/icons/file_icon.svg";
import listQuestions from "../../images/icons/list-question.svg";
import mcqIcon from "../../images/icons/mcq_icon.png";
import quizIcon from "../../images/icons/quiz_icon.svg";
import clock from "../../images/icons/clock.svg";
import logoIcon from "../../images/logo_icon.png";

import Headericn from "../../images/icons/flex-align-top.svg";
import gridicn from "../../images/icons/question.svg";
import instructionicn from "../../images/icons/help-circle.svg";
import saveicn from "../../images/icons/save-s01.svg";

import {
    ApplicationDeatilsApi,
    ApplicationFormDetailsApi,
    EvalationAssestDetails,
    EvalationAssestList,
    getAssetDataDetailsAPI,
    PostQuizDataApi,
} from "../../services/provider";
import sectionIcon from "../../images/icons/sections_icon.svg";
import questionIcon from "../../images/icons/questions_icon.svg";
import mandatoryIcon from "../../images/icons/mandatory_icon.svg";
import timerIcon from "../../images/icons/timer_icon.svg";
import saveProssIcon from "../../images/icons/save_progress.svg";
import ngtscoringIcon from "../../images/icons/negative_scoring.svg";
import belltedArrow from "../../images/icons/bullt_arrow.svg";
import attachmentPin from "../../images/icons/attachment_pin.svg";
import videoRecoder from "../../images/icons/video-recorder.svg";
import cloudUpload from "../../images/icons/upload-cloud-02.svg";
import CollapsedButton from "../../images/icons/CollapsedButton.svg";
import NotAllowed from "../../images/icons/NotAllowed.svg";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { removeToken } from "../../helpers/helper";
import TestInstruction from "./TestInstruction";
import DragDrop from "../../images/icons/dragdrop-bullet.svg";
import ReactQuill from "react-quill";
import MediaRecorderComponent from "../../components/MediaRecorderComponent";
import VideoRecorderComponent from "../../components/VideoRecordingComponent";
import AudioRecorder from "../../components/AudioRecoding";
import InstructionAssignment from "./InstructionAssignment";

const AssignmentComponent = (item) => {
    const { id } = useParams();
    const jobdetail = useLocation();
    const [show, setShow] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const handleInstructionShow = () => setShow(true);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const MAX_DESCRIPTION_WORDS = 500;
    const quillRef = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const applcant = JSON.parse(localStorage.getItem("applicantProfileData"))
    const applicantUid = JSON.parse(localStorage.getItem("applicantData"))
    const handleInstructionClose = () => {
        navigate(-1)
    };
    const handleClose = () => {
        navigate(-1)
    };
    const handleStartQuiz = () => {
        setShow(false)
        setShowQuiz(true)
    }
    const handleShow = () => setShow(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [isActiveSubmit, setIsActiveSubmit] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const [loadeMoreCount, setLoadeMoreCount] = useState(10);
    const isBinaryFile = (file) => {
        // List of common binary MIME types
        const binaryMimeTypes = [
            "application/pdf",
            "application/octet-stream", // Generic binary file
            "image/png",
            "image/jpeg",
            "image/gif",
            "application/zip",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
            "application/x-executable", // EXE
            "audio/mp3",
            "video/mp4",
            "video/webm"
        ];

        return binaryMimeTypes.includes(file.type);
    };

    //form handle data
    const [QuizData, setQuizData] = useState({});
    const [markReview, setMarkReview] = useState({});
    const [questionId, setQuestionId] = useState()
    const [getKeyIndex, setGetKeyIndex] = useState();
    const [assestStatus, setAssetStatus] = useState({});
    const [succees, setSuccess] = useState(false)
    const [answerUids, setAnswerUids] = useState({})
    const [descriptionError, setDescriptionError] = useState("");
    const [fileName, setFileName] = useState({});
    const [fileUrl, setFileUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState({});
    console.log(errorMessage)

    // 
    // Add this state and effect to your component
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [isBodyClassActive, setIsBodyClassActive] = useState(false);

    const modalRef = useRef(null);
    const mobileFooterRef = useRef(null);

    const [showQuestion, setShowQuestion] = useState(false);

    const [showInstruction, setShowInstruction] = useState(false);
    const [showHeader, setshowHeader] = useState(false);

    const [showSave, setshowSave] = useState(false);


    // 
    // offcanvas

    const questionClose = () => setShowQuestion(false);
    const questionShow = () => setShowQuestion(true);



    const instructionShow = () => setShowInstruction(true);
    const instructionClose = () => setShowInstruction(false);


    const HeaderShow = () => setshowHeader(true);
    const HeaderClose = () => setshowHeader(false);

    const SaveShow = () => setshowSave(true);
    const SaveClose = () => setshowSave(false);


    // 

    //List state
    const [activeTab, setActiveTab] = useState("viewAll");
    const [EvaluationList, setEvaluationList] = useState([]);
    const [EvaluationListDetails, setEvaluationListDetails] = useState([]);
    const [SerachList, setSerachList] = useState("");
    const [activeKeys, setActiveKeys] = useState(["0-0"]);
    const [selectedSection, setSelectedSection] = useState("");
    const [timeLeft, setTimeLeft] = useState(1800);
    // const [selectedSectionAnswer, setSelectedSectionAnswer] = useState([])

    const revaluationsListAPI = async (SerachQuestion) => {
        setIsLoading(true);
        // const url = `https://bittrend.shubansoftware.com/assets-api/assets-list-by-company-api/b6cadaab-69bc-4707-8656-2e8573e17547/?search=${SerachQuestion}&page=1&limit=10`;
        const url = `https://bittrend.shubansoftware.com/assets-api/assets-list-api/?page=1&limit=10&search=${SerachQuestion}`;
        try {
            const response = await EvalationAssestList(url);
            setIsLoading(false);
            setEvaluationList(response.data.response);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching company user list:", error);
            if (
                error?.response?.status === 401 ||
                error?.response?.data?.detail?.includes(
                    "Given token not valid for any token type"
                )
            ) {
                removeToken();
                // navigate("/loginwithpassword");
            }
        }
    };

    useEffect(() => {
        revaluationsListAPI();
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            revaluationsListAPI(SerachList);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [SerachList]);


    // 

    const handleClickOutside = (event) => {
        // Check if click is outside both modal and footer buttons
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            (mobileFooterRef.current && !mobileFooterRef.current.contains(event.target))
        ) {
            // Keep the modal open but add backdrop
            document.body.classList.add('mobile-menu-active');
            setShowBackdrop(true);
        }
    };

    if (isBodyClassActive) {
        document.addEventListener('mousedown', handleClickOutside);
        document.body.classList.add('mobile-menu-active');
    } else {
        document.body.classList.remove('mobile-menu-active');
        document.removeEventListener('mousedown', handleClickOutside);
    }


    // 

    const handleTab = (tab) => {
        setActiveTab(tab);
    };

    const EvaluationListFilterData = EvaluationList.filter((item) => {
        if (activeTab == "viewAll") return true;
        return item.asset_type.toLowerCase() === activeTab.toLowerCase();
    });

    const handleLoadMore = () => {
        setLoadeMoreCount(loadeMoreCount + 10);
    };

    const handleSearch = (e) => {
        setSerachList(e.target.value);
    };

    const quizModal = async (uId) => {
        // console.log("uid--------",uId)
        // handleShow();
        setIsLoading(true);
        // const url = `https://bittrend.shubansoftware.com/assets-api/assets-list-by-company-api/b6cadaab-69bc-4707-8656-2e8573e17547/?search=${SerachQuestion}&page=1&limit=10`;
        const url = `assets-api/assets-detail-api/${uId}/`;
        try {
            const response = await EvalationAssestDetails(url);
            setIsLoading(false);
            //  console.log("assest detailssss api------",response.data.response)
            setEvaluationListDetails(response.data.response);
            response?.data?.response[0]?.section_asset?.sort((a, b) => a.id - b.id).map((item, quesIndex) =>
                item.question_section.map((Val, sectionIndex) => {
                    setErrorMessage((prev) => ({
                        ...prev,
                        [`${item?.id}-${Val?.id}-type`]: Val?.assignment_type
                    }));
                })
            )
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching company user list:", error);
            if (
                error?.response?.status === 401 ||
                error?.response?.data?.detail?.includes(
                    "Given token not valid for any token type"
                )
            ) {
                console.log("Token expired, redirecting to login");
                removeToken();
                // navigate("/loginwithpassword");
            }
        }
    };
    useEffect(() => {
        quizModal(id)
    }, [id])

    const getPosition = (answer) => {
        const cleanAnswer = answer.replace(/['"]/g, " ").trim();
        const position =
            EvaluationListDetails[0]?.section_asset[0]?.question_section[0]?.question_option.part1.findIndex(
                (item) => item.includes(cleanAnswer)
            ) + 1;

        return position;
    };

    const handleToggle = (id) => {
        // console.log("se------",id)
        if (activeKeys.includes(id)) {
            setActiveKeys((prevActiveKeys) =>
                prevActiveKeys.filter((key) => key !== id)
            );
        } else {
            setActiveKeys((prevActiveKeys) => [...prevActiveKeys, id]);
        }
    };

    const handleListItemClick = (id) => {
        const element = document.getElementById(`accordion-item-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Scroll to the top of the page
        // window.scrollTo({ top: 0, behavior: 'smooth' });

        handleToggle(id);
    };

    const handleToggleExpandCollapse = () => {
        const totalItems = EvaluationListDetails?.[0]?.section_asset?.reduce(
            (acc, section) => acc + section.question_section.length + 1, // +1 to include the section header
            0
        );

        if (activeKeys.length === totalItems) {
            setActiveKeys([]); // Collapse all
        } else {
            const keys = [];

            EvaluationListDetails?.[0]?.section_asset?.forEach(
                (section, sectionIndex) => {
                    keys.push(`${sectionIndex}`);
                    section.question_section.forEach((_, questionIndex) => {
                        keys.push(`${sectionIndex}-${questionIndex}`);
                    });
                }
            );

            setActiveKeys(keys); // Expand all
        }
    };

    const handleSelectChange = (e) => {
        // const sectionId = e.target.value;
        const sectionId = e.value;
        setSelectedSection(sectionId);

        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (sectionIndex, itemIndex, index, QuestionArray, questionId) => {
        if (draggedIndex === null) return;
        const updatedItems = [...QuestionArray];
        const draggedItem = updatedItems[draggedIndex];
        updatedItems.splice(draggedIndex, 1);
        updatedItems.splice(index, 0, draggedItem);
        setQuizData((prev) => {
            const key = `${sectionIndex}-${itemIndex}`;
            const currentSelections = prev[key] || [];
            return {
                ...prev,
                [key]: [updatedItems]
            };
        });
        setQuestionId(questionId)
        setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
        setDraggedIndex(null);
    };

    const handleQuizData = (sectionIndex, itemIndex, e, questionId) => {
        // debugger
        // setQuizData((prev) => {
        //   const existingItems = prev[sectionIndex] || [];
        //   if (existingItems.includes(itemIndex)) {
        //     return prev; // No update needed
        //   }
        //   return {
        //     ...prev,
        //     [sectionIndex]: [...existingItems, itemIndex], // Add only if it's not present
        //   };
        // });
        setQuizData((prev) => {
            const key = `${sectionIndex}-${itemIndex}`;
            const currentSelections = prev[key] || [];
            if (currentSelections.length) {
                setQuestionId(questionId)
            }
            return {
                ...prev,
                [key]: currentSelections.includes(e.target.value)
                    ? currentSelections.filter((item) => item !== e.target.value)
                    : [...currentSelections, e.target.value]
            };
        });
        // setQuestionId(questionId)
        setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
    }
    const handleQuizSingleData = (sectionIndex, itemIndex, e, questionId) => {
        setQuizData((prev) => ({
            ...prev,
            [`${sectionIndex}-${itemIndex}`]: [e.target.value]
        }));
        setQuestionId(questionId)
        setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
    }
    const handleVideoUpload = (sectionIndex, itemIndex, e, questionId, type) => {
        const file = e.target.files[0];
        setFileName((prev) => ({
            ...prev,
            [`${sectionIndex}-${itemIndex}`]: file?.name ? file?.name : ""
        }));
        if (file && file.type.startsWith("video/")) {
            setQuizData((prev) => ({
                ...prev,
                [`${sectionIndex}-${itemIndex}`]: file
            }));
            setQuestionId(questionId)
            setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
            // setVideoPreview(URL.createObjectURL(file));
        } else {
            setErrorMessage({
                ...errorMessage,
                [`${sectionIndex}-${itemIndex}`]: "Please select a valid video file."
            })
        }
    }
    const handleFileUpload = (sectionIndex, itemIndex, e, questionId, type) => {
        const file = e.target.files[0];

        if (!file) return;

        // Check if the file size exceeds 5MB
        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage({
                ...errorMessage,
                [`${sectionIndex}-${itemIndex}`]: "Attachement failed. The attachment exceeds the allowed file size."
            })
            return; // Exit early if the file is too large
        } else {
            setErrorMessage({
                ...errorMessage,
                [`${sectionIndex}-${itemIndex}`]: ""
            }) // Clear error message if file is valid
        }

        // Set the file name to display it
        // setFileName(file.name);
        setFileName((prev) => ({
            ...prev,
            [`${sectionIndex}-${itemIndex}`]: file.name
        }));

        if (file.type.startsWith("image/")) {
            setQuizData((prev) => ({
                ...prev,
                [`${sectionIndex}-${itemIndex}-file`]: file
            }));
            setQuestionId(questionId)
            setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
        } else {
            setErrorMessage({
                ...errorMessage,
                [`${sectionIndex}-${itemIndex}`]: "Please upload a valid image file"
            })
            // alert("Please upload a valid image file");
        }
    };

    const handleEditorChange = (sectionIndex, itemIndex, value, questionId, type) => {
        const wordCount = value.trim().split(/\s+/).length;
        // const Val = value.replace(/<[^>]*>/g, "")

        if (wordCount <= MAX_DESCRIPTION_WORDS) {
            setQuizData((prev) => ({
                ...prev,
                [`${sectionIndex}-${itemIndex}-text`]: value
            }));
            setQuestionId(questionId)
            setGetKeyIndex(`${sectionIndex}-${itemIndex}`)
            setDescriptionError("");
        } else {
            setDescriptionError(
                `You have reached the maximum limit of ${MAX_DESCRIPTION_WORDS} words.`
            );
        }
    };

    const handleMarkandReview = (sectionIndex, itemIndex) => {
        setMarkReview((prev) => {
            const key = `${sectionIndex}-${itemIndex}`;
            const currentSelections = prev[key] || [];
            return {
                ...prev,
                [key]: currentSelections.includes("mark")
                    ? currentSelections.filter((item) => item !== "mark")
                    : [...currentSelections, "mark"]
            };
        });
    }
    const handleAnsweredQuizActive = (sectionIndex, quesIndex) => {
        if (QuizData[`${sectionIndex}-${quesIndex}`] !== undefined) {
            return 'active-quiz qs_count active';
        } else {
            return 'qs_count';
        }
    }
    useEffect(() => {
        if (QuizData && questionId) {
            handleQuizSubmit()
        }
    }, [QuizData, questionId, getKeyIndex])
    const handleQuizSubmit = async () => {
        try {
            setIsLoading(true)
            const formData = new FormData();
            if (errorMessage[`${getKeyIndex}-type`] === 'Text-Mandatory-Attachment-Optional') {
                if (!QuizData[`${getKeyIndex}-text`]) {
                    // alert('Text-Mandatory-Attachment-Optional')
                } else {
                    formData.append("text", QuizData[`${getKeyIndex}-text`])
                    if (QuizData[`${getKeyIndex}-file`]) {
                        if (isBinaryFile(QuizData[`${getKeyIndex}-file`])) {
                            formData.append("attach_or_video", QuizData[`${getKeyIndex}-file`])
                        }
                    }
                }
            } else if (errorMessage[`${getKeyIndex}-type`] === "Video-Upload-Only") {
                if (!QuizData[getKeyIndex]) {

                } else {
                    if (isBinaryFile(QuizData[getKeyIndex])) {
                        formData.append("attach_or_video", QuizData[getKeyIndex])
                    }
                }
            } else if (errorMessage[`${getKeyIndex}-type`] === "Text-Only") {
                if (!QuizData[`${getKeyIndex}-text`]) {

                } else {
                    formData.append("text", QuizData[`${getKeyIndex}-text`])
                }
            } else if (errorMessage[`${getKeyIndex}-type`] === "Attachment-Only") {
                if (!QuizData[`${getKeyIndex}-file`]) {

                } else {
                    if (isBinaryFile(QuizData[`${getKeyIndex}-file`])) {
                        formData.append("attach_or_video", QuizData[`${getKeyIndex}-file`])
                    }
                }
            } else if (errorMessage[`${getKeyIndex}-type`] === "Video-Record-Only") {
                setIsVideoLoading(true)
                if (!QuizData[getKeyIndex]) {

                } else {
                    if (isBinaryFile(QuizData[getKeyIndex])) {
                        formData.append("attach_or_video", QuizData[getKeyIndex])
                    }
                }
            } else if (errorMessage[`${getKeyIndex}-type`] === "Audio-Record Only") {
                setIsAudioLoading(true)
                if (!QuizData[getKeyIndex]) {

                } else {
                    if (isBinaryFile(QuizData[getKeyIndex])) {
                        formData.append("attach_or_video", QuizData[getKeyIndex])
                    }
                }
            }
            formData.append("job", jobdetail?.state?.uid)
            formData.append("applicant", applicantUid?.applicant_data?.uid)
            formData.append("question", questionId)
            // formData.append("text", QuizData[`${getKeyIndex}-text`]?QuizData[`${getKeyIndex}-text`]:QuizData[getKeyIndex])
            // formData.append("attach_or_video", QuizData[`${getKeyIndex}-file`]?QuizData[`${getKeyIndex}-file`]:QuizData[getKeyIndex])
            const res = await PostQuizDataApi(formData)
            if (res.data.success) {
                setIsLoading(false)
                applicantDetailAPI()
                setIsAudioLoading(false);
                setIsVideoLoading(false);
                setIsActiveSubmit(false)
                setIsSubmit(false)
            }
        } catch (error) {
            // console.log(error)
            if (error?.response?.data?.response?.error[0]) {
                try {
                    setIsLoading(true)
                    const formData = new FormData();
                    const fillUpdate = [{ answer_uid: answerUids[getKeyIndex], question_uid: questionId, text: QuizData[`${getKeyIndex}-text`] ? QuizData[`${getKeyIndex}-text`] : '' }]
                    formData.append('job_uid', jobdetail?.state?.uid)
                    formData.append('question_answer_array', JSON.stringify(fillUpdate))
                    // formData.append('attach_or_video', QuizData[`${getKeyIndex}-file`] ? QuizData[`${getKeyIndex}-file`] : QuizData[getKeyIndex] ? QuizData[getKeyIndex] : '')
                    // formData.append('attach_or_video',QuizData[getKeyIndex])
                    if (QuizData[getKeyIndex]) {
                        if (isBinaryFile(QuizData[getKeyIndex])) {
                            formData.append("attach_or_video", QuizData[getKeyIndex])
                        }
                    }
                    if (QuizData[`${getKeyIndex}-file`]) {
                        if (isBinaryFile(QuizData[`${getKeyIndex}-file`])) {
                            formData.append('attach_or_video', QuizData[`${getKeyIndex}-file`])
                        }
                    }
                    formData.append('job_or_custom_question_type', 'Job')
                    const res = await ApplicationFormDetailsApi(formData, applicantUid?.applicant_data?.uid)
                    if (res?.data?.success) {
                        setIsLoading(false)
                        // applicantDetailAPI()
                        setIsAudioLoading(false);
                        setIsVideoLoading(false);
                        setIsActiveSubmit(false)
                        setIsSubmit(false)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            setIsLoading(false)
            setIsAudioLoading(false);
            setIsVideoLoading(false);
            setIsActiveSubmit(false);
            setIsSubmit(false)
        }
    }
    const isImageUrl = (url) => {
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    };
    const applicantDetailAPI = async () => {
        try {
            const user = applcant?.user_login?.email ? applcant?.user_login?.email : applcant?.applcant?.user;
            // const res = await ApplicationDeatilsApi(user)
            const res = await getAssetDataDetailsAPI(jobdetail?.state?.uid, applicantUid?.applicant_data?.uid)
            if (res?.success) {
                // setSelectedSectionAnswer(res?.data?.response?.asset_data)
                res?.response?.job?.asset_job?.map((Val) => {
                    if (Val?.asset_title === "Pre-interview round for creative director") {
                        Val?.section_asset.sort((a, b) => a.id - b.id).map((item, quesIndex) =>
                            item.question_section.map((Val, sectionIndex) => {
                                setQuizData((prev) => ({
                                    ...prev,
                                    [`${item?.id}-${Val?.id}-file`]: isImageUrl(Val.user_answer_question[0]?.attach_or_video) ? Val.user_answer_question[0]?.attach_or_video : '',
                                    [`${item?.id}-${Val?.id}-text`]: Val.user_answer_question[0]?.text ? Val.user_answer_question[0]?.text : null,
                                    [`${item?.id}-${Val?.id}`]: !isImageUrl(Val.user_answer_question[0]?.attach_or_video) ? Val.user_answer_question[0]?.attach_or_video : ''
                                }));
                                setAnswerUids((prev) => ({
                                    ...prev,
                                    [`${item?.id}-${Val?.id}`]: Val.user_answer_question[0]?.uid
                                }))
                            })
                        )
                        const filterTest = Val?.assets_applicant_asset_completion?.find((item) => item?.completion_asset?.uid == id)
                        setAssetStatus(filterTest)
                        localStorage.setItem("preAssestQuiz", filterTest?.asset_completion_status)
                        if (filterTest?.asset_completion_status == 'Completed') {
                            setShow(false)
                            setSuccess(true)
                        }
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        applicantDetailAPI();
    }, [])
    const optionEvl = EvaluationListDetails[0]?.section_asset?.map((opt) => ({ value: opt.id, label: opt.section_title }))
    const handleSubmit = () => {
        if (assestStatus?.asset_completion_status === 'Completed') {
            setSuccess(true)
        }
    }
    // const onTimeUp = () => {
    //     setShowQuiz(false)
    // };

    // useEffect(() => {
    //     if (timeLeft <= 0) {
    //         onTimeUp();
    //         return;
    //     }
    //     const timer = setInterval(() => {
    //         setTimeLeft((prev) => prev - 1);
    //     }, 1000);
    //     return () => clearInterval(timer);
    // }, [timeLeft, onTimeUp]);

    // // Convert seconds to MM:SS format
    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = seconds % 60;
    //     return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    // };
    // console.log(QuizData, EvaluationListDetails)
    // console.log(markReview)
    // console.log(QuizData[getKeyIndex], applcant)
    // console.log(EvaluationListDetails)
    // console.log(QuizData)
    // console.log('selected_answer=============>', selectedSectionAnswer)
    console.log(EvaluationListDetails)
    console.log(QuizData)
    // console.log(fileName)
    return (
        <>
            <InstructionAssignment showinstruction={show} handleInstructionClose={handleInstructionClose}
                handleStartQuiz={handleStartQuiz} EvaluationListDetails={EvaluationListDetails} jobData={jobdetail?.state} />
            <Modal
                show={showQuiz}
                onHide={handleClose}
                animation={false}
                size="lg"
                className="cmprofile_mdl quizDev_model"
            >
                <Modal.Header closeButton>
                    <Col md={4}>
                        <Modal.Title>
                            <img src={logoIcon} className="me-4" />
                            Assignment for {jobdetail?.job_title}
                            {/* {item.asset_title} */}
                        </Modal.Title>
                    </Col>
                    <Col md={8} className="d-flex align-items-center justify-content-end quiz_headright">
                        <div className="quiz_progress">
                            <p className="m-0 font-13">
                                <span className="font-weight-600 me-2">100%</span>completed
                            </p>
                            <ProgressBar
                                className="ms-3"
                                style={{ width: "80px", height: "8px" }}
                                now={100}
                            />
                        </div>
                        <p className="timer">
                            <img src={clock} />
                            {/* <span className="timercout">{formatTime(timeLeft)}</span> */}
                        </p>
                    </Col>
                    {/* <Col md={4} className="score_panel">
            <ul>
              <li>
                <span className="outline_scorebtn">
                  <img src={listQuestions} />
                  {item.total_score}
                </span>
                <p className="text-muted font-sm m-0">Total Score</p>
              </li>
              <li>
                <span className="outline_scorebtn">
                  <img src={clockStopwatch} />
                  {item.fixed_time}
                </span>
                <p className="text-muted font-sm m-0">Duration</p>
              </li>
              <li>
                <span className="outline_scorebtn">
                  <img src={checkVerified} />
                  {item.pass_criteria}
                </span>
                <p className="text-muted font-sm m-0">Pass Criteria</p>
              </li>

              <li onClick={handleToggleExpandCollapse}>
                <span className="outline_scorebtn">
                  {activeKeys.length > 2 ? (
                    <img src={CollapsedButton} className="m-0" />
                  ) : (
                    <img src={expandIcon} className="m-0" />
                  )}
                </span>

                <p className="text-muted font-sm m-0">
                  {activeKeys.length > 2 ? "Collapse" : "Expand"}
                </p>
              </li>

              <li>
                <Button variant="link" className="ms-4">
                  <img src={eyePrimery} />
                </Button>
              </li>
            </ul>
          </Col> */}
                </Modal.Header>
                <Modal.Body className="p-0">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="justify-content-center">
                            <Col md={3} lg={2} className="queLeft_panel mobile-hide pe-0">
                                <div className="p-3">
                                    {/* <Form.Select
                                        aria-label="Default select example"
                                        className="h-36"
                                        onChange={handleSelectChange}
                                        value={selectedSection}
                                    >
                                        <option value="" disabled hidden>Show All</option>
                                        {EvaluationListDetails[0]?.section_asset?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.section_title}
                                            </option>
                                        ))}
                                    </Form.Select> */}
                                    <Select
                                        options={optionEvl}
                                        value={optionEvl?.find((opt) => opt?.value === sectionIcon)}
                                        onChange={handleSelectChange}
                                        className="h-36 react_selectbox"
                                    />
                                </div>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link
                                        //href="#qes_section02"
                                        // eventKey="second"
                                        >
                                            {EvaluationListDetails[0]?.section_asset?.map(
                                                (item, sectionIndex) => (
                                                    <>
                                                        <h5>{item.section_title}</h5>
                                                        <p>
                                                            {item.total_number_of_question} Q’s{" "}
                                                            {item.total_questions_point} points ~
                                                            {item.total_question_time}
                                                            {item?.section_pass_criteria
                                                                ? item?.section_pass_criteria
                                                                : null}
                                                        </p>

                                                        <ul className="qs_numlist">
                                                            {item.question_section.map(
                                                                (quesItem, quesIndex) => (
                                                                    <li
                                                                        key={quesItem.id}
                                                                        style={{ cursor: "pointer" }}
                                                                        // onClick={() =>
                                                                        //   handleListItemClick(quesItem.id)

                                                                        // }
                                                                        onClick={() =>
                                                                            handleListItemClick(
                                                                                // `${sectionIndex}-${quesIndex}`
                                                                                `${quesIndex}-${sectionIndex}`
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className={handleAnsweredQuizActive(item?.id, quesItem?.id)}>
                                                                            {markReview[`${item?.id}-${quesItem?.id}`]?.length ? (<span className="dot"></span>) : ''}
                                                                            {/* <span className="dot"></span> */}
                                                                            {quesIndex + 1}
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </>
                                                )
                                            )}
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col md={6} lg={8} className="queMain_panel">
                                <div className="que_mainsection">
                                    {EvaluationListDetails[0]?.section_asset?.sort((a, b) => a.id - b.id)?.map(
                                        (Val, quesIndex) => (
                                            <div
                                                // id="qes_section01"
                                                className="qes_section01 mb-4"
                                            >
                                                <div
                                                    className={
                                                        activeKeys.length > 0
                                                            ? "que_head"
                                                            : "que_head ellipsis"
                                                    }
                                                >
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <h6> {Val.section_title}</h6>
                                                        {/* <h6>{quesIndex + 1} {item.section_title}</h6> */}

                                                        <span>
                                                            Questions
                                                            <strong className="font-weight-600 ms-1">
                                                                {Val.total_number_of_question}
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <p className="text-sm">{Val.section_description}</p>
                                                    {/* <strong className="qus_number">1{item.id}</strong> */}
                                                    <strong className="qus_number">
                                                        {quesIndex + 1}
                                                    </strong>
                                                </div>
                                                <Accordion
                                                    className="quetions_list mt-4"
                                                    // activeKey={activeKeys}
                                                    activeKey={activeKeys.map(String)}
                                                // activeKey={activeKeys.map(item => item.toString())}
                                                >
                                                    {Val.question_section.map((item, sectionIndex) => (
                                                        <Accordion.Item
                                                            id={`accordion-item-${item.id}`}
                                                            eventKey={`${sectionIndex}-${quesIndex}`}
                                                            key={quesIndex}
                                                        >
                                                            <Accordion.Header
                                                                onClick={() =>
                                                                    handleToggle(`${sectionIndex}-${quesIndex}`)
                                                                }
                                                            >
                                                                <span
                                                                // className={item.is_mandatory && "question"}
                                                                >
                                                                    {item.question_title}
                                                                </span>{" "}
                                                                <span className="que_points">
                                                                    {/* {item.question_points} points */}
                                                                    {/* <img src={mcqIcon} /> */}
                                                                    <strong onClick={() => handleMarkandReview(Val?.id, item?.id)} className={`${markReview[`${Val?.id}-${item?.id}`]?.length ? 'active' : ''} ms-2 bookmark`}>
                                                                        <i class="fa fa-bookmark" aria-hidden="true"></i>
                                                                    </strong>
                                                                </span>

                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                {item?.assignment_type === 'Text-Only' && (
                                                                    <Form.Group className="mb-2" controlId="jobDescription">
                                                                        <Form.Label>Please provide your response in the box below, ensuring it is between 500 and 3,000 words.</Form.Label>
                                                                        <div className="texteditor_warp quiz-texteditor">
                                                                            <ReactQuill
                                                                                value={QuizData[`${Val?.id}-${item?.id}-text`]}
                                                                                onChange={(value) => handleEditorChange(Val?.id, item?.id, value, item?.uid, item?.assignment_type)}
                                                                                theme="snow"
                                                                                // ref={quillRef}
                                                                                modules={{
                                                                                    toolbar: [["bold", "italic", "underline"], ["link"]],
                                                                                }}
                                                                                placeholder="Your Answer"
                                                                            />
                                                                            <span className="words_limit ms-2 mb-2">0/3,000 Words</span>
                                                                        </div>
                                                                        {errorMessage[`${quesIndex}-${sectionIndex}`] && (
                                                                            <div className="error">{errorMessage[`${Val?.id}-${item?.id}`]}</div>
                                                                        )}
                                                                    </Form.Group>
                                                                )}
                                                                {item?.assignment_type === 'Text-Mandatory-Attachment-Optional' && (
                                                                    <Form.Group className="mb-2" controlId="jobDescription">
                                                                        <Form.Label>Please provide your response in the box below, ensuring it is between 500 and 3,000 words.</Form.Label>
                                                                        <div className="texteditor_warp quiz-texteditor">
                                                                            <ReactQuill
                                                                                value={QuizData[`${Val?.id}-${item?.id}-text`]}
                                                                                onChange={(value) => handleEditorChange(Val?.id, item?.id, value, item?.uid, item?.assignment_type)}
                                                                                theme="snow"
                                                                                ref={quillRef}
                                                                                modules={{
                                                                                    toolbar: [["bold", "italic", "underline"], ["link"]],
                                                                                }}
                                                                                placeholder="Your Answer"
                                                                            />
                                                                            <span className="words_limit ms-2 mb-2">0/3,000 Words</span>
                                                                        </div>
                                                                        <label className="attch_label">Add Attachment</label>
                                                                        <div
                                                                            className="custome_file file_attcbtn">
                                                                            <label
                                                                                htmlFor={`file-upload[${quesIndex}-${sectionIndex}]`}
                                                                            >
                                                                                <img className="cloud_icon" src={cloudUpload} />
                                                                                <strong className="text-primery">Click to upload</strong>
                                                                                <span className="ms-2">{fileName[`${Val?.id}-${item?.id}`] ? '' : QuizData[`${Val?.id}-${item?.id}-file`] ? '' : 'or drag and drop'}</span>
                                                                            </label>
                                                                            <input
                                                                                type="file"
                                                                                id={`file-upload[${quesIndex}-${sectionIndex}]`}
                                                                                onChange={(e) => handleFileUpload(Val?.id, item?.id, e, item?.uid, item?.assignment_type)}
                                                                                // ref={fileInputRef}
                                                                                accept="image/*,application/pdf"
                                                                                style={{ display: "none" }}//
                                                                            />


                                                                            <small className="ms-2"
                                                                                style={{
                                                                                    fontSize: 12,
                                                                                    color: errorMessage[`${Val?.id}-${item?.id}`] ? "red" : "#475467",
                                                                                }}
                                                                            >
                                                                                {/* {errorMessage[`${Val?.id}-${item?.id}`] ? errorMessage[`${Val?.id}-${item?.id}`] : 'SVG, PNG, JPG or GIF (Recommended aspect ratio: 1:1 or 2:3)'} */}
                                                                                {/* SVG, PNG, JPG or GIF (Recommended aspect ratio: 1:1 or 2:3) */}
                                                                                {errorMessage[`${Val?.id}-${item?.id}`] ? errorMessage[`${Val?.id}-${item?.id}`] : ''}
                                                                                {fileName[`${Val?.id}-${item?.id}`] ? fileName[`${Val?.id}-${item?.id}`] : QuizData[`${Val?.id}-${item?.id}-file`] ? QuizData[`${Val?.id}-${item?.id}-file`] : 'SVG, PNG, JPG or GIF (Recommended aspect ratio: 1:1 or 2:3)'}
                                                                            </small>
                                                                        </div>

                                                                        {descriptionError && (
                                                                            <div className="error">{descriptionError}</div>
                                                                        )}
                                                                    </Form.Group>
                                                                )}
                                                                {item?.assignment_type === 'Video-Upload-Only' && (
                                                                    <Form.Group className="mb-2" controlId="jobDescription">
                                                                        <div
                                                                            className="custome_file file_attcbtn">
                                                                            <label
                                                                                htmlFor={`file-upload[${quesIndex}-${sectionIndex}]`} >
                                                                                <img className="cloud_icon" src={cloudUpload} />
                                                                                <strong className="text-primery">Click to upload</strong>
                                                                                {fileName[`${Val?.id}-${item?.id}`] ? '' : QuizData[`${Val?.id}-${item?.id}`] ? '' : ' or drag and drop your video file'}
                                                                            </label>
                                                                            <input
                                                                                type="file"
                                                                                id={`file-upload[${quesIndex}-${sectionIndex}]`}
                                                                                // ref={fileInputRef}
                                                                                accept="image/*,application/pdf"
                                                                                onChange={(e) => handleVideoUpload(Val?.id, item?.id, e, item?.uid, item?.assignment_type)}
                                                                                style={{ display: "none" }}//
                                                                            />

                                                                            <div>
                                                                                <p className="m-0"
                                                                                    style={{
                                                                                        fontSize: 12,
                                                                                        color: errorMessage[`${Val?.id}-${item?.id}`] ? "red" : "black",
                                                                                    }}
                                                                                >
                                                                                    {/* {errorMessage[`${Val?.id}-${item?.id}`]} */}
                                                                                    {/* SVG, PNG, JPG or GIF (Recommended aspect ratio: 1:1 or 2:3) */}
                                                                                    {errorMessage[`${Val?.id}-${item?.id}`] ? errorMessage[`${Val?.id}-${item?.id}`] : ''}
                                                                                    {fileName[`${Val?.id}-${item?.id}`] ? fileName[`${Val?.id}-${item?.id}`] : QuizData[`${Val?.id}-${item?.id}`] ? QuizData[`${Val?.id}-${item?.id}`] : ''}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </Form.Group>
                                                                )}
                                                                {item?.assignment_type === 'Attachment-Only' && (
                                                                    <div
                                                                        className="custome_file file_attcbtn">
                                                                        <label
                                                                            htmlFor={`file-upload[${quesIndex}-${sectionIndex}]`}
                                                                        >
                                                                            <img className="cloud_icon" src={cloudUpload} />
                                                                            <strong className="text-primery me-2">Click to upload</strong>
                                                                            {fileName[`${Val?.id}-${item?.id}`] ? '' : QuizData[`${Val?.id}-${item?.id}-file`] ? '' : 'or drag and drop'}
                                                                        </label>
                                                                        <input
                                                                            type="file"
                                                                            id={`file-upload[${quesIndex}-${sectionIndex}]`}
                                                                            //   ref={fileInputRef}
                                                                            accept="image/*,application/pdf"
                                                                            onChange={(e) => handleFileUpload(Val?.id, item?.id, e, item?.uid, item?.assignment_type)}
                                                                            style={{ display: "none" }}//
                                                                        />
                                                                        <small className="ms-2"
                                                                        >
                                                                            {errorMessage[`${Val?.id}-${item?.id}`] ? errorMessage[`${Val?.id}-${item?.id}`] : ''}
                                                                            {fileName[`${Val?.id}-${item?.id}`] ? fileName[`${Val?.id}-${item?.id}`] : QuizData[`${Val?.id}-${item?.id}-file`] ? QuizData[`${Val?.id}-${item?.id}-file`] : 'SVG, PNG, JPG or GIF (Recommended aspect ratio: 1:1 or 2:3)'}
                                                                            {/* {fileName[`${Val?.id}-${item?.id}`] ? fileName[`${Val?.id}-${item?.id}`] : QuizData[`${Val?.id}-${item?.id}-file`]} */}
                                                                        </small>
                                                                    </div>
                                                                )}
                                                                {item?.assignment_type === 'Audio-Record Only' && (
                                                                    <AudioRecorder sectionIndex={Val?.id} itemIndex={item?.id}
                                                                        questionId={item?.uid} type={item?.assignment_type} QuizData={QuizData} setQuizData={setQuizData}
                                                                        setQuestionId={setQuestionId} setGetKeyIndex={setGetKeyIndex} isLoading={isAudioLoading} isActiveSubmit={isActiveSubmit} setIsActiveSubmit={setIsActiveSubmit} />
                                                                )}
                                                                {item?.assignment_type === 'Video-Record-Only' && (
                                                                    <VideoRecorderComponent sectionIndex={Val?.id} itemIndex={item?.id}
                                                                        questionId={item?.uid} type={item?.assignment_type} QuizData={QuizData} setQuizData={setQuizData}
                                                                        setQuestionId={setQuestionId} setGetKeyIndex={setGetKeyIndex} isLoading={isVideoLoading} isActiveSubmit={isSubmit} setIsActiveSubmit={setIsSubmit} />
                                                                )}


                                                                {item.quiz_type === "MCQ-Multi" && (
                                                                    <ul className="que_options">
                                                                        {item.question_option.part1?.map(
                                                                            (option, index) => {
                                                                                const isChecked =
                                                                                    item.questions_answer.some(
                                                                                        (answer) =>
                                                                                            answer.replace(/'/g, "") ===
                                                                                            option
                                                                                    );
                                                                                return (
                                                                                    <li key={index}>
                                                                                        <Form.Check
                                                                                            type="checkbox"
                                                                                            id={`custom-radio${index + 1}`}
                                                                                            label={option}
                                                                                            // checked={isChecked}
                                                                                            checked={QuizData[`${quesIndex}-${sectionIndex}`]?.some((v) => v == option)}
                                                                                            value={option}
                                                                                            onChange={(e) => handleQuizData(quesIndex, sectionIndex, e, item?.uid)}
                                                                                        />
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </ul>
                                                                )}

                                                                {item.quiz_type === "MCQ" && (
                                                                    <ul className="que_options">
                                                                        {item.question_option.part1?.map(
                                                                            (option, index) => {
                                                                                const isChecked =
                                                                                    item.questions_answer.some(
                                                                                        (answer) =>
                                                                                            answer.replace(/'/g, "") ===
                                                                                            option
                                                                                    );

                                                                                return (
                                                                                    <li key={index}>
                                                                                        <Form.Check
                                                                                            type="radio"
                                                                                            id={`custom-radio${index + 1}`}
                                                                                            label={option}
                                                                                            name="radioGroup"
                                                                                            // checked={isChecked}
                                                                                            checked={QuizData[`${quesIndex}-${sectionIndex}`]?.some((v) => v == option)}
                                                                                            value={option}
                                                                                            onChange={(e) => handleQuizSingleData(quesIndex, sectionIndex, e, item?.uid)}
                                                                                        />
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </ul>
                                                                )}

                                                                {item.quiz_type === "Match" && (
                                                                    <>
                                                                        <Row>
                                                                            <Col>
                                                                                <ol className="qus_crossed">
                                                                                    {/* {console.log(QuizData[`${quesIndex}-${sectionIndex}`][0])} */}
                                                                                    {item?.question_option.part1?.map(
                                                                                        (data, index) => {
                                                                                            const correctCapital =
                                                                                                item?.questions_answer[index]
                                                                                                    ?.replace("'", "")
                                                                                                    ?.replace("'", "");

                                                                                            return (
                                                                                                <li key={index}>
                                                                                                    <div className="crossd_answarp">
                                                                                                        <span className="crossd_ans"
                                                                                                        //  onClick={() => handleQuizData(quesIndex, item, index)}
                                                                                                        >
                                                                                                            {data}
                                                                                                        </span>
                                                                                                        {/* <img src={belltedArrow} alt="" /> */}
                                                                                                        <span className="crossd_ans">
                                                                                                            {correctCapital}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </li>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                </ol>
                                                                            </Col>
                                                                            <Col>
                                                                                <ul className="qus_crossed" style={{ listStyle: "none" }}>
                                                                                    {QuizData[`${quesIndex}-${sectionIndex}`]?.flat()?.length ? QuizData[`${quesIndex}-${sectionIndex}`]?.flat()?.map(
                                                                                        (data, index) => {
                                                                                            const correctCapital =
                                                                                                item?.questions_answer[index]
                                                                                                    ?.replace("'", "")
                                                                                                    ?.replace("'", "");

                                                                                            return (
                                                                                                <li key={index}>
                                                                                                    <div className="crossd_answarp">
                                                                                                        <span className="crossd_ans"
                                                                                                            //  onClick={() => handleQuizData(quesIndex, item, index)}
                                                                                                            draggable
                                                                                                            onDragStart={() => handleDragStart(index)}
                                                                                                            onDragOver={handleDragOver}
                                                                                                            onDrop={() => handleDrop(quesIndex, sectionIndex, index, QuizData[`${quesIndex}-${sectionIndex}`]?.flat(), item?.uid)}
                                                                                                        >
                                                                                                            {String.fromCharCode(65 + index)}. {data}
                                                                                                        </span>
                                                                                                        <span className="crossd_ans">
                                                                                                            {correctCapital}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </li>
                                                                                            );
                                                                                        }
                                                                                    ) : (
                                                                                        item?.question_option.part1?.map(
                                                                                            (data, index) => {
                                                                                                const correctCapital =
                                                                                                    item?.questions_answer[index]
                                                                                                        ?.replace("'", "")
                                                                                                        ?.replace("'", "");

                                                                                                return (
                                                                                                    <li key={index}>
                                                                                                        <div className="crossd_answarp">
                                                                                                            <span className="crossd_ans"
                                                                                                                //  onClick={() => handleQuizData(quesIndex, item, index)}
                                                                                                                draggable
                                                                                                                onDragStart={() => handleDragStart(index)}
                                                                                                                onDragOver={handleDragOver}
                                                                                                                onDrop={() => handleDrop(quesIndex, sectionIndex, index, item?.question_option.part1, item?.uid)}
                                                                                                            >
                                                                                                                {String.fromCharCode(65 + index)}. {data}
                                                                                                            </span>
                                                                                                            <span className="crossd_ans">
                                                                                                                {correctCapital}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                );
                                                                                            }
                                                                                        )
                                                                                    )}
                                                                                </ul>
                                                                            </Col>
                                                                        </Row>
                                                                    </>
                                                                )}

                                                                {item.quiz_type === "Arrange" && (
                                                                    <ul className="qus_crossed">
                                                                        {/* {(
                                      (answer, index) => (
                                        <li key={index}>
                                          <div className="crossd_answarp">
                                            <span className="option_count">
                                              {getPosition(answer)}
                                            </span>
                                            <span>{answer}</span>
                                          </div>
                                        </li>
                                      )
                                    )} */}
                                                                        {QuizData[`${quesIndex}-${sectionIndex}`]?.flat()?.length ? QuizData[`${quesIndex}-${sectionIndex}`]?.flat()?.map(
                                                                            (data, index) => {
                                                                                const correctCapital =
                                                                                    item?.questions_answer[index]
                                                                                        ?.replace("'", "")
                                                                                        ?.replace("'", "");

                                                                                return (
                                                                                    <li key={index}>
                                                                                        <div className="crossd_answarp">
                                                                                            <span className="crossd_ans"
                                                                                            //  onClick={() => handleQuizData(quesIndex, item, index)}                                              
                                                                                            >
                                                                                                <img src={DragDrop} className="dragicon" alt="" draggable
                                                                                                    onDragStart={() => handleDragStart(index)}
                                                                                                    onDragOver={handleDragOver}
                                                                                                    onDrop={() => handleDrop(quesIndex, sectionIndex, index, QuizData[`${quesIndex}-${sectionIndex}`]?.flat(), item?.uid)}
                                                                                                />
                                                                                                {data}
                                                                                            </span>
                                                                                            <span className="crossd_ans">
                                                                                                {correctCapital}
                                                                                            </span>
                                                                                        </div>
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        ) : (
                                                                            item?.question_option.part1?.map(
                                                                                (data, index) => {
                                                                                    const correctCapital =
                                                                                        item?.questions_answer[index]
                                                                                            ?.replace("'", "")
                                                                                            ?.replace("'", "");

                                                                                    return (
                                                                                        <li key={index}>
                                                                                            <div className="crossd_answarp">
                                                                                                <span className="crossd_ans"
                                                                                                //  onClick={() => handleQuizData(quesIndex, item, index)}                                                
                                                                                                >
                                                                                                    <img src={DragDrop} className="dragicon" alt="" draggable
                                                                                                        onDragStart={() => handleDragStart(index)}
                                                                                                        onDragOver={handleDragOver}
                                                                                                        onDrop={() => handleDrop(quesIndex, sectionIndex, index, item?.question_option.part1, item?.uid)}
                                                                                                    />
                                                                                                    {/* {String.fromCharCode(65 + index)}. */}
                                                                                                    {data}
                                                                                                </span>
                                                                                                <span className="crossd_ans">
                                                                                                    {correctCapital}
                                                                                                </span>
                                                                                            </div>
                                                                                        </li>
                                                                                    );
                                                                                }
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                )}

                                                                {item.assignment_type ==
                                                                    "Text-Video-Mandatory" ? (
                                                                    <>
                                                                        <div className="que_attachment me-2">
                                                                            <h6>
                                                                                <img src={fileIcon} alt="" />
                                                                                Text
                                                                                <span className="text-danger">*</span>
                                                                            </h6>
                                                                            <p className="text-muted">
                                                                                Max 3,000 Words
                                                                            </p>
                                                                        </div>

                                                                        <div className="que_attachment me-2">
                                                                            <h6>
                                                                                <img src={videoRecoder} alt="" />
                                                                                Video
                                                                                <span className="text-danger">*</span>
                                                                                <span className="text-muted font-light">
                                                                                    (Record Online)
                                                                                </span>
                                                                            </h6>
                                                                            <p className="text-muted">5 - 10 mins</p>
                                                                        </div>
                                                                        <div className="accordion_footer">
                                                                            <p>{item.question_points} Point</p>
                                                                            {item.is_random && (
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    id="custom-checkbox"
                                                                                    label="Randomise Responses"
                                                                                    checked={true}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : item.assignment_type == "Video-Only" ? (
                                                                    <>
                                                                        <div className="que_attachment me-2">
                                                                            <h6>
                                                                                <img src={videoRecoder} alt="" />
                                                                                Video
                                                                                <span className="text-danger">*</span>
                                                                                <span className="text-muted font-light">
                                                                                    (Record Online)
                                                                                </span>
                                                                            </h6>
                                                                            <p className="text-muted">5 - 10 mins</p>
                                                                        </div>
                                                                        <div className="accordion_footer">
                                                                            <p>{item.question_points} Point</p>
                                                                            {item.is_random && (
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    id="custom-checkbox"
                                                                                    label="Randomise Responses"
                                                                                    checked={true}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : item.assignment_type ==
                                                                    "Text-Attachment-Optional" ? (
                                                                    <>
                                                                        <div className="que_attachment me-2">
                                                                            <h6>
                                                                                <img src={fileIcon} alt="" />
                                                                                Text
                                                                                <span className="text-danger">*</span>
                                                                            </h6>
                                                                            <p className="text-muted">
                                                                                Max 3,000 Words
                                                                            </p>
                                                                        </div>
                                                                        <div className="que_attachment me-2">
                                                                            <h6>
                                                                                <img src={attachmentPin} alt="" />
                                                                                Attachment
                                                                                <span className="text-muted font-light">
                                                                                    (Optional)
                                                                                </span>
                                                                            </h6>
                                                                            <p className="text-muted">
                                                                                <span className="att_img">PDF</span>
                                                                                <span className="att_img">PNG</span>
                                                                                (Size Limit: 1MB)
                                                                            </p>
                                                                        </div>
                                                                        <div className="accordion_footer">
                                                                            <p>{item.question_points} Point</p>
                                                                            {item.is_random && (
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    id="custom-checkbox"
                                                                                    label="Randomise Responses"
                                                                                    checked={true}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : item.assignment_type == "Text-Only" ? (
                                                                    <>
                                                                        <div className="que_attachment me-2">
                                                                            <h6>
                                                                                <img src={fileIcon} alt="" />
                                                                                Text
                                                                                <span className="text-danger">*</span>
                                                                            </h6>
                                                                            <p className="text-muted">
                                                                                Max 3,000 Words
                                                                            </p>
                                                                        </div>
                                                                        <div className="accordion_footer">
                                                                            <p>{item.question_points} Point</p>
                                                                            {item.is_random && (
                                                                                <Form.Check
                                                                                    type="checkbox"
                                                                                    id="custom-checkbox"
                                                                                    label="Randomise Responses"
                                                                                    checked={true}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : null}
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    ))}
                                                </Accordion>
                                            </div>
                                        )
                                    )}
                                </div>
                            </Col>
                            <Col md={3} lg={2} className="queRight_panel mobile-hide">
                                <h5>Instructions</h5>
                                <ul className="bullet_list mb-0">
                                    {EvaluationListDetails.map((list, quesIndex) => (
                                        <>
                                            <li>Total {list?.total_number_of_question} Questions.</li>
                                            <li>Total Duration {list?.fixed_time}.</li>
                                            <li>The countdown timer in the top right corner of screen will display the remaining time for the quiz. When the timer reaches zero, the quiz will end by itself.</li>
                                            <li>The questions palette displayed on the right side of the screen will show the status of each question using one of the following symbols:</li>
                                        </>
                                    ))}
                                </ul>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link
                                        //href="#qes_section02"
                                        // eventKey="second"
                                        >
                                            {EvaluationListDetails[0]?.section_asset?.map(
                                                (item, sectionIndex) => (
                                                    <>
                                                        <ul className="qs_stutslist">
                                                            {item.question_section.map(
                                                                (quesItem, quesIndex) => (
                                                                    <li
                                                                        key={quesItem.id}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() =>
                                                                            handleListItemClick(
                                                                                // `${sectionIndex}-${quesIndex}`
                                                                                `${item?.id}-${quesItem?.id}`
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className={handleAnsweredQuizActive(item?.id, quesItem?.id)}>
                                                                            {" "}
                                                                            {quesIndex + 1}
                                                                            {markReview[`${item?.id}-${quesItem?.id}`]?.length ? (<span className="dot"></span>) : ''}
                                                                        </span>

                                                                        {QuizData[`${item?.id}-${quesItem?.id}`]?.length ? 'Answered Question' : "Pending Question"}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </>
                                                )
                                            )}
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                    </Tab.Container>


                    {/* mobile modal */}
                    {/* mobile component  */}

                    <Offcanvas
                        className="question-popup p-0"
                        show={showQuestion}
                        onHide={() => {
                            setIsBodyClassActive(false);
                            questionClose();
                        }}
                        placement="bottom" >
                        <Offcanvas.Body className="queLeft_panel">
                            <div className="p-3 ">
                                {/* <Form.Select
                                        aria-label="Default select example"
                                        className="h-36"
                                        onChange={handleSelectChange}
                                        value={selectedSection}
                                    >
                                        <option value="" disabled hidden>Show All</option>
                                        {EvaluationListDetails[0]?.section_asset?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.section_title}
                                            </option>
                                        ))}
                                    </Form.Select> */}
                                <Select
                                    options={optionEvl}
                                    value={optionEvl?.find((opt) => opt?.value === sectionIcon)}
                                    onChange={handleSelectChange}
                                    className="h-36 react_selectbox"
                                />
                            </div>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link
                                    //href="#qes_section02"
                                    // eventKey="second"
                                    >
                                        {EvaluationListDetails[0]?.section_asset?.map(
                                            (item, sectionIndex) => (
                                                <>
                                                    <h5>{item.section_title}</h5>
                                                    <p>
                                                        {item.total_number_of_question} Q’s{" "}
                                                        {item.total_questions_point} points ~
                                                        {item.total_question_time}
                                                        {item?.section_pass_criteria
                                                            ? item?.section_pass_criteria
                                                            : null}
                                                    </p>

                                                    <ul className="qs_numlist">
                                                        {item.question_section.map(
                                                            (quesItem, quesIndex) => (
                                                                <li
                                                                    key={quesItem.id}
                                                                    style={{ cursor: "pointer" }}
                                                                    // onClick={() =>
                                                                    //   handleListItemClick(quesItem.id)

                                                                    // }
                                                                    onClick={() =>
                                                                        handleListItemClick(
                                                                            // `${sectionIndex}-${quesIndex}`
                                                                            `${quesIndex}-${sectionIndex}`
                                                                        )
                                                                    }
                                                                >
                                                                    <span className={handleAnsweredQuizActive(item?.id, quesItem?.id)}>
                                                                        {markReview[`${item?.id}-${quesItem?.id}`]?.length ? (<span className="dot"></span>) : ''}
                                                                        {/* <span className="dot"></span> */}
                                                                        {quesIndex + 1}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </>
                                            )
                                        )}
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Offcanvas.Body>
                    </Offcanvas>


                    {/* New Instruction Offcanvas */}
                    <Offcanvas
                        className="instruction-popup queRight_panel p-0"
                        show={showInstruction}
                        onHide={() => {
                            setIsBodyClassActive(false);
                            instructionClose();
                        }}
                        placement="bottom"
                    >
                        <Offcanvas.Body>
                            <div className="queRight_panel-mobile">
                                <h5>Instructions</h5>
                                <ul className="bullet_list mb-0">
                                    {EvaluationListDetails.map((list, quesIndex) => (
                                        <>
                                            <li>Total {list?.total_number_of_question} Questions.</li>
                                            <li>Total Duration {list?.fixed_time}.</li>
                                            <li>The countdown timer in the top right corner of screen will display the remaining time for the quiz. When the timer reaches zero, the quiz will end by itself.</li>
                                            <li>The questions palette displayed on the right side of the screen will show the status of each question using one of the following symbols:</li>
                                        </>
                                    ))}
                                </ul>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link
                                        //href="#qes_section02"
                                        // eventKey="second"
                                        >
                                            {EvaluationListDetails[0]?.section_asset?.map(
                                                (item, sectionIndex) => (
                                                    <>
                                                        <ul className="qs_stutslist">
                                                            {item.question_section.map(
                                                                (quesItem, quesIndex) => (
                                                                    <li
                                                                        key={quesItem.id}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() =>
                                                                            handleListItemClick(
                                                                                // `${sectionIndex}-${quesIndex}`
                                                                                `${item?.id}-${quesItem?.id}`
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className={handleAnsweredQuizActive(item?.id, quesItem?.id)}>
                                                                            {" "}
                                                                            {quesIndex + 1}
                                                                            {markReview[`${item?.id}-${quesItem?.id}`]?.length ? (<span className="dot"></span>) : ''}
                                                                        </span>

                                                                        {QuizData[`${item?.id}-${quesItem?.id}`]?.length ? 'Answered Question' : "Pending Question"}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </>
                                                )
                                            )}
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>

                    {/* header */}


                    <Offcanvas
                        className="instruction-popup "
                        show={showHeader}
                        onHide={() => {
                            setIsBodyClassActive(false);
                            HeaderClose();
                        }}
                        placement="bottom"
                    >
                        <Offcanvas.Body>
                            <div class="que_head"><div class="d-flex justify-content-between mb-2"><h6> Process specific</h6><span>Questions<strong class="font-weight-600 ms-1">3</strong></span></div><p class="text-sm">This section contains questions related to process you typically follow. We wish to understand your better.</p><strong class="qus_number">1</strong></div>
                        </Offcanvas.Body>
                    </Offcanvas>


                    {/* SAVE & EXIT */}


                    <Modal
                        className="instruction-popup "
                        show={showSave}
                        onHide={() => {
                            setIsBodyClassActive(false);
                            SaveClose();
                        }}
                        centered
                    >
                        <Modal.Body>
                            <Modal.Header closeButton>
                                <img src={logoIcon} className="me-4" />
                                <Modal.Title>Quiz for {jobdetail?.job_title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="bg-white p-2 rounded text-center">
                                    <h5 className="mb-3">You have submitted the evaluation on {assestStatus?.asset_completion_date}.</h5>
                                    <p className="disc-text">Thank you for your time and efforts. The Quiz for {jobdetail?.job_title} will be used to evaluate your readiness for the job position. The next round of recruitment process will open for you based on your performance.</p>
                                    
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="justify-content-center" >
                                <Button variant="primary" onClick={handleClose}>
                                    Return to Job
                                </Button>
                            </Modal.Footer>
                        </Modal.Body>
                    </Modal >


                    <ul className="mobile-footer-quiz">
                        <li>
                            <button className="mobile-btn-footer" onClick={() => {
                                HeaderShow();
                                setIsBodyClassActive(!isBodyClassActive); // Toggle the state
                            }}>
                                <img src={Headericn} className="img-fluid" alt="Header icon" />
                                <p>
                                    Header</p>
                            </button>
                        </li>

                        <li>
                            <button className="mobile-btn-footer" onClick={() => {
                                questionShow();
                                setIsBodyClassActive(!isBodyClassActive);
                            }}>
                                <img src={gridicn} className="img-fluid" alt="Question icon" />
                                <p>  Question</p>
                            </button>
                        </li>


                        <li>
                            <button className="mobile-btn-footer" onClick={() => {
                                instructionShow();
                                setIsBodyClassActive(!isBodyClassActive);
                            }}>
                                <img src={instructionicn} className="img-fluid" alt="Header icon" />
                                <p>    Instructions </p>
                            </button>
                        </li>

                        <li>
                            <button className="mobile-btn-footer" onClick={() => {
                                SaveShow();
                                setIsBodyClassActive(!isBodyClassActive);
                            }}>
                                <img src={saveicn} className="img-fluid" alt="Header icon" />
                                <p>      Save & Exit </p>
                            </button>
                        </li>


                        {/* <li>
                            <button className="mobile-btn-footer" onClick={() => {
                                handleSubmit();
                                setIsBodyClassActive(!isBodyClassActive);
                            }}>
                                <img src={saveicn} className="img-fluid" alt="Header icon" />
                                <p>      Save & Exit </p>
                            </button>
                        </li> */}

                    </ul>
                </Modal.Body>
                <Modal.Footer className="quiz-modelfooter">
                    <Button variant="Light" className="btn-outline-secondary me-3" style={{padding: "8px 16px"}} >Save as Draft</Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <------------Complete Quiz--------------------------------- */}
            <Modal
                show={succees}
                onHide={handleClose}
                animation={false}
                size="lg"
                backdrop={false}
                className="bsreport_mdl"
            >
                <Modal.Header closeButton>
                    <img src={logoIcon} className="me-4" />
                    <Modal.Title>Quiz for {jobdetail?.job_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="bg-white p-5 rounded text-center">
                        <h5 className="mb-3">You have submitted the evaluation on {assestStatus?.asset_completion_date}.</h5>
                        <p className="disc-text">Thank you for your time and efforts. The Quiz for {jobdetail?.job_title} will be used to evaluate your readiness for the job position. The next round of recruitment process will open for you based on your performance.</p>
                     
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Return to Job
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}

export default AssignmentComponent