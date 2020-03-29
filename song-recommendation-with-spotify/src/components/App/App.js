import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import image from '../../assets/panda.jpg'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        
    },
    drawerPaper: {
        width: drawerWidth,
        
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export default function App() {
    const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Apka
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer} 
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    {['Profil', 'Ustawienia'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider variant="middle"/>
                <List>
                    {['Wszystkie wydarzenia'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <ExpansionPanelSummary
                        //expandIcon={< />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>Twoje wydarzenia</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List >
                            {['Wydarzenie 1', 'Wydarzenie 2', 'Wydarzenie 3'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                    <GridList className={classes.gridList} cols={4}>
                        
                        {['1','2','3','4'].map((text) => (
                            <Card>
                                <CardHeader
                                    avatar={
                                    <Avatar aria-label="recipe" src={image} className={classes.avatar} variant="rounded"/>
                                    }
                                    title="02.11.2020"
                                    subheader="U mnie"
                                />
                                <Divider variant="middle"/>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    Jakiś opis wydarzenia czy inny tekst
                                    </Typography>
                                </CardContent>
                             </Card>
                        ))}
                    </GridList>
                    <Fab color="secondary" aria-label="add">
                      <AddIcon />
                    </Fab>
            </main>
        </div>
    );
}

