import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field'
import _Button from '../components/Register/_Button'
import axios from 'axios'
import Link from '@material-ui/core/Link'
import TopBar from '../components/TopBar/TopBar';
import { setToken } from '../utils/UserFunctions'
import background from '../assets/background.png'; // Import using relative path

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            loginErrorMessage: ''
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

        axios.post('/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            if (res.data.access_token) {
                setToken(res.data.access_token, 10080)
                let back;
                if(this.props.history.location.state){
                    back = this.props.history.location.state.from
                }
                this.props.history.push(back||`/event`)
            }
        })
        .catch(err => {
            if(err.response){
                this.setState({
                    loginErrorMessage: "Niepoprawny email lub hasło."
                });
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
    
    saveSpotifyToken(){
    }

    render() {
        const classes = this.props.classes
        
        return(
            <div style = {{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                height: '100vh'
            }}>
                <TopBar/>
                <Grid container alignItems="center" direction="column" spacing="2">
                    <Grid item>
                    </Grid>
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <Link href = "https://joyina.live/api/login/spotify" style = {{ textDecoration: 'none'}}>
                            <_Button useClassGreen={true} label='ZALOGUJ SIĘ PRZEZ SPOTIFY' />
                        </Link>
                    </Grid>
                    <Grid item>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            
                        }}>
                            lub
                        </div>
                    </Grid>
                    <Grid item>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            
                        }}>
                        Zaloguj się przy użyciu swojego adresu e-mail.
                        </div>     
                    </Grid>
                    <Grid item>
                        <_Field label="E-mail" type="" onChange={this.handleEmailChange}/>
                    </Grid>
                    <Grid item>
                        <_Field label="Hasło" type="password" onChange={this.handlePasswordChange}/>
                    </Grid>
                    <Grid item>
                        <p style={{color:"red"}} >{this.state.loginErrorMessage}</p>
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
                            
                        }}>
                            Nie masz jeszcze konta? {" "}
                        </div>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FF0080',
                            
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

export default Login;