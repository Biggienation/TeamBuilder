import React from 'react';
import Router from './Router';
import Header from 'components/Header';
import { StoreProvider } from './StoreProvider';
import { Paper } from "@mui/material";

const appStyles: React.CSSProperties = {
  textAlign: 'center',
};


const mainStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const App  = () => {
  return (
    <StoreProvider>
      <div style={appStyles}>
        <header>
          <Header />
        </header>
        <main style={mainStyles}>
          <Paper elevation={3} sx={{ width: 1500, maxWidth: 1500, height: '100dvh'}} className="MainContent">
          <Router/>
          </Paper>
        </main>
      </div>
    </StoreProvider>
  );
};

export default App;
