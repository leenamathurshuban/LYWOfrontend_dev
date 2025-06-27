// import React, { useEffect, useState } from 'react'
// import { Button, Card, Col, Form, InputGroup, ProgressBar, Row, Tab } from 'react-bootstrap';
// import userDark from "../../../images/icons/users-dark.svg";
// import belltedArrow from "../../../images/bullt_icon.svg";
// import tickCircle from "../../../images/tick-circle.svg";
// import crossCircle from "../../../images/cross-circle.svg";

// const CandidateQuestionList = ({ data }) => {
//     const [secWiseListQue, setSecWiseListQue] = useState(data[0]);
//     useEffect(() => {
//         setSecWiseListQue(data?.filter((_, index) => index == 0))
//     }, [])
//     const handleSectionWise = (e) => {
//         const { value } = e.target;
//         const filterData = data?.filter((val) => val.uid == value);
//         setSecWiseListQue(filterData);
//     }
//     const getIcon = (correct, selected) => {
//         if (correct === selected) {
//             return (
//                 <img src={tickCircle} width={20} height={20} />
//             )
//         } else if (correct !== selected) {
//             return (
//                 <img src={crossCircle} width={20} height={20} />
//             )
//         }

//     };
//     const getIconByMcq = (correct, single,option) => {        
//         if (correct != undefined && single != undefined) {
//             if (correct === single) {
//                 return (
//                     <img src={tickCircle} width={20} height={20} />
//                 )
//             } else {
//                 return (
//                     <img src={crossCircle} width={20} height={20} />
//                 )
//             }
//         }          
//     }
//     const getIconByMcqMul = (correct, single,option) => {               
//         if (single != undefined) {            
//             if(correct.includes(single)){
//                 return (
//                     <img src={tickCircle} width={20} height={20} />
//                 )
//             }else {
//                 return (
//                     <img src={crossCircle} width={20} height={20} />
//                 )
//             }
//         }          
//     }
//     console.log(secWiseListQue)
//     return (
//         <div>
//             <Card className="rounded border-0 review_card">
//                 <Card.Body>
//                     <Row>
//                         {/* {assignmentReviewList.map((item, index) => ( */}
//                         <Col md={2} className="queslsit_panel pe-0">
//                             <Form.Select className="qs_dropdown"
//                                 onChange={handleSectionWise}
//                             >
//                                 {data.map((cVal) => (
//                                     <option value={cVal?.uid}>{cVal?.section_title}</option>
//                                 ))}
//                             </Form.Select>
//                             <ul className="queslsit">
//                                 {secWiseListQue[0]?.question_section?.map((QuesItem, quesIndex) => (
//                                     <li
//                                     // onClick={() => handleSectionQuestionbyuser(QuesItem)}
//                                     >
//                                         <span>Q. {quesIndex + 1}</span>
//                                         <div className="ratting_warp">
//                                             <div className="ratting">
//                                                 <span className="avg-text">Avg.</span>
//                                                 <span className="rt-item active"><i className="fa fa-star"></i></span>
//                                                 <span className="rt-item active"><i className="fa fa-star"></i></span>
//                                                 <span className="rt-item active"><i className="fa fa-star"></i></span>
//                                                 <span className="rt-item"><i className="fa fa-star"></i></span>
//                                                 <span className="rt-item"><i className="fa fa-star"></i></span>
//                                             </div>
//                                             <p>50 Pending</p>
//                                         </div>
//                                     </li>
//                                 ))}
//                                 <li className="justify-content-center">
//                                     <button type="button" className="btn-transpant">
//                                         {/* <img src={ArrowDownDark} /> */}
//                                     </button>
//                                 </li>
//                             </ul>
//                         </Col>
//                         {/* ))} */}

