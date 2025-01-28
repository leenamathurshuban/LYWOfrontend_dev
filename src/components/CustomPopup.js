import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export const CustomPopup = ({ show, handleClose, modalText, setModalText }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            className="confirmation_model"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="text-center">
                <h3>
                    {modalText?.heading}
                </h3>
                <p>{modalText?.body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Cancel
                </Button>
                {Object.keys(modalText.item).length === 0 ? (
                    <Button variant="primary"
                        onClick={() => setModalText({
                            ...modalText,
                            sureMulti: true,
                            showPopup: false
                        })}
                    >
                        Yes
                    </Button>
                ) : (
                    <Button variant="primary"
                        onClick={() => setModalText({
                            ...modalText,
                            sure: true,
                            showPopup: false
                        })}
                    >
                        Yes
                    </Button>
                )}
                {/* <Button variant="primary"
                    onClick={() => setModalText({
                        ...modalText,
                        sure: true,
                        showPopup: false
                    })}
                >
                    Yes
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
}