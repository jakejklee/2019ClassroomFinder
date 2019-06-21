import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import firebase from '../firebase/firebase';

interface Props {
}
interface State {
    studentOrManager: boolean;
    userEmail: string;
    password: string;
    fName: string;
    lName: string;
    schoolName: string;
    studentID: string;
}

class Signup extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            studentOrManager: false,
            userEmail: '',
            password: '',
            fName: '',
            lName: '',
            schoolName: '',
            studentID: '',
        }
    }

    private signUp = (email: string, password: string) => {
        console.log(email);
        console.log(password);
        const currentTime = new Date();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                if (result.user) {
                    this.state.studentOrManager ?
                        firebase.firestore().collection('users').doc(result.user.uid)
                            .set(
                                {
                                    createdAt: currentTime,
                                    userEmail: result.user.email,
                                    firstName: this.state.fName,
                                    lastName: this.state.lName,
                                    schoolName: this.state.schoolName,
                                    isManager: this.state.studentOrManager,
                                    isConfirmed:false,
                                }
                            )
                        :
                        firebase.firestore().collection('users').doc(result.user.uid)
                            .set(
                                {
                                    createdAt: currentTime,
                                    userEmail: result.user.email,
                                    firstName: this.state.fName,
                                    lastName: this.state.lName,
                                    schoolName: this.state.schoolName,
                                    isManager: this.state.studentOrManager,
                                    userID: this.state.studentID,
                                }
                            );
                }
                console.log(result)
            }).catch((error) => {
                console.log(error);
            })
    }

    handleEmailChange(e: any) {
        this.setState({ userEmail: e.target.value });
    }
    handlePWChange(e: any) {
        this.setState({ password: e.target.value });
    }
    handleFNameChange(e: any) {
        this.setState({ fName: e.target.value });
    }
    handleLNameChange(e: any) {
        this.setState({ lName: e.target.value });
    }
    handleSchoolChange(e: any) {
        this.setState({ schoolName: e.target.value });

    }

    handleStudentIDChange(e: any) {
        this.setState({ studentID: e.target.value });
    }
    render() {
        console.log(this.state.schoolName);
        return (
            <div style={{ width: 700, margin: 'auto', textAlign: 'center' }}>
                <h1>New account</h1>
                <Form style={{ border: '1px solid', padding: 20, borderRadius: 20, marginTop: 20 }}>
                    <fieldset>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        label="Student"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        onChange={() => { this.setState({ studentOrManager: false }) }}
                                        defaultChecked
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        label="Manager"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        onChange={() => { this.setState({ studentOrManager: true }) }}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </fieldset>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email"
                                value={this.state.userEmail} onChange={(e: any) => { this.handleEmailChange(e) }} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password"
                                value={this.state.password} onChange={(e: any) => { this.handlePWChange(e) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalFName">
                        <Form.Label column sm={2}>
                            First Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="First Name"
                                value={this.state.fName} onChange={(e: any) => { this.handleFNameChange(e) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalLName">
                        <Form.Label column sm={2}>
                            Last Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Last Name"
                                value={this.state.lName} onChange={(e: any) => { this.handleLNameChange(e) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalSchool">
                        <Form.Label column sm={2}>
                            School
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" onChange={(e: any) => { this.handleSchoolChange(e) }}>
                                <option>School</option>
                                <option>Dougls College</option>
                                <option>University of Douglas</option>
                                <option>Douglas Institute of Technology</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    {this.state.studentOrManager ? null :
                        <Form.Group as={Row} controlId="formHorizontalStudentID">
                            <Form.Label column sm={2}>
                                Student ID
                        </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Student ID"
                                    value={this.state.studentID} onChange={(e: any) => { this.handleStudentIDChange(e) }} />
                            </Col>
                        </Form.Group>

                    }
                    <Form.Group as={Row}>
                        <Col>
                            <div>
                                <Button variant='success'>
                                    <Link to='/' style={{color:'white', textDecoration:'none'}}>Sign in page</Link>
                                    </Button>
                            {this.state.userEmail && this.state.password ?
                                <Button onClick={() => { this.signUp(this.state.userEmail, this.state.password)}}
                                style={{marginLeft:100}}>
                                    <Link to='/' style={{color:'white', textDecoration:'none'}}>Sign up</Link></Button> 
                                :
                                <Button type="submit" disabled
                                style={{marginLeft:100}}> Sign up</Button>
                            }
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}
export default Signup;