import { Button, Col, Form, Offcanvas } from "react-bootstrap";
import threeLayers from "../../images/icons/layers-three-01.svg";
import { useEffect, useState } from "react";
import {
  addCustomeBenifitsApi,
  CreateJobDepartment,
  CreateJobIsLike,
  CreateJobLocation,
  GetBenifints,
} from "../../services/provider";
import ReactQuill from "react-quill";
import axios from "axios";

const CreateJobs = ({ show, handleClose }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [isLike, setIsLike] = useState("");
  const [isLikeUid, setIsLikeUid] = useState("");

  const [noOfPosition, setNoOfPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentUid, setDepartmentUid] = useState("");

  const [location, setLocation] = useState("");
  const [locationUid, setLocationUid] = useState("");

  const [description, setDescription] = useState("");

  const [isLikeData, setIsLikeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  const [benefitsData, setBenefitsData] = useState([]);
  const [SelectBenefitsData, setSelectBenefitsData] = useState([]);
  const [addCustomeBenifits, setAddCustomeBenifits] = useState([]);
  const [customValue, setCustomValue] = useState("");

  const [isLikeDropdown, setIsLikeDropdown] = useState(false);
  const [isDepartmentDropdown, setIsDepartmentDropdown] = useState(false);
  const [isLocationDropdown, setIsLocationDropdown] = useState(false);

  const [jobType, setJobType] = useState("");
  const [workPlaceType, setWorkPlace] = useState("");
  const [travelOption, setTravelOption] = useState("");

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleWorkPlace = (e) => {
    setWorkPlace(e.target.value);
  };
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
  const handleAddNewCustomeBenifits = (addCustomeBenifitsQuery) => {
    const formData = new FormData();
    formData.append("benefit_name", customValue);

    addCustomeBenifitsApi(formData)
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
    const timeoutId = setTimeout(() => {
      handleAddNewCustomeBenifits(customValue);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [customValue]);

  useEffect(() => {
    benifitsList();
  }, []);

  const handleLike = (e) => {
    setIsLike(e.target.value);
    setIsLikeDropdown(true);
  };

  const handleSelectedLikeItems = (item) => {
    setIsLike(item.is_like_name);
    setIsLikeUid(item.uid);
    setIsLikeDropdown(false);
  };

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

  const prepareFormData = () => {
    const selectedUids = getSelectedBenefitUids();
    console.log("selectedUids------>>>>>>>>>",selectedUids)
    console.log("isLikeUid------>>>>>>>>>",[isLikeUid])
    const formData = new FormData();
    formData.append("job_title", jobTitle);
    formData.append("is_like", [isLikeUid]); // assuming isLike is a string or array
    formData.append("number_of_positions", noOfPosition);
    formData.append("department", departmentUid);
    formData.append("job_location", locationUid);
    formData.append("requires_travel", travelOption); // Example, replace with actual value
    formData.append("detailed_description", description);
    formData.append("job_type", jobType); // Example, replace with actual value
    formData.append("workplace_type", workPlaceType); // Example, replace with actual value
    formData.append("job_benefits", selectedUids); // Example value
    return formData;
  };

  const handleCreateForm = () => {
    const url = `https://bittrend.shubansoftware.com/assets-api/job-post-api/`;
    const formData = prepareFormData();
    axios
      .post(url, formData, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MjA2MTM1LCJpYXQiOjE3MzUxMTk3MzUsImp0aSI6IjE0OWM5MmYwZGI3MTQ3YzA5MzU3ZjhhMWRhYzIxN2E0IiwidXNlcl9pZCI6OSwibmFtZSI6bnVsbCwiZW1haWwiOiJheWFuLmRldmVsb3BlcjE3QGdtYWlsLmNvbSJ9.vNWh2DmtjMfifw96a3WIv1EcpCzX6LU-dJ3zvOsT1dA", // Replace with actual token
        },
      })
      .then((response) => console.log("yha-------->>>>>>>>",response))
      .catch((error) => console.log(error));
  };

  const handleCustomeBeniftsAdd = () => {
    const CreateCustomLabel = { Label: "createddd" };
    setAddCustomeBenifits((prev) => [...prev, CreateCustomLabel]);
  };


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
        <Form className="row">
          <Form.Group className="col-md-12 mb-2" controlId="jobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
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
              value={noOfPosition}
              onChange={(e) => setNoOfPosition(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="col-md-6 mb-2" controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Department"
              value={department}
              onChange={handleDepartment}
            />
          </Form.Group>

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
                value="Sometimes"
                checked={travelOption === "Sometimes"}
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

          <Form.Group className="mb-2" controlId="jobDescription">
            <Form.Label>
              Job Description <span className="font-light">(Min 50 words)</span>
            </Form.Label>

            <div>
              <ReactQuill
                value={description}
                onChange={(newValue) => setDescription(newValue)}
                modules={{
                  toolbar: [["bold", "italic", "underline"], ["link"]],
                }}
                placeholder="Write something..."
                style={{ height: "360px" }}
              />
            </div>
          </Form.Group>

          <Col md={6} className="mb-2">
            <Form.Label>Job Type</Form.Label>
            <Form.Select value={jobType} onChange={handleJobTypeChange}>
              <option>Job Type</option>
              <option value="Full-time">Full -Time</option>
              <option value="Part-time">Part -Time</option>
            </Form.Select>
          </Col>

          <Col md={6} className="mb-2">
            <Form.Label>Workplace Type</Form.Label>
            <Form.Select value={workPlaceType} onChange={handleWorkPlace}>
              <option>Workplace Type</option>
              <option value="On-site">Work from office</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Work-from-home">Work from Home</option>
            </Form.Select>
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
              {addCustomeBenifits.map((item) => (
                <>
                  <input
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    className={`badge-gray ${
                      SelectBenefitsData.includes(item) ? "active" : ""
                    }`}
                    placeholder="Add Custom"
                  />
                </>
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
        <Button variant="primary" onClick={handleCreateForm}>
          Next
        </Button>
      </div>
    </Offcanvas>
  );
};

export default CreateJobs;
