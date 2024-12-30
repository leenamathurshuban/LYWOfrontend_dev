// import { useEffect, useRef, useState } from "react";
// import { Button, Col, Form, Offcanvas } from "react-bootstrap";
// import threeLayers from "../../images/icons/layers-three-01.svg";

// import axios from "axios";
// import ReactQuill from "react-quill";
// import {
//  createCustomeBenifitsApi,
//  CreateJobDepartment,
//  CreateJobIsLike,
//  CreateJobLocation,
//  GetBenifints
// } from "../../services/provider";

// const CreateJobs = ({ show, handleClose }) => {
//  const [jobTitle, setJobTitle] = useState("");
//  const [isLike, setIsLike] = useState("");
//  const [isLikeUid, setIsLikeUid] = useState([]);

//  const [noOfPosition, setNoOfPosition] = useState("");
//  const [department, setDepartment] = useState("");
//  const [departmentUid, setDepartmentUid] = useState("");

//  const [location, setLocation] = useState("");
//  const [locationUid, setLocationUid] = useState("");

//  const [description, setDescription] = useState("");

//  const [isLikeData, setIsLikeData] = useState([]);
//  const [departmentData, setDepartmentData] = useState([]);
//  const [locationData, setLocationData] = useState([]);

//  const [benefitsData, setBenefitsData] = useState([]);
//  const [SelectBenefitsData, setSelectBenefitsData] = useState([]);
//  const [addCustomeBenifits, setAddCustomeBenifits] = useState([]);
//  const [customValue, setCustomValue] = useState("");

//  const [isLikeDropdown, setIsLikeDropdown] = useState(false);
//  const [isDepartmentDropdown, setIsDepartmentDropdown] = useState(false);
//  const [isLocationDropdown, setIsLocationDropdown] = useState(false);

//  const [jobType, setJobType] = useState("");
//  const [workPlaceType, setWorkPlace] = useState("");
//  const [travelOption, setTravelOption] = useState("");

//  //Editor states

//  const [editorContent, setEditorContent] = useState("");
//  const [fileUrl, setFileUrl] = useState(null);
//  const [errorMessage, setErrorMessage] = useState("");
//  const [descriptionError, setDescriptionError] = useState("");

//  const MAX_FILE_SIZE = 5 * 1024 * 1024;
//  const MAX_DESCRIPTION_WORDS = 500;

//  const quillRef = useRef(null);
//  const fileInputRef = useRef(null);

//  //Errors

//  const [errors, setErrors] = useState({
//    jobTitle: "",
//    isLike: "",
//    noOfPosition: "",
//    department: "",
//    location: "",
//    travelOption: "",
//    description: "",
//    jobType: "",
//    workPlaceType: "",
//  });

//  const CheckValidation = () => {
//     const newErrors = {
//      jobTitle: "",
//      isLike: "",
//      noOfPosition: "",
//      department: "",
//      location: "",
//      travelOption: "",
//      description: "",
//      jobType: "",
//      workPlaceType: "",
//    };

//    let isValid = true;

//    if (!jobTitle) {
//      newErrors.jobTitle = "Job Title is required";
//      isValid = false;
//    }

//    if (!isLike) {
//      newErrors.isLike = "isLike is required";
//      isValid = false;
//    }
//    if (!department) {
//      newErrors.department = "This Field is required";
//      isValid = false;
//    }
//    if (!location) {
//      newErrors.location = "This Field is required";
//      isValid = false;
//    }
//    if (!travelOption) {
//      newErrors.travelOption = "This Field is required";
//      isValid = false;
//    }
//    if (!description) {
//      newErrors.description = "This Field is required";
//      isValid = false;
//    }
//    if (!jobType) {
//      newErrors.jobType = "This Field is required";
//      isValid = false;
//    }
//    if (!workPlaceType) {
//      newErrors.workPlaceType = "This Field is required";
//      isValid = false;
//    }

//    if (!noOfPosition) {
//      newErrors.noOfPosition = "noOfPosition is required";
//      isValid = false;
//    }
//    setErrors(newErrors);
//    return isValid;
//  };

//  const handleEditorChange = (value) => {
//    const wordCount = value.trim().split(/\s+/).length;

//    if (wordCount <= MAX_DESCRIPTION_WORDS) {
//      setDescription(value);
//      setDescriptionError("");
//    } else {
//      setDescriptionError(
//        `You can only enter up to ${MAX_DESCRIPTION_WORDS} words.`
//      );
//    }
//  };

