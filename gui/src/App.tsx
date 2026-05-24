import React from 'react';
import Router from './Router';
import Header from './components/headerComponents/Header';
import { StoreProvider } from './StoreProvider';
import { Paper, Box } from "@mui/material";

const styles = {
    app: {
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        backgroundImage: 'url("http://localhost:8080/images/thumb-1920-1377271.jpg")',
        backgroundSize: '100% 100%',
    } as React.CSSProperties,
    paper: {
        width: 1500,
        maxWidth: 1500,
        height: '100dvh',
        backgroundImage: 'url("https://images.steamusercontent.com/ugc/2336874278437906617/309702027B27C04C3935E7A74E47C518C42F6C37/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column' as const,
    },
};

export default function App() {
    return (
        <StoreProvider>
            <div style={styles.app}>
                <Paper sx={styles.paper} className="MainContent">
                    <Header />
                    <Box sx={styles.content}>
                        <Router />
                    </Box>
                </Paper>
            </div>
        </StoreProvider>
    );
};
