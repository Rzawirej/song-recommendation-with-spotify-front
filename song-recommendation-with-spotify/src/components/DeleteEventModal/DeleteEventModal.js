import React from "react";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';



import Button from '@material-ui/core/Button';


import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';

import COLOR from './../../assets/colors'


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'fixed',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        borderRadius: '16px 16px 16px 16px',
        borderStyle: 'solid',
        borderColor: COLOR.white,
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),      
        color: COLOR.pink,
    },
    grid:{
        marginTop: theme.spacing(1)
    },
    title: {
        color: COLOR.white,
    },
    eventPhoto: {
        height: theme.spacing(20),
        width: theme.spacing(20),
    },
    field: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: '30px !important',
        borderColor: 'yellow',
        [`& fieldset`]: {
            borderRadius: 50,
        },
    },
    notchedOutline: {
        borderWidth: "2px",
        borderColor: COLOR.white
    },
    input: {
        borderWidth: "2px",
        borderColor: COLOR.white
    },
    focused:{
        borderColor: COLOR.white
    },
    button: {
        minWidth: 304,
        background: COLOR.pink,
        marginTop: '20px',
        borderRadius: 50,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
}));


export default withRouter(function DeleteEventModal(props) {
    const classes = useStyles();

    const handleSubmit = async () => {
        let token = localStorage.getItem('token');
        await axios.delete('/event/'+props.eventId,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        handleClose();
        props.history.push('/event/');
    }
    

    const handleClose = () => {
        props.setOpen(false);
        
    };

    return (
        <div>
            
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open}
                onClose={handleClose}
            >
                
                <div className = { classes.paper} >
                    <HighlightOffIcon className = {classes.closeButton} onClick={handleClose}/>
                    <Typography variant="h5" className = {classes.title}>USUŃ WYDARZENIE </Typography>
                    <Grid container spacing={2} className={classes.grid}>
                        
                        <Grid item xs={3} align='right'>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography color="textPrimary">
                                Czy chcesz usunąć wydarzenie? Usuwając wydarzenie rezygnujesz z uczestnictwa w nim. Możesz ponownie do niego dołączyć zostając zaproszoną/ym przez inną Użytkowniczkę/ innego Użytkownika aplikacji z funkcją Aministratorki/a. Wydarzenie zostanie trwale usunięte w momencie kiedy każdy uczestnik o funkcji Administratorki/a również je usunie.
                            </Typography>
                        </Grid>
                        


                    </Grid>
                    <div style={{textAlign: 'center'}}>
                    <Button
                        inputProps={{ className: classes.fieldInput }}
                        className={classes.button}
                        variant="outlined"
                        onClick={handleSubmit}
                        >
                        USUŃ
                
                    </Button>
                                            
                    </div>
                </div>
            </Modal>
        </div>
    );
})