//  const handleFileUpload = (e) => {
//    const file = e.target.files[0];

//    if (!file) return;

//    if (file.size > MAX_FILE_SIZE) {
//      setErrorMessage(
//        "Attachement failed. The attachment exceeds the allowed file size."
//      );
//      return;
//    } else {
//      setErrorMessage("");
//    }

//    if (file.type.startsWith("image/")) {
//      const reader = new FileReader();
//      reader.onloadend = () => {
//        const quill = quillRef.current.getEditor();
//        const range = quill.getSelection();
//        if (range) {
//          quill.insertEmbed(range.index, "image", reader.result);
//        }
//      };
//      reader.readAsDataURL(file);
//    } else if (file.type === "application/pdf") {
//      const fileUrl = URL.createObjectURL(file);
//      setFileUrl(fileUrl);
//      const quill = quillRef.current.getEditor();
//      const range = quill.getSelection();
//      if (range) {
//        quill.insertEmbed(range.index, "link", fileUrl);
//      }
//    } else {
//      alert("Please upload a valid image or PDF file.");
//    }
//  };

//  const handleJobTypeChange = (e) => {
//    setJobType(e.target.value);
//  };

//  const handleWorkPlace = (e) => {
//    setWorkPlace(e.target.value);
//  };
//  const handleTravelChange = (e) => {
//    setTravelOption(e.target.value);
//  };

//  const isLikeHandleApi = (query) => {
//    const url = `https://bittrend.shubansoftware.com/assets-api/islike-list-api/?search=${query}&page=1&limit=10`;
//    CreateJobIsLike(url)
//      .then((res) => {
//        setIsLikeData(res.data.response);
//      })
//      .catch((error) => console.log("errooorrr----", error));
//  };
//  const handleDepartmentApi = (departmentQuery) => {
//    const url = `https://bittrend.shubansoftware.com/assets-api/department-list-api/?search=${departmentQuery}&page=1&limit=10`;
//    CreateJobDepartment(url)
//      .then((res) => {
//        setDepartmentData(res.data.response);
//      })
//      .catch((error) => console.log("errooorrr----", error));
//  };
//  const handleLocationApi = (locationQuery) => {
//    const url = `https://bittrend.shubansoftware.com/account-api/location-list-api/?page=1&limit=500&search=${locationQuery}`;
//    CreateJobLocation(url)
//      .then((res) => {
//        setLocationData(res.data.response);
//      })
//      .catch((error) => console.log("errooorrr----", error));
//  };

//  const benifitsList = () => {
//    //console.log("callledd apiiii11111");
//    GetBenifints()
//      .then(
//        (res) => setBenefitsData(res.data.response)
//        //  console.log("res-----",res.data.response)
//      )
//      .catch((error) => console.log("error----", error));
//  };

//  const handleBenifts = (benefititem) => {
//    setSelectBenefitsData((prevState) =>
//      prevState.includes(benefititem)
//        ? prevState.filter((item2) => item2 !== benefititem)
//        : [...prevState, benefititem]
//    );
//  };

//  const getSelectedBenefitUids = () => {
//    return SelectBenefitsData.map((item) => item.uid);
//  };

//  useEffect(() => {
//    const timeoutId = setTimeout(() => {
//      isLikeHandleApi(isLike);
//    }, 500);
//    return () => {
//      clearTimeout(timeoutId);
//    };
//  }, [isLike]);

//  useEffect(() => {
//    const timeoutId = setTimeout(() => {
//      handleDepartmentApi(department);
//    }, 500); // Debounce delay
//    return () => {
//      clearTimeout(timeoutId); // Clear previous timeout
//    };
//  }, [department]);

//  useEffect(() => {
//    const timeoutId = setTimeout(() => {
//      handleLocationApi(location);
//    }, 500);

//    return () => {
//      clearTimeout(timeoutId);
//    };
//  }, [location]);

//  useEffect(() => {
//    benifitsList();
//  }, []);

//  const handleLike = (e) => {
//    setIsLike(e.target.value);
//    setIsLikeDropdown(true);
//  };

//  const handleSelectedLikeItems = (item) => {
//    setIsLike(item.is_like_name);
//    setIsLikeUid((prevSelectedItems) => [...prevSelectedItems, item.uid]);

//    setIsLikeDropdown(false);
//  };

//  const handleDepartment = (e) => {
//    setDepartment(e.target.value);
//    setIsDepartmentDropdown(true);
//  };

