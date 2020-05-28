import React from "react";
import axios from 'axios';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    withRouter
} from 'react-router-dom'



function AddRedirect(props) {


    React.useEffect(() => {
         props.history.replace('/event/' +props.match.params.id);  
    }, []);

    return ( <div>
        OK
    </div>
        
    )
}


export default withRouter(AddRedirect);