//                         <Col md={10} className="ans_panel">
//                             <div className="que_head">
//                                 <p class="text-sm">{secWiseListQue[0]?.section_title}</p>
//                                 <strong className="qus_number">1</strong>
//                             </div>
//                             <div className="ans_body">
//                                 <div className="all_anslist">
//                                     {secWiseListQue[0]?.question_section?.map((ques, index) => (
//                                         <Card className="ans_card">
//                                             <Card.Header className="p-0 pb-2 d-flex align-items-center justify-content-between">
//                                                 <Card.Title>{ques?.question_title}</Card.Title>
//                                                 <div className="d-flex">
//                                                     {/* <Ratting rating={rating} setRating={setRating} ID={user?.uid} getJobAssignmentReviewList={getJobAssignmentReviewList} questionWiseData={questionWiseData} /> */}
//                                                     <button
//                                                         // onClick={() => handleReviewModal(user)} 
//                                                         type="button" className="btn-transpant ms-4">
//                                                         {/* <img src={ExpandButton} alt="" /> */}
//                                                     </button>
//                                                 </div>
//                                             </Card.Header>
//                                             <Card.Body className="px-0">
//                                                 {ques?.quiz_type == "Arrange" && (
//                                                     <ul className="qus_crossed">
//                                                         {ques?.question_option?.part1?.map((data, index) => {
//                                                             const correctCapital = ques?.user_answer_question[0]?.selected_answer[index]
//                                                                 ?.replace("'", "")
//                                                                 ?.replace("'", "");
//                                                             return (
//                                                                 <li style={{ cursor: 'pointer' }}                                                        >
//                                                                     <div className="crossd_answarp">
//                                                                         <span className="crossd_ans">
//                                                                             {data}
//                                                                         </span>
//                                                                         <img src={belltedArrow} alt="" />
//                                                                         <span className="crossd_ans">
//                                                                             {correctCapital}
//                                                                         </span>
//                                                                         {getIcon(ques?.questions_answer?.part1[index], ques?.user_answer_question[0]?.selected_answer[index])}
//                                                                     </div>
//                                                                 </li>
//                                                             )
//                                                         })}
//                                                     </ul>
//                                                 )}
//                                                 {ques?.quiz_type == "Match" && (
//                                                     <ul className="qus_crossed">
//                                                         {ques?.user_answer_question[0]?.selected_answer?.map(
//                                                             (data, index) => {
//                                                                 const correctCapital = ques?.user_answer_question[0]?.selected_answer[index]
//                                                                     ?.replace("'", "")
//                                                                     ?.replace("'", "");
//                                                                 return (
//                                                                     <li key={index}>
//                                                                         <div className="crossd_answarp">
//                                                                             <span className="crossd_ans">
//                                                                                 {data}
//                                                                             </span>
//                                                                             {getIcon(ques?.questions_answer?.part1[index], ques?.user_answer_question[0]?.selected_answer[index])}
//                                                                             <span className="crossd_ans">
//                                                                                 {/* {correctCapital} */}
//                                                                             </span>
//                                                                         </div>
//                                                                     </li>
//                                                                 );
//                                                             }
//                                                         )}
//                                                     </ul>
//                                                 )}
//                                                 {ques?.quiz_type == "MCQ" && (
//                                                     <ul className="qus_crossed">
//                                                         {ques?.question_option?.part1?.map(
//                                                             (data, index) => {
//                                                                 const correctCapital = ques?.user_answer_question[0]?.selected_answer[index]
//                                                                     ?.replace("'", "")
//                                                                     ?.replace("'", "");

//                                                                 return (
//                                                                     <li key={index}>
//                                                                         <div className="crossd_answarp">
//                                                                             <span className="crossd_ans">
//                                                                                 {data}
//                                                                             </span>                                                                            
//                                                                             {getIconByMcq(ques?.questions_answer[index], ques?.user_answer_question[0]?.selected_answer[index],data)}
//                                                                             <span className="crossd_ans">
//                                                                                 {/* {correctCapital} */}
//                                                                             </span>
//                                                                         </div>
//                                                                     </li>
//                                                                 );
//                                                             }
//                                                         )}
//                                                     </ul>
//                                                 )}
//                                                 {ques?.quiz_type == "MCQ-Multi" && (
//                                                     <ul className="qus_crossed">
//                                                         {ques?.question_option?.part1?.map(
//                                                             (data, index) => {
//                                                                 const correctCapital = ques?.user_answer_question[0]?.selected_answer[index]
//                                                                     ?.replace("'", "")
//                                                                     ?.replace("'", "");

