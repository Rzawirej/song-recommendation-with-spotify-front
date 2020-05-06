import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link'
import COLOR from './../../assets/colors'

const useStyles = theme => ({
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
});


class TopBar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const classes = this.props.classes
        console.log(classes)
        //const logOut = (event) => {
        //   event.preventDefault()
        //    localStorage.removeItem('usertoken')
        //}

        return(
            <>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Link href="#" color="inherit" className={classes.rightDivider}>
                            ENGLISH VERSION
                        </Link>
                        <Link href="/register" color="inherit" className={classes.toolbarItem}>
                            Zarejestrtuj się
                        </Link>
                        <Link href="/login" color="inherit" className={classes.toolbarItem}>
                            Zaloguj się
                        </Link>
                        <Link href="/login" color="inherit" className={classes.toolbarItem}>
                            Wyloguj się
                        </Link>
                    </Toolbar>
                </AppBar>
                <div className={classes.offset} />
            </>
        )
    }
}

export default withStyles(useStyles)(TopBar);