//  const handleDepartmentItem = (item) => {
//    setDepartment(item.department_name);
//    setDepartmentUid(item.uid);
//    setIsDepartmentDropdown(false);
//  };

//  const handleLocation = (e) => {
//    setLocation(e.target.value);
//    setIsLocationDropdown(true);
//  };

//  const handleLocationItems = (item) => {
//    setLocation(item.location_name);
//    setLocationUid(item.uid);
//    setIsLocationDropdown(false);
//  };

//  const handleCreateForm = () => {
//    // e.preventDefault();
//    if (CheckValidation()) {
//      const textWithHtmlTags = description;
//      const descriptionWithoutTags = textWithHtmlTags.replace(/<[^>]*>/g, "");
//      const selectedUids = getSelectedBenefitUids();
//      const myHeaders = {
//        Authorization:
//          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MzU4NjUxLCJpYXQiOjE3MzUyNzIyNTEsImp0aSI6IjNmMWJkNzVkN2M2ZDQ5MTI5YzRiZjg3MDViNjI1M2YwIiwidXNlcl9pZCI6OSwibmFtZSI6bnVsbCwiZW1haWwiOiJheWFuLmRldmVsb3BlcjE3QGdtYWlsLmNvbSJ9.PDF1ye-d-Qu0FTsjkEmcTQSLWzD_UAWqaUUgHM5fRO0",
//      };

//      const formdata = new FormData();
//      formdata.append("job_title", jobTitle);
//      formdata.append("is_like", JSON.stringify(isLikeUid));
//      formdata.append("number_of_positions", noOfPosition);
//      formdata.append("department", departmentUid);
//      formdata.append("job_location", locationUid);
//      formdata.append("requires_travel", travelOption);
//      formdata.append("detailed_description", descriptionWithoutTags);
//      formdata.append("job_type", jobType);
//      formdata.append("workplace_type", workPlaceType);
//      formdata.append("job_benefits", JSON.stringify(selectedUids));

//      axios
//        .post(
//          "https://bittrend.shubansoftware.com/assets-api/job-post-api/",
//          formdata,
//          {
//            headers: myHeaders,
//          }
//        )
//        .then((response) => {
//          console.log("responsw--------", response.data);
//        })
//        .catch((error) => {
//          console.error("Error:", error);
//        });
//    } else {
//      console.log("job createddd-----");
//    }
//  };

//  const handleCustomeBeniftsAdd = () => {
//    const CreateCustomLabel = { Label: "" };
//    setAddCustomeBenifits((prev) => [...prev, CreateCustomLabel]);
//  };

//  const handleClearCustomInput = () => {
//    console.log("clearrrrrr");
//  };

//  const handleBlur = async (value) =>{
//    const formdata = new FormData();
//    formdata.append("benefit_name", customValue);

//    if (value.trim()) {
//      try {
//        const response = await createCustomeBenifitsApi(formdata)
//        if(response.data.status == 200){
//          console.log("res=-------", response);
//          benifitsList();
//        }
//      } catch (error) {
//        console.log("error=-------", error);
//      }
//    }

//  }

//  const isNextButtonDisable = !jobTitle;

//  return (
//    <Offcanvas
//      show={show}
//      onHide={handleClose}
//      backdrop={false}
//      placement="end"
//      className="createjob_drawer lg-drawer shadow-md border-0"
//    >
//      <Offcanvas.Header closeButton>
//        <Offcanvas.Title>
//          <img src={threeLayers} alt="" />
//          Create a New Job
//        </Offcanvas.Title>
//      </Offcanvas.Header>
//      <Offcanvas.Body>
//        <Form className="row" onSubmit={handleCreateForm}>
//          <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
//            <Form.Label>Job Title</Form.Label>
//            <Form.Control
//              type="text"
//              placeholder="Job Title"
//              value={jobTitle}
//              onChange={(e) => setJobTitle(e.target.value)}
//              isInvalid={errors.jobTitle}
//            />
//            <Form.Control.Feedback type="invalid">
//              {errors.jobTitle}
//            </Form.Control.Feedback>
//          </Form.Group>

//          <Form.Group className="col-md-6 mb-2" controlId="isLike">
//            <Form.Label>Is Like</Form.Label>
//            <Form.Control
//              type="text"
//              placeholder="Is Like"
//              value={isLike}
//              onChange={handleLike}

//            />

//          </Form.Group>
//          <p style={{ color: "red" }}>{errors.isLike}</p>

