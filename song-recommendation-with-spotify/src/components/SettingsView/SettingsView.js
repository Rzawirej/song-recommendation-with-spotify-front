import React from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import _PField from './_PField';
import _Field from './_Field';
import _Button from './_Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ExpandMore from '@material-ui/icons/ExpandMore';
import COLOR from './../../assets/colors'
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = theme => ({
    content: {
            flexGrow: 1,
            marginLeft: theme.spacing(40),
            padding: theme.spacing(1),
            background: COLOR.lightBlue
        },
    title: {
        marginBottom: theme.spacing(10)
    },
    listItem:{
        color: COLOR.white
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: theme.spacing(20),
        flexShrink: 0,
        color: COLOR.pink,
        textAlign: 'right',
        marginRight: theme.spacing(1),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: 'white',
        size: 20
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        flexBasis: theme.spacing(40)
    },
    flexColumn: {
        marginLeft: theme.spacing(20),
        flexBasis: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },  
    expansionPanel: {
        backgroundColor: COLOR.lightBlue,
        width: "100vh",
        flexGrow: 10
    },  
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
});


class SettingsView extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.getUser = this.getUser.bind(this);
        this.state = {
            expanded: null,
            language: "polish",
            user: {
                username: '',
            }
        };
    }

    componentWillMount(){
        this.getUser();
    }

    componentDidMount(){
        this.getUser();
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false
        });
    };

    handleRadioChange(event) {
        this.setState({
            language: event.target.value
          });
      };

    async getUser() {
        let token = localStorage.getItem('token');
        console.log(token)
        await axios.get('/user/current', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({data }) => {
            console.log(data);
            this.setState({
                user: data.user
            })
            console.log(this.state.user)
        })
    }

    render(){
        const { classes } = this.props;
        const gridLeftColumnInfo = 12
        const gridRightColumnInfo = 12
        const expandMoreInfo = 12
        console.log("RENDER");
        console.log(this.state.user)
        
        return(
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography className={`${classes.title} ${classes.list}`} variant="h3" color="textPrimary">
                           Ustawienia
                </Typography>
                <Box>
                    <Grid container alignItems="flex-end" >
                        <Grid item >
                            <ExpansionPanel
                                expanded={this.state.expanded === "username"}
                                onChange={this.handleChange("username")}
                                className = {classes.expansionPanel }
                                >
                                <ExpansionPanelSummary 
                                    expandIcon={<ExpandMoreIcon style = {{color: 'white', align:'left'}}/>}>
                                    <Typography className={classes.heading}>
                                        Nazwa użytkownika 
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        {this.state.user.username}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.flexColumn}>
                                    <_Field label="Podaj nową nazwę użytkownika" onChange={this.handleEmailChange}/>
                                    <br></br>
                                    <_Button label='Zmień' />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                </Box>
                <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none",marginBottom: '24px'}}></hr>
                <Box>
                    <Grid container alignItems="flex-end" direction="row">
                        <Grid item >
                            <ExpansionPanel
                                expanded={this.state.expanded === "email"}
                                onChange={this.handleChange("email")}
                                className = {classes.expansionPanel }
                                >
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style = {{color: 'white' }}/>}>
                                    <Typography className={classes.heading}>
                                        Adres e-mail
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        {this.state.user.email}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails  className={classes.flexColumn}>
                                    <_Field label="Podaj nowy adres mailowy" onChange={this.handleEmailChange}/>
                                    <br></br>
                                    <_Button label='Zmień' />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                </Box>
                <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none",marginBottom: '24px'}}></hr>
                <Box>
                    <Grid alignItems="flex-end" direction="row">
                        <Grid item >
                            <ExpansionPanel
                                expanded={this.state.expanded === "password"}
                                onChange={this.handleChange("password")}
                                className = {classes.expansionPanel }
                                >
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style = {{color: 'white' }}/>}>
                                    <Typography className={classes.heading}>
                                        Hasło
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        ********
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.flexColumn}>
                                    <_PField label="Podaj nowe hasło" onChange={this.handleEmailChange}/>
                                    <br></br>
                                    <_PField label="Podaj stare hasło" onChange={this.handleEmailChange}/>
                                    <br></br>
                                    <_Button label='Zmień' />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                </Box>
                <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none",marginBottom: '24px'}}></hr>
                <Box>
                    <Grid container  direction="row">
                        <Grid item>
                            <ExpansionPanel
                                expanded={this.state.expanded === "language"}
                                onChange={this.handleChange("language")}
                                className = {classes.expansionPanel }
                                >
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style = {{color: 'white' }}/>}>
                                    <Typography className={classes.heading}>
                                        Język 
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        Polski
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className = {classes.flexColumn}>
                                    <Typography>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Wybierz język</FormLabel>
                                            <RadioGroup aria-label="gender" name="gender1" value={this.state.language} onChange={this.handleRadioChange}>
                                                <FormControlLabel value="polish" control={<Radio />} label="polski" />
                                                <FormControlLabel value="english" control={<Radio />} label="angielski" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                </Box>
                <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none",marginBottom: '24px'}}></hr>
                <Box>
                    <Grid container alignItems="flex-end" direction="row">
                        <Grid item>
                            <ExpansionPanel
                                expanded={this.state.expanded === "spotify"}
                                onChange={this.handleChange("spotify")}
                                className = {classes.expansionPanel }
                                >
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style = {{color: 'white' }}/>}>
                                    <Typography className={classes.heading}>
                                        Spotify
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        niepołączono
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className = {classes.flexColumn}>
                                    <_Button label='Zmień konto' />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                </Box>
                <hr style = {{background: "linear-gradient(90deg, #FF8000 0%, #FF0080 100%)", height: '1px', border: "none",marginBottom: '24px'}}></hr>
                <Box>
                    <Grid container alignItems="flex-end" direction="row">
                        <Grid item >
                            <ExpansionPanel
                                expanded={this.state.expanded === "preferences"}
                                onChange={this.handleChange("preferences")}
                                className = {classes.expansionPanel }
                                >
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style = {{color: 'white' }}/>}>
                                    <Typography className={classes.heading}>
                                        Preferencje muzyczne
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        gatunek1 <br></br>
                                        gatunek2 <br></br>
                                        gatunek3 <br></br>
                                        gatunek4 <br></br>
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className = {classes.flexColumn}>
                                    <_Button label='Zmień' />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                </Box> 
            </main>
        )
    }
}
export default withStyles(useStyles)(SettingsView);