import React from 'react';
import Router from './Router';
import Header from './views/Header';
import { StoreProvider } from './StoreProvider';

const appStyles: React.CSSProperties = {
  textAlign: 'center',
};


const mainStyles: React.CSSProperties = {
  padding: '20px',
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
          <div style={{maxWidth: 1000, maxHeight: 'auto', border: '1px solid black'}} className="MainContent">
          <Router/>
          </div>
        </main>
      </div>
    </StoreProvider>
  );
};

export default App;
