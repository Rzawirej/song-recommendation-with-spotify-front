import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import COLOR from '../assets/colors'

const useStyles = makeStyles((theme) => ({
    div:{
        textAlign: 'center',
    },
    button: {
        minWidth: 304,
        background: COLOR.pink,
        marginTop: '20px',
        borderRadius: 50,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
}));

export default withRouter(function NotFound(props){
    const classes = useStyles();
    const handleSubmit = async () => {
        props.history.push('/event');
    }
    return(
        <div className={classes.div}>
            <Typography variant="h5" color="textPrimary">
                Taka strona nie istnieje
            </Typography>
            <Button
                className={classes.button}
                variant="outlined"
                onClick={handleSubmit}
                >
                Wróć
            </Button>
        </div>
    )
})

