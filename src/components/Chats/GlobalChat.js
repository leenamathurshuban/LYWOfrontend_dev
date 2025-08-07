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
  Tab, Tabs,
  Offcanvas,
  Accordion
} from "react-bootstrap";



import Select from "react-select";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Sendicon from "../../images/icons/send-01.svg"
import attachcon from "../../images/icons/paperclip.svg"
import filter from "../../images/icons/filter-lines.svg"

export default function GlobalChat() {

  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  const [show, filterShow] = useState(false);

  const handleClose = () => filterShow(false);
  const handleShow = () => filterShow(true);


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

  const jobs = [
    { title: 'Figma Designer (10)', company: 'Cloudsportre', location: 'Remote - Future', status: 'Active' },
    { title: 'UI Designer (5)', company: 'Cloudsportre', location: 'Remote - Future', status: 'Active' },
    { title: 'Finance Manager (12)', company: 'Cloudsportre', location: 'Remote - Future', status: 'Active' },
    { title: 'Python Developer (6)', company: 'Cloudsportre', location: 'Remote - Future', status: 'Active' },
    { title: 'Senior React Developer (2)', company: 'Cloudsportre', location: 'Remote - Future', status: 'Active' },
  ];

  const candidates = [
    { name: 'Alice Johnson', time: '3 days ago' },
    { name: 'Sandeep Kattamuri', time: '1 day ago' },
    { name: 'Alice Johnson', time: '5 hours ago' },
    { name: 'Sandeep Kattamuri', time: '1 day ago' },
  ];

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Alice Johnson', time: '02:10 PM', text: 'Hi there, How are you?', isUser: false },
    { sender: 'You', time: '02:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non...', isUser: true },
    { sender: 'Alice Johnson', time: '02:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non...', isUser: false },
    { sender: 'Alice Johnson', time: '04:10 PM', text: 'Suspendisse purus quam, finibus ac lacus non, euismod dignissim sapien. Praesent nisl sem, vestibulum vitae mollis in, ullamcorper et magna. ', isUser: false },
  ]);



  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, {
        sender: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: message,
        isUser: true
      }]);
      setMessage('');
    }
  };




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
                <Card.Body className="">

                  <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3 chat-tabs"
                  >
                    <Tab eventKey="home" title="All">
                      <InputGroup className="header_serach mb-3">
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

                      <div className='job-chat-form-card'>
                        {jobs.map((job, index) => (
                          <Card key={index}
                            className={`mb-2 cursor-pointer ${selectedJobIndex === index ? 'active' : ''}`}
                            onClick={() => setSelectedJobIndex(index)}
                          >
                            <Card.Body>
                              <Card.Title className="">{job.title}</Card.Title>
                              <Card.Text className="text-muted fs-12 mb-1">
                                {job.company}
                              </Card.Text>
                              <Card.Text className="text-muted fs-10 ">
                                {job.location}
                              </Card.Text>
                              <span className="badge">
                                {job.status}
                              </span>
                            </Card.Body>
                          </Card>
                        ))}

                      </div>


                    </Tab>
                    <Tab eventKey="profile" title="Active">
                      <div className='filter-chats'>
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
                      </div>

                      <div className='applicant-chats'>
                        <p>
                          There are no Active for this job yet!
                        </p>
                      </div>

                    </Tab>
                    <Tab eventKey="contact" title="Inactive" >
                      <div className='filter-chats'>
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
                      </div>

                      <div className='applicant-chats'>
                        <p>
                          There are no Inactive  job yet!
                        </p>
                      </div>

                    </Tab>
                  </Tabs>

                </Card.Body>
              </Card>
            </Col>

            {/* Middle Sidebar - Candidates */}
            <Col md={3} className="bg-white border-end">
              <Card className="h-100 border-0 chat-module">
                <Card.Header className="border-bottom d-flex justify-content-between align-items-center">
                  <Card.Title>Candidates</Card.Title>

                  <Select
                    options={options}
                    //value={userOption.find((opt)=>opt.value===companyInfo)}
                    // onChange={handleCompanyDropdown}
                    className="react_selectbox"
                    styles={customStyles}
                  />

                </Card.Header>
                <Card.Body className="">

                  <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3 chat-tabs"
                  >
                    <Tab eventKey="home" title="All">
                      <div className='filter-chats mb-3 d-flex justify-content-between gap-2'>
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

                        <Button
                          className="btn btn-light-outline"
                          onClick={handleShow}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            className="me-2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                              stroke="#344054"
                              stroke-width="1.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          filters
                        </Button>
                      </div>

                      <div className='job-chat-form-card'>
                        {candidates.map((candidates, index) => (
                          <Card key={index} className="mb-2 cursor-pointer ">
                            <Card.Body>
                              <Card.Title className="">{candidates.name}</Card.Title>

                              <Card.Text className="text-muted fs-10 ">
                                {candidates.time}
                              </Card.Text>
                              <span className="badge bg-primary-outline">
                                {/* {job.status} */}
                                1
                              </span>
                            </Card.Body>
                          </Card>
                        ))}

                      </div>


                    </Tab>
                    <Tab eventKey="profile" title="Unread">
                      <div className='filter-chats mb-3 d-flex justify-content-between gap-2'>
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

                        <Button
                          className="btn btn-light-outline"
                          onClick={handleShow}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            className="me-2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                              stroke="#344054"
                              stroke-width="1.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          filters
                        </Button>
                      </div>

                      <div className='applicant-chats'>
                        <p>
                          There are no conversation for this job yet!
                        </p>
                      </div>



                    </Tab>
                    <Tab eventKey="contact" title="Selected" >
                      <div className='filter-chats mb-3 d-flex justify-content-between gap-2'>
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

                        <Button
                          className="btn btn-light-outline"
                          onClick={handleShow}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            className="me-2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                              stroke="#344054"
                              stroke-width="1.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          filters
                        </Button>
                      </div>

                      <div className='applicant-chats'>
                        <p>
                          There are no conversation for this job yet!
                        </p>
                      </div>

                    </Tab>
                  </Tabs>

                </Card.Body>
              </Card>
            </Col>

            {/* Chat Area */}

            <Col md={6} className="d-flex flex-column bg-light">
              <Card className="border-0 flex-grow-1 chat-box-global">
                <Card.Header className="border-bottom">
                  <Card.Title>Alice Johnson</Card.Title>
                  <Card.Text className="text-muted small">
                    Assignment for Figma Designer  <span className='text-warning'> • Incomplete </span>
                  </Card.Text>
                </Card.Header>
                <Card.Body className=" ">
                  <div className='message-chat-body overflow-auto'>

                    <p className='date-msg'><small>December 10</small></p>

                    {
                      messages.map((msg, index) => (
                        <div key={index} className={`mb-3 ${msg.isUser ? 'text-end' : 'text-start'}`}>
                          <Card
                            className={`d-inline-block no-border ${msg.isUser ? 'bg-sender text-white' : 'bg-white'}`}
                          >
                            <Card.Body className="p-2" >
                              <Card.Text>{msg.text} </Card.Text>
                              < Card.Text className={`small ${msg.isUser ? '' : 'text-muted'}`}>

                              </Card.Text>
                            </Card.Body>

                          </Card>

                          <p className='time-msg' > <small> {msg.time} </small></p>
                        </div>
                      ))}





                  </div>

                  <div className='chat-form'>
                    <Form onSubmit={handleSendMessage}>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Your Message here"
                        />
                        <label for="fileattached">
                          <input type='file' id="fileattached" hidden />
                          <button className='attachment' > <img src={attachcon} className='img-fluid' alt='attach' /> </button>
                        </label>

                        <Button variant="primary" type="submit" >
                          <img src={Sendicon} className='img-fluid' alt='send' />
                        </Button>
                      </InputGroup>
                    </Form>
                  </div>
                </Card.Body>

              </Card>
            </Col>

          </Row>
        </Container>
      </div>

      {/* filter */}
      <Offcanvas show={show} onHide={handleClose} placement='end' >

        <Offcanvas.Header className='d-flex justify-content-between' closeButton>
          <Offcanvas.Title className='d-flex align-items-center' > <img src={filter} className='img-fluid' /> Filters</Offcanvas.Title>
          <span class="applied_count">Applied (0)</span>
        </Offcanvas.Header>
        <Offcanvas.Body className='filter_warp ' >
          <div className='accordion'>
            <div className='filter_item'>
              <Accordion defaultActiveKey={["0", "1", "2"]} flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Match </Accordion.Header>
                  <Accordion.Body>
                    <ul className="filter_itemlist new-filter-chat">
                      <li>
                        <div className="custom-checkbox form-check">
                          <input name="Full-time" type="checkbox" className="form-check-input" />
                          <label title="" className="form-check-label">0% - 50%</label>
                        </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="Part-time" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">50% - 70%</label>
                      </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="More than" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">More than 70%</label>
                      </div>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Personality</Accordion.Header>
                  <Accordion.Body>
                    <ul className="filter_itemlist new-filter-chat">
                      <li>
                        <div className="custom-checkbox form-check">
                          <input name="Leader" type="checkbox" className="form-check-input" />
                          <label title="" className="form-check-label">Leader</label>
                        </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="Influencer" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Influencer</label>
                      </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="Team-Player" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Team Player</label>
                      </div>
                      </li>

                      <li><div className="custom-checkbox form-check">
                        <input name="Perfectionist" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Perfectionist</label>
                      </div>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Status</Accordion.Header>
                  <Accordion.Body>
                    <ul className="filter_itemlist new-filter-chat">
                      <li>
                        <div className="custom-checkbox form-check">
                          <input name="Shortlisted" type="checkbox" className="form-check-input" />
                          <label title="" className="form-check-label">Shortlisted</label>
                        </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="On-Hold" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">On Hold</label>
                      </div>
                      </li>
                      <li><div className="custom-checkbox form-check">
                        <input name="Rejected" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Rejected</label>
                      </div>
                      </li>

                      <li><div className="custom-checkbox form-check">
                        <input name="Review-Pending" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Review Pending</label>
                      </div>
                      </li>

                      <li><div className="custom-checkbox form-check">
                        <input name="Reminder-Sent" type="checkbox" className="form-check-input" />
                        <label title="" className="form-check-label">Reminder Sent</label>
                      </div>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </Offcanvas.Body>

        <div className="offcanvas-footer text-end">
          <Button variant="light" className="me-3" type="button" onClick={() => console.log('Clear all')}  >
            Clear All
          </Button>
          <Button variant="primary" type="button" onClick={() => console.log('Apply filters')} >
            Apply
          </Button>
        </div>




      </Offcanvas>

    </>
  );
}