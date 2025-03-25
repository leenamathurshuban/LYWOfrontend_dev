import React, { useRef, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cakeIQ from "../../src/images/icons/quiz/cake-IQ.svg";
import coffieIQ from "../../src/images/icons/quiz/coffie-IQ.svg";
import iceIQ from "../../src/images/icons/quiz/ice-crime-IQ.svg";
import teaIQ from "../../src/images/icons/quiz/tea-IQ.svg";
import handDrawicon from "../../src/images/icons/quiz/Hand-drawn-arrow-down.svg";
import handDrawmlike from "../../src/images/icons/quiz/Hand-drawn-mostlike.svg";
import handDrawlelike from "../../src/images/icons/quiz/Hand-drawn-leastlike.svg";
import handDrawmlikeactive from "../../src/images/icons/quiz/Hand-drawn-mlike-active.svg";
import handDrawlelikeactive from "../../src/images/icons/quiz/Hand-drawn-arrow-lealike-active.svg";
import {
    Col,
    Row
} from "react-bootstrap";
const QuizSlider = ({ mostLeastLike, setMostLeastLike }) => {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const options = {
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        // centerMode: true,
        // centerPadding: "20px",
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        focusOnSelect: true,
        afterChange: (index) => setCurrentSlide(index),
        appendDots: dots => (
            <ul className="slick-dots">
                {dots.map((dot, index) => (
                    <li key={index} className={`${index && 'slick-active'}`}>
                        <button
                            className={`h-3 w-3 rounded-full mx-1 ${
                                mostLeastLike[index]?.most && mostLeastLike[index]?.least  ? "quiz-completed" : "bg-gray-400"
                            }`}
                        ></button>
                    </li>
                ))}
            </ul>
        )
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
                    if(newRow.most && newRow.least){
                        setTimeout(() => {
                            if (currentSlide < mostLeastLike.length - 1) {
                                sliderRef.current.slickNext();
                            }                            
                        }, 1000);
                    }
                    return newRow;
                }
                return row;
            });
            return [...newState]; // Ensure a new reference for React to detect changes
        });
    };

    return (
        <div className="qzslider"><span className='handraw'><img src={handDrawicon}/>Hover over the cards below to begin.</span>
        <Slider ref={sliderRef} {...options}>
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
                                        <div className='mlike-sugg'>
                                            <img src={handDrawmlike}/>
                                            <span>Click to pick “Most Like”</span>
                                        </div>
                                        <div className='lelike-sugg'>
                                            <img src={handDrawlelike}/>
                                            <span>Click to pick “Least Like”</span>
                                        </div>
                                        <div className='mlike-sugg_active'>
                                            <img src={handDrawmlikeactive}/>
                                            <span>Click to remove the selection</span>
                                        </div>
                                        <div className='lelike-sugg_active'>
                                            <img src={handDrawlelikeactive}/>
                                            <span>Click to remove the selection</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                        <Col md={12} className="text-center mt-4">
                            <p className="mostlike">Pick one <strong>"Most Like”</strong> you and one <strong>"Least Like”</strong> you</p>
                        </Col>
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
        </Slider>
        </div>
    );
};

export default QuizSlider;
