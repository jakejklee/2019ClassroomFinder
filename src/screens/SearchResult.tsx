import React from 'react';
import firebase from '../firebase/firebase';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import _ from 'lodash';

interface Props {
    history: any,
}
interface State {
    searchInfo: any,
    userSchoolName: string,
    classInfo: any,
    byRoom: boolean,
    selectedHour: string,
    selectedMin: string,
}
const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];

const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday',];

class SearchResult extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            classInfo: [],
            searchInfo: [],
            userSchoolName: '',
            byRoom: false,
            selectedHour: '',
            selectedMin: '',

        }
    }

    componentDidMount() {
        const classArr: any = [];
        const url = this.props.history.location.pathname.split('/')
        console.log(url);

        const monthIndex = monthArr.indexOf(url[3]);
        console.log(monthIndex);
        let semester = '';
        if (monthIndex < 4) {
            semester = 'Winter ' + url[5];
        } else if (monthIndex >= 4 && monthIndex <= 7) {
            semester = 'Summer ' + url[5];
        } else {
            semester = 'Fall ' + url[5];
        }
        const selectedDay = new Date(url[5], monthIndex, url[4]);
        const setDay = selectedDay.getDay();
        if (url.length === 8) {
            console.log(semester);
            firebase.firestore().collection(url[2]).where('term', '==', semester).get().then((result) => {
                _.each(result.docs, (data) => {
                    const classData = data.data();
                    // classArr.push(classData)
                    console.log(classData);
                    if (classData.day === daysArr[setDay]) {
                        classArr.push(classData)
                    }
                })
                const sortedArr = _.orderBy(classArr, ['startHour'], ['desc']);
                this.setState({ classInfo: sortedArr, selectedHour: url[6], selectedMin: url[7] });
            }).catch((e) => {
                console.log(e);
            });
        } else if (url.length === 7) {
            firebase.firestore().collection(url[2]).where('room', '==', url[6].toUpperCase())
                .get().then((result) => {
                    _.each(result.docs, (data) => {
                        const classData = data.data();
                        // classArr.push(classData)
                        if (classData.day === daysArr[setDay]) {
                            classArr.push(classData)
                        }
                    })
                    const sortedArr = _.orderBy(classArr, ['startHour'], ['asc']);
                    this.setState({ classInfo: sortedArr, byRoom: true });
                }).catch((e) => {
                    console.log(e);
                });
        }


        this.setState({ searchInfo: url });
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
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

    private renderResult = () => {
        const classInfo: any = [];
        // const current = new Date();
        const currentHour = this.state.selectedHour;
        const currentMin = this.state.selectedMin;
        // const currentHour = 13;
        console.log(parseInt(currentHour) + 3)
        if (this.state.byRoom) {
            if (_.size(this.state.classInfo) === 0) {
                classInfo.push(
                    <div key={'noClass'} style={{
                        border: '1px solid black', width: '70%',
                        margin: 'auto', marginBottom: 20, padding: 10, borderRadius: 10
                    }}>
                        <Form.Label>Class room does not exist or there is no class</Form.Label>
                    </div>
                )
            } else {
                _.each(this.state.classInfo, (data) => {
                    classInfo.push(
                        <div key={data.classCode} style={{
                            border: '1px solid black', width: '70%',
                            margin: 'auto', marginBottom: 20, padding: 10, borderRadius: 10
                        }}>
                            <Form.Label>{data.room}</Form.Label><br></br>
                            {'Class time :' + data.startHour + ':' + data.startMin + ' ~ ' +
                                data.endHour + ':' + data.endMin + ', ' + data.subject + ', ' + data.title}
                        </div>
                    )
                })
            }
        } else {
            if (_.size(this.state.classInfo) === 0) {
                classInfo.push(
                    <div key={'noClass'} style={{
                        border: '1px solid black', width: '70%',
                        margin: 'auto', marginBottom: 20, padding: 10, borderRadius: 10
                    }}>
                        <Form.Label>Every classroom is free to study</Form.Label>
                    </div>
                )
            } else {
                _.each(this.state.classInfo, (data) => {
                    if (parseInt(data.startHour) <= parseInt(currentHour) &&
                        parseInt(data.endHour) >= parseInt(currentHour)) {
                        classInfo.push(
                            <div key={data.classCode} style={{
                                border: '2px solid #007bff', width: '70%',
                                margin: 'auto', marginBottom: 20, padding: 10, borderRadius: 10
                            }}>
                                <Form.Label>Class Info</Form.Label><br></br>
                                {data.room + ' : ' + data.subject + ', ' + data.title + ' Ends at ' +
                                    data.endHour + ':' + data.endMin + ' '}
                            </div>
                        );
                    } else if (parseInt(currentHour) + 3 >= parseInt(data.startHour) &&
                        parseInt(currentHour) <= parseInt(data.startHour)) {
                        classInfo.push(
                            <div key={data.classCode} style={{
                                border: '1px solid black', width: '70%',
                                margin: 'auto', marginBottom: 20, padding: 10, borderRadius: 10
                            }}>
                                <Form.Label>Class Info</Form.Label><br></br>
                                {data.room + ' : ' + data.subject + ', ' + data.title + ' Starts at ' +
                                    data.startHour + ':' + data.startMin + ' '}
                            </div>
                        );
                    }
                })
            }
        }
        return classInfo
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar bg="light" expand='sm' style={{ width: '80%', margin: 'auto', }}>
                        <Navbar.Brand href="/studentMain">Empty Room Finder</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <NavDropdown.Item href="/studentMain">
                                    Return to Search</NavDropdown.Item>
                            </Nav>
                            <h6 id='signOutBtn' style={{
                                border: '1px solid', width: 110, height: 40,
                                lineHeight: '35px', marginTop: 10, cursor: 'pointer', borderRadius: 5, textAlign: 'center'
                            }} onClick={() => this.signOut()}>Sign out</h6>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div style={{ width: '80%', margin: 'auto', marginTop: 20 }}>
                    {this.renderResult()}
                </div>
            </div>
        );
    }
}
export default SearchResult;