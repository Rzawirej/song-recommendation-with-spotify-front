import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field';
import _PField from '../components/Register/_PField';
import _Button from '../components/Register/_Button';
import TopBar from '../components/TopBar/TopBar';
import Link from '@material-ui/core/Link'
import axios from 'axios'
import { register } from '../utils/UserFunctions'
import background from '../assets/background.png';
import EditPreferencesModal from '../components/EditPreferencesModal/EditPreferencesModal';
import {getToken} from '../utils/UserFunctions';
import { setToken } from '../utils/UserFunctions'

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'password',
            username:'',
            passwordRepeat:'passwordRepeat',
            registerErrorMessage: '',
            pref_genres: [],
            openPreferences: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.registerAction = this.registerAction.bind(this);
        this.changePreferences = this.changePreferences.bind(this);
        this.onSubmitPreferences = this.onSubmitPreferences.bind(this);
    }
    
    registerAction(e) {
        e.preventDefault()
        
        if(this.state.password != this.state.passwordRepeat){
            this.setState({registerErrorMessage:'Hasła nie są takie same!'});
        }
        else{
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }

            axios.post('/register', {
                email: newUser.email,
                password: newUser.password,
                username: newUser.username
            }).then(res => {
                this.setState({
                    openPreferences: !this.state.openPreferences
                });
                axios.post('/login', {
                    email: newUser.email,
                    password: newUser.password
                })
                .then(res => {
                    setToken(res.data.access_token, 10080)
                })
            }).catch(err => {
                if (err.response.data.message.email){
                    this.setState({
                        registerErrorMessage:'Niepoprawny email.'});
                }else{
                    const text = JSON.stringify(err.response.data.message);
                    this.setState({
                        registerErrorMessage: text.slice(1,2).toUpperCase() + text.slice(2, text.length)
                    });
                }
            })
        }
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
    
    handleRepeatPasswordChange(event){
        this.setState({
            passwordRepeat: event.target.value
        })
    }

    changePreferences = () => {
        this.setState({
            openPreferences: !this.state.openPreferences
        });
    };

    onSubmitPreferences = () => {
        let token = getToken();
        axios.put('/user/current',
            {
                'pref_genres': this.state.pref_genres
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(({data }) => {
            let back;
            if(this.props.history.location.state){
                back = this.props.history.location.state.from
            }
            this.props.history.push(back||`/event`)
        })
    }


    render() {
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
                        <Link href = "https://joyina.live/api/login/spotify" style = {{textDecoration: 'none'}} >
                            <_Button useClassGreen={true} label='ZAREJESTRUJ SIĘ PRZEZ SPOTIFY' />
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
                        Zarejestruj się przy użyciu swojego adresu e-mail.
                        </div>
                    </Grid>
                    <Grid item>
                        <_Field label="Nazwa Użytkownika" onChange={this.handleUsernameChange}/>
                    </Grid>
                    <Grid item>
                        <_Field label="E-mail" onChange={this.handleEmailChange}/>
                    </Grid>
                    <Grid item>
                        <_PField label="Hasło" onChange={this.handlePasswordChange}/>
                    </Grid>
                    <Grid item>
                        <_PField label="Powtórz hasło" onChange={this.handleRepeatPasswordChange}/>
                    </Grid>
                    <Grid item>
                        <p style={{color:"red"}} >{this.state.registerErrorMessage}</p>
                    </Grid>
                    <Grid item>
                        <span onClick={this.registerAction}>
                            <_Button useClassGreen={false} label='ZAREJESTRUJ SIĘ'  />
                        </span>            
                    </Grid>
                    <Grid item>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            
                        }}>
                            Masz już konto?{" "}
                        </div>
                        <div style={{
                            display: 'inline',
                            alignItems: 'center',
                            color: '#FF0080',
                            fontWeight: 'Bold'
                        }}> 
                        <Link href="/login">
                             Zaloguj się.
                        </Link>
                        </div>     
                    </Grid>
                </Grid>
                <EditPreferencesModal open={this.state.openPreferences}
                 setOpen={this.changePreferences}
                preferences={this.state.pref_genres}
                onSubmitPreferences={this.onSubmitPreferences}
                register={true}/>
            </div>
        )
    }
}

export default Register;