import React, { useState, useEffect, useRef } from "react";
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

const FilterJobs = ({
  show,
  handleClose,
  filtersList,
  filterAppliedCount,
  setFilters,
  handleApplyFilter
}) => {
  const [departmentData, setDepartmentData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [viewMore, setViewMore] = useState({
    isModalFor: "",
    ModalOpen: false,
  });
  const [viewMoreList, setViewMoreList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMoreSearch, setViewMoreSearch] = useState([])
  const modalRef = useRef(null);

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

  // const handleViewMoreClose = () => {
  //   setViewMore((prevState) => ({ ...prevState, ModalOpen: false }));
  // };

  // <----------------------------------load more on scroll----------------->
  // const fetchViewMoreList = async (currentPage = 1) => {
  //   const limit = 500;

  //   const url =
  //     viewMore.isModalFor === "Location"
  //       ? `https://bittrend.shubansoftware.com/account-api/location-list-api/?page=${currentPage}&limit=${limit}`
  //       : `https://bittrend.shubansoftware.com/assets-api/department-list-api/?page=${currentPage}&limit=${limit}`;

  //   try {
  //     const response =
  //       viewMore.isModalFor === "Location"
  //         ? await CreateJobLocation(url)
  //         : await CreateJobDepartment(url);

  //     const newData = response?.data?.response || [];

  //     setViewMoreList((prev) => [...prev, ...newData]);
  //     setHasMore(newData.length === limit); // If returned less than limit, no more data
  //   } catch (err) {
  //     console.error("Pagination error:", err);
  //     setHasMore(false);
  //   }
  // };

  // useEffect(() => {
  //   if (viewMore.ModalOpen) {
  //     setPage(1);
  //     setViewMoreList([]);
  //     setHasMore(true);
  //     fetchViewMoreList(1);

  //     const modalContent = document.querySelector(".filter_data");

  //     const handleScroll = () => {
  //       if (
  //         modalContent.scrollTop + modalContent.clientHeight >= modalContent.scrollHeight - 10 &&
  //         hasMore
  //       ) {
  //         setPage((prev) => {
  //           const nextPage = prev + 1;
  //           fetchViewMoreList(nextPage);
  //           return nextPage;
  //         });
  //       }
  //     };

  //     modalContent.addEventListener("scroll", handleScroll);
  //     return () => modalContent.removeEventListener("scroll", handleScroll);
  //   }
  // }, [viewMore.ModalOpen]);

  // const handleViewMoreClose = () => {
  //   setViewMore((prevState) => ({ ...prevState, ModalOpen: false }));
  //   setViewMoreList([]); // Clear on close
  // };
  const fetchViewMoreList = async (currentPage = 1) => {
    const limit = 500;

    const url =
      viewMore.isModalFor === "Location"
        ? `https://bittrend.shubansoftware.com/account-api/location-list-api/?page=${currentPage}&limit=${limit}`
        : `https://bittrend.shubansoftware.com/assets-api/department-list-api/?page=${currentPage}&limit=${limit}`;

    try {
      const response =
        viewMore.isModalFor === "Location"
          ? await CreateJobLocation(url)
          : await CreateJobDepartment(url);

      const newData = response?.data?.response || [];

      setViewMoreList((prev) => [...prev, ...newData]);
      setHasMore(newData.length === limit);

      return true; // resolves when done
    } catch (err) {
      console.error("Pagination error:", err);
      setHasMore(false);
      return false;
    }
  };
  const handleLocationDepartmentsearch = async (e) => {
    const { name, value } = e.target;
    const limit = 500;
    setFilters((prevState) =>
      viewMore.isModalFor === "Location"
        ? {
          ...prevState,
          job_location: value
        }
        : {
          ...prevState,
          department: value
        }
    );
    const url =
      viewMore.isModalFor === "Location"
        ? `https://bittrend.shubansoftware.com/account-api/location-list-api/?limit=${limit}&search=${value}`
        : `https://bittrend.shubansoftware.com/assets-api/department-list-api/?limit=${limit}&search=${value}`;

    try {
      const response =
        viewMore.isModalFor === "Location"
          ? await CreateJobLocation(url)
          : await CreateJobDepartment(url);

      const newData = response?.data?.response || [];

      // setViewMoreList((prev) => [...prev, ...newData]);
      setViewMoreSearch(newData)
      setHasMore(newData.length === limit);

      return true; // resolves when done
    } catch (err) {
      console.error("Pagination error:", err);
      setHasMore(false);
      return false;
    }
  }

  useEffect(() => {
    if (viewMore.ModalOpen) {
      setPage(1);
      setViewMoreList([]);
      setHasMore(true);
      fetchViewMoreList(1);

      const modalContent = modalRef.current;
      let isFetching = false;

      const handleScroll = () => {
        if (
          modalContent &&
          !isFetching &&
          modalContent.scrollTop + modalContent.clientHeight >= modalContent.scrollHeight - 10 &&
          hasMore
        ) {
          isFetching = true;
          const nextPage = page + 1;
          fetchViewMoreList(nextPage).then(() => {
            setPage(nextPage);
            isFetching = false;
          });
        }
      };

      if (modalContent) {
        modalContent.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (modalContent) {
          modalContent.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [viewMore.ModalOpen, viewMore.isModalFor]); // removed 'hasMore' and 'page'
  const handleViewMoreClose = () => {
    setViewMore((prevState) => ({ ...prevState, ModalOpen: false }));
    setViewMoreList([]); // Clear on close
    setViewMoreSearch([])
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
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
                        name="Full-time"
                        type="checkbox"
                        checked={filtersList.job_type.includes("Full-time")}
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     job_type: e.target.checked ? "Full-time" : "",
                        //   }));
                        // }}
                        label="Full -Time"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Part-time"
                        type="checkbox"
                        checked={filtersList.job_type.includes("Part-time")}
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     job_type: e.target.checked ? "Part-time" : "",
                        //   }));
                        // }}
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
                        name="On-site"
                        type="checkbox"
                        checked={filtersList.workplace_type.includes(
                          "On-site"
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     workplace_type: e.target.checked ? "On-site" : "",
                        //   }));
                        // }}
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     workplace_type: e.target.checked ? "Remote" : "",
                        //   }));
                        // }}
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     workplace_type: e.target.checked ? "Hybrid" : "",
                        //   }));
                        // }}
                        label="Hybrid"
                      />
                    </li>
                    {/* <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Work from Home"
                        type="checkbox"
                        checked={filtersList.workplace_type.includes(
                          "Work from Home"
                        )}
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     workplace_type: e.target.checked
                        //       ? prevState.workplace_type
                        //         ? `${prevState.workplace_type},${e.target.name}`
                        //         : e.target.name
                        //       : prevState.workplace_type
                        //         .split(",")
                        //         .filter((item) => item !== e.target.name)
                        //         .join(","),
                        //   }));
                        // }}
                        onChange={(e) => {
                          setFilters((prevState) => ({
                            ...prevState,
                            workplace_type: e.target.checked ? "Work from Home" : "",
                          }));
                        }}
                        label="Work from Home"
                      />
                    </li> */}
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
                            // onChange={(e) => {
                            //   setFilters((prevState) => ({
                            //     ...prevState,
                            //     job_location: e.target.checked ? location.location_name : "",
                            //   }));
                            // }}
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
                            // onChange={(e) => {
                            //   setFilters((prevState) => ({
                            //     ...prevState,
                            //     department: e.target.checked ? dept.department_name : "",
                            //   }));
                            // }}
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     job_status: e.target.checked ? "Active" : "",
                        //   }));
                        // }}
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     job_status: e.target.checked ? "Draft" : "",
                        //   }));
                        // }}
                        label="Draft"
                      />
                    </li>
                    <li>
                      <Form.Check
                        className="inline-checkbox"
                        name="Application-Stopped"
                        type="checkbox"
                        checked={filtersList.job_status.includes(
                          "Application-Stopped"
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     job_status: e.target.checked ? "Application-Stopped" : "",
                        //   }));
                        // }}
                        label="Application-Stopped"
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
                        // onChange={(e) => {
                        //   setFilters((prevState) => ({
                        //     ...prevState,
                        //     job_status: e.target.checked ? "Closed" : "",
                        //   }));
                        // }}
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
                  <option value="" disabled hidden>On</option>
                  <option value="1">On</option>
                  {/* <option value="2">Two</option>
                  <option value="3">Three</option> */}
                </Form.Select>
              </Col>
              <Col xs={8}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="date"
                    value={filtersList?.targate_hire_date || ""}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      console.log("Selected Date:", selectedDate);
                      setFilters((prevState) => ({
                        ...prevState,
                        targate_hire_date: selectedDate,
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
                  <option value="" disabled hidden>On</option>
                  <option value="1">On</option>
                  {/* <option value="2">Two</option>
                  <option value="3">Three</option> */}
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
          <Button onClick={handleApplyFilter} variant="primary">
            Apply
          </Button>
        </div>
      </Offcanvas>
      <Modal
        show={viewMore.ModalOpen}
        onHide={handleViewMoreClose}
        className="filter_modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div>
            <h4 className="primary">{viewMore?.isModalFor}</h4>
          </div>
          <Form.Group className="mb-3 relative">
            <Form.Control
              placeholder={`${viewMore.isModalFor === "Location" ? "Search Location" : "Search Department"}`}
              aria-label="Search"
              className="w-100" // width 50% of the parent container
              value={viewMore.isModalFor === "Location"?filtersList.job_location:filtersList.department}
              onChange={handleLocationDepartmentsearch}
            />
            <div className={`${viewMoreSearch?.length > 0 ? 'ctm_dropdown ct_scrollbar' : ''}`}>
              <ul>
                {viewMoreSearch?.map((item) => (
                  (
                    <li
                      key={item.id}
                      onClick={() => {
                        setFilters((prevState) =>
                          viewMore.isModalFor === "Location"
                            ? {
                              ...prevState,
                              job_location: item.location_name
                            }
                            : {
                              ...prevState,
                              department: item.department_name
                            }
                        );
                        setViewMoreSearch()
                      }}
                    >
                      {viewMore.isModalFor === "Location"
                        ? item.location_name
                        : item.department_name}
                    </li>
                  )
                ))}
              </ul>
            </div>
          </Form.Group>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="filter_data ct_scrollbar" ref={modalRef}>
            <ul className="filter_datalist">
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
                          // ? item?.job_location
                          // : item?.department?.includes(
                          //   viewMore.isModalFor === "Location"
                          //     ? item.location_name
                          //     : item.department_name
                          // )
                          ? filtersList.job_location?.includes(item?.location_name) : filtersList.department.includes(item.department_name)
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
                      // onChange={(e) => {                        
                      //   setFilters((prevState) =>
                      //     viewMore.isModalFor === "Location"
                      //       ? {
                      //         ...prevState,
                      //         job_location: e.target.checked
                      //           ? item.location_name:''
                      //       }
                      //       : {
                      //         ...prevState,
                      //         department: e.target.checked
                      //           ? item.department_name:''}
                      //   );
                      // }}
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
        <Modal.Footer>
          <Button variant="light" className="me-3" onClick={handleViewMoreClose}>Cancel</Button>
          <Button onClick={() => { handleApplyFilter(); handleViewMoreClose() }} variant="primary">Apply</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterJobs;
