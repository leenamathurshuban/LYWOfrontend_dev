import React, { useEffect, useState, useRef } from 'react';
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Offcanvas,
    Row,
    Spinner
} from "react-bootstrap";
import Select from "react-select";
import cakeIQ from "../../images/icons/quiz/cake-IQ.svg";
import coffieIQ from "../../images/icons/quiz/coffie-IQ.svg";
import iceIQ from "../../images/icons/quiz/ice-crime-IQ.svg";
import teaIQ from "../../images/icons/quiz/tea-IQ.svg";
import penIQ from "../../images/icons/quiz/pen.svg";
import pencilIQ from "../../images/icons/quiz/pencil.svg";
import brushIQ from "../../images/icons/quiz/brush.svg";
import markerIQ from "../../images/icons/quiz/marker.svg";
import movieIQ from "../../images/icons/quiz/movie.svg";
import bookIQ from "../../images/icons/quiz/book.svg";
import travelIQ from "../../images/icons/quiz/travel.svg";
import partyIQ from "../../images/icons/quiz/party.svg";

import closeBtn from "../../images/icons/closeX.svg";
import logoIcon from "../../images/logo_icon.png";
import pink_brb from "../../images/icons/pink_brb.svg";
import choice_brb from "../../images/icons/choice_brb.svg";
import choice_normal_3 from "../../images/icons/choice2normal.svg";
import choice_normal_4 from "../../images/icons/choice1normal.svg";

import langicon from "../../images/icons/globe-01.svg";
import helpicon from "../../images/icons/help-circle.svg";
import gridicon from "../../images/icons/grid-01.svg";

