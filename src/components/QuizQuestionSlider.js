import React, { useState } from 'react';
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
import enthuIQ from "../../src/images/icons/quiz/enthu.svg";
import satisfiedIQ from "../../src/images/icons/quiz/satisfied.svg";
import diplomaticIQ from "../../src/images/icons/quiz/diplomatic.svg";
import daringIQ from "../../src/images/icons/quiz/daring.svg";
import CautiousIQ from "../../src/images/icons/quiz/Cautious.svg";
import DeterminedIQ from "../../src/images/icons/quiz/Determined.svg";
import ConvincingIQ from "../../src/images/icons/quiz/Convincing.svg";
import GoodNaturedIQ from "../../src/images/icons/quiz/Good-Natured.svg";
import calmIQ from "../../src/images/icons/quiz/Calm.svg";
import OutspokenIQ from "../../src/images/icons/quiz/Outspoken.svg";
import AccurateIQ from "../../src/images/icons/quiz/Accurate.svg";
import FriendlyIQ from "../../src/images/icons/quiz/Friendly.svg";
import DecisiveIQ from "../../src/images/icons/quiz/Decisive.svg";
import ConventionalIQ from "../../src/images/icons/quiz/Conventional.svg";
import ControlledIQ from "../../src/images/icons/quiz/controlled.svg";
import TalkativeIQ from "../../src/images/icons/quiz/Talkative.svg";
import ModerateIQ from "../../src/images/icons/quiz/Moderate.svg";
import OutgoingIQ from "../../src/images/icons/quiz/Outgoing.svg";
import InsightfulIQ from "../../src/images/icons/quiz/Insightful.svg";
import AdventurousIQ from "../../src/images/icons/quiz/Adventurous.svg";
import OriginalIQ from "../../src/images/icons/quiz/Original.svg";
import HumbleIQ from "../../src/images/icons/quiz/Humble.svg";
import PersuasiveIQ from "../../src/images/icons/quiz/Persuasive.svg";
import GentleIQ from "../../src/images/icons/quiz/Gentle.svg";
import ResponsiveIQ from "../../src/images/icons/quiz/Responsive.svg";
import DominantIQ from "../../src/images/icons/quiz/Dominant.svg";
import MeticulousIQ from "../../src/images/icons/quiz/Meticulous.svg";
import ExpressiveIQ from "../../src/images/icons/quiz/Expressive.svg";
import ImpatientIQ from "../../src/images/icons/quiz/Impatient.svg";
import ModestIQ from "../../src/images/icons/quiz/Modest.svg";
import ObservantIQ from "../../src/images/icons/quiz/Observant.svg";
import PoisedIQ from "../../src/images/icons/quiz/Poised.svg";
import InsistentIQ from "../../src/images/icons/quiz/Insistent.svg";
import MagneticIQ from "../../src/images/icons/quiz/Magnetic.svg";
import AgreeableIQ from "../../src/images/icons/quiz/Agreeable.svg";
import TactfulIQ from "../../src/images/icons/quiz/Tactful.svg";
import TimidIQ from "../../src/images/icons/quiz/Timid.svg";
import SubmissiveIQ from "../../src/images/icons/quiz/Submissive.svg";
import InspiringIQ from "../../src/images/icons/quiz/Inspiring.svg";
import BraveIQ from "../../src/images/icons/quiz/Brave.svg";
import CheerfulIQ from "../../src/images/icons/quiz/Cheerful.svg";
import StrongWilledIQ from "../../src/images/icons/quiz/Strong-willed.svg";
import ObligingIQ from "../../src/images/icons/quiz/Obliging.svg";
import ReservedIQ from "../../src/images/icons/quiz/Reserved.svg";
import IndependantIQ from "../../src/images/icons/quiz/Independant.svg";
import PersceptiveIQ from "../../src/images/icons/quiz/Perceptive 1.svg";
import KindIQ from "../../src/images/icons/quiz/Kind.svg";
import StimulatingIQ from "../../src/images/icons/quiz/Stimulating.svg";
import PrivateIQ from "../../src/images/icons/quiz/Private.svg";
import JoyfulIQ from "../../src/images/icons/quiz/Joyful.svg";
import ConsiderateIQ from "../../src/images/icons/quiz/Considerate.svg";
import CompetitiveIQ from "../../src/images/icons/quiz/Competitive.svg";
import PlayfulIQ from "../../src/images/icons/quiz/playful.svg";
import FirmIQ from "../../src/images/icons/quiz/Firm.svg";
import ObedientIQ from "../../src/images/icons/quiz/Obedient.svg";
import FussyIQ from "../../src/images/icons/quiz/Fussy.svg";
import PredictableIQ from "../../src/images/icons/quiz/Predictable.svg";
import StubbornIQ from "../../src/images/icons/quiz/Stubborn.svg";
import IntrospectiveIQ from "../../src/images/icons/quiz/Introspective.svg";
import AttractiveIQ from "../../src/images/icons/quiz/Attractive.svg";
import CharmingIQ from "../../src/images/icons/quiz/Charming.svg";
import LoyalIQ from "../../src/images/icons/quiz/Loyal.svg";
import BoldIQ from "../../src/images/icons/quiz/Bold.svg";
import LogicalIQ from "../../src/images/icons/quiz/Logical.svg";
import SoftSpokenIQ from "../../src/images/icons/quiz/SoftSpoken.svg";
import selfReliantIQ from "../../src/images/icons/quiz/Self-reliant.svg";
import PatientIQ from "../../src/images/icons/quiz/Patient.svg";
import SociableIQ from "../../src/images/icons/quiz/Sociable.svg";
import HighSpiritedIQ from "../../src/images/icons/quiz/High-Spirited.svg";
import ThoroughIQ from "../../src/images/icons/quiz/Thorough.svg";
import EagerIQ from "../../src/images/icons/quiz/Eager.svg";
import WillingIQ from "../../src/images/icons/quiz/Willing.svg";
import FrearfulIQ from "../../src/images/icons/quiz/Frearful.svg";
import AmiableIQ from "../../src/images/icons/quiz/Amiable.svg";
import ExtrovertedIQ from "../../src/images/icons/quiz/Extroverted.svg";
import AggressiveIQ from "../../src/images/icons/quiz/Aggressive.svg";
import AssertiveIQ from "../../src/images/icons/quiz/Assertive.svg";
import ImpartialIQ from "../../src/images/icons/quiz/Impartial.svg";
import SympatheticIQ from "../../src/images/icons/quiz/Sympathetic.svg";
import ConfidentIQ from "../../src/images/icons/quiz/Confident.svg";
import PersistentIQ from "../../src/images/icons/quiz/Persistent.svg";
import AnimatedIQ from "../../src/images/icons/quiz/Animated.svg";
import GenerousIQ from "../../src/images/icons/quiz/Generous.svg";
import wellDesIQ from "../../src/images/icons/quiz/Well-Desciplined.svg";
import EasyGoingIQ from "../../src/images/icons/quiz/Easy-Going.svg";
import ForcefulIQ from "../../src/images/icons/quiz/Forceful.svg";
import IntrovertedIQ from "../../src/images/icons/quiz/Introverted.svg";
import ImpulsiveIQ from "../../src/images/icons/quiz/Impulsive.svg";
import LenientIQ from "../../src/images/icons/quiz/Lenient.svg";
import VigorousIQ from "../../src/images/icons/quiz/Vigorous.svg";
import RefinedIQ from "../../src/images/icons/quiz/Refined.svg";
import GoodMixerIQ from "../../src/images/icons/quiz/Good-Mixer.svg";
import CompliantIQ from "../../src/images/icons/quiz/Compliant.svg";
import DemandingIQ from "../../src/images/icons/quiz/Demanding.svg";
import ContentedIQ from "../../src/images/icons/quiz/Contended.svg";
import CaptivatingIQ from "../../src/images/icons/quiz/Captivating.svg";
import LightHeartedIQ from "../../src/images/icons/quiz/Light-Hearted.svg";
import CooperativeIQ from "../../src/images/icons/quiz/Cooperative.svg";
import SystematicIQ from "../../src/images/icons/quiz/Systematic.svg";
import ArgumentativeIQ from "../../src/images/icons/quiz/Argumentative.svg";
import EvenTempIQ from "../../src/images/icons/quiz/Even-Tempered.svg";
import DirectIQ from "../../src/images/icons/quiz/Direct.svg";
import PreciseIQ from "../../src/images/icons/quiz/Precise.svg";
import JovialIQ from "../../src/images/icons/quiz/Jovial.svg";
import CarefulIQ from "../../src/images/icons/quiz/Careful.svg";
import AppealingIQ from "../../src/images/icons/quiz/Appealing.svg";
import NeighbourlyIQ from "../../src/images/icons/quiz/Neighbourly.svg";
import RestlessIQ from "../../src/images/icons/quiz/Restless.svg";

