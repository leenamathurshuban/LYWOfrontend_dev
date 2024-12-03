import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { logoMaker } from "../helpers/helper";
import { cprofilelogo, starIcon } from "../images/assest";
import imgplusIcon from "../images/icons/image-plus.svg";
import AddUserManagement from "./AddUserManagement";
import TextEditor from "./TextEditor";
import imgpTrash from "../images/icons/trash-01.svg";
import imgpEdit from "../images/icons/edit-01.svg";

const CompanyEditProfile = ({ show, handleClose }) => {
  const companyProfileDetails = useSelector(
    (state) => state.login.CompanyProfileDetails
  );

  //industry state
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  //location state
  const [Location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  //update profile state
  const [description, setDescription] = useState( companyProfileDetails?.description || "" );
  const [website, setWebsite] = useState( companyProfileDetails?.website_url || "" );

  const [searchTerm, setSearchTerm] = useState(companyProfileDetails?.industry?.industry_name || "" ); // industry state
  const [selectedCompanyType, setSelectedCompanyType] = useState(companyProfileDetails?.company_type || "");
  const [noOfEmploy, setnoOfEmploy] = useState(companyProfileDetails?.number_of_employees || "");
  const [searchLocationTerm, setLocationSearchTerm] = useState(companyProfileDetails?.location?.location_name || "" ); //location state

  // other state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customModalshowcustomModal, setCustomShowModal] = useState(false);
  const [companyUpdateError, setCompanyUpdateError] = useState({
    websiteError: "",
    logoError: "",
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [ids, setIds] = useState({
    industryName: companyProfileDetails?.industry?.industry_name,
    industryUid: companyProfileDetails?.industry?.uid,
    location_name: companyProfileDetails?.location?.location_name,
    locationUid: companyProfileDetails?.location?.uid,
  });

  // cropping img state
  const [image, setImage] = useState(`https://bittrend.shubansoftware.com${companyProfileDetails?.logo}` || null);
  const [imageName, setImageName] = useState("");
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [showLogoModal, setLogoModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const aspectRatios = [
    { label: "1:1", value: 3 / 2 },
    { label: "2:3", value: 1 },
  ];

  const handleImageChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageName(file.name);
      setLogoModal(true);
      setImageFile(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleImageChange,
  });

  const handleAspectRatioChange = (e) => {
    setAspectRatio(parseFloat(e.target.value));
  };

  const zoomIn = () => {
    if (zoom < 3) {
      setZoom(zoom + 0.5);
    }
  };

  const zoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.5);
    }
  };

  const handleSave = () => {
    setLogoModal(false);
  };

  const LogoModal = () => {
    const imageHeight = 300 / aspectRatio;

    return (
      <div className="ctm_modal_dialog">
        <div className="ctm_modal_content">
          <Modal.Header closeButton>
            <Modal.Title>
              <img src={imgplusIcon} className="me-2" />
              Add Company Logo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="aspect_ratio">
              <label> Select Aspect Ratio</label>
              {aspectRatios.map((ratio) => (
                <label
                  key={ratio.value}
                  style={radioButtonStyle}
                  className="me-3"
                >
                  <input
                    type="radio"
                    value={ratio.value}
                    checked={aspectRatio === ratio.value}
                    onChange={handleAspectRatioChange}
                  />
                  {ratio.label}
                </label>
              ))}
            </div>

            <div className="cropper-container">
              <div class="cropper-wrap-box">
                <img
                  src={image}
                  alt="Selected"
                  style={{
                    width: "200px",
                    height: `${imageHeight}px`,
                    maxHeight: "300px",
                    transform: `scale(${zoom})`,
                    transition: "transform 0.2s ease-in-out",
                  }}
                />
              </div>
            </div>

            <div className="zoomin_cntrols">
              <button onClick={zoomOut} className="icon_btn">
                -
              </button>
              <progress
                value={zoom - 1}
                max="2"
                style={{ width: "100%", height: "14px" }}
              />
              <button onClick={zoomIn} className="icon_btn">
                +
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSave} variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </div>
      </div>
    );
  };

  const handleShowcustomModal = () => setCustomShowModal(true);
  const handlecustomModalClose = () => setCustomShowModal(false);

  const userInfo = useSelector((state) => state.login.loginUserInfo);
  const uid = userInfo?.default_company?.uid;

  const logoname = logoMaker(companyProfileDetails?.company_name);

  const CustomModal = ({ show, handleClose }) => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        className="confirmation_model"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <h3>
            Are you sure<br></br> you want to save changes?
          </h3>
          <p>Changes will be applied to all current jobs.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateCompanyProfile}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const calculateProfileCompletion = () => {
    let completionPercentage = 0;

    if (companyProfileDetails?.company_name?.trim()) completionPercentage += 20;
    if (companyProfileDetails?.description?.trim()) {
      const wordCount = companyProfileDetails?.description
        .trim()
        .split(/\s+/).length;
      completionPercentage += wordCount < 100 ? 10 : 30;
    }
    if (companyProfileDetails?.logo) completionPercentage += 10;
    if (companyProfileDetails?.number_of_employees) completionPercentage += 10;
    if (companyProfileDetails?.company_type) completionPercentage += 5;
    if (companyProfileDetails?.location) completionPercentage += 10;
    if (companyProfileDetails?.website_url) completionPercentage += 5;
    if (companyProfileDetails?.industry) completionPercentage += 10;

    return Math.min(completionPercentage, 100);
  };

  useEffect(() => {
    const fetchIndustries = async () => {
      if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
        setIndustries([]);
        return;
      }

      setLoading(true);
      setError(null);

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

        if (response.data.success) {
          setIndustries(response.data.response);
        } else {
          setIndustries([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching industries.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchIndustries, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleIndustrySelect = (industryName) => {
    setSelectedIndustry({
      industryName: industryName?.industry_name,
      industryUid: industryName?.uid,
    });
    setIds({
      ...ids,
      industryName: industryName?.industry_name,
      industryUid: industryName?.uid,
    });

    setSearchTerm(industryName?.industry_name);
    setIndustries([]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // if (selectedIndustry) {
    //   setSelectedIndustry(null);
    // }
  };

  // Location

  useEffect(() => {
    const fetchLocation = async () => {
      // if (searchLocationTerm.trim() === "") {
      if (
        typeof searchLocationTerm !== "string" ||
        searchLocationTerm.trim() === ""
      ) {
        setLocation([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://bittrend.shubansoftware.com/account-api/location-list-api",
          {
            params: {
              page: 1,
              limit: 500,
              search: searchLocationTerm,
            },
          }
        );

        if (response.data.success) {
          // console.log("response.data.response------", response.data.response);
          setLocation(response.data.response);
        } else {
          setLocation([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching industries.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchLocation, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchLocationTerm]);

  const handleLocationSelect = (LocationName) => {
    setSelectedLocation({
      name: LocationName?.location_name,
      uid: LocationName?.uid,
    });
    setIds({
      ...ids,
      locationUid: LocationName?.uid,
      location_name: LocationName?.location_name,
    });
    setLocationSearchTerm(LocationName?.location_name);
    setLocation([]);
  };

  const handleLocationSearchChange = (e) => {
    setLocationSearchTerm(e.target.value);
  };

  const updateCompanyProfile = async () => {
    if (companyUpdateError?.websiteError) {
      console.log("Invalid URL, cannot submit.");
      return;
    }

    try {
      const data = new FormData();
      data.append("description", description);
      data.append("website_url", website);
      data.append("company_type", selectedCompanyType);
      data.append("number_of_employees", noOfEmploy);
      data.append("industry", ids?.industryUid);
      data.append("location", ids?.locationUid);
      data.append("logo", imageFile);

      const response = await axios.put(
        `https://bittrend.shubansoftware.com/account-api/update-company-api/${uid}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response === 200) {
        // setCompanyUpdateError.websiteError("");
        setCompanyUpdateError((prevState) => ({
          ...prevState,
          websiteError: "", // Clear websiteError on successful update
        }));
      }
      
    } catch (error) {
      // console.log("erooor------>>>", error);
      // setCompanyUpdateError.websiteError(error?.response?.data?.response?.website_url[0]);
      const errorResponse = error?.response?.data?.response;

      // Update the state with the appropriate error messages
      setCompanyUpdateError((prevState) => ({
        ...prevState,
        websiteError: errorResponse?.website_url?.[0] || "",
        logoError: errorResponse?.logo_url?.[0] || "", // Handle logo error if available
      }));
    }

    handlecustomModalClose();
    handleClose();
  };

  const handleUpdate = (updatedDescription) => {
    setDescription(updatedDescription);
  };



  const handleWebsite = (e) => {
    const url = e.target.value;
    setWebsite(url);
  
    const websiteError = !url || /^https?:\/\//i.test(url) ? "" : "Invalid Website URL";

    setCompanyUpdateError((prevState) => ({
      ...prevState,
      websiteError,
    }));
  };
  
  

  const handleCompanyTypeChange = (e) => {
    setSelectedCompanyType(e.target.value);
  };

  const handleNoOfTypeEmployChange = (e) => {
    setnoOfEmploy(e.target.value);
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImageName("");
    setImageFile("");
  };

  const handleEditImage = () => {
    if (image || companyProfileDetails?.logo !== null) {
      setLogoModal(true);
    }
  };

  useEffect(() => {
    setCompletionPercentage(calculateProfileCompletion());
  }, [companyProfileDetails]);

  const filePath = companyProfileDetails?.logo;

// Split by '/' and get the last part (file name)
const LogoName = filePath?.split('/').pop();

// console.log("fffffff@@@@@@@----------",LogoName);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size="lg"
      className="cmprofile_mdl"
    >
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <aside className="model_sidebar col-md-2">
            <div className="md_sdrlogo">
              <img src={cprofilelogo} alt="" />
            </div>
            <Nav variant="pills" className="flex-column mdl_sdbarmenu">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  Profile<span>{completionPercentage}% Complete</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  Users
                  <span>
                    {companyProfileDetails?.active_user} Active,
                    {companyProfileDetails?.pending_user} Pending
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </aside>
          <Col md={10} className="cprofile_right">
            <Modal.Header closeButton>
              <Modal.Title>Company Settings</Modal.Title>
            </Modal.Header>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Modal.Body>
                  <Row>
                    <Col md={9}>
                      <div className="mdl_pagetitle d-flex justify-content-between align-items-center">
                        <h5>Basic Information</h5>
                        <div className="btn_group">
                          <Button variant="link" className="me-2">
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleShowcustomModal}
                            disabled={!!companyUpdateError?.websiteError}
                          >
                            Save
                          </Button>
                          <CustomModal
                            show={customModalshowcustomModal}
                            handleClose={handlecustomModalClose}
                          />
                        </div>
                      </div>
                      <Card className="form_card">
                        <Card.Body>
                          <Form>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label className="required">
                                    Company Name
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Company Name"
                                    value={companyProfileDetails?.company_name}
                                  />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <Form.Label>Description</Form.Label>
                                  <TextEditor
                                    data={companyProfileDetails?.description}
                                    onUpdate={handleUpdate}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Website</Form.Label>
                                  <Form.Control
                                    type="url"
                                    placeholder="Website"
                                    onChange={handleWebsite}
                                    value={website}
                                  />
                                </Form.Group>
                                {companyUpdateError?.websiteError && (
                                  <p style={{ color: "red" }}>
                                    {companyUpdateError?.websiteError}
                                  </p>
                                )}

                                <Form.Group className="mb-3">
                                  <Form.Label>Industry</Form.Label>

                                  <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search for an industry..."
                                    className="form-control"
                                  />

                                  {loading && (
                                    <p className="text-sm">Loading...</p>
                                  )}
                                  {error && (
                                    <p style={{ color: "red" }}>{error}</p>
                                  )}

                                  {!selectedIndustry &&
                                    industries.length > 0 &&
                                    !loading &&
                                    !error && (
                                      <div className="ctm_dropdown ct_scrollbar">
                                        {industries.map((industry) =>
                                          searchTerm !==
                                          industry?.industry_name ? (
                                            <ul>
                                              <li
                                                key={industry.id}
                                                onClick={() =>
                                                  handleIndustrySelect(industry)
                                                }
                                              >
                                                {industry?.industry_name}
                                              </li>
                                            </ul>
                                          ) : null
                                        )}
                                      </div>
                                    )}

                                  {/* Show no results if no industries are found */}
                                  {!selectedIndustry &&
                                    industries.length === 0 &&
                                    !loading &&
                                    !error &&
                                    searchTerm.trim() !== "" && (
                                      <p className="text-sm">
                                        No results found.
                                      </p>
                                    )}
                                </Form.Group>

                                {/* // try enddd */}

                                <Form.Group className="mb-3">
                                  <Form.Label>Company Type</Form.Label>
                                  <Form.Select
                                    aria-label="Default select example"
                                    value={selectedCompanyType}
                                    onChange={handleCompanyTypeChange}
                                  >
                                    <option>
                                      {companyProfileDetails?.company_type
                                        ? companyProfileDetails?.company_type
                                        : "Company Type"}
                                      {/* {selectedCompanyType} */}
                                    </option>
                                    <option value="Publice-Company">
                                      Public Company
                                    </option>
                                    <option value="Self-employed">
                                      Self-employed
                                    </option>
                                    <option value="Government-Agency">
                                      Government Agency
                                    </option>
                                    <option value="Nonprofit">Nonprofit</option>
                                    <option value="Sole-Proprietorship">
                                      Sole Proprietorship
                                    </option>
                                    <option value="Privately-held">
                                      Privately held
                                    </option>
                                    <option value="Partnership">
                                      Partnership
                                    </option>
                                  </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <Form.Label>Company Size</Form.Label>
                                  <Form.Select
                                    aria-label="Default select example"
                                    value={noOfEmploy}
                                    onChange={handleNoOfTypeEmployChange}
                                  >
                                    <option>
                                      {companyProfileDetails?.number_of_employees
                                        ? companyProfileDetails?.number_of_employees
                                        : "Company Size"}
                                    </option>

                                    <option value="1-5-employees">
                                      1 - 5 employees
                                    </option>
                                    <option value="6-10-employees">
                                      6 - 10 employees
                                    </option>
                                    <option value="11-50-employees">
                                      11 - 50 employees
                                    </option>
                                    <option value="51-200-employees">
                                      {" "}
                                      51 - 200 employees{" "}
                                    </option>

                                    <option value="201-500-employees">
                                      201 - 500 employees
                                    </option>
                                    <option value="501-1,000-employees">
                                      501 - 1,000 employees
                                    </option>
                                    <option value="1,001-5,000-employees">
                                      1,001 - 5,000 employees
                                    </option>
                                    <option value="5,001-10,000-employees">
                                      5,001 - 10,000 employees
                                    </option>
                                    <option value="More-than-10000-employees">
                                      More than 10,000 employees
                                    </option>
                                  </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <Form.Group className="mb-3">
                                    <Form.Label>Headquarter</Form.Label>

                                    <input
                                      type="text"
                                      value={searchLocationTerm}
                                      onChange={handleLocationSearchChange} // Updated to handle reset on input change
                                      placeholder="Search for an Headquarter..."
                                      className="form-control"
                                    />

                                    {loading && (
                                      <p className="text-sm">Loading...</p>
                                    )}
                                    {error && (
                                      <p style={{ color: "red" }}>{error}</p>
                                    )}

                                    {/* Only show the dropdown if no Headquarter is selected */}
                                    {!selectedLocation &&
                                      Location.length > 0 &&
                                      !loading &&
                                      !error && (
                                        <div className="ctm_dropdown ct_scrollbar">
                                          <ul>
                                            {Location.map((location) =>
                                              searchLocationTerm !==
                                              location?.location_name ? (
                                                <li
                                                  key={location.id}
                                                  onClick={() =>
                                                    handleLocationSelect(
                                                      location
                                                    )
                                                  }
                                                >
                                                  {location?.location_name}
                                                </li>
                                              ) : null
                                            )}
                                          </ul>
                                        </div>
                                      )}

                                    {/* Show no results if no industries are found */}
                                    {!selectedLocation &&
                                      Location.length === 0 &&
                                      !loading &&
                                      !error &&
                                      searchLocationTerm.trim() !== "" && (
                                        <p className="text-sm">
                                          No results found.
                                        </p>
                                      )}
                                  </Form.Group>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <Form.Label>Add Company Logo</Form.Label>

                                  {!companyProfileDetails?.logo && !imageFile ? (
                                    <div
                                      className="cmp_uploder file-upload-box"
                                      {...getRootProps()}
                                    >
                                      <div className="upload-content">
                                        <input {...getInputProps()} />
                                        <i className="fas fa-cloud-upload-alt upload-icon"></i>
                                        <h5>
                                          <strong className="text-primary">
                                            Click to upload
                                          </strong>{" "}
                                          or Drag & Drop
                                        </h5>
                                        <small className="text-muted mb-0">
                                          SVG, PNG, JPG or GIF (Recommended
                                          aspect ratio: 1:1 or 2:3)
                                        </small>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="selected_logo">                                      
                                     {LogoName ? <label>{LogoName}</label> : <label>{imageName}</label> }
                                      <div className="d-flex">
                                        <Button
                                          variant="link"
                                          onClick={handleEditImage}
                                        >
                                          <img src={imgpEdit} />
                                        </Button>
                                        <Button
                                          variant="link"
                                          className=" me-2"
                                          onClick={handleDeleteImage}
                                        >
                                          <img src={imgpTrash} />
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  {showLogoModal && (
                                    <LogoModal
                                      onClose={() => setLogoModal(false)}
                                    />
                                  )}

                                  {companyUpdateError.logoError && (
                                    <p className="error-message">
                                      {companyUpdateError.logoError}
                                    </p>
                                  )}
                                </Form.Group>
                              </Col>
                            </Row>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3} className="cmp_details">
                      <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Company Details</Accordion.Header>
                          <Accordion.Body>
                            {companyProfileDetails?.logo !== null ? (
                              <div className="cmp_logo mt-1">
                                <span className="cmp_textlogo">
                                  <img
                                    src={`https://bittrend.shubansoftware.com${companyProfileDetails?.logo}`}
                                    alt="Logo"
                                  />
                                </span>
                              </div>
                            ) : (
                              <div className="cmp_logo mt-1">
                                <span className="cmp_textlogo">{logoname}</span>
                              </div>
                            )}

                            <ul className="cmp_info">
                              <li>
                                <strong>
                                  {companyProfileDetails?.company_name}
                                </strong>
                              </li>
                              <li>{companyProfileDetails?.website_url}</li>
                              <li>
                                {companyProfileDetails?.industry?.industry_name}
                              </li>
                              <li>{companyProfileDetails?.company_type}</li>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: companyProfileDetails?.description,
                                }}
                              />
                              <li>
                                {companyProfileDetails?.number_of_employees}
                              </li>
                              <li>
                                {companyProfileDetails?.location?.location_name}
                              </li>
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <div className="rects-panel">
                        <h5>Recommendations</h5>
                        <ul className="rects_list">
                          {companyProfileDetails?.logo == null && (
                            <li>
                              <img src={starIcon} />
                              Add Logo
                            </li>
                          )}

                          {companyProfileDetails?.website_url == null && (
                            <li>
                              <img src={starIcon} />
                              Add Website
                            </li>
                          )}

                          {companyProfileDetails?.description == "" && (
                            <li>
                              <img src={starIcon} />
                              Add Detailed Discription
                            </li>
                          )}

                          {companyProfileDetails?.number_of_employees == "" && (
                            <li>
                              <img src={starIcon} />
                              Select Company Size
                            </li>
                          )}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Modal.Body>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Modal.Body>
                  {/* <Row>
                    <Col md={9}>
                      <div className="mdl_pagetitle d-flex justify-content-between align-items-center">
                        <h5>User Management</h5>
                        <InputGroup className="header_serach">
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
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                        <div className="btn_group">
                          <Button
                            variant="link"
                            className="btn-link-muted"
                            disabled
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.8335 8.33333V6.66667C5.8335 4.36548 7.69898 2.5 10.0002 2.5C11.7088 2.5 13.1772 3.52841 13.8201 5M10.0002 12.0833V13.75M7.3335 17.5H12.6668C14.067 17.5 14.767 17.5 15.3018 17.2275C15.7722 16.9878 16.1547 16.6054 16.3943 16.135C16.6668 15.6002 16.6668 14.9001 16.6668 13.5V12.3333C16.6668 10.9332 16.6668 10.2331 16.3943 9.69836C16.1547 9.22795 15.7722 8.8455 15.3018 8.60582C14.767 8.33333 14.067 8.33333 12.6668 8.33333H7.3335C5.93336 8.33333 5.2333 8.33333 4.69852 8.60582C4.22811 8.8455 3.84566 9.22795 3.60598 9.69836C3.3335 10.2331 3.3335 10.9332 3.3335 12.3333V13.5C3.3335 14.9001 3.3335 15.6002 3.60598 16.135C3.84566 16.6054 4.22811 16.9878 4.69852 17.2275C5.2333 17.5 5.93336 17.5 7.3335 17.5Z"
                                stroke="#4C60E5"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            Unlock
                          </Button>
                          <Button
                            variant="link"
                            className="btn-link-muted"
                            disabled
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.74976 11.2501L17.4998 2.50014M8.85608 11.5235L11.0462 17.1552C11.2391 17.6513 11.3356 17.8994 11.4746 17.9718C11.5951 18.0346 11.7386 18.0347 11.8592 17.972C11.9983 17.8998 12.095 17.6518 12.2886 17.1559L17.7805 3.08281C17.9552 2.63516 18.0426 2.41133 17.9948 2.26831C17.9533 2.1441 17.8558 2.04663 17.7316 2.00514C17.5886 1.95736 17.3647 2.0447 16.9171 2.21939L2.84398 7.71134C2.34808 7.90486 2.10013 8.00163 2.02788 8.14071C1.96524 8.26129 1.96532 8.40483 2.0281 8.52533C2.10052 8.66433 2.34859 8.7608 2.84471 8.95373L8.47638 11.1438C8.57708 11.183 8.62744 11.2026 8.66984 11.2328C8.70742 11.2596 8.74028 11.2925 8.76709 11.3301C8.79734 11.3725 8.81692 11.4228 8.85608 11.5235Z"
                                stroke="#4C60E5"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            Re-Invite
                          </Button>
                          <Button variant="link" className="btn-link-muted">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1111_5848)">
                                <path
                                  d="M4.10817 4.10841L15.8915 15.8917M18.3332 10.0001C18.3332 14.6025 14.6022 18.3334 9.99984 18.3334C5.39746 18.3334 1.6665 14.6025 1.6665 10.0001C1.6665 5.39771 5.39746 1.66675 9.99984 1.66675C14.6022 1.66675 18.3332 5.39771 18.3332 10.0001Z"
                                  stroke="#4C60E5"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1111_5848">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            Deactivate
                          </Button>
                          <Button variant="link" className="btn-link-muted">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.3333 5.00008V4.33341C13.3333 3.39999 13.3333 2.93328 13.1517 2.57676C12.9919 2.26316 12.7369 2.00819 12.4233 1.8484C12.0668 1.66675 11.6001 1.66675 10.6667 1.66675H9.33333C8.39991 1.66675 7.9332 1.66675 7.57668 1.8484C7.26308 2.00819 7.00811 2.26316 6.84832 2.57676C6.66667 2.93328 6.66667 3.39999 6.66667 4.33341V5.00008M8.33333 9.58342V13.7501M11.6667 9.58342V13.7501M2.5 5.00008H17.5M15.8333 5.00008V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9684C15.3212 17.4388 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4388 4.43915 16.9684C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00008"
                                stroke="#4C60E5"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            Delete
                          </Button>
                          <Button variant="primary">
                            <i className="fa fa-plus me-2"></i>Add User
                          </Button>
                        </div>
                      </div>
                      <Card className="usermanagement_table shadow-md border-light">
                        <AddUserManagement />
                      </Card>
                    </Col>
                    <Col md={3} className="usermanagement_panel">
                      <div className="rects-panel">
                        <h5 className="hadding_h5">Admin User</h5>
                        <ul className="bullet_list mb-0">
                          <li>Should have at least one admin</li>
                          <li>Can add/remove users</li>
                          <li>Can make others admin</li>
                          <li>Can edit profile, unlock users</li>
                          <li>Can resend invitations</li>
                          <li>Can inactivate users</li>
                          <li>Can manage all jobs</li>
                        </ul>
                      </div>
                      <div className="rects-panel">
                        <h5 className="hadding_h5">Regular User</h5>
                        <ul className="bullet_list mb-0">
                          <li>Can see all jobs</li>
                          <li>Can only edit the jobs that they create</li>
                          <li>Can add collaborators to their jobs</li>
                        </ul>
                      </div>
                      <div className="rects-panel">
                        <h5 className="hadding_h5">How to Add User</h5>
                        <ul className="bullet_list mb-0">
                          <li>Add any valid email address</li>
                          <li>Resend invitation if needed</li>
                          <li>Can deactivate/delete users</li>
                        </ul>
                      </div>
                      <div className="rects-panel">
                        <h5 className="hadding_h5 d-flex justify-content-between">
                          User Summary{" "}
                          <Button variant="link" className="link-sm p-0">
                            Clear Filter
                          </Button>
                        </h5>
                        <div className="flter_count">
                          <span>Showing 5/15</span>
                          <span>1/5 Selected</span>
                        </div>
                        <ul className="rects_list">
                          <li>
                            <img src={starIcon} />
                            Add Logo
                          </li>
                          <li>
                            <img src={starIcon} />
                            Add Website
                          </li>
                          <li>
                            <img src={starIcon} />
                            Add Detailed Discription
                          </li>
                          <li className="active">
                            <img src={starIcon} />
                            Select Company Size
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row> */}
                  <AddUserManagement/>
                </Modal.Body>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Modal>
  );
};

const radioButtonStyle = {
  display: "block",
  margin: "10px 0",
  cursor: "pointer",
};

export default CompanyEditProfile;
