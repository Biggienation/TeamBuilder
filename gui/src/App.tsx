import React from 'react';
import Router from './Router';
import Header from 'components/Header';
import { StoreProvider } from './StoreProvider';
import { Paper } from "@mui/material";
import GreenSpacer from "components/GreenSpacer";

const appStyles: React.CSSProperties = {
  textAlign: 'center',
};


const mainStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
    backgroundColor : '#f8f8f8',
    backgroundImage : 'url("https://images4.alphacoders.com/137/thumb-1920-1377271.jpg")',
    backgroundSize: 'cover',
    height: '100%'
};

const App  = () => {
  return (
    <StoreProvider>
      <div style={appStyles}>
        <header>
        </header>
        <main style={mainStyles}>
          <Paper sx={{ width: 1500, maxWidth: 1500, height: '100dvh'}} className="MainContent">
              <Header/>
              <GreenSpacer/>
              <Router/>
          </Paper>
        </main>
      </div>
    </StoreProvider>
  );
};

export default App;
