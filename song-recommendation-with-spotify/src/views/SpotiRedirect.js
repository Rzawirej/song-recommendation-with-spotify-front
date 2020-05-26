import React from "react";
import axios from 'axios';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    withRouter
} from 'react-router-dom'
import { getToken, setToken} from '../utils/UserFunctions'



function SpotiRedirect(props) {


    React.useEffect(() => {
        async function getUser(){
            let spotifyToken = (window.location.href + '').split("&spotify_access_token=");
            let token = spotifyToken[0].split("access_token=")[1];
            spotifyToken = spotifyToken[1]
            if (spotifyToken) {
                setToken(token, 55);
                localStorage.setItem('spotifyToken', spotifyToken);
                props.history.push('/event');
            }else{
                props.history.push('/login');
            }
        }
        getUser();
    }, []);

    return ( <div>
        OK
    </div>
        
    )
}


export default withRouter(SpotiRedirect);