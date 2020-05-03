import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import image from '../../assets/panda.jpg'
import COLOR from './../../assets/colors'


const useStyles = makeStyles((theme) => ({
    content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            background: COLOR.darkBlue,
        },
    title: {
        marginLeft: theme.spacing(25),
        marginBottom: theme.spacing(10)
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(10),
        height: theme.spacing(10),
        width: theme.spacing(10)
    },
    fabIcon: {
        height: theme.spacing(8),
        width: theme.spacing(8)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    eventPhoto: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(3),
        height: theme.spacing(20),
        width: theme.spacing(20),
        
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },  
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export default function PlaylistView() {
    const classes = useStyles();

    const [events, setEvents] = React.useState([{
        name: '',
        participants: []
    }]);
    React.useEffect(() => {
        async function getEventInfo(){
        let token = localStorage.getItem('token');
        console.log(token)
        await axios.get('/events', {headers:{
            'Authorization': `Bearer ${token}`
        }
        }).then(({data}) => {
            console.log(data.events);
            setEvents(data.events);
        })
        
        
        }
        getEventInfo();
    }, []);

    return(
            <main className={classes.content}>
                
                <div className={classes.toolbar} />
                <Typography className={`${classes.title} ${classes.list}`} variant="h3" color="textPrimary">
                           Wydarzenia
                </Typography>
                {
                    events.map((event, index) => (
                    <Box className={classes.flexRow}>
                        <Avatar alt="Remy Sharp" variant = "circle" src={image} className={classes.eventPhoto} />
                        
                    
                        <Box >
                            <Typography variant="h5" color="textPrimary">
                            {event.name}
                            </Typography>
                            <Typography color="textSecondary">
                                Opis wydarzenia <Box component="span" color="text.primary"> Lorem ipsum</Box>
                            </Typography>
                            <Typography color="textSecondary">
                                Liczba uczestników <Box component="span" color="text.primary"> {event.participants.length}/30</Box>
                            </Typography>
                            <Typography color="textSecondary">
                                Administratorzy 
                                <Box component="span" color="text.primary"> 
                                {event.participants.map((participant, index ) => {
                                    if (participant.role === "admin")
                                        return " "+participant.user_id+" |";
                                    return ""
                                })} Lorem ipsum</Box>
                            </Typography>
                            <Typography color="textSecondary">
                                Dostępność <Box component="span" color="text.primary"> od 22-04-2020 do 30-04-2020</Box>
                            </Typography>
                            <Typography color="textSecondary">
                                Czas trwania ≈ ilość utworów muzycznych<Box component="span" color="text.primary"> 5 godzin, 100 utworów</Box>
                            </Typography>
                        </Box>

                        <Box >
                            <Typography color="textSecondary">
                                USUŃ WYDARZENIE <HighlightOffIcon/>
                            </Typography>
                            
                            <Typography color="textPrimary">
                                ZAPROŚ <AddCircleOutlineIcon/>
                            </Typography>
                            <Typography color = "textPrimary" >
                                ODŚWIEŻ PLAYLISTĘ <RefreshOutlinedIcon/>
                            </Typography>
                            <Typography color = "textPrimary" >
                                EDYTUJ WYDARZENIE <SettingsOutlinedIcon/>
                            </Typography>
                        </Box>
                    </Box>
                    ))
                }
                <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none"}}></hr>              
                <Fab label = {'Add'} className = {classes.fab} color = {'primary'}>
                    <AddIcon className = {classes.fabIcon} color = {COLOR.white}/>
                </Fab>    
            </main>
    )
}