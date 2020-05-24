import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar/TopBar';
import InviteView from '../components/InviteView/InviteView';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function Invite(){

        const classes = useStyles();
        return(
            <div className={classes.root}>
                <TopBar/>
                <InviteView/>
            </div>
        )

}

export default Invite;