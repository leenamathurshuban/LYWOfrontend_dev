// import React from 'react';
// import { Accordion, Row } from 'react-bootstrap';
// import { FaExternalLinkAlt, FaLock } from 'react-icons/fa';

// const assignments = [
//   {
//     title: 'Technical Quiz',
//     sections: 2,
//     points: 40,
//     status: 'Good',
//     body: null,
//   },
//   {
//     title: 'Assignment 1',
//     sections: 2,
//     rating: 3,
//     status: 'Excellent',
//     body: [
//       {
//         name: 'Section 1',
//         attempted: 0,
//         correct: 0,
//         points: 0,
//       },
//       {
//         name: 'Section 2',
//         attempted: 26,
//         correct: 25,
//         points: 25,
//       },
//     ],
//   },
//   {
//     title: 'Assignment 2',
//     sections: 2,
//     status: 'Under Review',
//     linkText: 'Start Reviewing',
//     body: null,
//   },
//   {
//     title: 'Assignment 3',
//     locked: true,
//   },
// ];

// const Step4 = ({ data,setCandidateQuestionShow,setCandidateQuestionList,handleReviewClose,setReviewEventKey }) => {
//   console.log(data)
//   const handleGroupUnderQuiz = (Val) => {
//     const foundValue = data?.job_groups?.find((cv) => cv?.job_group_parameter?.parameter_name === Val)
//     return foundValue?.group_name
//   }
//   const handleOpenReview=(item)=>{    
//     setCandidateQuestionShow(true)
//     setCandidateQuestionList(item?.section_asset)
//   }
//   return (
//     <Accordion defaultActiveKey="0">
//       {data?.job?.asset_job?.length > 0 && data?.job?.asset_job?.map((item, index) => (
//         <Accordion.Item
//           eventKey={`${index}`}
//           className="accd_child"
//           id={`item_${index}`}
//           key={index}
//         >
//           <Accordion.Header>
//             <span className="me-auto fw-semibold">
//               {item.asset_title}
//             </span>

//             {item?.assets_applicant_asset_completion?.[0]?.asset_completion_status !== "Draft" && (
//               <>
//                 <span className="me-3 text-muted">
//                   {item?.section_count} Sections
//                 </span>

//                 {/* {item.points !== undefined && ( */}
//                 <span className="me-3 text-muted">{item?.asset_all_section_points} Points</span>
//                 {/* )} */}

//                 {item.rating && (
//                   <span className="me-2">
//                     {'★'.repeat(item.rating)}
//                     {'☆'.repeat(5 - item.rating)}
//                   </span>
//                 )}

//                 {/* {item.status && ( */}
//                 <span
//                   className={`me-3 ${handleGroupUnderQuiz(item?.asset_title) === 'Excellent'
//                     ? 'text-success'
//                     : 'text-primary'
//                     }`}
//                 >
//                   {handleGroupUnderQuiz(item?.asset_title)}
//                 </span>
//                 {/* )} */}
//                 {item?.asset_type == "Assignment" && item?.assets_applicant_asset_completion?.[0]?.applicant_final_overall_score == 0 && (
//                   <span className="me-3 text-muted">
//                     Under Review
//                   </span>
//                 )}

//                 {item?.asset_type == "Assignment" && item?.assets_applicant_asset_completion?.[0]?.applicant_final_overall_score == 0 && (
//                   <span className="text-primary text-decoration-underline" onClick={()=>{
//                     setReviewEventKey("third")
//                     handleReviewClose()                    
//                     }}>
//                     Start Reviewing
//                   </span>
//                 )}
//               </>
//             )}

//             {item?.assets_applicant_asset_completion?.[0]?.asset_completion_status == "Draft" && (
//               <span className="me-3 text-muted">
//                 <FaLock className="me-2" /> Locked
//               </span>
//             )}

//           </Accordion.Header>

//           {item?.assets_applicant_asset_completion?.[0]?.asset_completion_status !== "Draft" && item?.section_asset && (
//             <Accordion.Body>
//               {item?.section_asset?.map((section, secIndex) => (
//                 <Row
//                   key={secIndex}
//                   className="align-items-center justify-content-between border-bottom py-2"
//                 >
//                   <div className="form-group w-auto mb-0">
//                     {section?.section_title}
//                   </div>
//                   <div className="form-group w-auto mb-0 text-muted">
//                     {section?.attempted_count} Attempted | {item?.asset_type=="Quiz"?section?.total_correct_answer_count:section?.total_blank_count} {item?.asset_type=="Quiz"?'correct':'Blank'} |{' '}
//                     {section?.total_section_point} Points{' '}
//                     <FaExternalLinkAlt className="ms-1" size="0.8em" onClick={()=>{
//                       handleOpenReview(item)
//                     }} />
//                   </div>
//                 </Row>
//               ))}
//             </Accordion.Body>
//           )}
//         </Accordion.Item>
//       ))}
//     </Accordion>
//   );
// };

