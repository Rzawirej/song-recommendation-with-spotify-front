import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field'
import _Button from '../components/Register/_Button'
  
class Register extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div className="App">
                <Grid container alignItems="center" direction="column" spacing="2">
                    <Grid item>
                        <_Button useClassGreen={true} label='ZAREJESTRUJ SIĘ PRZEZ SPOTIFY'/>
                    </Grid>
                    <Grid item>
                        <_Field label="E-mail"/>
                    </Grid>
                    <Grid item>
                        <_Field label="Hasło"/>
                    </Grid>
                    <Grid item>
                        <_Field label="Nazwa Użytkownika"/>
                    </Grid>
                    <Grid item>
                        <_Button useClassGreen={false} label='ZAREJESTRUJ SIĘ'/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Register;