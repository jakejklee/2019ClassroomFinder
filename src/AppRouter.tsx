import React from 'react';
import Login from './screens/Login';
import ManageClasses from './screens/ManageClasses';
import ManagerMain from './screens/ManagerMain';
import Signup from './screens/Signup';
import StudentMain from './screens/StudentMain';
import SearchResult from './screens/SearchResult';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

interface Props {
}

class AppRouter extends React.Component<Props> {

    render() {
        return (
            <Router>
                <div style={{ height: "100vh", overflow: 'auto' }}>
                    <Route exact path="/" component={Login} />
                    <Route path="/manageclasses" component={ManageClasses} />
                    <Route path="/managerMain" component={ManagerMain} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/studentMain" component={StudentMain} />
                    <Route path="/SearchResult" component={SearchResult} />
                    {/* <Route path="/manageclasses" component={ManageClasses} /> */}
                </div>
            </Router>
        )
    }
}

export default AppRouter;