//                                                                 return (
//                                                                     <li key={index}>
//                                                                         <div className="crossd_answarp">
//                                                                             <span className="crossd_ans">
//                                                                                 {data}
//                                                                             </span>                                                                            
//                                                                             {getIconByMcqMul(ques?.questions_answer, ques?.user_answer_question[0]?.selected_answer[index],data)}
//                                                                             <span className="crossd_ans">
//                                                                                 {/* {correctCapital} */}
//                                                                             </span>
//                                                                         </div>
//                                                                     </li>
//                                                                 );
//                                                             }
//                                                         )}
//                                                     </ul>
//                                                 )}
//                                                 {/* {ques?.user_answer_question[0]?.selected_answer?.map((option) => (
//                                                     <div
//                                                         key={option.id}
//                                                     // className={`flex items-center p-2 rounded-md border ${selected === option.id ? "bg-blue-50 border-blue-400" : "border-gray-200"
//                                                     //     }`}
//                                                     >
//                                                         <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
//                                                         <span className="flex items-center">
//                                                             {option}
//                                                             {getIcon(option)}
//                                                         </span>
//                                                     </div>
//                                                 ))} */}
//                                                 {/* {user?.text && (
//                                                         <Card.Text>{user?.text?.replace(/<[^>]*>/g, '')}</Card.Text>
//                                                     )}
//                                                     {getFileType(user?.attach_or_video) === "image" && (
//                                                         <img src={`https://bittrend.shubansoftware.com${user?.attach_or_video}`} width={500} height={400} />
//                                                     )}
//                                                     {getFileType(user?.attach_or_video) === "audio" && (
//                                                         <audio controls className="w-full">
//                                                             <source src={'https://bittrend.shubansoftware.com' + user?.attach_or_video} type="audio/mp3" />
//                                                         </audio>
//                                                     )}
//                                                     {getFileType(user?.attach_or_video) === "video" && (
//                                                         <div className="video-frame">
//                                                             <video controls width="100%" height="430" >
//                                                                 <source src={'https://bittrend.shubansoftware.com' + user?.attach_or_video} type="video/mp4" />
//                                                             </video>
//                                                         </div>
//                                                     )} */}
//                                             </Card.Body>
//                                         </Card>
//                                     ))}

//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Card.Body>
//             </Card>
//         </div>
//     )
// }

// export default CandidateQuestionList

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, ProgressBar, Row, Tab } from 'react-bootstrap';
import Select from "react-select";
import userDark from "../../../images/icons/users-dark.svg";
import belltedArrow from "../../../images/bullt_icon.svg";
import tickCircle from "../../../images/tick-circle.svg";
import crossCircle from "../../../images/cross-circle.svg";

