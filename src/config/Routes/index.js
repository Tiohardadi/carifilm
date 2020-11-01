import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home,MovieDetail } from '../../pages';
import {Header, Footer} from '../../components';

function Routes(props) {
    return (
        <Router>
            <div className="d-flex flex-column" style={{height:'100vh'}}>
                <Header/>
                <div className="flex-grow-1 text-white" style={{backgroundColor :'#121212'}} >
                <Switch>
                    <Route path="/moviedetail/:id">
                        <MovieDetail/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default Routes;