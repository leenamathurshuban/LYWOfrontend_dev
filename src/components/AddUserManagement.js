import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { starIcon } from "../images/assest";
import { getToken } from "../services/axiosInstance";
import ActiveUsersSection from "./CompanyUsers/ActiveUsers";
import AddUserguide from "./CompanyUsers/AddUserGuilde";
import AdmidUserSection from "./CompanyUsers/AdmidUsers";
import InActiveUserSection from "./CompanyUsers/InActiveUsers";
import PendingUserSection from "./CompanyUsers/PendingUsers";
import {
  CompanyUserListGetApi,
  createUserApi,
  deleteUserApi,
  EditUserApi,
  UserStatusUpdateApi,
} from "../services/provider";
import { removeToken } from "../helpers/helper";
import { useNavigate } from "react-router-dom";

const AddUserManagement = () => {
  const [createUserData, setCreateUserData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
  });

  const [addRow, setAddRow] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [companyUserList, setCompanyUserList] = useState([]);
  const [activeItem, setActiveItem] = useState("byDefaultUsers");
  const [selectedUids, setSelectedUids] = useState([]);
  const [editUserData, setEditUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

const navigate = useNavigate()

  const userInfo = useSelector((state) => state.login.loginUserInfo);
  const uid = userInfo?.uid;

  const handleAddNewUserRow = () => {
    setAddRow([
      ...addRow,
      {
        id: addRow.length + 1,
        email: "",
        name: "",
        phoneNumber: "",
      },
    ]);
  };

  const handleCancel = (id) => {
    setAddRow((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleCheckboxChange = (uid) => {
    setSelectedUids((prevSelectedUids) => {
      if (prevSelectedUids.includes(uid)) {
        // If UID is already in array, remove it
        return prevSelectedUids.filter((id) => id !== uid);
      } else {
        // If UID is not in array, add it
        return [...prevSelectedUids, uid];
      }
    });
  };

  const companyProfileDetails = useSelector(
    (state) => state.login.CompanyProfileDetails
  );

  const ListUserSummer = [
    {
      id: "activeUser",
      label: "Active Users",
      count: companyUserList[0]?.active_users_count,
    },
    {
      id: "adminUser",
      label: "Admins",
      count: companyUserList[0]?.admin_users_count,
    },
    {
      id: "inActiveUser",
      label: "Inactive Users",
      count: companyUserList[0]?.inactive_users_count,
    },
    {
      id: "pendingUser",
      label: "Pending Invitations",
      count: companyUserList[0]?.pending_users_count,
    },
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const createUser = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", createUserData.email);
    formData.append("first_name", createUserData.name);
    formData.append("phone_number", createUserData.phoneNumber);
    formData.append("user_role", "9b476335-0e67-4e01-9997-88ba8d2cf6e2"); // ComputerUser
    formData.append("company", JSON.stringify([companyProfileDetails?.uid]));
    try {
      const response = await createUserApi(formData);
      setIsLoading(false);
      if (response.data.status == 200) {
        setIsLoading(false);
        companyUserListAPI();
      }
    } catch (error) {
      setIsLoading(false);
      const errorData = error?.response?.data?.response;
      if (errorData) {
        errorData?.email?.[0] && toast.error(errorData.email[0]);
        errorData?.phone_number?.[0] && toast.error(errorData.phone_number[0]);
      }
      if(error?.response?.status === 401 || error?.response?.data?.detail?.includes( "Given token not valid for any token type")){
        //console.log("Token expired, redirecting to login");
        removeToken();
        navigate("/loginwithpassword");
      }
     }
    }

  const deleteUser = async (uid) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("uids", JSON.stringify(uid));
    try {
      const response = await deleteUserApi(formdata);
      setIsLoading(false);
      if (response.data == 200) {
        toast.success("User deleted successfully!");
        companyUserListAPI();
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Please select user to delete");
    }
  };

  const updateUserStatus = async (uid, statusAction) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("uids", JSON.stringify(uid));
    formdata.append("status", statusAction);
    try {
      const response = await UserStatusUpdateApi(formdata);
      setIsLoading(false);
      if (response.data.status == 200) {
        setIsLoading(false);
        // window.location.reload();
        // console.log(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      const errorData = error?.response?.data?.response;
      toast.error(errorData);
    }
  };

  const EditUser = (uid) => {
    const token = getToken();
    const myHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const formdata = new FormData();
    // console.log("editUserData[uid].user_role------",editUserData[uid].user_role?.uid)

    if (editUserData[uid]?.first_name) {
      formdata.append("first_name", editUserData[uid].first_name);
    }
    if (editUserData[uid]?.phone_number) {
      formdata.append("phone_number", editUserData[uid].phone_number);
    }
    if (editUserData[uid]?.user_role?.uid) {
      formdata.append("user_role", editUserData[uid].user_role?.uid);
    }
    setIsLoading(true);

    axios
      .put(
        `https://bittrend.shubansoftware.com/account-api/update-user-api/${uid}/`,
        formdata,
        { headers: myHeaders }
      )
      .then((response) => {
        setIsLoading(false);
        // console.log(response.data);
        if(response.data){
          setCompanyUserList((prevList) =>
            prevList.map((user) =>
              user.uid === uid ? { ...user, ...formdata } : user
            )
          );
          alert("User updated successfully!");
        }
      })
      .catch((error) => {
        setIsLoading(false);

        console.error("There was an error!", error);
      });
  };

  const handlechanges = (e) => {
    const { name, value } = e.target;
    setCreateUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
    setCreateUserData({
      email: "",
      name: "",
      phoneNumber: "",
    });
  };

  const companyUserListAPI = async (searchQuery) => {
    setIsLoading(true);
    const url = searchQuery
      // ? `https://bittrend.shubansoftware.com/account-api/company-user-list-api/b6cadaab-69bc-4707-8656-2e8573e17547/?search=${searchQuery}`
      // : `https://bittrend.shubansoftware.com/account-api/company-user-list-api/b6cadaab-69bc-4707-8656-2e8573e17547/`;

      ? `https://bittrend.shubansoftware.com/account-api/company-user-list-api/${uid}/?search=${searchQuery}`
      : `https://bittrend.shubansoftware.com/account-api/company-user-list-api/${uid}/`;

    try {
      const response = await CompanyUserListGetApi(url);
      setIsLoading(false);
      setCompanyUserList(response.data.response);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching company user list:", error);
    }
  };

  const activeUsers = companyUserList[0]?.active_users || [];
  const adminUsers = companyUserList[0]?.admin_users || [];
  const inActiveUsers = companyUserList[0]?.inactive_users || [];
  const pendingUsers = companyUserList[0]?.pending_users || [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    companyUserListAPI();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      companyUserListAPI(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <Row>
      <Col md={12}>
        <div className="mdl_pagetitle d-flex justify-content-between align-items-center">
          <h5>User Management</h5>
          <InputGroup className="header_serach">
            <Button id="basic-addon1">
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
            </Button>
            <Form.Control
              placeholder="Serach"
              aria-label="Serach"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
          <div className="btn_group">
            <Button
              variant="link"
              className="btn-link-muted"
              onClick={() => updateUserStatus(selectedUids, "Unlock")}
              // disabled
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.8335 8.33333V6.66667C5.8335 4.36548 7.69898 2.5 10.0002 2.5C11.7088 2.5 13.1772 3.52841 13.8201 5M10.0002 12.0833V13.75M7.3335 17.5H12.6668C14.067 17.5 14.767 17.5 15.3018 17.2275C15.7722 16.9878 16.1547 16.6054 16.3943 16.135C16.6668 15.6002 16.6668 14.9001 16.6668 13.5V12.3333C16.6668 10.9332 16.6668 10.2331 16.3943 9.69836C16.1547 9.22795 15.7722 8.8455 15.3018 8.60582C14.767 8.33333 14.067 8.33333 12.6668 8.33333H7.3335C5.93336 8.33333 5.2333 8.33333 4.69852 8.60582C4.22811 8.8455 3.84566 9.22795 3.60598 9.69836C3.3335 10.2331 3.3335 10.9332 3.3335 12.3333V13.5C3.3335 14.9001 3.3335 15.6002 3.60598 16.135C3.84566 16.6054 4.22811 16.9878 4.69852 17.2275C5.2333 17.5 5.93336 17.5 7.3335 17.5Z"
                  stroke="#4C60E5"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Unlock
            </Button>
            <Button
              variant="link"
              className="btn-link-muted"
              onClick={() => updateUserStatus(selectedUids, "Activate")}
              // disabled
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.74976 11.2501L17.4998 2.50014M8.85608 11.5235L11.0462 17.1552C11.2391 17.6513 11.3356 17.8994 11.4746 17.9718C11.5951 18.0346 11.7386 18.0347 11.8592 17.972C11.9983 17.8998 12.095 17.6518 12.2886 17.1559L17.7805 3.08281C17.9552 2.63516 18.0426 2.41133 17.9948 2.26831C17.9533 2.1441 17.8558 2.04663 17.7316 2.00514C17.5886 1.95736 17.3647 2.0447 16.9171 2.21939L2.84398 7.71134C2.34808 7.90486 2.10013 8.00163 2.02788 8.14071C1.96524 8.26129 1.96532 8.40483 2.0281 8.52533C2.10052 8.66433 2.34859 8.7608 2.84471 8.95373L8.47638 11.1438C8.57708 11.183 8.62744 11.2026 8.66984 11.2328C8.70742 11.2596 8.74028 11.2925 8.76709 11.3301C8.79734 11.3725 8.81692 11.4228 8.85608 11.5235Z"
                  stroke="#4C60E5"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Re-Invite
            </Button>
            <Button
              variant="link"
              className="btn-link-muted"
              onClick={() => updateUserStatus(selectedUids, "Deactivated")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1111_5848)">
                  <path
                    d="M4.10817 4.10841L15.8915 15.8917M18.3332 10.0001C18.3332 14.6025 14.6022 18.3334 9.99984 18.3334C5.39746 18.3334 1.6665 14.6025 1.6665 10.0001C1.6665 5.39771 5.39746 1.66675 9.99984 1.66675C14.6022 1.66675 18.3332 5.39771 18.3332 10.0001Z"
                    stroke="#4C60E5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1111_5848">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Deactivate
            </Button>
            <Button
              variant="link"
              className="btn-link-muted"
              onClick={() => deleteUser(selectedUids)}
              // disabled={selectedUids.length === 0}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 5.00008V4.33341C13.3333 3.39999 13.3333 2.93328 13.1517 2.57676C12.9919 2.26316 12.7369 2.00819 12.4233 1.8484C12.0668 1.66675 11.6001 1.66675 10.6667 1.66675H9.33333C8.39991 1.66675 7.9332 1.66675 7.57668 1.8484C7.26308 2.00819 7.00811 2.26316 6.84832 2.57676C6.66667 2.93328 6.66667 3.39999 6.66667 4.33341V5.00008M8.33333 9.58342V13.7501M11.6667 9.58342V13.7501M2.5 5.00008H17.5M15.8333 5.00008V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9684C15.3212 17.4388 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4388 4.43915 16.9684C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00008"
                  stroke="#4C60E5"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Delete
            </Button>
            <Button variant="primary" onClick={handleAddNewUserRow}>
              <i className="fa fa-plus me-2"></i>Add User
            </Button>
          </div>
        </div>
        <Card className="usermanagement_table shadow-md border-light">
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              {isLoading && (
                <div className="loader-overlay">
                  <Spinner animation="border" role="status" className="ml-3" />
                </div>
              )}
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
                  {activeItem === "byDefaultUsers" && (
                    <>
                      <ActiveUsersSection
                        activeUsers={activeUsers}
                        // companyUserListAPI={companyUserListAPI}
                        selectedUids={selectedUids}
                        setSelectedUids={setSelectedUids}
                        deleteUser={deleteUser}
                        updateUserStatus={updateUserStatus}
                        handleCheckboxChange={handleCheckboxChange}
                        EditUser={EditUser}
                        editUserData={editUserData}
                        setEditUserData={setEditUserData}
                      />
                      <AdmidUserSection
                        adminUsers={adminUsers}
                        companyUserListAPI={companyUserListAPI}
                        selectedUids={selectedUids}
                        setSelectedUids={setSelectedUids}
                        deleteUser={deleteUser}
                        updateUserStatus={updateUserStatus}
                        handleCheckboxChange={handleCheckboxChange}
                        EditUser={EditUser}
                        editUserData={editUserData}
                        setEditUserData={setEditUserData}
                      />
                      <InActiveUserSection
                        inActiveUsers={inActiveUsers}
                        companyUserListAPI={companyUserListAPI}
                        selectedUids={selectedUids}
                        setSelectedUids={setSelectedUids}
                        deleteUser={deleteUser}
                        updateUserStatus={updateUserStatus}
                        handleCheckboxChange={handleCheckboxChange}
                        EditUser={EditUser}
                        editUserData={editUserData}
                        setEditUserData={setEditUserData}
                      />
                      <PendingUserSection
                        pendingUsers={pendingUsers}
                        companyUserListAPI={companyUserListAPI}
                        selectedUids={selectedUids}
                        setSelectedUids={setSelectedUids}
                        deleteUser={deleteUser}
                        updateUserStatus={updateUserStatus}
                        handleCheckboxChange={handleCheckboxChange}
                        EditUser={EditUser}
                        editUserData={editUserData}
                        setEditUserData={setEditUserData}
                      />
                    </>
                  )}
                  {activeItem === "activeUser" && (
                    <ActiveUsersSection
                      activeUsers={activeUsers}
                      companyUserListAPI={companyUserListAPI}
                      selectedUids={selectedUids}
                      setSelectedUids={setSelectedUids}
                      deleteUser={deleteUser}
                      updateUserStatus={updateUserStatus}
                      handleCheckboxChange={handleCheckboxChange}
                      EditUser={EditUser}
                      editUserData={editUserData}
                      setEditUserData={setEditUserData}
                    />
                  )}
                  {activeItem === "adminUser" && (
                    <AdmidUserSection
                      adminUsers={adminUsers}
                      companyUserListAPI={companyUserListAPI}
                      selectedUids={selectedUids}
                      setSelectedUids={setSelectedUids}
                      deleteUser={deleteUser}
                      updateUserStatus={updateUserStatus}
                      handleCheckboxChange={handleCheckboxChange}
                      EditUser={EditUser}
                      editUserData={editUserData}
                      setEditUserData={setEditUserData}
                    />
                  )}
                  {activeItem === "inActiveUser" && (
                    <InActiveUserSection
                      inActiveUsers={inActiveUsers}
                      companyUserListAPI={companyUserListAPI}
                      selectedUids={selectedUids}
                      setSelectedUids={setSelectedUids}
                      deleteUser={deleteUser}
                      updateUserStatus={updateUserStatus}
                      handleCheckboxChange={handleCheckboxChange}
                      EditUser={EditUser}
                      editUserData={editUserData}
                      setEditUserData={setEditUserData}
                    />
                  )}
                  {activeItem === "pendingUser" && (
                    <PendingUserSection
                      pendingUsers={pendingUsers}
                      companyUserListAPI={companyUserListAPI}
                      selectedUids={selectedUids}
                      setSelectedUids={setSelectedUids}
                      deleteUser={deleteUser}
                      updateUserStatus={updateUserStatus}
                      handleCheckboxChange={handleCheckboxChange}
                      EditUser={EditUser}
                      editUserData={editUserData}
                      setEditUserData={setEditUserData}
                    />
                  )}

                  {addRow.map((item) => (
                    <tr key={item.id}>
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
                              placeholder="Email (will be used for login)"
                              className="sm-fcontrol"
                              onChange={handlechanges}
                              value={createUserData.email}
                              name="email"

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
                            onChange={handlechanges}
                            value={createUserData.name}
                            name="name"

                          />
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group controlId="phone01" className="form-inline">
                          <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            className="sm-fcontrol"
                            onChange={handlechanges}
                            value={createUserData.phoneNumber}
                            name="phoneNumber"
                          />
                        </Form.Group>
                      </td>
                      <td>
                        <Button
                          variant="light"
                          className="btn-sm me-2"
                          onClick={() => handleCancel(item.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          className="btn-sm"
                          type="submit"
                        >
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
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Form>
        </Card>
      </Col>

      <Col md={3} className="usermanagement_panel sd-rightFixed">
        <div className="ct_scrollbar addUserguide">
          <AddUserguide />
        </div>
        <div className="rects-panel">
          <h5 className="hadding_h5 d-flex justify-content-between">
            User Summary{" "}
            <Button
              variant="link"
              className="link-sm p-0"
              onClick={() => setActiveItem("byDefaultUsers")}
            >
              Clear Filter
            </Button>
          </h5>
          <div className="flter_count">
            <span>Showing 5/15</span>
            <span>1/5 Selected</span>
          </div>
          <ul className="rects_list">
            {ListUserSummer.map((item) => (
              <li
                key={item.id}
                className={activeItem === item.id ? "active" : ""}
                onClick={() => handleItemClick(item.id)}
              >
                <img src={starIcon} />
                {item.count} {item.label}
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default AddUserManagement;

///uppperrr

// dynamic code start below

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   Col,
//   Form,
//   InputGroup,
//   Row,
//   Spinner,
//   Table,
//   Dropdown,
// } from "react-bootstrap";
// import {
//   CompanyUserListGetApi,
//   createUserApi,
//   deleteUserApi,
//   EditUserApi,
//   UserStatusUpdateApi,
// } from "../services/provider";
// import AddUserguide from "./CompanyUsers/AddUserGuilde";
// import { starIcon } from "../images/assest";
// import { getStatusLabel } from "../helpers/helper";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

// const AddUserManagement = () => {
//   const [users, setUsers] = useState({});
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState({
//     active: false,
//     admin: false,
//     inactive: false,
//     pending: false,
//   });
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [editedData, setEditedData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [addRow, setAddRow] = useState([]);

//   //new code

//   const [searchTerm, setSearchTerm] = useState("");

//   const ListUserSummer = [
//     {
//       id: "activeUser",
//       label: "Active Users",
//       count: 2,
//     },
//     {
//       id: "adminUser",
//       label: "Admins",
//       count: 12,
//     },
//     {
//       id: "inActiveUser",
//       label: "Inactive Users",
//       count: 5,
//     },
//     {
//       id: "pendingUser",
//       label: "Pending Invitations",
//       count: 66,
//     },
//   ];
//   const userInfo = useSelector((state) => state.login.loginUserInfo);
//   const uid = userInfo?.uid;

//   const companyUserListAPI = async (searchQuery) => {
//     setIsLoading(true);
//     const url = searchQuery
//       ? `https://bittrend.shubansoftware.com/account-api/company-user-list-api/${uid}/?search=${searchQuery}`
//       : `https://bittrend.shubansoftware.com/account-api/company-user-list-api/${uid}/`;
//     try {
//       const response = await CompanyUserListGetApi(url);
//       setUsers(response.data.response[0]); // Set the fetched users
//       setFilteredUsers([
//         ...response.data.response[0]?.active_users,
//         ...response.data.response[0]?.admin_users,
//         ...response.data.response[0]?.inactive_users,
//         ...response.data.response[0]?.pending_users,
//       ]);
//     } catch (error) {
//       console.error("Error fetching company user list:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFilterChange = (status) => {
//     const updatedFilters = {
//       ...selectedFilters,
//       [status]: !selectedFilters[status],
//     };
//     setSelectedFilters(updatedFilters);
//     filterUsers(updatedFilters);
//   };

//   const handleInputChange = (e, userId, field) => {
//     const value = e.target.value;
//     setEditedData({
//       ...editedData,
//       [userId]: {
//         ...editedData[userId],
//         [field]: value,
//       },
//     });
//   };

//   const handleRoleToggle = (userId, currentRole) => {
//     const newRole =
//       currentRole.role_name === "Admin"
//         ? { id: 3, role_name: "CompanyUser" }
//         : { id: 2, role_name: "Admin" };

//     setFilteredUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === userId ? { ...user, user_role: newRole } : user
//       )
//     );
//     setUsers((prevUsers) => ({
//       ...prevUsers,
//       active_users: prevUsers?.active_users?.map((user) =>
//         user.id === userId ? { ...user, user_role: newRole } : user
//       ),
//       admin_users: prevUsers?.admin_users?.map((user) =>
//         user.id === userId ? { ...user, user_role: newRole } : user
//       ),
//     }));
//   };

//   const filterUsers = (filters) => {
//     const { active, admin, inactive, pending } = filters;

//     let newFilteredUsers = [];

//     if (active)
//       newFilteredUsers = [...newFilteredUsers, ...(users?.active_users || [])];
//     if (admin)
//       newFilteredUsers = [...newFilteredUsers, ...(users?.admin_users || [])];
//     if (inactive)
//       newFilteredUsers = [
//         ...newFilteredUsers,
//         ...(users?.inactive_users || []),
//       ];
//     if (pending)
//       newFilteredUsers = [...newFilteredUsers, ...(users?.pending_users || [])];

//     if (!active && !admin && !inactive && !pending) {
//       newFilteredUsers = [
//         ...(users?.active_users || []),
//         ...(users?.admin_users || []),
//         ...(users?.inactive_users || []),
//         ...(users?.pending_users || []),
//       ];
//     }

//     const uniqueUsers = Array.from(
//       new Map(newFilteredUsers.map((user) => [user.id, user])).values()
//     );

//     setFilteredUsers(uniqueUsers);
//   };

//   const clearAllFilters = () => {
//     setSelectedFilters({
//       active: false,
//       admin: false,
//       inactive: false,
//       pending: false,
//     });
//     setFilteredUsers([
//       ...(users?.active_users || []),
//       ...(users?.admin_users || []),
//       ...(users?.inactive_users || []),
//       ...(users?.pending_users || []),
//     ]);
//   };

//   useEffect(() => {
//     companyUserListAPI();
//   }, []);

//   const handleCheckboxChange1 = (userId) => {
//     setSelectedRows((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleSelectAllChange = (e) => {
//     if (e.target.checked) {
//       const allIds = filteredUsers.map((user) => user.id);
//       setSelectedRows(allIds);
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const isAllSelected =
//     filteredUsers.length > 0 && selectedRows.length === filteredUsers.length;

//   //nrew func

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleAddNewUserRow = () => {
//     setAddRow([
//       ...addRow,
//       {
//         id: addRow.length + 1,
//         email: "",
//         name: "",
//         phoneNumber: "",
//       },
//     ]);
//   };

//   const updateUserStatus = async (uid, statusAction) => {
//     setIsLoading(true);
//     const formdata = new FormData();
//     formdata.append("uids", JSON.stringify(uid));
//     formdata.append("status", statusAction);
//     try {
//       const response = await UserStatusUpdateApi(formdata);
//       setIsLoading(false);
//       if (response.data.status == 200) {
//         setIsLoading(false);
//         // window.location.reload();
//         // console.log(response.data);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       const errorData = error?.response?.data?.response;
//       toast.error(errorData);
//     }
//   };

//   return (
//     <Row>
//       <Col md={12}>
//         <div className="mdl_pagetitle d-flex justify-content-between align-items-center">
//           <h5>User Management</h5>
//           <InputGroup className="header_serach">
//             <Button id="basic-addon1">
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 18 18"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
//                   stroke="#667085"
//                   stroke-width="1.66667"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </Button>
//             <Form.Control
//               placeholder="Serach"
//               aria-label="Serach"
//               aria-describedby="basic-addon1"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </InputGroup>
//           <div className="btn_group">
//             <Button variant="link" className="btn-link-muted">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M5.8335 8.33333V6.66667C5.8335 4.36548 7.69898 2.5 10.0002 2.5C11.7088 2.5 13.1772 3.52841 13.8201 5M10.0002 12.0833V13.75M7.3335 17.5H12.6668C14.067 17.5 14.767 17.5 15.3018 17.2275C15.7722 16.9878 16.1547 16.6054 16.3943 16.135C16.6668 15.6002 16.6668 14.9001 16.6668 13.5V12.3333C16.6668 10.9332 16.6668 10.2331 16.3943 9.69836C16.1547 9.22795 15.7722 8.8455 15.3018 8.60582C14.767 8.33333 14.067 8.33333 12.6668 8.33333H7.3335C5.93336 8.33333 5.2333 8.33333 4.69852 8.60582C4.22811 8.8455 3.84566 9.22795 3.60598 9.69836C3.3335 10.2331 3.3335 10.9332 3.3335 12.3333V13.5C3.3335 14.9001 3.3335 15.6002 3.60598 16.135C3.84566 16.6054 4.22811 16.9878 4.69852 17.2275C5.2333 17.5 5.93336 17.5 7.3335 17.5Z"
//                   stroke="#4C60E5"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//               Unlock
//             </Button>
//             <Button variant="link" className="btn-link-muted">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M8.74976 11.2501L17.4998 2.50014M8.85608 11.5235L11.0462 17.1552C11.2391 17.6513 11.3356 17.8994 11.4746 17.9718C11.5951 18.0346 11.7386 18.0347 11.8592 17.972C11.9983 17.8998 12.095 17.6518 12.2886 17.1559L17.7805 3.08281C17.9552 2.63516 18.0426 2.41133 17.9948 2.26831C17.9533 2.1441 17.8558 2.04663 17.7316 2.00514C17.5886 1.95736 17.3647 2.0447 16.9171 2.21939L2.84398 7.71134C2.34808 7.90486 2.10013 8.00163 2.02788 8.14071C1.96524 8.26129 1.96532 8.40483 2.0281 8.52533C2.10052 8.66433 2.34859 8.7608 2.84471 8.95373L8.47638 11.1438C8.57708 11.183 8.62744 11.2026 8.66984 11.2328C8.70742 11.2596 8.74028 11.2925 8.76709 11.3301C8.79734 11.3725 8.81692 11.4228 8.85608 11.5235Z"
//                   stroke="#4C60E5"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//               Re-Invite
//             </Button>
//             <Button variant="link" className="btn-link-muted">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g clip-path="url(#clip0_1111_5848)">
//                   <path
//                     d="M4.10817 4.10841L15.8915 15.8917M18.3332 10.0001C18.3332 14.6025 14.6022 18.3334 9.99984 18.3334C5.39746 18.3334 1.6665 14.6025 1.6665 10.0001C1.6665 5.39771 5.39746 1.66675 9.99984 1.66675C14.6022 1.66675 18.3332 5.39771 18.3332 10.0001Z"
//                     stroke="#4C60E5"
//                     stroke-width="1.5"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_1111_5848">
//                     <rect width="20" height="20" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>
//               Deactivate
//             </Button>
//             <Button variant="link" className="btn-link-muted">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M13.3333 5.00008V4.33341C13.3333 3.39999 13.3333 2.93328 13.1517 2.57676C12.9919 2.26316 12.7369 2.00819 12.4233 1.8484C12.0668 1.66675 11.6001 1.66675 10.6667 1.66675H9.33333C8.39991 1.66675 7.9332 1.66675 7.57668 1.8484C7.26308 2.00819 7.00811 2.26316 6.84832 2.57676C6.66667 2.93328 6.66667 3.39999 6.66667 4.33341V5.00008M8.33333 9.58342V13.7501M11.6667 9.58342V13.7501M2.5 5.00008H17.5M15.8333 5.00008V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9684C15.3212 17.4388 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4388 4.43915 16.9684C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00008"
//                   stroke="#4C60E5"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//               Delete
//             </Button>
//             <Button variant="primary" onClick={handleAddNewUserRow}>
//               <i className="fa fa-plus me-2"></i>Add User
//             </Button>
//           </div>
//         </div>
//         <Card className="usermanagement_table shadow-md border-light">
//           <Form>
//             <Card.Body>
//               {isLoading && (
//                 <div className="loader-overlay">
//                   <Spinner animation="border" role="status" className="ml-3" />
//                 </div>
//               )}
//               <Table className="no-bordered">
//                 <thead>
//                   <tr>
//                     <th>
//                       <span className="me-2">
//                         <svg
//                           width="20"
//                           height="20"
//                           viewBox="0 0 20 20"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <rect
//                             x="0.5"
//                             y="0.5"
//                             width="19"
//                             height="19"
//                             rx="5.5"
//                             fill="#EEF4FF"
//                           />
//                           <rect
//                             x="0.5"
//                             y="0.5"
//                             width="19"
//                             height="19"
//                             rx="5.5"
//                             stroke="#444CE7"
//                           />
//                           <path
//                             d="M5.91675 10H14.0834"
//                             stroke="#444CE7"
//                             stroke-width="2"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                           />
//                         </svg>
//                       </span>
//                       Email (will be used for login)
//                     </th>
//                     <th>Name</th>
//                     <th>Phone Number</th>
//                     <th>Status</th>
//                     <th>Admin</th>
//                     <th> &nbsp; </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredUsers.length > 0 ? (
//                     filteredUsers.map((user) => (
//                       <tr key={user.id}>
//                         <td>
//                           <div className="d-flex align-items-center">
//                             <Form.Check
//                               className="inline-checkbox me-2_5"
//                               name="group1"
//                               type="checkbox"
//                             />
//                             <Form.Group
//                               controlId="ravi@paperpencilpixel.com"
//                               className="form-inline"
//                             >
//                               <Form.Control
//                                 type="email"
//                                 placeholder="ravi@paperpencilpixel.com"
//                                 className="sm-fcontrol"
//                                 value={editedData[user.id]?.email}
//                               />
//                             </Form.Group>
//                           </div>
//                         </td>
//                         <td>
//                           <Form.Group
//                             controlId="name01"
//                             className="form-inline"
//                           >
//                             <Form.Control
//                               type="text"
//                               placeholder="Name"
//                               className="sm-fcontrol"
//                               name="first_name"
//                               value={
//                                 editedData[user.id]?.first_name ||
//                                 user.first_name
//                               }
//                             />
//                           </Form.Group>
//                         </td>
//                         <td>
//                           <Form.Group
//                             controlId="phone01"
//                             className="form-inline"
//                           >
//                             <Form.Control
//                               type="text"
//                               placeholder="Phone Number"
//                               className="sm-fcontrol"
//                               name="phone_number"
//                               value={
//                                 editedData[user.id]?.phone_number ||
//                                 user.phone_number
//                               }
//                             />
//                           </Form.Group>
//                         </td>

//                         <td>
//                           <span>
//                             {getStatusLabel(
//                               user.status,
//                               user.status_time_interval
//                             )}
//                           </span>
//                         </td>
//                         <td>
//                           <Form.Check
//                             className="inline-checkbox"
//                             type="switch"
//                             id={`role-switch-${user.id}`}
//                             checked={user.user_role.role_name === "Admin"}
//                             onChange={() =>
//                               handleRoleToggle(user.id, user.user_role)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <Dropdown className="action_dropdown">
//                             <Dropdown.Toggle
//                               variant="success"
//                               id="dropdown-basic"
//                               className="btn-transpant"
//                             >
//                               <svg
//                                 width="20"
//                                 height="20"
//                                 viewBox="0 0 20 20"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path
//                                   d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99992C10.8332 9.53968 10.4601 9.16659 9.99984 9.16659C9.5396 9.16659 9.1665 9.53968 9.1665 9.99992C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z"
//                                   stroke="#475467"
//                                   stroke-width="1.66667"
//                                   stroke-linecap="round"
//                                   stroke-linejoin="round"
//                                 />
//                                 <path
//                                   d="M9.99984 4.99992C10.4601 4.99992 10.8332 4.62682 10.8332 4.16659C10.8332 3.70635 10.4601 3.33325 9.99984 3.33325C9.5396 3.33325 9.1665 3.70635 9.1665 4.16659C9.1665 4.62682 9.5396 4.99992 9.99984 4.99992Z"
//                                   stroke="#475467"
//                                   stroke-width="1.66667"
//                                   stroke-linecap="round"
//                                   stroke-linejoin="round"
//                                 />
//                                 <path
//                                   d="M9.99984 16.6666C10.4601 16.6666 10.8332 16.2935 10.8332 15.8333C10.8332 15.373 10.4601 14.9999 9.99984 14.9999C9.5396 14.9999 9.1665 15.373 9.1665 15.8333C9.1665 16.2935 9.5396 16.6666 9.99984 16.6666Z"
//                                   stroke="#475467"
//                                   stroke-width="1.66667"
//                                   stroke-linecap="round"
//                                   stroke-linejoin="round"
//                                 />
//                               </svg>
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                               {user.status === "pending" && (
//                                 <>
//                                   <Dropdown.Item
//                                     href="#/action-1"
//                                     onClick={() =>
//                                       updateUserStatus(user.uid, "Activate")
//                                     }
//                                   >
//                                     Activate
//                                   </Dropdown.Item>
//                                   <Dropdown.Item
//                                     href="#/action-2"
//                                     onClick={() =>
//                                       updateUserStatus(user.uid, "Deactivate")
//                                     }
//                                   >
//                                     Deactivate
//                                   </Dropdown.Item>
//                                   <Dropdown.Item
//                                     href="#/action-3"
//                                     onClick={() =>
//                                       updateUserStatus(user.uid, "Unlock")
//                                     }
//                                   >
//                                     Unlock
//                                   </Dropdown.Item>
//                                 </>
//                               )}

//                               {user.status === "Logged-in" && (
//                                 <Dropdown.Item
//                                   href="#/action-4"
//                                   onClick={() =>
//                                     updateUserStatus([user.uid], "Deactivate")
//                                   }
//                                 >
//                                   Deactivate
//                                 </Dropdown.Item>
//                               )}

//                               {user.status === "Logged-out-Inactive" && (
//                                 <>
//                                   <Dropdown.Item
//                                     href="#/action-5"
//                                     onClick={() =>
//                                       updateUserStatus([user.uid], "Activate")
//                                     }
//                                   >
//                                     Activate
//                                   </Dropdown.Item>
//                                   <Dropdown.Item
//                                     href="#/action-5"
//                                     onClick={() =>
//                                       updateUserStatus(
//                                         [user.uid],
//                                         "Deactivated"
//                                       )
//                                     }
//                                   >
//                                     Deactivated
//                                   </Dropdown.Item>
//                                   <Dropdown.Item
//                                     href="#/action-5"
//                                     onClick={() =>
//                                       updateUserStatus([user.uid], "Unlock")
//                                     }
//                                   >
//                                     Unlock
//                                   </Dropdown.Item>
//                                 </>
//                               )}
//                               {user.status === "Logged-out-active" && (
//                                 <>
//                                   <Dropdown.Item
//                                     href="#/action-5"
//                                     onClick={() =>
//                                       updateUserStatus(
//                                         [user.uid],
//                                         "Deactivated"
//                                       )
//                                     }
//                                   >
//                                     Deactivated
//                                   </Dropdown.Item>
//                                 </>
//                               )}

//                               <Dropdown.Item
//                                 href="#/action-6"
//                                 // onClick={() => deleteUser([user.uid])}
//                               >
//                                 Delete
//                               </Dropdown.Item>
//                               <Dropdown.Item
//                                 href="#/action-2"
//                                 // onClick={() => EditUser([user.uid])}
//                               >
//                                 Save Edit Changes
//                               </Dropdown.Item>
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="text-center">
//                         No users found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Form>
//         </Card>
//       </Col>

//       <Col md={3} className="usermanagement_panel sd-rightFixed">
//         <div className="ct_scrollbar addUserguide">
//           <AddUserguide />
//         </div>
//         <div className="rects-panel">
//           <h5 className="hadding_h5 d-flex justify-content-between">
//             User Summary{" "}
//             <Button
//               variant="link"
//               className="link-sm p-0"
//               onClick={clearAllFilters}
//             >
//               Clear Filter
//             </Button>
//           </h5>
//           {/* <span>
//                 {selectedRows.length}{filteredUsers.length} Selected
//               </span> */}
//           <div className="flter_count">
//             <span>Showing 5/15</span>
//             <span>1/5 Selected</span>
//           </div>
//           <ul className="rects_list">
//             {[
//               {
//                 label: "Active Users",
//                 status: "active",
//                 count: users?.active_users_count,
//               },
//               {
//                 label: "Admin Users",
//                 status: "admin",
//                 count: users?.admin_users_count,
//               },
//               {
//                 label: "Inactive Users",
//                 status: "inactive",
//                 count: users?.inactive_users_count,
//               },
//               {
//                 label: "Pending Users",
//                 status: "pending",
//                 count: users?.pending_users_count,
//               },
//             ].map((item) => (
//               <li
//                 className={selectedFilters[item.status] ? "active" : ""}
//                 key={item.status}
//                 style={{ marginBottom: "10px", cursor: "pointer" }}
//                 onClick={() => handleFilterChange(item.status)}
//               >
//                 <img src={starIcon} />
//                 {item.count} {item.label}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Col>
//       {/* end code */}
//     </Row>
//   );
// };

// export default AddUserManagement;
