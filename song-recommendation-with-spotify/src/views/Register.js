import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field'
import _Button from '../components/Register/_Button'
import TopBar from '../components/TopBar/TopBar';
import Link from '@material-ui/core/Link'
import axios from 'axios'
import { register } from '../utils/UserFunctions'

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            username:''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.registerAction = this.registerAction.bind(this);
    }

    
    registerAction(e) {
        e.preventDefault()
    
        const newUser = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password
        }
    
        register(newUser).then(res => {
          this.props.history.push(`/login`)
        })
    } 
    
    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }

    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        })
    }
    
    render() {

        return(
            
            <div className="App">
                <TopBar/>
                <Grid container alignItems="center" direction="column" spacing="2">
                    <Grid item>
                        <Link href="https://song-recommendation.herokuapp.com/api/login/spotify" style={{ textDecoration: 'none' }}>
                            <_Button useClassGreen={true} label='ZAREJESTRUJ SIĘ PRZEZ SPOTIFY' />
                        </Link>
                    </Grid>
                    <Grid item>
                        <_Field label="E-mail" onChange={this.handleEmailChange}/>
                    </Grid>
                    <Grid item>
                        <_Field label="Hasło" type="password" onChange={this.handlePasswordChange}/>
                    </Grid>
                    <Grid item>
                        <_Field label="Nazwa Użytkownika" onChange={this.handleUsernameChange}/>
                    </Grid>
                    <Grid item>
                        <span onClick={this.registerAction}>
                            <_Button useClassGreen={false} label='ZAREJESTRUJ SIĘ'  />
                        </span>            
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Register;