import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";

import RangeSlider from "../../components/RangeSilder";
import Edit03 from "../../images/icons/edit-0303.svg";
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
} from "../../services/provider";
import { removeToken } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateJobsRevised = ({
  show,
  handleClose,
  handleCreateForm,
  handleFormData,
  setCreatedUid,
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
  setBehaviours
}) => {
  const [createRevisedJobData, setCreateRevisedJobData] = useState(null);
  const [components, setComponents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [priceRangeType, setPriceRangeType] = useState("Salary-range");
  const [expRangeType, setExpRangeTpe] = useState("Range");
  const [industries, setIndustries] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(50);
  const [activeKeyAdd, setActiveKeyAdd] = useState(false);
  const [questionType, setQuestionType] = useState("single");
  const [activeKey, setActiveKey] = useState(null);
  const [addSubSkill, setAddSubSkill] = useState([]);
  const [addSkillGroup, setAddSkillGroup] = useState([]);
  const [customValue, setCustomValue] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [skillngroupList, setskillngroupList] = useState([]);
  const [showSkillList, setShowSkillList] = useState(false);
  const [skillGroupData, setSkillGroupsData] = useState(null);
  const [personalityData,setPersonalityData]=useState()
  const [selectedpersonality,setSelectedpersonality]=useState({
    modal_name:"",
    modal_data:{}
  })
  const navigate = useNavigate();
  const behaviourResponse = [
    {
      behaviours_name:"Pioneer",
      behaviour_type_name:"(D/ISC) High Dominance",
      behaviour_desctiption:"Pioneers are often ambitious, competitive, and strong-willed individuals. They have a very high need to achieve and continually seek new horizons. Their self-reliance and independent thinking drive them to escape convention and create innovative solutions. They are direct and assertive and apt at influencing people. They are dynamic, adaptable, and willing to do anything to overcome obstacles. Pioneers are persistent in their pursuit of desired results. Overcome by their desire to achieve their goals, they might fail to take other people’s feelings into consideration. Additionally, they have high expectations of others and can be critical if their standards are not met.",
      suvcm:[{Strengths:"Action-oriented, resourceful, self-reliant, decisive, proactive, strong-willed, direct",Uniqueness:"Sound decision making, self-motivated, excels in emergencies",Value_to_ORG:"Innovative solutions; taking responsibility",Challenges:"Too independent, tends to be blunt, boredom",Motivation:"New opportunities, strong need to achieve, power and structure."}]
    },
    {
      behaviours_name:"Influencer",
      behaviour_type_name:"(I/DSC) High Influence",
      behaviour_desctiption:"Influencers are confident, outgoing and friendly individuals who love to be the center of attention. They seek out situations that involve meeting people and socializing. Their confidence combined with a genuine interest in ideas and people, allows them to interact easily, and positively in almost any situation. These strong communicators are assertive, intuitive, and adaptive. They thrive in meetings, committees, and conferences. They may need a constant dose of Approval. They also might sometimes lose focus on timelines and the tasks at hand.",
      suvcm:[{Strengths:"Fun, persuasive, ideas-oriented, creative, original, networkers, intuitive",Uniqueness:"Openness, strong communication, social confidence",Value_to_ORG:"Contributing original ideas, improve and extend coordination within team",Challenges:"Needs constant approval, pressured conditions",Motivation:"Being surrounded by people, supportive and collaborative environment"}]
    },
    {
      behaviours_name:"Team Player",
      behaviour_type_name:"(S/DIC) High Steadiness",
      behaviour_desctiption:"Team players are friendly, calm, and thoughtful individuals that like doing practical jobs. Amidst their calm nature, controlled stance, modest attitude, and excellent listening skills, they tend to empathize with others ’perspectives. They value positive interactions and are always willing to help. They depend on more socially assertive people to take the lead. Their persistence and patience enable them to work steadily until the task is completed. They value trust strongly and enjoy being part of a smaller team where they are valued and appreciated. Typically, they resist change and need help in developing alternative solutions.",
      suvcm:[{Strengths:"Flexibility, dependability, harmony, warmth, listening, team-focused, loyal",Uniqueness:"Listens effectively, supportive, works steadily",Value_to_ORG:"Capable of dealing with laborious tasks; works on a task until it is achieved",Challenges:"Sudden change; interruptions and distractions",Motivation:"Helping others succeed; support of people; doing practical jobs"}]
    },
    {
      behaviours_name:"Logical Thinker",
      behaviour_type_name:"(C/DIS) High Compliance",
      behaviour_desctiption:"Logical thinkers are hardworking, logical, and detail-oriented individuals with high critical thinking abilities. Their habit of meticulous preparation, accuracy, and correctness helps them to manage tasks effectively. Despite being shy and mild-mannered, logical thinkers have a strong need to control their environment. They exert rules, structure, and standards, to accomplish their goals, in conflicting situations. Their cautiousness makes them reluctant to reveal information about themselves or their thoughts unless necessary. Being natural risk avoiders, they only undertake tasks when they are completely certain about the outcome.",
      suvcm:[{Strengths:"Quality control, handling detail, analyzing data, logical, avoiding the risk, building structure, being deliberate and methodical",Uniqueness:"Accuracy; ability to think logically; building structure",Value_to_ORG:"Completes the undertaken task; great at quality control; organizing information",Challenges:"Spotting deficiencies first; controlling; lacks assertiveness",Motivation:"Certainty of situation and consequences; getting things right"}]
    },
    {
      behaviours_name:"Persuader",
      behaviour_type_name:"(DI/SC) High Dominance and Influence",
      behaviour_desctiption:"Persuaders are assertive, adventurous, and confident individuals with strong social skills. They can be charming or demanding, based on the circumstances. They tend to approach people and situations with energy. While communicating, they can be both assertive and persuasive. Their ability to think and react quickly lets them easily adapt to challenging situations. They have no fear of confrontation and address issues directly. They have clear goals in life and achieve them with sheer determination and commitment. Persuaders thrive in situations that others would find impossibly stressful and difficult. They live for and are happiest when on adventures",
      suvcm:[{Strengths:"Charming, visionary, adventurous, bold, high energy, results-focused, exciting and fun",Uniqueness:"Sound decision making, self-motivated, excels in emergencies",Value_to_ORG:"Thrives under pressure; motivates people; commits and achieves results",Challenges:"Stagnation; can get aggressive under pressure",Motivation:"Success and recognition; new experiences and challenges"}]
    },
    {
      behaviours_name:"Achiever",
      behaviour_type_name:"(DS/IC) High Dominance and Steadiness",
      behaviour_desctiption:"This is an extremely rare profile with radically different sets of values and motivations. Achievers are reliable, persistent, tenacious, and industrious individuals with a strong sense of personal accountability. They like to get things done in a friendly but thorough manner. They are focused on results with a strong inclination towards fair play and respect. Their careful planning allows them to complete tasks within realistic timescales. They tend to be thoughtful in favorable conditions and demanding at times of pressure. Achievers are usually cautious and only open up to a small set of people they completely trust. They function at peak efficiency and expect recognition equal to their contribution.",
      suvcm:[{Strengths:"Patient, tenacious, dependable, consistent, protective, kind, watchful",Uniqueness:"Methodical in approach; accountability of work",Value_to_ORG:"Self-driven and completes tasks effectively",Challenges:"Poor communication; inferior work",Motivation:"Personal and professional accomplishments"}]
    },
    {
      behaviours_name:"Perfectionist",
      behaviour_type_name:"(DC/IS) High Dominance and Compliance",
      behaviour_desctiption:"Perfectionists are tenacious, competitive, systematic, and creative individuals with opposing behavioral forces. They seek immediate results and have an equally strong desire for perfection. Their ability to plan and achieve quality allows them to make sound decisions. They think and act quickly but also evaluate all options before agreeing to a course of action. In their drive for results and perfection, they demand the freedom to explore and the authority to examine. They are straightforward and enjoy working by themselves. They tend to be careful with relationships and prefer a strategic approach when dealing with others. They are open to change but extremely cautious.",
      suvcm:[{Strengths:"Tenacity, quality control, handling large amounts of detail, analyzing data, building systems, competing to win, results-focused, striving to be the best",Uniqueness:"Attention to detail; tries innovative approaches using existing systems",Value_to_ORG:"Can bring positive change to the team by challenging them and raising the standards",Challenges:"Bored with routine work; gets lost in detail",Motivation:"Unique accomplishments and dominance"}]
    },
    {
      behaviours_name:"Assessor",
      behaviour_type_name:"(IC/DS) High Influence and Compliance",
      behaviour_desctiption:"Assessors are articulate, creative, organized, and well-researched individuals with a unique blend of contradicting traits. They seek the company of others but are also exhausted by them. On one hand, they are outgoing and impulsive in favorable conditions yet in formal situations, they are precise and rule-abiding. They are naturally skilled at influencing people with strong communication. They are imaginative, perceptive and strive for perfection. They elicit cooperation from others by being considerate. They have the desire to win and can overwork to the point of exhaustion. They are practical and ensure progressive results by developing a detailed plan of action.",
      suvcm:[{Strengths:"Articulate, well-researched, produce quality results, self-disciplined, careful, expressive, enthusiastic, fun",Uniqueness:"Turning dreams into workable concepts; result-oriented and quality-driven",Value_to_ORG:"Brings new ideas to the table; team players that instigate action and activities",Challenges:"Not knowing when to stop; sensitive to criticism",Motivation:"Winning attention and approval; succeeding at all costs"}]
    },
    {
      behaviours_name:"Implementor",
      behaviour_type_name:"(SC/DI) High Steadiness and Compliance",
      behaviour_desctiption:"Implementors are stable, consistent, pragmatic, and accommodating individuals that are driven by patience, accuracy, and logic. They are precise thinkers and through precautions avoid the unexpected. They prefer traditional approaches. They question assumptions and require loads of information that they can analyze when exploring alternatives and before reaching conclusion. They enjoy overcoming challenges through persistence and intense focus. They are calm and rational folks, and they rarely provide input in a group.They hold themselves to high standards and desire to earn the respect of those around them.",
      suvcm:[{Strengths:"Dependable, stable, careful, accurate, hard working, patient, diplomatic",Uniqueness:"Brings stability on board; sticks to “fail safe” options",Value_to_ORG:"Works diligently to get the job done; maintains quality and standards",Challenges:"Reluctant to change; takes time to adapt",Motivation:"Predictable and stable outcomes; recognition for work"}]
    },
    {
      behaviours_name:"Motivator",
      behaviour_type_name:"(DIS/C) High Dominance, Influence and Steadiness",
      behaviour_desctiption:"This is an extremely rare profile with radically different sets of values and motivations. Achievers are reliable, persistent, tenacious, and industrious individuals with a strong sense of personal accountability. They like to get things done in a friendly but thorough manner. They are focused on results with a strong inclination towards fair play and respect. Their careful planning allows them to complete tasks within realistic timescales. They tend to be thoughtful in favorable conditions and demanding at times of pressure. Achievers are usually cautious and only open up to a small set of people they completely trust. They function at peak efficiency and expect recognition equal to their contribution.",
      suvcm:[{Strengths:"Dependable, socially skilled, patient, warm, interesting and fun, driven to achieve, self-reliant",Uniqueness:"Clarity on goals and ways to accomplish; control over circumstances",Value_to_ORG:"Confidently suggests innovative ideas; assigns tasks effectively",Challenges:"Being asked to investigate too much detail; routine and regimen",Motivation:"New opportunities; strong need to achieve"}]
    },
    {
      behaviours_name:"Mediator",
      behaviour_type_name:"(ISC/D) High Influence, Steadiness and Compliance",
      behaviour_desctiption:"Mediators are creative, well-spoken, and understanding individuals that enjoy being a team member and helping others succeed. They love being in a supportive role and can bring valuable insights if given the time needed to think. They are rational in problem-solving and adept at presenting arguments in a credible manner. Their insistence on taking things at their own pace might not be agreeable to all. They prefer a cooperative environment where people are trustworthy and pleasant. They thrive on their contribution to projects that require attention to detail. They have high expectations of themselves and others around them and might voice disapproval when their expectations are not met.",
      suvcm:[{Strengths:"Productive, well-spoken, researching, harmonious, collaborative, co-operative, detail-oriented, patient",Uniqueness:"Accommodating and inspiring",Value_to_ORG:"Skilled and proficient in problem solving; highly skilled",Challenges:"Aversion to risks and being too predictable; not recognized as experts.",Motivation:"Supporting and interacting with others; learning from and teaching to others."}]
    },
    {
      behaviours_name:"Collaborator",
      behaviour_type_name:"(IS/DC) High Influence and Steadiness",
      behaviour_desctiption:"Collaborators are warm, empathetic, easygoing and relaxed individuals that socialize with ease. They tend to think of others first over themselves. They strive to maintain harmony and build long-term relationships. Being good listeners, they make others feel heard and offer suggestions gently. They are sympathetic in nature and fulfil supportive roles well. They often provide recognition to others and attribute less importance to task accomplishment. They love to work in team settings and appreciate environments that ensure stability with minimal change. While they generally avoid conflict and confrontation, they are willing to mediate with others to restore harmony.",
      suvcm:[{Strengths:"Versatile, warm, responsive, upbeat, respectful, loyal, enthusiastic",Uniqueness:"Group acceptance and approval; friendliness",Value_to_ORG:"Effective listening skills; bring stability and harmony to the team",Challenges:"Conflicting situations; over-commitment; boredom; cannot confront or give direct orders.",Motivation:"Recognition from people around; peaceful environment where they can collaborate with others"}]
    },
    {
      behaviours_name:"Administrator",
      behaviour_type_name:"(DSC/I) High Dominance, Steadiness and Compliance",
      behaviour_desctiption:"Administrators are steady, objective, clear-minded and analytical individuals that get results and keep the team happy at the same time. They have a clear view of their aims in life. Their patience and thoughtfulness help them avoid risks. They guard their thoughts and reveal them only after careful thought and consideration. They choose their words carefully, make practical decisions, and rely upon logic rather than emotion. They possess the drive to track detail and the desire to build the harmony needed to run the team. While being good executors, they rarely bring in the imagination and vision needed for innovative initiatives.They can be both dominant and supportive based on the situation.",
      suvcm:[{Strengths:"Productive, efficient, practical, pragmatic, thoughtful, detail-oriented, patient",Uniqueness:"Uses logic effectively to get results",Value_to_ORG:"Works with determination; can work individually or with others",Challenges:"Tendency to get overworked; being blunt; not creative",Motivation:"Achieving results by taking time to adapt to changing situations; attention to detail; avoiding risk"}]
    },
    {
      behaviours_name:"Leader",
      behaviour_type_name:"(DIC/S) High Dominance, Influence and Compliance",
      behaviour_desctiption:"Leaders are practical, innovative, self-reliant, and ambitious individuals that are always pushing to makethings better. They are friendly, charming, and enthusiastic in casual circumstances but tend to be direct,forthright, and assertive in formal setups. They like taking responsibility and taking credit for both wins and losses, as long as they have control of the results. They do not shy away from taking command when needed and may be impatient with the inefficiencies of others. They are sensitive to the needs of the team. They find a balance between personal ambitions and group goals. They are very clear thinkers, make good decisions and promote harmony in the team.",
      suvcm:[{Strengths:"Driven, innovative, practical, self-reliant, leadership ability, confident, clear thinking",Uniqueness:"Accommodating and inspiring; drive to make things better",Value_to_ORG:"Persistently accomplishes goals with inclusivity of team",Challenges:"Impatience when things don’t go a certain way; being managed",Motivation:"Opportunity to get things done in their way; supporting the team"}]
    },
  ]
  const getJobDetails = async () => {
    const url = `https://bittrend.shubansoftware.com/assets-api/job-detail-api/${createJobUid}/`;
    try {
      const response = await getJobDetailsApi(url);
      setCreateRevisedJobData(response.data.response);
      setCreatedUid(response.data.response.uid);
      if(response?.data?.response?.calculation_job.length>0){
        const personalityKeys = Object.keys(response?.data?.response?.calculation_job[0].personality_data);
        const updatedBehaviourResponse = behaviourResponse.map(item => ({
          ...item,
          personality_percentage: response?.data?.response?.calculation_job[0].personality_data[item.behaviour_type_name] || 0 // Default to 0 if no match
        }));
        const matchedBehaviours = updatedBehaviourResponse.filter(item =>
          personalityKeys.includes(item.behaviour_type_name)
        );
       
        setPersonalityData(matchedBehaviours)
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

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();

      getQualificationListByCourse(inputValue);
    }
  };

  const handleKeyPressForIndustries = async (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      getShortlistedIndustries(inputValue);
    }
  };

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

  const getQualificationListByCourse = async (inputVal) => {
    let url;
    if (inputVal != "") {
      url = `https://bittrend.shubansoftware.com/assets-api/education-qualification-list-by-course-api/${minEdu}/?page=1&limit=10&search=${inputVal}`;
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
        setIndustriesBadge((prevBadges) => [
          ...prevBadges,
          response?.data?.response[0],
        ]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

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
      setMinValue(value);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      if (value >= minValue && value <= 50) {
        setMaxValue(Math.min(value, 50)); // Cap the value at 40
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

  const handleSaveCustomQuestion = async () => {
    const formData = new FormData();

    // Append each question and its data to the FormData object
    components.forEach((question, index) => {
      formData.append("job_question", question.job_question);
      formData.append("question_title", question.question_title);
      formData.append("quiz_type", question.quiz_type);
      formData.append("is_mandatory", question.is_mandatory);
      formData.append("question_option", question.question_option);
      formData.append("questions_answer", question.questions_answer);
    });

    try {
      const response = await CreateJobQuestion(formData);
      if (response.data.status == 200) {
        alert("Question Saved Successfully");
        getJobDetails();
      }
    } catch {}
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
      value === "single" ? "MCQ Single" : "MCQ Multiple";
    setComponents(updatedComponents);
    setQuestionType(value);
  };

  // Function to add a new response option
  const handleAddResponse = (questionIndex) => {
    const updatedComponents = [...components];
    updatedComponents[questionIndex].question_option.part1.push(""); // Add a new empty option
    setComponents(updatedComponents);
  };

  // Function to add a new question component
  const handleAddComponent = () => {
    const newQuestion = {
      job_question: "989fc873-0c8a-494f-9e01-977aa0bec036", // pass job uid
      question_title: "",
      quiz_type: "MCQ",
      question_option: {
        part1: [""], // Start with an empty array for new questions
      },
      questions_answer: [],
      is_mandatory: "True", // pass True or False value
    };

    setComponents([...components, newQuestion]);
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

  const handlesubSkillAdd = () => {
    const CreateCustomLabel = {
      created_at: "",
      id: 0,
      skill_group: 0,
      skill_name: "",
      uid: "",
      updated_at: "",
    };
    setAddSubSkill((prev) => [...prev, CreateCustomLabel]);
  };

  const handleAddSkillGroup = () => {
    const newForm = {
      id: Date.now(),
    };
    setAddSkillGroup([...addSkillGroup, newForm]);
  };

  const handleDeleteGroup = (index) => {
    setAddSkillGroup((prev) => prev.filter((_, i) => i !== index));
  };
  const hadleDeleteCurrentSkill = (index) => {
    setAddSubSkill((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveSkillGroup = async () => {
    setSkillGroupsData(null);
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
        setSkillGroupsData(response.data.response);
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
  };

  const handleBlur = async (value) => {
    const formdata = new FormData();
    formdata.append("skill_group", skillGroupData.uid);
    formdata.append("skill_name", value);

    try {
      const response = await addSkill(formdata);
      if (response.data.status == 200) {
        getSkillGroupDetails(skillGroupData.uid);
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
  };

  const getSkillGroupDetails = async (id) => {
    setSkillGroupsData(null);
    const url = `https://bittrend.shubansoftware.com/assets-api/skill-group-detail-api/${id}/`;
    try {
      const response = await getSkillGroupDetailsApi(url);
      if (response) {
        setShowSkillList(false);
        setSkillGroupsData(response.data.response);
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

  const handleSelectedSkill = (benefititem) => {
    setSelectSkillsData((prevState) =>
      prevState.includes(benefititem)
        ? prevState.filter((item2) => item2 !== benefititem)
        : [...prevState, benefititem]
    );
  };

  const countSelectedItems = () => {
    const selectedCount = behaviours.filter((item) => item.isSelected).length;
    const markedImportantCount = behaviours.filter(
      (item) => item.markedImportant
    ).length;
    return { selectedCount, markedImportantCount };
  };

  const handleBoxClick = (index) => {
    const { selectedCount, markedImportantCount } = countSelectedItems();

    setBehaviours((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          // Allow toggling only if:
          // 1. The item is not already selected, and the selectedCount is less than 4.
          // 2. The item is already selected (to allow deselecting).
          if (!item.isSelected && selectedCount < 4) {
            return { ...item, isSelected: !item.isSelected };
          } else if (item.isSelected) {
            return { ...item, isSelected: !item.isSelected };
          }
        }
        return item;
      })
    );
  };

  const handleStarClick = (index, e) => {
    e.stopPropagation(); // Prevent the box click handler from being triggered
    const { markedImportantCount } = countSelectedItems();

    setBehaviours((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          // Allow toggling only if:
          // 1. The item is not already markedImportant, and the markedImportantCount is less than 2.
          // 2. The item is already markedImportant (to allow unmarking).
          if (!item.markedImportant && markedImportantCount < 2) {
            return { ...item, markedImportant: !item.markedImportant };
          } else if (item.markedImportant) {
            return { ...item, markedImportant: !item.markedImportant };
          }
        }
        return item;
      })
    );
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
              <li className="active">
                <a href="#item_salary">
                  Salary <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_edu">
                  Education <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_Exp">
                  Experience <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_Target">
                  Target Hire Date{" "}
                  <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_lang">
                  Language <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#item_Geog">
                  Geography <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            <h6>Skills</h6>
            <ul className="checklist">
              <li>
                <a href="#">
                  Skills <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  Custom Questions{" "}
                  <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            <h6>Personality</h6>
            <ul className="checklist">
              <li>
                <a href="#">
                  Behaviours <i class="fa fa-check" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </Col>
          <Col md={7} lg={8} className="jobMain_panel">
            <Accordion defaultActiveKey={["0", "8", "7", "10"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Requirements</Accordion.Header>
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
                <Accordion.Header>
                  Salary
                  <svg
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
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="align-items-center mb-3">
                    <div className="form-group w-auto mb-0">
                      <Form.Select
                        name="salary_price_type"
                        aria-label="Default select example"
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
                      >
                        <option>Select..</option>
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
                          />
                          <Form.Check
                            inline
                            onChange={handleFormData}
                            label="Non Negotiable"
                            name="non_negotiable_salary"
                            type={type}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button
                      onClick={handleCreateForm}
                      type="button"
                      class="btn btn-lightgray"
                    >
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2" className="accd_child" id="item_edu">
                <Accordion.Header>
                  Educational Qualification{" "}
                  <svg
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
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="sm-label">
                        Minimum Education
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="sm-fselect"
                        name="minimum_education"
                        onChange={(e) => {
                          setMinEdu(e.target.value);
                          handleFormData(e);
                        }}
                      >
                        <option>Select...</option>
                        <option value="High school">High school</option>
                        <option value="Bachelors Degree">
                          Bachelors Degree
                        </option>
                        <option value="Master Degree">Master Degree</option>
                        <option value="Diploma ">Diploma </option>
                        <option value="PG Diploma">PG Diploma</option>
                        <option value="PhD">PhD</option>
                        <option value="Post Doctorate">Post Doctorate</option>
                      </Form.Select>
                      <span className="required_text">
                        Select the minimum level of education that you would
                        require
                      </span>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="sm-label">
                        Areas of Education
                      </Form.Label>
                      <div className="tagarea p-2">
                        {badges.map((badge, index) => (
                          <Badge key={index} bg="light" className="me-2 mb-2">
                            {badge?.qualification_name}
                            <button
                              className="btn"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleRemoveBadge(index)}
                            >
                              <i className="fa fa-close ms-1"></i>
                            </button>
                          </Badge>
                        ))}
                        <Form.Control
                          type="text"
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
                          />
                          <Form.Check
                            inline
                            label="Other Areas are Acceptable"
                            name="other_areas_acceptable"
                            onChange={handleFormData}
                            type={type}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button
                      type="button"
                      onClick={handleCreateForm}
                      class="btn btn-lightgray"
                    >
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="accd_child" id="item_Exp">
                <Accordion.Header>
                  Experience{" "}
                  <svg
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
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
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
                            type="number"
                            className="sm-fcontrol w-150"
                            name="min_exp"
                            onChange={(e) => {
                              handleFormData(e);
                              handleMinInputChange(e);
                            }}
                            value={minValue}
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
                            value={maxValue}
                            name="max_exp"
                            onChange={(e) => {
                              handleFormData(e);
                              handleMaxInputChange(e);
                            }}
                          />
                        )}
                        <RangeSlider
                          minValue={minValue}
                          setMinValue={setMinValue}
                          displayMaxValue={displayMaxValue}
                          maxValue={maxValue}
                          setMaxValue={setMaxValue}
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

                        <div className="tagarea p-2">
                          {IndustriesBadges.map((badge, index) => (
                            <Badge key={index} bg="light" className="me-2 mb-2">
                              {badge?.industry_name}

                              <button
                                className="btn"
                                style={{ cursor: "pointer" }}
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
                            placeholder="Enter text"
                            onChange={(e) => {
                              setInputValue(e?.target?.value);
                            }}
                            onKeyDown={handleKeyPressForIndustries}
                          />
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

                        <div className="tagarea p-2">
                          {restrictedRoleBadges.map((badge, index) => (
                            <Badge key={index} bg="light" className="me-2 mb-2">
                              {badge?.is_like_name}

                              <button
                                className="btn"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemoveRoleBadge(index)}
                              >
                                <i className="fa fa-close ms-1"></i>
                              </button>
                            </Badge>
                          ))}

                          <Form.Control
                            type="text"
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
                      onClick={handleCreateForm}
                      class="btn btn-lightgray"
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
                <Accordion.Header>
                  Target Hire Date{" "}
                  <svg
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
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="align-items-center">
                    <Form.Group
                      className="mb-3 col-md-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        name="targate_hire_date"
                        disabled={isDisabledTarget ? true : false}
                        onChange={handleFormData}
                        type="date"
                        placeholder="DD/MM/YYYY"
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
                          />
                        </div>
                      ))}
                    </Form>
                    <button
                      type="button"
                      onClick={handleCreateForm}
                      class="btn btn-lightgray"
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
                <Accordion.Header>
                  Language{" "}
                  <svg
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
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  {isSpecificLanguareRequired && (
                    <Form className="row">
                      <Form.Group
                        className="mb-3 col-md-6"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label className="sm-label">
                          Spoken Language
                        </Form.Label>
                        <div className="tagarea p-2">
                          {spokenLanguageBadges.map((badge, index) => (
                            <Badge key={index} bg="light" className="me-2 mb-2">
                              {badge?.language_name}
                              <button
                                className="btn"
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
                            placeholder="Enter text"
                            onChange={(e) => {
                              setInputValue(e?.target?.value);
                            }}
                            onKeyDown={(e) => {
                              handleKeyPressForlanguages(e, "spoken");
                            }}
                          />
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
                        <div className="tagarea p-2">
                          {rdnwBadges.map((badge, index) => (
                            <Badge key={index} bg="light" className="me-2 mb-2">
                              {badge?.language_name}
                              <button
                                className="btn"
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
                            placeholder="Enter text"
                            onChange={(e) => {
                              setInputValue(e?.target?.value);
                            }}
                            onKeyDown={(e) => {
                              handleKeyPressForlanguages(e, "rdnw");
                            }}
                          />
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
                          />
                        </div>
                      ))}
                    </Form>
                    <button
                      type="button"
                      onClick={handleCreateForm}
                      class="btn btn-lightgray"
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
                <Accordion.Header>
                  Geography{" "}
                  <svg
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
                  </svg>
                </Accordion.Header>
                <Accordion.Body>
                  {isHideLocation && (
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label className="sm-label">
                          Preferred States / Cities / Towns
                        </Form.Label>
                        <div className="tagarea p-2">
                          {locationBadges.map((badge, index) => (
                            <Badge key={index} bg="light" className="me-2 mb-2">
                              {badge?.location_name}
                              <button
                                className="btn"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemoveLocationBadge(index)}
                              >
                                <i className="fa fa-close ms-1"></i>
                              </button>
                            </Badge>
                          ))}
                          <Form.Control
                            type="text"
                            placeholder="Enter text"
                            onChange={(e) => {
                              setInputValue(e?.target?.value);
                            }}
                            onKeyDown={handleKeyPressForLocation}
                          />
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
                          />
                          <Form.Check
                            inline
                            label="Relocation Expenses Covered"
                            name="relocation_cost_covered"
                            type={type}
                            onChange={handleFormData}
                            id={`inline-${type}-2`}
                          />
                        </div>
                      ))}
                    </Form>
                    <button
                      type="button"
                      onClick={handleCreateForm}
                      class="btn btn-lightgray"
                    >
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  Skills and Other Requirements
                </Accordion.Header>
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
                <Accordion.Header>
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
                <Accordion.Body>
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
                  {skillGroupData && (
                    <div className="starttag_box">
                      <div className="stagbox_head">
                        <h6>{skillGroupData.skill_group_name}</h6>
                      </div>
                      <div className="stag_list mt-2">
                        {skillGroupData &&
                          skillGroupData.group_skill.length > 0 &&
                          skillGroupData.group_skill.map((skill, index) => (
                            <span
                              onClick={(e) => {
                                handleSelectedSkill(skill);
                              }}
                              className={`stag_item ${
                                SelectSkillsData.includes(skill) ? "active" : ""
                              }`}
                            >
                              {skill.skill_name}
                              {/* <i className="far fa-star ms-1"></i> */}
                            </span>
                          ))}

                        {addSubSkill.map((item, index) => (
                          <span
                            onClick={(e) => {
                              handleSelectedSkill(item);
                            }}
                            className={`stag_item ${
                              SelectSkillsData.includes(item) ? "active" : ""
                            }`}
                          >
                            <input
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
                      {addSkillGroup && addSkillGroup[0] && (
                        <p className="mt-1">
                          Add at least 6 individual skills within this skill
                          Group
                        </p>
                      )}

                      <div className="stag_list mt-2">
                        {addSubSkill.map((item, index) => (
                          <span
                            onClick={(e) => {
                              handleSelectedSkill(item);
                            }}
                            className={`stag_item ${
                              SelectSkillsData.includes(item) ? "active" : ""
                            }`}
                          >
                            <input
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
                  ))}
                  <div className="accordion_footer mt-3 justify-content-end">
                    <button
                      onClick={handleCreateForm}
                      type="button"
                      class="btn btn-lightgray"
                    >
                      Next
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion activeKey={activeKey}>
                <Accordion.Item eventKey="9" className="accd_child">
                  <Accordion.Header>
                    Custom Questions{" "}
                    <div>
                      <button
                        type="button"
                        onClick={(e) => {
                          setActiveKeyAdd(true);
                          setActiveKey("9");
                          handleAddComponent(e);
                        }}
                        class="btn btn-lightgray"
                      >
                        <i className="fa fa-plus me-2"></i>
                        Add
                      </button>
                      <div
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
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="starttag_box ctmqus_panel mt-0">
                      {!activeKeyAdd &&
                        createRevisedJobData?.question_job?.length > 0 && (
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
                              {questionIndex === 0 && (
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
                                  <button type="button" className="icon-btn">
                                    <i className="far fa-star"></i>
                                  </button>
                                </div>
                              )}
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
                                            className="fa-regular fa-circle-xmark"
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
                      <button type="button" class="btn btn-lightgray">
                        Next
                      </button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion.Item eventKey="10">
                <Accordion.Header>
                  Ideal Behaviour and Personalities
                </Accordion.Header>
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
                <Accordion.Header>
                  <div>
                    Behaviour Assessment{" "}
                    <svg
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
                    </svg>
                  </div>
                  <button type="button" className="btn btn-lightgray me-4">
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
                <Accordion.Body>
                  <div className="behav_assmnt">
                    {behaviours &&
                      behaviours.map((item, index) => (
                        <Col key={index} md={3}>
                          <div
                            className={`assmntbox ${
                              item.isSelected ? "active" : ""
                            }`}
                          >
                            <div className="assmntbox-head">
                              <h6 onClick={() => handleBoxClick(index)}>
                                {item.heading}
                              </h6>
                              <i
                                className={`far fa-star ${
                                  item.markedImportant ? "important" : ""
                                }`}
                                onClick={(e) => handleStarClick(index, e)}
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
                      {createRevisedJobData?.calculation_job.length===0&&<Col
                        md={12}
                        className="d-flex justify-content-center align-item-center "
                      >
                        <span>
                          Personality matches appear only after behaviour
                          selections are made
                        </span>
                      </Col>}
                      {createRevisedJobData?.calculation_job.length>0&&personalityData.length>0&&personalityData.map((item,index)=>(<Col key={index} md={3}>
                          <div  onClick={() => handleCardClick(item)} className="perlitymth-card">
                              <div className="perlitymth-head">
                                <span className="prtmth_icon"><img src={LeaderIcn}/></span>
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
                  <div class="d-flex justify-content-center align-items-center col-md-12 mt-3">
                    <button
                      onClick={handleCreateForm}
                      type="button"
                      disabled={createRevisedJobData?.calculation_job.length>0}
                      class="btn-md btn btn-primary"
                    >
                      Post
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col md={3} lg={2} className="jobpre_Rightpanel">
            <h5>{createRevisedJobData?.job_title}</h5>
            <p>
              Like {createRevisedJobData?.department?.department_name},{" "}
              {createRevisedJobData?.createRevisedJobData?.job_title} Positions
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
                    {createRevisedJobData?.min_exp}-
                    {createRevisedJobData?.max_exp} Years Experience{" "}
                  </li>
                  <li>
                    Salary{" "}
                    <span className="text-danger italic">
                      {createRevisedJobData?.max_salary}
                    </span>{" "}
                  </li>
                  <li>
                    Minimum Qualification{" "}
                    <span className="text-danger italic">Not defined</span>{" "}
                  </li>
                  <li>
                    Education{" "}
                    <span className="text-danger italic">
                      {createRevisedJobData?.minimum_education}
                    </span>{" "}
                  </li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Additional</h6>
                <ul>
                  <li>
                    Required By{" "}
                    <span className="text-danger italic">Not defined</span>
                  </li>
                  <li>Needs to Travel Rarely </li>
                  <li>Must Speak English, Telugu, Hindi</li>
                  <li>Must Read/Write in English</li>
                  <li>Should be from Mumbai, Hyderabad, Delhi, Bangalore</li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Skills</h6>
                <ul>
                  <li>
                    <span className="text-danger italic">
                      {!!createRevisedJobData &&
                        createRevisedJobData?.skills
                          ?.forEach((item) => item.skill_name)
                          ?.join(",")}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="user_bsinfo">
                <h6>Behaviours</h6>
                <ul>
                  <li>
                    <span className="text-danger italic">Not defined</span>
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
                  <li>Job details-{createRevisedJobData?.job_title}</li>
                  <li>{createRevisedJobData?.job_company?.company_name} </li>
                  <li>
                    Area: {createRevisedJobData?.job_location?.location_name}
                  </li>
                  <li>
                    Experience: {createRevisedJobData?.min_exp}-
                    {createRevisedJobData?.max_exp} Years
                  </li>
                  <li>Role: Manager-Design Engineering/Process Engineering</li>
                  <li>
                    Industry type: Specialty Chemicals, Pharmaceuticals,
                    agro-chemicals, intermediates plants
                  </li>
                  <li>Employment: Fulltime/Contract</li>
                </ul>
              </div>
              <div className="user_bsinfo">
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
              </div>
            </div>
            <div className="recomed_panel">
              <div className="recomed_head">
                <h6>Recommendations</h6>
                <ProgressBar now={60} />
              </div>
              <ul class="rects_list2 px-3">
                <li class="active">
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
                <li>
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
                <li>
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
            <img src={LeaderIcn}/>
            <Modal.Title>
              <span className="count">{selectedpersonality?.modal_data?.behaviours_name?.slice(0,1)}</span>
              {selectedpersonality?.modal_data?.behaviours_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-5 px-4">
            <h2 className="h2_title">
                <span className="count">{selectedpersonality?.modal_data?.behaviours_name?.slice(0,1)}</span>
                {selectedpersonality?.modal_data?.behaviours_name}
            </h2>
            <div className="indleffort-text">
            <p>{selectedpersonality?.modal_data?.behaviour_desctiption}</p>
            {selectedpersonality?.modal_data.suvcm?.map((item,index)=>(<ul>
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
    </>
  );
};

export default CreateJobsRevised;
