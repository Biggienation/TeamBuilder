import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const styles = {
    button: {
        height: 100,
        width: 300,
        marginRight: 1,
        alignItems: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'row' as const,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid grey',
        borderRadius: '0px',
        textTransform: 'none' as const,
        minWidth: 'auto',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    },
    typography: {
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'white',
        textDecoration: 'none',
    },
};

interface LogoButtonProps {
    handleNav: (path: string) => void;
    handleCloseNavMenu: () => void;
}

export default function LogoButton({ handleNav, handleCloseNavMenu }: LogoButtonProps) {
    return (
        <Button
            onClick={() => {
                handleCloseNavMenu();
                handleNav('/home');
            }}
            variant="text"
            sx={styles.button}
        >
            <Typography variant="h6" component="span" sx={styles.typography}>
                Team Builder
            </Typography>
        </Button>
    );
}
