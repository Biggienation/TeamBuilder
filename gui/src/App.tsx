import React from 'react';
import Router from './Router';
import Header from './components/headerComponents/Header';
import { StoreProvider } from './StoreProvider';
import { Paper } from "@mui/material";
import GreySpacer from "./components/GreySpacer";

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
          <Paper sx={{ width: 1500, maxWidth: 1500, height: '100dvh', backgroundImage: 'url("https://webstatic.hoyoverse.com/upload/op-public/2022/10/20/98abebb9cc9a28050df30d0debf0b210_1304921326218734874.png")', backgroundSize: 'cover'}} className="MainContent">
              <Header/>
              <GreySpacer/>
              <Router/>
          </Paper>
        </main>
      </div>
    </StoreProvider>
  );
};

export default App;
