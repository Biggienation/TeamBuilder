import React from 'react';
import { Button, Typography } from "@mui/material";

const styles = {
    button: {
        my: 2,
        height: 100,
        width: 100,
        alignItems: 'center',
        color: 'white',
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '0px',
        border: '1px solid grey',
        marginRight: 1,
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    },
    image: {
        height: 50,
        width: 50,
    },
    label: {
        textAlign: 'center' as const,
        fontSize: 'x-small',
    },
};

interface HeaderButtonFullSizeProps {
    src: string;
    alt: string;
    nav: string;
    handleCloseNavMenu?: () => void;
    handleNav?: (nav: string) => void;
}

export default function HeaderButtonFullSize({
                                                 src,
                                                 alt,
                                                 nav,
                                                 handleCloseNavMenu,
                                                 handleNav,
                                             }: HeaderButtonFullSizeProps) {
    return (
        <Button
            onClick={() => {
                handleCloseNavMenu?.();
                handleNav?.(nav);
            }}
            sx={styles.button}
        >
            <img src={src} alt={alt} style={styles.image} />
            <Typography sx={styles.label}>{alt}</Typography>
        </Button>
    );
}