import stack2_brb from "../../images/icons/stack 2_brb.svg";
import option_brb from "../../images/icons/option_brb.svg";
import infogray from "../../images/icons/info_gray.svg";
import globgray from "../../images/icons/glob_gray.svg";
import rocket from "../../images/rocket.png";
import popSucess from "../../images/popSuc.png";
import SuggNormal from "../../images/icons/sugg_normal.svg";
import SuggLealike from "../../images/icons/sugg_lealike.svg";
import QuizSlider from "../../components/QuizSlider";
import { ApplicationDeatilsApi, ApplicationFormDetailsApi, getApplicantBehaviourDetailApi, getAssetDataDetailsAPI, getQuizQuestionListAPi, postQuizQuestionApi, updateApplicantBehaviourApi } from '../../services/provider';
import QuizQuestionSlider from '../../components/QuizQuestionSlider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BehaviouralAst = ({ behaviourAssModel, setBehaviourAssModel, jobPostData }) => {
    const [show, setShow] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false)
    const handleInstructionModel = () => setShowInstruction(false);


    const [popupShow, setPopupShow] = useState(false);
    const [assetData,setAssetData] = useState([])
    const handleClosePop = () => {
        if (complete && runCounter() == 28) {
            handleSubmit();
            setPopupShow(false)
        } else {
            setPopupShow(false);
        }
    }

    const [active, setActive] = useState(false);

    const [qshow, qsetShow] = useState(false);


  

    const qhandleClose = () => qsetShow(false);
    const qhandleShow = () => qsetShow(true);

       const [langshow, langsetShow] = useState(false);

     const langhandleClose = () => langsetShow(false);
    const langhandleShow = () => langsetShow(true);

    const popupRef = useRef(null);

    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    // let applicantId = JSON.parse(localStorage.getItem('applicantData'))
    let applicantId = JSON.parse(localStorage.getItem("applicantProfileData"))
    let applicantUid = JSON.parse(localStorage.getItem("applicantData"))
    let behavioralId = JSON.parse(localStorage.getItem('applicantBehaviour'))
    // let applicantId = JSON.parse(sessionStorage.getItem('applicantData'))
    // let behavioralId = JSON.parse(sessionStorage.getItem('applicantBehaviour'))

    const [mostLeastLike, setMostLeastLike] = useState([
        { id: 1, most: "", least: "", options: [{ name: "Ice Cream", img: iceIQ }, { name: "Tea", img: teaIQ }, { name: "Cake", img: cakeIQ }, { name: "Coffee", img: coffieIQ }] },
        { id: 2, most: "", least: "", options: [{ name: "Pen", img: penIQ }, { name: "Pencil", img: pencilIQ }, { name: "Brush", img: brushIQ }, { name: "Marker", img: markerIQ }] },
        { id: 3, most: "", least: "", options: [{ name: "Movie", img: movieIQ }, { name: "Book", img: bookIQ }, { name: "Travel", img: travelIQ }, { name: "Party", img: partyIQ }] }
    ]);
    const [quizMostLeastLike, setQuizMostLeastLike] = useState([]);
    const [attemptQuiz, setAttemptQuiz] = useState([])
    const [attemptLeastQuiz, setAttemptLeastQuiz] = useState([])
    const [complete, setComplete] = useState(false)
    const [language, setLanguage] = useState('english')
    const langOption = [
        { value: "english", label: "English" },
        { value: "hindi", label: "Hindi" },
        { value: "gujrati", label: "Gujrati" },
        { value: "kannada", label: "Kannada" },
        { value: "tamil", label: "Tamil" },
        { value: "telugu", label: "Telugu" },
    ]
    const allSelectionsMade = mostLeastLike.every(row => row.most !== "" && row.least !== "");
    const handleClose = () => {
        if (!quizMostLeastLike.length) {
            setShow(false);
        } else {
            setPopupShow(true)
        }
        setBehaviourAssModel(false)
    }
    const getApplicantBehaviourDetail = async (id) => {
        try {
            // const response = await getApplicantBehaviourDetailApi(behavioralId?.uid);
            const user = applicantId.user_login.email ? applicantId.user_login.email : applicantId.applcant.user
            const response = await ApplicationDeatilsApi(user)
            if (response?.data?.success) {
                setAttemptQuiz(response?.data?.response?.most_like?.map((cv) => cv.uid))
                setAttemptLeastQuiz(response?.data?.response?.least_like?.map((cv) => cv.uid))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "#deebff"
                : state.isFocused
                    ? "#deebff" // Color on hover
                    : "inherit",
            color: state.isSelected ? "#000" : "black",
            cursor: "pointer",
            // Optional: improves UX on hover
        }),
    };

    const getQuizQuestion = async (id) => {
        try {
            const response = await getQuizQuestionListAPi();
            if (response?.data?.success) {
                if (!attemptQuiz.length) {
                    setQuizMostLeastLike(response?.data?.response?.map((prev) => ({ ...prev, most: '', least: '', mostList: [], leastList: [] })).sort((a, b) => a.id - b.id))
                } else {
                    let newArray = response?.data?.response?.map((prev) => ({ ...prev, most: '', least: '', mostList: [], leastList: [] })).sort((a, b) => a.id - b.id);
                    setQuizMostLeastLike(newArray?.filter(row =>
                        !row?.behaviour_options?.some(obj => attemptQuiz?.includes(obj.uid))
                    ))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const applicantDetailAPI = async () => {
        try {            
            const res = await getAssetDataDetailsAPI(jobPostData?.uid, applicantUid?.applicant_data?.uid)
            if (res?.success) {
                setAssetData(res?.response?.job?.asset_job)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getApplicantBehaviourDetail()
        applicantDetailAPI()
    }, [])
    useEffect(() => {
        if (attemptQuiz.length && attemptLeastQuiz.length) {
            getQuizQuestion()
        }

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && !event.target.closest('.language-btn')) {
                setActive(false);

            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [attemptQuiz, attemptLeastQuiz])
    const handleSubmitAll = () => {
        if (allSelectionsMade) {
            setPopupShow(true)
            setMostLeastLike([
                { id: 1, most: "", least: "", options: [{ name: "Ice Cream", img: iceIQ }, { name: "Tea", img: teaIQ }, { name: "Cake", img: cakeIQ }, { name: "Coffee", img: coffieIQ }] },
                { id: 2, most: "", least: "", options: [{ name: "Pen", img: penIQ }, { name: "Pencil", img: pencilIQ }, { name: "Brush", img: brushIQ }, { name: "Marker", img: markerIQ }] },
                { id: 3, most: "", least: "", options: [{ name: "Movie", img: movieIQ }, { name: "Book", img: bookIQ }, { name: "Travel", img: travelIQ }, { name: "Party", img: partyIQ }] }
            ])
        } else {
            // handleSubmit()
            setComplete(true)
            setPopupShow(true)
        }
    }
    function runCounter() {
        if (quizMostLeastLike.flatMap(row => row.mostList).length === quizMostLeastLike.flatMap(row => row.leastList).length) {
            return quizMostLeastLike.flatMap(row => row.mostList).length + attemptQuiz.length;
        } else if (quizMostLeastLike.flatMap(row => row.mostList).length > quizMostLeastLike.flatMap(row => row.leastList).length) {
            return (quizMostLeastLike.flatMap(row => row.mostList).length + attemptQuiz.length) - 1
        } else if (quizMostLeastLike.flatMap(row => row.mostList).length < quizMostLeastLike.flatMap(row => row.leastList).length) {
            return (quizMostLeastLike.flatMap(row => row.leastList).length + attemptLeastQuiz.length) - 1
        }
    }
    const handleSubmit = async () => {
        if (!quizMostLeastLike.length) {
            getQuizQuestion();
            applicantDetailAPI();
            setPopupShow(false)
        } else {
            try {
                const formData = new FormData();
                if (!attemptQuiz.length) {
                    formData.append('job_uid', jobPostData?.uid);
                    formData.append('most_like', JSON.stringify(quizMostLeastLike.flatMap(row => row.mostList)));
                    formData.append('least_like', JSON.stringify(quizMostLeastLike.flatMap(row => row.leastList)));
                    if (runCounter() < 28) {
                        formData.append('behaviour_status', 'Draft');
                    } else if (runCounter() === 28) {
                        formData.append('behaviour_status', 'Completed');
                    }
                    // debugger
                    const UID = applicantUid?.applicant_data?.uid
                    // const response = await ApplicationFormDetailsApi(formData, applicantId.applcant.uid)
                    setIsLoading(true)
                    const response = await ApplicationFormDetailsApi(formData, UID)
                    if (response?.data?.success) {
                        setIsLoading(false)
                        setPopupShow(false)
                        // setComplete(true)
                        localStorage.setItem('applicantBehaviour', JSON.stringify(response?.data?.response))
                        // sessionStorage.setItem('applicantBehaviour',JSON.stringify(response?.data?.response))   
                        localStorage.setItem("AttemptStatus", runCounter())
                        // sessionStorage.setItem("AttemptStatus",runCounter())                         
                        if (runCounter() === 28) {
                            // jobPostData?.asset_job?.map((Val) => {
                            //     if (Val?.asset_title === 'Technical round for EHS Manager') {
                            //         navigate(`/evaluation-quiz/${Val?.uid}`, { state: jobPostData })
                            //     }
                            // })
                            if(assetData?.length){
                                assetData?.map((Val) => {
                                if (Val?.asset_type === 'Quiz') {
                                    navigate(`/evaluation-quiz/${Val?.uid}`, { state: jobPostData })
                                }
                            })
                            }else{
                                toast.info('Quiz is not assigned for this job')
                            }                            
                        } else {
                            setShow(false)
                        }
                    }
                } else {
                    let mostLike = quizMostLeastLike.flatMap(row => row.mostList);
                    let leastLike = quizMostLeastLike.flatMap(row => row.leastList)
                    formData.append('job_uid', jobPostData?.uid);
                    formData.append('most_like', JSON.stringify([...attemptQuiz, ...mostLike]));
                    formData.append('least_like', JSON.stringify([...attemptLeastQuiz, ...leastLike]));
                    if (runCounter() < 28) {
                        formData.append('behaviour_status', 'Draft');
                    } else if (runCounter() === 28) {
                        formData.append('behaviour_status', 'Completed');
                    }
                    // const response = await updateApplicantBehaviourApi(behavioralId?.uid, formData);
                    setIsLoading(true)
                    const response = await ApplicationFormDetailsApi(formData, behavioralId?.uid);
                    if (response?.data?.success) {
                        setIsLoading(false)
                        setPopupShow(false)
                        // setComplete(true)
                        localStorage.setItem('applicantBehaviour', JSON.stringify(response?.data?.response))
                        // sessionStorage.setItem('applicantBehaviour',JSON.stringify(response?.data?.response))
                        localStorage.setItem("AttemptStatus", runCounter())
                        // sessionStorage.setItem("AttemptStatus",runCounter())  
                        if (runCounter() === 28) {
                            // jobPostData?.asset_job?.map((Val) => {
                            //     if (Val?.asset_title === 'Technical round for EHS Manager') {
                            //         navigate(`/evaluation-quiz/${Val?.uid}`, { state: jobPostData })
                            //     }
                            // })
                            if(assetData?.length){
                                assetData?.map((Val) => {
                                if (Val?.asset_type === 'Quiz') {
                                    navigate(`/evaluation-quiz/${Val?.uid}`, { state: jobPostData })
                                }
                            })
                            }else{
                                toast.info('Quiz is not assigned for this job')
                            }                            
                        } else {
                            setShow(false)
                        }
                        // setTimeout(() => {
                        //     window.location.reload();
                        // }, 1000)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    console.log('----------------->', quizMostLeastLike.filter(row =>
        !row?.behaviour_options?.some(obj => attemptQuiz?.includes(obj.uid))
    ))
    console.log(quizMostLeastLike.flatMap(row => row.mostList).length)
    console.log(attemptQuiz.length, attemptLeastQuiz.length)
    console.log(runCounter())
    console.log(showInstruction)
    return (
        <>
            <Modal
                show={behaviourAssModel}
                onHide={handleClose}
                animation={false}
                size="lg"
                backdrop={false}
                className="beharlasmnt_mdl"
            >
                <Modal.Header closeButton>
                    <img src={logoIcon} className="me-4" />
                    <Modal.Title>Behavioural Assessment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={12} className="bg-white rounded p-3"><h5>Behavioural Assessment for {jobPostData?.job_title}</h5></Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12} className="behaivr-model-ass bg-white rounded p-5 shadow-md border">
                                <Row>
                                    <Col md={3} className='col-6' >
                                        <div className="brb_cards">
                                            <span className="brb-cicon"><img src={stack2_brb} /></span>
                                            <h6>28 Sets</h6>
                                        </div>
                                    </Col>
                                    <Col md={3} className='col-6'>
                                        <div className="brb_cards">
                                            <span className="brb-cicon"><img src={option_brb} /></span>
                                            <h6>4 Options</h6>
                                        </div>
                                    </Col>
                                    <Col md={3} className='col-6'>
                                        <div className="brb_cards most_like">
                                            <span className="brb-cicon">

                                                <img src={choice_normal_3} className='normal-choice' />
                                                <img src={choice_brb} className='hover-choice' />

                                            </span>

                                            <h6>Pick one "Most Like” you</h6>
                                        </div>
                                    </Col>
                                    <Col md={3} className='col-6' >
                                        <div className="brb_cards least_like">
                                            <span className="brb-cicon">

                                                <img src={pink_brb} className='hover-choice' />
                                                <img src={choice_normal_4} className='normal-choice' />

                                            </span>
                                            <h6>Pick one "Least Like” you</h6>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3 mb-5">
                            <Col md={12} className="bg-white rounded p-3 keypoints">
                                <h6>Recommendations </h6>
                                <ul>
                                    <li> Do not overthink your decisions.</li>
                                    <li> There are no right or wrong choices.</li>
                                    <li> Complete the behavioral test in one sitting.</li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(true)}>
                        Start
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="lg"
                backdrop={false}
                className="beharquiz_mdl"
            >
                <Modal.Header closeButton>
                    <img src={logoIcon} className="me-4" />
                    <Modal.Title>Behavioural Assessment</Modal.Title>
                    <div className="score_panel">
                        <span className="att_count"> <span>Attempted </span>  <strong>{runCounter()} / 28</strong></span>
                        <button type="button" onClick={() => setShowInstruction(true)} className="me-3 btn-light-outline-sm m-hide" style={{ height: '38px' }}><img src={infogray} />Instructions</button>
                        <button type="button" className="btn-light-outline-sm me-3 setlanguage m-hide"><img src={globgray} />
                            {/* <Form.Select
                                name="currency"
                                aria-label="Default select example"
                                className="sm-fselect"
                                value={language}
                                onChange={(e) => {
                                    setLanguage(e?.target?.value);
                                    // getQuizQuestion()
                                }}
                            >
                                <option selected value="english">English</option>
                                <option selected value="hindi">Hindi</option>
                                <option selected value="gujrati">Gujrati</option>
                                <option selected value="kannada">Kannada</option>
                                <option selected value="tamil">Tamil</option>
                                <option selected value="telugu">Telugu</option>
                            </Form.Select> */}
                            <Select
                                options={langOption}
                                value={langOption?.find((opt) => opt?.value === language)}
                                onChange={(e) => {
                                    setLanguage(e.value);
                                }}
                                styles={customStyles}
                                className="sm-fselect react_selectbox"
                            />
                        </button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {!quizMostLeastLike?.length && !attemptQuiz.length ? (
                            <QuizSlider
                                mostLeastLike={mostLeastLike}
                                setMostLeastLike={setMostLeastLike}
                            />
                        ) : (
                            <QuizQuestionSlider
                                quizMostLeastLike={quizMostLeastLike}
                                setQuizMostLeastLike={setQuizMostLeastLike}
                                language={language}
                                counter={runCounter()}
                            />
                        )}
                    </Row>
                    {quizMostLeastLike.flatMap(row => row.mostList).length === 3 && quizMostLeastLike.flatMap(row => row.leastList).length === 3 && (
                        <div className="toster great">
                            <img src={closeBtn} className='closebtn' />
                            <div className='d-flex align-items-center'>
                                <h6>Great Start!</h6>
                                <span>Take a deep breath and continue.</span>
                            </div>
                        </div>
                    )}
                    {quizMostLeastLike.flatMap(row => row.mostList).length === 10 && quizMostLeastLike.flatMap(row => row.leastList).length === 10 && (
                        <div className="toster right-track-tst">
                            <img src={closeBtn} className='closebtn' />
                            <div className='right-track-toast '>
                                <h6>On the Right Track!</h6>
                                <span>Don't overthink your choices.</span>
                            </div>
                        </div>
                    )}
                    {quizMostLeastLike.flatMap(row => row.mostList).length === 20 && quizMostLeastLike.flatMap(row => row.leastList).length === 20 && (
                        <div className="toster">
                            <img src={closeBtn} className='closebtn' />
                            <h6>Almost There</h6>
                            <span>Just a few more choices to go!</span>
                        </div>
                    )}

                </Modal.Body>
                <Modal.Footer>




                    <div className='job-post-footer behavvoior-footer-menu'>
                        <div className='mobile-footer lang-help-btn'>
                            <div className='language-btn' onClick={langhandleShow}>
                                <img src={langicon} className='lng' /> <br></br>

                                Language
                            </div>


                            <div className='language-btn' onClick={qhandleShow}  >
                                <img src={gridicon} className='lng' /> <br></br>

                                Question
                            </div>

                            <div onClick={() => setShowInstruction(true)} className='language-btn'>
                                <img src={helpicon} className='lng' /> <br></br>

                                Instructions
                            </div>
                        </div>
                    </div>

                     


                    <Offcanvas
                        show={qshow} onHide={qhandleClose}
                        backdropClassName='custom-backdrop'
                        backdrop={true}
                        className="question-model-pop"
                        placement='bottom'
                    >
                        <Offcanvas.Body className='question-popop'>

                            <div className='d-flex justify-content-between'>
                                <div className='range-progress'>
                                    <strong className="font-20">50%</strong> Complete
                                </div>
                                <div className='attempted'>
                                    <span className="att_count"> <span>Attempted </span>  <strong className="font-20">{runCounter()} / 28</strong></span>
                                </div>
                            </div>

                            <div className='slick-mumber-dot'>
                                <ul className='number-dot-pagination'>
                                    <li className='complete' >1</li>
                                    <li className='complete'>2</li>
                                    <li className='complete'>3</li>
                                    <li className='complete'>4</li>
                                    <li>5</li>
                                    <li>6</li>
                                    <li>7</li>
                                    <li>8</li>
                                    <li>9</li>

                                    <li>10</li>

                                    <li>11</li>
                                    <li>12</li>
                                    <li>13</li>
                                    <li>14</li>
                                    <li>15</li>
                                    <li>16</li>
                                    <li>17</li>
                                    <li>18</li>
                                    <li>19</li>

                                    <li>20</li>


                                    <li>21</li>
                                    <li>22</li>
                                    <li>23</li>
                                    <li>24</li>
                                    <li>25</li>
                                    <li>26</li>
                                    <li>27</li>
                                    <li>28</li>

                                </ul>
                            </div>


                        </Offcanvas.Body>
                    </Offcanvas>


                    {/* language modal */}

                                   <Offcanvas
                        show={langshow} onHide={langhandleClose}
                        backdropClassName='custom-backdrop'
                        backdrop={true}
                        className="question-model-pop language-model"
                        placement='bottom'
                    >
                        <Offcanvas.Body className='question-popop'>

                            <div className='d-flex justify-content-between'>
                                <div className='range-progress'>
                                    <strong className="font-20">Select Language</strong> 
                                </div>
                              
                            </div>


                            <div className='choose-languae-mobile'>

                            <button type="button" className="btn-light-outline-sm me-3 setlanguage m-show">
                                
                                {/* <img src={globgray} /> */}


                            {/* <Form.Select
                                name="currency"
                                aria-label="Default select example"
                                className="sm-fselect"
                                value={language}
                                onChange={(e) => {
                                    setLanguage(e?.target?.value);
                                    // getQuizQuestion()
                                }}
                            >
                                <option selected value="english">English</option>
                                <option selected value="hindi">Hindi</option>
                                <option selected value="gujrati">Gujrati</option>
                                <option selected value="kannada">Kannada</option>
                                <option selected value="tamil">Tamil</option>
                                <option selected value="telugu">Telugu</option>
                            </Form.Select> */}
                            <Select
                                options={langOption}
                                value={langOption?.find((opt) => opt?.value === language)}
                                onChange={(e) => {
                                    setLanguage(e.value);
                                }}
                                styles={customStyles}
                                className="sm-fselect react_selectbox"
                            />
                        </button>

                        </div>

                            


                        </Offcanvas.Body>
                    </Offcanvas>




                    {allSelectionsMade && (
                        <Button variant="primary" onClick={handleSubmitAll}>
                            Submit
                        </Button>
                    )}
                    {quizMostLeastLike.length > 0 && (quizMostLeastLike?.flatMap(row => row?.mostList)?.length === quizMostLeastLike.length) &&
                        (quizMostLeastLike?.flatMap(row => row?.leastList)?.length === quizMostLeastLike.length) && (
                            <Button variant="primary" onClick={handleSubmitAll}>
                                Submit
                            </Button>
                        )}
                </Modal.Footer>
            </Modal>



            {/* question progress modal */}



            {/* modal  */}


            <Modal
                show={popupShow}
                onHide={handleClosePop}
                className="confirmation_model behaviour-model proceed-quiz-model"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                {!quizMostLeastLike.length && <img src={rocket} />}
                {complete && (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.mostList).length) &&
                    (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.leastList).length) && <img src={popSucess} />}
                <Modal.Body className="text-center">
                    {/* <h3>{!quizMostLeastLike.length ? 'Are you ready to start?' : 'Are you sure you want to exit?'}</h3>
                    <p>{!quizMostLeastLike.length ? 'You can always click on to revisit instructions.' :
                        'We recommend completing the test in a single session.'} </p> */}
                    <h3>
                        {!quizMostLeastLike.length && 'Are you ready to start?'}
                        {quizMostLeastLike.length > 0 && (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.leastList).length) && 'Are you sure you want to exit?'}
                        {complete && (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.leastList).length) && 'Behavioral Assessment Submitted Successfully'}
                    </h3>
                    <p>
                        {!quizMostLeastLike.length && 'You can always click on to revisit instructions.'}
                        {quizMostLeastLike.length > 0 && (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.leastList).length) && 'We recommend completing the test in a single session.'}
                        {complete && (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.leastList).length) && 'Your responses have been successfully submitted. Log in using your email ID to access a detailed personality report.'}
                    </p>
                </Modal.Body>
                <Modal.Footer className='modal-btn-1-1'>
                    <Button className='button-30' variant="light" onClick={handleClosePop}>
                        {!quizMostLeastLike.length && 'Back'}
                        {quizMostLeastLike.length > 0 && (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.leastList).length) && 'Continue with Test'}
                        {complete && (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.leastList).length) && 'Return to Job'}
                    </Button>
                    <Button className='button-70' variant="primary"
                        onClick={handleSubmit}
                    >
                        {isLoading && <Spinner animation="border" variant="light" />}
                        {!quizMostLeastLike.length && 'Start Test'}
                        {quizMostLeastLike.length > 0 && (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.leastList).length) && !isLoading && 'Save and Exit'}
                        {complete && (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.leastList).length) && isLoading && `Proceed to Quiz for ${jobPostData.job_title}`}
                    Proceed to Quiz
                    </Button>
                </Modal.Footer>
            </Modal>
            <Offcanvas
                show={showInstruction}
                onHide={handleInstructionModel}
                backdrop={true}
                backdropClassName='custom-backdrop'
                placement="end"
                className="instructions_dwr lg-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Important Instructions</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className='mt-3'>
                        <Col md={4} className='mobile-hide' >
                            <div className="ints_card normal">
                                <span className="itns_icon">
                                    <img src={iceIQ} />
                                </span>
                                <h4>Ice Cream</h4>
                                <div className='mlike-sugg'>
                                    <img src={SuggNormal} />
                                    <span>Hover over the cards below to begin.</span>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className='col-6' >
                            <div className="ints_card hover">
                                <span className="itns_icon">
                                    <img src={iceIQ} />
                                </span>
                                <h4>Ice Cream</h4>
                                <div className='quiz-btns'>
                                    <button type="button" class="btn-up"><i class="fa fa-arrow-up"></i></button>
                                    <button type="button" class="btn-down"><i class="fa fa-arrow-down "></i></button>
                                    <div className='mlike-sugg'>
                                        <img src={SuggNormal} />
                                        <span>Click to pick “Most Like”</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className='col-6' >
                            <div className="ints_card hover lelike">
                                <span className="itns_icon">
                                    <img src={iceIQ} />
                                </span>
                                <h4>Ice Cream</h4>
                                <div className='quiz-btns'>
                                    <button type="button" class="btn-up"><i class="fa fa-arrow-up"></i></button>
                                    <button type="button" class="btn-down"><i class="fa fa-arrow-down "></i></button>
                                    <div className='mlike-sugg'>
                                        <span>Click to pick “Least Like”</span>
                                        <img src={SuggLealike} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className='mt-6 col-6'>
                            <div className="ints_card hover lelike_select">
                                <span className="itns_icon">
                                    <img src={iceIQ} />
                                </span>
                                <h4>Ice Cream</h4>
                                <div className='quiz-btns'>
                                    <button type="button" class="btn-up"><i class="fa fa-arrow-up"></i></button>
                                    <button type="button" class="btn-down"><i class="fa fa-times"></i></button>
                                    <div className='mlike-sugg'>
                                        <span>Click to remove the selection</span>
                                        <img src={SuggLealike} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className='mt-6 col-6'>
                            <div className="ints_card hover mlike_select">
                                <span className="itns_icon">
                                    <img src={iceIQ} />
                                </span>
                                <h4>Ice Cream</h4>
                                <div className='quiz-btns'>
                                    <button type="button" class="btn-up"><i class="fa fa-times"></i></button>
                                    <button type="button" class="btn-down"><i class="fa fa-arrow-down "></i></button>
                                    <div className='mlike-sugg'>
                                        <img src={SuggNormal} />
                                        <span>Click to remove the selection</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <h6 style={{ marginTop: '5rem' }}>Recommendations </h6>
                    <ul>
                        <li>The test contains 28 questions.</li>
                        <li>Do not overthink your decisions.</li>
                        <li>There are no right or wrong choices.</li>
                        <li>Complete the behavioral test in one sitting.</li>
                        <li>For each question, you will be given 4 options.</li>
                        <li>Select one most like you and one least like you.</li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>



        </>
    )
}

export default BehaviouralAst