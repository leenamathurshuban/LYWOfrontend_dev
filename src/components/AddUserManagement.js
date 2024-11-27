import { Button, Card, Form, Table } from "react-bootstrap";
import { useState } from "react";



const AddUserManagement = () => {
    const [userData,setUserData] = useState(
         [
            {
              email: "ravi@paperpencilpixel.com",
              name: "Ravinder Nain",
              phone: "9875263214",
              status: "Active 1 day ago",
              switchStatus: false, // switch is off
              actions: [
                {
                  icon: "edit", // Placeholder for the icon, can represent SVG or action type
                  label: "Edit",
                },
              ],
            },
            {
              email: "ravi@paperpencilpixel.com",
              name: "Ravinder Nain",
              phone: "9875263214",
              status: "Invitation Sent",
              switchStatus: true, // switch is on
              actions: [
                {
                  icon: "edit", // Placeholder for the icon, can represent SVG or action type
                  label: "Edit",
                },
              ],
            },
            {
              email: "ravi@paperpencilpixel.com",
              name: "Ravinder Nain",
              phone: "9875263214",
              status: "Online",
              switchStatus: false, // switch is off
              actions: [
                {
                  icon: "edit", // Placeholder for the icon, can represent SVG or action type
                  label: "Edit",
                },
              ],
            },
            {
              email: "ravi@paperpencilpixel.com",
              name: "Ravinder Nain",
              phone: "9875263214",
              status: "No Status", // No status provided in the HTML
              switchStatus: false, // switch is off
              actions: [
                {
                  icon: "cancel", // Placeholder for the icon, can represent SVG or action type
                  label: "Cancel",
                },
                {
                  icon: "invite", // Placeholder for the icon, can represent SVG or action type
                  label: "Invite",
                },
              ],
            },
          ]
          
    )

  return (
    <Form>
      <Card.Body>
        <Table className="no-bordered">
          <thead>
            <tr>
              <th>
                <span className="me-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="19"
                      height="19"
                      rx="5.5"
                      fill="#EEF4FF"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="19"
                      height="19"
                      rx="5.5"
                      stroke="#444CE7"
                    />
                    <path
                      d="M5.91675 10H14.0834"
                      stroke="#444CE7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                Email (will be used for login)
              </th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Admin</th>
              <th> &nbsp; </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <Form.Check
                    className="inline-checkbox me-2_5"
                    name="group1"
                    type="checkbox"
                  />
                  <Form.Group
                    controlId="ravi@paperpencilpixel.com"
                    className="form-inline"
                  >
                    <Form.Control
                      type="email"
                      placeholder="ravi@paperpencilpixel.com"
                      className="sm-fcontrol"
                    />
                  </Form.Group>
                </div>
              </td>
              <td>
                <Form.Group controlId="name01" className="form-inline">
                  <Form.Control
                    type="text"
                    placeholder="Ravinder Nain"
                    className="sm-fcontrol"
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="phone01" className="form-inline">
                  <Form.Control
                    type="text"
                    placeholder="9875263214"
                    className="sm-fcontrol"
                  />
                </Form.Group>
              </td>
              <td>
                <span>Active 1 day ago</span>
              </td>
              <td>
                <Form.Check
                  className="inline-checkbox"
                  type="switch"
                  id="custom-switch"
                />
              </td>
              <td>
                <Button className="btn-transpant">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99992C10.8332 9.53968 10.4601 9.16659 9.99984 9.16659C9.5396 9.16659 9.1665 9.53968 9.1665 9.99992C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99984 4.99992C10.4601 4.99992 10.8332 4.62682 10.8332 4.16659C10.8332 3.70635 10.4601 3.33325 9.99984 3.33325C9.5396 3.33325 9.1665 3.70635 9.1665 4.16659C9.1665 4.62682 9.5396 4.99992 9.99984 4.99992Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99984 16.6666C10.4601 16.6666 10.8332 16.2935 10.8332 15.8333C10.8332 15.373 10.4601 14.9999 9.99984 14.9999C9.5396 14.9999 9.1665 15.373 9.1665 15.8333C9.1665 16.2935 9.5396 16.6666 9.99984 16.6666Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <Form.Check
                    className="inline-checkbox me-2_5"
                    name="group1"
                    type="checkbox"
                    checked
                  />
                  <Form.Group
                    controlId="ravi@paperpencilpixel.com"
                    className="form-inline"
                  >
                    <Form.Control
                      type="email"
                      placeholder="ravi@paperpencilpixel.com"
                      className="sm-fcontrol"
                    />
                  </Form.Group>
                </div>
              </td>
              <td>
                <Form.Group controlId="name01" className="form-inline">
                  <Form.Control
                    type="text"
                    placeholder="Ravinder Nain"
                    className="sm-fcontrol"
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="phone01" className="form-inline">
                  <Form.Control
                    type="text"
                    placeholder="9875263214"
                    className="sm-fcontrol"
                  />
                </Form.Group>
              </td>
              <td>
                <span>Invitation Sent</span>
              </td>
              <td>
                <Form.Check
                  className="inline-checkbox"
                  type="switch"
                  id="custom-switch"
                />
              </td>
              <td>
                <Button className="btn-transpant">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99992C10.8332 9.53968 10.4601 9.16659 9.99984 9.16659C9.5396 9.16659 9.1665 9.53968 9.1665 9.99992C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99984 4.99992C10.4601 4.99992 10.8332 4.62682 10.8332 4.16659C10.8332 3.70635 10.4601 3.33325 9.99984 3.33325C9.5396 3.33325 9.1665 3.70635 9.1665 4.16659C9.1665 4.62682 9.5396 4.99992 9.99984 4.99992Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99984 16.6666C10.4601 16.6666 10.8332 16.2935 10.8332 15.8333C10.8332 15.373 10.4601 14.9999 9.99984 14.9999C9.5396 14.9999 9.1665 15.373 9.1665 15.8333C9.1665 16.2935 9.5396 16.6666 9.99984 16.6666Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <Form.Check
                    className="inline-checkbox me-2_5"
                    name="group1"
                    type="checkbox"
                  />
                  <Form.Group
                    controlId="ravi@paperpencilpixel.com"
                    className="form-inline"
                  >
                    <Form.Control
                      type="email"
                      placeholder="ravi@paperpencilpixel.com"
                      className="sm-fcontrol"
                    />
                  </Form.Group>
                </div>
              </td>
              <td>
                <Form.Group controlId="name01" className="form-inline">
                  <Form.Control
                    type="text"
                    placeholder="Ravinder Nain"
                    className="sm-fcontrol"
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="phone01" className="form-inline">
                  <Form.Control
                    type="text"
                    placeholder="9875263214"
                    className="sm-fcontrol"
                  />
                </Form.Group>
              </td>
              <td>
                <span>Online</span>
              </td>
              <td>
                <Form.Check
                  className="inline-checkbox"
                  type="switch"
                  id="custom-switch"
                />
              </td>
              <td>
                <Button className="btn-transpant">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99992C10.8332 9.53968 10.4601 9.16659 9.99984 9.16659C9.5396 9.16659 9.1665 9.53968 9.1665 9.99992C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99984 4.99992C10.4601 4.99992 10.8332 4.62682 10.8332 4.16659C10.8332 3.70635 10.4601 3.33325 9.99984 3.33325C9.5396 3.33325 9.1665 3.70635 9.1665 4.16659C9.1665 4.62682 9.5396 4.99992 9.99984 4.99992Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99984 16.6666C10.4601 16.6666 10.8332 16.2935 10.8332 15.8333C10.8332 15.373 10.4601 14.9999 9.99984 14.9999C9.5396 14.9999 9.1665 15.373 9.1665 15.8333C9.1665 16.2935 9.5396 16.6666 9.99984 16.6666Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <Form.Check
                    className="inline-checkbox me-2_5"
                    name="group1"
                    type="checkbox"
                  />
                  <Form.Group
                    controlId="ravi@paperpencilpixel.com"
                    className="form-inline"
                  >
                    <Form.Control
                      type="email"
                      placeholder="ravi@paperpencilpixel.com"
                      className="sm-fcontrol"
                    />
                  </Form.Group>
                </div>
              </td>
              <td>
                <Form.Group controlId="name01" className="form-inline">
                  <Form.Control
                    type="text"
                    placeholder="Ravinder Nain"
                    className="sm-fcontrol"
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="phone01" className="form-inline">
                  <Form.Control
                    type="text"
                    placeholder="9875263214"
                    className="sm-fcontrol"
                  />
                </Form.Group>
              </td>
              <td>
                <Button variant="light" className="btn-sm me-2">
                  Cancel
                </Button>
                <Button variant="primary" className="btn-sm">
                  Invite
                </Button>
              </td>
              <td>
                <Form.Check
                  className="inline-checkbox"
                  type="switch"
                  id="custom-switch"
                />
              </td>
              <td>
                <Button className="btn-transpant">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99992C10.8332 9.53968 10.4601 9.16659 9.99984 9.16659C9.5396 9.16659 9.1665 9.53968 9.1665 9.99992C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99984 4.99992C10.4601 4.99992 10.8332 4.62682 10.8332 4.16659C10.8332 3.70635 10.4601 3.33325 9.99984 3.33325C9.5396 3.33325 9.1665 3.70635 9.1665 4.16659C9.1665 4.62682 9.5396 4.99992 9.99984 4.99992Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99984 16.6666C10.4601 16.6666 10.8332 16.2935 10.8332 15.8333C10.8332 15.373 10.4601 14.9999 9.99984 14.9999C9.5396 14.9999 9.1665 15.373 9.1665 15.8333C9.1665 16.2935 9.5396 16.6666 9.99984 16.6666Z"
                      stroke="#475467"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Form>
  );
};

export default AddUserManagement;