const CandidateQuestionList = ({ data }) => {    
    const sectionOption = data.length>0?data.map((opt)=>({value:opt.uid,label:opt.section_title})):[]
    const [secWiseListQue, setSecWiseListQue] = useState(data[0]);
    const [sectionValue,setSectionValue] = useState(sectionOption[0])
    useEffect(() => {
        setSecWiseListQue(data?.filter((_, index) => index == 0))
    }, [])
    const handleSectionWise = (e) => {
        // const { value } = e.target;
        const { value } = e;
        const filterData = data?.filter((val) => val.uid == value);
        setSecWiseListQue(filterData);
        setSectionValue(e)
    }
    const getIcon = (correct, selected) => {
        if (correct === selected) {
            return (
                <img src={tickCircle} width={20} height={20} />
            )
        } else if (correct !== selected) {
            return (
                <img src={crossCircle} width={20} height={20} />
            )
        }

    };
    const getIconByMcq = (correct, single, option) => {
        if (correct != undefined && single != undefined) {
            if (correct === single) {
                return (
                    <img src={tickCircle} width={20} height={20} />
                )
            } else {
                return (
                    <img src={crossCircle} width={20} height={20} />
                )
            }
        }
    }
    const getIconByMcqMul = (correct, single, option) => {
        if (single != undefined) {
            if (correct.includes(single)) {
                return (
                    <img src={tickCircle} width={20} height={20} />
                )
            } else {
                return (
                    <img src={crossCircle} width={20} height={20} />
                )
            }
        }
    }
    console.log(secWiseListQue)
    return (
        <div className='appcant_reviews'>

            <Row>
                {/* {assignmentReviewList.map((item, index) => ( */}
                <Col md={2} className="queslsit_panel pe-0">
                    {/* <Form.Select className="qs_dropdown"
                        onChange={handleSectionWise}
                    >
                        {data.map((cVal) => (
                            <option value={cVal?.uid}>{cVal?.section_title}</option>
                        ))}
                    </Form.Select> */}
                    <Select
                        className="react_selectbox"
                        options={sectionOption}
                        value={sectionValue}
                        onChange={handleSectionWise}                        
                    />
                    <ul className="queslsit">
                        {secWiseListQue[0]?.question_section?.map((QuesItem, quesIndex) => (
                            <li
                            // onClick={() => handleSectionQuestionbyuser(QuesItem)}
                            >
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
                        <li className="justify-content-center">
                            <button type="button" className="btn-transpant">
                                {/* <img src={ArrowDownDark} /> */}
                            </button>
                        </li>
                    </ul>
                </Col>
                {/* ))} */}

                <Col md={10} className="ans_panel">
                    <div className="que_head">
                        <p class="text-sm">{secWiseListQue[0]?.section_title}</p>
                        <strong className="qus_number">1</strong>
                    </div>
                    <div className="ans_body">
                        <div className="all_anslist">
                            {secWiseListQue[0]?.question_section?.map((ques, index) => (
                                <Card className="ans_card">
                                    <Card.Header className="p-0 pb-2 d-flex align-items-center justify-content-between">
                                        <Card.Title>{ques?.question_title}</Card.Title>
                                        <div className="d-flex">
                                            {/* <Ratting rating={rating} setRating={setRating} ID={user?.uid} getJobAssignmentReviewList={getJobAssignmentReviewList} questionWiseData={questionWiseData} /> */}
                                            <button
                                                // onClick={() => handleReviewModal(user)} 
                                                type="button" className="btn-transpant ms-4">
                                                {/* <img src={ExpandButton} alt="" /> */}
                                            </button>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="px-0">
                                        {ques?.quiz_type == "Arrange" && (
                                            <ul className="qus_crossed">
                                                {ques?.question_option?.part1?.map((data, index) => {
                                                    const correctCapital = ques?.user_answer_question[0]?.selected_answer[index]
                                                        ?.replace("'", "")
                                                        ?.replace("'", "");
                                                    return (
                                                        <li style={{ cursor: 'pointer' }}                                                        >
                                                            <div className="crossd_answarp">
                                                                <span className="crossd_ans">
                                                                    {data}
                                                                </span>
                                                                <img src={belltedArrow} alt="" />
                                                                <span className="crossd_ans">
                                                                    {correctCapital}
                                                                </span>
                                                                {getIcon(ques?.questions_answer?.part1[index], ques?.user_answer_question[0]?.selected_answer[index])}
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                        {ques?.quiz_type == "Match" && (
                                            <ul className="qus_crossed">
                                                {ques?.user_answer_question[0]?.selected_answer?.map(
                                                    (data, index) => {
                                                        const correctCapital = ques?.user_answer_question[0]?.selected_answer[index]
                                                            ?.replace("'", "")
                                                            ?.replace("'", "");
                                                        return (
                                                            <li key={index}>
                                                                <div className="crossd_answarp">
                                                                    <span className="crossd_ans">
                                                                        {data}
                                                                    </span>
                                                                    {getIcon(ques?.questions_answer?.part1[index], ques?.user_answer_question[0]?.selected_answer[index])}
                                                                    <span className="crossd_ans">
                                                                        {/* {correctCapital} */}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        )}
                                        {ques?.quiz_type == "MCQ" && (
                                            <ul className="qus_crossed">
                                                {ques?.question_option?.part1?.map(
                                                    (data, index) => {
                                                        const correctCapital = ques?.user_answer_question[0]?.selected_answer[index]
                                                            ?.replace("'", "")
                                                            ?.replace("'", "");

                                                        return (
                                                            <li key={index}>
                                                                <div className="crossd_answarp">
                                                                    <span className="crossd_ans">
                                                                        {data}
                                                                    </span>
                                                                    {getIconByMcq(ques?.questions_answer[index], ques?.user_answer_question[0]?.selected_answer[index], data)}
                                                                    <span className="crossd_ans">
                                                                        {/* {correctCapital} */}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        )}
                                        {ques?.quiz_type == "MCQ-Multi" && (
                                            <ul className="qus_crossed">
                                                {ques?.question_option?.part1?.map(
                                                    (data, index) => {
                                                        const correctCapital = ques?.user_answer_question[0]?.selected_answer[index]
                                                            ?.replace("'", "")
                                                            ?.replace("'", "");

                                                        return (
                                                            <li key={index}>
                                                                <div className="crossd_answarp">
                                                                    <span className="crossd_ans">
                                                                        {data}
                                                                    </span>
                                                                    {getIconByMcqMul(ques?.questions_answer, ques?.user_answer_question[0]?.selected_answer[index], data)}
                                                                    <span className="crossd_ans">
                                                                        {/* {correctCapital} */}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        )}
                                        {/* {ques?.user_answer_question[0]?.selected_answer?.map((option) => (
                                                    <div
                                                        key={option.id}
                                                    // className={`flex items-center p-2 rounded-md border ${selected === option.id ? "bg-blue-50 border-blue-400" : "border-gray-200"
                                                    //     }`}
                                                    >
                                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                                                        <span className="flex items-center">
                                                            {option}
                                                            {getIcon(option)}
                                                        </span>
                                                    </div>
                                                ))} */}
                                        {/* {user?.text && (
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
                                                    )} */}
                                    </Card.Body>
                                </Card>
                            ))}

                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CandidateQuestionList