import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface LogoButtonProps {
    handleNav: (path: string) => void;
    handleCloseNavMenu: () => void;
}

export default function LogoButton({handleNav, handleCloseNavMenu}: LogoButtonProps) {
    return (
        <Button
            onClick={() => {
                handleCloseNavMenu();
                handleNav('/home');
            }}
            variant="text"
            sx={{
                height: 100,
                width: 300,
                marginRight: 1,
                alignItems: "center",
                color: 'white',
                display: 'flex',
                flexDirection: "row",
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid grey',
                borderRadius: '4px',
                textTransform: 'none',
                minWidth: 'auto',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                },
            }}
        >
            <Typography
                variant="h6"
                component="span"
                sx={{
                    mr: 2,
                    display: {xs: 'none', md: 'flex'},
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                    textDecoration: 'none',
                }}
            >
                Team Builder
            </Typography>
        </Button>
    );
}
