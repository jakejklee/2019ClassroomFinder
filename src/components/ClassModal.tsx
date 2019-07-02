import React from 'react';
import { Modal, Spinner, Button, Form, Col, Row } from 'react-bootstrap';
import firebase from '../firebase/firebase';
import _ from 'lodash';
interface Props {
    modalInfo: any,
}
interface State {
    classTerm: string,
    classCode: string,
    subject: string,
    title: string,
    startDate: string,
    endDate: string,
    days: string,
    time: string,
    campus: string,
    room: string,
    addingClasses: boolean,
    classInfo: any,
}
const currentTime = new Date();
class ClassModal extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            classTerm: 'Fall 2019',
            classCode: '',
            subject: '',
            title: '',
            startDate: '',
            endDate: '',
            days: '',
            time: '',
            campus: '',
            room: '',
            addingClasses: false,
            classInfo: undefined,
            // schoolCode: '',
            // title: '',
            // Term:'',
        }
    }

    private handleChange = (e: any) => {
        switch (e.target.name) {
            case 'term':
                this.setState({ classTerm: e.target.value });
                return;
            case 'classCode':
                this.setState({ classCode: e.target.value });
                return;
            case 'subject':
                this.setState({ subject: e.target.value });
                return;
            case 'title':
                this.setState({ title: e.target.value });
                return;
            case 'startDate':
                this.setState({ startDate: e.target.value });
                return;
            case 'endDate':
                this.setState({ endDate: e.target.value });
                return;
            case 'days':
                this.setState({ days: e.target.value });
                return;
            case 'time':
                this.setState({ time: e.target.value });
                return;
            case 'campus':
                this.setState({ campus: e.target.value });
                return;
            case 'room':
                this.setState({ room: e.target.value });
                return;
            case 'classInfo':
                this.setState({ classInfo: e.target.value });
                return;
        }
    }

    private renderTerm = () => {
        let defaultTerm;
        console.log(currentTime.getFullYear())
        if (currentTime.getMonth() <= 3) {
            defaultTerm =
                <Form.Control as="select" name='term' onChange={(e: any) => { this.handleChange(e) }}>
                    <option selected>Summer 2019</option>
                    <option>Fall 2019</option>
                    <option>Winter 2020</option>
                </Form.Control>
            return defaultTerm;
        } else if (currentTime.getMonth() <= 7 && currentTime.getMonth() >= 4) {
            defaultTerm =
                <Form.Control as="select" name='term' onChange={(e: any) => { this.handleChange(e) }}>
                    <option >Summer 2019</option>
                    <option selected>Fall 2019</option>
                    <option>Winter 2020</option>
                </Form.Control>
            return defaultTerm;
        } else if (currentTime.getMonth() <= 11 && currentTime.getMonth() >= 8) {
            defaultTerm =
                <Form.Control as="select" name='term' onChange={(e: any) => { this.handleChange(e) }}>
                    <option>Summer 2019</option>
                    <option>Fall 2019</option>
                    <option selected>Winter 2020</option>
                </Form.Control>
            return defaultTerm;
        }
    }

    private addClass = () => {
        const timeNow = new Date();
        console.log(this.props.modalInfo.schoolCode);
        const schoolCode = this.props.modalInfo.schoolCode;

        if (this.state.addingClasses) {
            const classInfo = this.state.classInfo.split('/');
            let eachInfo: any = [];
            let classDetail: any = [];
            _.each(classInfo, (each) => {
                eachInfo.push(each.split(','));
            })
            _.each(eachInfo, (classData) => {
                _.each(classData, (detail) => {
                    classDetail.push(detail.split(':'));
                })
                // classDetail.push(classData.split(':'));
            })

            console.log(eachInfo);
            console.log(classDetail);
            _.each(this.state.classInfo, (info) => {
                // console.log(info);

            })
        } else {
            firebase.firestore().collection('classes').doc(schoolCode).collection(this.state.classTerm)
                .add(
                    {
                        createdAt: timeNow,
                        classCode: this.state.classCode,
                        subject: this.state.subject,
                        title: this.state.title,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        day: this.state.days,
                        time: this.state.time,
                        campus: this.state.campus,
                        room: this.state.room,
                    }
                ).then((result) => {
                    console.log(result);
                    this.setState({ campus: '' });
                    this.setState({ classCode: '' });
                    this.setState({ subject: '' });
                    this.setState({ title: '' });
                    this.setState({ startDate: '' });
                    this.setState({ endDate: '' });
                    this.setState({ days: '' });
                    this.setState({ time: '' });
                    this.setState({ room: '' });
                    this.props.modalInfo.modalHide();
                });
        }
    }

    render() {
        console.log(this.props);
        const modalData = this.props.modalInfo;
        if (modalData.modalType === 'add') {
            return (
                <Modal
                    show={modalData.modalOpen}
                    onHide={() => modalData.modalHide()}
                    // size="sm"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                            {modalData.schoolName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: 'center' }}>
                        <fieldset>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="radio"
                                            label="Adding a class"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            onChange={() => { this.setState({ addingClasses: false }) }}
                                            defaultChecked
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="radio"
                                            label="Adding classes"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            onChange={() => { this.setState({ addingClasses: true }) }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </fieldset>
                        {this.state.addingClasses ?
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Class Information</Form.Label>
                                <Form.Control as="textarea" rows="20" name="classInfo" value={this.state.classInfo}
                                    onChange={(e: any) => { this.handleChange(e) }}
                                    placeholder='classCode: 123456,subject: CSIS-1234,title: Database,startDate: 2019-09-03,endDate: 2019-12-20,day: Monday,time: 11:30-14:20,campus: New Westminster,room: N5111 / classCode: 123455,subject: CSIS-1233,title: Web programming,startDate: 2019-09-03,endDate: 2019-12-20,day: Tuesday,time: 11:30-14:20,campus: New Westminster,room: N5111 / classCode: 123454,subject: CSIS-1232,title: Applied Research,startDate: 2019-09-03,endDate: 2019-12-20,day: Wednesday,time: 12:30-15:20,campus: New Westminster,room: N6109' />
                            </Form.Group>
                            :
                            <Form style={{ border: '1px solid', padding: 20, borderRadius: 20, marginTop: 20 }}>
                                <Form.Group as={Row} controlId="formHorizontalSchool">
                                    <Form.Label column sm={2}>
                                        Term
                        </Form.Label>
                                    <Col sm={10}>
                                        {this.renderTerm()}
                                        {/* {currentTime.getMonth() >= 0 && currentTime.getMonth() <= 3 ?
                                        <Form.Control as="select" name='term' onChange={(e: any) => { this.handleChange(e) }}>
                                            <option defaultChecked>Summer 2019</option>
                                            <option>Fall 2019</option>
                                            <option>Winter 2020</option>
                                        </Form.Control>
                                        : null}
                                    {currentTime.getMonth() >= 4 && currentTime.getMonth() <= 7 ?
                                        <Form.Control as="select" name='term' onChange={(e: any) => { this.handleChange(e) }}>
                                            <option>Summer 2019</option>
                                            <option defaultChecked>Fall 2019</option>
                                            <option>Winter 2020</option>
                                        </Form.Control>
                                        : null}
                                    {currentTime.getMonth() >= 8 ?
                                        <Form.Control as="select" name='term' onChange={(e: any) => { this.handleChange(e) }}>
                                            <option>Summer 2019</option>
                                            <option>Fall 2019</option>
                                            <option defaultChecked>Winter 2020</option>
                                        </Form.Control>
                                        : null} */}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalCode">
                                    <Form.Label column sm={2}>
                                        Class Code
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Class Code" name='classCode'
                                            value={this.state.classCode} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalSubject">
                                    <Form.Label column sm={2}>
                                        Subject
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Subject" name='subject'
                                            value={this.state.subject} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalTitle">
                                    <Form.Label column sm={2}>
                                        Title
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Title" name='title'
                                            value={this.state.title} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalStartDate">
                                    <Form.Label column sm={2}>
                                        Start Date
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="date" placeholder="Start date" name='startDate'
                                            value={this.state.startDate} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEndDate">
                                    <Form.Label column sm={2}>
                                        End Date
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="date" placeholder="End date" name='endDate'
                                            value={this.state.endDate} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalDays">
                                    <Form.Label column sm={2}>
                                        Days
                        </Form.Label>
                                    <Col sm={10}>
                                        {/* <Form.Control type="text" placeholder="Days" name='days'
                                        value={this.state.days} onChange={(e: any) => { this.handleChange(e) }} /> */}
                                        <Form.Control as="select" name='days'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Select</option>
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalTime">
                                    <Form.Label column sm={2}>
                                        Time
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Time" name='time'
                                            value={this.state.time} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalCampus">
                                    <Form.Label column sm={2}>
                                        Campus
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Campus" name='campus'
                                            value={this.state.campus} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalRoom">
                                    <Form.Label column sm={2}>
                                        Room
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Room" name='room'
                                            value={this.state.room} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            {_.size(this.state.classInfo) > 0 && this.state.addingClasses ? <Button onClick={() => { this.addClass() }}
                                style={{ marginLeft: 100 }}>
                                Add a class</Button> :
                                this.state.classCode && this.state.subject && this.state.title &&
                                    this.state.startDate && this.state.endDate && this.state.days && this.state.time &&
                                    this.state.campus && this.state.room ?
                                    <Button onClick={() => { this.addClass() }}
                                        style={{ marginLeft: 100 }}>
                                        Add a class</Button>
                                    :
                                    <Button type="submit" disabled
                                        style={{ marginLeft: 100 }}> Add a class</Button>
                            }
                        </div>
                    </Modal.Footer>
                </Modal>
            );
        } else if (modalData.modalType === 'edit') {
            return (
                <div>
                    <Modal
                        show={modalData.modalOpen}
                        onHide={() => modalData.modalHide()}
                        size="sm"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                                Edit a class
                                    </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: 'center' }}>

                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else if (modalData.modalType === 'remove') {
            return (
                <div>
                    <Modal
                        show={modalData.modalOpen}
                        onHide={() => modalData.modalHide()}
                        size="sm"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                                Remove a class
                                    </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: 'center' }}>

                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else {
            return (
                <div>
                    {
                        modalData.modalOpen ?
                            <Spinner animation='border'></Spinner>
                            :
                            null
                    }
                </div>
            );
        }
    }
}
export default ClassModal;