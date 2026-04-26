import {Card, CardActionArea, CardContent, Grid, Typography} from '@mui/material';
import React from 'react';

const styles = {
    card: {
        width: 400,
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
    }
}

export default function TeamCard() {
    return (
        <Card sx={styles.card}>
            <CardActionArea>
                <CardContent>
                    <Grid container direction={"row"} alignItems="center" gap={2}>
                        <Grid>

                            <div style={styles.box} />
                        </Grid>
                        <Grid>

                            <div style={styles.box} />
                        </Grid>
                        <Grid >

                            <div style={styles.box} />
                        </Grid>
                        <Grid >

                            <div style={styles.box} />
                        </Grid>
                    </Grid>
                    <Typography gutterBottom variant="h5" component="div">
                        Team Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Team description goes here.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}