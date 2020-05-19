import React from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';
import PlaylistView from '../components/PlaylistView/PlaylistView';
import ParticipantsMenu from '../components/ParticipantsMenu/ParticipantsMenu';
import AddParticipantsModal from '../components/AddParticipantsModal/AddParticipantsModal';
import CreateEventModal from '../components/CreateEventModal/CreateEventModal';
import DeleteEventModal from '../components/DeleteEventModal/DeleteEventModal';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function Event(props){

        const classes = useStyles();
        const [openInvite, setOpenInvite] = React.useState(false);
        const [openEdit, setOpenEdit] = React.useState(false);
        const [openDelete, setOpenDelete] = React.useState(false);
        const [a, setA] = React.useState(false);
        const [user, setUser] = React.useState({
            username: ''
        })
        const [event, setEvent] = React.useState({
            name: '',
            participants: [],
            image_url: '',
            start_date: '',
            end_date: '',
            playlist: [],
        });
        const [isAdmin, setIsAdmin] = React.useState(false);
        React.useEffect(() => {
            async function getEventInfo() {
                let token = localStorage.getItem('token');
                console.log(token)
                const result = await axios.get('/event/' + props.match.params.id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setEvent(result.data.event);
                getUser(result.data.event);
            }
            async function getUser(event) {
                let token = localStorage.getItem('token');
                console.log(token)
                await axios.get('/user/current', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(({
                    data
                }) => {
                    console.log(data);
                    setUser(data.user);
                    checkAdmin(event, data.user);
                })
                
            }
            getEventInfo();
            
            
        }, [openInvite, openEdit, openDelete]);
        const checkAdmin = (event,user) => {
            event.participants.forEach((participant, index) => {
                if (participant.user.username === user.username && participant.role === 'admin') {
                    setIsAdmin(true);
                }
            })            

        }
        return(
            <div className={classes.root}>
                <TopBar/>
                <SideMenu/>
                <PlaylistView isAdmin={isAdmin} event={event} setOpenInvite={setOpenInvite} setOpenEdit={setOpenEdit} setOpenDelete={setOpenDelete} a={a} setA={setA}/>
                <ParticipantsMenu isAdmin={isAdmin} event={event}/>
                <AddParticipantsModal open={openInvite} setOpen={setOpenInvite} invLink={event.invitation_link} eventId={event.id} eventPage={true} a={a} setA={setA}/>
                <CreateEventModal open={openEdit} setOpen={setOpenEdit} setOpenInvite={setOpenInvite} setInvLink={event.invitation_link} eventId={event.id} isEdit={true}/>
                <DeleteEventModal open={openDelete} setOpen={setOpenDelete} eventId={event.id}/>
            </div>
        )
    }   


export default withStyles(useStyles)(Event);