import React from 'react';
import { Accordion, Row } from 'react-bootstrap';
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

const Step4 = ({ data }) => {
  console.log(data)
  const handleGroupUnderQuiz = (Val) => {
    const foundValue = data?.job_groups?.find((cv) => cv?.job_group_parameter?.parameter_name === Val)
    return foundValue?.group_name
  }
  return (
    <Accordion defaultActiveKey="0">
      {data?.job?.asset_job?.length > 0 && data?.job?.asset_job?.map((item, index) => (
        <Accordion.Item
          eventKey={`${index}`}
          className="accd_child"
          id={`item_${index}`}
          key={index}
        >
          <Accordion.Header>
            <span className="me-auto fw-semibold">
              {/* {item?.assets_applicant_asset_completion?.[0]?.asset_completion_status !=="Draft" ? (
                <>
                  <FaLock className="me-2" />
                  {item.title}
                </>
              ) : (
                item.title
              )} */}
              {item?.asset_title}
            </span>

            {/* {!item.locked && ( */}
            <>
              <span className="me-3 text-muted">
                {item?.section_asset?.length} Sections
              </span>

              {/* {item.points !== undefined && ( */}
              <span className="me-3 text-muted">{item?.assets_applicant_asset_completion?.[0]?.applicant_final_overall_score} Points</span>
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

              {item?.assets_applicant_asset_completion?.[0]?.asset_completion_status=="Draft" && (
                <span className="text-primary text-decoration-underline">
                  {"Start Reviewing"}
                </span>
              )}
            </>
            {/* )} */}
          </Accordion.Header>

          {!item.locked && item?.section_asset && (
            <Accordion.Body>
              {item?.section_asset?.map((section, secIndex) => (
                <Row
                  key={secIndex}
                  className="align-items-center justify-content-between border-bottom py-2"
                >
                  <div className="form-group w-auto mb-0">
                    {section.section_title}
                  </div>
                  <div className="form-group w-auto mb-0 text-muted">
                    {section.attempted} Attempted | {section.correct} correct |{' '}
                    {section.points} Points{' '}
                    <FaExternalLinkAlt className="ms-1" size="0.8em" />
                  </div>
                </Row>
              ))}
            </Accordion.Body>
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Step4;
