import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';

interface Props {
    history: any,
}
interface State {
}

class StudentMain extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
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

    render() {
        return (
            <div>
                <h6 id='signOutBtn' style={{
                    border: '1px solid', width: 110, height: 40,
                    lineHeight: '35px', marginTop: 10, cursor: 'pointer', borderRadius: 5
                }} onClick={() => this.signOut()}>Sign out</h6>
                <h1>studentMain</h1>
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