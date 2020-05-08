import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';
import EventsView from '../components/EventsView/EventsView';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function Event(){

        const classes = useStyles();
        return(
            <div className={classes.root}>
                <TopBar/>
                <SideMenu/>
                <EventsView/>
            </div>
        )

}

export default Event;
