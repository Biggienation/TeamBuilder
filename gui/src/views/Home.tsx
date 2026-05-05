import React from 'react';
import {Banner} from '../components/Banner';
import TierTable from "../components/TierTable";
import GreenSpacer from "../components/GreenSpacer";
import {Grid, Paper} from "@mui/material";
import { Label } from "@mui/icons-material";

const homeDescriptionStyles: React.CSSProperties = {
    color: '#666',
    fontSize: '16px',
};

function Home() {
    return (
        <Paper>
            <div style={{padding: '20px', textAlign: 'center', backgroundColor: '#7E8C54'}}>
                <h2 style={{color: '#333', marginBottom: '10px'}}>Welcome to TeamBuilder</h2>
                <p style={homeDescriptionStyles}> Manage and organize your teams efficiently.</p>
            </div>
            <GreenSpacer/>
            <div style={{height: "10px"}}/>
            <Banner/>

            <Grid display={'flex'} flexDirection={'row'} alignItems={'stretch'}>
                <div style={{backgroundColor: '#7E8C54', width: 50}}></div>
                <div style={{flex: 1}}>
                    <h2>Teir List</h2>
                    <TierTable/>
                </div>

            </Grid>
        </Paper>
    );
}

export default Home;
