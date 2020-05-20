import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "../../views/Register";
import Login from "../../views/Login";
import Event from "../../views/Event";
import Events from "../../views/Events";
import Settings from "../../views/Settings";
import './App.css';
import axios from 'axios';

export const PrivateRoute = ({ component: Component, roles, user, ...rest }) => (
    <Route {...rest} render={(props) => {
        console.log(user);
            if (!user.username) {
            // not logged in so redirect to login page with the return url

            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        // authorised so return component
        return <Component {...props} />
        
    }}
     />
)

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {username: 'a'}
        };
    }
    async componentDidMount (){
        axios.defaults.baseURL = 'http://156.17.130.143/api';
        //axios.defaults.baseURL = 'https://song-recommendation.herokuapp.com/api';
        /*let token = localStorage.getItem('token');
        axios.get('/user/current', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({
            data
        }) => {
            console.log(data);
                this.setState({
                    user: data.user
                });
        }).catch(()=>this.setState({user:{username:''}}))*/
        
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
                <Route path="/settings" component={Settings}/>
                <Route path="/event/:id" component={Event}/>
                <PrivateRoute path="/event" component={Events} onEnter={this.requireAuth} user={this.state.user}/>
                
            </Switch>
        </Router>
        );
    }
}