//          {isLikeDropdown && isLikeData.length > 0 && (
//            <ul>
//              {isLikeData.map((item) => (
//                <li
//                  key={item.is_like_name}
//                  onClick={() => handleSelectedLikeItems(item)}
//                >
//                  {item.is_like_name}
//                </li>
//              ))}
//            </ul>
//          )}
//          {isLikeDropdown && isLikeData.length === 0 && (
//            <ul>
//              <li>No data found</li>
//            </ul>
//          )}

//          <Form.Group className="col-md-6 mb-2" controlId="noOfPosition">
//            <Form.Label>No. of Positions</Form.Label>
//            <Form.Control
//              type="text"
//              placeholder="No. of Positions"
//              value={noOfPosition}
//              onChange={(e) => setNoOfPosition(e.target.value)}

//            />

//          </Form.Group>
//          <span style={{ color: "red" }}>{errors.noOfPosition}</span>

//          <Form.Group className="col-md-6 mb-2" controlId="department">
//            <Form.Label>Department</Form.Label>
//            <Form.Control
//              type="text"
//              placeholder="Department"
//              value={department}
//              onChange={handleDepartment}
//            />
//          </Form.Group>
//          <span style={{ color: "red" }}>{errors.department}</span>
//          {isDepartmentDropdown && departmentData.length > 0 && (
//            <ul>
//              {departmentData.map((item) => (
//                <li
//                  key={item.department_name}
//                  onClick={() => handleDepartmentItem(item)}
//                >
//                  {item.department_name}
//                </li>
//              ))}
//            </ul>
//          )}
//          {isDepartmentDropdown && departmentData.length === 0 && (
//            <ul>
//              <li>No data found</li>
//            </ul>
//          )}

//          <Form.Group className="col-md-6 mb-2" controlId="location">
//            <Form.Label>Location</Form.Label>
//            <Form.Control
//              type="text"
//              placeholder="Location"
//              value={location}
//              onChange={handleLocation}
//            />
//          </Form.Group>
//          <span style={{ color: "red" }}>{errors.location}</span>
//          {isLocationDropdown && locationData.length > 0 && (
//            <ul>
//              {locationData.map((item) => (
//                <li
//                  key={item.location_name}
//                  onClick={() => handleLocationItems(item)}
//                >
//                  {item.location_name}
//                </li>
//              ))}
//            </ul>
//          )}

//          {isLocationDropdown && locationData.length === 0 && (
//            <ul>
//              <li>No data found</li>
//            </ul>
//          )}

//          {["radio"].map((type) => (
//            <div key={`inline-${type}`} className="checkbox-group my-2">
//              <label className="form-label me-3 mb-0">Requires Travel?</label>
//              <Form.Check
//                inline
//                label="Regularly"
//                name="group1"
//                type={type}
//                id={`inline-${type}-1`}
//                value="Regularly"
//                checked={travelOption === "Regularly"}
//                onChange={handleTravelChange}
//              />
//              <Form.Check
//                inline
//                label="Sometimes"
//                name="group1"
//                type={type}
//                id={`inline-${type}-2`}
//                value="Sometime"
//                checked={travelOption === "Sometime"}
//                onChange={handleTravelChange}
//              />
//              <Form.Check
//                inline
//                label="Rarely"
//                type={type}
//                name="group1"
//                id={`inline-${type}-3`}
//                value="Rarely"
//                checked={travelOption === "Rarely"}
//                onChange={handleTravelChange}
//              />
//              <Form.Check
//                inline
//                label="Not Required"
//                type={type}
//                name="group1"
//                id={`inline-${type}-4`}
//                value="Not Required"
//                checked={travelOption === "Not Required"}
//                onChange={handleTravelChange}
//              />
//            </div>
//          ))}
//          <span style={{ color: "red" }}>{errors.travelOption}</span>
//          <Form.Group className="mb-2" controlId="jobDescription">
//            <Form.Label>
//              Job Description <span className="font-light">(Min 50 words)</span>
//            </Form.Label>

//            <div>
//              <ReactQuill
//                value={description}
//                onChange={handleEditorChange}
//                theme="snow"
//                ref={quillRef}
//                modules={{
//                  toolbar: [["bold", "italic", "underline"], ["link"]],
//                }}
//              />

//              {errorMessage && (
//                <div style={{ color: "red", marginBottom: "10px" }}>
//                  {errorMessage}
//                </div>
//              )}
//              <div style={{ marginTop: "20px" }}>
//                <input
//                  type="file"
//                  ref={fileInputRef}
//                  accept="image/*,application/pdf"
//                  onChange={handleFileUpload}
//                />
//              </div>

