import React from "react";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';

import COLOR from './../../assets/colors';
import {getToken} from '../../utils/UserFunctions';


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
        cursor: 'pointer',
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
    multilineField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,

        borderColor: 'yellow',
        [`& fieldset`]: {
            borderRadius: 20,
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


export default withRouter(function InviteLoggedModal(props) {
    const classes = useStyles();
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');

    const handleSubmit = async () => {
        let token = getToken();
        let spotifyToken = localStorage.getItem('spotifyToken');
        await axios.post(`/event/${props.eventId}/export-playlist?playlist_name=${name?name:'Joyina Playlist'}&description=${description}`,{
            spotify_access_token: spotifyToken,
        },{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        handleClose();
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

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
                    <Typography variant="h5" className = {classes.title}>EKSPORT PLAYLISTY DO <span style={{color: COLOR.spotifyGreen}}>SPOTIFY</span></Typography>
                    <Grid container spacing={2} className={classes.grid}>
                        
                       <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Nazwa playlisty 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                InputProps={{ classes: {notchedOutline: classes.notchedOutline},} }
                                placeholder = "Dodaj czytelną i krótką nazwę"
                                inputProps={{'maxLength': 50}}
                                className={classes.field}
                                onChange={handleNameChange}
                                value={name}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Opis 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                InputProps={{ classes: {notchedOutline: classes.notchedOutline, focused: classes.focused},} }
                                inputProps={{'maxLength': 150}}
                                placeholder = "Dodaj opis..."
                                helperText={`${description.length}/150`}
                                className={classes.multilineField}
                                value={description}
                                onChange={handleDescriptionChange}
                                margin="dense"
                                variant="outlined"
                                multiline
                                rows={4}
                                rowsMax={4}
                                fullWidth
                            />
                        </Grid> 


                    </Grid>
                    <div style={{textAlign: 'center'}}>
                    <Button
                        inputProps={{ className: classes.fieldInput }}
                        className={classes.button}
                        variant="outlined"
                        onClick={handleSubmit}
                        >
                        EKSPORTUJ
                
                    </Button>
                                            
                    </div>
                </div>
            </Modal>
        </div>
    );
})