// export default Step4;

import React from 'react';
import { Accordion, Row,Col } from 'react-bootstrap';
import { FaExternalLinkAlt, FaLock } from 'react-icons/fa';

const assignments = [
  {
    title: 'Technical Quiz',
    sections: 2,
    points: 40,
    status: 'Good',
    body: null,
  },
  {
    title: 'Assignment 1',
    sections: 2,
    rating: 3,
    status: 'Excellent',
    body: [
      {
        name: 'Section 1',
        attempted: 0,
        correct: 0,
        points: 0,
      },
      {
        name: 'Section 2',
        attempted: 26,
        correct: 25,
        points: 25,
      },
    ],
  },
  {
    title: 'Assignment 2',
    sections: 2,
    status: 'Under Review',
    linkText: 'Start Reviewing',
    body: null,
  },
  {
    title: 'Assignment 3',
    locked: true,
  },
];

const Step4 = ({ data,setCandidateQuestionShow,setCandidateQuestionList,handleReviewClose,setReviewEventKey }) => {
  console.log(data)
  const handleGroupUnderQuiz = (Val) => {
    const foundValue = data?.job_groups?.find((cv) => cv?.job_group_parameter?.parameter_name === Val)
    return foundValue?.group_name
  }
  const handleOpenReview=(item)=>{    
    setCandidateQuestionShow(true)
    setCandidateQuestionList(item?.section_asset)
  }
  return (
    <Accordion defaultActiveKey="0" className='eval_accordion'>
      {data?.job?.asset_job?.length > 0 && data?.job?.asset_job?.map((item, index) => (
        <Accordion.Item
          eventKey={`${index}`}
          id={`item_${index}`}
          key={index}
        >
          <Accordion.Header>
            <span className="me-auto evl_title">
              {item.asset_title}
            </span>
            <div className='avl_right'>
            {item?.assets_applicant_asset_completion?.[0]?.asset_completion_status !== "Draft" && (
              <>
                <span className="me-3 text-muted">
                  <strong>{item?.section_count}</strong> Sections
                </span>

                {/* {item.points !== undefined && ( */}
                <span className="me-3 text-muted"><strong>{item?.asset_all_section_points}</strong> Points</span>
                {/* )} */}

                {item.rating && (
                  <span className="me-2">
                    {'★'.repeat(item.rating)}
                    {'☆'.repeat(5 - item.rating)}
                  </span>
                )}

                {/* {item.status && ( */}
                <span
                  className={`me-3 ${handleGroupUnderQuiz(item?.asset_title) === 'Excellent'
                    ? 'text-success'
                    : 'text-primary'
                    }`}
                >
                  {handleGroupUnderQuiz(item?.asset_title)}
                </span>
                {/* )} */}
                {item?.asset_type == "Assignment" && item?.assets_applicant_asset_completion?.[0]?.applicant_final_overall_score == 0 && (
                  <span className="me-3 text-muted">
                    Under Review
                  </span>
                )}

                {item?.asset_type == "Assignment" && item?.assets_applicant_asset_completion?.[0]?.applicant_final_overall_score == 0 && (
                  <span className="text-primary text-decoration-underline" onClick={()=>{
                    setReviewEventKey("third")
                    handleReviewClose()                    
                    }}>
                    Start Reviewing
                  </span>
                )}
              </>
            )}

            {item?.assets_applicant_asset_completion?.[0]?.asset_completion_status == "Draft" && (
              <span className="me-3 text-muted">
                <FaLock className="me-2" /> Locked
              </span>
            )}
            </div>
          </Accordion.Header>

          {item?.assets_applicant_asset_completion?.[0]?.asset_completion_status !== "Draft" && item?.section_asset && (
            <Accordion.Body>
              <Row className='evl_itemsrow'>
              {item?.section_asset?.map((section, secIndex) => (
                <Col md={12}
                  key={secIndex}
                  className="evl_subitems"
                >
                  <div className="sub_title">
                    {section?.section_title}
                  </div>
                  <div className="form-group w-auto mb-0 text-muted">
                    {section?.attempted_count} Attempted | {item?.asset_type=="Quiz"?section?.total_correct_answer_count:section?.total_blank_count} {item?.asset_type=="Quiz"?'correct':'Blank'} |{' '}
                    {section?.total_section_point} Points{' '}
                    <FaExternalLinkAlt className="ms-1" size="0.8em" onClick={()=>{
                      handleOpenReview(item)
                    }} />
                  </div>
                </Col>
              ))}
              </Row>
            </Accordion.Body>
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Step4;
