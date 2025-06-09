import React, { useEffect, useRef, useState } from "react";
import {
    Accordion,
    Badge,
    Button,
    Col,
    Dropdown,
    Form,
    FormControl,
    InputGroup,
    Modal,
    ProgressBar,
    Row,
} from "react-bootstrap";

import RangeSlider from "../../components/RangeSilder";
import Edit03 from "../../images/icons/edit-0303.svg";
import messageIcon from "../../images/icons/message-square-02.svg";
import pencilIcon from "../../images/icons/pencil-line.svg";
import simpleFlag from "../../images/icons/Importance-Flag.svg";
import importantFlagOutline from "../../images/icons/Importance-Flag-01.svg";
import ActiveRedFlag from "../../images/icons/Active-Flag-red.svg";
import flagFill from "../../images/icons/Importance-Flag-02.svg";
import logoIcon from "../../images/logo_icon.png";
import AchieverIcn from "../../images/icons/Achiever-icon.svg";
import LeaderIcn from "../../images/icons/Leader-icon.svg";
import InfluencerIcn from "../../images/icons/Influencer-icon.svg";
import PioneerIcn from "../../images/icons/Pioneer-icon.svg";
import {
    getJobDetailsApi,
    getQualificationListApi,
    CreateJobQuestion,
    getSkillGroupDetailsApi,
    addSkill,
    addSkillGroupPost,
    getSkillList,
    CreateJobIsLike,
    CreateJobLocation,
} from "../../services/provider";
import { removeToken } from "../../helpers/helper";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import HelpChoose from "../../screens/HelpmeChoose/HelpChoose";
import RangeSliderNew from "../SliderRange";
import imgpTrash from "../../images/icons/trash-01.svg";
import { toast } from "react-toastify";

