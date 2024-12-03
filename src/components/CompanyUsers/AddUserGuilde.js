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
  import { starIcon } from "../../images/assest";


const AddUserguide = () =>{

    return (
       <>
        <div className="rects-panel">
          <h5 className="hadding_h5">Admin User</h5>
          <ul className="bullet_list mb-0">
            <li>Should have at least one admin</li>
            <li>Can add/remove users</li>
            <li>Can make others admin</li>
            <li>Can edit profile, unlock users</li>
            <li>Can resend invitations</li>
            <li>Can inactivate users</li>
            <li>Can manage all jobs</li>
          </ul>
        </div>
        <div className="rects-panel">
          <h5 className="hadding_h5">Regular User</h5>
          <ul className="bullet_list mb-0">
            <li>Can see all jobs</li>
            <li>Can only edit the jobs that they create</li>
            <li>Can add collaborators to their jobs</li>
          </ul>
        </div>
        <div className="rects-panel">
          <h5 className="hadding_h5">How to Add User</h5>
          <ul className="bullet_list mb-0">
            <li>Add any valid email address</li>
            <li>Resend invitation if needed</li>
            <li>Can deactivate/delete users</li>
          </ul>
        </div>
       </>
    )
}

export default AddUserguide