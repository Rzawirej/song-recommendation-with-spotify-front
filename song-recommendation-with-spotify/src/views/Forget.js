import React from 'react';
import Grid from "@material-ui/core/Grid";
import _Field from '../components/Register/_Field'
import _Button from '../components/Register/_Button'
import axios from 'axios'
import {Link} from "react-router-dom"
import TopBar from '../components/TopBar/TopBar';

class Forget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    forgetAction = async () => {
        const { data } = await axios.post('/forget', {email: this.state.email});
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }
    
    render() {
        return(
            <div className="App">
                <TopBar/>
                    <Grid container alignItems="center" direction="column" spacing="2">
                        <Grid item>
                            <_Field label="email" onChange={this.handleEmailChange}/>
                        </Grid>
                        <Grid item>
                            <Link to="/login">
                                <span onClick={this.forgetAction}>
                                    <_Button useClassGreen={false} label='WYŚLIJ LINK AKTYWACYJNY'/>
                                </span>
                            </Link>
                        </Grid>
                    </Grid>
            </div>
        )
    }
}

export default Forget;