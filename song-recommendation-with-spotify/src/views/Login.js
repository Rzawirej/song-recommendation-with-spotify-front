import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field'
import _Button from '../components/Register/_Button'
import axios from 'axios'
import {Link} from "react-router-dom"
  
class Register extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        const loginAction = async () => {
            const { data } = await axios.post('/login', {email: 'gregory@gmail.com', password: 'Gregory'});
            localStorage.setItem('token', data.access_token);
            console.log(this.context)
        }
        return(
            <div className="App">
                <Grid container alignItems="center" direction="column" spacing="2">
                    <Grid item>
                        <_Button useClassGreen={true} label='ZALOGUJ SIĘ PRZEZ SPOTIFY'/>
                    </Grid>
                    <Grid item>
                        <_Field label="E-mail lub nazwa użytkownika"/>
                    </Grid>
                    <Grid item>
                        <_Field label="Hasło"/>
                    </Grid>
                    <Grid item>
                    <Link to="/event">
                        <span onClick={loginAction}>
                            <_Button useClassGreen={false} label='ZALOGUJ SIĘ'/>
                        </span>
                    </Link>
                    
                        
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Register;