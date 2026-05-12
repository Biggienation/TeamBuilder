import React from "react";
export function LogoBanner() {

    const styles = {
        description: {
            color: 'rgb(160, 168, 184)',
            fontSize: '16px',
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: 'rgb(20, 27, 45, 0.9)'
        },
        textContainer: {
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#141B2D'
        },
        header: {
            color: '#E8E8E8',
            marginBottom: '10px'
        }
    } as const;

    return (
      <div style={styles.container}>
          <img src={"http://localhost:8080/images/HSR-Logo.webp"} alt={'HSRLogo'}/>
          <div style={styles.textContainer}>
              <h2 style={styles.header}>
                  Welcome to HSR Team Builder
              </h2>
              <p style={styles.description}>
                  Check the best team options for you.
              </p>
          </div>
      </div>
  );
}
