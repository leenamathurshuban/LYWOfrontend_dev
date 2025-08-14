// src/CustomQuestionsBuilder.jsx
import React, { useMemo, useState } from "react";
import Select from "react-select";
import Form from "react-bootstrap/Form";

// (Optional) replace with your real icons
// import McqSingleIcon from "./mcq_single.png";
// import McqMultipleIcon from "./mcq_multiple.png";
// import ArrangeIcon from "./arrange.png";
// import MatchIcon from "./match.png";
// import TrashIcon from "./trash.png";
import McqSingleIcon from '../../images/icons/mcq_icon.png';
import McqMultipleIcon from '../../images/icons/mcq-multi.svg';
import ArrangeIcon from '../../images/icons/order.png';
import MatchIcon from '../../images/icons/match.png';
import imgpTrash from "../../images/icons/trash-01.svg";
const customStyles2 = {
    control: (base) => ({
        ...base,
        minWidth: 220,
        borderRadius: 8,
    }),
    menu: (base) => ({ ...base, zIndex: 9999 }),
};

const QUESTION_TYPES = {
    SINGLE: "single",
    MULTIPLE: "multiple",
    ARRANGE: "Arrange",
    MATCH: "Match",
};

const typeOptions = [
    {
        value: QUESTION_TYPES.SINGLE,
        label: (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={McqSingleIcon} alt="MCQ Single" style={{ width: 20, marginRight: 8 }} />
                <span>MCQ Single</span>
            </div>
        ),
    },
    {
        value: QUESTION_TYPES.MULTIPLE,
        label: (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={McqMultipleIcon} alt="MCQ Multiple" style={{ width: 20, marginRight: 8 }} />
                <span>MCQ Multiple</span>
            </div>
        ),
    },
    {
        value: QUESTION_TYPES.ARRANGE,
        label: (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={ArrangeIcon} alt="Arrange" style={{ width: 20, marginRight: 8 }} />
                <span>Arrange</span>
            </div>
        ),
    },
    {
        value: QUESTION_TYPES.MATCH,
        label: (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={MatchIcon} alt="Match" style={{ width: 20, marginRight: 8 }} />
                <span>Match</span>
            </div>
        ),
    },
];

// Helpers
const uid = () => Math.random().toString(36).slice(2, 10);

const makeBlankQuestion = () => ({
    id: uid(),
    question_title: "",
    question_type: QUESTION_TYPES.SINGLE,
    // For SINGLE/MULTIPLE/ARRANGE we use part1 (array of strings)
    // For MATCH we use pairs (array of {left,right})
    question_option: { part1: [""], pairs: [{ left: "", right: "" }] },
    // Store answers:
    //   SINGLE → [string]
    //   MULTIPLE → [string...]
    //   ARRANGE → ordered array of strings (same as part1 after reorder)
    //   MATCH → array of {left,right}
    questions_answer: [],
});

