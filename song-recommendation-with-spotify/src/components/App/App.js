import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "../../views/Register";
import Login from "../../views/Login";
import Event from "../../views/Event";
import Events from "../../views/Events";
import './App.css';
import axios from 'axios';


export default class App extends React.Component {
    async componentDidMount (){
        axios.defaults.baseURL = 'https://song-recommendation.herokuapp.com/api';
        
        //const token = localStorage.getItem('token');
        //if (token) {
        //    axios.defaults.headers.common['x-auth-token'] = token;
        //    await this.props.getCurrentUser();
        //    this.props.history.push('/');
        //}
    }
    requireAuth(nextState, replace){
        console.log("typ musi byc zalogowany")
    }
    render(){
        return (
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/login" />
                </Route>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/event/:id" component={Event}/>
                <Route path="/event" component={Events} onEnter={this.requireAuth}/>
                
                
            </Switch>
        </Router>
        );
    }
}

