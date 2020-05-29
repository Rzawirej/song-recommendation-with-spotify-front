import React from "react";
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