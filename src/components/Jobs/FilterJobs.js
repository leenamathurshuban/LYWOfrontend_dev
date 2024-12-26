import { Accordion, Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import filterLines from "../../images/icons/filter-lines.svg";

const FilterJobs = ({ show, handleClose }) => {
  return (
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
        <span className="applied_count">Applied (2)</span>
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
                      name="group1"
                      type="checkbox"
                      label="Full -Time"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
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
                      name="group1"
                      type="checkbox"
                      label="Work from office"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Remote"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Hybrid"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
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
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Delhi"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Mumbai"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Bengaluru"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Hyderabad"
                    />
                  </li>
                </ul>
                <Button variant="link">View More</Button>
              </Accordion.Body>
            </Accordion.Item>
          </div>
          <div className="filter_item">
            <Accordion.Item eventKey="3">
              <Accordion.Header>Department</Accordion.Header>
              <Accordion.Body>
                <ul className="filter_itemlist">
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Engineering - Software"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Sales & Business Dev"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Marketing & Communication"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Customer Service"
                    />
                  </li>
                </ul>
                <Button variant="link">View More</Button>
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
                      name="group1"
                      type="checkbox"
                      label="Active"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="Draft"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
                      label="App. Stopped"
                    />
                  </li>
                  <li>
                    <Form.Check
                      className="inline-checkbox"
                      name="group1"
                      type="checkbox"
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
                <Form.Control type="date" placeholder="09/12/2024" />
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
                <Form.Control type="date" placeholder="09/12/2024" />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Offcanvas.Body>
      <div className="offcanvas-footer text-end">
        <Button variant="light" className="me-3">
          Clear All
        </Button>
        <Button variant="primary">Apply</Button>
      </div>
    </Offcanvas>
  );
};

export default FilterJobs;
