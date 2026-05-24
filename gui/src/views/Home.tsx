import React from 'react';
import { LogoBanner } from '../components/LogoBanner';
import { ImageDisplay } from '../components/ImageDisplay';
import GreySpacer from "../components/GreySpacer";
import { Paper, Box } from "@mui/material";
import ActiveBannerDisplay from "../components/ActiveBannerDisplay";

const styles = {
    paper: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 2,
        padding: 2,
    },
};

export default function Home() {
    return (
        <Paper sx={styles.paper}>
            <LogoBanner />
            <GreySpacer />
            <ImageDisplay />
            <GreySpacer />
            <ActiveBannerDisplay />
        </Paper>
    );
}
