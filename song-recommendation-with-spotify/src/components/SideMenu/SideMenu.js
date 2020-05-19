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
import ExpandMore from '@material-ui/icons/ExpandMore';
import COLOR from '../../assets/colors'
import { ListItemIcon, Divider } from '@material-ui/core';
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

    const handleClick1 = () => {
        props.history.push('/event/')
    }
    return(
            
            <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                <div className={classes.toolbar} />
                
                <List>
                    <ListItem button key={"USTAWIENIA"}>
                        <ListItemIcon className={classes.listItem}>
                            <SettingsOutlinedIcon/>
                        </ListItemIcon>
                        
                        <ListItemText className={classes.listItem} primary={"USTAWIENIA"} />
                    </ListItem>
                    <ListItem button key={"DODAJ WYDARZENIE"}>
                        <ListItemIcon className={classes.listItem}>
                            <AddCircleOutlineOutlinedIcon/>
                        </ListItemIcon>
                        
                        <ListItemText className={classes.listItem} primary={"DODAJ WYDARZENIE"} />
                    </ListItem>
                    <ListItem button onClick={handleClick1}>
                        <ListItemIcon className={classes.listItem} >
                           <ExpandMore />
                        </ListItemIcon>
                        <ListItemText primary="WYDARZENIA" />
                    </ListItem>
                </List>
                
                <List className={classes.end}>
                    <ListItem  button key={"INFO"}>
                        <ListItemIcon className={classes.infoColor}>
                           <InfoOutlinedIcon/>
                        </ListItemIcon>
                        
                        <Typography className={classes.infoColor}>INFO</Typography>
                    </ListItem>
                </List>
                
            </Drawer>
    )
})