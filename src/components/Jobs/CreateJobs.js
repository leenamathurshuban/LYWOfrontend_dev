import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Offcanvas } from "react-bootstrap";
import threeLayers from "../../images/icons/layers-three-01.svg";
import axios from "axios";

import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import {
  createCustomeBenifitsApi,
  CreateJobDepartment,
  CreateJobForm,
  CreateJobIsLike,
  CreateJobLocation,
  GetBenifints,
  UpdateJobForm,
} from "../../services/provider";
import CreateJobsRevised from "./CreateJobsRevised";
import { removeToken } from "../../helpers/helper";

const CreateJobs = ({ show, handleClose }) => {
  const [createFormData, setCreateFormData] = useState({
    jobTitle: "",
    jobType: "",
    workPlaceType: "",
    noOfPosition: "",
  });

  const [travelOption, setTravelOption] = useState("");

  const [isLike, setIsLike] = useState("");
  const [isLikeUid, setIsLikeUid] = useState([]);
  const [isLikeDropdown, setIsLikeDropdown] = useState(false);
  const [isLikeData, setIsLikeData] = useState([]);
  const [isDisabledTarget, setIsDisabledTarget] = useState(true);
  const [ishideIndustries, setIsHideIndustries] = useState(true);
  const [isHideRestrictedRoles, setIsHideRestrictedRoles] = useState(true);
  const [SelectSkillsData, setSelectSkillsData] = useState([]);
  const [isHideLocation, setIsHideLLocation] = useState(true);
  const [isSpecificLanguareRequired, setIsSpecificLanguareRequired] =
    useState(true);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [departmentUid, setDepartmentUid] = useState("");
  const [locationUid, setLocationUid] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [benefitsData, setBenefitsData] = useState([]);
  const [SelectBenefitsData, setSelectBenefitsData] = useState([]);
  const [addCustomeBenifits, setAddCustomeBenifits] = useState([]);
  const [customValue, setCustomValue] = useState("");
  const [isDepartmentDropdown, setIsDepartmentDropdown] = useState(false);
  const [isLocationDropdown, setIsLocationDropdown] = useState(false);
  const [createJobUid, setCreateJobUid] = useState("");
  const [createUid, setCreatedUid] = useState("");
  const [minEdu, setMinEdu] = useState("");
  const [badges, setBadges] = useState([]);
  const [IndustriesBadges, setIndustriesBadge] = useState([]);
  const [restrictedRoleBadges, setRestrictedRoleBadges] = useState([]);
  const [spokenLanguageBadges, setSpokenLanguageBadges] = useState([]);
  const [rdnwBadges, setrdnwBadges] = useState([]);
  const [locationBadges, setLocationBadges] = useState([]);
  const [fileName, setFileName] = useState("");
  const [behaviours, setBehaviours] = useState([
    {
      heading: "Efficiency",
      data: "Sense of Urgency, Organization and Resourcefulness",
      uid: "93a2b8af-3af5-4d7f-bc39-165c8fdefd81",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Accuracy",
      data: "Correctness and Completeness",
      uid: "af0b3a0b-90ec-4df0-bd82-8b633ce993d5",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Cooperativeness",
      data: "Generally Agreeable and Seeks Collective Solutions",
      uid: "bf72d375-bd6f-498f-800c-af60189a1f77",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Enthusiasm",
      data: "Excitement and Energy",
      uid: "dc5eb856-b6b6-404a-955e-5e034424fe31",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Patience",
      data: "Tolerance for delays,challenges, and difficulties",
      uid: "ebc2a4a2-3e61-463a-a2cc-cec72b5894a9",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Friendliness",
      data: "Openness and Warmth,Sympathetic",
      uid: "815db2c5-bac6-4eff-a629-698eb1aa9551",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Independence",
      data: "Free from needing supportand direction",
      uid: "64715729-4e7a-49d3-9ffd-6ea627116b2c",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Self Confidence",
      data: "Faith in self for abilities andjudgement",
      uid: "db1aa38a-0db6-4871-88b1-085010b1c346",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Self Motivation",
      data: "Being a Self-Starter andInitiator",
      uid: "64d932b7-89d3-4270-b553-58b6bdc66be1",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Sensitivity",
      data: "Being aware of other’sfeelings and impact of work",
      uid: "424b93e6-d4d7-4d43-af55-c40c7c809071",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Thoughtfulness",
      data: "Thinking carefully aboutthings before acting",
      uid: "  52261636-2fab-4935-ad9c-f2a3fa9f8be4",
      markedImportant: false,
      isSelected: false,
    },
    {
      heading: "Persistence",
      data: "Ability to Stick to a Subjectin-spite of opposition",
      uid: "5be7e9c5-c0c2-45d6-8866-5381976dd92c",
      markedImportant: false,
      isSelected: false,
    },
  ]);
  const [updateFormData, setUpdateFormData] = useState({
    display_salary: "",
    max_salary: "",
    min_salary: "",
    currency: "INR",
    salary_type: "",
    salary_price_type: "Salary-range",
    workplace_type: "",
    job_type: "",
    description_attachment: "",
    detailed_description: "",
    number_of_positions: "",
    requires_travel: "",
    job_location: "",
    department: "",
    job_benefits: "",
    is_like: "",
    job_title: "",
    job_company: "",
    non_negotiable_salary: "",
    minimum_education: "",
    area_of_education: "",
    higher_qualification_preferred: "",
    other_areas_acceptable: "",
    year_of_experience_type: "",
    min_exp: "",
    max_exp: "",
    restricted_industries: "",
    define_current_role: "",
    shortlisted_industry: "",
    restricted_roles: "",
    targate_hire_date: "",
    immediate_hiring: "",
    explore_buy_out_option: "",
    spoken_language: "",
    read_write_language: "",
    no_specific_language_require: "",
    preferred_geography: "",
    no_specific_location: "",
    relocation_cost_covered: "",
    skills: "",
    must_have_skills: "",
    job_status: "",
    important_behaviour:"",
    selected_behaviour:"",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  //Editor states
  const [fileUrl, setFileUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [errors, setErrors] = useState({
    jobTitle: "",
    isLike: "",
    noOfPosition: "",
    department: "",
    location: "",
    travelOption: "",
    description: "",
    jobType: "",
    workPlaceType: "",
  });
  const [modal, setModal] = useState({
    createJobRevisedModal: false,
  });
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MAX_DESCRIPTION_WORDS = 500;
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const handleJobModalShow = (modalName, createJobuid) => {
    setModal((prev) => ({
      ...prev,
      [modalName]: true,
      // [modalName]: {show : true,createJobuid},
    }));
  };
  const handleJobModalClose = (modalName) => {
    setModal((prev) => ({
      ...prev,
      [modalName]: false,
    }));
  };
  const CheckValidation = () => {
    const newErrors = {
      jobTitle: "",
      isLike: "",
      noOfPosition: "",
      department: "",
      location: "",
      travelOption: "",
      description: "",
      jobType: "",
      workPlaceType: "",
    };

    let isValid = true;

    if (!createFormData.jobTitle) {
      newErrors.jobTitle = "Job Title is required";
      isValid = false;
    }

    if (!isLike) {
      newErrors.isLike = "isLike is required";
      isValid = false;
    }
    if (!department) {
      newErrors.department = "This Field is required";
      isValid = false;
    }
    if (!location) {
      newErrors.location = "This Field is required";
      isValid = false;
    }
    if (!travelOption) {
      newErrors.travelOption = "This Field is required";
      isValid = false;
    }
    if (!description) {
      newErrors.description = "This Field is required";
      isValid = false;
    }
    if (!createFormData.jobType) {
      newErrors.jobType = "This Field is required";
      isValid = false;
    }
    if (!createFormData.workPlaceType) {
      newErrors.workPlaceType = "This Field is required";
      isValid = false;
    }

    if (!createFormData.noOfPosition) {
      newErrors.noOfPosition = "noOfPosition is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    console.log("input name-----", name);

    setCreateFormData({
      ...createFormData,
      [name]: value,
    });
    // if (name === 'noOfPosition') {
    //   setErrors(/[^0-9]/.test(value) ? 'Please enter only numeric values.' : '');
    // }

    // Validation for noOfPosition (should be a numeric value)
    if (name === "noOfPosition") {
      if (/[^0-9]/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          noOfPosition: "Please enter only numeric values",
        }));
      } else {
        // Clear error if value is valid
        setErrors((prevErrors) => ({
          ...prevErrors,
          noOfPosition: "",
        }));
      }
    }
  };
  const handleUpdateFormData = (e) => {
    const { name, value } = e.target;

    setUpdateFormData({
      ...updateFormData,

      [name]: value,
    });
  };
  const handleLike = (e) => {
    setIsLike(e.target.value);
    setIsLikeDropdown(true);
  };
  const handleSelectedLikeItems = (item) => {
    setIsLike(item.is_like_name);
    setIsLikeUid((prevSelectedItems) => [...prevSelectedItems, item.uid]);
    setIsLikeDropdown(false);
  };
  const handleEditorChange = (value) => {
    const wordCount = value.trim().split(/\s+/).length;

    if (wordCount <= MAX_DESCRIPTION_WORDS) {
      setDescription(value);
      setDescriptionError("");
    } else {
      setDescriptionError(
        `You have reached the maximum limit of ${MAX_DESCRIPTION_WORDS} words.`
      );
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check if the file size exceeds 5MB
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        "Attachement failed. The attachment exceeds the allowed file size."
      );
      return; // Exit early if the file is too large
    } else {
      setErrorMessage(""); // Clear error message if file is valid
    }

    // Set the file name to display it
    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      // Handle Image Upload
      const reader = new FileReader();
      reader.onloadend = () => {
        // Insert image into Quill editor
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
          quill.insertEmbed(range.index, "image", reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      // Handle PDF Upload
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl);
      // Optionally, insert PDF link into the editor
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      if (range) {
        quill.insertEmbed(range.index, "link", fileUrl);
      }
    } else {
      alert("Please upload a valid image or PDF file.");
    }
  };
  // const handleJobTypeChange = (e) => {
  //   setJobType(e.target.value);
  // };

  // const handleWorkPlace = (e) => {
  //   setWorkPlace(e.target.value);
  // };
  const handleTravelChange = (e) => {
    setTravelOption(e.target.value);
  };
  const isLikeHandleApi = (query) => {
    const url = `https://bittrend.shubansoftware.com/assets-api/islike-list-api/?search=${query}&page=1&limit=10`;
    CreateJobIsLike(url)
      .then((res) => {
        setIsLikeData(res.data.response);
        if (res?.data?.response.length > 0 && !isLikeDropdown) {
          setRestrictedRoleBadges((prevBadges) => [
            ...prevBadges,
            res?.data?.response[0],
          ]);
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
          removeToken();
          navigate("/loginwithpassword");
        }
      });
  };
  const handleDepartmentApi = (departmentQuery) => {
    const url = `https://bittrend.shubansoftware.com/assets-api/department-list-api/?search=${departmentQuery}&page=1&limit=10`;
    CreateJobDepartment(url)
      .then((res) => {
        setDepartmentData(res.data.response);
      })
      .catch((error) => {
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
      });
  };
  const handleLocationApi = (locationQuery) => {
    const url = `https://bittrend.shubansoftware.com/account-api/location-list-api/?page=1&limit=500&search=${locationQuery}`;
    CreateJobLocation(url)
      .then((res) => {
        setLocationData(res.data.response);
        if (res.data.response.length > 0) {
          setLocationBadges((prevBadges) => [
            ...prevBadges,
            res?.data?.response[0],
          ]);
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
          removeToken();
          navigate("/loginwithpassword");
        }
      });
  };
  const benifitsList = () => {
    //console.log("callledd apiiii11111");
    GetBenifints()
      .then(
        (res) => setBenefitsData(res.data.response)
        //  console.log("res-----",res.data.response)
      )
      .catch((error) => {
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
      });
  };
  const handleBenifts = (benefititem) => {
    setSelectBenefitsData((prevState) =>
      prevState.includes(benefititem)
        ? prevState.filter((item2) => item2 !== benefititem)
        : [...prevState, benefititem]
    );
  };
  const getSelectedBenefitUids = () => {
    return SelectBenefitsData.map((item) => item.uid);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isLikeHandleApi(isLike);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLike]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleDepartmentApi(department);
    }, 500); // Debounce delay
    return () => {
      clearTimeout(timeoutId); // Clear previous timeout
    };
  }, [department]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleLocationApi(location);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);
  useEffect(() => {
    benifitsList();
  }, []);
  // const handleLike = (e) => {
  //   setIsLike(e.target.value);
  //   setIsLikeDropdown(true);
  // };

  // const handleSelectedLikeItems = (item) => {
  //   setIsLike(item.is_like_name);
  //   setIsLikeUid((prevSelectedItems) => [...prevSelectedItems, item.uid]);
  //   setIsLikeDropdown(false);
  // };

  const hasSelectedAndImportant = behaviours.some((item) => (item?.isSelected || item?.markedImportant));

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
    setIsDepartmentDropdown(true);
  };

  const handleDepartmentItem = (item) => {
    setDepartment(item.department_name);
    setDepartmentUid(item.uid);
    setIsDepartmentDropdown(false);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
    setIsLocationDropdown(true);
  };

  const handleLocationItems = (item) => {
    setLocation(item?.location_name);
    setLocationUid(item.uid);
    setIsLocationDropdown(false);
  };

  const handleCreateForm = async () => {
    //handleJobModalShow("createJobRevisedModal");
    if (CheckValidation()) {
      const textWithHtmlTags = description;
      const descriptionWithoutTags = textWithHtmlTags.replace(/<[^>]*>/g, "");
      const selectedUids = getSelectedBenefitUids();

      const formdata = new FormData();
      formdata.append("job_title", createFormData.jobTitle);
      formdata.append("is_like", JSON.stringify(isLikeUid));
      formdata.append("number_of_positions", createFormData.noOfPosition);
      formdata.append("department", departmentUid);
      formdata.append("job_location", locationUid);
      formdata.append("requires_travel", travelOption);
      formdata.append("detailed_description", descriptionWithoutTags);
      formdata.append("job_type", createFormData.jobType);
      formdata.append("workplace_type", createFormData.workPlaceType);
      formdata.append("job_benefits", JSON.stringify(selectedUids));
      try {
        const response = await CreateJobForm(formdata);
        if (response.data.status == 200) {
          setCreateJobUid(response.data.response.uid);
          const createJobuid = response.data.response.uid;
          handleJobModalShow("createJobRevisedModal", createJobuid);
          setRestrictedRoleBadges([]);
        }
      } catch (error) {
        console.log("create eroor------", error);
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
    }
  };

  const handleUpdateForm = async () => {
    const formdata = new FormData();

    for (const key in updateFormData) {
      console.log(key === "selected_behaviour",key === "important_behaviour",hasSelectedAndImportant,key)
      if (key === "area_of_education" && badges.length > 0) {
        let uids = badges.map((item) => item?.uid);

        formdata.append(key, JSON.stringify(uids));
      } else if (
        key === "shortlisted_industry" &&
        IndustriesBadges.length > 0
      ) {
        let uids = IndustriesBadges.map((item) => item?.uid);

        formdata.append(key, JSON.stringify(uids));
      } else if (
        key === "restricted_roles" &&
        restrictedRoleBadges.length > 0
      ) {
        let uids = restrictedRoleBadges.map((item) => item?.uid);

        formdata.append(key, JSON.stringify(uids));
      } else if (key === "spoken_language" && spokenLanguageBadges.length > 0) {
        let uids = spokenLanguageBadges.map((item) => item?.uid);

        formdata.append(key, JSON.stringify(uids));
      } else if (key === "read_write_language" && rdnwBadges.length > 0) {
        let uids = rdnwBadges.map((item) => item?.uid);

        formdata.append(key, JSON.stringify(uids));
      } else if (key === "preferred_geography" && locationBadges.length > 0) {
        let uids = locationBadges.map((item) => item?.uid);

        formdata.append(key, JSON.stringify(uids));
      } else if (key === "skills" && SelectSkillsData.length > 0) {
        let skillID = SelectSkillsData?.map((item) => item?.uid) // Extract skill_name values
          ?.filter((skill) => skill !== "") // Filter out empty strings
          ?.join(",");

        formdata.append("skill_name", skillID);
      } else if ((key === "selected_behaviour" || key === "important_behaviour")&&hasSelectedAndImportant) {
        let selectedBehaviourUids = [];
        let importantBehaviourUids = [];

        behaviours.forEach((item) => {
          if (item?.isSelected) {
            selectedBehaviourUids.push(item.uid);
          }
          if (item?.markedImportant) {
            importantBehaviourUids.push(item.uid);
          }
        });

        formdata.append(
          "selected_behaviour",
          JSON.stringify(selectedBehaviourUids)
        );
        formdata.append(
          "important_behaviour",
          JSON.stringify(importantBehaviourUids)
        );
      } else if (
        key === "higher_qualification_preferred" ||
        key === "other_areas_acceptable" ||
        key === "non_negotiable_salary" ||
        key === "display_salary" ||
        (key === "explore_buy_out_option" && updateFormData[key] !== "")
      ) {
        if (updateFormData[key] === "on") {
          formdata.append(key, "True");
        }
      } else if (key === "restricted_industries") {
        if (!ishideIndustries) {
          formdata.append(key, "False");
        } else if (ishideIndustries) {
          formdata.append(key, "True");
        }
      } else if (key === "define_current_role") {
        if (!isHideRestrictedRoles) {
          formdata.append(key, "False");
        } else if (isHideRestrictedRoles) {
          formdata.append(key, "True");
        }
      } else if (key === "immediate_hiring") {
        if (!isDisabledTarget) {
          formdata.append(key, "False");
        } else if (isDisabledTarget) {
          formdata.append(key, "True");
        }
      } else if (key === "no_specific_language_require") {
        if (!isSpecificLanguareRequired) {
          formdata.append(key, "False");
        } else if (isSpecificLanguareRequired) {
          formdata.append(key, "True");
        }
      } else if (key === "no_specific_location") {
        if (!isHideLocation) {
          formdata.append(key, "False");
        } else if (isHideLocation) {
          formdata.append(key, "True");
        }
      } else if (updateFormData[key] !== "") {
        formdata.append(key, updateFormData[key]);
      }
    }
    // try {
    //   const response = await UpdateJobForm(formdata, createUid);

    //   if (response.data.status == 200) {
    //     alert("Job updated successfully!");
    //     setSelectSkillsData([]);
    //     setIsUpdated(true)
    //     setUpdateFormData({
    //       display_salary: "",

    //       max_salary: "",

    //       min_salary: "",

    //       currency: "INR",

    //       salary_type: "",

    //       salary_price_type: "Salary_range",

    //       workplace_type: "",

    //       job_type: "",

    //       description_attachment: "",

    //       detailed_description: "",

    //       number_of_positions: "",

    //       requires_travel: "",

    //       job_location: "",

    //       department: "",

    //       job_benefits: "",

    //       is_like: "",

    //       job_title: "",

    //       job_company: "",

    //       non_negotiable_salary: "",

    //       minimum_education: "",

    //       area_of_education: "",

    //       higher_qualification_preferred: "",

    //       other_areas_acceptable: "",

    //       year_of_experience_type: "",

    //       min_exp: "",

    //       max_exp: "",

    //       restricted_industries: "",

    //       define_current_role: "",

    //       shortlisted_industry: "",

    //       restricted_roles: "",

    //       targate_hire_date: "",

    //       immediate_hiring: "",

    //       explore_buy_out_option: "",

    //       spoken_language: "",

    //       read_write_language: "",

    //       no_specific_language_require: "",

    //       preferred_geography: "",

    //       no_specific_location: "",

    //       relocation_cost_covered: "",

    //       skills: "",

    //       must_have_skills: "",

    //       job_status: "",
    //     });
    //   }
    // } catch (error) {
    //   console.log("create eroor------", error);

    //   if (
    //     error?.response?.status === 401 ||
    //     error?.response?.data?.detail?.includes(
    //       "Given token not valid for any token type"
    //     )
    //   ) {
    //     //console.log("Token expired, redirecting to login");

    //     removeToken();

    //     navigate("/loginwithpassword");
    //   }
    // }
  };

  const handleCustomeBeniftsAdd = () => {
    const CreateCustomLabel = { Label: "" };
    setAddCustomeBenifits((prev) => [...prev, CreateCustomLabel]);
  };

  const handleClearCustomInput = (index) => {
    setAddCustomeBenifits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBlur = async (value) => {
    const formdata = new FormData();
    formdata.append("benefit_name", customValue);

    if (value.trim()) {
      try {
        const response = await createCustomeBenifitsApi(formdata);
        if (response.data.status == 200) {
          //console.log("res=-------", response);
          benifitsList();
          setCustomValue("");
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

  const isNextButtonDisable = !createFormData.jobTitle;

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop={false}
      placement="end"
      className="createjob_drawer lg-drawer shadow-md border-0"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <img src={threeLayers} alt="" />
          Create a New Job
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form className="row" onSubmit={handleCreateForm} autocomplete="off">
          <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Job Title"
              name="jobTitle"
              value={createFormData.jobTitle}
              // onChange={(e) => setJobTitle(e.target.value)}
              onChange={handleFormData}
              // isInvalid={errors.jobTitle}
            />
            {/* <Form.Control.Feedback type="invalid">
              {errors.jobTitle}
            </Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="col-md-6 mb-2" controlId="isLike">
            <Form.Label>Is Like</Form.Label>
            <Form.Control
              type="text"
              placeholder="Is Like"
              value={isLike}
              onChange={handleLike}
            />

            <p className="m-0 error">{errors.isLike}</p>

            {isLikeDropdown && isLikeData.length > 0 && (
              <div className="ctm_dropdown ct_scrollbar">
                <ul>
                  {isLikeData.map((item) => (
                    <li
                      key={item.is_like_name}
                      onClick={() => handleSelectedLikeItems(item)}
                    >
                      {item.is_like_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isLikeDropdown && isLikeData.length === 0 && (
              <ul>
                <li>No data found</li>
              </ul>
            )}
          </Form.Group>

          <Form.Group className="col-md-6 mb-2" controlId="noOfPosition">
            <Form.Label>No. of Positions</Form.Label>
            <Form.Control
              type="text"
              placeholder="No. of Positions"
              name="noOfPosition"
              value={createFormData.noOfPosition}
              onChange={handleFormData}
              isInvalid={!!errors.noOfPosition}
            />

            {errors.noOfPosition && (
              <span className="error text-danger">{errors.noOfPosition}</span>
            )}
          </Form.Group>

          <Form.Group className="col-md-6 mb-2" controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Department"
              value={department}
              onChange={handleDepartment}
            />

            <span className="error">{errors.department}</span>

            {isDepartmentDropdown && departmentData.length > 0 && (
              <div className="ctm_dropdown ct_scrollbar">
                <ul>
                  {departmentData.map((item) => (
                    <li
                      key={item.department_name}
                      onClick={() => handleDepartmentItem(item)}
                    >
                      {item.department_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isDepartmentDropdown && departmentData.length === 0 && (
              <ul>
                <li>No data found</li>
              </ul>
            )}
          </Form.Group>

          <Form.Group className="col-md-6 mb-2" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocation}
            />

            <span className="error">{errors.location}</span>

            {isLocationDropdown && locationData.length > 0 && (
              <div className="ctm_dropdown ct_scrollbar">
                <ul>
                  {locationData.map((item) => (
                    <li
                      key={item?.location_name}
                      onClick={() => handleLocationItems(item)}
                    >
                      {item?.location_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isLocationDropdown && locationData.length === 0 && (
              <ul>
                <li>No data found</li>
              </ul>
            )}
          </Form.Group>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="checkbox-group my-2">
              <label className="form-label me-3 mb-0">Requires Travel?</label>
              <Form.Check
                inline
                label="Regularly"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                value="Regularly"
                checked={travelOption === "Regularly"}
                onChange={handleTravelChange}
              />
              <Form.Check
                inline
                label="Sometimes"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                value="Sometime"
                checked={travelOption === "Sometime"}
                onChange={handleTravelChange}
              />
              <Form.Check
                inline
                label="Rarely"
                type={type}
                name="group1"
                id={`inline-${type}-3`}
                value="Rarely"
                checked={travelOption === "Rarely"}
                onChange={handleTravelChange}
              />
              <Form.Check
                inline
                label="Not Required"
                type={type}
                name="group1"
                id={`inline-${type}-4`}
                value="Not Required"
                checked={travelOption === "Not Required"}
                onChange={handleTravelChange}
              />
            </div>
          ))}
          <span style={{ color: "red" }}>{errors.travelOption}</span>
          <Form.Group className="mb-2" controlId="jobDescription">
            <Form.Label>
              Job Description <span className="font-light">(Min 50 words)</span>
            </Form.Label>

            <div className="texteditor_warp">
              <ReactQuill
                value={description}
                onChange={handleEditorChange}
                theme="snow"
                ref={quillRef}
                modules={{
                  toolbar: [["bold", "italic", "underline"], ["link"]],
                }}
              />

              <div
                className="custome_file"
                style={{ display: "flex", alignItems: "center" }}
              >
                <label
                  htmlFor="file-upload"
                  style={{
                    cursor: "pointer",
                    color: "#475467",
                    fontWeight: "bold",
                    marginRight: "10px",
                    fontSize: 13,
                  }}
                >
                  <i
                    className="fas fa-paperclip"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Attach File
                </label>
                <input
                  type="file"
                  id="file-upload"
                  ref={fileInputRef}
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />

                <div>
                  <p
                    style={{
                      fontSize: 12,
                      color: errorMessage ? "red" : "black",
                    }}
                  >
                    {errorMessage
                      ? errorMessage
                      : fileName
                      ? fileName
                      : "Doc, PNG, JPG or PDF (max. size 5 mb)"}
                  </p>
                </div>
              </div>
            </div>

            {descriptionError && (
              <div className="error">{descriptionError}</div>
            )}
          </Form.Group>

          <Col md={6} className="mb-2">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              value={createFormData.jobType}
              onChange={handleFormData}
              name="jobType"
            >
              <option>Job Type</option>
              <option value="Full-time">Full -Time</option>
              <option value="Part-time">Part -Time</option>
            </Form.Select>
            <span style={{ color: "red" }}>{errors.jobType}</span>
          </Col>

          <Col md={6} className="mb-2">
            <Form.Label>Workplace Type</Form.Label>
            <Form.Select
              value={createFormData.workPlaceType}
              onChange={handleFormData}
              name="workPlaceType"
            >
              <option>Workplace Type</option>
              <option value="On-site">Work from office</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Work-from-home">Work from Home</option>
            </Form.Select>
            <span style={{ color: "red" }}>{errors.workPlaceType}</span>
          </Col>

          <Form.Group className="mb-2" controlId="benefits">
            <Form.Label>
              Benefits <span className="font-light">(optional)</span>
            </Form.Label>
            <div className="tagarea">
              {benefitsData.map((item) => (
                <span
                  key={item}
                  onClick={() => handleBenifts(item)}
                  className={`badge-gray ${
                    SelectBenefitsData.includes(item) ? "active" : ""
                  }`}
                >
                  {item.benefit_name}
                </span>
              ))}
              {addCustomeBenifits.map((item, index) => (
                <div className="input-container position-relative">
                  <input
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    className={`badge-gray ${
                      SelectBenefitsData.includes(item) ? "active" : ""
                    }`}
                    placeholder="Add Custom"
                    onBlur={() => handleBlur(customValue, index)}
                  />
                  <i
                    className="fa fa-xmark text-primary me-1 remove-tag"
                    onClick={() => handleClearCustomInput(index)}
                  ></i>
                </div>
              ))}
              {/* <span class="badge-gray ">
                Reimburs| <i className="fas fa-close text-primary ms-1"></i>
              </span> */}
              <Button
                className="btn-light-gray"
                onClick={handleCustomeBeniftsAdd}
              >
                <i className="fa fa-plus text-primary me-1"></i>Add Custom
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Offcanvas.Body>

      <div className="offcanvas-footer text-end">
        <Button variant="light" className="me-3" onClick={handleClose}>
          Back
        </Button>
        <Button
          variant="primary"
          disabled={isNextButtonDisable}
          onClick={handleCreateForm}
        >
          Next
        </Button>
      </div>
      {modal.createJobRevisedModal && (
        <CreateJobsRevised
          show={modal.createJobRevisedModal}
          handleClose={() => handleJobModalClose("createJobRevisedModal")}
          handleFormData={handleUpdateFormData}
          handleCreateForm={handleUpdateForm}
          setCreatedUid={setCreatedUid}
          setBadges={setBadges}
          badges={badges}
          minEdu={minEdu}
          setMinEdu={setMinEdu}
          setIsUpdated={setIsUpdated}
          isUpdated={isUpdated}
          setRestrictedRoleBadges={setRestrictedRoleBadges}
          restrictedRoleBadges={restrictedRoleBadges}
          IndustriesBadges={IndustriesBadges}
          setIndustriesBadge={setIndustriesBadge}
          isLike={isLike}
          setIsLike={setIsLike}
          isLikeData={isLikeData}
          setIsLikeData={setIsLikeData}
          handleLike={handleLike}
          isLikeDropdown={isLikeDropdown}
          handleSelectedLikeItems={handleSelectedLikeItems}
          isHideRestrictedRoles={isHideRestrictedRoles}
          setIsHideRestrictedRoles={setIsHideRestrictedRoles}
          setIsHideIndustries={setIsHideIndustries}
          ishideIndustries={ishideIndustries}
          setIsDisabledTarget={setIsDisabledTarget}
          isDisabledTarget={isDisabledTarget}
          setIsSpecificLanguareRequired={setIsSpecificLanguareRequired}
          isSpecificLanguareRequired={isSpecificLanguareRequired}
          setSpokenLanguageBadges={setSpokenLanguageBadges}
          spokenLanguageBadges={spokenLanguageBadges}
          setrdnwBadges={setrdnwBadges}
          rdnwBadges={rdnwBadges}
          locationBadges={locationBadges}
          setLocationBadges={setLocationBadges}
          setIsHideLLocation={setIsHideLLocation}
          isHideLocation={isHideLocation}
          handleLocationApi={handleLocationApi}
          createJobUid={createJobUid}
          SelectSkillsData={SelectSkillsData}
          setSelectSkillsData={setSelectSkillsData}
          behaviours={behaviours}
          setBehaviours={setBehaviours}
        />
      )}
    </Offcanvas>
  );
};

export default CreateJobs;
