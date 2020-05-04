import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
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
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),      
        color: COLOR.pink,
    },
    title: {

        color: COLOR.white,
    }
}));

export default function CreateEventModal(props) {
    const classes = useStyles();

    

    

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
                    <Typography variant="h5" className = {classes.title}>WYDARZENIE</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={5} align='right'>
                            <Typography color="textSecondary">
                                        Opis wydarzenia 
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography color="textPrimary">
                                        Lorem ipsum
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    
                </div>
            </Modal>
        </div>
    );
}