const UpdateJobsRevised = ({
    show,
    handleClose,
    handleCreateForm,
    handleFormData,
    setCreatedUid,
    createUid,
    setBadges,
    badges,
    minEdu,
    setMinEdu,
    setIsUpdated,
    isUpdated,
    setRestrictedRoleBadges,
    restrictedRoleBadges,
    IndustriesBadges,
    setIndustriesBadge,
    isLike,
    setIsLike,
    setIsLikeData,
    isLikeDropdown,
    isLikeData,
    handleLike,
    handleSelectedLikeItems,
    setIsHideRestrictedRoles,
    isHideRestrictedRoles,
    setIsHideIndustries,
    ishideIndustries,
    isDisabledTarget,
    setIsDisabledTarget,
    isSpecificLanguareRequired,
    setIsSpecificLanguareRequired,
    rdnwBadges,
    setrdnwBadges,
    spokenLanguageBadges,
    setSpokenLanguageBadges,
    setLocationBadges,
    locationBadges,
    isHideLocation,
    setIsHideLLocation,
    handleLocationApi,
    createJobUid,
    setSelectSkillsData,
    SelectSkillsData,
    behaviours,
    setBehaviours,
    updateFormData,
    setUpdateFormData,
    mustHaveSkills,
    setMustHaveSkills,
    importantFlag,
    setImportantFlag
}) => {
    const [createRevisedJobData, setCreateRevisedJobData] = useState(null);
    const [components, setComponents] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [priceRangeType, setPriceRangeType] = useState("");
    const [expRangeType, setExpRangeTpe] = useState("Range");
    const [industries, setIndustries] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(50);
    const [range, setRange] = useState({ min: 2, max: 5 });
    const [activeKeyAdd, setActiveKeyAdd] = useState(false);
    const [questionType, setQuestionType] = useState("single");
    const [activeKey, setActiveKey] = useState(null);
    const [addSubSkill, setAddSubSkill] = useState([]);
    const [addSkillGroup, setAddSkillGroup] = useState([]);
    const [customValue, setCustomValue] = useState("");
    const [skillSearch, setSkillSearch] = useState("");
    const [skillngroupList, setskillngroupList] = useState([]);
    const [showSkillList, setShowSkillList] = useState(false);
    const [skillGroupData, setSkillGroupsData] = useState([]);
    const [skillGroupDataExist, setSkillGroupDataExist] = useState([])
    const [personalityData, setPersonalityData] = useState()
    const [selectedpersonality, setSelectedpersonality] = useState({
        modal_name: "",
        modal_data: {}
    })
    const [showHelpChoose, setShowHelpChoose] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState([])
    const [openStep, setOpenStep] = useState(["1"])
    const [skillError, setSkillError] = useState("")
    const [dynamicArray, setDynamicArray] = useState([]);
    const [aresEducationOption, setAreaEducationOption] = useState([])
    const [shorlistedIndustries, setShorlistedIndustries] = useState([])
    const [restrictedRole, setRestrictedRole] = useState([]);
    const [spokenLanguage, setSpokenLanguage] = useState([])
    const [writtenLanguage, setWittenLanguage] = useState([])
    const [locationList, setLocationList] = useState([])
    const [currentStep, setCurrentStep] = useState(["0", "1"]); // Controls which section is open
    const [expandCollapse, setExpandCollapse] = useState([1, 2, 3])
    const areaEduRef = useRef();
    const industriesRef = useRef();
    const roleRef = useRef();
    const spokenRef = useRef()
    const writtenRef = useRef()
    const locationRef = useRef()
    const [calculateRecommend, setCalculatedRecommend] = useState([])
    // const [importantFlag, setImportantFlag] = useState({
    //     salary: false,
    //     education: false,
    //     experience: false,
    //     targethiredate: false,
    //     language: false,
    //     geography: false,
    // })
    //<------------------help me choose------------------------>
    const [isIndex, setIsIndex] = useState([1]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedItem1, setSelectedItem1] = useState([]);
    const [selectedItem2, setSelectedItem2] = useState([]);
    const [selectedItem3, setSelectedItem3] = useState([]);
    const [totalItem, setTotalItem] = useState([]);
    const [important, setImportant] = useState([]);
    const [helpChooseOption, setHelpChooseOption] = useState({
        IndividualEffort: [
            { heading: 'Self Motivation', uid: "64d932b7-89d3-4270-b553-58b6bdc66be1", isSelected: false, markedImportant: false, data: 'Self Motivation is an ideal behaviour for a person when they are required to start things on their own and set their own goals and standards. This typically is necessary when change and improvement is needed but the direction is not very well defined.' },
            { heading: 'Efficiency', uid: "93a2b8af-3af5-4d7f-bc39-165c8fdefd81", isSelected: false, markedImportant: false, data: 'While efficiency is essential for all roles, it should not be picked just because deadlines should be met by the hired person. Choose this when planning, optimization, and streamlining to increase or maintain productivity are the key responsibilities of the role' },
            { heading: 'Independence', uid: "64715729-4e7a-49d3-9ffd-6ea627116b2c", isSelected: false, markedImportant: false, data: 'This behavior is essential when an individual must navigate uncertain or challenging situations  without clear guidance. It is particularly relevant in leadership or independent contributor roles, where making autonomous decisions is a regular requirement.' },
        ],
        InterpersonalRelations: [
            { heading: 'Friendliness', uid: "815db2c5-bac6-4eff-a629-698eb1aa9551", isSelected: false, markedImportant: false, data: `This behaviour is crucial for promoting collaboration and teamwork, fostering a supportive and inclusive environment that thrives on strong interpersonal relationships. It's not just about being nice; it's about promoting openness through a fair and collaborative approach.` },
            { heading: 'Self Confidence', uid: "db1aa38a-0db6-4871-88b1-085010b1c346", isSelected: false, markedImportant: false, data: 'This behaviour is recommended in roles that require individuals to trust their judgement and capabilities, enabling them to lead and inspire others with conviction and clarity. It is particularly desirable in roles where the individual is relied upon for decision-making for the entire team.' },
            { heading: 'Enthusiasm', uid: "dc5eb856-b6b6-404a-955e-5e034424fe31", isSelected: false, markedImportant: false, data: 'Enthusiasm goes beyond being high-spirited. It is most needed when the person in this role needs to promote inquisitiveness, interest and passion in the environment around them by their own heightened interest in the work and achieving goals and outcomes.' },
        ],
        Consistency: [
            { heading: 'Patience', uid: "ebc2a4a2-3e61-463a-a2cc-cec72b5894a9", isSelected: false, markedImportant: false, data: 'This behaviour is needed in the following scenarios: first, when the role requires individuals to tolerate delays and obstacles calmly on a daily basis; and second, when the role involves dealing with repetitive tasks or waiting for long-term outcomes.' },
            { heading: 'Persistence', uid: "5be7e9c5-c0c2-45d6-8866-5381976dd92c", isSelected: false, markedImportant: false, data: 'This is a necessary behaviour for roles which need to deal with delays and difficulties regularly and require that the person actively persists in overcoming them until the goals are achieved. Giving up in the face of challenges is not an option in such roles.' },
            { heading: 'Thoughtfulness', uid: "52261636-2fab-4935-ad9c-f2a3fa9f8be4", isSelected: false, markedImportant: false, data: 'Some roles require foresight, long term planning, impact assessment. A desired behaviour in persons who need to anticipate all contingencies, risks and benefits before making crucial decisions or recommendations and should try and avoid an unexpected outcome at all costs.' },
        ],
        Systematic: [
            { heading: 'Accuracy', uid: "af0b3a0b-90ec-4df0-bd82-8b633ce993d5", isSelected: false, markedImportant: false, data: 'Requirement for working without errors should not be the reason for choosing this behaviour. This should be considered when the margin for error in judgement, or decisions is very low and where avoiding mistakes is more important than considerations of time, cost, or other factors.' },
            { heading: 'Sensitivity', uid: "424b93e6-d4d7-4d43-af55-c40c7c809071", isSelected: false, markedImportant: false, data: 'This behaviour is key in roles where understanding and reacting to the subtle cues that are not easily apparent is required. This is not just about interpersonal skills and extends to being able to successfully navigate complex environments with a lot of inter related parts.' },
            { heading: 'Cooperativeness', uid: "bf72d375-bd6f-498f-800c-af60189a1f77", isSelected: false, markedImportant: false, data: 'Ideal when a role demands effective collaboration across different teams. It involves actively seeking input from others, integrating diverse perspectives, resolving conflicts by finding common ground and willingness to compromise when needed for harmony and productivity.' },
        ]
    })
    //<------------------End of code--------------------------->
    // const [activeBehaviour,setActiveBehaviour] = useState([]);
    // const [importantBehaviour,setImportantBehaviour] = useState([]);
    const hasSelectedAndImportant = behaviours.some((item) => (item?.isSelected || item?.markedImportant));
    const navigate = useNavigate();
    const behaviourResponse = [
        {
            behaviours_name: "Pioneer",
            behaviour_type_name: "(D/ISC) High Dominance",
            behaviour_desctiption: "Pioneers are often ambitious, competitive, and strong-willed individuals. They have a very high need to achieve and continually seek new horizons. Their self-reliance and independent thinking drive them to escape convention and create innovative solutions. They are direct and assertive and apt at influencing people. They are dynamic, adaptable, and willing to do anything to overcome obstacles. Pioneers are persistent in their pursuit of desired results. Overcome by their desire to achieve their goals, they might fail to take other people’s feelings into consideration. Additionally, they have high expectations of others and can be critical if their standards are not met.",
            suvcm: [{ Strengths: "Action-oriented, resourceful, self-reliant, decisive, proactive, strong-willed, direct", Uniqueness: "Sound decision making, self-motivated, excels in emergencies", Value_to_ORG: "Innovative solutions; taking responsibility", Challenges: "Too independent, tends to be blunt, boredom", Motivation: "New opportunities, strong need to achieve, power and structure." }]
        },
        {
            behaviours_name: "Influencer",
            behaviour_type_name: "(I/DSC) High Influence",
            behaviour_desctiption: "Influencers are confident, outgoing and friendly individuals who love to be the center of attention. They seek out situations that involve meeting people and socializing. Their confidence combined with a genuine interest in ideas and people, allows them to interact easily, and positively in almost any situation. These strong communicators are assertive, intuitive, and adaptive. They thrive in meetings, committees, and conferences. They may need a constant dose of Approval. They also might sometimes lose focus on timelines and the tasks at hand.",
            suvcm: [{ Strengths: "Fun, persuasive, ideas-oriented, creative, original, networkers, intuitive", Uniqueness: "Openness, strong communication, social confidence", Value_to_ORG: "Contributing original ideas, improve and extend coordination within team", Challenges: "Needs constant approval, pressured conditions", Motivation: "Being surrounded by people, supportive and collaborative environment" }]
        },
        {
            behaviours_name: "Team Player",
            behaviour_type_name: "(S/DIC) High Steadiness",
            behaviour_desctiption: "Team players are friendly, calm, and thoughtful individuals that like doing practical jobs. Amidst their calm nature, controlled stance, modest attitude, and excellent listening skills, they tend to empathize with others ’perspectives. They value positive interactions and are always willing to help. They depend on more socially assertive people to take the lead. Their persistence and patience enable them to work steadily until the task is completed. They value trust strongly and enjoy being part of a smaller team where they are valued and appreciated. Typically, they resist change and need help in developing alternative solutions.",
            suvcm: [{ Strengths: "Flexibility, dependability, harmony, warmth, listening, team-focused, loyal", Uniqueness: "Listens effectively, supportive, works steadily", Value_to_ORG: "Capable of dealing with laborious tasks; works on a task until it is achieved", Challenges: "Sudden change; interruptions and distractions", Motivation: "Helping others succeed; support of people; doing practical jobs" }]
        },
        {
            behaviours_name: "Logical Thinker",
            behaviour_type_name: "(C/DIS) High Compliance",
            behaviour_desctiption: "Logical thinkers are hardworking, logical, and detail-oriented individuals with high critical thinking abilities. Their habit of meticulous preparation, accuracy, and correctness helps them to manage tasks effectively. Despite being shy and mild-mannered, logical thinkers have a strong need to control their environment. They exert rules, structure, and standards, to accomplish their goals, in conflicting situations. Their cautiousness makes them reluctant to reveal information about themselves or their thoughts unless necessary. Being natural risk avoiders, they only undertake tasks when they are completely certain about the outcome.",
            suvcm: [{ Strengths: "Quality control, handling detail, analyzing data, logical, avoiding the risk, building structure, being deliberate and methodical", Uniqueness: "Accuracy; ability to think logically; building structure", Value_to_ORG: "Completes the undertaken task; great at quality control; organizing information", Challenges: "Spotting deficiencies first; controlling; lacks assertiveness", Motivation: "Certainty of situation and consequences; getting things right" }]
        },
        {
            behaviours_name: "Persuader",
            behaviour_type_name: "(DI/SC) High Dominance and Influence",
            behaviour_desctiption: "Persuaders are assertive, adventurous, and confident individuals with strong social skills. They can be charming or demanding, based on the circumstances. They tend to approach people and situations with energy. While communicating, they can be both assertive and persuasive. Their ability to think and react quickly lets them easily adapt to challenging situations. They have no fear of confrontation and address issues directly. They have clear goals in life and achieve them with sheer determination and commitment. Persuaders thrive in situations that others would find impossibly stressful and difficult. They live for and are happiest when on adventures",
            suvcm: [{ Strengths: "Charming, visionary, adventurous, bold, high energy, results-focused, exciting and fun", Uniqueness: "Sound decision making, self-motivated, excels in emergencies", Value_to_ORG: "Thrives under pressure; motivates people; commits and achieves results", Challenges: "Stagnation; can get aggressive under pressure", Motivation: "Success and recognition; new experiences and challenges" }]
        },
        {
            behaviours_name: "Achiever",
            behaviour_type_name: "(DS/IC) High Dominance and Steadiness",
            behaviour_desctiption: "This is an extremely rare profile with radically different sets of values and motivations. Achievers are reliable, persistent, tenacious, and industrious individuals with a strong sense of personal accountability. They like to get things done in a friendly but thorough manner. They are focused on results with a strong inclination towards fair play and respect. Their careful planning allows them to complete tasks within realistic timescales. They tend to be thoughtful in favorable conditions and demanding at times of pressure. Achievers are usually cautious and only open up to a small set of people they completely trust. They function at peak efficiency and expect recognition equal to their contribution.",
            suvcm: [{ Strengths: "Patient, tenacious, dependable, consistent, protective, kind, watchful", Uniqueness: "Methodical in approach; accountability of work", Value_to_ORG: "Self-driven and completes tasks effectively", Challenges: "Poor communication; inferior work", Motivation: "Personal and professional accomplishments" }]
        },
        {
            behaviours_name: "Perfectionist",
            behaviour_type_name: "(DC/IS) High Dominance and Compliance",
            behaviour_desctiption: "Perfectionists are tenacious, competitive, systematic, and creative individuals with opposing behavioral forces. They seek immediate results and have an equally strong desire for perfection. Their ability to plan and achieve quality allows them to make sound decisions. They think and act quickly but also evaluate all options before agreeing to a course of action. In their drive for results and perfection, they demand the freedom to explore and the authority to examine. They are straightforward and enjoy working by themselves. They tend to be careful with relationships and prefer a strategic approach when dealing with others. They are open to change but extremely cautious.",
            suvcm: [{ Strengths: "Tenacity, quality control, handling large amounts of detail, analyzing data, building systems, competing to win, results-focused, striving to be the best", Uniqueness: "Attention to detail; tries innovative approaches using existing systems", Value_to_ORG: "Can bring positive change to the team by challenging them and raising the standards", Challenges: "Bored with routine work; gets lost in detail", Motivation: "Unique accomplishments and dominance" }]
        },
        {
            behaviours_name: "Assessor",
            behaviour_type_name: "(IC/DS) High Influence and Compliance",
            behaviour_desctiption: "Assessors are articulate, creative, organized, and well-researched individuals with a unique blend of contradicting traits. They seek the company of others but are also exhausted by them. On one hand, they are outgoing and impulsive in favorable conditions yet in formal situations, they are precise and rule-abiding. They are naturally skilled at influencing people with strong communication. They are imaginative, perceptive and strive for perfection. They elicit cooperation from others by being considerate. They have the desire to win and can overwork to the point of exhaustion. They are practical and ensure progressive results by developing a detailed plan of action.",
            suvcm: [{ Strengths: "Articulate, well-researched, produce quality results, self-disciplined, careful, expressive, enthusiastic, fun", Uniqueness: "Turning dreams into workable concepts; result-oriented and quality-driven", Value_to_ORG: "Brings new ideas to the table; team players that instigate action and activities", Challenges: "Not knowing when to stop; sensitive to criticism", Motivation: "Winning attention and approval; succeeding at all costs" }]
        },
        {
            behaviours_name: "Implementor",
            behaviour_type_name: "(SC/DI) High Steadiness and Compliance",
            behaviour_desctiption: "Implementors are stable, consistent, pragmatic, and accommodating individuals that are driven by patience, accuracy, and logic. They are precise thinkers and through precautions avoid the unexpected. They prefer traditional approaches. They question assumptions and require loads of information that they can analyze when exploring alternatives and before reaching conclusion. They enjoy overcoming challenges through persistence and intense focus. They are calm and rational folks, and they rarely provide input in a group.They hold themselves to high standards and desire to earn the respect of those around them.",
            suvcm: [{ Strengths: "Dependable, stable, careful, accurate, hard working, patient, diplomatic", Uniqueness: "Brings stability on board; sticks to “fail safe” options", Value_to_ORG: "Works diligently to get the job done; maintains quality and standards", Challenges: "Reluctant to change; takes time to adapt", Motivation: "Predictable and stable outcomes; recognition for work" }]
        },
        {
            behaviours_name: "Motivator",
            behaviour_type_name: "(DIS/C) High Dominance, Influence and Steadiness",
            behaviour_desctiption: "This is an extremely rare profile with radically different sets of values and motivations. Achievers are reliable, persistent, tenacious, and industrious individuals with a strong sense of personal accountability. They like to get things done in a friendly but thorough manner. They are focused on results with a strong inclination towards fair play and respect. Their careful planning allows them to complete tasks within realistic timescales. They tend to be thoughtful in favorable conditions and demanding at times of pressure. Achievers are usually cautious and only open up to a small set of people they completely trust. They function at peak efficiency and expect recognition equal to their contribution.",
            suvcm: [{ Strengths: "Dependable, socially skilled, patient, warm, interesting and fun, driven to achieve, self-reliant", Uniqueness: "Clarity on goals and ways to accomplish; control over circumstances", Value_to_ORG: "Confidently suggests innovative ideas; assigns tasks effectively", Challenges: "Being asked to investigate too much detail; routine and regimen", Motivation: "New opportunities; strong need to achieve" }]
        },
        {
            behaviours_name: "Mediator",
            behaviour_type_name: "(ISC/D) High Influence, Steadiness and Compliance",
            behaviour_desctiption: "Mediators are creative, well-spoken, and understanding individuals that enjoy being a team member and helping others succeed. They love being in a supportive role and can bring valuable insights if given the time needed to think. They are rational in problem-solving and adept at presenting arguments in a credible manner. Their insistence on taking things at their own pace might not be agreeable to all. They prefer a cooperative environment where people are trustworthy and pleasant. They thrive on their contribution to projects that require attention to detail. They have high expectations of themselves and others around them and might voice disapproval when their expectations are not met.",
            suvcm: [{ Strengths: "Productive, well-spoken, researching, harmonious, collaborative, co-operative, detail-oriented, patient", Uniqueness: "Accommodating and inspiring", Value_to_ORG: "Skilled and proficient in problem solving; highly skilled", Challenges: "Aversion to risks and being too predictable; not recognized as experts.", Motivation: "Supporting and interacting with others; learning from and teaching to others." }]
        },
        {
            behaviours_name: "Collaborator",
            behaviour_type_name: "(IS/DC) High Influence and Steadiness",
            behaviour_desctiption: "Collaborators are warm, empathetic, easygoing and relaxed individuals that socialize with ease. They tend to think of others first over themselves. They strive to maintain harmony and build long-term relationships. Being good listeners, they make others feel heard and offer suggestions gently. They are sympathetic in nature and fulfil supportive roles well. They often provide recognition to others and attribute less importance to task accomplishment. They love to work in team settings and appreciate environments that ensure stability with minimal change. While they generally avoid conflict and confrontation, they are willing to mediate with others to restore harmony.",
            suvcm: [{ Strengths: "Versatile, warm, responsive, upbeat, respectful, loyal, enthusiastic", Uniqueness: "Group acceptance and approval; friendliness", Value_to_ORG: "Effective listening skills; bring stability and harmony to the team", Challenges: "Conflicting situations; over-commitment; boredom; cannot confront or give direct orders.", Motivation: "Recognition from people around; peaceful environment where they can collaborate with others" }]
        },
        {
            behaviours_name: "Administrator",
            behaviour_type_name: "(DSC/I) High Dominance, Steadiness and Compliance",
            behaviour_desctiption: "Administrators are steady, objective, clear-minded and analytical individuals that get results and keep the team happy at the same time. They have a clear view of their aims in life. Their patience and thoughtfulness help them avoid risks. They guard their thoughts and reveal them only after careful thought and consideration. They choose their words carefully, make practical decisions, and rely upon logic rather than emotion. They possess the drive to track detail and the desire to build the harmony needed to run the team. While being good executors, they rarely bring in the imagination and vision needed for innovative initiatives.They can be both dominant and supportive based on the situation.",
            suvcm: [{ Strengths: "Productive, efficient, practical, pragmatic, thoughtful, detail-oriented, patient", Uniqueness: "Uses logic effectively to get results", Value_to_ORG: "Works with determination; can work individually or with others", Challenges: "Tendency to get overworked; being blunt; not creative", Motivation: "Achieving results by taking time to adapt to changing situations; attention to detail; avoiding risk" }]
        },
        {
            behaviours_name: "Leader",
            behaviour_type_name: "(DIC/S) High Dominance, Influence and Compliance",
            behaviour_desctiption: "Leaders are practical, innovative, self-reliant, and ambitious individuals that are always pushing to makethings better. They are friendly, charming, and enthusiastic in casual circumstances but tend to be direct,forthright, and assertive in formal setups. They like taking responsibility and taking credit for both wins and losses, as long as they have control of the results. They do not shy away from taking command when needed and may be impatient with the inefficiencies of others. They are sensitive to the needs of the team. They find a balance between personal ambitions and group goals. They are very clear thinkers, make good decisions and promote harmony in the team.",
            suvcm: [{ Strengths: "Driven, innovative, practical, self-reliant, leadership ability, confident, clear thinking", Uniqueness: "Accommodating and inspiring; drive to make things better", Value_to_ORG: "Persistently accomplishes goals with inclusivity of team", Challenges: "Impatience when things don’t go a certain way; being managed", Motivation: "Opportunity to get things done in their way; supporting the team" }]
        },
    ]
    const getJobDetails = async () => {
        const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-api/${createJobUid}/`;
        try {
            const response = await getJobDetailsApi(url);
            setCreateRevisedJobData(response.data.response);
            setUpdateFormData({
                ...updateFormData,
                display_salary: response?.data?.response?.display_salary,
                max_salary: response?.data?.response?.max_salary ? response?.data?.response?.max_salary : "",
                min_salary: response?.data?.response?.min_salary ? response?.data?.response?.min_salary : "",
                currency: response?.data?.response?.currency,
                salary_type: response?.data?.response?.salary_type,
                salary_price_type: response?.data?.response?.salary_price_type,
                // workplace_type: response?.data?.response?.workplace_type,
                // job_type: response?.data?.response?.job_type,
                // description_attachment: response?.data?.response?.description_attachment?response?.data?.response?.description_attachment:"",
                // detailed_description: response?.data?.response?.detailed_description,
                // number_of_positions: response?.data?.response?.number_of_positions,
                // requires_travel: response?.data?.response?.requires_travel,
                // job_location: response?.data?.response?.job_location?.uid,
                // department: response?.data?.response?.department?.uid,
                // job_benefits: response?.data?.response?.job_benefits?.map((Val)=>Val?.uid),
                // is_like: response?.data?.response?.is_like?.map((Val)=>Val.uid),
                // job_title: response?.data?.response?.job_title,
                non_negotiable_salary: response?.data?.response?.non_negotiable_salary,
                minimum_education: response?.data?.response?.minimum_education ? response?.data?.response?.minimum_education : "",
                // area_of_education: response?.data?.response?.area_of_education?.length?response?.data?.response?.area_of_education:"",
                higher_qualification_preferred: response?.data?.response?.higher_qualification_preferred,
                other_areas_acceptable: response?.data?.response?.other_areas_acceptable,
                year_of_experience_type: response?.data?.response?.year_of_experience_type,
                min_exp: response?.data?.response?.min_exp ? response?.data?.response?.min_exp : "",
                max_exp: response?.data?.response?.max_exp ? response?.data?.response?.max_exp : "",
                restricted_industries: response?.data?.response?.restricted_industries,
                define_current_role: response?.data?.response?.define_current_role,
                // shortlisted_industry: response?.data?.response?.shortlisted_industry?.length?response?.data?.response?.shortlisted_industry:"",
                // restricted_roles: response?.data?.response?.restricted_roles,
                targate_hire_date: response?.data?.response?.targate_hire_date,
                immediate_hiring: response?.data?.response?.immediate_hiring,
                explore_buy_out_option: response?.data?.response?.explore_buy_out_option,
                // spoken_language: response?.data?.response?.spoken_language?.length?response?.data?.response?.spoken_language:"",
                // read_write_language: response?.data?.response?.read_write_language?.length?response?.data?.response?.read_write_language:"",
                no_specific_language_require: response?.data?.response?.no_specific_language_require,
                // preferred_geography: response?.data?.response?.preferred_geography,
                no_specific_location: response?.data?.response?.no_specific_location,
                relocation_cost_covered: response?.data?.response?.relocation_cost_covered,
                // skills: response?.data?.response?.skill?response?.data?.response?.skill:"",
                // must_have_skills: response?.data?.response?.must_have_skills?.length?response?.data?.response?.must_have_skills:"",
                // job_status: response?.data?.response?.job_status,
                // important_behaviour: response?.data?.response?.important_behaviour,
                // selected_behaviour: response?.data?.response?.selected_behaviour,
            })
            setCreatedUid(response.data.response.uid);
            setBadges(response?.data?.response?.area_of_education)
            setIndustriesBadge(response?.data?.response?.shortlisted_industry)
            setRestrictedRoleBadges(response?.data?.response?.restricted_roles)
            setSpokenLanguageBadges(response?.data?.response?.spoken_language)
            setrdnwBadges(response?.data?.response?.read_write_language)
            setLocationBadges(response?.data?.response?.preferred_geography)
            setPriceRangeType(response.data.response.salary_price_type)
            setSelectSkillsData(response?.data?.response?.skills)
            setMustHaveSkills(response?.data?.response?.must_have_skills)
            setSkillGroupDataExist(response?.data?.response?.skills)
            setComponents(response?.data?.response?.question_job)
            setImportantFlag({
                salary: response?.data?.response?.is_salary_imp,
                education: response?.data?.response?.is_education_imp,
                experience: response?.data?.response?.is_experience_imp,
                targethiredate: response?.data?.response?.is_targate_hire_date_imp,
                language: response?.data?.response?.is_language_imp,
                geography: response?.data?.response?.is_geography_imp,
            })
            // setSkillGroupsData(response?.data?.response?.skills)
            const formated = response?.data?.response?.skills.reduce((acc, item) => {
                const { skill_group } = item;
                const groupKey = skill_group.skill_group_name;
                let group = acc.find(g => g.skill_group_name === groupKey);
                if (!group) {
                    group = {
                        id: skill_group.id,
                        uid: skill_group.uid,
                        skill_group_name: skill_group.skill_group_name,
                        group_skill: [],
                    };
                    acc.push(group);
                }
                group.group_skill.push(item);
                return acc;
            }, []);
            setSkillGroupsData(formated)
            // debugger
            if (response?.data?.response?.calculation_job.length > 0) {
                const personalityKeys = Object.keys(response?.data?.response?.calculation_job[0].personality_data);
                const updatedBehaviourResponse = behaviourResponse.map(item => ({
                    ...item,
                    personality_percentage: response?.data?.response?.calculation_job[0].personality_data[item.behaviour_type_name] || 0 // Default to 0 if no match
                }));
                const matchedBehaviours = updatedBehaviourResponse.filter(item =>
                    personalityKeys.includes(item.behaviour_type_name)
                );
                const behaviour = response?.data?.response?.calculation_job[0]?.behaviour?.map((Val) => Val.uid)
                const important = response.data.response.calculation_job[0].important_behaviour.map((val) => val.uid)
                setPersonalityData(matchedBehaviours)
                const updatedArray = behaviours.map((item) => ({
                    ...item,
                    isSelected: behaviour.includes(item.uid),
                    markedImportant: important.includes(item.uid)
                }))

                const step1 = helpChooseOption.IndividualEffort.map((item) => ({
                    ...item,
                    isSelected: behaviour.includes(item.uid),
                    markedImportant: important.includes(item.uid)
                }))
                const transformed = Object.entries(helpChooseOption).reduce((acc, [categoryKey, behaviours]) => {
                    acc[categoryKey] = Object.values(behaviours).map(values => ({
                        heading: values.heading,
                        uid: values.uid,
                        isSelected: behaviour.includes(values.uid),
                        markedImportant: important.includes(values.uid),
                        data: values.data
                    }));
                    return acc;
                }, {});

                setHelpChooseOption(transformed)

                // setSelectedItem(step1)                
                setBehaviours(updatedArray)
            }
            setIsUpdated(false);
        } catch (error) {
            console.log("error response----->>>>>>", error);
            if (
                error?.response?.status === 401 ||
                error?.response?.data?.detail?.includes(
                    "Given token not valid for any token type"
                )
            ) {
                //console.log("Token expired, redirecting to login");
                removeToken();
                navigate("/loginwithpassword");
            }
        }
    };

    // const handleKeyPress = async (e) => {
    //     if (e.key === "Enter" && inputValue.trim()) {
    //         e.preventDefault();

    //         getQualificationListByCourse(inputValue);
    //     }
    // };

    // const handleKeyPressForIndustries = async (e) => {
    //     if (e.key === "Enter" && inputValue.trim()) {
    //         e.preventDefault();
    //         getShortlistedIndustries(inputValue);
    //     }
    // };

    const handleKeyPressForlanguages = async (e, from) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            getLanguages(inputValue, from);
        }
    };

    const handleKeyPressForLocation = async (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            handleLocationApi(inputValue);
        }
    };
    const handleLocationAPIList = (e) => {
        const { name, value } = e.target
        const url = `https://bittrend.shubansoftware.com/account-api/location-list-api/?page=1&limit=500&search=${value}`;
        CreateJobLocation(url)
            .then((res) => {
                // setLocationData(res.data.response);
                if (res.data.response.length > 0) {
                    setLocationList(res?.data?.response)
                    //   setLocationBadges((prevBadges) => [
                    //     ...prevBadges,
                    //     res?.data?.response[0],
                    //   ]);
                }
            })
            .catch((error) => {
                if (
                    error?.response?.status === 401 ||
                    error?.response?.data?.detail?.includes(
                        "Given token not valid for any token type"
                    )
                ) {
                    //console.log("Token expired, redirecting to login");
                    //   removeToken();
                    //   navigate("/loginwithpassword");
                }
            });
    };

    const handleAreaOfEducation = async (e) => {
        const { name, value } = e.target;
        // const newRows = [...EducationRows];
        // newRows[index]["areaOfEducation"] = value;
        // let search = newRows[index]["areaOfEducation"]
        // SetEducationRows(newRows);
        let url;
        if (value != "") {
            url = `https://bittrend.shubansoftware.com/assets-api/education-qualification-list-by-course-api?page=1&limit=10&search=${value}`;
        }

        try {
            const response = await getQualificationListApi(url);
            if (response?.data?.response.length > 0) {
                if (value) {
                    setAreaEducationOption(response?.data?.response)
                    // setBadges((prevBadges) => [
                    //   ...prevBadges,
                    //   response?.data?.response[0],
                    // ]);
                    // setInputValue("");
                }
            }
        } catch (error) {
            console.log("error response----->>>>>>", error);
        }
    };
    const getQualificationListByCourse = async (inputVal) => {
        let url;
        if (inputVal != "") {
            url = `https://bittrend.shubansoftware.com/assets-api/education-qualification-list-by-course-api/${minEdu}?page=1&limit=10&search=${inputVal}`;
        }

        try {
            const response = await getQualificationListApi(url);
            if (response?.data?.response.length > 0) {
                if (inputVal) {
                    setBadges((prevBadges) => [
                        ...prevBadges,
                        response?.data?.response[0],
                    ]);
                    setInputValue("");
                }
            }
        } catch (error) {
            console.log("error response----->>>>>>", error);
        }
    };
    const getShortlistedIndustries = async (searchTerm) => {
        if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
            setIndustries([]);
            return;
        }

        try {
            const response = await axios.get(
                "https://bittrend.shubansoftware.com/account-api/industry-list-api/",
                {
                    params: {
                        page: 1,
                        limit: 500,
                        search: searchTerm,
                    },
                }
            );

            if (response.data.success && response.data.response.length > 0) {
                // setIndustriesBadge((prevBadges) => [
                //     ...prevBadges,
                //     response?.data?.response[0],
                // ]);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };
    const handlesShorlistedIndustries = async (e) => {
        const { name, value } = e.target;
        // if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
        //     setIndustries([]);
        //     return;
        // }

        try {
            const response = await axios.get(
                "https://bittrend.shubansoftware.com/account-api/industry-list-api/",
                {
                    params: {
                        page: 1,
                        limit: 500,
                        search: value,
                    },
                }
            );

            if (response.data.success && response.data.response.length > 0) {
                setShorlistedIndustries(response?.data?.response)
                // setIndustriesBadge((prevBadges) => [
                //     ...prevBadges,
                //     response?.data?.response[0],
                // ]);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };
    const isLikeHandleRole = (e) => {
        const { name, value } = e.target;
        const url = `https://bittrend.shubansoftware.com/assets-api/islike-list-api/?search=${value}&page=1&limit=10`;
        CreateJobIsLike(url)
            .then((res) => {

                if (res?.data?.response.length > 0) {
                    //   setRestrictedRoleBadges((prevBadges) => [
                    //     ...prevBadges,
                    //     res?.data?.response[0],
                    //   ]);
                    setRestrictedRole(res?.data?.response)
                }
            })
            .catch((error) => {
                if (
                    error?.response?.status === 401 ||
                    error?.response?.data?.detail?.includes(
                        "Given token not valid for any token type"
                    )
                ) {
                    //console.log("Token expired, redirecting to login");
                    //   removeToken();
                    //   navigate("/loginwithpassword");
                }
            });
    };
    const handleSelectAreaEducation = (option) => {
        setBadges((prevBadges) => [
            ...prevBadges,
            option,
        ]);
        setAreaEducationOption([])
    }
    const handleSelectShortlistIndustries = (option) => {
        setIndustriesBadge((prevBadges) => [
            ...prevBadges,
            option,
        ]);
        setShorlistedIndustries([])
    }
    const handleSelectRestrictedRole = (option) => {
        setRestrictedRoleBadges((prevBadges) => [
            ...prevBadges,
            option,
        ]);
        setRestrictedRole([])
    }
    const handleSelectLocation = (option) => {
        setLocationBadges((prevBadges) => [
            ...prevBadges,
            option,
        ]);
        setLocationList([])
    }
    const handleRemoveBadge = (index) => {
        setBadges((prevBadges) => prevBadges.filter((_, i) => i !== index));
    };
    const handleRemoveLocationBadge = (index) => {
        setLocationBadges((prevBadges) => prevBadges.filter((_, i) => i !== index));
    };

    const handleRemoveRoleBadge = (index) => {
        setRestrictedRoleBadges((prevBadges) =>
            prevBadges.filter((_, i) => i !== index)
        );
    };

    const handleRemoveIndustriesBadge = (index) => {
        setIndustriesBadge((prevBadges) =>
            prevBadges.filter((_, i) => i !== index)
        );
    };

    const handleRemoveSpokenLanguageBadge = (index) => {
        setSpokenLanguageBadges((prevBadges) =>
            prevBadges.filter((_, i) => i !== index)
        );
    };

    const handleRemoveReadAndWriteLanguageBadge = (index) => {
        setrdnwBadges((prevBadges) => prevBadges.filter((_, i) => i !== index));
    };

    const handleMinInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0 && value <= maxValue) {
            // setMinValue(value);
            setRange({
                ...range,
                ["min"]: value
            })
        }
    };

    const handleMaxInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            if (value >= minValue && value <= 50) {
                // setMaxValue(Math.min(value, 50)); // Cap the value at 40
                setRange({
                    ...range,
                    ["max"]: Math.min(value, 50)
                })
            }
        }
    };

    const displayMaxValue = (value) => {
        return value > 40 ? "40+" : value;
    };

    const getLanguages = async (inputVal, from) => {
        let url;
        if (inputVal != "") {
            url = `https://bittrend.shubansoftware.com/assets-api/laguage-list-api/?page=1&limit=10&search=${inputVal}`;
        }

        try {
            const response = await getQualificationListApi(url);
            if (response?.data?.response.length > 0) {
                if (inputVal) {
                    if (from === "spoken") {
                        setSpokenLanguageBadges((prevBadges) => [
                            ...prevBadges,
                            response?.data?.response[0],
                        ]);
                    } else if (from === "rdnw") {
                        setrdnwBadges((prevBadges) => [
                            ...prevBadges,
                            response?.data?.response[0],
                        ]);
                    }

                    setInputValue("");
                }
            }
        } catch (error) {
            console.log("error response----->>>>>>", error);
        }
    };
    const handleWaSlanguages = async (e, from) => {
        const { name, value } = e.target;
        let url;
        if (value != "") {
            url = `https://bittrend.shubansoftware.com/assets-api/laguage-list-api/?page=1&limit=10&search=${value}`;
        }

        try {
            const response = await getQualificationListApi(url);
            if (response?.data?.response.length > 0) {
                if (value) {
                    if (from === "spoken") {
                        setSpokenLanguage(response?.data?.response)
                        // setSpokenLanguageBadges((prevBadges) => [
                        //     ...prevBadges,
                        //     response?.data?.response[0],
                        // ]);
                    } else if (from === "rdnw") {
                        setWittenLanguage(response?.data?.response)
                        // setrdnwBadges((prevBadges) => [
                        //     ...prevBadges,
                        //     response?.data?.response[0],
                        // ]);
                    }

                    // setInputValue("");
                }
            }
        } catch (error) {
            console.log("error response----->>>>>>", error);
        }
    };
    const handleSelectSpokenLang = (option) => {
        setSpokenLanguageBadges((prevBadges) => [
            ...prevBadges,
            option,
        ]);
        setSpokenLanguage([])
    }
    const handleSelectWrittenLang = (option) => {
        setrdnwBadges((prevBadges) => [
            ...prevBadges,
            option,
        ]);
        setWittenLanguage([])
    }
    const handleSaveCustomQuestion = async () => {
        const formData = new FormData();

        // Append each question and its data to the FormData object
        components.forEach((question, index) => {
            formData.append("job_question", question.job_question);
            formData.append("question_title", question.question_title);
            formData.append("quiz_type", question.quiz_type);
            formData.append("is_mandatory", question.is_mandatory);
            formData.append("question_option", JSON.stringify(question.question_option));
            formData.append("questions_answer", JSON.stringify(question.questions_answer));
        });

        try {
            const response = await CreateJobQuestion(formData);
            if (response.data.status == 200) {
                alert("Question Saved Successfully");
                getJobDetails();
            }
        } catch { }
    };

    // Function to handle changes in the question title
    const handleQuestionTitleChange = (index, value) => {
        const updatedComponents = [...components];
        updatedComponents[index].question_title = value;
        setComponents(updatedComponents);
    };

    // Function to handle changes in the question options
    const handleQuestionOptionChange = (questionIndex, optionIndex, value) => {
        const updatedComponents = [...components];
        updatedComponents[questionIndex].question_option.part1[optionIndex] = value;
        setComponents(updatedComponents);
    };

    // Function to handle changes in the question type (MCQ Single/Multiple)
    const handleQuestionTypeChange = (index, value) => {
        const updatedComponents = [...components];
        updatedComponents[index].quiz_type =
            value === "single" ? "MCQ" : "MCQ-M";
        setComponents(updatedComponents);
        setQuestionType(value);
    };

    // Function to add a new response option
    const handleAddResponse = (questionIndex) => {
        const updatedComponents = [...components];
        updatedComponents[questionIndex].question_option.part1.push(""); // Add a new empty option
        setComponents(updatedComponents);
    };
    const handleDeleteRowQuestion = (questionIndex) => {
        const filerArray = components.filter((_, index) => index != questionIndex)
        setComponents(filerArray);
    }

    // Function to add a new question component
    const handleAddComponent = (e) => {
        e.stopPropagation();
        if (components.length < 5) {
            const newQuestion = {
                job_question: createJobUid, // pass job uid
                question_title: "",
                quiz_type: "MCQ",
                question_option: {
                    part1: [""], // Start with an empty array for new questions
                },
                questions_answer: [],
                is_mandatory: "True", // pass True or False value
            };

            setComponents([...components, newQuestion]);
        } else {
            alert('You can add only five Custom Question')
        }
    };

    const handleDeleteOption = (questionIndex, optionIndex) => {
        const updatedComponents = [...components];
        updatedComponents[questionIndex].question_option.part1.splice(
            optionIndex,
            1
        ); // Remove the option at the specified index
        const selectedAnswers = updatedComponents[questionIndex].questions_answer;
        const deletedOption =
            updatedComponents[questionIndex].question_option.part1[optionIndex];
        const updatedAnswers = selectedAnswers.filter(
            (answer) => answer !== deletedOption
        );
        updatedComponents[questionIndex].questions_answer = updatedAnswers;

        setComponents(updatedComponents);
    };

    const handleAnswerChange = (questionIndex, optionValue, isChecked) => {
        const updatedComponents = [...components];
        const selectedAnswers = updatedComponents[questionIndex].questions_answer;

        if (questionType === "single") {
            // For radio buttons, replace the entire array with the selected answer
            updatedComponents[questionIndex].questions_answer = isChecked
                ? [optionValue]
                : [];
        } else {
            // For checkboxes, add or remove the selected answer
            if (isChecked) {
                updatedComponents[questionIndex].questions_answer = [
                    ...selectedAnswers,
                    optionValue,
                ];
            } else {
                updatedComponents[questionIndex].questions_answer =
                    selectedAnswers.filter((answer) => answer !== optionValue);
            }
        }

        setComponents(updatedComponents);
    };
    const handlesubSkillAdd = (index) => {
        const CreateCustomLabel = {
            created_at: "",
            id: 0,
            skill_group: 0,
            skill_name: "",
            uid: "",
            updated_at: "",
        };
        setSkillError("")
        if (!selectedIndex.includes(index)) {
            setSelectedIndex([index])
            setAddSubSkill([CreateCustomLabel])
        } else if (selectedIndex.includes(index)) {
            setSelectedIndex([...selectedIndex])
            setAddSubSkill((prev) => [...prev, CreateCustomLabel]);
        }

    };

    const handleAddSkillGroup = () => {
        const newForm = {
            id: Date.now(),
        };
        setAddSkillGroup([...addSkillGroup, newForm]);
    };

    const handleDeleteGroup = (index) => {
        setSkillError("")
        setAddSkillGroup((prev) => prev.filter((_, i) => i !== index));
        setAddSubSkill([])
    };
    const hadleDeleteCurrentSkill = (index) => {
        setSkillError("")
        setAddSubSkill((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSaveSkillGroup = async () => {
        // setSkillGroupsData(null);
        if (addSubSkill.length < 5 || addSubSkill.length > 12) {
            setSkillError("There cannot be more than 12 Skills within a Skill Group and There have to be a minimum of 5 Skills within a Skill Group");
        } else {
            const formdata = new FormData();
            formdata.append("skill_group_name", customValue);
            let skillName = SelectSkillsData?.map((item) => item?.skill_name) // Extract skill_name values
                ?.filter((skill) => skill !== "") // Filter out empty strings
                ?.join(",");
            formdata.append("skill_name", skillName);
            try {
                const response = await addSkillGroupPost(formdata);
                if (response.data.status == 200) {
                    setCustomValue("");
                    setAddSubSkill([]);
                    setAddSkillGroup([]);
                    // setSkillGroupsData([...skillGroupData, response?.data?.response]);
                    getSkillGroupDetails(response?.data?.response?.uid);
                }
            } catch (error) {
                console.log("error=-------", error);
                if (
                    error?.response?.status === 401 ||
                    error?.response?.data?.detail?.includes(
                        "Given token not valid for any token type"
                    )
                ) {
                    //console.log("Token expired, redirecting to login");
                    removeToken();
                    navigate("/loginwithpassword");
                }
            }
        }
    };
    const handleBlur = async (value, item) => {
        if (item?.group_skill?.length < 12) {
            const formdata = new FormData();
            formdata.append("skill_group", item?.uid);
            formdata.append("skill_name", value);

            try {
                const response = await addSkill(formdata);
                if (response.data.status == 200) {
                    getSkillGroupDetails(item?.uid);
                }
            } catch (error) {
                console.log("error=-------", error);
                if (
                    error?.response?.status === 401 ||
                    error?.response?.data?.detail?.includes(
                        "Given token not valid for any token type"
                    )
                ) {
                    //console.log("Token expired, redirecting to login");
                    removeToken();
                    navigate("/loginwithpassword");
                }
            }
        } else {
            setSkillError("There cannot be more than 12 Skills within a Skill Group and There have to be a minimum of 5 Skills within a Skill Group");
        }
    };

    const getSkillGroupDetails = async (id) => {
        // setSkillGroupsData(null);
        const url = `https://bittrend.shubansoftware.com/assets-api/skill-group-detail-api/${id}/`;
        try {
            const response = await getSkillGroupDetailsApi(url);
            if (response) {
                setShowSkillList(false);
                setSkillGroupsData((prevItem) => {
                    const itemExists = prevItem.some((item) => item.uid === response.data.response.uid);
                    if (itemExists) {
                        return prevItem.map((item) =>
                            item.uid === response.data.response.uid ? { ...item, group_skill: response.data.response.group_skill } : item
                        );
                    } else {
                        return [...prevItem, response.data.response];
                    }
                })
                setSelectedIndex([])
                // setSkillGroupsData([...skillGroupData, response.data.response]);
                setskillngroupList([]);
            }
        } catch (error) {
            console.log("error response----->>>>>>", error);
            if (
                error?.response?.status === 401 ||
                error?.response?.data?.detail?.includes(
                    "Given token not valid for any token type"
                )
            ) {
                //console.log("Token expired, redirecting to login");
                removeToken();
                navigate("/loginwithpassword");
            }
        }
    };

    const handleSkillGroupSearch = async (query) => {
        const url = `https://bittrend.shubansoftware.com/assets-api/skill-group-list-api/?search=${query}&page=1&limit=10`;
        try {
            const response = await getSkillList(url);
            if (response) {
                setskillngroupList(response.data.response);
                setShowSkillList(true);
            }

            // setCreatedUid(response.data.response.uid);
            // setIsUpdated(false);
        } catch (error) {
            console.log("error response----->>>>>>", error);
            if (
                error?.response?.status === 401 ||
                error?.response?.data?.detail?.includes(
                    "Given token not valid for any token type"
                )
            ) {
                removeToken();
                navigate("/loginwithpassword");
            }
        }
    };
    const getTotalValues = (array) => {
        return array.reduce((total, arr) => total + arr.length, 0);
    };
    const handleSelectedSkill = (e, benefititem, index) => {
        // setSelectSkillsData((prevState) =>
        //     prevState.includes(benefititem)
        //         ? prevState.filter((item2) => item2 !== benefititem)
        //         : [...prevState, benefititem]
        // );
        e.stopPropagation();
        setSkillError("")
        setDynamicArray((prevArray) => {
            const totalValues = getTotalValues(prevArray);
            return prevArray.map((arr, i) => {
                if (i === index && arr.length < 8 && totalValues < 12 && !arr.includes(benefititem)) {
                    return [...arr, benefititem];
                } else if (i === index && arr.includes(benefititem)) {
                    return arr.filter((item2) => item2 !== benefititem);
                }
                //validation on skills
                else if (i === index && totalValues < 12 && !arr.includes(benefititem)) {
                    setSkillError(" A maximum of 70% or (N-3) which ever is lower can be selected from any Skill Group")
                } else if (totalValues === 12) {
                    setSkillError("There cannot be more than 12 Skills within a Skill Group and There have to be a minimum of 5 Skills within a Skill Group")
                }//end validation
                return arr;
            });
        });
        // setSelectSkillsData((prevState) =>
        //     !prevState.includes(benefititem) && prevState.length < 12
        //         ? [...prevState, benefititem]
        //         : prevState.filter((item2) => item2 !== benefititem)
        // );
    };
    useEffect(() => {
        setSelectSkillsData(dynamicArray.flat())
    }, [dynamicArray])

    console.log('llllllllllllllllllllllllllllllllllll', dynamicArray.flat())
    const countSelectedItems = () => {
        const selectedCount = behaviours.filter((item) => item.isSelected).length;
        const markedImportantCount = behaviours.filter(
            (item) => item.markedImportant
        ).length;
        return { selectedCount, markedImportantCount };
    };

    const handleBoxClick = (index, value) => {
        const { selectedCount, markedImportantCount } = countSelectedItems();

        setBehaviours((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    // Allow toggling only if:
                    // 1. The item is not already selected, and the selectedCount is less than 4.
                    // 2. The item is already selected (to allow deselecting).
                    if (!item.isSelected && selectedCount < 6) {
                        return { ...item, isSelected: !item.isSelected };
                    } else if (item.isSelected) {
                        return { ...item, isSelected: !item.isSelected, markedImportant: false };
                    }
                }
                return item;
            })
        );
        if (value.heading == 'Self Motivation' || value.heading == 'Efficiency' || value.heading == 'Independence') {
            setHelpChooseOption(prev => ({
                ...prev,
                IndividualEffort: prev?.IndividualEffort?.map((item, i) => {
                    if (item?.heading === value.heading) {
                        if (!item.isSelected && selectedCount < 6) {
                            return { ...item, isSelected: true };
                        } else if (item.isSelected) {
                            return { ...item, isSelected: false, markedImportant: false };
                        }
                    }
                    return item;
                })
            }));
        } else if (value.heading == 'Friendliness' || value.heading == 'Self Confidence' || value.heading == 'Enthusiasm') {
            setHelpChooseOption(prev => ({
                ...prev,
                InterpersonalRelations: prev?.InterpersonalRelations?.map((item, i) => {
                    if (item?.heading === value.heading) {
                        if (!item.isSelected && selectedCount < 6) {
                            return { ...item, isSelected: true };
                        } else if (item.isSelected) {
                            return { ...item, isSelected: false, markedImportant: false };
                        }
                    }
                    return item;
                })
            }));
        } else if (value.heading == 'Patience' || value.heading == 'Persistence' || value.heading == 'Thoughtfulness') {
            setHelpChooseOption(prev => ({
                ...prev,
                Consistency: prev?.Consistency?.map((item, i) => {
                    if (item?.heading === value.heading) {
                        if (!item.isSelected && selectedCount < 6) {
                            return { ...item, isSelected: true };
                        } else if (item.isSelected) {
                            return { ...item, isSelected: false, markedImportant: false };
                        }
                    }
                    return item;
                })
            }));
        } else if (value.heading == 'Accuracy' || value.heading == 'Sensitivity' || value.heading == 'Cooperativeness') {
            setHelpChooseOption(prev => ({
                ...prev,
                Systematic: prev?.Systematic?.map((item, i) => {
                    if (item?.heading === value.heading) {
                        if (!item.isSelected && selectedCount < 6) {
                            return { ...item, isSelected: true };
                        } else if (item.isSelected) {
                            return { ...item, isSelected: false, markedImportant: false };
                        }
                    }
                    return item;
                })
            }));
        }

    };

    const handleStarClick = (index, e, value) => {
        e.stopPropagation(); // Prevent the box click handler from being triggered
        const { markedImportantCount } = countSelectedItems();

        setBehaviours((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    // Allow toggling only if:
                    // 1. The item is not already markedImportant, and the markedImportantCount is less than 2.
                    // 2. The item is already markedImportant (to allow unmarking).
                    if (item?.isSelected) {
                        if (!item.markedImportant && markedImportantCount < 2) {
                            return { ...item, markedImportant: !item.markedImportant };
                        } else if (item.markedImportant) {
                            return { ...item, markedImportant: !item.markedImportant };
                        } else {
                            toast.error(
                                <div>
                                    <strong>2 most important ones</strong>
                                    <div>You can highlight only 2 behaviors as the most important at a time.</div>
                                </div>
                            )
                        }
                    }
                }
                return item;
            })
        );
        if (value == 'Self Motivation' || value == 'Efficiency' || value == 'Independence') {
            setHelpChooseOption(prev => ({
                ...prev,
                IndividualEffort: prev?.IndividualEffort?.map((item, i) => {
                    if (item?.heading === value) {
                        if (item?.isSelected) {
                            if (!item.markedImportant && markedImportantCount < 2) {
                                return { ...item, markedImportant: !item.markedImportant };
                            } else if (item.markedImportant) {
                                return { ...item, markedImportant: !item.markedImportant };
                            }
                        }
                    }
                    return item;
                })
            }));
        } else if (value == 'Friendliness' || value == 'Self Confidence' || value == 'Enthusiasm') {
            setHelpChooseOption(prev => ({
                ...prev,
                InterpersonalRelations: prev?.InterpersonalRelations?.map((item, i) => {
                    if (item?.heading === value) {
                        if (item?.isSelected) {
                            if (!item.markedImportant && markedImportantCount < 2) {
                                return { ...item, markedImportant: !item.markedImportant };
                            } else if (item.markedImportant) {
                                return { ...item, markedImportant: !item.markedImportant };
                            }
                        }
                    }
                    return item;
                })
            }));
        } else if (value == 'Patience' || value == 'Persistence' || value == 'Thoughtfulness') {
            setHelpChooseOption(prev => ({
                ...prev,
                Consistency: prev?.Consistency?.map((item, i) => {
                    if (item?.heading === value) {
                        if (item?.isSelected) {
                            if (!item.markedImportant && markedImportantCount < 2) {
                                return { ...item, markedImportant: !item.markedImportant };
                            } else if (item.markedImportant) {
                                return { ...item, markedImportant: !item.markedImportant };
                            }
                        }
                    }
                    return item;
                })
            }));
        } else if (value == 'Accuracy' || value == 'Sensitivity' || value == 'Cooperativeness') {
            setHelpChooseOption(prev => ({
                ...prev,
                Systematic: prev?.Systematic?.map((item, i) => {
                    if (item?.heading === value) {
                        if (item?.isSelected) {
                            if (!item.markedImportant && markedImportantCount < 2) {
                                return { ...item, markedImportant: !item.markedImportant };
                            } else if (item.markedImportant) {
                                return { ...item, markedImportant: !item.markedImportant };
                            }
                        }
                    }
                    return item;
                })
            }));
        }
    };
    // Handle click on Col
    const handleCardClick = (behaviour) => {
        setSelectedpersonality({
            modal_isOpen: true,
            modal_data: behaviour
        });
    };

    // Close modal
    const handleCloseModal = () => {
        setSelectedpersonality({
            modal_isOpen: false,
            modal_data: {}
        });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (skillSearch != "") {
                handleSkillGroupSearch(skillSearch);
            }
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [skillSearch]);

    useEffect(() => {
        getJobDetails();
        setBadges([]);
        setRestrictedRoleBadges([]);
        setIndustriesBadge([]);
        setrdnwBadges([]);
        setSpokenLanguageBadges([]);
        setLocationBadges([]);
    }, []);
    useEffect(() => {
        if (isUpdated) {
            getJobDetails();
        }
    }, [isUpdated]);
    function setClassName() {
        if (updateFormData?.year_of_experience_type) {
            if (updateFormData?.year_of_experience_type == 'Range' && updateFormData?.min_exp && updateFormData?.max_exp &&
                IndustriesBadges?.length > 0 && restrictedRoleBadges?.length > 0) {
                return 'active'
            } else if (updateFormData?.year_of_experience_type == 'Min' && updateFormData?.min_exp &&
                IndustriesBadges?.length > 0 && restrictedRoleBadges?.length > 0) {
                return 'active'
            } else if (updateFormData?.year_of_experience_type == 'Max' && updateFormData?.max_exp &&
                IndustriesBadges?.length > 0 && restrictedRoleBadges?.length > 0) {
                return 'active'
            }
        }
    }
    function cusQuestion() {
        if (components?.[0]?.is_mandatory && components?.[0]?.job_question && components?.[0]?.question_option?.part1?.length > 0 && components?.[0]?.question_title &&
            components?.[0]?.questions_answer?.length > 0 && components?.[0]?.quiz_type
        ) {
            return 'active'
        }
    }
    function setClassForSalary() {
        if (updateFormData?.salary_price_type) {
            if (updateFormData?.salary_price_type == 'Salary-range' && updateFormData?.min_salary &&
                updateFormData?.max_salary && updateFormData?.currency && updateFormData?.salary_type) {
                return 'active'
            } else if (updateFormData?.salary_price_type == 'Min-range' && updateFormData?.min_salary &&
                updateFormData?.currency && updateFormData?.salary_type) {
                return 'active'
            } else if (updateFormData?.salary_price_type == 'Max-range' && updateFormData?.max_salary
                && updateFormData?.currency && updateFormData?.salary_type) {
                return 'active'
            }
        }
    }
    function handleMustHaveSkill(benefititem) {
        setMustHaveSkills((prevState) =>
            !prevState.includes(benefititem) && prevState.length < 3
                ? [...prevState, benefititem]
                : prevState.filter((item2) => JSON.stringify(item2) != JSON.stringify(benefititem))
        );
    }
    const handleOpenStep = (index) => {
        if (!openStep.includes(index)) {
            setOpenStep([index])
        }
        else {
            // const newArray = openStep.filter((cv) => cv !== index);
            setOpenStep([])
        }
    }
    const sectionRefs = useRef([]);
    const toolbarRef = useRef(null);
    const [toolbarPosition, setToolbarPosition] = useState(0);
    // console.log(activeBehaviour)
    // const updatedArray = behaviours.map((item)=>({
    //   ...item,
    //   isSelected:activeBehaviour.includes(item.uid)
    // }))
    useEffect(() => {
        if (openStep.length && sectionRefs.current[openStep[0]]) {
            //   const top = sectionRefs.current[openStep[0]].offsetTop;
            if (openStep[0] === '1' && !Array.isArray(currentStep)) {
                setToolbarPosition(104);
            } else if (openStep[0] === '1' && Array.isArray(currentStep)) {
                setToolbarPosition(307);
            } else if (openStep[0] === '2') {
                setToolbarPosition(160);
            } else if (openStep[0] === '3') {
                setToolbarPosition(216);
            } else if (openStep[0] === '4') {
                setToolbarPosition(273);
            } else if (openStep[0] === '5') {
                setToolbarPosition(328);
            } else if (openStep[0] === '6') {
                setToolbarPosition(386);
            } else if (openStep[0] === '8' && !Array.isArray(currentStep)) {
                setToolbarPosition(103);
            } else if (openStep[0] === '8' && Array.isArray(currentStep)) {
                setToolbarPosition(224);
            } else if (openStep[0] === '9') {
                setToolbarPosition(160);
            } else if (openStep[0] === '11' && !Array.isArray(currentStep)) {
                setToolbarPosition(103);
            } else if (openStep[0] === '11' && Array.isArray(currentStep)) {
                setToolbarPosition(254);
            }
        }
    }, [openStep]);
    const handleImportantFlag = (e, index) => {
        e.stopPropagation();
        if (index === '1') {
            // setImportantFlag({
            //     ...importantFlag,
            //     ["salary"]: true
            // })
            setImportantFlag(prev => {
                const trueCount = Object.values(prev).filter(Boolean).length;

                // If already true or max reached, do nothing
                if (prev["salary"] === true || trueCount >= 2) {
                    toast.error(
                        <div>
                            <strong>2 most important ones</strong>
                            <div>You can highlight only 2 the most important at a time.</div>
                        </div>
                    )
                    return prev;
                }

                return {
                    ...prev,
                    ["salary"]: true,
                };
            });
        } else if (index === '2') {
            // setImportantFlag({
            //     ...importantFlag,
            //     ["education"]: true
            // })
            setImportantFlag(prev => {
                const trueCount = Object.values(prev).filter(Boolean).length;

                // If already true or max reached, do nothing
                if (prev["education"] === true || trueCount >= 2) {
                    toast.error(
                        <div>
                            <strong>2 most important ones</strong>
                            <div>You can highlight only 2 the most important at a time.</div>
                        </div>
                    )
                    return prev;
                }

                return {
                    ...prev,
                    ["education"]: true,
                };
            });
        } else if (index === '3') {
            // setImportantFlag({
            //     ...importantFlag,
            //     ["experience"]: true
            // })
            setImportantFlag(prev => {
                const trueCount = Object.values(prev).filter(Boolean).length;

                // If already true or max reached, do nothing
                if (prev["experience"] === true || trueCount >= 2) {
                    toast.error(
                        <div>
                            <strong>2 most important ones</strong>
                            <div>You can highlight only 2 the most important at a time.</div>
                        </div>
                    )
                    return prev;
                }

                return {
                    ...prev,
                    ["experience"]: true,
                };
            });
        } else if (index === '4') {
            // setImportantFlag({
            //     ...importantFlag,
            //     ["targethiredate"]: true
            // })
            setImportantFlag(prev => {
                const trueCount = Object.values(prev).filter(Boolean).length;

                // If already true or max reached, do nothing
                if (prev["targethiredate"] === true || trueCount >= 2) {
                    toast.error(
                        <div>
                            <strong>2 most important ones</strong>
                            <div>You can highlight only 2 the most important at a time.</div>
                        </div>
                    )
                    return prev;
                }

                return {
                    ...prev,
                    ["targethiredate"]: true,
                };
            });
        } else if (index === '5') {
            // setImportantFlag({
            //     ...importantFlag,
            //     ["language"]: true
            // })
            setImportantFlag(prev => {
                const trueCount = Object.values(prev).filter(Boolean).length;

                // If already true or max reached, do nothing
                if (prev["language"] === true || trueCount >= 2) {
                    toast.error(
                        <div>
                            <strong>2 most important ones</strong>
                            <div>You can highlight only 2 the most important at a time.</div>
                        </div>
                    )
                    return prev;
                }

                return {
                    ...prev,
                    ["language"]: true,
                };
            });
        } else if (index === '6') {
            // setImportantFlag({
            //     ...importantFlag,
            //     ["geography"]: true
            // })
            setImportantFlag(prev => {
                const trueCount = Object.values(prev).filter(Boolean).length;

                // If already true or max reached, do nothing
                if (prev["geography"] === true || trueCount >= 2) {
                    toast.error(
                        <div>
                            <strong>2 most important ones</strong>
                            <div>You can highlight only 2 the most important at a time.</div>
                        </div>
                    )
                    return prev;
                }

                return {
                    ...prev,
                    ["geography"]: true,
                };
            });
        }
    }
    const removeImportantFlag = (e, index) => {
        e.stopPropagation();
        if (index === '1') {
            setImportantFlag({
                ...importantFlag,
                ["salary"]: false
            })
        } else if (index === '2') {
            setImportantFlag({
                ...importantFlag,
                ["education"]: false
            })
        } else if (index === '3') {
            setImportantFlag({
                ...importantFlag,
                ["experience"]: false
            })
        } else if (index === '4') {
            setImportantFlag({
                ...importantFlag,
                ["targethiredate"]: false
            })
        } else if (index === '5') {
            setImportantFlag({
                ...importantFlag,
                ["language"]: false
            })
        } else if (index === '6') {
            setImportantFlag({
                ...importantFlag,
                ["geography"]: false
            })
        }
    }
    const handleOutline = () => {
        if (importantFlag.salary && openStep[0] === '1') {
            return (<img src={ActiveRedFlag} className="flag_icon" />)
        } else if (importantFlag.education && openStep[0] === '2') {
            return (<img src={ActiveRedFlag} className="flag_icon" />)
        } else if (importantFlag.experience && openStep[0] === '3') {
            return (<img src={ActiveRedFlag} className="flag_icon" />)
        } else if (importantFlag.targethiredate && openStep[0] === '4') {
            return (<img src={ActiveRedFlag} className="flag_icon" />)
        } else if (importantFlag.language && openStep[0] === '5') {
            return (<img src={ActiveRedFlag} className="flag_icon" />)
        } else if (importantFlag.geography && openStep[0] === '6') {
            return (<img src={ActiveRedFlag} className="flag_icon" />)
        } else {
            return (<img src={importantFlagOutline} className="flag_icon" />)
        }
    }
    const handleLightClass = () => {
        if (!importantFlag.salary && openStep[0] === '1') {
            return "active";
        } else if (!importantFlag.education && openStep[0] === '2') {
            return "active";
        } else if (!importantFlag.experience && openStep[0] === '3') {
            return "active";
        } else if (!importantFlag.targethiredate && openStep[0] === '4') {
            return "active";
        } else if (!importantFlag.language && openStep[0] === '5') {
            return "active";
        } else if (!importantFlag.geography && openStep[0] === '6') {
            return "active";
        } else {
            return "";
        }
    }

    const handleRefreshData = (e, index) => {
        e.stopPropagation();
        if (index == "1") {
            setUpdateFormData({
                ...updateFormData,
                ["salary_price_type"]: "Salary-range",
                ["min_salary"]: "",
                ["max_salary"]: "",
                ["currency"]: "INR",
                ["salary_type"]: "",
                ["display_salary"]: false,
                ["non_negotiable_salary"]: false
            })
        } else if (index == "2") {
            setUpdateFormData({
                ...updateFormData,
                ["minimum_education"]: "",
                ["higher_qualification_preferred"]: false,
                ["other_areas_acceptable"]: false
            })
            setBadges([])
        } else if (index == "3") {
            setUpdateFormData({
                ...updateFormData,
                ["year_of_experience_type"]: "",
                ["min_exp"]: "",
                ["max_exp"]: ""
            })
            setIsHideIndustries(false)
            setIsHideRestrictedRoles(false)
            setIndustriesBadge([])
            setRestrictedRoleBadges([])
        } else if (index == "4") {
            setUpdateFormData({
                ...updateFormData,
                ["targate_hire_date"]: "",
                ["explore_buy_out_option"]: ""
            })
            setIsDisabledTarget(false)
        } else if (index == "5") {
            setUpdateFormData({
                ...updateFormData,
                ["no_specific_language_require"]: false
            })
            setSpokenLanguageBadges([]);
            setrdnwBadges([])
        } else if (index == "6") {
            setUpdateFormData({
                ...updateFormData,
                ["no_specific_location"]: false,
                ["relocation_cost_covered"]: false
            })
            setLocationBadges([])
        } else if (index == "8") {
            const length = skillGroupData.length
            setDynamicArray(Array.from({ length }, () => []));
        } else if (index == "11") {
            const updatedArray = behaviours.map((item) => ({
                ...item,
                isSelected: false,
                markedImportant: false
            }))
            setBehaviours(updatedArray)
            setPersonalityData([])
        }
    }

    useEffect(() => {
        const length = skillGroupData.length
        setDynamicArray(Array.from({ length }, () => []));
    }, [skillGroupData.length]);
    const handleReferesh = () => {
        const updatedArray = behaviours.map((item) => ({
            ...item,
            isSelected: false,
            markedImportant: false
        }))
        setBehaviours(updatedArray)
        setPersonalityData([])
    }
    const handledisableOrNot = () => {
        let isError = false;
        if (!badges?.length) {
            isError = true;
        } else if (!IndustriesBadges?.length) {
            isError = true;
        } else if (!restrictedRoleBadges?.length) {
            isError = true;
        } else if (!spokenLanguageBadges.length) {
            isError = true;
        } else if (!rdnwBadges.length) {
            isError = true;
        } else if (!locationBadges.length) {
            isError = true;
        } else if (!SelectSkillsData.length) {
            isError = true;
        } else if (!mustHaveSkills.length) {
            isError = true;
        } else if (!updateFormData.max_salary) {
            isError = true;
        } else if (!updateFormData.min_salary) {
            isError = true
        } else if (!updateFormData.minimum_education) {
            isError = true
        } else if (!updateFormData.min_exp) {
            isError = true
        } else if (!updateFormData.max_exp) {
            isError = true
        } else if (!updateFormData.targate_hire_date) {
            isError = true
        } else if (!updateFormData.minimum_education) {
            isError = true
        } else if (!hasSelectedAndImportant) {
            isError = true
        }
        return isError;
    }
    useEffect(() => {
        let array = []
        if (updateFormData.max_salary && updateFormData.min_salary) {
            // setCalculatedRecommend([...calculateRecommend,"salary"])
            array.push('salary')
        } else if (!updateFormData.max_salary || !updateFormData.min_salary) {
            array.filter((item) => item != "salary");
        }
        if (updateFormData.minimum_education && badges?.length) {
            array.push("education")
        } else if (!updateFormData.minimum_education || !badges?.length) {
            array.filter((item) => item != "education");
        }
        if (updateFormData.min_exp && updateFormData.max_exp) {
            array.push('exp')
        } else if (!updateFormData.min_exp || !updateFormData.max_exp) {
            array.filter((item) => item != "exp");
        }
        if (IndustriesBadges?.length && restrictedRoleBadges?.length) {
            array.push('exp1')
        } else if (!IndustriesBadges?.length || !restrictedRoleBadges?.length) {
            array.filter((item) => item != "exp1");
        }
        if (updateFormData.targate_hire_date) {
            array.push('target')
        } else if (!updateFormData.targate_hire_date) {
            array.filter((item) => item != "target");
        }
        if (spokenLanguageBadges.length && rdnwBadges.length) {
            array.push('language')
        } else if (!spokenLanguageBadges.length || !rdnwBadges.length) {
            array.filter((item) => item != "language");
        }
        if (locationBadges.length) {
            array.push('location')
        } else if (!locationBadges.length) {
            array.filter((item) => item != "location");
        }
        if (SelectSkillsData.length && mustHaveSkills.length) {
            array.push('skills')
        } else if (!SelectSkillsData.length || !mustHaveSkills.length) {
            array.filter((item) => item != "skills");
        }
        if (hasSelectedAndImportant) {
            array.push('behaviour')
        } else if (!hasSelectedAndImportant) {
            array.filter((item) => item != "behaviour");
        }
        setCalculatedRecommend(array)
    }, [updateFormData, badges, IndustriesBadges, restrictedRoleBadges, spokenLanguageBadges, rdnwBadges, locationBadges, SelectSkillsData, mustHaveSkills, hasSelectedAndImportant])
    const handleNext = (e) => {
        const nextStep = (parseInt(currentStep) + 1).toString();
        if (parseInt(currentStep) < 11) {
            if (Array.isArray(currentStep) && nextStep == "1") {
                setCurrentStep("2")
                setOpenStep(["2"])
            } else if (currentStep == "6") {
                setCurrentStep(["7", "8"])
                setOpenStep(["8"])
                setExpandCollapse([2, 3])
            } else if (Array.isArray(currentStep) && nextStep == "8") {
                setCurrentStep("9")
                setActiveKeyAdd(true);
                // setActiveKey("9");
                setOpenStep(["9"])
                handleAddComponent(e);
            } else if (currentStep == "9") {
                setActiveKeyAdd(false);
                // setActiveKey(null);
                setCurrentStep(["10", "11"])
                setExpandCollapse([3])
                setOpenStep(["11"])
            } else {
                setCurrentStep(nextStep);
                setOpenStep([nextStep])
            }
            // custom question open extra
            // if (parseInt(currentStep) == 8) {
            //     setActiveKeyAdd(true);
            //     setActiveKey("9");
            //     handleAddComponent(e);
            // } else if (parseInt(currentStep) == 9) {
            //     setActiveKeyAdd(false);
            //     setActiveKey(null);
            //     // handleAddComponent(e);
            // }
        }
    };
    useEffect(() => {
        if (Array.isArray(currentStep)) {
            setToolbarPosition(307)
        }
    }, [])
    const handleClosecomboEdu = (e) => {
        const { name } = e.target;
        areaEduRef.current.value = "";
        setTimeout(() => {
            setAreaEducationOption([])
        }, 200); // delay to allow click on list items
    };
    const handleClosecomboIndustry = (e) => {
        const { name } = e.target;
        industriesRef.current.value = "";
        setTimeout(() => {
            setShorlistedIndustries([])
        }, 200); // delay to allow click on list items        
    }
    const handleClosecomboRole = (e) => {
        const { name } = e.target;
        roleRef.current.value = "";
        setTimeout(() => {
            setRestrictedRole([])
        }, 200); // delay to allow click on list items
    }
    const handleClosecomboLang = (e, key) => {
        const { name } = e.target;
        if (key == "spoken") {
            spokenRef.current.value = '';
        } else {
            writtenRef.current.value = '';
        }
        setTimeout(() => {
            setSpokenLanguage([])
            setWittenLanguage([])
        }, 200); // delay to allow click on list items
    };
    const handleCloseComboLocation = (e) => {
        const { name } = e.target;
        locationRef.current.value = "";
        setTimeout(() => {
            setLocationList([])
        }, 200); // delay to allow click on list items        
    }
    const formatNumber = (num) => {
        // Remove all non-digit characters
        const cleaned = num.replace(/\D/g, "");
        if (!cleaned) return "";
        return new Intl.NumberFormat("en-US").format(Number(cleaned));
    };
    // console.log(behaviours)

    // console.log('add skill box', addSkillGroup)
    // console.log("customValue,addSubSkill", skillGroupData, SelectSkillsData)
    // console.log(skillGroupData, "group_skills")
    // console.log('======>selecting skills', SelectSkillsData)
    // // console.log("openStep", importantFlag)
    // console.log('must have', mustHaveSkills)
    // console.log(components.length)
    // console.log(IndustriesBadges)
    // console.log('neetu', createRevisedJobData)
    console.log('==========>update======>', updateFormData)
    // console.log('=========>', dynamicArray)
    console.log('dada ji', currentStep, openStep[0])
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="lg"
                backdrop={false}
                className="cmprofile_mdl quizDev_model"
            >
                <Modal.Header closeButton>
                    <img src={logoIcon} className="me-4" />
                    {/* {createRevisedJobData.map((item) => ( */}
                    <Modal.Title>
                        {createRevisedJobData?.job_title}
                        <span className="subtitle">
                            {createRevisedJobData?.job_location?.location_name},{" "}
                            {createRevisedJobData?.department?.department_name},{" "}
                            {createRevisedJobData?.job_type},{" "}
                            {createRevisedJobData?.workplace_type}
                        </span>
                        <button type="button" className="edit-btnicon">
                            <img src={Edit03} />
                        </button>
                    </Modal.Title>
                    {/* ))} */}

                    <button type="button" className="view-btnicon">
                        <i className="fa fa-eye"></i>
                    </button>
                </Modal.Header>
                <Modal.Body className="p-0 bg-lightgray">
                    <Row className="justify-content-center">
                        <Col md={3} lg={2} className="jobpre_leftpanel px-2">
                            <h6>Requirements</h6>
                            <ul className="checklist">
                                <li className={`${setClassForSalary()}`}
                                    onClick={() => {
                                        setCurrentStep(["0", "1"])
                                        handleOpenStep("1")
                                        setExpandCollapse([1, 2, 3])
                                    }}
                                >
                                    <Link href={""}>
                                        Salary <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                                <li className={`${badges?.length > 0 && updateFormData?.minimum_education ? "active" : ''}`}
                                    onClick={() => {
                                        setCurrentStep("2")
                                        handleOpenStep("2")
                                        setExpandCollapse([1, 2, 3])
                                    }}
                                >
                                    <Link href={""}>
                                        Education <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                                <li className={`${setClassName()}`}
                                    onClick={() => {
                                        setCurrentStep("3")
                                        handleOpenStep("3")
                                        setExpandCollapse([1, 2, 3])
                                    }}
                                >
                                    <Link href={""}>
                                        Experience <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                                <li className={`${updateFormData?.targate_hire_date && 'active'}`}
                                    onClick={() => {
                                        setCurrentStep("4")
                                        handleOpenStep("4")
                                        setExpandCollapse([1, 2, 3])
                                    }}
                                >
                                    <Link href={""}>
                                        Target Hire Date{" "}
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                                <li className={`${spokenLanguageBadges?.length > 0 && rdnwBadges?.length > 0 ? 'active' : ''}`}
                                    onClick={() => {
                                        setCurrentStep("5")
                                        handleOpenStep("5")
                                        setExpandCollapse([1, 2, 3])
                                    }}
                                >
                                    <Link href={""}>
                                        Language <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                                <li className={`${locationBadges?.length > 0 ? 'active' : ''}`}
                                    onClick={() => {
                                        setCurrentStep("6")
                                        handleOpenStep("6")
                                        setExpandCollapse([1, 2, 3])
                                    }}
                                >
                                    <Link href={""}>
                                        Geography <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                            </ul>
                            <h6>Skills</h6>
                            <ul className="checklist">
                                <li className={`${SelectSkillsData?.length > 0 && 'active'}`}
                                    onClick={() => {
                                        setCurrentStep(["7", "8"])
                                        handleOpenStep("8")
                                        setExpandCollapse([2, 3])
                                    }}
                                >
                                    <Link href={""}>
                                        Skills <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                                <li className={`${cusQuestion()}`}
                                    onClick={() => {
                                        setCurrentStep("9")
                                        handleOpenStep("9")
                                        setExpandCollapse([2, 3])
                                    }}
                                >
                                    <Link href={""}>
                                        Custom Questions{" "}
                                        <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                            </ul>
                            <h6>Personality</h6>
                            <ul className="checklist">
                                <li className={`${behaviours.length == 12 && 'active'}`}
                                    onClick={() => {
                                        setCurrentStep(["10", "11"])
                                        handleOpenStep("11")
                                        setExpandCollapse([3])
                                    }}
                                >
                                    <Link href={""}>
                                        Behaviours <i class="fa fa-check" aria-hidden="true"></i>
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col md={7} lg={8} className="jobMain_panel">
                            <Accordion
                                defaultActiveKey={["0", "8", "7", "10"]}
                                activeKey={currentStep} onSelect={(key) => setCurrentStep(key)}>
                                {expandCollapse.includes(1) && (
                                    <>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header className="bg-lightblue" onClick={() => setOpenStep([])}>Requirements</Accordion.Header>
                                            {currentStep !== "0" && (<p className="short_text">Define your ideal hire in detail here. Use flags to indicate the importance as needed. All fields are mandatory</p>)}
                                            <Accordion.Body>
                                                <p>
                                                    Use this section to define your ideal hire in more detail.
                                                    All the information required in this section is mandatory.
                                                    The information from this section will play an essential
                                                    role in scoring and screening candidates based on their
                                                    profile.
                                                </p>
                                                <p>
                                                    If there is any one parameter that is very important [Yellow
                                                    Flag] or a must have [Red Flag], use the flags to indicate
                                                    the same. This information will allow us to rate each
                                                    application as below.
                                                </p>
                                                <ul className="applicant_info">
                                                    <li>
                                                        <h6>Applicant Name</h6>
                                                        <strong>Match</strong>
                                                    </li>
                                                    <li>
                                                        <p>James Winslow</p>
                                                        <Badge bg="success">Good 85%</Badge>
                                                    </li>
                                                    <li>
                                                        <p>Rajesh Sundaran</p>
                                                        <Badge bg="danger">Poor 23%</Badge>
                                                    </li>
                                                    <li>
                                                        <p>Abhilasha Choudhary</p>
                                                        <Badge bg="warning">Average 49%</Badge>
                                                    </li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item
                                            eventKey="1"
                                            className="accd_child"
                                            id="item_salary"
                                        >
                                            <Accordion.Header onClick={() => handleOpenStep("1")}>
                                                <span>Salary
                                                    {!openStep.includes("1") && <small className="text-muted"><i>Don’t Display</i><i>Non Negotiable</i></small>}
                                                </span>
                                                {/* <svg
                                            className="flag_icon"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill={importantFlag.salary?"#f97066":'none'}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                                                stroke="#98A2B3"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg> */}
                                                {importantFlag.salary ? (
                                                    <img src={flagFill} className="flag_icon" onClick={(e) => removeImportantFlag(e, '1')} />
                                                ) : (
                                                    <img src={simpleFlag} className="flag_icon" onClick={(e) => handleImportantFlag(e, '1')} />
                                                )}
                                                {!openStep.includes("1") && (
                                                    <span className="acheade_right">{updateFormData?.currency} {updateFormData?.min_salary} - {updateFormData?.max_salary} {updateFormData?.salary_type}</span>
                                                )}
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['1'] = el)}>
                                                <Row className="align-items-center mb-3">
                                                    <div className="form-group w-auto mb-0">
                                                        <Form.Select
                                                            name="salary_price_type"
                                                            aria-label="Default select example"
                                                            value={updateFormData?.salary_price_type}
                                                            onChange={(e) => {
                                                                handleFormData(e);
                                                                setPriceRangeType(e.target.value);
                                                            }}
                                                            className="sm-fselect"
                                                        >
                                                            <option selected value="Salary-range">
                                                                Salary Range
                                                            </option>
                                                            <option value="Min-salary">Min. Salary</option>
                                                            <option value="Max-salary">Max. Salary</option>
                                                        </Form.Select>
                                                    </div>
                                                    {(priceRangeType === "Salary-range" ||
                                                        priceRangeType === "Min-salary") && (
                                                            <div className="form-group w-150 mb-0">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="min_salary"
                                                                    placeholder="Min."
                                                                    className="sm-fcontrol"
                                                                    value={formatNumber(updateFormData?.min_salary)}
                                                                    onChange={handleFormData}
                                                                />
                                                            </div>
                                                        )}

                                                    {priceRangeType === "Salary-range" && (
                                                        <div className="form-group w-auto mb-0 px-0">
                                                            <span>to</span>
                                                        </div>
                                                    )}

                                                    {(priceRangeType === "Salary-range" ||
                                                        priceRangeType === "Max-salary") && (
                                                            <div className="form-group w-150 mb-0">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="max_salary"
                                                                    placeholder="Max."
                                                                    className="sm-fcontrol"
                                                                    value={formatNumber(updateFormData?.max_salary)}
                                                                    onChange={handleFormData}
                                                                />
                                                            </div>
                                                        )}
                                                    <div className="form-group w-auto mb-0 pe-1">
                                                        <Form.Select
                                                            name="currency"
                                                            aria-label="Default select example"
                                                            className="sm-fselect"
                                                            onChange={handleFormData}
                                                            value={updateFormData?.currency}
                                                        >
                                                            <option selected value="INR">
                                                                INR
                                                            </option>
                                                        </Form.Select>
                                                    </div>
                                                    <div className="form-group w-auto mb-0 ps-1">
                                                        <Form.Select
                                                            name="salary_type"
                                                            aria-label="Default select example"
                                                            className="sm-fselect"
                                                            onChange={handleFormData}
                                                            value={updateFormData?.salary_type}
                                                        >
                                                            <option value="" disabled hidden>Select..</option>
                                                            <option value="Per-Month">Per Month</option>
                                                            <option value="Per-Annum">Per Anmum</option>
                                                        </Form.Select>
                                                    </div>
                                                </Row>
                                                <div className="accordion_footer">
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`inline-${type}`} className="me-3">
                                                                <Form.Check
                                                                    inline
                                                                    onChange={handleFormData}
                                                                    label="Don’t Display"
                                                                    name="display_salary"
                                                                    type={type}
                                                                    id={`inline-${type}-1`}
                                                                    checked={updateFormData?.display_salary}
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    onChange={handleFormData}
                                                                    label="Non Negotiable"
                                                                    name="non_negotiable_salary"
                                                                    type={type}
                                                                    id={`inline-${type}-2`}
                                                                    checked={updateFormData?.non_negotiable_salary}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                    <button
                                                        // onClick={handleCreateForm}
                                                        type="button"
                                                        class="btn btn-lightgray"
                                                        onClick={handleNext}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2" className="accd_child" id="item_edu">
                                            <Accordion.Header onClick={() => handleOpenStep("2")}>
                                                <span>Educational qualification
                                                    {!openStep.includes('2') && <small className="text-muted"><i>Higher Qualification Preferrable</i><i>Other Areas are Acceptable</i></small>}
                                                </span>
                                                {importantFlag.education ? (
                                                    <img src={flagFill} className="flag_icon" onClick={(e) => removeImportantFlag(e, '2')} />
                                                ) : (
                                                    <img src={simpleFlag} className="flag_icon" onClick={(e) => handleImportantFlag(e, '2')} />
                                                )}
                                                {!openStep.includes('2') && (
                                                    <span className="acheade_right">{updateFormData?.minimum_education},{badges?.map((cv) => (<>{cv?.qualification_name}</>))}</span>
                                                )}
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['2'] = el)}>
                                                <Form>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="sm-label">
                                                            Minimum Education
                                                        </Form.Label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            className="sm-fselect"
                                                            name="minimum_education"
                                                            value={updateFormData?.minimum_education}
                                                            onChange={(e) => {
                                                                setMinEdu(e.target.value);
                                                                handleFormData(e);
                                                            }}
                                                        >
                                                            <option value="" disabled hidden>Select...</option>
                                                            {/* <option value="High school">High school</option>
                                                    <option value="Bachelors Degree">
                                                        Bachelors Degree
                                                    </option>
                                                    <option value="Master Degree">Master Degree</option>
                                                    <option value="Diploma ">Diploma </option>
                                                    <option value="PG Diploma">PG Diploma</option>
                                                    <option value="PhD">PhD</option>
                                                    <option value="Post Doctorate">Post Doctorate</option> */}
                                                            <option value="Below Secondary Education">Below Secondary Education</option>
                                                            <option value="Upper Secondary (Intermediate, High School, Grade 12)">Upper Secondary (Intermediate, High School, Grade 12)</option>
                                                            <option value="Certification  / Vocational / Technical Training">Certification  / Vocational / Technical Training</option>
                                                            <option value="Diploma / Associate Degree">Diploma / Associate Degree</option>
                                                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                                                            <option value="Master's Degree">Master's Degree</option>
                                                            <option value="Professional Degree (e.g., MD, JD)">Professional Degree (e.g., MD, JD)</option>
                                                            <option value="Doctoral Degree (Ph.D., Ed.D.)">Doctoral Degree (Ph.D., Ed.D.)</option>
                                                            <option value="Postdoctoral Research">Postdoctoral Research</option>
                                                        </Form.Select>
                                                        <span className="required_text">
                                                            Select the minimum level of education that you would
                                                            require
                                                        </span>
                                                    </Form.Group>
                                                    {/* <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                            >
                                                <Form.Label className="sm-label">
                                                    Areas of Education
                                                </Form.Label>
                                                <div className="tagarea p-2">
                                                    {badges.map((badge, index) => (
                                                        <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                            {badge?.qualification_name}
                                                            <button
                                                                className="btn close_tag"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleRemoveBadge(index)}
                                                            >
                                                                <i className="fa fa-close ms-1"></i>
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                    <Form.Control
                                                        type="text"
                                                        className="inline-input"
                                                        placeholder="Enter text"
                                                        onChange={(e) => {
                                                            setInputValue(e?.target?.value);
                                                        }}
                                                        onKeyDown={handleKeyPress}
                                                    />
                                                </div>
                                                <span className="required_text">
                                                    Select all relevant areas of education
                                                </span>
                                            </Form.Group> */}
                                                    {/* <-------------------> */}
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="exampleForm.ControlTextarea1"
                                                    >
                                                        <Form.Label className="sm-label">
                                                            Areas of Education
                                                        </Form.Label>
                                                        <div className="tagarea p-2 position-relative">
                                                            {badges?.map((badge, index) => (
                                                                <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                    {badge?.qualification_name}
                                                                    <button
                                                                        className="btn close_tag"
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => handleRemoveBadge(index)}
                                                                    >
                                                                        <i className="fa fa-close ms-1"></i>
                                                                    </button>
                                                                </Badge>
                                                            ))}
                                                            <div className="inline-dropdown-container position-relative d-inline-block">
                                                                <Form.Control
                                                                    type="text"
                                                                    className="inline-input"
                                                                    placeholder="Enter text"
                                                                    ref={areaEduRef}
                                                                    // value={row.areaOfEducation}
                                                                    // disabled={row.saved}
                                                                    onChange={handleAreaOfEducation}
                                                                    onBlur={handleClosecomboEdu} // Close dropdown on blur
                                                                />
                                                                {aresEducationOption?.length > 0 ? (
                                                                    <Dropdown show={true} >
                                                                        <Dropdown.Menu className="w-100 dropdown_ctm">
                                                                            <div class={`${aresEducationOption.length ? 'droplistmulti' : ''}`}>
                                                                                {aresEducationOption.map((option, idx) => (
                                                                                    <Dropdown.Item
                                                                                        key={idx}
                                                                                        onClick={(e) =>
                                                                                            handleSelectAreaEducation(option)
                                                                                        }
                                                                                    >
                                                                                        {option?.qualification_name}
                                                                                    </Dropdown.Item>
                                                                                ))}
                                                                            </div>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                ) : ('')}
                                                            </div>
                                                        </div>
                                                    </Form.Group>
                                                </Form>
                                                <div className="accordion_footer">
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`inline-${type}`} className="me-3">
                                                                <Form.Check
                                                                    inline
                                                                    label="Higher Qualification Preferrable"
                                                                    name="higher_qualification_preferred"
                                                                    onChange={handleFormData}
                                                                    type={type}
                                                                    id={`inline-${type}-1`}
                                                                    checked={updateFormData?.higher_qualification_preferred}
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    label="Other Areas are Acceptable"
                                                                    name="other_areas_acceptable"
                                                                    onChange={handleFormData}
                                                                    type={type}
                                                                    id={`inline-${type}-2`}
                                                                    checked={updateFormData?.other_areas_acceptable}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                    <button
                                                        type="button"
                                                        // onClick={handleCreateForm}
                                                        onClick={handleNext}
                                                        class="btn btn-lightgray"
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3" className="accd_child" id="item_Exp">
                                            <Accordion.Header onClick={() => handleOpenStep("3")}>
                                                {/* Experience{" "} */}
                                                <span>Experience
                                                    {!openStep.includes('3') && <small className="text-muted"><i>Restrict Industries</i><i>Define Current Role</i></small>}
                                                </span>
                                                {importantFlag.experience ? (
                                                    <img src={flagFill} className="flag_icon" onClick={(e) => removeImportantFlag(e, '3')} />
                                                ) : (
                                                    <img src={simpleFlag} className="flag_icon" onClick={(e) => handleImportantFlag(e, '3')} />
                                                )}
                                                {!openStep.includes('3') && (
                                                    <span className="acheade_right">
                                                        {updateFormData?.min_exp} - {updateFormData?.max_exp} Years in {IndustriesBadges?.map((cv) => (<>{cv?.industry_name}</>))}
                                                    </span>
                                                )}
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['3'] = el)}>
                                                <Form>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className="sm-label">
                                                            Ideal Years of Experience
                                                        </Form.Label>

                                                        <Row className="gap-2 align-items-center mx-0">
                                                            <Form.Select
                                                                name="year_of_experience_type"
                                                                onChange={(e) => {
                                                                    handleFormData(e);
                                                                    setExpRangeTpe(e.target.value);
                                                                }}
                                                                value={updateFormData?.year_of_experience_type}
                                                                aria-label="Default select example"
                                                                className="sm-fselect w-150"
                                                            >
                                                                <option value="Range">Range</option>

                                                                <option value="Min">Min</option>

                                                                <option value="Max">Max</option>
                                                            </Form.Select>

                                                            {(expRangeType === "Range" ||
                                                                expRangeType === "Min") && (
                                                                    <Form.Control
                                                                        type="text"
                                                                        className="sm-fcontrol w-150"
                                                                        name="min"
                                                                        onChange={(e) => {
                                                                            // handleFormData(e);
                                                                            handleMinInputChange(e);
                                                                        }}
                                                                        value={range.min}
                                                                        placeholder="Min."
                                                                    />
                                                                )}
                                                            {expRangeType === "Range" && (
                                                                <span className="w-auto to_divider">to</span>
                                                            )}
                                                            {(expRangeType === "Range" ||
                                                                expRangeType === "Max") && (
                                                                    <Form.Control
                                                                        type={maxValue > 40 ? "text" : "number"}
                                                                        max={50}
                                                                        className="sm-fcontrol w-150"
                                                                        placeholder="Max."
                                                                        value={range.max}
                                                                        name="max"
                                                                        onChange={(e) => {
                                                                            // handleFormData(e);
                                                                            handleMaxInputChange(e);
                                                                        }}
                                                                    />
                                                                )}
                                                            {/* <RangeSlider
                                                        minValue={minValue}
                                                        setMinValue={setMinValue}
                                                        displayMaxValue={displayMaxValue}
                                                        maxValue={maxValue}
                                                        setMaxValue={setMaxValue}
                                                    /> */}
                                                            <RangeSliderNew
                                                                range={range}
                                                                setRange={setRange}
                                                                minExp={minValue}
                                                                setMinExp={setMinValue}
                                                                displayMaxValue={displayMaxValue}
                                                                maxExp={maxValue}
                                                                setMaxExp={setMaxValue}
                                                            />
                                                        </Row>
                                                    </Form.Group>

                                                    {ishideIndustries && (
                                                        <Form.Group
                                                            className="mb-3"
                                                            controlId="exampleForm.ControlTextarea1"
                                                        >
                                                            <Form.Label className="sm-label">
                                                                Mention Shorlisted Industries
                                                            </Form.Label>

                                                            {/* <div className="tagarea p-2">
                                                        {IndustriesBadges.map((badge, index) => (
                                                            <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                {badge?.industry_name}

                                                                <button
                                                                    className="btn close_tag"
                                                                    onClick={() =>
                                                                        handleRemoveIndustriesBadge(index)
                                                                    }
                                                                >
                                                                    <i className="fa fa-close ms-1"></i>
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                        <Form.Control
                                                            type="text"
                                                            className="inline-input"
                                                            placeholder="Enter text"
                                                            onChange={(e) => {
                                                                setInputValue(e?.target?.value);
                                                            }}
                                                            onKeyDown={handleKeyPressForIndustries}
                                                        />
                                                    </div> */}
                                                            <div className="tagarea p-2 position-relative">
                                                                {IndustriesBadges?.map((badge, index) => (
                                                                    <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                        {badge?.industry_name}
                                                                        <button
                                                                            className="btn close_tag"
                                                                            style={{ cursor: "pointer" }}
                                                                            onClick={() => handleRemoveIndustriesBadge(index)}
                                                                        >
                                                                            <i className="fa fa-close ms-1"></i>
                                                                        </button>
                                                                    </Badge>
                                                                ))}
                                                                <div className="inline-dropdown-container position-relative d-inline-block">
                                                                    <Form.Control
                                                                        type="text"
                                                                        className="inline-input"
                                                                        placeholder="Enter text"
                                                                        ref={industriesRef}
                                                                        // value={row.areaOfEducation}
                                                                        // disabled={row.saved}
                                                                        onChange={handlesShorlistedIndustries}
                                                                        onBlur={handleClosecomboIndustry}
                                                                    />
                                                                    {shorlistedIndustries?.length > 0 ? (
                                                                        <Dropdown show={true} >
                                                                            <Dropdown.Menu className="w-100 dropdown_ctm">
                                                                                <div class={`${shorlistedIndustries.length ? 'droplistmulti' : ''}`}>
                                                                                    {shorlistedIndustries.map((option, idx) => (
                                                                                        <Dropdown.Item
                                                                                            key={idx}
                                                                                            onClick={(e) =>
                                                                                                handleSelectShortlistIndustries(option)
                                                                                            }
                                                                                        >
                                                                                            {option?.industry_name}
                                                                                        </Dropdown.Item>
                                                                                    ))}
                                                                                </div>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    ) : ('')}
                                                                </div>
                                                            </div>
                                                            <span className="required_text">
                                                                Add a comprehensive list as this can significantly
                                                                impact applicant shortlisting
                                                            </span>
                                                        </Form.Group>
                                                    )}

                                                    {isHideRestrictedRoles && (
                                                        <Form.Group
                                                            className="mb-3"
                                                            controlId="exampleForm.ControlTextarea1"
                                                        >
                                                            <Form.Label className="sm-label">
                                                                Restrict Roles
                                                            </Form.Label>

                                                            {/* <div className="tagarea p-2">
                                                        {restrictedRoleBadges.map((badge, index) => (
                                                            <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                {badge?.is_like_name}

                                                                <button
                                                                    className="btn close_tag"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => handleRemoveRoleBadge(index)}
                                                                >
                                                                    <i className="fa fa-close ms-1"></i>
                                                                </button>
                                                            </Badge>
                                                        ))}

                                                        <Form.Control
                                                            type="text"
                                                            className="inline-input"
                                                            placeholder="Enter text"
                                                            onChange={(e) => {
                                                                setInputValue(e?.target?.value);
                                                                handleLike(e);
                                                            }}
                                                        />
                                                        {isLikeDropdown && isLikeData.length > 0 && (
                                                            <div className="ctm_dropdown ct_scrollbar">
                                                                <ul>
                                                                    {isLikeData.map((item) => (
                                                                        <li
                                                                            key={item.is_like_name}
                                                                            onClick={() =>
                                                                                handleSelectedLikeItems(item)
                                                                            }
                                                                        >
                                                                            {item.is_like_name}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div> */}
                                                            <div className="tagarea p-2 position-relative">
                                                                {restrictedRoleBadges?.map((badge, index) => (
                                                                    <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                        {badge?.is_like_name}
                                                                        <button
                                                                            className="btn close_tag"
                                                                            style={{ cursor: "pointer" }}
                                                                            onClick={() => handleRemoveRoleBadge(index)}
                                                                        >
                                                                            <i className="fa fa-close ms-1"></i>
                                                                        </button>
                                                                    </Badge>
                                                                ))}
                                                                <div className="inline-dropdown-container position-relative d-inline-block">
                                                                    <Form.Control
                                                                        type="text"
                                                                        className="inline-input"
                                                                        placeholder="Enter text"
                                                                        ref={roleRef}
                                                                        // value={row.areaOfEducation}
                                                                        // disabled={row.saved}
                                                                        onChange={isLikeHandleRole}
                                                                        onBlur={handleClosecomboRole}
                                                                    />
                                                                    {restrictedRole?.length > 0 ? (
                                                                        <Dropdown show={true} >
                                                                            <Dropdown.Menu className="w-100 dropdown_ctm">
                                                                                <div class={`${restrictedRole.length ? 'droplistmulti' : ''}`}>
                                                                                    {restrictedRole.map((option, idx) => (
                                                                                        <Dropdown.Item
                                                                                            key={idx}
                                                                                            onClick={(e) =>
                                                                                                handleSelectRestrictedRole(option)
                                                                                            }
                                                                                        >
                                                                                            {option?.is_like_name}
                                                                                        </Dropdown.Item>
                                                                                    ))}
                                                                                </div>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    ) : ('')}
                                                                </div>
                                                            </div>

                                                            <span className="required_text">
                                                                Please add multiple versions of the role and multiple
                                                                roles that can ensure you do not exclude any deserving
                                                                applicants
                                                            </span>
                                                        </Form.Group>
                                                    )}
                                                </Form>

                                                <div className="accordion_footer">
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`inline-${type}`} className="me-3">
                                                                <Form.Check
                                                                    inline
                                                                    label="Restrict Industries"
                                                                    name="restricted_industries"
                                                                    type={type}
                                                                    onChange={(e) => {
                                                                        handleFormData(e);
                                                                        setIsHideIndustries(!ishideIndustries);
                                                                    }}
                                                                    checked={ishideIndustries ? true : false}
                                                                    id={`inline-${type}-1`}
                                                                />

                                                                <Form.Check
                                                                    inline
                                                                    label="Define Current Role"
                                                                    name="define_current_role"
                                                                    type={type}
                                                                    onChange={(e) => {
                                                                        handleFormData(e);
                                                                        setIsHideRestrictedRoles(!isHideRestrictedRoles);
                                                                    }}
                                                                    checked={isHideRestrictedRoles ? true : false}
                                                                    id={`inline-${type}-2`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Form>

                                                    <button
                                                        type="button"
                                                        // onClick={handleCreateForm}
                                                        class="btn btn-lightgray"
                                                        onClick={handleNext}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item
                                            eventKey="4"
                                            className="accd_child"
                                            id="item_Target"
                                        >
                                            <Accordion.Header onClick={() => handleOpenStep("4")}>
                                                {/* Target Hire Date{" "} */}
                                                <span>Target Hire Date
                                                    {!openStep.includes('4') && <small className="text-muted"><i>Explore Buy-Out Option</i></small>}
                                                </span>
                                                {importantFlag.targethiredate ? (
                                                    <img src={flagFill} className="flag_icon" onClick={(e) => removeImportantFlag(e, '4')} />
                                                ) : (
                                                    <img src={simpleFlag} className="flag_icon" onClick={(e) => handleImportantFlag(e, '4')} />
                                                )}
                                                {!openStep.includes('4') && (
                                                    <span className="acheade_right">
                                                        {updateFormData?.immediate_hiring ? 'Immediate Hiring' : `Targate Hire Date  ${updateFormData?.targate_hire_date}`}
                                                    </span>
                                                )}
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['4'] = el)}>
                                                <Row className="align-items-center">
                                                    <Form.Group
                                                        className="mb-3 col-md-4"
                                                        controlId="exampleForm.ControlInput1"
                                                    >
                                                        <Form.Control
                                                            name="targate_hire_date"
                                                            // disabled={isDisabledTarget ? true : false}
                                                            onChange={handleFormData}
                                                            type="date"
                                                            className="sm-fcontrol"
                                                            value={updateFormData?.targate_hire_date}
                                                            placeholder="DD/MM/YYYY"
                                                            min={new Date().toISOString().split("T")[0]}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                                <div className="accordion_footer">
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`inline-${type}`} className="me-3">
                                                                <Form.Check
                                                                    inline
                                                                    label="Immediate Hiring"
                                                                    name="immediate_hiring"
                                                                    onChange={(e) => {
                                                                        handleFormData(e);
                                                                        setIsDisabledTarget(!isDisabledTarget);
                                                                    }}
                                                                    type={type}
                                                                    checked={isDisabledTarget ? true : false}
                                                                    id={`inline-${type}-1`}
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    label="Explore Buy-Out Option"
                                                                    onChange={handleFormData}
                                                                    name="explore_buy_out_option"
                                                                    type={type}
                                                                    id={`inline-${type}-2`}
                                                                    checked={updateFormData?.explore_buy_out_option}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                    <button
                                                        type="button"
                                                        // onClick={handleCreateForm}
                                                        class="btn btn-lightgray"
                                                        onClick={handleNext}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item
                                            eventKey="5"
                                            className="accd_child"
                                            id="item_lang"
                                        >
                                            <Accordion.Header onClick={() => handleOpenStep("5")}>
                                                Language{" "}
                                                {importantFlag.language ? (
                                                    <img src={flagFill} className="flag_icon" onClick={(e) => removeImportantFlag(e, '5')} />
                                                ) : (
                                                    <img src={simpleFlag} className="flag_icon" onClick={(e) => handleImportantFlag(e, '5')} />
                                                )}
                                                {!openStep.includes('5') && (
                                                    <span className="acheade_right">
                                                        <img src={messageIcon} />&nbsp;&nbsp;
                                                        {spokenLanguageBadges?.map((cv, index) => (
                                                            <>{cv?.language_name}{index !== spokenLanguageBadges.length - 1 && ", "}</>
                                                        ))}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <img src={pencilIcon} />&nbsp;&nbsp;
                                                        {rdnwBadges?.map((cv, index) => (
                                                            <>{cv?.language_name}{index !== rdnwBadges.length - 1 && ", "}</>
                                                        ))}
                                                    </span>
                                                )}
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['5'] = el)}>
                                                {isSpecificLanguareRequired && (
                                                    <Form className="row">
                                                        <Form.Group
                                                            className="mb-3 col-md-6"
                                                            controlId="exampleForm.ControlTextarea1"
                                                        >
                                                            <Form.Label className="sm-label">
                                                                Spoken Language
                                                            </Form.Label>
                                                            {/* <div className="tagarea p-2">
                                                        {spokenLanguageBadges.map((badge, index) => (
                                                            <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                {badge?.language_name}
                                                                <button
                                                                    className="btn close_tag"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() =>
                                                                        handleRemoveSpokenLanguageBadge(index)
                                                                    }
                                                                >
                                                                    <i className="fa fa-close ms-1"></i>
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                        <Form.Control
                                                            type="text"
                                                            className="inline-input"
                                                            placeholder="Enter text"
                                                            onChange={(e) => {
                                                                setInputValue(e?.target?.value);
                                                            }}
                                                            onKeyDown={(e) => {
                                                                handleKeyPressForlanguages(e, "spoken");
                                                            }}
                                                        />
                                                    </div> */}
                                                            <div className="tagarea p-2 position-relative">
                                                                {spokenLanguageBadges?.map((badge, index) => (
                                                                    <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                        {badge?.language_name}
                                                                        <button
                                                                            className="btn close_tag"
                                                                            style={{ cursor: "pointer" }}
                                                                            onClick={() =>
                                                                                handleRemoveSpokenLanguageBadge(index)
                                                                            }
                                                                        >
                                                                            <i className="fa fa-close ms-1"></i>
                                                                        </button>
                                                                    </Badge>
                                                                ))}
                                                                <div className="inline-dropdown-container position-relative d-inline-block">
                                                                    <Form.Control
                                                                        type="text"
                                                                        className="inline-input"
                                                                        placeholder="Enter text"
                                                                        ref={spokenRef}
                                                                        // value={row.areaOfEducation}
                                                                        // disabled={row.saved}
                                                                        onChange={(e) => handleWaSlanguages(e, "spoken")}
                                                                        onBlur={(e) => handleClosecomboLang(e, "spoken")}
                                                                    />
                                                                    {spokenLanguage?.length > 0 ? (
                                                                        <Dropdown show={true} >
                                                                            <Dropdown.Menu className="w-100 dropdown_ctm">
                                                                                <div class={`${spokenLanguage.length ? 'droplistmulti' : ''}`}>
                                                                                    {spokenLanguage.map((option, idx) => (
                                                                                        <Dropdown.Item
                                                                                            key={idx}
                                                                                            onClick={(e) =>
                                                                                                handleSelectSpokenLang(option)
                                                                                            }
                                                                                        >
                                                                                            {option?.language_name}
                                                                                        </Dropdown.Item>
                                                                                    ))}
                                                                                </div>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    ) : ('')}
                                                                </div>
                                                            </div>
                                                            <span className="required_text">
                                                                Select all spoken languages
                                                            </span>
                                                        </Form.Group>
                                                        <Form.Group
                                                            className="mb-3 col-md-6"
                                                            controlId="exampleForm.ControlTextarea1"
                                                        >
                                                            <Form.Label className="sm-label">
                                                                Written and Reading Language
                                                            </Form.Label>
                                                            {/* <div className="tagarea p-2">
                                                        {rdnwBadges.map((badge, index) => (
                                                            <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                {badge?.language_name}
                                                                <button
                                                                    className="btn close_tag"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() =>
                                                                        handleRemoveReadAndWriteLanguageBadge(index)
                                                                    }
                                                                >
                                                                    <i className="fa fa-close ms-1"></i>
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                        <Form.Control
                                                            type="text"
                                                            className="inline-input"
                                                            placeholder="Enter text"
                                                            onChange={(e) => {
                                                                setInputValue(e?.target?.value);
                                                            }}
                                                            onKeyDown={(e) => {
                                                                handleKeyPressForlanguages(e, "rdnw");
                                                            }}
                                                        />
                                                    </div> */}

                                                            <div className="tagarea p-2 position-relative">
                                                                {rdnwBadges.map((badge, index) => (
                                                                    <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                        {badge?.language_name}
                                                                        <button
                                                                            className="btn close_tag"
                                                                            style={{ cursor: "pointer" }}
                                                                            onClick={() =>
                                                                                handleRemoveReadAndWriteLanguageBadge(index)
                                                                            }
                                                                        >
                                                                            <i className="fa fa-close ms-1"></i>
                                                                        </button>
                                                                    </Badge>
                                                                ))}
                                                                <div className="inline-dropdown-container position-relative d-inline-block">
                                                                    <Form.Control
                                                                        type="text"
                                                                        className="inline-input"
                                                                        placeholder="Enter text"
                                                                        ref={writtenRef}
                                                                        // value={row.areaOfEducation}
                                                                        // disabled={row.saved}
                                                                        onChange={(e) => handleWaSlanguages(e, "rdnw")}
                                                                        onBlur={(e) => handleClosecomboLang(e, "rdnw")}
                                                                    />
                                                                    {writtenLanguage?.length > 0 ? (
                                                                        <Dropdown show={true} >
                                                                            <Dropdown.Menu className="w-100 dropdown_ctm">
                                                                                <div class={`${writtenLanguage.length ? 'droplistmulti' : ''}`}>
                                                                                    {writtenLanguage.map((option, idx) => (
                                                                                        <Dropdown.Item
                                                                                            key={idx}
                                                                                            onClick={(e) =>
                                                                                                handleSelectWrittenLang(option)
                                                                                            }
                                                                                        >
                                                                                            {option?.language_name}
                                                                                        </Dropdown.Item>
                                                                                    ))}
                                                                                </div>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    ) : ('')}
                                                                </div>
                                                            </div>
                                                            <span className="required_text">
                                                                Select all written and reading languages
                                                            </span>
                                                        </Form.Group>
                                                    </Form>
                                                )}
                                                <div className="accordion_footer">
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`inline-${type}`} className="me-3">
                                                                <Form.Check
                                                                    inline
                                                                    label="No Specific Language Requirements"
                                                                    name="no_specific_language_require"
                                                                    type={type}
                                                                    onChange={(e) => {
                                                                        setIsSpecificLanguareRequired(
                                                                            !isSpecificLanguareRequired
                                                                        );
                                                                        handleFormData(e);
                                                                    }}
                                                                    id={`inline-${type}-1`}
                                                                    checked={updateFormData?.no_specific_language_require}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                    <button
                                                        type="button"
                                                        // onClick={handleCreateForm}
                                                        class="btn btn-lightgray"
                                                        onClick={handleNext}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item
                                            eventKey="6"
                                            className="accd_child"
                                            id="item_Geog"
                                        >
                                            <Accordion.Header onClick={() => handleOpenStep("6")}>
                                                Geography{" "}
                                                {importantFlag.geography ? (
                                                    <img src={flagFill} className="flag_icon" onClick={(e) => removeImportantFlag(e, '6')} />
                                                ) : (
                                                    <img src={simpleFlag} className="flag_icon" onClick={(e) => handleImportantFlag(e, '6')} />
                                                )}
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['6'] = el)}>
                                                {isHideLocation && (
                                                    <Form>
                                                        <Form.Group
                                                            className="mb-3"
                                                            controlId="exampleForm.ControlTextarea1"
                                                        >
                                                            <Form.Label className="sm-label">
                                                                Preferred States / Cities / Towns
                                                            </Form.Label>
                                                            {/* <div className="tagarea p-2">
                                                        {locationBadges.map((badge, index) => (
                                                            <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                {badge?.location_name}
                                                                <button
                                                                    className="btn close_tag"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => handleRemoveLocationBadge(index)}
                                                                >
                                                                    <i className="fa fa-close ms-1"></i>
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                        <Form.Control
                                                            type="text"
                                                            className="inline-input"
                                                            placeholder="Enter text"
                                                            onChange={(e) => {
                                                                setInputValue(e?.target?.value);
                                                            }}
                                                            onKeyDown={handleKeyPressForLocation}
                                                        />
                                                    </div> */}
                                                            {/* <--------workingbaba-------? */}
                                                            <div className="tagarea p-2 position-relative">
                                                                {locationBadges.map((badge, index) => (
                                                                    <Badge key={index} bg="white" className="me-2 mb-2 tag-white">
                                                                        {badge?.location_name}
                                                                        <button
                                                                            className="btn close_tag"
                                                                            style={{ cursor: "pointer" }}
                                                                            onClick={() => handleRemoveLocationBadge(index)}
                                                                        >
                                                                            <i className="fa fa-close ms-1"></i>
                                                                        </button>
                                                                    </Badge>
                                                                ))}
                                                                <div className="inline-dropdown-container position-relative d-inline-block">
                                                                    <Form.Control
                                                                        type="text"
                                                                        className="inline-input"
                                                                        placeholder="Enter text"
                                                                        ref={locationRef}
                                                                        // value={row.areaOfEducation}
                                                                        // disabled={row.saved}
                                                                        onChange={handleLocationAPIList}
                                                                        onBlur={handleCloseComboLocation}
                                                                    />
                                                                    {locationList?.length > 0 ? (
                                                                        <Dropdown show={true} >
                                                                            <Dropdown.Menu className="w-100 dropdown_ctm">
                                                                                <div class={`${locationList.length ? 'droplistmulti' : ''}`}>
                                                                                    {locationList.map((option, idx) => (
                                                                                        <Dropdown.Item
                                                                                            key={idx}
                                                                                            onClick={(e) =>
                                                                                                handleSelectLocation(option)
                                                                                            }
                                                                                        >
                                                                                            {option?.location_name}
                                                                                        </Dropdown.Item>
                                                                                    ))}
                                                                                </div>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    ) : ('')}
                                                                </div>
                                                            </div>
                                                            <span className="required_text">
                                                                Select all relevant locations
                                                            </span>
                                                        </Form.Group>
                                                    </Form>
                                                )}
                                                <div className="accordion_footer">
                                                    <Form>
                                                        {["checkbox"].map((type) => (
                                                            <div key={`inline-${type}`} className="me-3">
                                                                <Form.Check
                                                                    inline
                                                                    label="No Specific Location"
                                                                    name="no_specific_location"
                                                                    onChange={(e) => {
                                                                        setIsHideLLocation(!isHideLocation);
                                                                        handleFormData(e);
                                                                    }}
                                                                    type={type}
                                                                    id={`inline-${type}-1`}
                                                                    checked={updateFormData?.no_specific_location}
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    label="Relocation Expenses Covered"
                                                                    name="relocation_cost_covered"
                                                                    type={type}
                                                                    onChange={handleFormData}
                                                                    id={`inline-${type}-2`}
                                                                    checked={updateFormData?.relocation_cost_covered}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Form>
                                                    <button
                                                        type="button"
                                                        // onClick={handleCreateForm}
                                                        class="btn btn-lightgray"
                                                        onClick={handleNext}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </>
                                )}
                                {expandCollapse.includes(2) && (
                                    <>
                                        <Accordion.Item eventKey="7">
                                            <Accordion.Header className="bg-lightblue" onClick={() => {
                                                setOpenStep([])
                                                setExpandCollapse([2, 3])
                                            }}>
                                                Skills and Other Requirements
                                            </Accordion.Header>
                                            {currentStep !== "7" && (<p className="short_text"> Select Skills and Add at least 1 Custom Question to help you understand your applicants better.</p>)}
                                            <Accordion.Body>
                                                <p>
                                                    In this section, you can add additional optional details
                                                    such as Skills expected from the ideal candidate and also
                                                    add some specific questions that will allow you to gain a
                                                    deeper insight about the candidate.
                                                    <br />
                                                    <br />
                                                    Don’t forget that here too Skills or Questions can be marked
                                                    as very important [Yellow Flag] or a must have [Red Flag] to
                                                    indicate the Importance to you.
                                                </p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="8" className="accd_child">
                                            <Accordion.Header onClick={() => {
                                                handleOpenStep("8")
                                                setExpandCollapse([2, 3])
                                            }}>
                                                Skills
                                                <div className="head_actions">
                                                    <span className="imprt_icon text-primery">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                    </span>
                                                    <span className="imprt_icon">
                                                        <i class="far fa-star" aria-hidden="true"></i>
                                                    </span>
                                                    <span className="imprt_icon">
                                                        <i class="far fa-star" aria-hidden="true"></i>
                                                    </span>
                                                    <span className="count ms-1">1 of 3</span>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['8'] = el)}>
                                                <Row className="skills_seraching">
                                                    <Col md={9}>
                                                        <InputGroup className="defult_serachbox">
                                                            <Button id="basic-addon1">
                                                                <svg
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 18 18"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                                                                        stroke="#667085"
                                                                        stroke-width="1.66667"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                </svg>
                                                            </Button>
                                                            <Form.Control
                                                                placeholder="Serach"
                                                                aria-label="Serach"
                                                                onChange={(e) => {
                                                                    setSkillSearch(e.target.value);
                                                                }}
                                                            />
                                                        </InputGroup>
                                                        {showSkillList && skillngroupList.length > 0 && (
                                                            <div className="ctm_dropdown ct_scrollbar">
                                                                <ul>
                                                                    {skillngroupList.map((item) => (
                                                                        <li
                                                                            key={item.skill_group_name}
                                                                            onClick={() => getSkillGroupDetails(item.uid)}
                                                                        >
                                                                            {item.skill_group_name}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                        {showSkillList && skillngroupList.length === 0 && (
                                                            <ul>
                                                                <li>No data found</li>
                                                            </ul>
                                                        )}
                                                    </Col>
                                                    <Col md={3}>
                                                        <button
                                                            type="button"
                                                            onClick={handleAddSkillGroup}
                                                            class="btn btn-lightgray w-100"
                                                        >
                                                            <i className="fa fa-plus me-2"></i>Create Skill Group
                                                        </button>{" "}
                                                    </Col>
                                                </Row>
                                                {/* {skillGroupData && (
                                            <div className="starttag_box">
                                                <div className="stagbox_head">
                                                    <h6>{skillGroupData?.skill_group_name}</h6>
                                                </div>
                                                <div className="stag_list mt-2">
                                                    {skillGroupData &&
                                                        skillGroupData?.group_skill?.length > 0 &&
                                                        skillGroupData?.group_skill?.map((skill, index) => (
                                                            <span
                                                                onClick={(e) => {
                                                                    handleSelectedSkill(skill);
                                                                }}
                                                                className={`stag_item ${SelectSkillsData.includes(skill) ? "active" : ""
                                                                    }`}
                                                            >
                                                                {skill.skill_name}
                                                            </span>
                                                        ))}

                                                    {addSubSkill.map((item, index) => (
                                                        <span
                                                            onClick={(e) => {
                                                                handleSelectedSkill(item);
                                                            }}
                                                            className={`stag_item ${SelectSkillsData.includes(item) ? "active" : ""
                                                                }`}
                                                        >
                                                            <input
                                                                onChange={(e) => {
                                                                    const updatedSkills = addSubSkill.map(
                                                                        (skill, i) =>
                                                                            i === index
                                                                                ? { ...skill, skill_name: e.target.value }
                                                                                : skill
                                                                    );
                                                                    setAddSubSkill(updatedSkills);
                                                                }}
                                                                onBlur={() => handleBlur(item.skill_name, index)}
                                                            />{" "}
                                                            <i
                                                                onClick={() => {
                                                                    hadleDeleteCurrentSkill(index);
                                                                }}
                                                                className="fa fa-close ms-1 tag_remove"
                                                            ></i>
                                                        </span>
                                                    ))}

                                                    <button
                                                        type="button"
                                                        class="btn-light-gray btn btn-primary"
                                                        onClick={handlesubSkillAdd}
                                                    >
                                                        <i class="fa fa-plus text-primary me-1"></i>Add Skill
                                                    </button>
                                                </div>
                                            </div>
                                        )} */}
                                                {skillError && (
                                                    <p className="text-danger mt-1">
                                                        {skillError}
                                                    </p>
                                                )}
                                                {skillGroupData?.length > 0 && (
                                                    skillGroupData?.map((Val, i) => (
                                                        <div className="starttag_box">
                                                            <div className="stagbox_head">
                                                                <h6>{Val?.skill_group_name}</h6>
                                                            </div>
                                                            <div className="stag_list mt-2">
                                                                {Val?.group_skill?.length > 0 &&
                                                                    Val?.group_skill?.map((skill, index) => (
                                                                        <span
                                                                            onClick={(e) => {
                                                                                handleSelectedSkill(e, skill, i);
                                                                            }}
                                                                            className={`stag_item ${SelectSkillsData.some(item => JSON.stringify(item) === JSON.stringify(skill)) ? "active" : ""
                                                                                }`}
                                                                        >
                                                                            {skill.skill_name}
                                                                            <span className={`imprt_icon ${mustHaveSkills.some(item => JSON.stringify(item) === JSON.stringify(skill)) ? "text-primery" : ""} `} onClick={() => handleMustHaveSkill(skill)}>
                                                                                <i class={`${mustHaveSkills.some(item => JSON.stringify(item) === JSON.stringify(skill)) ? "fa" : "far"}  fa-star`} aria-hidden="true"></i>
                                                                            </span>
                                                                        </span>
                                                                    ))}

                                                                {selectedIndex.includes(Val?.uid) && addSubSkill?.map((item, index) => (
                                                                    <span
                                                                        onClick={(e) => {
                                                                            handleSelectedSkill(e, item, i);
                                                                        }}
                                                                        className={`stag_item ${SelectSkillsData.includes(item) ? "active" : ""
                                                                            }`}
                                                                    >
                                                                        <input
                                                                            onChange={(e) => {
                                                                                const updatedSkills = addSubSkill.map(
                                                                                    (skill, i) =>
                                                                                        i === index
                                                                                            ? { ...skill, skill_name: e.target.value }
                                                                                            : skill
                                                                                );
                                                                                setAddSubSkill(updatedSkills);
                                                                            }}
                                                                            onBlur={() => handleBlur(item.skill_name, Val, index)}
                                                                        />{" "}
                                                                        <i
                                                                            onClick={() => {
                                                                                hadleDeleteCurrentSkill(index);
                                                                            }}
                                                                            className="fa fa-close ms-1 tag_remove"
                                                                        ></i>
                                                                    </span>
                                                                ))}

                                                                {/* <button
                                                            type="button"
                                                            class="btn-light-gray btn btn-primary"
                                                            onClick={() => handlesubSkillAdd(Val?.uid)}
                                                        >
                                                            <i class="fa fa-plus text-primary me-1"></i>Add Skill
                                                        </button> */}
                                                                <Button
                                                                    className={`${addSubSkill.length > 0 && selectedIndex.includes(Val?.uid) ? 'smbtn-primary' : 'btn-light-gray'}`}
                                                                    onClick={() => handlesubSkillAdd(Val?.uid)}
                                                                >
                                                                    <i className="fa fa-plus text-primary me-1"></i>Add Skill
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                                {addSkillGroup.map((item, i) => (
                                                    <div className="starttag_box">
                                                        <div className="stagbox_head">
                                                            <Form.Control
                                                                placeholder="Add Custom Skill Group"
                                                                className="sm-fcontrol"
                                                                onChange={(e) => {
                                                                    setCustomValue(e.target.value);
                                                                }}
                                                            />

                                                            <div class="d-flex ms-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={handleSaveSkillGroup}
                                                                    class="icon-btn"
                                                                >
                                                                    <i class="far fa-save"></i>
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        handleDeleteGroup(i);
                                                                    }}
                                                                    class="icon-btn"
                                                                >
                                                                    <i class="fa fa-close"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {/* {addSkillGroup && addSkillGroup[0] && (
                                                    <p className="mt-1">
                                                        Add at least 6 individual skills within this skill
                                                        Group
                                                    </p>
                                                )} */}
                                                        {skillError && (
                                                            <p className="text-danger mt-1">
                                                                {skillError}
                                                            </p>
                                                        )}
                                                        <div className="stag_list mt-2">
                                                            {selectedIndex.includes(i) && addSubSkill.map((item, index) => (
                                                                <span
                                                                    onClick={(e) => {
                                                                        handleSelectedSkill(e, item, i);
                                                                    }}
                                                                    className={`stag_item ${SelectSkillsData.includes(item) ? "active" : ""
                                                                        }`}
                                                                >
                                                                    <input
                                                                        className="border-0"
                                                                        onChange={(e) => {
                                                                            // Create a new array with the updated item
                                                                            const updatedSkills = addSubSkill.map(
                                                                                (skill, i) =>
                                                                                    i === index
                                                                                        ? { ...skill, skill_name: e.target.value }
                                                                                        : skill
                                                                            );
                                                                            setAddSubSkill(updatedSkills); // Update the state
                                                                        }}
                                                                    // onBlur={() => handleBlur(item.skill_name, index)}
                                                                    />{" "}
                                                                    <i
                                                                        onClick={() => {
                                                                            hadleDeleteCurrentSkill(index);
                                                                        }}
                                                                        className="fa fa-close ms-1 tag_remove"
                                                                    ></i>
                                                                </span>
                                                            ))}

                                                            {/* <button
                                                        type="button"
                                                        class="btn-light-gray btn btn-primary"
                                                        onClick={() => handlesubSkillAdd(i)}
                                                    >
                                                        <i class="fa fa-plus text-primary me-1"></i>Add Skill
                                                    </button> */}
                                                            <Button
                                                                className={`${addSubSkill.length > 0 && selectedIndex.includes(i) ? 'smbtn-primary' : 'btn-light-gray'}`}
                                                                onClick={() => handlesubSkillAdd(i)}
                                                            >
                                                                <i className="fa fa-plus text-primary me-1"></i>Add Skill
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="accordion_footer mt-3 justify-content-end">
                                                    <button
                                                        // onClick={handleCreateForm}
                                                        type="button"
                                                        class="btn btn-lightgray"
                                                        onClick={handleNext}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        {/* <Accordion activeKey={activeKey}> */}
                                        <Accordion.Item eventKey="9" className="accd_child">
                                            <Accordion.Header onClick={() => {
                                                handleOpenStep("9")
                                                setComponents([]);
                                                setExpandCollapse([2, 3])
                                                setActiveKeyAdd(false);
                                            }}>
                                                Custom Questions{" "}
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            // handleOpenStep("9")
                                                            setActiveKeyAdd(true);
                                                            // setActiveKey("9");
                                                            handleAddComponent(e);
                                                        }}
                                                        class="btn btn-lightgray me-3"
                                                    >
                                                        <i className="fa fa-plus me-2"></i>
                                                        Add
                                                    </button>
                                                    {/* <div
                                                    class="btn btn-lightgray p-3"
                                                    onClick={(e) => {
                                                        setActiveKey(activeKey === "9" ? null : "9");
                                                        setComponents([]);
                                                        setActiveKeyAdd(false);
                                                    }}
                                                >
                                                    <svg
                                                        className="flag_icon2"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                                                            stroke="#98A2B3"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div> */}
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['9'] = el)}>
                                                <div className="starttag_box ctmqus_panel mt-0">
                                                    {!activeKeyAdd && (
                                                        <>
                                                            <div className="stagbox_head">
                                                                <span className="border_box">
                                                                    How many companies have you changed in your
                                                                    career?
                                                                </span>
                                                                <div class="d-flex ms-3">
                                                                    <button type="button" class="icon-btn">
                                                                        <i class="far fa-save"></i>
                                                                    </button>
                                                                    <button type="button" class="icon-btn">
                                                                        <i class="far fa-star"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <h6 className="mt-3 hadding-xs">Answer Options</h6>
                                                            <p className="mt-1">
                                                                Select the preferred answer using the radio
                                                                button.
                                                            </p>
                                                            <div className="cmt_questions">
                                                                {["radio"].map((type) => (
                                                                    <div key={`default-${type}`} className="mb-3">
                                                                        <Form.Check // prettier-ignore
                                                                            label="No"
                                                                            name="group1"
                                                                            type={type}
                                                                            id={`default-${type}`}
                                                                        />

                                                                        <Form.Check
                                                                            label="Yes"
                                                                            name="group1"
                                                                            type={type}
                                                                            id={`default-${type}`}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                    {activeKeyAdd &&
                                                        components.map((question, questionIndex) => (
                                                            <div key={questionIndex} className="mb-4">
                                                                <div className="stagbox_head">
                                                                    <span className="border_box">
                                                                        <Form.Control
                                                                            className="formControl_cstmQuestion"
                                                                            placeholder="Your Question"
                                                                            onChange={(e) =>
                                                                                handleQuestionTitleChange(
                                                                                    questionIndex,
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            value={question.question_title}
                                                                        />
                                                                    </span>
                                                                    {/* {questionIndex === 0 && ( */}
                                                                        <div className="d-flex ms-3">
                                                                            <Form.Select
                                                                                onChange={(e) =>
                                                                                    handleQuestionTypeChange(
                                                                                        questionIndex,
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option value="single">MCQ Single</option>
                                                                                <option value="multiple">
                                                                                    MCQ Multiple
                                                                                </option>
                                                                            </Form.Select>
                                                                            {/* <button type="button" className="icon-btn">
                                                                                <i className="far fa-star"></i>
                                                                            </button> */}
                                                                        </div>
                                                                    {/* )} */}
                                                                    <div className="d-flex ms-3">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-transpant"
                                                                            // onClick={() => EducationdeleteRow(index)}
                                                                            onClick={() => handleDeleteRowQuestion(questionIndex)}
                                                                        >
                                                                            <img
                                                                                src={imgpTrash}
                                                                                alt="Delete"
                                                                                style={{ width: "20px", height: "20px" }}
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <h6 className="mt-3 hadding-xs">Answer Options</h6>
                                                                <p className="mt-1">
                                                                    Select the preferred answer using the radio
                                                                    button.
                                                                </p>
                                                                <div className="cmt_questions">
                                                                    {question.question_option.part1.map(
                                                                        (option, optionIndex) => (
                                                                            <div
                                                                                key={`option-${optionIndex}`}
                                                                                className="mb-3"
                                                                            >
                                                                                <Form.Check
                                                                                    name={`question-${questionIndex}`} // Group radio buttons by question
                                                                                    checked={question.questions_answer.includes(
                                                                                        option
                                                                                    )} // Check if the option is selected
                                                                                    onChange={(e) =>
                                                                                        handleAnswerChange(
                                                                                            questionIndex,
                                                                                            option,
                                                                                            e.target.checked
                                                                                        )
                                                                                    }
                                                                                    label={
                                                                                        <div className="inputTypes">
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                placeholder="Enter your text here"
                                                                                                className="formControl_cstmQuestion"
                                                                                                onChange={(e) =>
                                                                                                    handleQuestionOptionChange(
                                                                                                        questionIndex,
                                                                                                        optionIndex,
                                                                                                        e.target.value
                                                                                                    )
                                                                                                }
                                                                                                value={option}
                                                                                            />
                                                                                            <i
                                                                                                className="fa fa-times"
                                                                                                onClick={() =>
                                                                                                    handleDeleteOption(
                                                                                                        questionIndex,
                                                                                                        optionIndex
                                                                                                    )
                                                                                                }
                                                                                            ></i>
                                                                                        </div>
                                                                                    }
                                                                                    type={
                                                                                        questionType === "single"
                                                                                            ? "radio"
                                                                                            : "checkbox"
                                                                                    }
                                                                                    id={`option-${optionIndex}`}
                                                                                    className="d-flex align-items-center"
                                                                                />
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-lightgray me-3"
                                                                    onClick={() => handleAddResponse(questionIndex)} // Add a new response option
                                                                >
                                                                    <i className="fa fa-plus me-1"></i>
                                                                    Add Response
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={handleSaveCustomQuestion} // Log all questions
                                                                    className="btn btn-lightgray"
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>
                                                        ))}
                                                </div>
                                                <div className="accordion_footer mt-3 justify-content-end">
                                                    <button type="button" class="btn btn-lightgray" onClick={handleNext}>
                                                        Next
                                                    </button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        {/* </Accordion> */}
                                    </>
                                )}

                                {expandCollapse.includes(3) && (
                                    <>
                                        <Accordion.Item eventKey="10">
                                            <Accordion.Header className="bg-lightblue" onClick={() => {
                                                setOpenStep([])
                                                setExpandCollapse([3])
                                            }}>
                                                Ideal Behaviour and Personalities
                                            </Accordion.Header>
                                            {currentStep !== "10" && (<p className="short_text">Select the 6 most relevant behaviours for the role and company based on daily tasks and work culture. Then, choose the 2 most important ones. Don,t hesitate the Help Me Section.</p>)}
                                            <Accordion.Body>
                                                <p>
                                                    Pick the most relevant behaviours for the Role and the
                                                    Company considering their daily tasks and work culture
                                                    within the group or the company. While all Behaviours are
                                                    good to have, some are more important that others that can
                                                    affect the success of the role.
                                                </p>
                                                <p>
                                                    Please select 6 Behaviours among the 12 and then the pick
                                                    the 2 among that are most important.
                                                </p>
                                                <p>
                                                    Use the Help Me Section for more support in making your
                                                    selections.
                                                </p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="11" className="accd_child">
                                            <Accordion.Header onClick={() => {
                                                handleOpenStep("11")
                                                setExpandCollapse([3])
                                            }}>
                                                <div>
                                                    Behaviour Assessment{" "}
                                                    {/* <svg
                                                className="flag_icon"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.33366 4.66667H13.0939C13.3921 4.66667 13.5412 4.66667 13.6284 4.72936C13.7045 4.78406 13.754 4.86826 13.7649 4.96133C13.7774 5.068 13.705 5.19834 13.5601 5.45901L12.6627 7.07432C12.6102 7.16886 12.584 7.21613 12.5737 7.26618C12.5646 7.31049 12.5646 7.35618 12.5737 7.40048C12.584 7.45054 12.6102 7.49781 12.6627 7.59234L13.5601 9.20766C13.7049 9.46833 13.7774 9.59867 13.7649 9.70534C13.754 9.79841 13.7045 9.8826 13.6284 9.93731C13.5412 10 13.3921 10 13.0939 10H8.40033C8.02696 10 7.84027 10 7.69766 9.92734C7.57222 9.86342 7.47024 9.76144 7.40632 9.63599C7.33366 9.49339 7.33366 9.3067 7.33366 8.93333V7.33333M2.66699 14L2.66699 2.66667M2.66699 7.33333H8.26699C8.64036 7.33333 8.82704 7.33333 8.96965 7.26067C9.09509 7.19676 9.19708 7.09477 9.261 6.96933C9.33366 6.82672 9.33366 6.64004 9.33366 6.26667V3.06667C9.33366 2.6933 9.33366 2.50661 9.261 2.36401C9.19708 2.23856 9.09509 2.13658 8.96965 2.07266C8.82704 2 8.64036 2 8.26699 2H3.73366C3.36029 2 3.17361 2 3.031 2.07266C2.90556 2.13658 2.80357 2.23856 2.73965 2.36401C2.66699 2.50661 2.66699 2.6933 2.66699 3.06667V7.33333Z"
                                                    stroke="#98A2B3"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg> */}
                                                    <small className="small_subtitle">Select <span className="text-primery">6 out of the 12</span> available options, Identify <span className="text-primery">2 most important ones</span></small>
                                                </div>
                                                <button type="button" className="btn btn-lightgray me-4" onClick={(e) => { e.stopPropagation(); setShowHelpChoose(true) }}>
                                                    <svg
                                                        className="me-1"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M10.8332 11.6667L8.33321 9.16666M12.5085 2.91666V1.66666M15.7913 4.21721L16.6752 3.33332M15.7913 10.8333L16.6752 11.7172M9.17517 4.21721L8.29128 3.33332M17.0918 7.49999H18.3418M5.10935 17.3905L12.8071 9.6928C13.1371 9.36278 13.3021 9.19778 13.3639 9.0075C13.4183 8.84013 13.4183 8.65985 13.3639 8.49248C13.3021 8.3022 13.1371 8.1372 12.8071 7.80718L12.1927 7.1928C11.8627 6.86278 11.6977 6.69778 11.5074 6.63595C11.34 6.58157 11.1597 6.58157 10.9924 6.63595C10.8021 6.69778 10.6371 6.86279 10.3071 7.1928L2.60935 14.8905C2.27934 15.2205 2.11433 15.3855 2.0525 15.5758C1.99812 15.7432 1.99812 15.9235 2.0525 16.0908C2.11433 16.2811 2.27934 16.4461 2.60935 16.7761L3.22373 17.3905C3.55375 17.7205 3.71875 17.8855 3.90903 17.9474C4.0764 18.0017 4.25669 18.0017 4.42405 17.9474C4.61433 17.8855 4.77934 17.7205 5.10935 17.3905Z"
                                                            stroke="#3538CD"
                                                            stroke-width="1.66667"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                    Help me Choose
                                                </button>
                                            </Accordion.Header>
                                            <Accordion.Body ref={(el) => (sectionRefs.current['11'] = el)}>
                                                <div className="behav_assmnt">
                                                    {behaviours &&
                                                        behaviours.map((item, index) => (
                                                            <Col key={index} md={3}>
                                                                <div
                                                                    className={`assmntbox ${item.isSelected ? "active" : ""
                                                                        }`}
                                                                    // className={`assmntbox ${activeBehaviour.includes(item.uid) && 'active'}`}
                                                                    onClick={() => handleBoxClick(index, item)} style={{ cursor: 'pointer' }}
                                                                >
                                                                    <div className="assmntbox-head">
                                                                        <h6>
                                                                            {item.heading}
                                                                        </h6>
                                                                        <i
                                                                            className={`fa-star ${item.markedImportant ? "fa important" : "far"
                                                                                }`}
                                                                            // className={`${importantBehaviour.includes(item.uid)?'fa important':'far'} fa-star`}
                                                                            onClick={(e) => handleStarClick(index, e, item?.heading)}
                                                                        ></i>
                                                                    </div>
                                                                    <div className="assmntbox-body">
                                                                        <p>{item.data}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))}
                                                </div>
                                                <div className="perlity_mth mt-3">
                                                    <h5>Personality Matches</h5>
                                                    <p>
                                                        The personalities will help you understand the right
                                                        combination of behaviours
                                                    </p>
                                                    <Row className="behav_assmnt">
                                                        {createRevisedJobData?.calculation_job.length === 0 && <Col
                                                            md={12}
                                                            className="d-flex justify-content-center align-item-center "
                                                        >
                                                            <span>
                                                                Personality matches appear only after behaviour
                                                                selections are made
                                                            </span>
                                                        </Col>}
                                                        {createRevisedJobData?.calculation_job.length > 0 && personalityData.length > 0 && personalityData?.sort((a, b) => b?.personality_percentage - a?.personality_percentage).map((item, index) => (<Col key={index} md={3}>
                                                            <div onClick={() => handleCardClick(item)} className="perlitymth-card">
                                                                <div className="perlitymth-head">
                                                                    <span className="prtmth_icon"><img src={LeaderIcn} /></span>
                                                                    <div className="prtmth_title">
                                                                        <h6>{item?.behaviours_name}</h6>
                                                                        <span>{item?.personality_percentage}%</span>
                                                                    </div>
                                                                </div>
                                                                <div className="perlitymth-body">
                                                                    <p className="m-0 text-truncate">{item?.behaviour_desctiption}</p>
                                                                </div>
                                                            </div>
                                                        </Col>))}
                                                    </Row>
                                                </div>
                                                {/* <div class="d-flex justify-content-center align-items-center col-md-12 mt-3">
                                            <button
                                                onClick={handleCreateForm}
                                                type="button"
                                                // disabled={createRevisedJobData?.calculation_job.length > 0}
                                                class="btn-md btn btn-primary"
                                            >
                                                Review And Post
                                            </button>
                                        </div> */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </>
                                )}

                                <div class="d-flex justify-content-center align-items-center col-md-12 mt-3">
                                    <button
                                        onClick={handleCreateForm}
                                        type="button"
                                        // disabled={createRevisedJobData?.calculation_job.length > 0}
                                        disabled={handledisableOrNot()}
                                        class="btn-md btn btn-primary"
                                    >
                                        Review And Post
                                    </button>
                                </div>
                            </Accordion>
                            {openStep.length > 0 && (
                                <motion.div
                                    // className="lw-toolbar"
                                    ref={toolbarRef}
                                    className="absolute right-0 w-12 h-12 bg-blue-500 rounded-lg lw-toolbar"
                                    animate={{ top: toolbarPosition }}
                                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                >
                                    <ul>
                                        {(openStep[0] === '1' || openStep[0] === '2' || openStep[0] === '3' || openStep[0] === '4' || openStep[0] === '5' ||
                                            openStep[0] === '6') &&
                                            (
                                                <>
                                                    <li>
                                                        <Link href={''} onClick={(e) => handleRefreshData(e, openStep?.[0])}><i className="fa fa-undo"></i></Link>
                                                    </li>
                                                    <li className={handleLightClass()}>
                                                        <Link href={''} onClick={(e) => removeImportantFlag(e, openStep?.[0])}>
                                                            <img src={simpleFlag} className="flag_icon" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={''} onClick={(e) => handleImportantFlag(e, openStep?.[0])}>
                                                            {handleOutline()}
                                                        </Link>
                                                    </li>
                                                </>
                                            )}
                                        {openStep[0] === '8' && (
                                            <>
                                                <li>
                                                    <Link href={''} onClick={(e) => handleRefreshData(e, openStep?.[0])}><i className="fa fa-undo"></i></Link>
                                                </li>
                                                <li>
                                                    <Link href={''} onClick={handleAddSkillGroup}><i className="fa fa-plus"></i></Link>
                                                </li>
                                            </>
                                        )}
                                        {openStep[0] === '9' && (
                                            <>
                                                <li>
                                                    <Link href={''} onClick={(e) => handleRefreshData(e, openStep?.[0])}><i className="fa fa-undo"></i></Link>
                                                </li>
                                                <li>
                                                    <Link href={''} onClick={() => setActiveKeyAdd(true)}><i className="fa fa-plus"></i></Link>
                                                </li>
                                                <li className="active">
                                                    <Link href={''} onClick={() => setActiveKeyAdd(false)}><i className="fas fa-times"></i></Link>
                                                </li>
                                            </>
                                        )}
                                        {openStep[0] === '11' && (
                                            <>
                                                <li>
                                                    <Link href={''} onClick={(e) => handleRefreshData(e, openStep?.[0])}><i className="fa fa-undo"></i></Link>
                                                </li>
                                                <li className="active">
                                                    <Link href={''} onClick={() => setShowHelpChoose(true)}>
                                                        <svg
                                                            className="me-1"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M10.8332 11.6667L8.33321 9.16666M12.5085 2.91666V1.66666M15.7913 4.21721L16.6752 3.33332M15.7913 10.8333L16.6752 11.7172M9.17517 4.21721L8.29128 3.33332M17.0918 7.49999H18.3418M5.10935 17.3905L12.8071 9.6928C13.1371 9.36278 13.3021 9.19778 13.3639 9.0075C13.4183 8.84013 13.4183 8.65985 13.3639 8.49248C13.3021 8.3022 13.1371 8.1372 12.8071 7.80718L12.1927 7.1928C11.8627 6.86278 11.6977 6.69778 11.5074 6.63595C11.34 6.58157 11.1597 6.58157 10.9924 6.63595C10.8021 6.69778 10.6371 6.86279 10.3071 7.1928L2.60935 14.8905C2.27934 15.2205 2.11433 15.3855 2.0525 15.5758C1.99812 15.7432 1.99812 15.9235 2.0525 16.0908C2.11433 16.2811 2.27934 16.4461 2.60935 16.7761L3.22373 17.3905C3.55375 17.7205 3.71875 17.8855 3.90903 17.9474C4.0764 18.0017 4.25669 18.0017 4.42405 17.9474C4.61433 17.8855 4.77934 17.7205 5.10935 17.3905Z"
                                                                stroke="#3538CD"
                                                                stroke-width="1.66667"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </motion.div>
                            )}
                        </Col>
                        <Col md={3} lg={2} className="jobpre_Rightpanel">
                            <h5>{createRevisedJobData?.job_title}</h5>
                            <p>
                                Like {createRevisedJobData?.is_like?.map((val) => (
                                    <>{val?.is_like_name}</>
                                ))},
                                {createRevisedJobData?.number_of_positions} {createRevisedJobData?.number_of_positions > 1 ? 'Positions' : 'Position'}
                                <br />
                                Technology, {createRevisedJobData?.job_location?.location_name},
                                <br />
                                {createRevisedJobData?.job_type},{" "}
                                {createRevisedJobData?.workplace_type}
                            </p>
                            <div className="ct_scrollbar pb-3">
                                <div className="user_bsinfo">
                                    <h6>Expectations</h6>
                                    <ul>
                                        <li>
                                            {/* {updateFormData?.min_exp}-
                                            {updateFormData?.max_exp} Years Experience{" "} */}
                                            {updateFormData?.min_exp && updateFormData?.max_exp ? (
                                                <>{updateFormData?.min_exp}-{updateFormData?.max_exp} Years Experience</>
                                            ) : (
                                                <>
                                                    Experience{" "}
                                                    <span className="text-danger italic">
                                                        Not defined
                                                    </span>
                                                </>
                                            )}
                                        </li>
                                        <li>
                                            {updateFormData?.min_salary && updateFormData?.max_salary ? (
                                                <>INR {updateFormData?.min_salary} - {updateFormData?.max_salary}</>
                                            ) : (
                                                <>
                                                    Salary{" "}
                                                    <span className="text-danger italic">
                                                        Not defined
                                                    </span>
                                                </>
                                            )}
                                            {/* <span className="text-danger italic">
                                                {updateFormData?.max_salary}
                                            </span>{" "} */}
                                        </li>
                                        <li>
                                            Minimum Qualification
                                            {updateFormData?.minimum_education ? (
                                                <> Of {updateFormData?.minimum_education}</>
                                            ) : (
                                                <><span className="text-danger italic">Not defined</span>{" "}</>
                                            )}
                                            {/* Minimum Qualification{" "} */}

                                        </li>
                                        <li>
                                            Education{" "}
                                            {badges?.length > 0 ? (
                                                <>
                                                    in
                                                    {badges?.map((Val, index) => (
                                                        <> {Val?.qualification_name}{index !== badges.length - 1 && ", "}</>
                                                    ))}
                                                </>
                                            ) : (
                                                <span className="text-danger italic">Not defined</span>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                                <div className="user_bsinfo">
                                    <h6>Additional</h6>
                                    <ul>
                                        <li>
                                            Required{" "}
                                            {updateFormData?.immediate_hiring ? (
                                                <>As soon as possible </>
                                            ) : updateFormData?.targate_hire_date ? (
                                                <> in {updateFormData?.targate_hire_date}</>
                                            ) : (
                                                <>By <span className="text-danger italic">Not defined</span></>
                                            )}

                                        </li>
                                        <li>Needs to Travel Rarely </li>
                                        <li>Must Speak
                                            {spokenLanguageBadges?.length > 0 ? (
                                                <>
                                                    {spokenLanguageBadges?.map((lang, index) => (
                                                        <> {lang?.language_name}{index !== spokenLanguageBadges.length - 1 && ", "}</>
                                                    ))}
                                                </>
                                            ) : (
                                                <span className="text-danger italic"> Not defined</span>
                                            )}
                                        </li>
                                        <li>Must Read/Write in
                                            {rdnwBadges?.length > 0 ? (
                                                <>
                                                    {rdnwBadges?.map((lang, index) => (
                                                        <> {lang?.language_name}{index !== rdnwBadges.length - 1 && ", "}</>
                                                    ))}
                                                </>
                                            ) : (
                                                <span className="text-danger italic"> Not defined</span>
                                            )}
                                            {/* {rdnwBadges?.map((lang, index) => (
                                            <>{lang?.language_name}{index !== rdnwBadges.length - 1 && ", "}</>
                                        ))} */}
                                        </li>
                                        <li>Should be from
                                            {locationBadges?.length > 0 ? (
                                                <>
                                                    {locationBadges?.map((city, index) => (
                                                        <> {city?.location_name}{index !== locationBadges.length - 1 && ", "}</>
                                                    ))}
                                                </>
                                            ) : (
                                                <span className="text-danger italic"> Not defined</span>
                                            )}
                                            {/* {locationBadges?.map((city, index) => (
                                            <>{city?.location_name}{index !== locationBadges.length - 1 && ", "}</>
                                        ))} */}
                                        </li>
                                    </ul>
                                </div>
                                <div className="user_bsinfo">
                                    <h6>Skills</h6>
                                    <ul>
                                        <li>
                                            {SelectSkillsData?.length > 0 ? (
                                                <>
                                                    {SelectSkillsData?.map((skill, index) => (
                                                        <> {skill?.skill_name}{index !== SelectSkillsData.length - 1 && ", "}</>
                                                    ))}
                                                </>
                                            ) : (
                                                <span className="text-danger italic"> None defined</span>
                                            )}
                                            {/* {SelectSkillsData?.map((skill, index) => (
                                                <>{skill?.skill_name}{index !== SelectSkillsData.length - 1 && ", "}</>
                                            ))} */}
                                        </li>
                                    </ul>
                                </div>
                                <div className="user_bsinfo">
                                    <h6>Behaviours</h6>
                                    <ul>
                                        <li>
                                            {behaviours?.length > 0 ? behaviours?.map((item, index) => {
                                                if (item.isSelected) {
                                                    return (
                                                        <>
                                                            {item?.heading}&nbsp;
                                                            {item?.markedImportant && (
                                                                <i className={`fa-star ${item.markedImportant ? "fa important" : "far"}`}
                                                                    onClick={(e) => handleStarClick(index, e)}
                                                                ></i>
                                                            )}
                                                            {index !== behaviours.length - 1 && ", "}
                                                        </>
                                                    )
                                                }
                                            }) : (
                                                <span className="text-danger italic">Not defined</span>
                                            )}

                                        </li>
                                    </ul>
                                </div>
                                <div className="user_bsinfo">
                                    <h6>Benefits</h6>
                                    <ul>
                                        <li>
                                            <span className="text-danger italic">Not defined</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="user_bsinfo">
                                    <h6>Description</h6>
                                    <ul>
                                        {/* <li>Job details-{createRevisedJobData?.job_title}</li>
                                        <li>{createRevisedJobData?.job_company?.company_name} </li>
                                        <li>
                                            Area: {locationBadges?.map((city, index) => (
                                                <>{city?.location_name}{index !== locationBadges.length - 1 && ", "}</>
                                            ))}
                                        </li>
                                        <li>
                                            Experience: {updateFormData?.min_exp}-
                                            {updateFormData?.max_exp} Years
                                        </li>
                                        <li>Role: {restrictedRoleBadges?.map((Val, index) => (
                                            <>{Val?.is_like_name}{index !== restrictedRoleBadges.length - 1 && ", "}</>
                                        ))}</li>
                                        <li>
                                            Industry type: {IndustriesBadges?.map((Val, index) => (
                                                <>{Val?.industry_name}{index !== IndustriesBadges.length - 1 && ", "}</>
                                            ))}
                                        </li>
                                        <li>Employment: {`${createRevisedJobData?.job_type}/Contract`}</li> */}
                                        <li>{createRevisedJobData?.detailed_description?.replace(/&nbsp;/g, ' ')}</li>
                                    </ul>
                                </div>
                                {/* <div className="user_bsinfo">
                                    <h6>Key Responsibilities</h6>
                                    <ul>
                                        <li>
                                            Collecting plant data and providing design feedback to team
                                        </li>
                                        <li>
                                            Performing material balance, energy balance for the plant
                                            along with utility calculations.
                                        </li>
                                        <li>
                                            Determining sizes and specifications for equipment and
                                            instruments before procurement.
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                            <div className="recomed_panel">
                                <div className="recomed_head">
                                    <h6>Recommendations</h6>
                                    <ProgressBar now={calculateRecommend.length * 10} />
                                </div>
                                <ul class="rects_list2 px-3">
                                    {(!updateFormData?.salary_price_type || !updateFormData?.min_salary || !updateFormData?.max_salary || !updateFormData?.salary_type) && (
                                        <li class={`${openStep[0] == '1' && "active"}`}>
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 1L5.34925 3.60299C5.22227 4.11092 5.15878 4.36489 5.02654 4.57154C4.90958 4.75434 4.75434 4.90958 4.57154 5.02654C4.36489 5.15878 4.11092 5.22227 3.603 5.34925L1 6L3.60299 6.65075C4.11092 6.77773 4.36489 6.84122 4.57154 6.97346C4.75434 7.09042 4.90958 7.24566 5.02654 7.42846C5.15878 7.63511 5.22227 7.88908 5.34925 8.397L6 11L6.65075 8.39701C6.77773 7.88908 6.84122 7.63511 6.97346 7.42846C7.09042 7.24566 7.24566 7.09042 7.42846 6.97346C7.63511 6.84122 7.88908 6.77773 8.397 6.65075L11 6L8.39701 5.34925C7.88908 5.22227 7.63511 5.15878 7.42846 5.02654C7.24566 4.90958 7.09042 4.75434 6.97346 4.57154C6.84122 4.36489 6.77773 4.11092 6.65075 3.603L6 1Z"
                                                    stroke="black"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                            <p>
                                                Add a preferred <strong>salary</strong> even if not
                                                displayed to applicant.
                                            </p>
                                        </li>
                                    )}
                                    {(badges?.length == 0 || !updateFormData?.minimum_education) && (
                                        <li class={`${openStep[0] == '2' && "active"}`}>
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 1L5.34925 3.60299C5.22227 4.11092 5.15878 4.36489 5.02654 4.57154C4.90958 4.75434 4.75434 4.90958 4.57154 5.02654C4.36489 5.15878 4.11092 5.22227 3.603 5.34925L1 6L3.60299 6.65075C4.11092 6.77773 4.36489 6.84122 4.57154 6.97346C4.75434 7.09042 4.90958 7.24566 5.02654 7.42846C5.15878 7.63511 5.22227 7.88908 5.34925 8.397L6 11L6.65075 8.39701C6.77773 7.88908 6.84122 7.63511 6.97346 7.42846C7.09042 7.24566 7.24566 7.09042 7.42846 6.97346C7.63511 6.84122 7.88908 6.77773 8.397 6.65075L11 6L8.39701 5.34925C7.88908 5.22227 7.63511 5.15878 7.42846 5.02654C7.24566 4.90958 7.09042 4.75434 6.97346 4.57154C6.84122 4.36489 6.77773 4.11092 6.65075 3.603L6 1Z"
                                                    stroke="black"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                            <p>
                                                Select multiple <strong>educational fields</strong> to
                                                expand candidate pool
                                            </p>
                                        </li>
                                    )}
                                    {(setClassName() != "active" || restrictedRoleBadges.length == 0 || IndustriesBadges.length == 0) && (
                                        <li class={`${openStep[0] == '3' && "active"}`}>
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 1L5.34925 3.60299C5.22227 4.11092 5.15878 4.36489 5.02654 4.57154C4.90958 4.75434 4.75434 4.90958 4.57154 5.02654C4.36489 5.15878 4.11092 5.22227 3.603 5.34925L1 6L3.60299 6.65075C4.11092 6.77773 4.36489 6.84122 4.57154 6.97346C4.75434 7.09042 4.90958 7.24566 5.02654 7.42846C5.15878 7.63511 5.22227 7.88908 5.34925 8.397L6 11L6.65075 8.39701C6.77773 7.88908 6.84122 7.63511 6.97346 7.42846C7.09042 7.24566 7.24566 7.09042 7.42846 6.97346C7.63511 6.84122 7.88908 6.77773 8.397 6.65075L11 6L8.39701 5.34925C7.88908 5.22227 7.63511 5.15878 7.42846 5.02654C7.24566 4.90958 7.09042 4.75434 6.97346 4.57154C6.84122 4.36489 6.77773 4.11092 6.65075 3.603L6 1Z"
                                                    stroke="black"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                            <p>
                                                Add a preferred work <strong>experience</strong>
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <Modal
                show={selectedpersonality.modal_isOpen}
                onHide={handleCloseModal}
                animation={false}
                size="md"
                backdrop={false}
                className="indleffort-mdl"
            >
                <Modal.Header closeButton>
                    <img src={LeaderIcn} />
                    <Modal.Title>
                        <span className="count">{selectedpersonality?.modal_data?.behaviours_name?.slice(0, 1)}</span>
                        {selectedpersonality?.modal_data?.behaviours_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-5 px-4">
                    <h2 className="h2_title">
                        <span className="count">{selectedpersonality?.modal_data?.behaviours_name?.slice(0, 1)}</span>
                        {selectedpersonality?.modal_data?.behaviours_name}
                    </h2>
                    <div className="indleffort-text">
                        <p>{selectedpersonality?.modal_data?.behaviour_desctiption}</p>
                        {selectedpersonality?.modal_data.suvcm?.map((item, index) => (<ul>
                            <li>
                                <strong>Strengths</strong>
                                <p>{item.Strengths}</p>
                            </li>
                            <li>
                                <strong>Uniqueness</strong>
                                <p>{item.Uniqueness}</p>
                            </li>
                            <li>
                                <strong>Value to Org.</strong>
                                <p>{item.Value_to_ORG}</p>
                            </li>
                            <li>
                                <strong>Challenges</strong>
                                <p>{item.Challenges}</p>
                            </li>
                            <li>
                                <strong>Motivations</strong>
                                <p>{item.Motivation}</p>
                            </li>
                        </ul>))}
                    </div>
                </Modal.Body>
            </Modal>
            <HelpChoose
                show={showHelpChoose} setShow={setShowHelpChoose}
                behaviours={behaviours} createUid={createUid}
                isIndex={isIndex} setIsIndex={setIsIndex}
                selectedItem={selectedItem} setSelectedItem={setSelectedItem}
                selectedItem1={selectedItem1} setSelectedItem1={setSelectedItem1}
                selectedItem2={selectedItem2} setSelectedItem2={setSelectedItem2}
                selectedItem3={selectedItem3} setSelectedItem3={setSelectedItem3}
                totalItem={totalItem} setTotalItem={setTotalItem}
                important={important} setImportant={setImportant} setIsUpdated={setIsUpdated}
                helpChooseOption={helpChooseOption} setHelpChooseOption={setHelpChooseOption}
                setBehaviours={setBehaviours}
            />
        </>
    );
};

export default UpdateJobsRevised;
