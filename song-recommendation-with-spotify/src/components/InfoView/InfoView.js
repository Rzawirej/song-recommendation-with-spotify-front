import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import COLOR from '../../assets/colors';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
    },
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(10),
        paddingTop: theme.spacing(5),
        paddingRight: theme.spacing(5),
        background: COLOR.darkBlue,
    },
}));

export default withRouter(function MainPageView(props) {
    const classes = useStyles();

    return(
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" color="textPrimary">
                Informacje o nas
            </Typography>
            <Typography  style={{marginTop: '50px', marginBottom: '50px'}} variant="body1" color="textPrimary">
                W naszej aplikacji <span style={{color: COLOR.pink}}>Joyina</span> korzystamy z katalogów <span style={{color: COLOR.spotifyGreen}}>Spotify</span> liczących miliony utworów, więc łatwo znaleźć odpowiednią oprawę muzyczną na każdą okazję. Nasze algorytmy wygenerują dla was wspólne, unikalne środowisko muzyczne oparte na analizie preferencji każdego z was.
            </Typography>
            <Typography  variant="body1" color="textPrimary">
                Projekt interdyscyplinarny powstał przy współpracy studentów Wydziału Informatyki i Zarządzania Politechniki Wrocławskiej oraz studentek Sztuki Mediów przy wydziale Grafiki i Sztuki Mediów wrocławskiej Akademii Sztuk Pięknych.
            </Typography>
        </div>)
})