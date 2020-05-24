import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import background from '../../assets/background.png';
import InviteLoggedModal from '../InviteLoggedModal/InviteLoggedModal'
import InviteNotLoggedModal from '../InviteNotLoggedModal/InviteNotLoggedModal'
import {getToken} from '../../utils/UserFunctions'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

export default withRouter(function InviteView(props) {
    const classes = useStyles();
    const [openLogged, setOpenLogged] = React.useState(false);
    const [openNotLogged, setOpenNotLogged] = React.useState(false);
    React.useEffect(() => {
        async function addParticipant(){
            const token = getToken();
            if(token){
                setOpenLogged(true)
                await axios.post('/join-event?invitation_link=' + props.match.params.link, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }else{
                setOpenNotLogged(true)
            }
        }
        addParticipant()
    }, []);
    return(
        <>
        <div style = {
            {
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                height: '97vh',
                width: '100vw'
            }
        } >
        <div className={classes.toolbar} />
            <InviteLoggedModal open={openLogged} setOpen={setOpenLogged}/>
            <InviteNotLoggedModal open={openNotLogged} setOpen={setOpenNotLogged}/>
        </div>
 
        </>)
})