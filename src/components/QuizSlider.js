import React, { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import cakeIQ from "../../src/images/icons/quiz/cake-IQ.svg";
import coffieIQ from "../../src/images/icons/quiz/coffie-IQ.svg";
import iceIQ from "../../src/images/icons/quiz/ice-crime-IQ.svg";
import teaIQ from "../../src/images/icons/quiz/tea-IQ.svg";
import {
    Col,
    Row
} from "react-bootstrap";
const QuizSlider = ({ mostLeastLike, setMostLeastLike }) => {
    const options = {
        loop: true,
        margin: 10,
        items: 1,
        nav: true,
        dots: true,
        animateOut: 'slideOutUp',
        animateIn: 'slideInUp'
        // loop: true,
        // margin: 30,
        // nav: true,
        // dots: true,
        // autoplay: false,
        // autoplayTimeout: 3000,
        // autoplayHoverPause: true,
        // responsive: {
        //   0: { items: 1 },
        //   600: { items: 2 },
        //   1000: { items: 4 }
        // }
    };
    // const [mostLeastLike, setMostLeastLike] = useState([
    //     { id: 1, most: "", least: "", options: ["Ice Cream", "Tea", "Cake", "Coffee"] },
    //     { id: 2, most: "", least: "", options: ["Ice Cream", "Tea", "Cake", "Coffee"] },
    //     { id: 3, most: "", least: "", options: ["Ice Cream", "Tea", "Cake", "Coffee"] }
    // ]);

    const handleClick = (rowIndex, option, type) => {
        // setMostLeastLike(prevState =>
        //     prevState.map((row, index) =>
        //         index === rowIndex ? { ...row, [type]: option } : row
        //     )
        // );
        setMostLeastLike((prevState) => {
            const newState = prevState.map((row, index) => {
                if (index === rowIndex) {
                    let newRow = { ...row };
                    if (type === "most") {
                        // If clicking most, check if it's already selected as least
                        if (row.least === option) {
                            newRow.least = ""; // Remove least selection first
                        }
                        newRow.most = row.most === option ? "" : option; // Toggle most
                    } else if (type === "least") {
                        // If clicking least, check if it's already selected as most
                        if (row.most === option) {
                            newRow.most = ""; // Remove most selection first
                        }
                        newRow.least = row.least === option ? "" : option; // Toggle least
                    }
                    return newRow;
                }
                return row;
            });
            return [...newState]; // Ensure a new reference for React to detect changes
        });
    };    

    return (
        <OwlCarousel key={JSON.stringify(mostLeastLike)} className="owl-theme" {...options}>
            {mostLeastLike.map((row, rowIndex) => (
                <div key={row.id} className="item">
                    <Row>
                        {row.options.map(option => (
                            <Col md={3}>
                                <div key={option}
                                    className={`quiz_card ${row.most === option?.name ? "info-select" : ""} ${row.least === option?.name ? "info-warring" : ""} `}>
                                    <span className="quiz_icon"><img src={option?.img} /></span>
                                    <h4>{option?.name}</h4>
                                    <div className="quiz-btns">
                                        <button type="button" className="btn-up" onClick={() => {
                                            handleClick(rowIndex, option?.name, "most")
                                        }}><i className={`fa ${row.most === option?.name ? 'fa-times' : 'fa-arrow-up'}`}></i></button>
                                        <button type="button" className="btn-down" onClick={() => {
                                            handleClick(rowIndex, option?.name, "least")
                                        }}><i className={`fa ${row.least === option?.name ? 'fa-times' : 'fa-arrow-down'} `}></i></button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            ))}
            {/* {mostLeastLike.map((row, rowIndex) => (
                <div key={row.id} className="item">
                    <Row>
                        {row.options.map(option => (
                            <Col md={3}>
                                <div key={option}
                                    className={`quiz_card ${row.most === option?.name ? "info-select" : ""} ${row.least === option?.name ? "info-warring" : ""} `}>
                                    <span className="quiz_icon"><img src={iceIQ} /></span>
                                    <h4>{option?.name}</h4>
                                    <div className="quiz-btns">
                                        <button type="button" className="btn-up" onClick={() => {
                                            handleClick(rowIndex, option?.name, "most")
                                    }}><i className={`fa ${row.most===option?.name?'fa-times':'fa-arrow-up'}`}></i></button>
                                        <button type="button" className="btn-down" onClick={() => {
                                            handleClick(rowIndex, option?.name, "least")
                                        }}><i className={`fa ${row.least === option?.name?'fa-times':'fa-arrow-down'} `}></i></button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            ))} */}
            {/* <div className="item">
                <Row>
                    <Col md={3}>
                        <div className={`quiz_card ${item?.iceCream === 'most' && 'info-select'}`}>
                            <span className="quiz_icon"><img src={iceIQ} /></span>
                            <h4>Ice Cream</h4>
                            <div className="quiz-btns">
                                <button type="button" className="btn-up" onClick={() => handleMostLike("iceCream", index)}><i className="fa fa-arrow-up"></i></button>
                                <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="quiz_card">
                            <span className="quiz_icon"><img src={teaIQ} /></span>
                            <h4>Tea</h4>
                            <div className="quiz-btns">
                                <button type="button" className="btn-up" onClick={() => handleMostLike("tea", index)}><i className="fa fa-arrow-up"></i></button>
                                <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="quiz_card info-select">
                            <span className="quiz_icon"><img src={cakeIQ} /></span>
                            <h4>Cake</h4>
                            <div className="quiz-btns">
                                <button type="button" className="btn-up" onClick={() => handleMostLike("cake", index)}><i className="fa fa-arrow-up"></i></button>
                                <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="quiz_card">
                            <span className="quiz_icon"><img src={coffieIQ} /></span>
                            <h4>Coffee</h4>
                            <div className="quiz-btns">
                                <button type="button" className="btn-up" onClick={() => handleMostLike("coffee", index)}><i className="fa fa-arrow-up"></i></button>
                                <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div> */}
            {/* <div className="item">
            <Row>
                <Col md={3}>
                    <div className="quiz_card">
                        <span className="quiz_icon"><img src={iceIQ}/></span>
                        <h4>Enthusiasm</h4>
                        <div className="quiz-btns">
                            <button type="button" className="btn-up"><i className="fa fa-arrow-up"></i></button>
                            <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="quiz_card info-warring">
                        <span className="quiz_icon"><img src={teaIQ}/></span>
                        <h4>Satisfied</h4>
                        <div className="quiz-btns">
                            <button type="button" className="btn-up"><i className="fa fa-arrow-up"></i></button>
                            <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                        </div>
                    </div>
                </Col>
                <Col  md={3}>
                    <div className="quiz_card ">
                        <span className="quiz_icon"><img src={cakeIQ}/></span>
                        <h4>Diplomatic</h4>
                        <div className="quiz-btns">
                            <button type="button" className="btn-up"><i className="fa fa-arrow-up"></i></button>
                            <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="quiz_card">
                        <span className="quiz_icon"><img src={coffieIQ}/></span>
                        <h4>Cautious</h4>
                        <div className="quiz-btns">
                            <button type="button" className="btn-up"><i className="fa fa-arrow-up"></i></button>
                            <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div> */}
        </OwlCarousel>
    );
};

export default QuizSlider;
