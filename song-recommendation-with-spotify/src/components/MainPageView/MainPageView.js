import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import background from '../../assets/background.png';
import button from '../../assets/button_desktop2.png'
import { Typography } from '@material-ui/core';
import COLOR from '../../assets/colors'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    button:{
        cursor: "pointer",
        height: '50%',
        marginTop: '40px', 
    }
}));

export default withRouter(function MainPageView(props) {
    const classes = useStyles();
    const goNext = () =>{
        props.history.push('/login')
    }
    return(
        <>
        <div style = {
            {
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                height: '97vh',
                width: '100vw',

                textAlign: 'center'
            }
            
        } >
            <div className={classes.toolbar} />
            <Typography style={{fontWeight: 'bold', marginTop: '50px'}} variant="h2" color="textPrimary">
                Łączymy odmienne światy.
            </Typography>
            <Typography color="textPrimary">
                Wraz z przyjaciółmi stwórz unikalny muzyczny ekosystem z pomocą playlist <span style={{color: COLOR.spotifyGreen}}>Spotify</span>.
            </Typography>

            <img src={button} alt={"dołącz"} className={classes.button} onClick={goNext}/>
                

        </div>
        
        </>)
})