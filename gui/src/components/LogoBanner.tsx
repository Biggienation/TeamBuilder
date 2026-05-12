import { Box } from "@mui/material";
import React from "react";
export function LogoBanner() {

    const styles = {
        description: {
            color: 'rgb(160, 168, 184)',
            fontSize: '16px',
        },
        container: {
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: 'rgb(20, 27, 45, 0.9)'
        },
        textContainer: {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
        },
        header: {
            color: '#E8E8E8',
            marginBottom: '10px'
        }
    } as const;

    return (
      <Box sx={styles.container}>
          <img src={"http://localhost:8080/images/HSR-Logo.webp"} alt={'HSRLogo'}/>
          <span style={{width: 30}}/>
          <div style={styles.textContainer}>
              <h2 style={styles.header}>
                  Welcome to HSR Team Builder
              </h2>
              <p style={styles.description}>
                  Check the best team options for you.
              </p>
          </div>
      </Box>
  );
}
