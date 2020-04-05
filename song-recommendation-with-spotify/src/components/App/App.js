import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './../TopBar/TopBar';
import SideMenu from './../SideMenu/SideMenu'
import PlaylistView from './../PlaylistView/PlaylistView'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

export default function App() {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
            <TopBar/>
            <SideMenu/>
            <PlaylistView/>
        </div>
    );
}

