import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import COLOR from './../../assets/colors'
import { ListItemIcon } from '@material-ui/core';
const drawerWidth = '15%';
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        
    },
    drawerPaper: {
        width: drawerWidth,  
        backgroundColor: COLOR.black,
        color: COLOR.white,
        paddingLeft: 10,
        paddingTop: 50,
    },
    drawerModal: {
        paddingLeft: 1000,
    },
    expansion: {
        backgroundColor: COLOR.black,
        color: COLOR.white
    },
    listItem:{
        color: COLOR.white
    },
    end:{
        position: 'absolute',
        bottom: '10%',
        
    },
    infoColor:{
        color: 'rgba(255, 255, 255, 0.4)',
    },
    toolbar: theme.mixins.toolbar,
}));


export default function SideMenu() {
    const classes = useStyles();
    return(
            
            <Drawer anchor="right" className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper, modal: classes.drawerModal}}>
                <div className={classes.toolbar} />
                
            </Drawer>
    )
}