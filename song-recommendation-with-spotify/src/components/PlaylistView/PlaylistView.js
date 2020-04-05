import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import image from '../../assets/panda.jpg'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
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

export default function PlaylistView() {
    const classes = useStyles();
    return(
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
    )
}