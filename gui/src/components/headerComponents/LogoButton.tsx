import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';

interface LogoButtonProps {
  handleNav: (path: string) => void;
  handleCloseNavMenu: () => void;
}

export default function LogoButton({ handleNav, handleCloseNavMenu }: LogoButtonProps) {
  return (
    <Button
      onClick={() => { handleCloseNavMenu(); handleNav('/home'); }}
      variant="text"
      sx={{
        alignItems: "center",
        color: 'white',
        display: 'flex',
        flexDirection: "row",
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        border: '2px solid grey',
        padding: '28px',
        borderRadius: '4px',
        textTransform: 'none',
        minWidth: 'auto',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="span"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
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
