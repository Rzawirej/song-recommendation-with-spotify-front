import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { withRouter } from 'react-router-dom'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import COLOR from '../../assets/colors'
import { ListItemIcon} from '@material-ui/core';

import CreateEventModal from '.././CreateEventModal/CreateEventModal';
import AddParticipantsModal from '.././AddParticipantsModal/AddParticipantsModal';

const drawerWidth = '15%';
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        
    },
    drawerPaper: {
        width: drawerWidth,  
        color: COLOR.white,
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(6),
    },
    listItem:{
        color: COLOR.white
    },
    end:{
        position: 'absolute',
        bottom: '10%',
        paddingLeft: theme.spacing(2)
        
    },
    infoColor:{
        color: 'rgba(255, 255, 255, 0.4)',
    },
    toolbar: theme.mixins.toolbar,
}));


export default withRouter(function SideMenu(props) {
    const classes = useStyles();
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openInvite, setOpenInvite] = React.useState(false);
    const [eventId, setEventId] = React.useState('');
    const [invLink, setInvLink] = React.useState('');
    const openEvent = (id, isActive) => {
        if (isActive) {
            props.history.push('/redirect/event/' + id)
        }

    };
    const [a, setA] = React.useState(false);
    const handleClick1 = () => {
        props.history.push('/event')
    }
    const handleClick2 = (event) => {
        event.preventDefault()
        if (!window.location.href.includes('settings')){
            props.history.push('/settings')
        }      
    }
    const goInfo = ()=>{
        props.history.push('/info')
    }

    const handleOpen = () => {
        setOpenCreate(true);
    };
    return(
            
            <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                <div className={classes.toolbar} />
                <CreateEventModal open={openCreate} setOpen={setOpenCreate} setOpenInvite={setOpenInvite} setInvLink={setInvLink} setEventId={setEventId} isEdit={false}/>
                <AddParticipantsModal open={openInvite} setOpen={setOpenInvite} invLink={invLink} eventId={eventId} openEvent={openEvent} a={a} setA={setA}/>

                <List>
                    <ListItem button key={"USTAWIENIA"} onClick={handleClick2}>
                        <ListItemIcon className={classes.listItem}>
                            <SettingsOutlinedIcon/>
                        </ListItemIcon>
                        
                        <ListItemText className={classes.listItem} primary={"USTAWIENIA"} />
                    </ListItem>
                    <ListItem button key = {"DODAJ WYDARZENIE"} onClick = {handleOpen} >
                        <ListItemIcon className={classes.listItem}>
                            <AddCircleOutlineOutlinedIcon/>
                        </ListItemIcon>
                        
                        <ListItemText className={classes.listItem} primary={"DODAJ WYDARZENIE"} />
                    </ListItem>
                    <ListItem button onClick={handleClick1}>
                        <ListItemIcon className={classes.listItem} >
                           <MusicNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary="WYDARZENIA" />
                    </ListItem>
                </List>
                
                <List className={classes.end}>
                    <ListItem  button key={"INFO"} onClick={goInfo}>
                        <ListItemIcon className={classes.infoColor}>
                           <InfoOutlinedIcon/>
                        </ListItemIcon>
                        
                        <Typography className={classes.infoColor}>INFO</Typography>
                    </ListItem>
                </List>
                
            </Drawer>
    )
})