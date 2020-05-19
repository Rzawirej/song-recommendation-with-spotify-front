import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';
import SettingsView from '../components/SettingsView/SettingsView';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

class Settings extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div >
                <TopBar/>
                <SideMenu/>
                <SettingsView/>
            </div>
        )
    }
}

export default Settings;
