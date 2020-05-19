import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import axios from 'axios'
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
    const [user, setUser] = React.useState({
        username: ''
    })
    const logOut = (event) => {
       localStorage.removeItem('token')
    }
    React.useEffect(() => {
        async function getUser(){
            let spotifyToken = (window.location.href + '').split("&spotify_access_token=");
            let token = spotifyToken[0].split("access_token=")[1];
            spotifyToken = spotifyToken[1]
            if (spotifyToken) {
                localStorage.setItem('token', token);
                localStorage.setItem('spotifyToken', spotifyToken);
            }
         token = localStorage.getItem('token');
        console.log(token)
        await axios.get('/user/current', {headers:{
            'Authorization': `Bearer ${token}`
        }
        }).then(({data}) => {
            console.log(data);
            setUser(data.user);
        })
        }
        getUser();
    }, []);
    return(
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    {!user.username ?<>
                    <Link href="#" onClick={preventDefault} color="inherit" className={classes.rightDivider}>
                        ENGLISH VERSION
                     </Link>
                     <Link href="/register" color="inherit" className={classes.toolbarItem}>
                        Zarejestruj się
                     </Link>
                     <Link href="/login" color="inherit" className={classes.toolbarItem}>
                        Zaloguj się
                     </Link></>
                     :<>
                     <Link href = "#" onClick = {preventDefault} color = "inherit" className = {classes.rightDivider}>
                        {user.username}
                     </Link>
                     <Link href="/login" onClick={logOut} color="inherit" className={classes.toolbarItem}>
                        Wyloguj się
                    </Link></>}
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </>
    )
}

