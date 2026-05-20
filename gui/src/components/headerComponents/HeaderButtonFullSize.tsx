import React from 'react';
import {Button, Typography} from "@mui/material";

interface HeaderButtonFullSizeProps {
    src: string;
    alt: string;
    nav: string;
    handleCloseNavMenu?: () => void;
    handleNav?: (nav: string) => void;
}

const styles = {
    button: {
        my: 2,
        height: 100,
        width: 100,
        alignItems: 'center',
        color: 'white',
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        border: '1px, solid, grey',
        marginRight: 1
    }
};


export default function HeaderButtonFullSize({
                                                 src,
                                                 alt,
                                                 nav,
                                                 handleCloseNavMenu,
                                                 handleNav
                                             }: HeaderButtonFullSizeProps) {


    return (
        <Button
            key={'Characters'}
            onClick={() => {
                handleCloseNavMenu?.();
                handleNav?.(nav);
            }}
            sx={styles.button}
        >
            <img src={src} alt={alt} style={{height: 50, width: 50}}/>
            <Typography sx={{textAlign: 'center'}} fontSize={'x-small'}>{alt}</Typography>
        </Button>
    );
}
