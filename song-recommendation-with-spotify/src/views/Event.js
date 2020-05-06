import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';
import PlaylistView from '../components/PlaylistView/PlaylistView';
import ParticipantsMenu from '../components/ParticipantsMenu/ParticipantsMenu';
import axios from 'axios'

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
});

class Event extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.root}>
                <TopBar/>
                <SideMenu/>
                <PlaylistView/>
                <ParticipantsMenu/>
            </div>
        )
    }   
}

export default withStyles(useStyles)(Event);