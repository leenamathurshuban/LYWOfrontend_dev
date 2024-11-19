import React, { useState } from "react";

import {
    Accordion,
    Button,
    Card,
    Col,
    Form,
    Modal,
    Nav,
    Row,
    Tab
} from "react-bootstrap";
import FileUploader from "../components/FileUploader";
import { cprofilelogo, starIcon } from "../images/assest";


const CompanyEditProfile = ({show,handleClose}) => {
   
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
                    Profile<span>80% Complete</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    Users<span>4 Active,3 Pending</span>
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
                            <Button variant="primary">Save</Button>
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
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={21} />
                                    <span className="words_limit">
                                      250/500 Words
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Website"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Industry</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Industry"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Company Type</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                      <option>Company Type</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </Form.Select>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Company Size</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                      <option>Company Size</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </Form.Select>
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Headquarter</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Headquarter"
                                    />
                                  </Form.Group>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Add Company Logo</Form.Label>
                                    <div className="cmp_uploder">
                                      <FileUploader />
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
                                  <strong>Company Name</strong>
                                </li>
                                <li>Website</li>
                                <li>Industry</li>
                                <li>Company Type</li>
                                <li>Company Size</li>
                                <li>Headquarter</li>
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <div className="rects-panel">
                          <h5>Recommendations</h5>
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
                            <li>
                              <img src={starIcon} />
                              Select Company Size
                            </li>
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
    )
}

export default CompanyEditProfile