//              {descriptionError && (
//                <div style={{ color: "red", marginBottom: "10px" }}>
//                  {descriptionError}
//                </div>
//              )}
//            </div>
//          </Form.Group>

//          <Col md={6} className="mb-2">
//            <Form.Label>Job Type</Form.Label>
//            <Form.Select value={jobType} onChange={handleJobTypeChange}>
//              <option>Job Type</option>
//              <option value="Full-time">Full -Time</option>
//              <option value="Part-time">Part -Time</option>
//            </Form.Select>
//            <span style={{ color: "red" }}>{errors.jobType}</span>
//          </Col>

//          <Col md={6} className="mb-2">
//            <Form.Label>Workplace Type</Form.Label>
//            <Form.Select value={workPlaceType} onChange={handleWorkPlace}>
//              <option>Workplace Type</option>
//              <option value="On-site">Work from office</option>
//              <option value="Remote">Remote</option>
//              <option value="Hybrid">Hybrid</option>
//              <option value="Work-from-home">Work from Home</option>
//            </Form.Select>
//            <span style={{ color: "red" }}>{errors.workPlaceType}</span>
//          </Col>

//          <Form.Group className="mb-2" controlId="benefits">
//            <Form.Label>
//              Benefits <span className="font-light">(optional)</span>
//            </Form.Label>
//            <div className="tagarea">
//              {benefitsData.map((item) => (
//                <span
//                  key={item}
//                  onClick={() => handleBenifts(item)}
//                  className={`badge-gray ${
//                    SelectBenefitsData.includes(item) ? "active" : ""
//                  }`}
//                >
//                  {item.benefit_name}
//                </span>
//              ))}
//              {addCustomeBenifits.map((item, index) => (
//                <div className="input-container d-flex align-items-center position-relative">
//                  <input
//                    value={customValue}
//                    onChange={(e) => setCustomValue(e.target.value)}
//                    className={`badge-gray ${
//                      SelectBenefitsData.includes(item) ? "active" : ""
//                    }`}
//                    placeholder="Add Custom"
//                    onBlur={() => handleBlur(customValue, index)}
//                  />
//                  <i
//                    className="fa fa-xmark text-primary me-1"
//                    onClick={handleClearCustomInput}
//                  ></i>
//                </div>
//              ))}

//              <Button
//                className="btn-light-gray"
//                onClick={handleCustomeBeniftsAdd}
//              >
//                <i className="fa fa-plus text-primary me-1"></i>Add Custom
//              </Button>
//            </div>
//          </Form.Group>
//        </Form>
//      </Offcanvas.Body>

//      <div className="offcanvas-footer text-end">
//        <Button variant="light" className="me-3" onClick={handleClose}>
//          Back
//        </Button>
//        <Button
//          variant="primary"
//          disabled={isNextButtonDisable}
//          onClick={handleCreateForm}
//        >
//          Next
//        </Button>
//      </div>
//    </Offcanvas>
//  );
// };

// export default CreateJobs;

import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Offcanvas } from "react-bootstrap";
import threeLayers from "../../images/icons/layers-three-01.svg";

import axios from "axios";
import ReactQuill from "react-quill";
import {
  createCustomeBenifitsApi,
  CreateJobDepartment,
  CreateJobForm,
  CreateJobIsLike,
  CreateJobLocation,
  GetBenifints,
} from "../../services/provider";

