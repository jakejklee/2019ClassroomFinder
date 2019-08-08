import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';
import { Button, Row, Col, Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import _ from 'lodash';

interface Props {
    history: any,
}
interface State {
    userID: string,
    userSchoolName: string,
    schoolCode: string,
    classInfo: any,
    byTime: boolean,
    byRoom: boolean,
    setDay: string,
    setMonth: string,
    setYear: string,
    setHour: string,
    setMin: string,
    setDate: string,
    roomNum: any,

}

const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];

const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday', 'Sunday',];

class StudentMain extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            userID: '',
            userSchoolName: '',
            schoolCode: '',
            classInfo: {},
            byTime: true,
            byRoom: false,
            setDay: '',
            setMonth: '',
            setYear: '',
            setHour: '',
            setMin: '',
            setDate: '',
            roomNum: '',
        }
    }

    componentDidMount = () => {
        const current = new Date();
        const hour = current.getHours();
        const mins = current.getMinutes();
        const days = current.getDay();
        const year = current.getFullYear();
        const month = current.getMonth();
        const date = current.getDate();
        const minArr = mins.toString().split('');
        if (_.size(minArr) < 2) {
            minArr.unshift('0');
        }

        console.log(year + ',' + month + ',' + date);

        this.setState({
            setHour: parseInt(minArr[1]) >= 5 ? minArr[0] !== '5' ?
                hour.toString() : (hour + 1).toString() : hour.toString(), setYear: year.toString(),
            setDay: daysArr[days - 1], setMonth: monthArr[month], setDate: date.toString(),
            setMin: parseInt(minArr[1]) >= 5 ? minArr[0] !== '5' ? (parseInt(minArr[0]) + 1).toString() + '0' : '00'
                : minArr[0] + '0'
        });
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
                        // const classArr: any = [];
                        // firebase.firestore().collection(this.state.userSchoolName).onSnapshot((result) => {
                        //     _.each(result.docs, (data) => {
                        //         classArr.push(data.data());
                        //     })
                        // });
                        // this.setState({ classInfo: classArr });
                    }
                });
            } else {
                this.props.history.push('/');
            }
        });
    }

    private handleChange = (e: any) => {
        switch (e.target.name) {
            case 'setDate':
                this.setState({ setDate: e.target.value });
                return;
            case 'setMonth':
                this.setState({ setMonth: e.target.value });
                return;
            case 'setYear':
                this.setState({ setYear: e.target.value });
                return;
            case 'setHour':
                this.setState({ setHour: e.target.value });
                return;
            case 'setMin':
                this.setState({ setMin: e.target.value });
                return;
            case 'setRoom':
                this.setState({ roomNum: e.target.value });
                return;

        }
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

    private renderNow = () => {
        const now = new Date();
        console.log('day' + now.getDate());
        console.log('year' + now.getFullYear());
        console.log('mon' + now.getMonth());
        console.log('hour' + now.getHours());
        console.log('min' + now.getMinutes());
    }

    render() {
        // console.log(monthArr[month] + '/' + date + '/' + year + '/' + hour + '/' + mins + '/' + daysArr[days - 1]);
        return (
            <div>
                <div style={{ width: '100%', background: '#f8f9fa' }}>
                    <Navbar bg="light" expand='sm' style={{ width: '80%', margin: 'auto', }}>
                        <Navbar.Brand href="/studentMain">Empty Room Finder</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {/* <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link> */}
                                {/* <NavDropdown title="Search Option" id="basic-nav-dropdown"> */}
                                <NavDropdown.Item style={{
                                    background: this.state.byTime ? '#007bff' : '#ffffff00',
                                    color: this.state.byTime ? 'white' : 'black', borderRadius: 5
                                }}
                                    onSelect={() => { this.setState({ byTime: true }); this.setState({ byRoom: false }) }}>
                                    By Time</NavDropdown.Item>
                                <NavDropdown.Item style={{ borderRadius: 5 }}
                                    onSelect={() => { this.setState({ byTime: false }); this.setState({ byRoom: true }) }}>
                                    By Room</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                                {/* <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                {/* </NavDropdown> */}
                            </Nav>
                            <h6 id='signOutBtn' style={{
                                border: '1px solid', width: 110, height: 40,
                                lineHeight: '35px', marginTop: 10, cursor: 'pointer', borderRadius: 5, textAlign: 'center'
                            }} onClick={() => this.signOut()}>Sign out</h6>
                        </Navbar.Collapse>
                    </Navbar>
                </div>

                <div style={{ width: '80%', margin: 'auto', marginTop: 20 }}>
                    <Form>
                        {this.state.byTime ?
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label >Time (Default is now)</Form.Label>
                                <Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} md='auto' controlId="formGridCity">
                                            <Form.Control as="select" name='setMonth' value={this.state.setMonth}
                                                onChange={(e: any) => { this.handleChange(e) }}>
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

                                        <Form.Group as={Col} md='auto' controlId="formGridState">
                                            <Form.Control as="select" name='setDate' value={this.state.setDate}
                                                onChange={(e: any) => { this.handleChange(e) }}>
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

                                        <Form.Group as={Col} md='auto' controlId="formGridZip">
                                            <Form.Control as="select" name='setYear' value={this.state.setYear}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option>2019</option>
                                                <option>2020</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    {
                                        window.innerWidth < 800 ?
                                            < Form.Label > Hour</Form.Label> : null
                                    }
                                    <Form.Row>
                                        <Form.Group as={Col} md='auto' controlId="formGridCity">
                                            <Form.Control as="select" name='setHour' value={this.state.setHour}
                                                onChange={(e: any) => { this.handleChange(e) }}>
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
                                            {window.innerWidth < 800 ? 'Minutes' : ':'}
                                        </Form.Label>
                                        <Form.Group as={Col} md='auto' controlId="formGridState">
                                            <Form.Control as="select" name='setMin' value={this.state.setMin}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option>00</option>
                                                <option>10</option>
                                                <option>20</option>
                                                <option>30</option>
                                                <option>40</option>
                                                <option>50</option>
                                                {console.log(this.state.setMin)}
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                </Form.Group>
                                <Link to={'/SearchResult/' + this.state.userSchoolName + '/' + this.state.setMonth + '/' +
                                    this.state.setDate + '/' + this.state.setYear + '/' + this.state.setHour + '/' + this.state.setMin}
                                    style={{ textDecoration: 'none', color: 'white' }}>
                                    {this.state.userSchoolName ?
                                        <Button variant="primary" onClick={() => { console.log(this.state.setMin) }}>
                                            Submit
                                    </Button>
                                        :
                                        <Button variant="primary" disabled>
                                            Submit
                                    </Button>
                                    }
                                </Link>
                            </Form.Group>
                            :
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Row>

                                    {/* <Form.Label style={{ float: 'left' }}>Search a class room schedule</Form.Label> */}
                                    <Form.Label style={{}}>Search a class room schedule</Form.Label>
                                </Row>
                                <Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} md='auto' controlId="formGridCity">
                                            <Form.Control as="select" name='setMonth' value={this.state.setMonth}
                                                onChange={(e: any) => { this.handleChange(e) }}>
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

                                        <Form.Group as={Col} md='auto' controlId="formGridState">
                                            <Form.Control as="select" name='setDate' value={this.state.setDate}
                                                onChange={(e: any) => { this.handleChange(e) }}>
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

                                        <Form.Group as={Col} md='auto' controlId="formGridZip">
                                            <Form.Control as="select" name='setYear' value={this.state.setYear}
                                                onChange={(e: any) => { this.handleChange(e) }}>
                                                <option>2019</option>
                                                <option>2020</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                </Form.Group>
                                {
                                    window.innerWidth < 800 ?
                                        <Form.Control type="text" placeholder="Enter Room Number" name='setRoom'
                                            onChange={(e: any) => { this.handleChange(e) }}
                                            style={{ width: '100%', float: 'left', marginBottom: 10 }} />
                                        :
                                        <Form.Control type="text" placeholder="Enter Room Number" name='setRoom'
                                            onChange={(e: any) => { this.handleChange(e) }}
                                            style={{ width: '40%', float: 'left', margin: '0 10px' }} />
                                }


                                {this.state.roomNum ?
                                    <Link to={'/SearchResult/' + this.state.userSchoolName + '/' + this.state.setMonth + '/' +
                                        this.state.setDate + '/' + this.state.setYear + '/' + this.state.roomNum
                                    }
                                        style={{ textDecoration: 'none', color: 'white' }}>
                                        <Button variant="primary" onClick={() => { console.log(this.state.roomNum) }}>
                                            Submit
                                        </Button>
                                    </Link>
                                    :
                                    <Button variant="primary" disabled>
                                        Submit
                                </Button>}

                            </Form.Group>
                        }
                    </Form>
                </div>
            </div>
        );
    }
}
export default StudentMain;