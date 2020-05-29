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
import EditPreferencesModal from '../EditPreferencesModal/EditPreferencesModal';
import {getToken} from '../../utils/UserFunctions';


const useStyles = theme => ({
    content: {
            flexGrow: 1,
            marginLeft: theme.spacing(38),
            padding: theme.spacing(1),
            background: COLOR.lightBlue
        },
    title: {
        marginTop: theme.spacing(2),
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
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChangeValue = this.handleEmailChangeValue.bind(this);
        this.handleUsernameChangeValue = this.handleUsernameChangeValue.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.getUser = this.getUser.bind(this);
        this.changePreferences = this.changePreferences.bind(this);
        this.handleOldPasswordChangeValue = this.handleOldPasswordChangeValue.bind(this);
        this.handleNewPasswordChangeValue = this.handleNewPasswordChangeValue.bind(this);
        this.state = {
            expanded: null,
            emailChangeValue: '',
            language: "polish",
            oldPasswordChangeValue: '',
            newPasswordChangeValue: '',
            user: {
                username: '',
                pref_genres: []
            },
            openPreferences: false,
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
    changePreferences = () => {
        this.setState({
            openPreferences: !this.state.openPreferences
        });
    };

    handleRadioChange(event) {
        this.setState({
            language: event.target.value
          });
      };

    handleEmailChangeValue(event) {
        this.setState({
            emailChangeValue: event.target.value
            });
    };

    handleUsernameChangeValue(event) {
        this.setState({
            usernameChangeValue: event.target.value
        });
    };

    handleOldPasswordChangeValue(event) {
        this.setState({
            oldPasswordChangeValue: event.target.value
        });
    };

    handleNewPasswordChangeValue(event){
        this.setState({
            newPasswordChangeValue: event.target.value
        })
    }

    async getUser() {
        let token = getToken();
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

    async handleEmailChange() {
        let token = getToken();
        await axios.put('/user/current',
            {
                'email': this.state.emailChangeValue
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(({data }) => {
            console.log(data)
            this.setState({
                user: data.user
            })
        })
    }

    async handlePasswordChange() {
        let token = getToken();
        await axios.put('/user/current',
            {
                'old_password': this.state.oldPasswordChangeValue,
                'password': this.state.newPasswordChangeValue
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(({data }) => {
            console.log(data)
            this.setState({
                user: data.user
            })
        })
    }

    async handleUsernameChange() {
        let token = getToken();
        await axios.put('/user/current',
            {
                'username': this.state.usernameChangeValue
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(({data }) => {
            console.log(data)
            this.setState({
                user: data.user
            })
        })
    }

    render(){
        const { classes } = this.props;
        const gridLeftColumnInfo = 12
        const gridRightColumnInfo = 12
        const expandMoreInfo = 12
        console.log(this.state.user.pref_genres);
        if(this.state.user.pref_genres.length < 1){
            this.state.user.pref_genres = ["Ustaw preferencje w celu lepszej rekomendacji."]
        }
        
        return(
            <main className={classes.content}>
                
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
                                    <_Field label="Podaj nową nazwę użytkownika" onChange={this.handleUsernameChangeValue}/>
                                    <br></br>
                                    <span onClick={this.handleUsernameChange}>
                                        <_Button label='Zmień' />
                                    </span>
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
                                    <_Field label="Podaj nowy adres mailowy" onChange={this.handleEmailChangeValue}/>
                                    <br></br>
                                    <span onClick={this.handleEmailChange}>
                                        <_Button label='Zmień' />
                                    </span>
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
                                    <_PField label="Podaj stare hasło" onChange={this.handleOldPasswordChangeValue}/>
                                    <br></br>
                                    <_PField label="Podaj nowe hasło" onChange={this.handleNewPasswordChangeValue}/>
                                    <br></br>
                                    <_Button label='Zmień' onChange={this.handlePasswordChange}/>
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
                                        {this.state.user.pref_genres.map(item => item + " ")}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className = {classes.flexColumn} onClick={this.changePreferences}>
                                    <_Button label='Zmień' onChange={this.handlePreferencesChange}/>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                    <EditPreferencesModal open={this.state.openPreferences} 
                    setOpen={this.changePreferences} preferences={this.state.user.pref_genres}
                    register={false}/>
                </Box> 
            </main>
        )
    }
}
export default withStyles(useStyles)(SettingsView);