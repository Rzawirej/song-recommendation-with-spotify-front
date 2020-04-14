import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';
import PlaylistView from '../components/PlaylistView/PlaylistView';
import ParticipantsMenu from '../components/ParticipantsMenu/ParticipantsMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

class Event extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div className="App">
                <TopBar/>
                <SideMenu/>
                <PlaylistView/>
                <ParticipantsMenu/>
            </div>
        )
    }
}

export default Event;
