import React from 'react';
import { Modal, Spinner, Button, Form, Col, Row } from 'react-bootstrap';
import firebase from '../firebase/firebase';
import _ from 'lodash';
import XLSX from 'xlsx';

interface Props {
    modalInfo: any,
}
interface State {
    classTerm: string,
    classCode: string,
    subject: string,
    title: string,
    startDay: string,
    startMonth: string,
    startYear: string,
    endDay: string,
    endMonth: string,
    endYear: string,
    days: string,
    startHour: string,
    startMin: string,
    endHour: string,
    endMin: string,
    campus: string,
    room: string,
    addingClasses: boolean,
    classInfo: any,
    editClass: boolean,
    classCodeErr: boolean,
    editClassID: string,
    removeClassID: string,
    removeClass: boolean,
}
const currentTime = new Date();
let classCreatedDate: any;
class ClassModal extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            classTerm: 'Fall 2019',
            classCode: '',
            subject: '',
            title: '',
            startDay: '',
            startMonth: '',
            startYear: '',
            endDay: '',
            endMonth: '',
            endYear: '',
            days: '',
            startHour: '',
            startMin: '',
            endHour: '',
            endMin: '',
            campus: '',
            room: '',
            addingClasses: false,
            classInfo: {},
            editClass: false,
            editClassID: '',
            removeClassID: '',
            classCodeErr: false,
            removeClass: false,
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
            case 'startDay':
                this.setState({ startDay: e.target.value });
                return;
            case 'startMonth':
                this.setState({ startMonth: e.target.value });
                return;
            case 'startYear':
                this.setState({ startYear: e.target.value });
                return;
            case 'endDay':
                this.setState({ endDay: e.target.value });
                return;
            case 'endMonth':
                this.setState({ endMonth: e.target.value });
                return;
            case 'endYear':
                this.setState({ endYear: e.target.value });
                return;
            case 'days':
                this.setState({ days: e.target.value });
                return;
            case 'startHour':
                this.setState({ startHour: e.target.value });
                return;
            case 'startMin':
                this.setState({ startMin: e.target.value });
                return;
            case 'endHour':
                this.setState({ endHour: e.target.value });
                return;
            case 'endMin':
                this.setState({ endMin: e.target.value });
                return;
            case 'campus':
                this.setState({ campus: e.target.value });
                return;
            case 'room':
                this.setState({ room: e.target.value });
                return;
            case 'classInfo':
                const reader = new FileReader();
                reader.readAsArrayBuffer(e.target.files[0]);

                reader.onload = (ent) => {
                    console.log('file onload');
                    const bstr: any = reader.result;
                    let data;
                    if (bstr !== null) {
                        data = new Uint8Array(bstr);
                    }
                    const wb = XLSX.read(data, { type: 'array' });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const output = XLSX.utils.sheet_to_json(ws, { header: 1 });
                    if (_.size(output) > 0) {

                        this.setState({ classInfo: output });
                    }
                }

                return;
        }
    }

    private renderTerm = () => {
        let defaultTerm;
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

    private removeClass = () => {
        const modalData = this.props.modalInfo;
        if (this.state.removeClass) {
            firebase.firestore().collection(modalData.schoolName).doc(this.state.removeClassID).delete()
                .then(() => {
                    console.log('class removed');
                    this.setState({ removeClass: false });
                    this.setState({ classCode: '' });
                    this.setState({ classCodeErr: false });
                    this.setState({ removeClassID: '' });
                });
        } else {
            firebase.firestore().collection(modalData.schoolName).where('classCode', '==', this.state.classCode).onSnapshot((result) => {
                console.log(result);
                if (result.empty) {
                    this.setState({ classCode: 'No class found' });
                    this.setState({ classCodeErr: true });
                } else {
                    this.setState({ classCodeErr: false });
                    _.each(result.docs, (data) => {
                        this.setState({ removeClassID: data.id });
                    });
                    this.setState({ removeClass: true });
                }
            });
        }
    }

    private getClasse = () => {
        const modalData = this.props.modalInfo;
        firebase.firestore().collection(modalData.schoolName).where('classCode', '==', this.state.classCode).onSnapshot((result) => {
            console.log(result);

            if (result.empty) {
                this.setState({ classCode: 'No class found' });
                this.setState({ classCodeErr: true });
            } else {
                _.each(result.docs, (data) => {
                    const classData = data.data();
                    console.log(classData);
                    console.log(data);
                    this.setState({ classCodeErr: false });
                    this.setState({ editClass: true });
                    this.setState({ campus: classData.campus });
                    this.setState({ classCode: classData.classCode });
                    this.setState({ subject: classData.subject });
                    this.setState({ title: classData.title });
                    this.setState({ startDay: classData.startDay });
                    this.setState({ startMonth: classData.startMonth });
                    this.setState({ startYear: classData.startYear });
                    this.setState({ endDay: classData.endDay });
                    this.setState({ endMonth: classData.endMonth });
                    this.setState({ endYear: classData.endYear });
                    this.setState({ days: classData.day });
                    this.setState({ startHour: classData.startHour });
                    this.setState({ startMin: classData.startMin });
                    this.setState({ endHour: classData.endHour });
                    this.setState({ endMin: classData.endMin });
                    this.setState({ room: classData.room });
                    this.setState({ editClassID: data.id });
                    classCreatedDate = classData.createdAt
                })
            }
        })
    }
    private editClass = () => {
        const timeNow = new Date();
        const modalData = this.props.modalInfo;
        console.log('edit');
        firebase.firestore().collection(modalData.schoolName).doc(this.state.editClassID).set(
            {
                subject: this.state.subject,
                classCode: this.state.classCode,
                createdAt: classCreatedDate,
                editedAt: timeNow,
                title: this.state.title,
                startDay: this.state.startDay,
                startMonth: this.state.startMonth,
                startYear: this.state.startYear,
                endDay: this.state.endDay,
                endMonth: this.state.endMonth,
                endYear: this.state.endYear,
                day: this.state.days,
                startHour: this.state.startHour,
                startMin: this.state.startMin,
                endHour: this.state.endHour,
                endMin: this.state.endMin,
                campus: this.state.campus,
                room: this.state.room,
                term: this.state.classTerm,
            }
        ).then((result) => {
            console.log(result);
            this.setState({ campus: '' });
            this.setState({ classCode: '' });
            this.setState({ subject: '' });
            this.setState({ title: '' });
            this.setState({ startDay: '' });
            this.setState({ startMonth: '' });
            this.setState({ startYear: '' });
            this.setState({ endDay: '' });
            this.setState({ endMonth: '' });
            this.setState({ endYear: '' });
            this.setState({ days: '' });
            this.setState({ startHour: '' });
            this.setState({ startMin: '' });
            this.setState({ endHour: '' });
            this.setState({ endMin: '' });
            this.setState({ room: '' });
            this.setState({ classCodeErr: false });
            this.setState({ editClass: false });
            this.setState({ editClassID: '' });
            classCreatedDate = '';
            this.props.modalInfo.modalHide();
        });
    }

    private addClass = () => {
        const timeNow = new Date();
        const modalData = this.props.modalInfo;

        if (this.state.addingClasses) {
            _.each(this.state.classInfo, (data) => {
                if (data.length < 17) {
                    console.log('error');
                } else {

                    firebase.firestore().collection(modalData.schoolName).add(
                        {
                            createdAt: timeNow,
                            classCode: data[0].toString(),
                            subject: data[1],
                            title: data[2],
                            startDay: data[3].toString(),
                            startMonth: data[4].toString(),
                            startYear: data[5].toString(),
                            endDay: data[6].toString(),
                            endMonth: data[7].toString(),
                            endYear: data[8].toString(),
                            day: data[9],
                            startHour: data[10].toString(),
                            startMin: data[11].toString() === '0' ? '00' : data[11].toString(),
                            endHour: data[12].toString(),
                            endMin: data[13].toString() === '0' ? '00' : data[13].toString(),
                            campus: data[14],
                            room: data[15].toString(),
                            term: data[16],
                        }
                    ).then((result) => {
                        this.props.modalInfo.modalHide();
                        console.log(result);
                    });
                }
            });
        } else {
            firebase.firestore().collection(modalData.schoolName).where('classCode', '==', this.state.classCode).onSnapshot((result) => {
                if (result.empty) {
                    firebase.firestore().collection(modalData.schoolName).add(
                        {
                            createdAt: timeNow,
                            classCode: this.state.classCode,
                            subject: this.state.subject,
                            title: this.state.title,
                            startDay: this.state.startDay,
                            startMonth: this.state.startMonth,
                            startYear: this.state.startYear,
                            endDay: this.state.endDay,
                            endMonth: this.state.endMonth,
                            endYear: this.state.endYear,
                            day: this.state.days,
                            startHour: this.state.startHour,
                            startMin: this.state.startMin,
                            endHour: this.state.endHour,
                            endMin: this.state.endMin,
                            campus: this.state.campus,
                            room: this.state.room,
                            term: this.state.classTerm,
                        }
                    ).then((result) => {
                        console.log(result);
                        this.setState({ campus: '' });
                        this.setState({ classCode: '' });
                        this.setState({ subject: '' });
                        this.setState({ title: '' });
                        this.setState({ startDay: '' });
                        this.setState({ startMonth: '' });
                        this.setState({ startYear: '' });
                        this.setState({ endDay: '' });
                        this.setState({ endMonth: '' });
                        this.setState({ endYear: '' });
                        this.setState({ days: '' });
                        this.setState({ startHour: '' });
                        this.setState({ startMin: '' });
                        this.setState({ endHour: '' });
                        this.setState({ endMin: '' });
                        this.setState({ room: '' });
                        this.setState({ classCodeErr: false });
                        this.props.modalInfo.modalHide();
                    });
                } else {
                    this.setState({ classCodeErr: true });
                    this.setState({ classCode: 'Code already exist' });
                }
            });
        }
    }

    render() {
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
                                <Form.Label>Select an Excel file</Form.Label>
                                <Form.Control type='file' name="classInfo"
                                    onChange={(e: any) => { this.handleChange(e) }}
                                    // placeholder='classCode: 123456,subject: CSIS-1234,title: Database,startDate: 2019-09-03,endDate: 2019-12-20,day: Monday,time: 11:30-14:20,campus: New Westminster,room: N5111 / classCode: 123455,subject: CSIS-1233,title: Web programming,startDate: 2019-09-03,endDate: 2019-12-20,day: Tuesday,time: 11:30-14:20,campus: New Westminster,room: N5111 / classCode: 123454,subject: CSIS-1232,title: Applied Research,startDate: 2019-09-03,endDate: 2019-12-20,day: Wednesday,time: 12:30-15:20,campus: New Westminster,room: N6109' />
                                    placeholder='Upload file' />
                                {/* <input type='file'></input> */}
                            </Form.Group>
                            :
                            <Form style={{ border: '1px solid', padding: 20, borderRadius: 20, marginTop: 20 }}>
                                <Form.Group as={Row} controlId="formHorizontalSchool">
                                    <Form.Label column sm={2}>
                                        Term
                        </Form.Label>
                                    <Col sm={10}>
                                        {this.renderTerm()}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalCode">
                                    <Form.Label column sm={2}>
                                        Class Code
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Class Code" name='classCode'
                                            style={{ border: this.state.classCodeErr ? '2px solid rgb(210, 0, 0)' : '1px solid #ced4da' }}
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
                                {/* <Form.Group as={Row} controlId="formHorizontalStartDate">
                                    <Form.Label column sm={2}>
                                        Start Date
                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="date" placeholder="Start date" name='startDate'
                                            value={this.state.startDate} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group> */}

                                <Form.Row>
                                    <Form.Label column sm={2}>
                                        {/* <Form.Label column sm={2}> */}
                                        Start Date
                                </Form.Label>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control as="select" name='startMonth'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Month</option>
                                            <option>Jan</option>
                                            <option>Feb</option>
                                            <option>Mar</option>
                                            <option>Apr</option>
                                            <option>May</option>
                                            <option>Jun</option>
                                            <option>Jul</option>
                                            <option>Aug</option>
                                            <option>Sep</option>
                                            <option>Oct</option>
                                            <option>Nov</option>
                                            <option>Dec</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" name='startDay'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Day</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                            <option>13</option>
                                            <option>14</option>
                                            <option>15</option>
                                            <option>16</option>
                                            <option>17</option>
                                            <option>18</option>
                                            <option>19</option>
                                            <option>20</option>
                                            <option>21</option>
                                            <option>22</option>
                                            <option>23</option>
                                            <option>24</option>
                                            <option>25</option>
                                            <option>26</option>
                                            <option>27</option>
                                            <option>28</option>
                                            <option>29</option>
                                            <option>30</option>
                                            <option>31</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Control as="select" name='startYear'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Year</option>
                                            <option>2019</option>
                                            <option>2020</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Label column sm={2}>
                                        End Date
                                     </Form.Label>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control as="select" name='endMonth'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Month</option>
                                            <option>Jan</option>
                                            <option>Feb</option>
                                            <option>Mar</option>
                                            <option>Apr</option>
                                            <option>May</option>
                                            <option>Jun</option>
                                            <option>Jul</option>
                                            <option>Aug</option>
                                            <option>Sep</option>
                                            <option>Oct</option>
                                            <option>Nov</option>
                                            <option>Dec</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" name='endDay'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Day</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                            <option>13</option>
                                            <option>14</option>
                                            <option>15</option>
                                            <option>16</option>
                                            <option>17</option>
                                            <option>18</option>
                                            <option>19</option>
                                            <option>20</option>
                                            <option>21</option>
                                            <option>22</option>
                                            <option>23</option>
                                            <option>24</option>
                                            <option>25</option>
                                            <option>26</option>
                                            <option>27</option>
                                            <option>28</option>
                                            <option>29</option>
                                            <option>30</option>
                                            <option>31</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Control as="select" name='endYear'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Year</option>
                                            <option>2019</option>
                                            <option>2020</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

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
                                            <option value='Monday'>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                {/* <Form.Group as={Row} controlId="formHorizontalTime">
                                    <Form.Label column sm={2}>
                                        Time
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Time" name='time'
                                            value={this.state.time} onChange={(e: any) => { this.handleChange(e) }} />
                                    </Col>
                                </Form.Group> */}

                                <Form.Row>
                                    <Form.Label column sm={2}>
                                        Time
                                     </Form.Label>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control as="select" name='startHour'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Hour</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                            <option>13</option>
                                            <option>14</option>
                                            <option>15</option>
                                            <option>16</option>
                                            <option>17</option>
                                            <option>18</option>
                                            <option>19</option>
                                            <option>20</option>
                                            <option>21</option>
                                            <option>22</option>
                                            <option>23</option>
                                            <option>24</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Label column md='auto'>
                                        :
                                     </Form.Label>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" name='startMin'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Min</option>
                                            <option>00</option>
                                            <option>10</option>
                                            <option>20</option>
                                            <option>30</option>
                                            <option>40</option>
                                            <option>50</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Label column md='auto'>
                                        ~
                                     </Form.Label>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control as="select" name='endHour'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Hour</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                            <option>13</option>
                                            <option>14</option>
                                            <option>15</option>
                                            <option>16</option>
                                            <option>17</option>
                                            <option>18</option>
                                            <option>19</option>
                                            <option>20</option>
                                            <option>21</option>
                                            <option>22</option>
                                            <option>23</option>
                                            <option>24</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Label column md='auto'>
                                        :
                                     </Form.Label>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Control as="select" name='endMin'
                                            onChange={(e: any) => { this.handleChange(e) }}>
                                            <option selected>Min</option>
                                            <option>00</option>
                                            <option>10</option>
                                            <option>20</option>
                                            <option>30</option>
                                            <option>40</option>
                                            <option>50</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

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
                            {console.log(this.state.classInfo)}
                            {_.size(this.state.classInfo) > 0 && this.state.addingClasses ? <Button onClick={() => { this.addClass() }}
                                style={{ marginLeft: 100 }}>
                                Add classes</Button> :
                                this.state.classCode && this.state.subject && this.state.title &&
                                    this.state.startYear && this.state.endYear && this.state.days && this.state.endMin &&
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
                        // size="sm"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                                Edit a class
                                    </Modal.Title>
                        </Modal.Header>
                        {this.state.editClass ?
                            <Modal.Body style={{ textAlign: 'center' }}>

                                <Form style={{ border: '1px solid', padding: 20, borderRadius: 20, marginTop: 20 }}>
                                    <Form.Group as={Row} controlId="formHorizontalCode">
                                        <Form.Label column sm={2}>
                                            Class Code
                                    </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="text" placeholder="Enter Class Code" name='classCode' disabled
                                                value={this.state.classCode} onChange={(e: any) => { this.handleChange(e) }} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalSchool">
                                        <Form.Label column sm={2}>
                                            Term
                                    </Form.Label>
                                        <Col sm={10}>
                                            {this.renderTerm()}
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

                                    <Form.Row>
                                        <Form.Label column sm={2}>
                                            {/* <Form.Label column sm={2}> */}
                                            Start Date
                                </Form.Label>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Control as="select" name='startMonth' value={this.state.startMonth}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Month</option>
                                                <option>Jan</option>
                                                <option>Feb</option>
                                                <option>Mar</option>
                                                <option>Apr</option>
                                                <option>May</option>
                                                <option>Jun</option>
                                                <option>Jul</option>
                                                <option>Aug</option>
                                                <option>Sep</option>
                                                <option>Oct</option>
                                                <option>Nov</option>
                                                <option>Dec</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Control as="select" name='startDay' value={this.state.startDay}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Day</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                                <option>13</option>
                                                <option>14</option>
                                                <option>15</option>
                                                <option>16</option>
                                                <option>17</option>
                                                <option>18</option>
                                                <option>19</option>
                                                <option>20</option>
                                                <option>21</option>
                                                <option>22</option>
                                                <option>23</option>
                                                <option>24</option>
                                                <option>25</option>
                                                <option>26</option>
                                                <option>27</option>
                                                <option>28</option>
                                                <option>29</option>
                                                <option>30</option>
                                                <option>31</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Control as="select" name='startYear' value={this.state.startYear}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Year</option>
                                                <option>2019</option>
                                                <option>2020</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Label column sm={2}>
                                            End Date
                                    </Form.Label>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Control as="select" name='endMonth' value={this.state.endMonth}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Month</option>
                                                <option>Jan</option>
                                                <option>Feb</option>
                                                <option>Mar</option>
                                                <option>Apr</option>
                                                <option>May</option>
                                                <option>Jun</option>
                                                <option>Jul</option>
                                                <option>Aug</option>
                                                <option>Sep</option>
                                                <option>Oct</option>
                                                <option>Nov</option>
                                                <option>Dec</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Control as="select" name='endDay' value={this.state.endDay}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Day</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                                <option>13</option>
                                                <option>14</option>
                                                <option>15</option>
                                                <option>16</option>
                                                <option>17</option>
                                                <option>18</option>
                                                <option>19</option>
                                                <option>20</option>
                                                <option>21</option>
                                                <option>22</option>
                                                <option>23</option>
                                                <option>24</option>
                                                <option>25</option>
                                                <option>26</option>
                                                <option>27</option>
                                                <option>28</option>
                                                <option>29</option>
                                                <option>30</option>
                                                <option>31</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Control as="select" name='endYear' value={this.state.endYear}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Year</option>
                                                <option>2019</option>
                                                <option>2020</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group as={Row} controlId="formHorizontalDays">
                                        <Form.Label column sm={2}>
                                            Days
                                    </Form.Label>
                                        <Col sm={10}>
                                            {/* <Form.Control type="text" placeholder="Days" name='days'
                                        value={this.state.days} onChange={(e: any) => { this.handleChange(e) }} /> */}
                                            <Form.Control as="select" name='days' value={this.state.days}
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
                                    {/* <Form.Group as={Row} controlId="formHorizontalTime">
                                        <Form.Label column sm={2}>
                                            Time
                                    </Form.Label>  
                                        <Col sm={10}>
                                            <Form.Control type="text" placeholder="Time" name='time'
                                                value={this.state.time} onChange={(e: any) => { this.handleChange(e) }} />
                                        </Col>
                                    </Form.Group> */}

                                    <Form.Row>
                                        <Form.Label column sm={2}>
                                            Time
                                     </Form.Label>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Control as="select" name='startHour' value={this.state.startHour}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Hour</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                                <option>13</option>
                                                <option>14</option>
                                                <option>15</option>
                                                <option>16</option>
                                                <option>17</option>
                                                <option>18</option>
                                                <option>19</option>
                                                <option>20</option>
                                                <option>21</option>
                                                <option>22</option>
                                                <option>23</option>
                                                <option>24</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Label column md='auto'>
                                            :
                                     </Form.Label>
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Control as="select" name='startMin' value={this.state.startMin}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Min</option>
                                                <option>00</option>
                                                <option>10</option>
                                                <option>20</option>
                                                <option>30</option>
                                                <option>40</option>
                                                <option>50</option>
                                            </Form.Control>
                                        </Form.Group>
                                        ~
                                    <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Control as="select" name='endHour' value={this.state.endHour}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Hour</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                                <option>13</option>
                                                <option>14</option>
                                                <option>15</option>
                                                <option>16</option>
                                                <option>17</option>
                                                <option>18</option>
                                                <option>19</option>
                                                <option>20</option>
                                                <option>21</option>
                                                <option>22</option>
                                                <option>23</option>
                                                <option>24</option>
                                            </Form.Control>
                                        </Form.Group>
                                        :
                                    <Form.Group as={Col} controlId="formGridState">
                                            <Form.Control as="select" name='endMin' value={this.state.endMin}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option selected>Min</option>
                                                <option>00</option>
                                                <option>10</option>
                                                <option>20</option>
                                                <option>30</option>
                                                <option>40</option>
                                                <option>50</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

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
                            </Modal.Body>

                            :

                            <Modal.Body style={{ textAlign: 'center' }}>

                                <Form style={{ border: '1px solid', padding: 20, borderRadius: 20, marginTop: 20 }}>
                                    <Form.Group as={Row} controlId="formHorizontalCode">
                                        <Form.Label column sm={2}>
                                            Class Code
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="text" placeholder="Enter Class Code" name='classCode'
                                                style={{ border: this.state.classCodeErr ? '2px solid rgb(210, 0, 0)' : '1px solid #ced4da' }}
                                                value={this.state.classCode} onChange={(e: any) => { this.handleChange(e) }}
                                                onFocus={() => { this.setState({ classCode: '' }) }} />
                                        </Col>
                                    </Form.Group>

                                </Form>
                            </Modal.Body>
                        }
                        <Modal.Footer>
                            {this.state.editClass ?
                                <Button onClick={() => { this.editClass() }}
                                    style={{ marginLeft: 100 }}>Edit</Button>
                                :
                                <Button onClick={() => { this.getClasse() }}
                                    style={{ marginLeft: 100 }}>Submit</Button>
                            }
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
                        // size="sm"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                                Remove a class
                                    </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: 'center' }}>
                            <Form style={{ border: '1px solid', padding: 20, borderRadius: 20, marginTop: 20 }}>
                                <Form.Group as={Row} controlId="formHorizontalCode">
                                    <Form.Label column sm={2}>
                                        Class Code
                                        </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Enter Class Code" name='classCode'
                                            style={{ border: this.state.classCodeErr ? '2px solid rgb(210, 0, 0)' : '1px solid #ced4da' }}
                                            value={this.state.classCode} onChange={(e: any) => { this.handleChange(e) }}
                                            onFocus={() => { this.setState({ classCode: '' }) }} />
                                    </Col>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            {this.state.removeClass ?
                                <Button variant='danger' onClick={() => { this.removeClass() }}
                                    style={{ marginLeft: 100 }}>Confirm</Button>
                                :
                                <Button onClick={() => { this.removeClass() }}
                                    style={{ marginLeft: 100 }}>Remove</Button>
                            }
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