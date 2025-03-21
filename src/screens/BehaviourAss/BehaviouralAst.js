import React, { useEffect, useState } from 'react';
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row
} from "react-bootstrap";
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
import stack2_brb from "../../images/icons/stack 2_brb.svg";
import option_brb from "../../images/icons/option_brb.svg";
import infogray from "../../images/icons/info_gray.svg";
import globgray from "../../images/icons/glob_gray.svg";
import rocket from "../../images/rocket.png";
import popSucess from "../../images/popSuc.png";
import QuizSlider from "../../components/QuizSlider";
import { ApplicationDeatilsApi, ApplicationFormDetailsApi, getApplicantBehaviourDetailApi, getQuizQuestionListAPi, postQuizQuestionApi, updateApplicantBehaviourApi } from '../../services/provider';
import QuizQuestionSlider from '../../components/QuizQuestionSlider';
import { useNavigate } from 'react-router-dom';

const BehaviouralAst = () => {
    const [show, setShow] = useState(false);
    const [popupShow, setPopupShow] = useState(false);
    const handleClosePop = () => setPopupShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    // let applicantId = JSON.parse(localStorage.getItem('applicantData'))
    let applicantId = JSON.parse(localStorage.getItem("applicantProfileData"))
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
    const [language,setLanguage] = useState('english')
    const allSelectionsMade = mostLeastLike.every(row => row.most !== "" && row.least !== "");
    const handleClose = () => {
        if (!quizMostLeastLike.length) {
            setShow(false);
        } else {
            setPopupShow(true)
        }
    }
    const getApplicantBehaviourDetail = async (id) => {
        try {
            // const response = await getApplicantBehaviourDetailApi(behavioralId?.uid);
            const response = await ApplicationDeatilsApi(applicantId.applcant.user)
            if (response?.data?.success) {
                setAttemptQuiz(response?.data?.response?.most_like?.map((cv) => cv.uid))
                setAttemptLeastQuiz(response?.data?.response?.least_like?.map((cv) => cv.uid))
            }
        } catch (error) {
            console.log(error)
        }
    }
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
    useEffect(() => {
        getApplicantBehaviourDetail()
    }, [])
    useEffect(() => {
        if (attemptQuiz.length && attemptLeastQuiz.length) {
            getQuizQuestion()
        }
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
            handleSubmit()
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
            setPopupShow(false)
        } else {
            try {
                const formData = new FormData();
                if (!attemptQuiz.length) {
                    // formData.append('applicant', applicantId?.uid);
                    formData.append('most_like', JSON.stringify(quizMostLeastLike.flatMap(row => row.mostList)));
                    formData.append('least_like', JSON.stringify(quizMostLeastLike.flatMap(row => row.leastList)));
                    if(runCounter()<28){
                        formData.append('behaviour_status', 'Draft');
                    }else if(runCounter()===28){
                        formData.append('behaviour_status', 'Completed');
                    }                    
                    // debugger
                    const response = await ApplicationFormDetailsApi(formData,applicantId.applcant.uid)
                    if (response?.data?.success) {
                        setPopupShow(false)
                        setComplete(true)
                        localStorage.setItem('applicantBehaviour',JSON.stringify(response?.data?.response))  
                        // sessionStorage.setItem('applicantBehaviour',JSON.stringify(response?.data?.response))   
                        localStorage.setItem("AttemptStatus",runCounter())
                        // sessionStorage.setItem("AttemptStatus",runCounter())
                        // navigate('/JobPosts')     
                        navigate(-1)              
                    }
                } else {
                    let mostLike = quizMostLeastLike.flatMap(row => row.mostList);
                    let leastLike = quizMostLeastLike.flatMap(row => row.leastList)
                    formData.append('most_like', JSON.stringify([...attemptQuiz, ...mostLike]));
                    formData.append('least_like', JSON.stringify([...attemptLeastQuiz, ...leastLike]));
                    if(runCounter()<28){
                        formData.append('behaviour_status', 'Draft');
                    }else if(runCounter()===28){
                        formData.append('behaviour_status', 'Completed');
                    }
                    // const response = await updateApplicantBehaviourApi(behavioralId?.uid, formData);
                    const response = await ApplicationFormDetailsApi(formData,behavioralId?.uid);
                    if (response?.data?.success) {
                        setPopupShow(false)
                        setComplete(true)
                        localStorage.setItem('applicantBehaviour',JSON.stringify(response?.data?.response))
                        // sessionStorage.setItem('applicantBehaviour',JSON.stringify(response?.data?.response))
                        localStorage.setItem("AttemptStatus",runCounter())
                        // sessionStorage.setItem("AttemptStatus",runCounter())
                        // navigate('/JobPosts')
                        navigate(-1)
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
    return (
        <>
            <Modal
                show={true}
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
                            <Col md={12} className="bg-white rounded p-3"><h5>Behavioural Assessment for Sr. Developer - Python</h5></Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={12} className="bg-white rounded p-5 shadow-md border">
                                <Row>
                                    <Col md={3}>
                                        <div className="brb_cards">
                                            <img src={stack2_brb} />
                                            <h6>28 Sets</h6>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="brb_cards">
                                            <img src={option_brb} />
                                            <h6>4 Options</h6>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="brb_cards most_like">
                                            <img src={choice_brb} />
                                            <h6>Pick one "Most Like” you</h6>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="brb_cards least_like">
                                            <img src={pink_brb} />
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
                        <span className="att_count">Attempted <strong>{runCounter()} / 28</strong></span>
                        <button type="button" className="outline_scorebtn me-3"><img src={infogray} />Instructions</button>
                        <button type="button" className="outline_scorebtn me-3 setlanguage"><img src={globgray} />
                            <Form.Select
                                name="currency"
                                aria-label="Default select example"
                                className="sm-fselect"
                                value={language}
                                onChange={(e)=>{setLanguage(e?.target?.value);getQuizQuestion()}}
                            >
                                <option selected value="english">English</option>
                                <option selected value="hindi">Hindi</option>
                                <option selected value="gujrati">Gujrati</option>
                                <option selected value="kannada">Kannada</option>
                                <option selected value="tamil">Tamil</option>
                                <option selected value="telugu">Telugu</option>
                            </Form.Select>
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
                            />
                        )}                        
                    </Row>
                    {quizMostLeastLike.flatMap(row => row.mostList).length === 3 && quizMostLeastLike.flatMap(row => row.leastList).length === 3 && (
                        <Row className="bg-white rounded px-6 py-5">
                            <img src={closeBtn} width={30} height={30} />
                            <h6>Great Start!</h6>
                            <span>Take a deep breath and continue.</span>
                        </Row>
                    )}
                    {quizMostLeastLike.flatMap(row => row.mostList).length === 10 && quizMostLeastLike.flatMap(row => row.leastList).length === 10 && (
                        <Row className="bg-white rounded px-6 py-5">
                            <img src={closeBtn} width={30} height={30} />
                            <h6>On the Right Track!</h6>
                            <span>Don't overthink your choices.</span>
                        </Row>
                    )}
                    {quizMostLeastLike.flatMap(row => row.mostList).length === 20 && quizMostLeastLike.flatMap(row => row.leastList).length === 20 && (
                        <Row className="bg-white rounded px-6 py-5">
                            <img src={closeBtn} width={30} height={30} />
                            <h6>Almost There</h6>
                            <span>Just a few more choices to go!</span>
                        </Row>
                    )}

                </Modal.Body>
                <Modal.Footer>
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

            <Modal
                show={popupShow}
                onHide={handleClosePop}
                className="confirmation_model"
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
                <Modal.Footer>
                    <Button variant="light" onClick={handleClosePop}>
                        {!quizMostLeastLike.length && 'Back'}
                        {quizMostLeastLike.length > 0 && (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.leastList).length) && 'Continue with Test'}
                        {complete && (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.leastList).length) && 'Return to Job'}
                    </Button>
                    <Button variant="primary"
                        onClick={handleSubmit}
                    >
                        {!quizMostLeastLike.length && 'Start Test'}
                        {quizMostLeastLike.length > 0 && (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length > quizMostLeastLike.flatMap(row => row.leastList).length) && 'Save and Exit'}
                        {complete && (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.mostList).length) &&
                            (quizMostLeastLike.length === quizMostLeastLike.flatMap(row => row.leastList).length) && 'Proceed to Quiz for Sr. Developer - Python'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BehaviouralAst