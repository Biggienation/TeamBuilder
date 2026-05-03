import React from 'react';
import {Banner} from '../components/Banner';
import TierTable from "../components/TierTable";
import GreenSpacer from "../components/GreenSpacer";

const homeContainerStyles: React.CSSProperties = {
  padding: '20px',
  textAlign: 'center',
};

const homeTitleStyles: React.CSSProperties = {
  color: '#333',
  marginBottom: '10px',
};

const homeDescriptionStyles: React.CSSProperties = {
  color: '#666',
  fontSize: '16px',
};

function Home() {
  return (
      <>
        <Banner/>

          <GreenSpacer/>
          <div style={{margin : "10px"}}/>
        <div style={homeContainerStyles}>
          <h2 style={homeTitleStyles}>Welcome to TeamBuilder</h2>
          <p style={homeDescriptionStyles}> Manage and organize your teams efficiently.</p>
        </div>

          <GreenSpacer/>
          <div style={{margin : "10px"}}/>

        <TierTable/>
      </>
  );
}

export default Home;