import HelpfulIQ from "../../src/images/icons/quiz/Helpful.svg";
import OptimisticIQ from "../../src/images/icons/quiz/Optimistic.svg";
import PioneeringIQ from "../../src/images/icons/quiz/Pioneering.svg";
import RespectfulIQ from "../../src/images/icons/quiz/Respectful.svg";


import {
    Col,
    Row
} from "react-bootstrap";
import { GujratiQuizOption, HindiQuizOption, KannadaQuizOption, TamilQuizOption, TeluguQuizOption } from '../utils/behaviour';

const imageMap = {
    "Enthusiasm": enthuIQ,
    "Satisfied": satisfiedIQ,
    "Diplomatic": diplomaticIQ,
    "Daring": daringIQ,

    "Cautious": CautiousIQ,
    "Determined": DeterminedIQ,
    "Convincing": ConvincingIQ,
    "Good-Natured": GoodNaturedIQ,

    "Calm": calmIQ,
    "Outspoken": OutspokenIQ,
    "Accurate": AccurateIQ,
    "Friendly": FriendlyIQ,

    "Decisive": DecisiveIQ,
    "Conventional": ConventionalIQ,
    "Controlled": ControlledIQ,
    "Talkative": TalkativeIQ,

    "Moderate": ModerateIQ,
    "Outgoing": OutgoingIQ,
    "Insightful": InsightfulIQ,
    "Adventurous": AdventurousIQ,

    "Original": OriginalIQ,
    "Humble": HumbleIQ,
    "Persuasive": PersuasiveIQ,
    "Gentle": GentleIQ,

    "Responsive": ResponsiveIQ,
    "Dominant": DominantIQ,
    "Meticulous": MeticulousIQ,
    "Expressive": ExpressiveIQ,

    "Impatient": ImpatientIQ,
    "Modest": ModestIQ,
    "Observant": ObservantIQ,
    "Poised": PoisedIQ,

    "Insistent": InsistentIQ,
    "Magnetic": MagneticIQ,
    "Agreeable": AgreeableIQ,
    "Tactful": TactfulIQ,

    "Timid": TimidIQ,
    "Submissive": SubmissiveIQ,
    "Inspiring": InspiringIQ,
    "Brave": BraveIQ,

    "Cheerful": CheerfulIQ,
    "Strong Willed": StrongWilledIQ,
    "Obliging": ObligingIQ,
    "Reserved": ReservedIQ,

    "Independent": IndependantIQ,
    "Perceptive": PersceptiveIQ,
    "Kind": KindIQ,
    "Stimulating": StimulatingIQ,

    "Private": PrivateIQ,
    "Joyful": JoyfulIQ,
    "Considerate": ConsiderateIQ,
    "Competitive": CompetitiveIQ,

    "Playful": PlayfulIQ,
    "Firm": FirmIQ,
    "Obedient": ObedientIQ,
    "Fussy": FussyIQ,

    "Predictable": PredictableIQ,
    "Stubborn": StubbornIQ,
    "Introspective": IntrospectiveIQ,
    "Attractive": AttractiveIQ,

    "Charming": CharmingIQ,
    "Loyal": LoyalIQ,
    "Bold": BoldIQ,
    "Logical": LogicalIQ,

    "Soft Spoken": SoftSpokenIQ,
    "Self Reliant": selfReliantIQ,
    "Patient": PatientIQ,
    "Sociable": SociableIQ,

    "High Spirited": HighSpiritedIQ,
    "Thorough": ThoroughIQ,
    "Eager": EagerIQ,
    "Willing": WillingIQ,

    "Fearful": FrearfulIQ,
    "Amiable": AmiableIQ,
    "Extroverted": ExtrovertedIQ,
    "Aggressive": AggressiveIQ,

    "Assertive": AssertiveIQ,
    "Impartial": ImpartialIQ,
    "Sympathetic": SympatheticIQ,
    "Confident": ConfidentIQ,

    "Persistent": PersistentIQ,
    "Animated": AnimatedIQ,
    "Generous": GenerousIQ,
    "Well-Disciplined": wellDesIQ,

    "Easy-Going": EasyGoingIQ,
    "Forceful": ForcefulIQ,
    "Introverted": IntrovertedIQ,
    "Impulsive": ImpulsiveIQ,

    "Lenient": LenientIQ,
    "Vigorous": VigorousIQ,
    "Refined": RefinedIQ,
    "Good Mixer": GoodMixerIQ,

    "Compliant": CompliantIQ,
    "Demanding": DemandingIQ,
    "Contented": ContentedIQ,
    "Captivating": CaptivatingIQ,

    "Light-Hearted": LightHeartedIQ,
    "Cooperative": CooperativeIQ,
    "Systematic": SystematicIQ,
    "Argumentative": ArgumentativeIQ,

    "Even-Tempered": EvenTempIQ,
    "Direct": DirectIQ,
    "Precise": PreciseIQ,
    "Jovial": JovialIQ,

    "Careful": CarefulIQ,
    "Appealing": AppealingIQ,
    "Neighbourly": NeighbourlyIQ,
    "Restless": RestlessIQ,

    "Helpful": HelpfulIQ,
    "Optimistic": OptimisticIQ,
    "Pioneering": PioneeringIQ,
    "Respectful": RespectfulIQ,
};

