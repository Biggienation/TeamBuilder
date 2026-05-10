import React from 'react';
import {Banner} from '../components/Banner';
import TierTable from "../components/TierTable";
import GreySpacer from "@components/GreySpacer";
import {Grid, Paper} from "@mui/material";
// @ts-ignore
import gameLogo from "../resources/Game-Logo.webp";


const homeDescriptionStyles: React.CSSProperties = {
    color: '#666',
    fontSize: '16px',
};

function Home() {
    return (
        <Paper sx={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px', textAlign: 'center', backgroundColor: '#141B2D'}}>
                <img src={gameLogo} alt={'GameLogo'}/>
            <div style={{padding: '20px', textAlign: 'center', backgroundColor: '#141B2D'}}>
                <h2 style={{color: '#E8E8E8', marginBottom: '10px'}}>Welcome to TeamBuilder</h2>
                <p style={homeDescriptionStyles}> Manage and organize your teams efficiently.</p>
            </div>
            </div>
            <GreySpacer/>
            <div style={{height: "10px"}}/>
            <Banner/>

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
