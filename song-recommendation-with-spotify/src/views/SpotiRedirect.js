import React from "react";
import {
    withRouter
} from 'react-router-dom'
import { setToken} from '../utils/UserFunctions'



function SpotiRedirect(props) {


    React.useEffect(() => {
        async function getUser(){
            let spotifyToken = (window.location.href + '').split("&spotify_access_token=");
            let token = spotifyToken[0].split("access_token=")[1];
            spotifyToken = spotifyToken[1]
            if (spotifyToken) {
                setToken(token, 55);
                localStorage.setItem('spotifyToken', spotifyToken);
                props.history.replace('/event');
            }else{
                props.history.replace('/login');
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