import React from "react";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

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
        radioIcon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: COLOR.darkBlue,
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
        },
        'input:disabled ~ &': {
        },
        
    }, 
    radioCheckedIcon: {

        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: `radial-gradient(${COLOR.pink} 35%,transparent 0%)`,

            content: '""',
        },
        'input:hover ~ &': {
        },
    },
    radioLabel: {
        color: COLOR.white
    },
    radioContainer: {
            overflow: 'visible', 
        '&:before': {
            position: 'absolute',
            overflow: 'visible',
            content: "''",
            borderTop: '2px solid white',
            top: '28%', 
            left: '10%', 
            right: '12%', 
        }
    }
}));
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
        disableRipple
        color="default"
        checkedIcon={<span className={`${classes.radioIcon} ${classes.radioCheckedIcon}`} />}
        icon={<span className={classes.radioIcon}/>}
        {...props}
    />
  );
}

export default withRouter(function RefreshPlaylistModal(props) {
    const classes = useStyles();
    const [duration, setDuration] = React.useState('5');
    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    const handleSubmit = async () => {
        let token = localStorage.getItem('token');
        await axios.put('/event/'+props.eventId,{duration_time: duration},{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let res = await axios.get('/event/'+props.eventId+'/create-playlist',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res.data)
        handleClose();
    }
    React.useEffect(() => {
        async function getEventInfo() {
            setDuration(props.eventDuration + '');
        }
        getEventInfo();
    }, [props]);

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
                    <Typography variant="h5" className = {classes.title}>ODŚWIEŻ PLAYLISTĘ </Typography>
                    <Grid container spacing={2} className={classes.grid}>
                        
                        <Grid item xs={3} align='right'>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography color="textPrimary">
                                {'Czy chcesz odświeżyć playlistę? Odświeżając playlistę powodujesz, ze zostanie ona ponownie skomponowana na podstawie playlist aktualnych Uczestników. Możesz pozostać przy wcześniej wybranym czasie trwania (co przekłada się na liczbę singli w playliście) lub wybrać nowe ustawnia.'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Czas trwania
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl component="fieldset">
                            <RadioGroup row value={duration} aria-label="czas trwania" name="customized-radios" onChange={handleDurationChange}>
                                <div className={classes.radioContainer}>
                                <FormControlLabel classes={{label: classes.radioLabel}} value="5" control={<StyledRadio />} label="5 godzin" labelPlacement="bottom"/>
                                
                                <FormControlLabel classes={{label: classes.radioLabel}} value="10" control={<StyledRadio />} label="10 godzin" labelPlacement="bottom"/>
                                
                                <FormControlLabel classes={{label: classes.radioLabel}} value="15" control={<StyledRadio />} label="15 godzin" labelPlacement="bottom"/>
                                
                                <FormControlLabel classes={{label: classes.radioLabel}} value="24" control={<StyledRadio />} label="24 godzin" labelPlacement="bottom"/>
                                </div>
                            </RadioGroup>
                            </FormControl>
                        </Grid>


                    </Grid>
                    <div style={{textAlign: 'center'}}>
                    <Button
                        inputProps={{ className: classes.fieldInput }}
                        className={classes.button}
                        variant="outlined"
                        onClick={handleSubmit}
                        >
                        ODŚWIEŻ PLAYLISTĘ
                
                    </Button>
                                            
                    </div>
                </div>
            </Modal>
        </div>
    );
})