const CreateJobs = ({ show, handleClose }) => {
  const [createFormData, setCreateFormData] = useState({
    jobTitle: "",
    jobType: "",
    workPlaceType: "",
    noOfPosition: ""
  });

  const [travelOption, setTravelOption] = useState("");

  const [isLike, setIsLike] = useState("");
  const [isLikeUid, setIsLikeUid] = useState([]);
  const [isLikeDropdown, setIsLikeDropdown] = useState(false);
  const [isLikeData, setIsLikeData] = useState([]);


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

  //Editor states

  const [fileUrl, setFileUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MAX_DESCRIPTION_WORDS = 500;

  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  //Errors

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
    setCreateFormData({
      ...createFormData,
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
        `You can only enter up to ${MAX_DESCRIPTION_WORDS} words.`
      );
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        "Attachement failed. The attachment exceeds the allowed file size."
      );
      return;
    } else {
      setErrorMessage("");
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
          quill.insertEmbed(range.index, "image", reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl);
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
      })
      .catch((error) => console.log("errooorrr----", error));
  };
  const handleDepartmentApi = (departmentQuery) => {
    const url = `https://bittrend.shubansoftware.com/assets-api/department-list-api/?search=${departmentQuery}&page=1&limit=10`;
    CreateJobDepartment(url)
      .then((res) => {
        setDepartmentData(res.data.response);
      })
      .catch((error) => console.log("errooorrr----", error));
  };
  const handleLocationApi = (locationQuery) => {
    const url = `https://bittrend.shubansoftware.com/account-api/location-list-api/?page=1&limit=500&search=${locationQuery}`;
    CreateJobLocation(url)
      .then((res) => {
        setLocationData(res.data.response);
      })
      .catch((error) => console.log("errooorrr----", error));
  };

  const benifitsList = () => {
    //console.log("callledd apiiii11111");
    GetBenifints()
      .then(
        (res) => setBenefitsData(res.data.response)
        //  console.log("res-----",res.data.response)
      )
      .catch((error) => console.log("error----", error));
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
    setLocation(item.location_name);
    setLocationUid(item.uid);
    setIsLocationDropdown(false);
  };

  const handleCreateForm = async () => {
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
          console.log("res=-------", response);
        }
      } catch (error) {
        console.log("error=-------", error);
      }
    }
  };

  const handleCustomeBeniftsAdd = () => {
    const CreateCustomLabel = { Label: "" };
    setAddCustomeBenifits((prev) => [...prev, CreateCustomLabel]);
  };

  const handleClearCustomInput = () => {
    console.log("clearrrrrr");
  };

  const handleBlur = async (value) => {
    const formdata = new FormData();
    formdata.append("benefit_name", customValue);

    if (value.trim()) {
      try {
        const response = await createCustomeBenifitsApi(formdata);
        if (response.data.status == 200) {
          console.log("res=-------", response);
          benifitsList();
        }
      } catch (error) {
        console.log("error=-------", error);
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
        <Form className="row" onSubmit={handleCreateForm}>
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
          </Form.Group>
          <p style={{ color: "red" }}>{errors.isLike}</p>

          {isLikeDropdown && isLikeData.length > 0 && (
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
          )}
          {isLikeDropdown && isLikeData.length === 0 && (
            <ul>
              <li>No data found</li>
            </ul>
          )}

          <Form.Group className="col-md-6 mb-2" controlId="noOfPosition">
            <Form.Label>No. of Positions</Form.Label>
            <Form.Control
              type="text"
              placeholder="No. of Positions"
              name="noOfPosition"
              value={createFormData.noOfPosition}
              onChange={handleFormData}
            />
          </Form.Group>
          <span style={{ color: "red" }}>{errors.noOfPosition}</span>

          <Form.Group className="col-md-6 mb-2" controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Department"
              value={department}
              onChange={handleDepartment}
            />
          </Form.Group>
          <span style={{ color: "red" }}>{errors.department}</span>
          {isDepartmentDropdown && departmentData.length > 0 && (
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
          )}
          {isDepartmentDropdown && departmentData.length === 0 && (
            <ul>
              <li>No data found</li>
            </ul>
          )}

          <Form.Group className="col-md-6 mb-2" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocation}
            />
          </Form.Group>
          <span style={{ color: "red" }}>{errors.location}</span>
          {isLocationDropdown && locationData.length > 0 && (
            <ul>
              {locationData.map((item) => (
                <li
                  key={item.location_name}
                  onClick={() => handleLocationItems(item)}
                >
                  {item.location_name}
                </li>
              ))}
            </ul>
          )}

          {isLocationDropdown && locationData.length === 0 && (
            <ul>
              <li>No data found</li>
            </ul>
          )}

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

            <div>
              <ReactQuill
                value={description}
                onChange={handleEditorChange}
                theme="snow"
                ref={quillRef}
                modules={{
                  toolbar: [["bold", "italic", "underline"], ["link"]],
                }}
              />

              {errorMessage && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {errorMessage}
                </div>
              )}
              <div style={{ marginTop: "20px" }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                />
              </div>

              {descriptionError && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  {descriptionError}
                </div>
              )}
            </div>
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
                <div className="input-container d-flex align-items-center position-relative">
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
                    className="fa fa-xmark text-primary me-1"
                    onClick={handleClearCustomInput}
                  ></i>
                </div>
              ))}

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
    </Offcanvas>
  );
};

export default CreateJobs;