const QuizQuestionSlider = ({ quizMostLeastLike, setQuizMostLeastLike, language }) => {
    const options = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        // centerMode: true,
        // centerPadding: "20px",
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        focusOnSelect: true
    };

    console.log(language)
    const handleClikcquiz = (rowIndex, option, type) => {
        // setQuizMostLeastLike((prevState) => {
        //     const newState = prevState.map((row, index) => {
        //         if (index === rowIndex) {
        //             let newRow = { ...row };
        //             if (type === "most") {
        //                 // If clicking most, check if it's already selected as least
        //                 if (row.least === option?.option_name) {
        //                     newRow.least = ""; // Remove least selection first
        //                 }
        //                 newRow.most = row.most === option?.option_name ? "" : option?.option_name; // Toggle most
        //             } else if (type === "least") {
        //                 // If clicking least, check if it's already selected as most
        //                 if (row.most === option?.option_name) {
        //                     newRow.most = ""; // Remove most selection first
        //                 }
        //                 newRow.least = row.least === option?.option_name ? "" : option?.option_name; // Toggle least
        //             }
        //             return newRow;
        //         }
        //         return row;
        //     });
        //     return [...newState]; // Ensure a new reference for React to detect changes
        // });
        setQuizMostLeastLike((prevState) => {
            const newState = prevState.map((row, index) => {
                if (index === rowIndex) {
                    let newRow = { ...row };
                    if (type === "most") {
                        if (row.least === option?.option_name) {
                            newRow.least = ""; // Remove least selection if same
                            newRow.leastList = newRow.leastList.filter((id) => id !== option?.uid);
                        }
                        if (row.most === option?.option_name) {
                            newRow.most = ""; // Deselect if already selected
                            newRow.mostList = newRow.mostList.filter((id) => id !== option?.uid);
                        } else {
                            newRow.most = option?.option_name;
                            if (!newRow.mostList.includes(option?.uid)) {
                                newRow.mostList = [option?.uid]; // Push ID
                            }
                        }
                    } else if (type === "least") {
                        if (row.most === option?.option_name) {
                            newRow.most = ""; // Remove most selection if same
                            newRow.mostList = newRow.mostList.filter((id) => id !== option?.uid);
                        }
                        if (row.least === option?.option_name) {
                            newRow.least = ""; // Deselect if already selected
                            newRow.leastList = newRow.leastList.filter((id) => id !== option?.uid);
                        } else {
                            newRow.least = option?.option_name;
                            if (!newRow.leastList.includes(option?.uid)) {
                                newRow.leastList = [option?.uid]; // Push ID
                            }
                        }
                    }
                    return newRow;
                }
                return row;
            });
            return [...newState]; // Ensure React detects state change
        });
    }
    console.log(quizMostLeastLike)

    return (
        <div className="qzslider"><span className='handraw'><img src={handDrawicon} />Hover over the cards below to begin.</span>
            <Slider key={JSON.stringify(quizMostLeastLike)} {...options}>
                {quizMostLeastLike?.map((row, rowIndex) => (
                    <div key={row?.id} className="item">
                        <Row>
                            {row.behaviour_options.map((option, index) => (
                                <Col md={3}>
                                    <div key={option}
                                        className={`quiz_card ${row.most === option?.option_name ? "info-select" : ""} ${row.least === option?.option_name ? "info-warring" : ""} `}
                                    >
                                        <span className="quiz_icon"><img src={imageMap[option?.option_name]} /></span>
                                        <h4>
                                            {language === 'hindi' ? HindiQuizOption[option?.option_name] : language === 'gujrati' ? GujratiQuizOption[option?.option_name] :
                                                language === 'kannada' ? KannadaQuizOption[option?.option_name] : language === 'tamil' ? TamilQuizOption[option?.option_name] :
                                                    language === 'telugu' ? TeluguQuizOption[option?.option_name] : option?.option_name}
                                        </h4>
                                        <div className="quiz-btns">
                                            <button type="button" className="btn-up" onClick={() => {
                                                handleClikcquiz(rowIndex, option, "most")
                                            }}><i className={`fa ${row.most === option?.option_name ? 'fa-times' : 'fa-arrow-up'}`}></i></button>
                                            <button type="button" className="btn-down" onClick={() => {
                                                handleClikcquiz(rowIndex, option, "least")
                                            }}><i className={`fa ${row.least === option?.option_name ? 'fa-times' : 'fa-arrow-down'} `}></i></button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default QuizQuestionSlider;
