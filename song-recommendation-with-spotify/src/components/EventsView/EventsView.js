import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import COLOR from './../../assets/colors'
import CreateEventModal from '.././CreateEventModal/CreateEventModal';
import AddParticipantsModal from '.././AddParticipantsModal/AddParticipantsModal';
import DeleteEventModal from '../DeleteEventModal/DeleteEventModal';
import RefreshPlaylistModal from '../RefreshPlaylistModal/RefreshPlaylistModal';
import {getToken} from '../../utils/UserFunctions'


const useStyles = makeStyles((theme) => ({
    content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            background: COLOR.darkBlue,
        },
    title: {
        marginLeft: theme.spacing(10),
        marginBottom: theme.spacing(10)
    },
    fab: {
        position: 'fixed',
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
        flexDirection: 'row',
        
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },  
    inactive:{
        opacity: 0.1,
    }, button: {
        width: '100%',
        background: COLOR.pink,
        marginTop: '20px',
        marginBottom: '20px',
        borderRadius: 50,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));



export default withRouter(function EventsView(props) {
    const menuItems = [{
        label: <Typography color="textSecondary"> USUŃ WYDARZENIE </Typography>,
        icon: <HighlightOffIcon color='primary'/>
    },{
        label: <Typography color="textPrimary"> ZAPROŚ </Typography>,
        icon: <AddCircleOutlineIcon style={{color: COLOR.white}}/>
    },{
        label: <Typography color="textPrimary"> ODŚWIEŻ PLAYLISTĘ </Typography>,
        icon: <RefreshOutlinedIcon style={{color: COLOR.white}}/>
    },{
        label: <Typography color="textPrimary"> EDYTUJ WYDARZENIE </Typography>,
        icon: <SettingsOutlinedIcon style={{color: COLOR.white}}/>
    },];
    const classes = useStyles();
    const gridLeftColumnInfo = 3;
    const gridRightColumnInfo = 9;

    const getDurationString = (duration) =>{
        console.log(duration)
        if(duration===1){
            return "1 godzina"
        }
        if(duration===2){
            return "2 godziny"
        }
        if(duration === 5) {
            return "5 godzin"
        }
        if(duration === 10) {
            return "10 godzin"
        }
        return ""

    }

    const [events, setEvents] = React.useState([]);
    
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openInvite, setOpenInvite] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openRefresh, setOpenRefresh] = React.useState(false);
    const [a, setA] = React.useState(false);
    const [eventId, setEventId] = React.useState('');
    const [invLink, setInvLink] = React.useState('');
    const [duration, setDuration] = React.useState('5');
    const [hasPlaylist, setHasPlaylist] = React.useState(false);

    const handleOpen = () => {
        setOpenCreate(true);
    };
    const handleMenuClick = (index, event) => {
        console.log(event);
        setEventId(event.id);
        setInvLink(event.invitation_link);
        setDuration(event.duration_time+'');
        setHasPlaylist(event.playlist.length>0);
        if(index === 0){
            setOpenDelete(true);
        }
        if (index === 1) {
            setOpenInvite(true);
        }
        if (index === 2) {
            setOpenRefresh(true);
        }
        if (index === 3) {
            setOpenEdit(true);
        }
    };
    const openEvent = (id, isActive) => {
        if(isActive){
            props.history.push('/event/'+id)
        }
        
    };
    const [user, setUser] = React.useState({
        username: ''
    })
    React.useEffect(() => {
        async function getEventInfo(){
        let spotifyToken = (window.location.href + '').split("&spotify_access_token=");
        let token = spotifyToken[0].split("access_token=")[1];
        spotifyToken = spotifyToken[1]
        if(spotifyToken){
            localStorage.setItem('token', token);
            localStorage.setItem('spotifyToken', spotifyToken);
            props.history.replace('/event/')
        }
        token = getToken();

        await axios.get('/events', {headers:{
            'Authorization': `Bearer ${token}`
        }
        }).then(({data}) => {
            console.log(data.events);
            setEvents(data.events);
        })
        getUser()
        }
        async function getUser() {
            let token = getToken()
            console.log(token)
            await axios.get('/user/current', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(({
                data
            }) => {
                console.log(data);
                setUser(data.user);
                
            })

        }
        getEventInfo();
    }, [openEdit, openInvite, openDelete, openCreate, openRefresh]);

    const checkAdmin = (event,user) => {
        let ret = false;
        event.participants.forEach((participant, index) => {
            if (participant.user.username === user.username && participant.role === 'admin') {
                ret=true
            }
        })
        return ret
    }

    return(
            <main className={classes.content}>
                
                <div className={classes.toolbar} />
                <Typography className={`${classes.title} ${classes.list}`} variant="h3" color="textPrimary">
                Wydarzenia
                </Typography>
                {   events.length >= 1?
                    events.map((event, index) => {let firstAdmin = true; let isActive = event.participants.length>=1; let isAdmin=checkAdmin(event,user); return(<>
                    <Box className={classes.flexRow} >
                        <Avatar alt="Remy Sharp" variant = "circle" src={event.image_url} className={`${classes.eventPhoto} ${!isActive?classes.inactive:''}`} onClick={()=>openEvent(event.id, isActive)} style={{cursor:'pointer'}} />
                        <Box style={{width: '90%'}}>
                            <Typography variant="h5" color="textPrimary">
                            {event.name}{}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs = {gridLeftColumnInfo} align = 'right' >
                                    <Typography color="textSecondary">
                                                Opis wydarzenia 
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridRightColumnInfo}>
                                    <Typography color="textPrimary">
                                                {event.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridLeftColumnInfo} align='right'>
                                    <Typography color="textSecondary">
                                                Liczba uczestników
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridRightColumnInfo}>
                                    <Typography color="textPrimary">
                                                <span style={{color:COLOR.orange}}>{event.participants.length}</span>/30
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridLeftColumnInfo} align='right'>
                                    <Typography color="textSecondary">
                                                Administratorzy
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridRightColumnInfo}>
                                    <Typography  style = {{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} color = "textPrimary" >
                                                {event.participants.map((participant, index ) => {
                                    if (participant.role === "admin")
                                        if(!firstAdmin){
                                            
                                            return <span><span style={{color:COLOR.orange}}> |</span> {participant.user.username}</span>;  
                                        }
                                        else
                                        {
                                            firstAdmin = false;
                                            return <span>{participant.user.username}</span>;
                                        }
                                            
                                    return ""
                                })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridLeftColumnInfo} align='right'>
                                    <Typography color="textSecondary">
                                                Dostępność
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridRightColumnInfo}>
                                    <Typography color="textPrimary">
                                                {event.end_date.split(' ')[0] === '4000-01-01'?'Bezterminowo':`od ${event.start_date.split(' ')[0]} do ${event.end_date.split(' ')[0]}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridLeftColumnInfo} align='right'>
                                    <Typography color="textSecondary">
                                                Czas trwania
                                    </Typography>
                                </Grid>
                                <Grid item xs={gridRightColumnInfo}>
                                    <Typography color="textPrimary">
                                                {getDurationString(event.duration_time)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Button
                                inputProps={{ className: classes.fieldInput }}
                                className={classes.button}
                                variant="outlined"
                                onClick={()=>openEvent(event.id, isActive)}
                                >
                                PRZEJDŹ DO WYDARZENIA
                
                            </Button>
                        </Box>

                        <Box>
                            <Grid container spacing={2} style={{opacity: 0.5}}>
                                {menuItems.map((item,index) =>{
                                    const isNotClickable = (!isActive && index === 2) || !isAdmin;
                                    return(
                                    <>
                                    <Grid className = { isNotClickable ?classes.inactive:''} item xs = {5} align = 'right' 
                                        style= {{cursor: isNotClickable?'':'pointer'}}
                                        onClick = {isNotClickable?undefined:(e) => { e.stopPropagation(); handleMenuClick(index, event)}}
                                       >
                                        {event.playlist.length===0&&index===2?<Typography color="textPrimary">GENERUJ PLAYLISTĘ</Typography>:item.label}
                                    </Grid>
                                    <Grid className = { isNotClickable ? classes.inactive : ''} item xs = {7}
                                        style= {{cursor: isNotClickable?'':'pointer'}}
                                        onClick = {isNotClickable?undefined:(e) => { e.stopPropagation(); handleMenuClick(index, event)}}>
                                        {item.icon}
                                    </Grid>
                                    </>
                                )})}
                                
                                
                                
                            </Grid>

                        </Box>
                    </Box>

                     <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none",marginBottom: '24px'}}></hr>
                    </>
                    )}):<Typography style={{marginLeft: '100px'}}variant="h4" color="textPrimary">Tu będą pojawiać się wydarzenia, w których uczestniczych.</Typography>
                }
                             
                <CreateEventModal open={openCreate} setOpen={setOpenCreate} setOpenInvite={setOpenInvite} setInvLink={setInvLink} setEventId={setEventId} isEdit={false}/>
                <CreateEventModal open={openEdit} setOpen={setOpenEdit} setOpenInvite={setOpenInvite} setInvLink={setInvLink} setEventId={setEventId} eventId={eventId} isEdit={true}/>
                <AddParticipantsModal open={openInvite} setOpen={setOpenInvite} invLink={invLink} eventId={eventId} openEvent={openEvent} a={a} setA={setA}/>
                <RefreshPlaylistModal open={openRefresh} setOpen={setOpenRefresh} eventId={eventId} eventDuration={duration} generate={!hasPlaylist}/>

                <DeleteEventModal open={openDelete} setOpen={setOpenDelete} eventId={eventId}/>
                <Fab label = {'Add'} className = {classes.fab} color = {'primary'} onClick = {handleOpen}>
                    <AddIcon className = {classes.fabIcon} color = {COLOR.white}/>
                </Fab>    
            </main>
    )
})