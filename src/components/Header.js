import React from 'react';
import {Col, Form, InputGroup } from 'react-bootstrap';

const Header = () => {
  return (

      <header className='main_header'>
        <div className='header-wrapper row'>
            <Col md={4}>
                <div className='org_name'>
                    <span className='orgshort_text'>pe</span>
                    <p>Organization Name</p>
                </div>
            </Col>
            <Col md={4}>
                <InputGroup className="header_serach">
                    <InputGroup.Text id="basic-addon1">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </InputGroup.Text>
                    <Form.Control
                    placeholder="Serach"
                    aria-label="Serach"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md={4}>
                <div className='header_right'>
                    <button type='button' className='hed_notifaction'>
                        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0272 11.7144V14.3434C17.0272 15.0139 17.2935 15.6569 17.7677 16.1311C18.2417 16.6051 19.0436 16.8715 19.7141 16.8715H0.856934C1.52743 16.8715 2.3293 16.6051 2.80342 16.1311C3.27752 15.6569 3.54389 15.0139 3.54389 14.3434L3.54387 8.17035C3.54387 6.38236 4.25415 4.6676 5.51845 3.40329C6.78276 2.13899 8.49752 1.42871 10.2855 1.42871" stroke="#344054" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button type='button' className='hed_username'>
                        <span>or</span>
                    </button>
                </div>
            </Col>
        </div>
      </header>
      
  );
};

export default Header;