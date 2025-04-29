import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Offcanvas, Row } from 'react-bootstrap';
import MagicDark from '../../images/icons/magic-wand-dark.svg';
import tagClose from '../../images/icons/x-circle-gary.svg';
import AccuracyIcon from '../../images/icons/Accuracy_Icon.svg';
import SensitivityIcon from '../../images/icons/Sensitivity_Icon.svg';
import CooperativenessIcon from '../../images/icons/Cooperativeness_Icon.svg';
import { Consistency, IndividualEffort, InterpersonalRelations, Systematic } from '../../utils/helpChoose';
import { UpdateJobForm } from '../../services/provider';
const imgInd = [AccuracyIcon, SensitivityIcon, CooperativenessIcon];

const HelpChoose = ({
    show, setShow, behaviours, createUid, isIndex, setIsIndex,
    selectedItem, setSelectedItem, selectedItem1, setSelectedItem1,
    selectedItem2, setSelectedItem2, selectedItem3, setSelectedItem3,
    totalItem, setTotalItem, important, setImportant, setIsUpdated
}) => {
    // const [isIndex, setIsIndex] = useState([]);
    // const [selectedItem, setSelectedItem] = useState([]);
    // const [selectedItem1, setSelectedItem1] = useState([]);
    // const [selectedItem2, setSelectedItem2] = useState([]);
    // const [selectedItem3, setSelectedItem3] = useState([]);
    // const [totalItem, setTotalItem] = useState([]);
    // const [important, setImportant] = useState([]);
    const handleClose = () => {
        setShow(false)
        // setIsIndex([])
        // setImportant([])
        // setSelectedItem([])
        // setSelectedItem1([])
        // setSelectedItem2([])
        // setSelectedItem3([])
        // setTotalItem([])
    }
    const handleCloseItem = (value) => {
        const newArray = selectedItem.filter((Val) => Val !== value)
        setSelectedItem(newArray)
    }
    const handleCloseItem1 = (value) => {
        const newArray = selectedItem1.filter((Val) => Val !== value)
        setSelectedItem1(newArray)
    }
    const handleCloseItem2 = (value) => {
        const newArray = selectedItem2.filter((Val) => Val !== value)
        setSelectedItem2(newArray)
    }
    const handleCloseItem3 = (value) => {
        const newArray = selectedItem3.filter((Val) => Val !== value)
        setSelectedItem3(newArray)
    }
    const handleCard = (index) => {
        if (!isIndex.includes(index)) {
            setIsIndex([index])
        } else {
            setIsIndex([])
        }
    }
    const handleSelectItem = (value) => {
        if (!selectedItem.includes(value) && totalItem.length < 6) {
            setSelectedItem([...selectedItem, value])
        } else {
            const filter = selectedItem.filter((c) => c != value)
            setSelectedItem(filter)
            const newArray = important.filter((Val) => Val !== value)
            setImportant(newArray)
        }
    }
    const handleSelectItem1 = (value) => {
        if (!selectedItem1.includes(value) && totalItem.length < 6) {
            setSelectedItem1([...selectedItem1, value])
        }else {
            const filter = selectedItem1.filter((c) => c != value)
            setSelectedItem1(filter)
            const newArray = important.filter((Val) => Val !== value)
            setImportant(newArray)
        }
    }
    const handleSelectItem2 = (value) => {
        if (!selectedItem2.includes(value) && totalItem.length < 6) {
            setSelectedItem2([...selectedItem2, value])
        }else {
            const filter = selectedItem2.filter((c) => c != value)
            setSelectedItem2(filter)
            const newArray = important.filter((Val) => Val !== value)
            setImportant(newArray)
        }
    }
    const handleSelectItem3 = (value) => {
        if (!selectedItem3.includes(value) && totalItem.length < 6) {
            setSelectedItem3([...selectedItem3, value])
        }else {
            const filter = selectedItem3.filter((c) => c != value)
            setSelectedItem3(filter)
            const newArray = important.filter((Val) => Val !== value)
            setImportant(newArray)
        }
    }
    const handleImportant = (e, value) => {
        e.stopPropagation()
        if (!important.includes(value) && important.length < 2 && totalItem.includes(value)) {
            setImportant([...important, value])
        } else {
            const newArray = important.filter((Val) => Val !== value)
            setImportant(newArray)
        }
    }
    useEffect(() => {
        setTotalItem([...selectedItem, ...selectedItem1, ...selectedItem2, ...selectedItem3])
    }, [selectedItem, selectedItem1, selectedItem2, selectedItem3])

    const handleSubmit = async () => {
        const selectedBehaviourUids = behaviours.filter((val) => totalItem.includes(val.heading)).map((val) => val.uid);
        const importantBehaviourUids = behaviours.filter((val) => important.includes(val.heading)).map((val) => val.uid);
        const formdata = new FormData();
        formdata.append(
            "selected_behaviour",
            JSON.stringify(selectedBehaviourUids)
        );
        formdata.append(
            "important_behaviour",
            JSON.stringify(importantBehaviourUids)
        );
        const response = await UpdateJobForm(formdata, createUid);
        if (response?.data?.success) {
            setShow(false)
            setIsUpdated(true)
            setIsIndex([])
            setImportant([])
            setSelectedItem([])
            setSelectedItem1([])
            setSelectedItem2([])
            setSelectedItem3([])
            setTotalItem([])
        }
    }
    console.log(totalItem)
    console.log(important)
    return (
        <>
            <div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    animation={false}
                    size="lg"
                    backdrop={false}
                    className="helpme-mdl"
                >
                    <Modal.Header closeButton className="shadow_none">
                        <Modal.Title>
                            <img src={MagicDark} className="me-2" />
                            Help Me Choose
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-4">
                        <div className="helpme-top">
                            <Row>
                                <Col md={8}>
                                    <h6>Extended Behavioural Selection</h6>
                                    <ul className="list-block">
                                        <li>All behaviours are positive and desirable. For every role, some are more important that others.
                                        </li>
                                        <li>The same have been grouped based on similarity to make the selection process easier.
                                        </li>
                                        <li>Read about each behaviour and make choices considering the role and the work environment.</li>
                                    </ul>
                                </Col>
                                <Col md={4} className="d-flex justify-content-around">
                                    <div className="behaviours_ratting">
                                        <h6 className="text-base mb-2">Behaviours</h6>
                                        <div className="circle_ratting">
                                            <span className="ratitem active"></span>
                                            <span className="ratitem active"></span>
                                            <span className="ratitem active"></span>
                                            <span className="ratitem active"></span>
                                            <span className="ratitem"></span>
                                            <span className="ratitem"></span>
                                        </div>
                                        <small>(4 of 6 selected)</small>
                                    </div>
                                    <div className="important_ratting">
                                        <h6 className="text-base mb-2">Important Behaviours</h6>
                                        <div className="star_ratting">
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <small>(2 of 6 selected)</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="brvselection mt-3">
                            <h6>Your selection will display here</h6>
                            <Row className="form-row">
                                {selectedItem.map((item) => (
                                    <Col md={2}>
                                        <span className="brvbox active-danger">{item} <span><i className={`${important.includes(item) ? 'fa active-danger' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item)}></i>
                                            <img className="tag_del" src={tagClose} onClick={() => handleCloseItem(item)} />
                                        </span></span>
                                    </Col>
                                ))}
                                {selectedItem1.map((item) => (
                                    <Col md={2}>
                                        <span className="brvbox active-primery">{item}<span><i className={`${important.includes(item) ? 'fa active-primery' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item)}></i>
                                            <img className="tag_del" src={tagClose} onClick={() => handleCloseItem1(item)} />
                                        </span></span>
                                    </Col>
                                ))}
                                {selectedItem2.map((item) => (
                                    <Col md={2}>
                                        <span className="brvbox active-success">{item}<span><i className={`${important.includes(item) ? 'fa active-success' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item)}></i>
                                            <img className="tag_del" src={tagClose} onClick={() => handleCloseItem2(item)} />
                                        </span></span>
                                    </Col>
                                ))}
                                {selectedItem3.map((item) => (
                                    <Col md={2}>
                                        <span className="brvbox active-warning">{item}<span><i className={`${important.includes(item) ? 'fa active-warning' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item)}></i>
                                            <img className="tag_del" src={tagClose} onClick={() => handleCloseItem3(item)} />
                                        </span></span>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <Row className="my-4 individual">
                            <Col md={12} onClick={() => handleCard(1)}>
                                <h5 className="danger h5_title">Individual Effort</h5>
                            </Col>
                            {isIndex.includes(1) ?
                                IndividualEffort.map((item, index) => (
                                    <Col md={4}>
                                        <div className={`${selectedItem.includes(item.key) && 'active-danger'} syatic_box ie_box`} onClick={() => handleSelectItem(item.key)}>
                                            <div className="syatic_head">
                                                <h6>{item.key}</h6>
                                                <img src={imgInd[index]} />
                                            </div>
                                            <p>{item.des}</p>
                                        </div>
                                    </Col>
                                )) :
                                IndividualEffort.map((item) => (
                                    <Col md={4}>
                                        <span className={`${selectedItem.includes(item.key) && 'active-danger'} brvbox-lg`} onClick={() => handleSelectItem(item.key)}>{item.key}<i className={`${important.includes(item.key) ? 'fa active-danger' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item.key)}></i></span>
                                    </Col>
                                ))
                            }
                        </Row>
                        <Row className="my-4 interpersonal">
                            <Col md={12}>
                                <h5 className="primery h5_title" onClick={() => handleCard(2)}>Interpersonal Relations</h5>
                            </Col>
                            {isIndex.includes(2) ?
                                InterpersonalRelations.map((item, index) => (
                                    <Col md={4}>
                                        <div className={`${selectedItem1.includes(item.key) && 'active-primery'} syatic_box ir_box`} onClick={() => handleSelectItem1(item.key)}>
                                            <div className="syatic_head">
                                                <h6>{item.key}</h6>
                                                <img src={imgInd[index]} />
                                            </div>
                                            <p>{item.des}</p>
                                        </div>
                                    </Col>
                                )) :
                                InterpersonalRelations.map((item) => (
                                    <Col md={4}>
                                        <span className={`${selectedItem1.includes(item.key) && 'active-primery'} brvbox-lg`} onClick={() => handleSelectItem1(item.key)}>{item.key}<i className={`${important.includes(item.key) ? 'fa active-primery' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item.key)}></i></span>
                                    </Col>
                                ))
                            }
                        </Row>
                        <Row className="my-4 individual">
                            <Col md={12}>
                                <h5 className="success h5_title" onClick={() => handleCard(3)}>Consistency & Dependability</h5>
                            </Col>
                            {isIndex.includes(3) ?
                                Consistency.map((item, index) => (
                                    <Col md={4}>
                                        <div className={`${selectedItem2.includes(item.key) && 'active-success'} syatic_box cd_box`} onClick={() => handleSelectItem2(item.key)}>
                                            <div className="syatic_head">
                                                <h6>{item.key}</h6>
                                                <img src={imgInd[index]} />
                                            </div>
                                            <p>{item.des}</p>
                                        </div>
                                    </Col>
                                )) :
                                Consistency.map((item) => (
                                    <Col md={4}>
                                        <span className={`${selectedItem2.includes(item.key) && 'active-success'} brvbox-lg`} onClick={() => handleSelectItem2(item.key)}>{item.key}<i className={`${important.includes(item.key) ? 'fa active-success' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item.key)}></i></span>
                                    </Col>
                                ))
                            }
                        </Row>
                        <Row className="my-4 systematic">
                            <Col md={12} className="mb-3">
                                <h5 className="warning h5_title" onClick={() => handleCard(4)}>Systematic and Detail Oriented</h5>
                            </Col>
                            {isIndex.includes(4) ?
                                Systematic.map((item, index) => (
                                    <Col md={4}>
                                        <div className={`${selectedItem3.includes(item.key) && 'active-warning'} syatic_box so_box`} onClick={() => handleSelectItem3(item.key)}>
                                            <div className="syatic_head">
                                                <h6>{item.key}</h6>
                                                <img src={imgInd[index]} />
                                            </div>
                                            <p>{item.des}</p>
                                        </div>
                                    </Col>
                                )) :
                                Systematic.map((item) => (
                                    <Col md={4}>
                                        <span className={`${selectedItem3.includes(item.key) && 'active-warning'} brvbox-lg`} onClick={() => handleSelectItem3(item.key)}>{item.key}<i className={`${important.includes(item.key) ? 'fa active-warning' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item.key)}></i></span>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* <----------------right side drawer-------------------------------> */}
            <Offcanvas
                show={show}
                onHide={handleClose}
                backdrop={false}
                placement="end"
                className="createjob_drawer lg-drawer shadow-md border-0"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={MagicDark} className="me-2" />
                        Help Me Choose
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="helpme-top">
                        <Row>
                            <Col md={8}>
                                <h6>Extended Behavioural Selection</h6>
                                <ul className="list-block">
                                    <li>All behaviours are positive and desirable. For every role, some are more important that others.
                                    </li>
                                    <li>The same have been grouped based on similarity to make the selection process easier.
                                    </li>
                                    <li>Read about each behaviour and make choices considering the role and the work environment.</li>
                                </ul>
                            </Col>
                            <Col md={4} className="d-flex justify-content-around">
                                <div className="behaviours_ratting">
                                    <h6 className="text-base mb-2">Behaviours</h6>
                                    <div className="circle_ratting">
                                        <span className="ratitem active"></span>
                                        <span className="ratitem active"></span>
                                        <span className="ratitem active"></span>
                                        <span className="ratitem active"></span>
                                        <span className="ratitem"></span>
                                        <span className="ratitem"></span>
                                    </div>
                                    <small>(4 of 6 selected)</small>
                                </div>
                                <div className="important_ratting">
                                    <h6 className="text-base mb-2">Important Behaviours</h6>
                                    <div className="star_ratting">
                                        <i className="fa fa-star active"></i>
                                        <i className="fa fa-star active"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                    <small>(2 of 6 selected)</small>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="brvselection mt-3">
                        <h6>Your selection will display here</h6>
                        <Row className="form-row">
                            {selectedItem.map((item) => (
                                <Col md={2}>
                                    <span className="brvbox active-danger">{item} <span><i className={`${important.includes(item) ? 'fa active-danger' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item)}></i>
                                        <img className="tag_del" src={tagClose} onClick={() => handleCloseItem(item)} />
                                    </span></span>
                                </Col>
                            ))}
                            {selectedItem1.map((item) => (
                                <Col md={2}>
                                    <span className="brvbox active-primery">{item}<span><i className={`${important.includes(item) ? 'fa active-primery' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item)}></i>
                                        <img className="tag_del" src={tagClose} onClick={() => handleCloseItem1(item)} />
                                    </span></span>
                                </Col>
                            ))}
                            {selectedItem2.map((item) => (
                                <Col md={2}>
                                    <span className="brvbox active-success">{item}<span><i className={`${important.includes(item) ? 'fa active-success' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item)}></i>
                                        <img className="tag_del" src={tagClose} onClick={() => handleCloseItem2(item)} />
                                    </span></span>
                                </Col>
                            ))}
                            {selectedItem3.map((item) => (
                                <Col md={2}>
                                    <span className="brvbox active-warning">{item}<span><i className={`${important.includes(item) ? 'fa active-warning' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item)}></i>
                                        <img className="tag_del" src={tagClose} onClick={() => handleCloseItem3(item)} />
                                    </span></span>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <Row className="my-4 individual">
                        <Col md={12} onClick={() => handleCard(1)}>
                            <h5 className="danger h5_title">Individual Effort</h5>
                        </Col>
                        {isIndex.includes(1) ?
                            IndividualEffort.map((item, index) => (
                                <Col md={4}>
                                    <div className={`${selectedItem.includes(item.key) && 'active-danger'} syatic_box ie_box`} onClick={() => handleSelectItem(item.key)}>
                                        <div className="syatic_head">
                                            <h6>{item.key}</h6>
                                            <img src={imgInd[index]} />
                                        </div>
                                        <p>{item.des}</p>
                                    </div>
                                </Col>
                            )) :
                            IndividualEffort.map((item) => (
                                <Col md={4}>
                                    <span className={`${selectedItem.includes(item.key) && 'active-danger'} brvbox-lg`} onClick={() => handleSelectItem(item.key)}>{item.key}<i className={`${important.includes(item.key) ? 'fa active-danger' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item.key)}></i></span>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row className="my-4 interpersonal">
                        <Col md={12}>
                            <h5 className="primery h5_title" onClick={() => handleCard(2)}>Interpersonal Relations</h5>
                        </Col>
                        {isIndex.includes(2) ?
                            InterpersonalRelations.map((item, index) => (
                                <Col md={4}>
                                    <div className={`${selectedItem1.includes(item.key) && 'active-primery'} syatic_box ir_box`} onClick={() => handleSelectItem1(item.key)}>
                                        <div className="syatic_head">
                                            <h6>{item.key}</h6>
                                            <img src={imgInd[index]} />
                                        </div>
                                        <p>{item.des}</p>
                                    </div>
                                </Col>
                            )) :
                            InterpersonalRelations.map((item) => (
                                <Col md={4}>
                                    <span className={`${selectedItem1.includes(item.key) && 'active-primery'} brvbox-lg`} onClick={() => handleSelectItem1(item.key)}>{item.key}<i className={`${important.includes(item.key) ? 'fa active-primery' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item.key)}></i></span>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row className="my-4 individual">
                        <Col md={12}>
                            <h5 className="success h5_title" onClick={() => handleCard(3)}>Consistency & Dependability</h5>
                        </Col>
                        {isIndex.includes(3) ?
                            Consistency.map((item, index) => (
                                <Col md={4}>
                                    <div className={`${selectedItem2.includes(item.key) && 'active-success'} syatic_box cd_box`} onClick={() => handleSelectItem2(item.key)}>
                                        <div className="syatic_head">
                                            <h6>{item.key}</h6>
                                            <img src={imgInd[index]} />
                                        </div>
                                        <p>{item.des}</p>
                                    </div>
                                </Col>
                            )) :
                            Consistency.map((item) => (
                                <Col md={4}>
                                    <span className={`${selectedItem2.includes(item.key) && 'active-success'} brvbox-lg`} onClick={() => handleSelectItem2(item.key)}>{item.key}<i className={`${important.includes(item.key) ? 'fa active-success' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item.key)}></i></span>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row className="my-4 systematic">
                        <Col md={12} className="mb-3">
                            <h5 className="warning h5_title" onClick={() => handleCard(4)}>Systematic and Detail Oriented</h5>
                        </Col>
                        {isIndex.includes(4) ?
                            Systematic.map((item, index) => (
                                <Col md={4}>
                                    <div className={`${selectedItem3.includes(item.key) && 'active-warning'} syatic_box so_box`} onClick={() => handleSelectItem3(item.key)}>
                                        <div className="syatic_head">
                                            <h6>{item.key}</h6>
                                            <img src={imgInd[index]} />
                                        </div>
                                        <p>{item.des}</p>
                                    </div>
                                </Col>
                            )) :
                            Systematic.map((item) => (
                                <Col md={4}>
                                    <span className={`${selectedItem3.includes(item.key) && 'active-warning'} brvbox-lg`} onClick={() => handleSelectItem3(item.key)}>{item.key}<i className={`${important.includes(item.key) ? 'fa active-warning' : 'far'} fa-star`} onClick={(e) => handleImportant(e, item.key)}></i></span>
                                </Col>
                            ))
                        }
                    </Row>
                </Offcanvas.Body>
                <div className="offcanvas-footer text-end">
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </Offcanvas>
        </>
    )
}

export default HelpChoose