import React, { useState } from 'react';
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Container,
    Modal,
    Row,
    InputGroup,
    Form,
    Spinner,
    Tab , Tabs 
} from "react-bootstrap";

import Select from "react-select";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function GlobalChat() {

    
  // custom style react select box

 const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#deebff"
      : state.isFocused
      ? "#deebff" // Color on hover
      : "inherit",
    color: state.isSelected ? "#000" : "black",
    cursor: "pointer", // Optional: improves UX on hover
  }),
};

const options = [
  { value: 'Recentfirst', label: 'Recent First' },
  { value: 'Oldestfirst', label: 'Oldest First' },
 
]
  
    return (
        <>
            <Header />
            <Sidebar />

            <div className="page-body">
                <Container fluid className="pt-3">
                    <Row className="g-0" style={{ height: 'calc(100vh - 120px)' }}>
                        {/* Left Sidebar - Jobs */}
                        <Col md={3} className="bg-white border-end">
                            <Card className="h-100 border-0 chat-module">
                                <Card.Header className="border-bottom d-flex justify-content-between align-items-center">
                                    <Card.Title>Job List</Card.Title>

                                    <Select
                                    options={options}
                                    //value={userOption.find((opt)=>opt.value===companyInfo)}
                                   // onChange={handleCompanyDropdown}
                                    className="react_selectbox"
                                    styles={customStyles}
                                    />
                                
                                </Card.Header>
                                <Card.Body className="overflow-auto">

                                     <Tabs
                                    defaultActiveKey="profile"
                                    id="uncontrolled-tab-example"
                                    className="mb-3 chat-tabs"
                                    >
                                    <Tab eventKey="home" title="All">
                                         <InputGroup className="header_serach">
                                                    <InputGroup.Text id="basic-addon1">
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
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                      placeholder="Search"
                                                      aria-label="Search"
                                                      aria-describedby="basic-addon1"
                                                    />
                                                  </InputGroup>
                                       
                                    </Tab>
                                    <Tab eventKey="profile" title="Active">
                                         <InputGroup className="header_serach">
                                                    <InputGroup.Text id="basic-addon1">
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
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                      placeholder="Search"
                                                      aria-label="Search"
                                                      aria-describedby="basic-addon1"
                                                    />
                                                  </InputGroup>
                                        
                                    </Tab>
                                    <Tab eventKey="contact" title="Inactive" >
                                         <InputGroup className="header_serach">
                                                    <InputGroup.Text id="basic-addon1">
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
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                      placeholder="Search"
                                                      aria-label="Search"
                                                      aria-describedby="basic-addon1"
                                                    />
                                                  </InputGroup>
                                       
                                    </Tab>
                                    </Tabs>
                                 
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Middle Sidebar - Candidates */}
                       

                        {/* Chat Area */}
                       
                    </Row>
                </Container>
            </div>
        </>
    );
}