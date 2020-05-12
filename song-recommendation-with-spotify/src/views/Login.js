import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field'
import _Button from '../components/Register/_Button'
import axios from 'axios'
import Link from '@material-ui/core/Link'
import TopBar from '../components/TopBar/TopBar';
import { login } from '../utils/UserFunctions'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 208,
        height: 40,
        left: 796,
        top: 610
    },
}));

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.loginAction = this.loginAction.bind(this);
    }

    loginAction(e) {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res.access_token) {
                this.props.history.push(`/event`)
        }
        })
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        })
    }
    
    render() {
        const classes = this.props.classes
        
        return(
            <div className="App">
                <TopBar/>
                <Grid container alignItems="center" direction="column" spacing="2">
                    <Grid item>
                        <Link href="https://song-recommendation.herokuapp.com/api/login/spotify" style={{ textDecoration: 'none' }}>
                            <_Button useClassGreen={true} label='ZALOGUJ SIĘ PRZEZ SPOTIFY' />
                        </Link>
                    </Grid>
                    <Grid item>
                        <_Field label="E-mail lub nazwa użytkownika" type="" onChange={this.handleEmailChange}/>
                    </Grid>
                    <Grid item>
                        <_Field label="Hasło" type="password" onChange={this.handlePasswordChange}/>
                    </Grid>
                    <Grid item>
                    <Link to="/event">
                        <span onClick={this.loginAction}>
                            <_Button useClassGreen={false} label='ZALOGUJ SIĘ'/>
                        </span>
                    </Link>
                    </Grid>
                    <Grid item>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'NunitoSans'
                        }}>
                            Nie masz jeszcze konta? {" "}
                        </div>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FF0080',
                            fontFamily: 'NunitoSans',
                            fontWeight: 'Bold'
                        }}> 
                        <Link href="/register">
                            Zarejestruj się.
                        </Link>
                        </div>     
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(Login);