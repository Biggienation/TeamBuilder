import React from "react";

export function ImageList() {
    const bannerContainerStyles: React.CSSProperties = {
        position: 'relative',
        marginBottom: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin : '0  0 20px 0 ',
        borderBottom: 1, borderColor: 'divider',
    };

    const imageStyles: React.CSSProperties = {
        width: '80%',
        height: 'auto',
        display: 'block',
    };

    return (
        <div className="banner" style={bannerContainerStyles}>
            <img src={"http://localhost:8080/images/Sparkle-Banner.webp"} alt="Sparkle LogoBanner" style={imageStyles} />
        </div>
    );
}
