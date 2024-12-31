import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  Offcanvas,
  Row,
  Modal,
} from "react-bootstrap";
import {
  CreateJobDepartment,
  CreateJobLocation,
} from "../../services/provider";
import filterLines from "../../images/icons/filter-lines.svg";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const FilterJobs = ({ show, handleClose, filtersList, filterAppliedCount, setFilters }) => {
  const [departmentData, setDepartmentData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [viewMore, setViewMore] = useState({
    isModalFor: "",
    ModalOpen: false,
  });
  const [viewMoreList, setViewMoreList] = useState([]);

  useEffect(() => {
    if (show) {
      handleDepartmentApi();
      handleLocationApi();
    }
  }, [show]);
  
  const handleDepartmentApi = () => {
    const url = `https://bittrend.shubansoftware.com/assets-api/department-list-api/?page=1&limit=10`;
    CreateJobDepartment(url)
      .then((res) => {
        setDepartmentData(res.data.response);
      })
      .catch((error) => console.log("errooorrr----", error));
  };
  const handleLocationApi = () => {
    const url = `https://bittrend.shubansoftware.com/account-api/location-list-api/?page=1&limit=500`;
    CreateJobLocation(url)
      .then((res) => {
        setLocationData(res.data.response);
      })
      .catch((error) => console.log("errooorrr----", error));
  };

  const handleViewMoreClose = () => {
    setViewMore((prevState) => ({ ...prevState, ModalOpen: false }));
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop={false}
        placement="end"
        className="shadow-md border-0"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={filterLines} alt="" />
            More Filters
          </Offcanvas.Title>
          <span className="applied_count">Applied ({filterAppliedCount})</span>
        </Offcanvas.Header>
        <Offcanvas.Body className="filter_warp">
          <Accordion defaultActiveKey={["0", "1", "2", "3", "4"]} alwaysOpen>
            <div className="filter_item">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Job Type</Accordion.Header>
                <Accordion.Body>
                  <ul className="filter_itemlist">
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Full -Time"
                        type="checkbox"
                        checked={filtersList.job_type.includes("Full -Time")}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            job_type: e.target.checked
                              ? prevState.job_type
                                ? `${prevState.job_type},${e.target.name}`
                                : e.target.name
                              : prevState.job_type
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Full -Time"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Part -Time"
                        type="checkbox"
                        checked={filtersList.job_type.includes("Part -Time")}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            job_type: e.target.checked
                              ? prevState.job_type
                                ? `${prevState.job_type},${e.target.name}`
                                : e.target.name
                              : prevState.job_type
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Part -Time"
                      />
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div className="filter_item">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Workplace Type</Accordion.Header>
                <Accordion.Body>
                  <ul className="filter_itemlist">
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Work from office"
                        type="checkbox"
                        checked={filtersList.workplace_type.includes(
                          "Work from office"
                        )}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            workplace_type: e.target.checked
                              ? prevState.workplace_type
                                ? `${prevState.workplace_type},${e.target.name}`
                                : e.target.name
                              : prevState.workplace_type
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Work from office"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Remote"
                        type="checkbox"
                        checked={filtersList.workplace_type.includes("Remote")}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            workplace_type: e.target.checked
                              ? prevState.workplace_type
                                ? `${prevState.workplace_type},${e.target.name}`
                                : e.target.name
                              : prevState.workplace_type
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Remote"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Hybrid"
                        type="checkbox"
                        checked={filtersList.workplace_type.includes("Hybrid")}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            workplace_type: e.target.checked
                              ? prevState.workplace_type
                                ? `${prevState.workplace_type},${e.target.name}`
                                : e.target.name
                              : prevState.workplace_type
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Hybrid"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Work from Home"
                        type="checkbox"
                        checked={filtersList.workplace_type.includes(
                          "Work from Home"
                        )}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            workplace_type: e.target.checked
                              ? prevState.workplace_type
                                ? `${prevState.workplace_type},${e.target.name}`
                                : e.target.name
                              : prevState.workplace_type
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Work from Home"
                      />
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div className="filter_item">
              <Accordion.Item eventKey="2">
                <Accordion.Header>Location</Accordion.Header>
                <Accordion.Body>
                  <ul className="filter_itemlist">
                    {!!locationData &&
                      locationData.length > 0 &&
                      locationData.slice(0, 4).map((location, locationidx) => (
                        <li>
                          <Form.Check
                            key={locationidx}
                            className="inline-checkbox"
                            name={location.location_name}
                            type="checkbox"
                            checked={filtersList.job_location.includes(
                              location.location_name
                            )}
                            onChange={(e) => {
                              setFilters((prevState) => ({
                                ...prevState,
                                job_location: e.target.checked
                                  ? prevState.job_location
                                    ? `${prevState.job_location},${e.target.name}`
                                    : e.target.name
                                  : prevState.job_location
                                      .split(",")
                                      .filter((item) => item !== e.target.name)
                                      .join(","),
                              }));
                            }}
                            label={location.location_name}
                          />
                        </li>
                      ))}
                  </ul>
                  {locationData?.length > 4 && (
                    <Button
                      onClick={() => {
                        setViewMore((prevState) => ({
                          ...prevState,
                          ModalOpen: true,
                          isModalFor: "Location",
                        }));
                        setViewMoreList(locationData);
                      }}
                      variant="link"
                    >
                      View More
                    </Button>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div className="filter_item">
              <Accordion.Item eventKey="3">
                <Accordion.Header>Department</Accordion.Header>
                <Accordion.Body>
                  <ul className="filter_itemlist">
                    {!!departmentData &&
                      departmentData.length > 0 &&
                      departmentData.slice(0, 4).map((dept, deptidx) => (
                        <li>
                          <Form.Check
                            key={deptidx}
                            className="inline-checkbox"
                            name={dept.department_name}
                            type="checkbox"
                            checked={filtersList.department.includes(
                              dept.department_name
                            )}
                            onChange={(e) => {
                              setFilters((prevState) => ({
                                ...prevState,
                                department: e.target.checked
                                  ? prevState.department
                                    ? `${prevState.department},${e.target.name}`
                                    : e.target.name
                                  : prevState.department
                                      .split(",")
                                      .filter((item) => item !== e.target.name)
                                      .join(","),
                              }));
                            }}
                            label={dept.department_name}
                          />
                        </li>
                      ))}
                  </ul>
                  {departmentData?.length > 4 && (
                    <Button
                      onClick={() => {
                        setViewMore((prevState) => ({
                          ...prevState,
                          ModalOpen: true,
                          isModalFor: "Department",
                        }));
                        setViewMoreList(departmentData);
                      }}
                      variant="link"
                    >
                      View More
                    </Button>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div className="filter_item">
              <Accordion.Item eventKey="4">
                <Accordion.Header>Status</Accordion.Header>
                <Accordion.Body>
                  <ul className="filter_itemlist">
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Active"
                        type="checkbox"
                        checked={filtersList.job_status.includes("Active")}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            job_status: e.target.checked
                              ? prevState.job_status
                                ? `${prevState.job_status},${e.target.name}`
                                : e.target.name
                              : prevState.job_status
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Active"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Draft"
                        type="checkbox"
                        checked={filtersList.job_status.includes("Draft")}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            job_status: e.target.checked
                              ? prevState.job_status
                                ? `${prevState.job_status},${e.target.name}`
                                : e.target.name
                              : prevState.job_status
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Draft"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="App. Stopped"
                        type="checkbox"
                        checked={filtersList.job_status.includes(
                          "App. Stopped"
                        )}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            job_status: e.target.checked
                              ? prevState.job_status
                                ? `${prevState.job_status},${e.target.name}`
                                : e.target.name
                              : prevState.job_status
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="App. Stopped"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Closed"
                        type="checkbox"
                        checked={filtersList.job_status.includes("Closed")}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            job_status: e.target.checked
                              ? prevState.job_status
                                ? `${prevState.job_status},${e.target.name}`
                                : e.target.name
                              : prevState.job_status
                                  .split(",")
                                  .filter((item) => item !== e.target.name)
                                  .join(","),
                          }));
                        }}
                        label="Closed"
                      />
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
          <div className="filter_item">
            <h5 className="fltitem_title">Target Hire Date</h5>
            <Row>
              <Col xs={4} className="pe-0">
                <Form.Select>
                  <option>On</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
              <Col xs={8}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="date"
                    value={filtersList?.target_hire_date || ""}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      console.log("Selected Date:", selectedDate);
                      setFilters((prevState) => ({
                        ...prevState,
                        target_hire_date: selectedDate,
                      }));
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <h5 className="fltitem_title">Posted On</h5>
            <Row>
              <Col xs={4} className="pe-0">
                <Form.Select>
                  <option>On</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
              <Col xs={8}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="date"
                    value={filtersList?.posted_on || ""}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      console.log("Selected Date:", selectedDate);
                      setFilters((prevState) => ({
                        ...prevState,
                        posted_on: selectedDate,
                      }));
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Offcanvas.Body>
        <div className="offcanvas-footer text-end">
          <Button
            onClick={(e) => {
              setFilters({
                job_type: "",
                workplace_type: "",
                job_location: "",
                job_status: "",
                targate_hire_date: "",
                department: "",
                posted_on: "",
              });
            }}
            variant="light"
            className="me-3"
          >
            Clear All
          </Button>
          <Button onClick={handleClose} variant="primary">
            Apply
          </Button>
        </div>
      </Offcanvas>
      <Modal
        show={viewMore.ModalOpen}
        onHide={handleViewMoreClose}
        className="confirmation_model filter_modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div>
            <h4 className="primary">{viewMore?.isModalFor}</h4>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>
            <ul>
              {viewMoreList &&
                viewMoreList.length > 0 &&
                viewMoreList.map((item, idx) => (
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name={
                        viewMore.isModalFor === "Location"
                          ? item.location_name
                          : item.department_name
                      }
                      type="checkbox"
                      checked={
                        viewMore.isModalFor === "Location"
                          ? item?.job_location
                          : item?.department?.includes(
                              viewMore.isModalFor === "Location"
                                ? item.location_name
                                : item.department_name
                            )
                      }
                      onChange={(e) => {
                        setFilters((prevState) =>
                          viewMore.isModalFor === "Location"
                            ? {
                                ...prevState,
                                job_location: e.target.checked
                                  ? prevState.job_location
                                    ? `${prevState.job_location},${e.target.name}`
                                    : e.target.name
                                  : prevState.job_location
                                      .split(",")
                                      .filter((item) => item !== e.target.name)
                                      .join(","),
                              }
                            : {
                                ...prevState,
                                department: e.target.checked
                                  ? prevState.department
                                    ? `${prevState.department},${e.target.name}`
                                    : e.target.name
                                  : prevState.department
                                      .split(",")
                                      .filter((item) => item !== e.target.name)
                                      .join(","),
                              }
                        );
                      }}
                      label={
                        viewMore.isModalFor === "Location"
                          ? item.location_name
                          : item.department_name
                      }
                    />
                  </li>
                ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterJobs;