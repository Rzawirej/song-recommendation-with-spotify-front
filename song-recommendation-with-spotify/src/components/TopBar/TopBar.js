import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import COLOR from './../../assets/colors'
import {getToken, setToken} from '../../utils/UserFunctions'
import logo from '../../assets/logo.png'

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: COLOR.black,
    },
    rightDivider: {
        marginLeft: '60%',
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
    logo: {
        marginLeft: '8%',
        height: '5vh',
    },
    offset: theme.mixins.toolbar,
}));


export default function TopBar() {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
    const [user, setUser] = React.useState({
        username: ''
    })
    const logOut = (event) => {
       localStorage.removeItem('token')
       localStorage.removeItem('spotifyToken')
    }
    React.useEffect(() => {
        async function getUser(){
            let spotifyToken = (window.location.href + '').split("&spotify_access_token=");
            let token = spotifyToken[0].split("access_token=")[1];
            spotifyToken = spotifyToken[1]
            if (spotifyToken) {
                setToken(token, 55);
                localStorage.setItem('spotifyToken', spotifyToken);
            }
         token = getToken();
         if(token){
            await axios.get('/user/current', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(({
                data
            }) => {
                setUser(data.user);
            })
         }
        
        }
        getUser();
    }, []);
    return(
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <img className={classes.logo} src={logo} alt="Logo" />
                    
                        {!user.username ?<>
                        <Typography style = {
                            {
                                display: 'inline'
                            }
                        }
                        className = {
                            classes.rightDivider
                        } >
                        <Link href="#" onClick={preventDefault} color="inherit">
                            ENGLISH VERSION
                        </Link>
                        </Typography>
                        <Typography style = {
                            {
                                display: 'inline'
                            }
                        } className={classes.toolbarItem}>
                        <Link href="/register" color="inherit">
                            Zarejestruj się
                        </Link>
                        </Typography>
                        <Typography style = {
                            {
                                display: 'inline'
                            }
                        } className={classes.toolbarItem}>
                        <Link href="/login" color="inherit">
                            Zaloguj się
                        </Link></Typography></>
                        :<>
                        <Typography style = {
                            {
                                display: 'inline'
                            }
                        }
                        className = {
                            classes.rightDivider
                        } >
                        <Link href="#" onClick={preventDefault} color="inherit">
                            ENGLISH VERSION
                        </Link>
                        </Typography>
                        <Typography style = {
                            {
                                display: 'inline'
                            }
                        }
                        className = {
                            classes.toolbarItem
                        } 
                        color="textSecondary">
                        <Link href = "#" onClick = {preventDefault} color = "inherit">
                            {user.username}
                        </Link>
                        </Typography>
                        <Typography style = {
                            {
                                display: 'inline'
                            }
                        } className={classes.toolbarItem}>
                        <Link href="/login" onClick={logOut} color="inherit" >
                            Wyloguj się
                        </Link></Typography></>}
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </>
    )
}

