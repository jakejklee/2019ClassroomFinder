import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import firebase from '../firebase/firebase';
import '../css/ManagerMain.css';
import ClassModal from '../components/ClassModal';
import _ from 'lodash';

interface Props {
    history: any,
}
interface State {
    classModal: boolean,
    editClassModal: boolean,
    modalType: string,
    isConfirmed: boolean,
    userID: string,
    userSchoolName: string,
    schoolCode: string,
}

class ManagerMain extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            classModal: false,
            editClassModal: false,
            modalType: '',
            isConfirmed: true,
            userID: '',
            userSchoolName: '',
            schoolCode: '',
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.firestore().collection('users').doc(user.uid).onSnapshot((info) => {
                    // this.setState({ userInfo: info.data() })
                    const userInfo = info.data();
                    if (userInfo) {
                        if (userInfo.isManager) {
                            if (userInfo.isConfirmed) {
                                this.setState({ isConfirmed: true });
                                this.setState({ userID: user.uid });
                                this.setState({ userSchoolName: userInfo.schoolName });

                                firebase.firestore().collection('classes').onSnapshot((result) => {
                                    _.each(result.docs, (data) => {
                                        const name = data.data().name;
                                        const userSchoolName = this.state.userSchoolName;
                                        if (name === userSchoolName) {
                                            this.setState({ schoolCode: data.id });
                                        }
                                    })
                                })
                            } else {
                                this.setState({ isConfirmed: false });

                            }
                        } else {
                            this.props.history.push('/studentMain');
                        }
                    }
                });
            } else {
                this.props.history.push('/');
            }
        });
    }

    private signOut = () => {
        firebase.auth().signOut().then((user) => {
            console.log(user);
            console.log('Logged out');
            this.props.history.push('/');
        }).catch((error) => {
            console.log(error);
        })
    }

    private clickBtn = (type: string) => {
        this.setState({ modalType: type });
        this.setState({ classModal: true });
    }
    render() {
        const modalData = {
            modalType: this.state.modalType,
            modalHide: () => { this.setState({ classModal: false }) },
            modalOpen: this.state.classModal,
            schoolName: this.state.userSchoolName,
            schoolCode: this.state.schoolCode,
        }
        if (this.state.isConfirmed) {
            return (

                <div style={{ margin: 'auto', width: '70%', textAlign: 'center' }}>
                    <Row>
                        <Col></Col>
                        <Col><h1 >Manager Page</h1></Col>
                        <Col>
                            <h6 id='signOutBtn' style={{
                                border: '1px solid', width: 110, height: 40,
                                lineHeight: '35px', marginTop: 10, cursor: 'pointer', borderRadius: 5
                            }} onClick={() => this.signOut()}>Sign out</h6>
                        </Col>
                    </Row>
                    <br></br>
                    <Row style={{ width: '100%', marginBottom: 30 }}>
                        <Col md='auto' id='addBtn' style={{ width: 300, height: 270, margin: 'auto', marginRight: 0 }}>
                            <Button style={{ width: '100%', height: '100%', fontWeight: btnFontWeight, fontSize: btnFontSize }}
                                onClick={() => { this.clickBtn('add') }}
                            >Add a class</Button>
                        </Col>
                        <Col md='auto' id='editBtn' style={{ width: 300, height: 270, margin: 'auto', marginLeft: 0 }}>
                            <Button style={{ width: '100%', height: '100%', fontWeight: btnFontWeight, fontSize: btnFontSize }}
                                onClick={() => { this.clickBtn('edit') }}
                            >Edit a class</Button>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col md='auto' id='removeBtn' style={{ width: 300, height: 270, margin: 'auto', marginRight: 0 }}>
                            <Button style={{ width: '100%', height: '100%', fontWeight: btnFontWeight, fontSize: btnFontSize }}
                                onClick={() => { this.clickBtn('remove') }}>Remove a class</Button>
                        </Col>
                        <Col md='auto' id='studentBtn' style={{ width: 300, height: 270, margin: 'auto', marginLeft: 0 }}>
                            <Link to='studentMain'>
                                <Button style={{ width: '100%', height: '100%', fontWeight: btnFontWeight, fontSize: btnFontSize }}>Student screen</Button>
                            </Link>

                        </Col>

                    </Row>
                    <br></br>
                    <br></br>

                    <ClassModal
                        modalInfo={modalData}
                    />

                </div>
            );
        } else {
            return (
                <div>
                    Your account is not confirmed yet.
                    <h6 id='signOutBtn' style={{
                        border: '1px solid', width: 110, height: 40, textAlign:'center',
                        lineHeight: '35px', margin: 20, cursor: 'pointer', borderRadius: 5
                    }} onClick={() => this.signOut()}>Sign out</h6>
                </div>
            );
        }

    }
}

const btnFontWeight = 'bold';
const btnFontSize = 30;
export default ManagerMain;