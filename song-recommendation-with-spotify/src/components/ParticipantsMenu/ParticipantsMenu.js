import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box'
import COLOR from '../../assets/colors'
import image from '../../assets/panda.jpg'

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
    columnFlex: {
        display: 'flex',
        flexDirection: 'column'
    },
    toolbar: theme.mixins.toolbar,
}));
const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

export default function SideMenu() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    };
    return(
            
            <Drawer anchor="right" className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                <div className={classes.toolbar} />

                    <Typography style={{lineHeight: "1.5rem",textAlign: "center"}} variant="h5" color="textPrimary">
                        Uczestnicy
                    </Typography>
                    <Typography style={{lineHeight: "1.25rem",textAlign: "center"}} color="textPrimary">
                            wydarzenia
                        </Typography>
 
                        
                        <List >
                                    {
                                        ['Nazwa uzytkownika', 'Nazwa uzytkownika 2', 'Nazwa uzytkownika 3'].map((text, index) => (
                                        
                                        <ListItem key={text}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`Avatar`}
                                                    src={image}
                                                />
                                            </ListItemAvatar>
                                            <div className={classes.columnFlex}>    
                                            <ListItemText primary={text} secondary={"BASIC"}/>
                                            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedA" />
                                            </div>
                                            <Box className={{alignSelf: "flex-end"}}>
                                                X
                                            </Box>
                                            
                                            
                                        </ListItem>
                                        
                                    ))}
                            </List>
                    
                
                
                
            </Drawer>
    )
}