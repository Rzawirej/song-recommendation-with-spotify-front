import React from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';
import PlaylistView from '../components/PlaylistView/PlaylistView';
import ParticipantsMenu from '../components/ParticipantsMenu/ParticipantsMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function Event(props){

        const classes = useStyles();
        const [event, setEvent] = React.useState({
            name: '',
            participants: [],
            start_date: '',
            end_date: '',
            playlist: [],
        });
        React.useEffect(() => {
            async function getEventInfo() {
                let token = localStorage.getItem('token');
                console.log(token)
                const result = await axios.get('/event/' + props.match.params.id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                console.log(result.data);
                setEvent(result.data);
                console.log(event.playlist)
            }
            getEventInfo();
        }, []);
        return(
            <div className={classes.root}>
                <TopBar/>
                <SideMenu/>
                <PlaylistView event={event}/>
                <ParticipantsMenu event={event}/>
            </div>
        )

}

export default Event;
