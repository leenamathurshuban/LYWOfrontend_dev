import { Dropdown, Form } from "react-bootstrap";
import { getStatusLabel } from "../../helpers/helper";

const ActiveUsersSection = ({
  activeUsers,
  companyUserListAPI,
  selectedUids,
  setSelectedUids,
  deleteUser,
  updateUserStatus,
  handleCheckboxChange,
  EditUser,
  editUserData,
  setEditUserData,
  
}) => {



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
         
          <td>
            <span>
           
              {getStatusLabel(item.status, item.status_time_interval)}
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

                {item.status === "Logged-in" && (
                  <Dropdown.Item
                    href="#/action-4"
                    onClick={() => updateUserStatus(item.uid, "Deactivate")}
                  >
                    Deactivate
                  </Dropdown.Item>
                )}

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

                <Dropdown.Item
                  href="#/action-6"
                  onClick={() => deleteUser([item.uid])}
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
