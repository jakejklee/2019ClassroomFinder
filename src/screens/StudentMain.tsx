import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';
import { Button, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

interface Props {
    history: any,
}
interface State {
    userID: string,
    userSchoolName: string,
    schoolCode: string,
}

class StudentMain extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
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
                        });
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

    private renderData = () => {
        console.log(this.state.schoolCode);
        let classData:any=[];
        if (this.state.schoolCode) {
            firebase.firestore().collection('classes').doc(this.state.schoolCode).collection('Fall 2019').onSnapshot((result) => {
                const classDetail = result.docs[0].data()
                classData.push(classDetail.day);
                console.log(classDetail.day);
                // classData = result.docs[0].data().day;
                // _.each(result.data(), (data) => {
                //     const name = data;
                //     console.log(name);
                // })
            });
        }
        console.log(classData);
        return <div>{classData}</div>;

    }
    render() {
        return (
            <div>
                <h6 id='signOutBtn' style={{
                    border: '1px solid', width: 110, height: 40,
                    lineHeight: '35px', marginTop: 10, cursor: 'pointer', borderRadius: 5
                }} onClick={() => this.signOut()}>Sign out</h6>
                <h1>studentMain</h1>
                {this.renderData()}
                <div onClick={() => { this.renderData() }}>Get class data</div>

                <Link to='/managerMain'>managerMain</Link>
                <Link to='/manageclasses'>manageclasses</Link>
                <Link to='/signup'>signup</Link>
                <Link to='/studentMain'>studentMain</Link>
                <Link to='/'>Login</Link>
            </div>
        );
    }
}
export default StudentMain;