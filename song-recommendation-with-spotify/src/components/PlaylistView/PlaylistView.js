import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse'

import Box from '@material-ui/core/Box'
import image from '../../assets/panda.jpg'
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
        marginLeft: theme.spacing(10),
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
    list:{
        color: COLOR.white
    },
    listItem:{
        color: COLOR.white
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export default function PlaylistView() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [expand1, setExpand1] = React.useState(false);
    const [expand2, setExpand2] = React.useState(false);
    const [data, setData] = React.useState({
        name: ''
    });
    React.useEffect(async () => {
        let token = localStorage.getItem('token');
        console.log(token)
        const result = await axios.get('/events', {headers:{
            'Authorization': `Bearer ${token}`
        }
        })
        
        console.log(result.data.events[0]);
        setData(result.data.events[0]);
        console.log(data)
    },[]);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
   

    const handleClick1 = () => {
        setExpand1(!expand1);
    }
    const handleClick2 = () => {
        setExpand2(!expand2);
    }
    return(
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Box className={classes.eventInfo}>
                    <Avatar alt="Remy Sharp" variant = "circle" src={image} className={classes.eventPhoto} />
                    <Box >
                        <Typography variant="h3" color="textPrimary">
                           {data.name}
                        </Typography>
                        <Typography color="textSecondary">
                            Założyciel <Box component="span" color="text.primary"> Nazwa użytkownika</Box>
                        </Typography>
                        <Box className={classes.eventInfo}>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Czas trwania</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="kek"
                                    variant="outlined"
                                    defaultValue = 'PLACEHOLDER'
                                    classes={{select: {backgroundColor: "red"}}}
                                >
                                    <MenuItem value="PLACEHOLDER" disabled>
                                        PLACEHOLDER
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Częstotliwość</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="kek"
                                    variant="outlined"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Opis</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="kek"
                                    variant="outlined"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <HighlightOffIcon color="primary"/>
                            
                        </Box>
                    </Box>
                </Box>
                <List className={classes.list}>
                    {['Tytuł singla1', 'Tytuł singla2', 'Tytuł singla3', 'Tytuł singla4', 'Tytuł singla5', 'Tytuł singla6', 'Tytuł singla7', 'Tytuł singla8'].map((text, index) => (
                        <>
                    <ListItem  onClick={handleClick1}>
                        <span style={{marginRight: '40px'}}>
                            1.
                        </span>
                        <ListItemIcon className={classes.listItem} >
                        <ExpandMore />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        <ListItemText primary="4:23" />
                        <ListItemText style={{textAlign:"right", margin:0}} primary="X" />
                    </ListItem>
                    <Collapse in={expand1} timeout="auto" unmountOnExit>
                        <List >
                                {['Wydarzenie 1', 'Wydarzenie 2', 'Wydarzenie 3'].map((text, index) => (
                                    <ListItem button key={text}>
                                        <ListItemText primary={text} />
                                        
                                    </ListItem>
                                    
                                ))}
                        </List>
                    </Collapse>
                    <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none"}}></hr>
                    </>
                    ))}
                </List>
                    
                    
            </main>
    )
}