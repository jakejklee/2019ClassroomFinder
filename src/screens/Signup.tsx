import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
}
interface State {
}

class Signup extends React.Component<Props, State> {
    public state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h1>signup</h1>
                <Link to='/managerMain'>managerMain</Link>
                <Link to='/manageclasses'>manageclasses</Link>
                <Link to='/signup'>signup</Link>
                <Link to='/studentMain'>studentMain</Link>
                <Link to='/'>Login</Link>
            </div>
        );
    }
}
export default Signup;