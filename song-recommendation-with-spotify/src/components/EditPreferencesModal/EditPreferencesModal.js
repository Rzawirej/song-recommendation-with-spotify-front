import React from "react";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
}));


export default withRouter(function EditPreferencesModal(props) {
    const classes = useStyles();
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleSubmit = async () => {
        let token = localStorage.getItem('token');
        //tutaj do puta rzuć te preferencje, które pozyskasz z selectów
        let res = await axios.put('/user/current', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        handleClose();
    }
    

    const handleClose = () => {
        props.setOpen();
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
                    <Typography variant="h5" className = {classes.title}>PREFERENCJE MUZYCZNE </Typography>
                        <Typography color="textPrimary">
                            Utwory w playliście Wydarzenia są dobierane na podstawie wskazanych preferencji muzycznych oraz playlist importowanych ze <span style={{color: COLOR.spotifyGreen}}>Spotify</span>. Preferencje Muzyczne określane są z pomocą czterech różnych wybranych gatunków muzycznych.
                        </Typography>
                        <Grid container justify="center" direction="column" align="center">
                            <Grid item >
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value='gatunek 1'
                                    variant="outlined"
                                    style = {{color: 'white'}}
                                    >
                                        <MenuItem key={'gatunek 1'} value={'gatunek 1'}>
                                            gatunek 1
                                        </MenuItem>
                                        <MenuItem key={'gatunek 2'} value={'gatunek 2'}>
                                            gatunek 2
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value='gatunek 2'
                                    variant="outlined"
                                    >
                                        <MenuItem key={'gatunek 2'} value={'gatunek 2'}>
                                            gatunek 2
                                        </MenuItem>
                                        <MenuItem key={'gatunek 3'} value={'gatunek 3'}>
                                            gatunek 3
                                        </MenuItem>
                                    ))}
                            </TextField>
                            </Grid>
                            <Grid item>
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value='gatunek 3'
                                    variant="outlined"
                                    >
                                        <MenuItem key={'gatunek 3'} value={'gatunek 3'}>
                                            gatunek 3
                                        </MenuItem>
                                        <MenuItem key={'gatunek 4'} value={'gatunek 4'}>
                                            gatunek 4
                                        </MenuItem>
                                    ))}
                            </TextField>
                            </Grid>
                            <Grid item>
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value='gatunek 4'
                                    variant="outlined"
                                    >
                                        <MenuItem key={'gatunek 4'} value={'gatunek 4'}>
                                            gatunek 4
                                        </MenuItem>
                                        <MenuItem key={'gatunek 5'} value={'gatunek 5'}>
                                            gatunek 5
                                        </MenuItem>
                                    ))}
                            </TextField>
                            </Grid>
                        </Grid>
                    <div style={{textAlign: 'center'}}>
                    <Button
                        inputProps={{ className: classes.fieldInput }}
                        className={classes.button}
                        variant="outlined"
                        onClick={handleSubmit}
                        >
                        Zapisz zmiany
                
                    </Button>
                                            
                    </div>
                </div>
            </Modal>
        </div>
    );
})