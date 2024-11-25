import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Accordion,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import FileUploader from "../components/FileUploader";
import { getPlainText, logoMaker } from "../helpers/helper";
import { cprofilelogo, starIcon } from "../images/assest";
import {
  getDetailsApi,
  companyList,
  GetcompanyDetailsApi,
  updateCompanyProfileApi,
} from "../services/provider";
import TextEditor from "./TextEditor";
import { useDropzone } from "react-dropzone"; 
import ReactCrop from "react-easy-crop";

const CompanyEditProfile = ({ show, handleClose }) => {
  const companyProfileDetails = useSelector(
    (state) => state.login.CompanyProfileDetails
  );
  //industry state
  const [searchTerm, setSearchTerm] = useState(
    companyProfileDetails?.industry?.industry_name || ""
  );
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  //location state
  const [searchLocationTerm, setLocationSearchTerm] = useState(
    companyProfileDetails?.location?.location_name || ""
  );
  const [Location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // other state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customModalshowcustomModal, setCustomShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState(
    companyProfileDetails?.website_url || ""
  );
  const [websiteError, setWebsiteError] = useState("");
  const [selectedCompanyType, setSelectedCompanyType] = useState(
    companyProfileDetails?.company_type || ""
  );
  const [noOfEmploy, setnoOfEmploy] = useState(
    companyProfileDetails?.number_of_employees || ""
  );
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // cropping img state
  const [image, setImage] = useState(null); // Image to display
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Crop position
  const [zoom, setZoom] = useState(1); // Zoom level
  const [aspectRatio, setAspectRatio] = useState(1); // Aspect ratio state (default: 1:1)

  //modal function
  const handleShowcustomModal = () => setCustomShowModal(true);
  const handlecustomModalClose = () => setCustomShowModal(false);

  // const [getDetails, setgetDetails] = useState(null);

  const userInfo = useSelector((state) => state.login.loginUserInfo);
  const uid = userInfo?.default_company?.uid;

  const logoname = logoMaker(userInfo?.default_company?.company_name);

  const CustomModal = ({ show, handleClose }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Custom Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to save changes?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateCompanyProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const calculateProfileCompletion = () => {
    let completionPercentage = 0;

    if (companyProfileDetails?.company_name?.trim()) completionPercentage += 20;
    if (companyProfileDetails?.description?.trim()) {
      const wordCount = companyProfileDetails.description
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

 
  //industry start cde
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
    setSearchTerm(industryName);
    setIndustries([]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (selectedIndustry) {
      setSelectedIndustry(null);
    }
  };

  // industry end code

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
    setLocationSearchTerm(LocationName);
    setLocation([]);
  };

  const handleLocationSearchChange = (e) => {
    setLocationSearchTerm(e.target.value);
    if (selectedLocation) {
      setSelectedLocation(null);
    }
  };

  const updateCompanyProfile = async () => {
    const PlainDescription = getPlainText(description);

    try {
      const data = new FormData();
      data.append("description", PlainDescription); 
      data.append("website_url", website); 
      data.append("company_type", selectedCompanyType); 
      data.append("number_of_employees", noOfEmploy); 
      data.append("industry", searchTerm?.uid);
      data.append("location", searchLocationTerm?.uid); 

      // data.append("logo", "https://shubansoftware.com/");

      const response = await axios.put(
        `https://bittrend.shubansoftware.com/account-api/update-company-api/${uid}/`, // Update URL with dynamic companyId
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let axios handle the content type
          },
        }
      );
      if (response === 200) {
        console.log("reposne-----", response);
       
      }
    } catch (error) {
      setWebsiteError(error?.response?.data?.response?.website_url[0]);
    }

    handlecustomModalClose();
  };

  const handleUpdate = (updatedDescription) => {
    setDescription(updatedDescription); // Update the local state when the editor value changes
  };

  const handleWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const handleCompanyTypeChange = (e) => {
    setSelectedCompanyType(e.target.value);
  };

  const handleNoOfTypeEmployChange = (e) => {
    setnoOfEmploy(e.target.value);
  };

  useEffect(() => {
    setCompletionPercentage(calculateProfileCompletion());
  }, [companyProfileDetails]);

  // image cropping

  // Aspect ratio options
  const aspectRatios = [
    { label: "1:1 (Square)", value: 1 },
    { label: "16:9", value: 16 / 9 },
    { label: "4:3", value: 4 / 3 },
    { label: "3:2", value: 3 / 2 },
  ];

  const handleImageChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create object URL for preview
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Only accept image files
    onDrop: handleImageChange, // On drop of files, handle the image upload
  });

  // Handle aspect ratio change
  const handleAspectRatioChange = (e) => {
    setAspectRatio(e.target.value);
  };

  const zoomIn = () => {
    if (zoom < 3) {
      setZoom(zoom + 0.1); 
    }
  };

  const zoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1); 
    }
  };

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
                                <p style={{ color: "red" }}>{websiteError}</p>

                                {/* //// try */}
                                <Form.Group className="mb-3">
                                  <Form.Label>Industry</Form.Label>

                                  <input
                                    type="text"
                                    value={searchTerm?.industry_name}
                                    onChange={handleSearchChange} 
                                    placeholder="Search for an industry..."
                                    style={{ width: "50%", padding: "8px" }}
                                  />

                                  {loading && <p>Loading...</p>}
                                  {error && (
                                    <p style={{ color: "red" }}>{error}</p>
                                  )}

                                  {/* Only show the dropdown if no industry is selected */}
                                  {!selectedIndustry &&
                                    industries.length > 0 &&
                                    !loading &&
                                    !error && (
                                      <div
                                        style={{
                                          border: "1px solid #ccc",
                                          marginTop: "5px",
                                        }}
                                      >
                                        {industries.map((industry) => (
                                          <p
                                            key={industry.id}
                                            style={{
                                              padding: "8px",
                                              cursor: "pointer",
                                              background: "#f9f9f9",
                                              margin: 0,
                                            }}
                                            onClick={() =>
                                              handleIndustrySelect(industry)
                                            }
                                          >
                                            {industry.industry_name}
                                            {/* {industry.uid} */}
                                          </p>
                                        ))}
                                      </div>
                                    )}

                                  {/* Show no results if no industries are found */}
                                  {!selectedIndustry &&
                                    industries.length === 0 &&
                                    !loading &&
                                    !error &&
                                    searchTerm.trim() !== "" && (
                                      <p>No results found.</p>
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
                                    <option value={"Public Company"}>
                                      Public Company
                                    </option>
                                    <option value="Self-employed">
                                      Self-employed
                                    </option>
                                    <option value="Government Agency">
                                      Government Agency
                                    </option>
                                    <option value="Nonprofit">Nonprofit</option>
                                    <option value="Sole Proprietorship">
                                      Sole Proprietorship
                                    </option>
                                    <option value="Privately held">
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
                                    <option value="More than 10,000 employees">
                                      More than 10,000 employees
                                    </option>
                                  </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  {/* <Form.Label>Headquarter</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Headquarter"
                                  /> */}
                                  {/* //// try locationnnn start   */}
                                  <Form.Group className="mb-3">
                                    <Form.Label>Headquarter</Form.Label>

                                    <input
                                      type="text"
                                      value={searchLocationTerm?.location_name}
                                      onChange={handleLocationSearchChange} // Updated to handle reset on input change
                                      placeholder="Search for an Headquarter..."
                                      style={{ width: "50%", padding: "8px" }}
                                    />

                                    {loading && <p>Loading...</p>}
                                    {error && (
                                      <p style={{ color: "red" }}>{error}</p>
                                    )}

                                    {/* Only show the dropdown if no Headquarter is selected */}
                                    {!selectedLocation &&
                                      Location.length > 0 &&
                                      !loading &&
                                      !error && (
                                        <div
                                          style={{
                                            border: "1px solid #ccc",
                                            marginTop: "5px",
                                          }}
                                        >
                                          {Location.map((Location) => (
                                            <p
                                              key={Location.id}
                                              style={{
                                                padding: "8px",
                                                cursor: "pointer",
                                                background: "#f9f9f9",
                                                margin: 0,
                                              }}
                                              onClick={() =>
                                                handleLocationSelect(Location)
                                              }
                                            >
                                              {Location?.location_name}
                                              {/* {Location?.uid} */}
                                            </p>
                                          ))}
                                        </div>
                                      )}

                                    {/* Show no results if no industries are found */}
                                    {!selectedLocation &&
                                      Location.length === 0 &&
                                      !loading &&
                                      !error &&
                                      searchLocationTerm.trim() !== "" && (
                                        <p>No results found.</p>
                                      )}
                                  </Form.Group>

                                  {/* // try enddd locationnnnnnn */}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <Form.Label>Add Company Logo</Form.Label>
                                  <div className="cmp_uploder">
                                    {/* <FileUploader /> */}
                                    {/* Drag-and-Drop Zone */}
                                    <div
                                      {...getRootProps()}
                                      style={{
                                        border: "2px dashed #007bff",
                                        padding: "20px",
                                        cursor: "pointer",
                                        marginBottom: "20px",
                                      }}
                                    >
                                      <input {...getInputProps()} />
                                      <p>
                                        Drag & Drop your image here, or click to
                                        select a file
                                      </p>
                                    </div>

                                    {/* Aspect Ratio Selector */}
                                    <select
                                      value={aspectRatio}
                                      onChange={handleAspectRatioChange}
                                      style={{
                                        padding: "5px",
                                        marginTop: "10px",
                                      }}
                                    >
                                      {aspectRatios.map((ratio) => (
                                        <option
                                          key={ratio.value}
                                          value={ratio.value}
                                        >
                                          {ratio.label}
                                        </option>
                                      ))}
                                    </select>

                                    {/* Zoom Controls (Plus/Minus Buttons) */}
                                    <div style={{ marginTop: "10px" }}>
                                      <button onClick={zoomIn}>+</button>
                                      <button onClick={zoomOut}>-</button>
                                    </div>

                                    {/* Image Cropping with Zoom */}
                                    {image && (
                                      <div
                                        style={{
                                          position: "relative",
                                          width: "300px",
                                          height: "300px",
                                          marginTop: "20px",
                                          marginBottom: "20px",
                                          border: "1px solid #ddd",
                                        }}
                                      >
                                        <ReactCrop
                                          image={image}
                                          crop={crop}
                                          zoom={zoom}
                                          aspect={aspectRatio} // Apply selected aspect ratio
                                          onCropChange={(newCrop) =>
                                            setCrop(newCrop)
                                          }
                                          onZoomChange={setZoom}
                                          style={{ objectFit: "cover" }}
                                        />
                                      </div>
                                    )}
                                  </div>
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
                            <div className="cmp_logo mt-1">
                              <span className="cmp_textlogo">pe</span>
                            </div>
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
                              <li>{companyProfileDetails?.description}</li>
                              {/* add scroll in discription */}
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
                  <Row>
                    <Col md={9}>
                      <div className="mdl_pagetitle d-flex justify-content-between align-items-center">
                        <h5>User Management</h5>
                        <div className="btn_group">
                          <Button variant="primary">Add User</Button>
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="cmp_details">
                      <div className="rects-panel">
                        <h5>Admin User</h5>
                      </div>
                    </Col>
                  </Row>
                </Modal.Body>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Modal>
  );
};

export default CompanyEditProfile;
