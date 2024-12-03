import axios from "axios";
import { useState } from "react";
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
  Table,
  Tab,
  Dropdown,
} from "react-bootstrap";
import { getToken } from "../../services/axiosInstance";
import { getTimeAgo } from "../../helpers/helper";

const ActiveUsersSection = ({
  activeUsers,
  companyUserListAPI,
  selectedUids,
  setSelectedUids,
  deleteUser,
  updateUserStatus,
}) => {
  // const [selectedUids, setSelectedUids] = useState([]);
  const [editUserData, setEditUserData] = useState({});

  const handleCheckboxChange = (uid) => {
    setSelectedUids((prevSelectedUids) => {
      if (prevSelectedUids?.includes(uid)) {
        // If UID is already in array, remove it
        return prevSelectedUids.filter((id) => id !== uid);
      } else {
        // If UID is not in array, add it
        return [...prevSelectedUids, uid];
      }
    });
  };

  const handleEdit = (e, uid) => {
    const { name, value } = e.target;

    setEditUserData((prev) => ({
      ...prev,
      [uid]: {
        ...prev[uid],
        [name]: value,
      },
    }));
  };

  const EditUser = (uid) => {
    const token = getToken();
    const myHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const formdata = new FormData();

    formdata.append("first_name", editUserData[uid]?.first_name);
    formdata.append("phone_number", editUserData[uid]?.phone_number);

    axios
      .put(
        `https://bittrend.shubansoftware.com/account-api/update-user-api/${uid}/`,
        formdata,
        { headers: myHeaders }
      ) // Add trailing slash here
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // checkkkcstart
  const handleDeactivate = (uid) => {
    // Logic to deactivate the user (you can call your API here)
    console.log(`Deactivating user with UID: ${uid}`);
  };

  const handleActivate = (uid) => {
    // Logic to activate the user (you can call your API here)
    console.log(`Activating user with UID: ${uid}`);
  };

  const handleReInvite = (uid) => {
    // Logic to send a re-invite (you can call your API here)
    console.log(`Re-inviting user with UID: ${uid}`);
  };

  //enddddd
  return (
    <>
      {activeUsers?.map((item) => (
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <Form.Check
                className="inline-checkbox me-2_5"
                name="group1"
                type="checkbox"
                checked={selectedUids?.includes(item.uid)}
                onChange={() => handleCheckboxChange(item.uid)}
              />
              <Form.Group
                controlId="ravi@paperpencilpixel.com"
                className="form-inline"
              >
                <Form.Control
                  type="email"
                  placeholder="ravi@paperpencilpixel.com"
                  className="sm-fcontrol"
                  value={item.email}
                />
              </Form.Group>
            </div>
          </td>
          <td>
            <Form.Group controlId="name01" className="form-inline">
              <Form.Control
                type="text"
                placeholder="Name"
                className="sm-fcontrol"
                name="first_name"
                value={
                  editUserData[item.uid]?.first_name !== undefined
                    ? editUserData[item.uid].first_name
                    : item.first_name
                }
                onChange={(e) => handleEdit(e, item.uid)}
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group controlId="phone01" className="form-inline">
              <Form.Control
                type="text"
                placeholder="Phone Number"
                className="sm-fcontrol"
                // value={item.phone_number}
                name="phone_number"
                value={
                  editUserData[item.uid]?.phone_number !== undefined
                    ? editUserData[item.uid].phone_number
                    : item.phone_number
                }
                onChange={(e) => handleEdit(e, item.uid)}
              />
            </Form.Group>
          </td>
          {/* <td>
            <span>{item.status}</span>
          </td> */}
          <td>
            <span>
              {(() => {
                switch (item.status) {
                  case "Logged-in":
                    return "Online";
                  case "Logged-out-active":
                    return `${getTimeAgo(item.status_time_interval)}`; // Using getTimeAgo here
                  case "logged_out_inactive":
                    return "Logged out - Inactive";
                  case "deactivated":
                    return "Deactivated - Disabled";
                  case "Locked":
                    return "Locked";
                  case "pending":
                    return "Invitation sent";
                  default:
                    return "Unknown Status"; // Fallback for any unrecognized status
                }
              })()}
            </span>
          </td>
          <td>
            <Form.Check
              className="inline-checkbox"
              type="switch"
              id="custom-switch"
              checked={item.user_role.role_name === "Admin"}
              readOnly
            />
          </td>
          <td>
            <Dropdown className="action_dropdown">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="btn-transpant"
              >
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
              </Dropdown.Toggle>
              

              <Dropdown.Menu>
                {/* Show actions based on the user's status */}
                {item.status === "pending" && (
                  <>
                    <Dropdown.Item
                      href="#/action-1"
                      onClick={() => updateUserStatus(item.uid, "Activate")}
                    >
                      Activate
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-2"
                      onClick={() => updateUserStatus(item.uid, "Deactivate")}
                    >
                      Deactivate
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      onClick={() => updateUserStatus(item.uid, "Unlock")}
                    >
                      Unlock
                    </Dropdown.Item>
                  </>
                )}

                {/* Option for active users */}
                {item.status === "Logged-in" && (
                  <Dropdown.Item
                    href="#/action-4"
                    onClick={() => updateUserStatus(item.uid, "Deactivate")}
                  >
                    Deactivate
                  </Dropdown.Item>
                )}

                {/* Option for deactivated users */}
                {item.status === "Logged-out-Inactive" && (
                  <>
                    <Dropdown.Item
                      href="#/action-5"
                      onClick={() => updateUserStatus(item.uid, "Activate")}
                    >
                      Activate
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-5"
                      onClick={() => updateUserStatus(item.uid, "Deactivated")}
                    >
                      Deactivated
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-5"
                      onClick={() => updateUserStatus(item.uid, "Unlock")}
                    >
                      Unlock
                    </Dropdown.Item>
                  </>
                )}
                {item.status === "Logged-out-active" && (
                  <>
                    
                    <Dropdown.Item
                      href="#/action-5"
                      onClick={() => updateUserStatus(item.uid, "Deactivated")}
                    >
                      Deactivated
                    </Dropdown.Item>
               
                  </>
                )}

                {/* Common action to delete the user */}
                <Dropdown.Item
                  href="#/action-6"
                  onClick={() => console.log("Delete user")}
                >
                  Delete
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => EditUser([item.uid])}
                >
                  Save Edit Changes
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ActiveUsersSection;
