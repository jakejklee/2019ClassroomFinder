import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import firebase from '../firebase/firebase';

interface Props {
    history: any,
}
interface State {
    emailAddress: string,
    password: string,
}

class Login extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            emailAddress: '',
            password: '',
            
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.firestore().collection('users').doc(user.uid).onSnapshot((info) => {
                    // this.setState({ userInfo: info.data() })
                    const userInfo = info.data();
                    if (userInfo){
                        if(userInfo.isManager){
                            this.props.history.push('/managerMain');
                        }else{
                            this.props.history.push('/studentMain');
                        }
                    }
                });
            }

        });
    }

    private userSignin = (email: any, password: any) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.log(result);
            if (result.user) {
                firebase.firestore().collection('users').doc(result.user.uid).onSnapshot((info) => {
                    const userInfo = info.data();
                    if (userInfo){
                        if(userInfo.isManager){
                            this.props.history.push('/managerMain');
                        }else{
                            this.props.history.push('/studentMain');
                        }
                    }
                })
            }
        }).catch(function (error: any) {
            console.log(error);
        });
    }

    private handleEmailChange(e: any) {
        this.setState({ emailAddress: e.target.value });
    }
    private handlePWChange(e: any) {
        this.setState({ password: e.target.value });
    }

    render() {
        // this.checkUser();
        return (
            <div id="mainDiv" style={{ width: '100%', textAlign: 'center' }}>
                <br></br><br></br>
                <h1>Login</h1><br></br><br></br>

                <div id='formDiv' style={{
                    margin: 'auto',
                    width: '50%',
                    border: '1px solid',
                    borderRadius: 10,
                    padding: 10.
                }}>
                    <form>
                        <h3 style={{ textAlign: 'left', marginLeft: '5%' }}>Email</h3>
                        <input style={{ width: '90%' }}
                            id="inputEmail"
                            autoComplete="off"
                            // onFocus={() => { this.renderErrorMsg() }}
                            type="email"
                            value={this.state.emailAddress}
                            name="email"
                            placeholder=" example@example.com"
                            required
                            onChange={(e) => { this.handleEmailChange(e) }}
                        /><br></br><br></br>
                        <h3 style={{ textAlign: 'left', marginLeft: '5%' }}>Password</h3>
                        <input style={{ width: '90%' }}
                            id="inputPassword"
                            autoComplete="off"
                            placeholder=" At least 6 characters"
                            type="password"
                            value={this.state.password}
                            name="password"
                            required
                            onChange={(e) => { this.handlePWChange(e) }}
                        />


                        <br></br><br></br>
                        {/* <h6>If you do not have an account,</h6>
                        <h6> click Signup button with email and password you want.</h6> */}
                        <br></br>
                        <Button id="loginBtn" variant='primary' style={{ marginRight: 10 }}
                            onClick={() => this.userSignin(this.state.emailAddress, this.state.password)}>Sign in</Button>
                        {/* >Sign in</Button> */}
                        Or
                        <Button style={{ marginLeft: '10px' }} id="signupBtn" variant='success'
                        // onClick={() => this.userSignup(this.state.emailAddress, this.state.password)}>Signup</Button>
                        ><Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}> Sign up</Link></Button>
                        <br></br><br></br>
                        {/* <h5 style={{ color: 'red' }}>{this.state.errorMsg}</h5> */}
                    </form>
                </div>
                {/* <div id="recaptcha-container"></div> */}

            </div >

        );
    }
}
export default Login;