import React from 'react';
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
const QuizSlider = () => {
  const options = {
    loop:true,
    margin:10,
    items: 1,
    nav:true,
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

  return (
    <OwlCarousel className="owl-theme" {...options}>
        <div className="item">
            <Row>
                <Col md={3}>
                    <div className="quiz_card">
                        <span className="quiz_icon"><img src={iceIQ}/></span>
                        <h4>Ice Cream</h4>
                        <div className="quiz-btns">
                            <button type="button" className="btn-up"><i className="fa fa-arrow-up"></i></button>
                            <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="quiz_card">
                        <span className="quiz_icon"><img src={teaIQ}/></span>
                        <h4>Tea</h4>
                        <div className="quiz-btns">
                            <button type="button" className="btn-up"><i className="fa fa-arrow-up"></i></button>
                            <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                        </div>
                    </div>
                </Col>
                <Col  md={3}>
                    <div className="quiz_card info-select">
                        <span className="quiz_icon"><img src={cakeIQ}/></span>
                        <h4>Cake</h4>
                        <div className="quiz-btns">
                            <button type="button" className="btn-up"><i className="fa fa-arrow-up"></i></button>
                            <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="quiz_card">
                        <span className="quiz_icon"><img src={coffieIQ}/></span>
                        <h4>Coffee</h4>
                        <div className="quiz-btns">
                            <button type="button" className="btn-up"><i className="fa fa-arrow-up"></i></button>
                            <button type="button" className="btn-down"><i className="fa fa-arrow-down"></i></button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <div className="item">
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
        </div>
      </OwlCarousel>
  );
};

export default QuizSlider;
