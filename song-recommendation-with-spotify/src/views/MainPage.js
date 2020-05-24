import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar/TopBar';
import MainPageView from '../components/MainPageView/MainPageView'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function MainPage(){

        const classes = useStyles();
        return(
            <div className={classes.root}>
                <TopBar/>
                <MainPageView/>

            </div>
        )

}

export default MainPage;