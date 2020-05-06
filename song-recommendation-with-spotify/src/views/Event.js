import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';
import PlaylistView from '../components/PlaylistView/PlaylistView';
import ParticipantsMenu from '../components/ParticipantsMenu/ParticipantsMenu';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

class Event extends React.Component{
    constructor(props){
        super(props);
    }

    async componentDidMount(){
        const { data } = await axios.post('http://localhost:5000/api/login/spotify/authorized',
        {code:'AQB51ILbQUz3BXXCLYOAgCsa0W15kW-JGabpQH8oMhcnNTenXC4fHgh2TTseQzr3jRyULGforQybnHK1mq8CZH0eRT40XmYva-4C9ZXeZyofRgN1AX8VAL7PFrrYVMWBSufOz0YAHSTY6BtUlI4iMa6vFTYt02wrmOZVOfXJT1FoXxQ0cTkZRfi0MDOFOVpLOwbGl5JpGkRkf9nxRaQnUh5Aqk3CwXG5L0mEHFMEX-iujWYCp16LqlbrX7cAJ1AV89Qe40mNV3k3n-pL5YUWPgKMJcLRAAIdLWE5dHWJ35OuAUajJhwEm5vcE0pzUhLqNBRwt63sdVVM5QxqTgcWCDhsbE1EltDP87cKyVqOB_I7avtNuRdOpgOlC_ogOc1VvFq26rmqQybtZRrmoX4u42A_N8PeQz5XH9IbzuBoCIV5uYD1HrzWB8-l0ZRSxdGa7bH_HbD4IjEoi6nSSucYNOrsF9lka2wnYLCcRlDGrBjjY_-xUkcG9QrOZHNYUNRMqx-TuNx9pcccM_28H1hcxUPjGUj0Oud3wIxenQD7tp4_MhOsBJnZxVaHCaZCgf83_4bT1mJAdGU2rjLXQfzX0U1Hx6fN8f6wo6AXhqR4spIKsoQnNm0aNBke88XgijH_qE-py1Y'});
    }

    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.root}>
                <TopBar/>
                <SideMenu/>
                <PlaylistView/>
                <ParticipantsMenu/>
            </div>
        )
    }   
}

export default withStyles(useStyles)(Event);