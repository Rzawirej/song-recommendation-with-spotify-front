import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "../../views/Register";
import Login from "../../views/Login";
import Event from "../../views/Event";
import Events from "../../views/Events";
import Settings from "../../views/Settings";
import NotFound from "../../views/NotFound";
import Invite from "../../views/Invite";
import MainPage from "../../views/MainPage";
import SpotiRedirect from "../../views/SpotiRedirect";
import {getToken} from "../../utils/UserFunctions"
import './App.css';
import axios from 'axios';

const LoggedRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={(props) => {
            if (!getToken()) {
            // not logged in so redirect to login page with the return url

            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        // authorised so return component
        return <Component {...props} />
        
    }}
     />
)
const NotLoggedRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={(props) => {
            if (getToken()) {
            // logged in so redirect to event page with the return url

            return <Redirect to={{ pathname: '/event'}} />
        }
        return <Component {...props} />
        
    }}
     />
)

export default class App extends React.Component {

    async componentDidMount (){
        //axios.defaults.baseURL = 'http://156.17.130.143/api';
        //axios.defaults.baseURL = 'https://song-recommendation.herokuapp.com/api';
        axios.defaults.baseURL = 'https://joyina.live/api';
        
    }

    render(){
        return (
        <Router basename={process.env.REACT_APP_BASENAME || ""}>            
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/login/spotify" component={SpotiRedirect}/>
                <NotLoggedRoute path="/login" component={Login}/>
                <NotLoggedRoute path="/register" component={Register}/>
                <LoggedRoute path="/settings" component={Settings}/>
                <LoggedRoute path="/event/:id" component={Event}/>
                <LoggedRoute path="/event" component={Events}/>
                <Route path="/join-event/:link" component={Invite}/> 
                <Route path="*" component={NotFound}/>
                
            </Switch>
        </Router>
        );
    }
}

