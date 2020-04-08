import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link'
import COLOR from './../../assets/colors'
const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: COLOR.black,
    },
    rightDivider: {

        marginLeft: '70%',
        borderRight: '0.01em solid '+COLOR.white,
        padding: theme.spacing(1),    
        textDecoration: "none",
    },
    toolbarItem: {
        textDecoration: "none",
        padding: theme.spacing(1)
    },
    toolbar: {
        fontSize: '14px',
    },
    offset: theme.mixins.toolbar,
}));


export default function TopBar() {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
    return(
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Link href="#" onClick={preventDefault} color="inherit" className={classes.rightDivider}>
                        ENGLISH VERSION
                     </Link>
                     <Link href="#" onClick={preventDefault} color="inherit" className={classes.toolbarItem}>
                        Zarejestruj się
                     </Link>
                     <Link href="#" onClick={preventDefault} color="inherit" className={classes.toolbarItem}>
                        Zaloguj się
                     </Link>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </>
    )
}






