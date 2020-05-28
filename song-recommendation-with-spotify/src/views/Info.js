import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar/TopBar';
import InfoView from '../components/InfoView/InfoView'
import SideMenu from "../components/SideMenu/SideMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function Info(){

        const classes = useStyles();
        return(
            <div className={classes.root}>
                <TopBar/>
                <SideMenu/>
                <InfoView/>

            </div>
        )

}

export default Info;