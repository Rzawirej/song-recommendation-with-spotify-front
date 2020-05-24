import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'

import COLOR from './../../assets/colors'



const useStyles = makeStyles((theme) => ({
    content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            background: COLOR.darkBlue,
        },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    eventPhoto: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(3),
        height: theme.spacing(20),
        width: theme.spacing(20),
        
    },
    eventInfo: {
        display: 'flex',
        flexDirection: 'row'
    },
    eventInfoText: {
        display: 'flex',
        flexDirection: 'column'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        
    },
    list:{
        color: COLOR.white
    },
    listItem:{
        color: COLOR.white
    },
    inactive: {
        opacity: 0.1,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export default withRouter(function PlaylistView(props) {

    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    
    const event = props.event
    
    
    const gridLeftColumnInfo = 4;
    const gridRightColumnInfo = 8;
    let firstAdmin = true;
        const menuItems = [{
        label: <Typography color="textSecondary"> USUŃ WYDARZENIE </Typography>,
        icon: <HighlightOffIcon color='primary'/>,
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
    
   
    const getDurationString = (duration) =>{
        console.log(duration)
        
        if(duration===5){
            return "5 godzin, 100 utworów"
        }
        if(duration===10){
            return "10 godzin, 200 utworów"
        }
        if(duration === 15) {
            return "15 godzin, 300 utworów"
        }
        if(duration === 24) {
            return "24 godziny, 500 utworów"
        }
        return ""
    }
    const handleClick = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex(-1)
        } else {
            setSelectedIndex(index)
        }
        console.log(selectedIndex);
    }
    const handleMenuClick = (index) => {
        if(index === 0){
            props.setOpenDelete(true);
        }
        if (index === 1) {
            props.setOpenInvite(true);
        }
        if (index === 2) {
            props.setOpenRefresh(true);
        }
        if (index === 3) {
            props.setOpenEdit(true);
        }
        props.setA(!props.a);
    }

    return(
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Box className={classes.flexRow} >
                        <Avatar alt="Remy Sharp" variant = "circle" src={event.image_url} className={classes.eventPhoto} />
                        <Box >
                            <Typography variant="h5" color="textPrimary">
                            {event.name}
                            </Typography>
                            <Grid style={{paddingRight: '10px'}}container spacing={2}>
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
                                    <Typography style = {{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} color = "textPrimary">
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
                        </Box>

                        <Box >
                            <Grid container spacing={2}>
                                {menuItems.map((item,index) =>(
                                    <>
                                    <Grid className={props.isAdmin?'':classes.inactive} item xs = {8} align = 'right' >
                                        {item.label}
                                    </Grid>
                                    <Grid className={props.isAdmin?'':classes.inactive} item xs={4} onClick={props.isAdmin?()=>handleMenuClick(index):undefined}>
                                        {item.icon}
                                    </Grid>
                                    </>
                                ))}
                                
                                
                                
                            </Grid>

                        </Box>
                    </Box>
                <List className={classes.list}>
                    {event.playlist.length>0?event.playlist.map((song, index) =>{ return (<>
                    <ListItem  onClick={()=>handleClick(index)}>
                        <span style={{marginRight: '40px', width: '1%'}}>
                            {index+1}.
                        </span>
                        <ListItemIcon className={classes.listItem} >
                        {index === selectedIndex?<ExpandLess color='secondary'/>:<ExpandMore />}
                        </ListItemIcon>
                        <span style={{width: '40%'}}>
                            {song.artist[0]}
                        </span>
                        <span style={{width: '40%'}}>
                            {song.name}
                        </span>

                        {/*<ListItemText style={{textAlign:"right", margin:0}} primary="X" />*/}
                    </ListItem>
                    <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                        <div className={classes.flexRow}>
                            <Avatar style={{marginLeft: '120px', marginRight: '40px', width:'80px', height:'80px'}}variant="square" src={song.image_url}/>
                            <div>
                                {song.album}
                                <div></div>

                                {Math.floor(song.duration/60000)>10?Math.floor(song.duration/60000):'0'+Math.floor(song.duration/60000)}:{Math.floor(song.duration/10000)>=10?Math.floor(song.duration/10000):'0'+Math.floor(song.duration/10000)}
                            </div>
                            <Typography variant="h5" color="textPrimary">
                                 
                            </Typography>
                            <Typography variant="h5" color="textPrimary">
                                 
                            </Typography>
                            
                        </div>
                        
                    </Collapse>
                    <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none"}}></hr>
                    </>
                    )})
                    :
                    <Typography color="textPrimary">
                            To wydarzenie nie ma jeszcze playlisty
                    </Typography>}
                </List>
    
                    
            </main>
    )
})