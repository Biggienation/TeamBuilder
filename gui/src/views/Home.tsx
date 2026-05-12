import React from 'react';
import {LogoBanner} from '../components/LogoBanner';
import {ImageList} from '../components/ImageList';
import TierTable from "../components/TierTable";
import GreySpacer from "../components/GreySpacer";
import {Grid, Paper} from "@mui/material";

function Spacer() {
    return <div style={{height: "10px"}}/>;
}

function Home() {
    return (
        <Paper sx={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            <LogoBanner/>
            <GreySpacer/>
            <Spacer/>
            <ImageList/>

            <Grid display={'flex'} flexDirection={'row'} alignItems={'stretch'}>
                <div style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', width: '35%'}}>
                    <h2 style={{color: '#333', textAlign: 'center'}}>Active banners</h2>
                </div>
                <div style={{flex: 1}}>
                    <h2>Teir List</h2>
                    <TierTable/>
                </div>

            </Grid>
        </Paper>
    );
}

export default Home;
