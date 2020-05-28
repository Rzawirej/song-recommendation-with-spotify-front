import React from "react";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';

import COLOR from './../../assets/colors'
import {getToken} from '../../utils/UserFunctions'


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


export default function AddPaticipantsModal(props) {
    const classes = useStyles();
    const [username, setUsername] = React.useState('');
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleSubmit = async () => {
        if(username!==''){
            let token = getToken()
            console.log(props.eventId);
            let res = await axios.post('/event/' + props.eventId + '/invite', {
                username: username,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res)
            props.setA(!props.a);
        }
        
        
        handleClose();
    }
    

    const handleClose = () => {
        console.log(props.a);
        props.setA(!props.a);
        console.log(props.a);
        props.setOpen(false);
        if (!props.eventPage) {
            
            props.openEvent(props.eventId, true)
        }
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
                    <Typography variant="h5" className = {classes.title}>ZAPROŚ ZNAJOMYCH </Typography>
                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={3} align='right'>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography color="textPrimary">
                                        Zaproś swoich znajomych. Aby wydarzenie stało się aktywne potrzebujesz minimum 3. użytkowników z kontem <span style={{color: COLOR.spotifyGreen}}>Spotify</span>. Do czasu, aż przynajmniej 2. zaproszonych użytkowników nie odpowie na Twoje zaproszenie, wydarzenie pozostanie nieaktywne. W wydarzeniu może uczestniczyć maksylnie 30 osób. Link udostępniający możesz wysłać do większej ilości osób, ale uczestnictwo otrzyma pierwszych 30.
                            </Typography>
                        </Grid>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Zaproś używając Nazwy Użytkownika 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                InputProps={{ classes: {notchedOutline: classes.notchedOutline},} }
                                placeholder = "Wpisz nazwę"
                                className={classes.field}
                                onChange={handleUsernameChange}
                                value={username}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Skopiuj link do udostępnienia 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                InputProps={{ classes: {notchedOutline: classes.notchedOutline, disabled: classes.field},} }
                                className={classes.field}
                                value={'https://joyina.live/join-event/'+props.invLink}
                                margin="dense"
                                variant="outlined"
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
                        GOTOWE!
                
                    </Button>
                                            
                    </div>
                </div>
            </Modal>
        </div>
    );
}