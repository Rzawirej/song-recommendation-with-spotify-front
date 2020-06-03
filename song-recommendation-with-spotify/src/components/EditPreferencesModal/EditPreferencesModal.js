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
import {getToken} from '../../utils/UserFunctions';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

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


const genres = [
    {
      value: "classical"
    },
    {
      value: "rock"
    },
    {
      value: "pop"
    },
    {
      value: "edm"
    },
    {
      value: "hip hop"
    },
    {
      value: "art pop"
    },
    {
      value: "electronica"
    },
    {
        value: "blues"
    },
    {
      value: "r&b"
    },
    {
      value: "jazz"
    },
    {
      value: "metal"
    },
    {
        value: "house"
    },
    {
        value: "disco"
    },
    {
        value: "country"
    },
    {
        value: "latin"
    },
    {
        value: "christian music"
    },
    {
        value: "indie rock"
    },
    {
        value: "folk"
    },
    {
        value: "eurodance"
    },
    {
        value: "synthpop"
    }
];


export default withRouter(function EditPreferencesModal(props) {
    const classes = useStyles();
    const [openDelete, setOpenDelete] = React.useState(false);    
    const [gatunek1, setGatunek1] = React.useState("house");
    const [gatunek2, setGatunek2] = React.useState("jazz");
    const [gatunek3, setGatunek3] = React.useState("hip hop");
    const [gatunek4, setGatunek4] = React.useState("electronica");

    const handleSubmit = async () => {
        let token = getToken();
        console.log({'pref_genres': [gatunek1, gatunek2, gatunek3, gatunek4]});
        //tutaj do puta rzuć te preferencje, które pozyskasz z selectów
        let res = await axios.put('/user/current', 
            {
                'pref_genres': [gatunek1, gatunek2, gatunek3, gatunek4]
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        
        if(props.register == true){
            props.history.push(`/event`)
        }else{
            console.log('editpreferencesModal')
            onSubmitPreferences();
        }
        handleClose();
    }
    
    const onSubmitPreferences = () => {
        props.onSubmitPreferences();
    }
    const handleClose = () => {
        props.setOpen();
    };

    const handleChange1 = (event) => {
        setGatunek1(event.target.value);
    };

    const handleChange2 = (event) => {
        setGatunek2(event.target.value);
    };
    
    const handleChange3 = (event) => {
        setGatunek3(event.target.value);
    };

    const handleChange4 = (event) => {
        setGatunek4(event.target.value);
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
                                    value={gatunek1}
                                    onChange={handleChange1}
                                    variant="outlined"
                                    style = {{  
                                        [`& fieldset`]: {
                                          borderRadius: 80,
                                        },
                                        width: 304,
                                        borderColor: 'white'
                                     }}
                                    >
                                        {genres.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                            </MenuItem>
                                        ))}
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value={gatunek2}
                                    onChange={handleChange2}
                                    variant="outlined"
                                    style = {{width: 304}}
                                    >
                                        {genres.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                            </MenuItem>
                                        ))}
                                    ))}
                            </TextField>
                            </Grid>
                            <Grid item>
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value={gatunek3}
                                    onChange={handleChange3}
                                    variant="outlined"
                                    style = {{width: 304, borderColor:'white', borderRadius:20}}
                                    >
                                        {genres.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                            </MenuItem>
                                        ))}
                                    ))}
                            </TextField>
                            </Grid>
                            <Grid item>
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value={gatunek4}
                                    onChange={handleChange4}
                                    variant="outlined"
                                    style = {{width: 304}}
                                    >
                                        {genres.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                            </MenuItem>
                                        ))}
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