export default function CustomQuestionsBuilder({ components, setComponents,handleSaveCustomQuestion }) {
    // const [components, setComponents] = useState([makeBlankQuestion()]);

    // ---------- handlers (questions) ----------
    const addQuestion = () => setComponents((prev) => [...prev, makeBlankQuestion()]);

    const handleDeleteRowQuestion = (qIndex) =>
        setComponents((prev) => prev.filter((_, i) => i !== qIndex));

    const handleQuestionTitleChange = (qIndex, value) =>
        setComponents((prev) =>
            prev.map((q, i) => (i === qIndex ? { ...q, question_title: value } : q))
        );

    const handleQuestionTypeChange = (qIndex, newType) =>
        setComponents((prev) =>
            prev.map((q, i) => {
                if (i !== qIndex) return q;

                if (newType === QUESTION_TYPES.MATCH || newType === QUESTION_TYPES.ARRANGE) {
                    return {
                        ...q,
                        quiz_type: newType,
                        question_option: {
                            ...q.question_option,
                            //  pairs: [{ left: "", right: "" }] 
                            // part1: q.question_option.part1?.length ? q.question_option.part1 : [""],
                            part1: [""],
                        },
                        questions_answer: [], // reset
                    };
                }

                // For SINGLE/MULTIPLE/ARRANGE → use part1
                return {
                    ...q,
                    quiz_type: newType,
                    question_option: {
                        ...q.question_option,
                        // part1: q.question_option.part1?.length ? q.question_option.part1 : [""],
                        part1: [""],
                    },
                    questions_answer: [],
                };
            })
        );

    // ---------- handlers (options) ----------
    const handleQuestionOptionChange = (qIndex, oIndex, value) =>
        setComponents((prev) =>
            prev.map((q, i) =>
                i === qIndex
                    ? {
                        ...q,
                        question_option: {
                            ...q.question_option,
                            part1: q.question_option.part1.map((opt, j) => (j === oIndex ? value : opt)),
                        },
                    }
                    : q
            )
        );

    // const handlePairChange = (qIndex, pIndex, side, value) =>
    //     setComponents((prev) =>
    //         prev.map((q, i) =>
    //             i === qIndex
    //                 ? {
    //                     ...q,
    //                     question_option: {
    //                         ...q.question_option,
    //                         pairs: q.question_option.pairs.map((p, j) =>
    //                             j === pIndex ? { ...p, [side]: value } : p
    //                         ),
    //                     },
    //                 }
    //                 : q
    //         )
    //     );
    const handlePairChange = (qIndex, pIndex, side, value) => {
        setComponents((prev) =>
            prev.map((q, i) => {
                if (i !== qIndex) return q;

                // Clone arrays
                const updatedPart1 = [...q.question_option.part1];
                const updatedAnswers = [...q.questions_answer];

                // Ensure both arrays have enough slots
                while (updatedPart1.length <= pIndex) {
                    updatedPart1.push("");
                }
                while (updatedAnswers.length <= pIndex) {
                    updatedAnswers.push("");
                }

                // Update based on side
                if (side === "left") {
                    updatedPart1[pIndex] = value;
                } else if (side === "right") {
                    updatedAnswers[pIndex] = value;
                }

                return {
                    ...q,
                    question_option: {
                        ...q.question_option,
                        part1: updatedPart1,
                    },
                    questions_answer: updatedAnswers,
                };
            })
        );
    };


    const handleAddResponse = (qIndex) =>
        setComponents((prev) =>
            prev.map((q, i) =>
                i === qIndex
                    ?
                    // q.quiz_type === QUESTION_TYPES.MATCH
                    //     ? {
                    //         ...q,
                    //         question_option: {
                    //             ...q.question_option,
                    //             pairs: [...q.question_option.pairs, { left: "", right: "" }],
                    //         },
                    //     } : 
                    {
                        ...q,
                        question_option: {
                            ...q.question_option,
                            part1: [...q.question_option.part1, ""],
                        },
                    }
                    : q
            )
        );

    const handleDeleteOption = (qIndex, oIndex) =>
        setComponents((prev) =>
            prev.map((q, i) =>
                i === qIndex
                    ? {
                        ...q,
                        question_option: {
                            ...q.question_option,
                            part1: q.question_option.part1.filter((_, j) => j !== oIndex),
                        },
                        questions_answer: q.questions_answer.filter(
                            (ans) => ans !== q.question_option.part1[oIndex]
                        ),
                    }
                    : q
            )
        );

    const handleDeletePair = (qIndex, pIndex) =>
        setComponents((prev) =>
            prev.map((q, i) =>
                i === qIndex
                    ? {
                        ...q,
                        question_option: {
                            ...q.question_option,
                            pairs: q.question_option.pairs.filter((_, j) => j !== pIndex),
                        },
                    }
                    : q
            )
        );

    // ---------- arrange (reorder) ----------
    const moveOption = (qIndex, from, to) =>
        setComponents((prev) =>
            prev.map((q, i) => {
                if (i !== qIndex) return q;
                const arr = [...q.question_option.part1];
                if (to < 0 || to >= arr.length) return q;
                const [item] = arr.splice(from, 1);
                arr.splice(to, 0, item);
                return { ...q, question_option: { ...q.question_option, part1: arr } };
            })
        );

    // ---------- answer selection ----------
    const handleAnswerChange = (qIndex, option, isChecked) =>
        setComponents((prev) =>
            prev.map((q, i) => {
                if (i !== qIndex) return q;
                const t = q.quiz_type;

                if (t === QUESTION_TYPES.SINGLE) {
                    return { ...q, questions_answer: [option] };
                }
                if (t === QUESTION_TYPES.MULTIPLE) {
                    const next = isChecked
                        ? Array.from(new Set([...q.questions_answer, option]))
                        : q.questions_answer.filter((x) => x !== option);
                    return { ...q, questions_answer: next };
                }
                // ARRANGE and MATCH don't use toggles
                return q;
            })
        );

    // ---------- save ----------
    const savePayload = useMemo(() => {
        return components?.map((q) => {
            if (q.quiz_type === QUESTION_TYPES.ARRANGE) {
                return {
                    ...q,
                    questions_answer: q.question_option.part1, // ordered list
                };
            }
            if (q.quiz_type === QUESTION_TYPES.MATCH) {
                return {
                    ...q,
                    questions_answer: q.question_option.pairs, // [{left,right}]
                };
            }
            return q;
        });
    }, [components]);
    // ---------- UI ----------
    return (
        <>
            {components?.map((question, questionIndex) => (
                <div key={question.id} className="starttag_box ctmqus_panel border rounded p-3 mb-3">
                    <div className="d-flex align-items-start gap-3">
                        <span className="flex-grow-1">
                            <Form.Control
                                className="formControl_cstmQuestion"
                                placeholder="Your Question"
                                onChange={(e) => handleQuestionTitleChange(questionIndex, e.target.value)}
                                value={question.question_title}
                            />
                        </span>

                        <div style={{ minWidth: 240 }}>
                            <Select
                                className="react_selectbox react-select-mcq-change"
                                classNamePrefix="select"
                                styles={customStyles2}
                                value={typeOptions.find((o) => o.value === question.quiz_type)}
                                options={typeOptions}
                                formatOptionLabel={({ label }) => label}
                                onChange={(e) => handleQuestionTypeChange(questionIndex, e.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-danger d-flex align-items-center"
                            onClick={() => handleDeleteRowQuestion(questionIndex)}
                            title="Delete question"
                        >
                            <img src={imgpTrash} alt="Delete" style={{ width: 18, height: 18 }} />
                        </button>
                    </div>

                    <div className="mt-3">
                        <h6 className="mb-1">Answer Options</h6>
                        <p className="text-muted mb-3" style={{ fontSize: 13 }}>
                            {question.quiz_type === QUESTION_TYPES.SINGLE &&
                                "Select the preferred answer using the radio button."}
                            {question.quiz_type === QUESTION_TYPES.MULTIPLE &&
                                "Select all correct answers using the checkboxes."}
                            {/* {question.quiz_type === QUESTION_TYPES.ARRANGE &&
                                "Order the options. Use ↑/↓ to rearrange."} */}
                            {(question.quiz_type === QUESTION_TYPES.MATCH || question.quiz_type === QUESTION_TYPES.ARRANGE) &&
                                "Enter matching pairs (Left ↔ Right)."}
                        </p>

                        {/* SINGLE / MULTIPLE / ARRANGE share the same text inputs (part1) */}
                        {(question.quiz_type === QUESTION_TYPES.SINGLE ||
                            question.quiz_type === QUESTION_TYPES.MULTIPLE) && (
                                <div className="cmt_questions">
                                    {question.question_option.part1.map((option, optionIndex) => (
                                        <div key={`opt-${optionIndex}`} className="mb-2 d-flex align-items-center gap-2">
                                            {/* radio/checkbox only for SINGLE/MULTIPLE */}
                                            {(question.quiz_type === QUESTION_TYPES.SINGLE ||
                                                question.quiz_type === QUESTION_TYPES.MULTIPLE) && (
                                                    <Form.Check
                                                        type={
                                                            question.quiz_type === QUESTION_TYPES.SINGLE ? "radio" : "checkbox"
                                                        }
                                                        name={`question-${questionIndex}`}
                                                        checked={question.questions_answer.includes(option)}
                                                        onChange={(e) =>
                                                            handleAnswerChange(questionIndex, option, e.target.checked)
                                                        }
                                                    />
                                                )}

                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your text here"
                                                className="formControl_cstmQuestion"
                                                value={option}
                                                onChange={(e) =>
                                                    handleQuestionOptionChange(questionIndex, optionIndex, e.target.value)
                                                }
                                                style={{ maxWidth: 520 }}
                                            />

                                            {/* Arrange up/down buttons */}
                                            {/* {question.quiz_type === QUESTION_TYPES.ARRANGE && (
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => moveOption(questionIndex, optionIndex, optionIndex - 1)}
                                                        disabled={optionIndex === 0}
                                                        title="Move up"
                                                    >
                                                        ↑
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => moveOption(questionIndex, optionIndex, optionIndex + 1)}
                                                        disabled={optionIndex === question.question_option.part1.length - 1}
                                                        title="Move down"
                                                    >
                                                        ↓
                                                    </button>
                                                </div>
                                            )} */}

                                            <button
                                                className="btn btn-link text-danger"
                                                onClick={() => handleDeleteOption(questionIndex, optionIndex)}
                                                title="Remove option"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        {/* MATCH : left/right pairs */}
                        {/* {question.quiz_type === QUESTION_TYPES.MATCH && (
                            <div className="cmt_questions">
                                {question.question_option.pairs.map((pair, pIndex) => (
                                    <div key={`pair-${pIndex}`} className="mb-2 d-flex align-items-center gap-2">
                                        <Form.Control
                                            type="text"
                                            placeholder="Left"
                                            className="formControl_cstmQuestion"
                                            value={pair.left}
                                            onChange={(e) => handlePairChange(questionIndex, pIndex, "left", e.target.value)}
                                            style={{ maxWidth: 260 }}
                                        />
                                        <span>↔</span>
                                        <Form.Control
                                            type="text"
                                            placeholder="Right"
                                            className="formControl_cstmQuestion"
                                            value={pair.right}
                                            onChange={(e) =>
                                                handlePairChange(questionIndex, pIndex, "right", e.target.value)
                                            }
                                            style={{ maxWidth: 260 }}
                                        />
                                        <button
                                            className="btn btn-link text-danger"
                                            onClick={() => handleDeletePair(questionIndex, pIndex)}
                                            title="Remove pair"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )} */}
                        {(question.quiz_type === QUESTION_TYPES.MATCH ||
                            question.quiz_type === QUESTION_TYPES.ARRANGE) &&
                            <div className="cmt_questions">
                                {question.question_option.part1.map((leftVal, pairIndex) => (
                                    <>
                                        {/* <div key={pairIndex} className="d-flex mb-2">
                                    Left side input
                                    <Form.Control
                                        type="text"
                                        placeholder="Left side"
                                        value={leftVal}
                                        onChange={(e) =>
                                            handlePairChange(questionIndex, pairIndex, "left", e.target.value)
                                        }
                                        className="me-2"
                                    />

                                    Right side input
                                    <Form.Control
                                        type="text"
                                        placeholder="Right side"
                                        value={question.questions_answer[pairIndex] || ""}
                                        onChange={(e) =>
                                            handlePairChange(questionIndex, pairIndex, "right", e.target.value)
                                        }
                                    />
                                </div> */}
                                        <div key={`pair-${pairIndex}`} className="mb-2 d-flex align-items-center gap-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="Left"
                                                className="formControl_cstmQuestion"
                                                value={leftVal}
                                                onChange={(e) => handlePairChange(questionIndex, pairIndex, "left", e.target.value)}
                                                style={{ maxWidth: 260 }}
                                            />
                                            <span>↔</span>
                                            <Form.Control
                                                type="text"
                                                placeholder="Right"
                                                className="formControl_cstmQuestion"
                                                value={question.questions_answer[pairIndex] || ""}
                                                onChange={(e) =>
                                                    handlePairChange(questionIndex, pairIndex, "right", e.target.value)
                                                }
                                                style={{ maxWidth: 260 }}
                                            />
                                            <button
                                                className="btn btn-link text-danger"
                                                onClick={() => handleDeletePair(questionIndex, pairIndex)}
                                                title="Remove pair"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </>
                                ))}
                            </div>
                        }


                        {/* Add response */}
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={() => handleAddResponse(questionIndex)}
                        >
                            + Add Response
                        </button>

                        {/* Save per block (optional) */}
                        <button type="button" onClick={handleSaveCustomQuestion} className="btn btn-outline-dark">
                            Save
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
