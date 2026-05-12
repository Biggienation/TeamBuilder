import React from 'react';
import {LogoBanner} from '../components/LogoBanner';
import {ImageList} from '../components/ImageList';
import TierTable from "../components/TierTable";
import GreySpacer from "../components/GreySpacer";
import {Paper} from "@mui/material";
import ActiveBannerDisplay from "../components/ActiveBannerDisplay";

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
            <GreySpacer/>
            <ActiveBannerDisplay/>
            <TierTable/>
        </Paper>
    );
}

export default Home;
