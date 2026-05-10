import React from 'react';
import { Button, Typography } from "@mui/material";

interface HeaderButtonFullSizeProps {
    src : string;
    alt: string;
    nav?: string;
    handleCloseNavMenu?: () => void;
    handleNav? : (nav :string) => void;
}

export default function HeaderButtonFullSize( { src, alt, nav, handleCloseNavMenu, handleNav } : HeaderButtonFullSizeProps) {
  return (
<Button
    key={'Characters'}
    onClick={() => { handleCloseNavMenu?.(); handleNav?.(nav); }}
    sx={{ my: 2, color: 'white', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '2px, solid, grey', marginRight: 1}}
>
  <img src={src} alt={alt} style={{ height: 50, width: 50}}/>
  <Typography sx={{ textAlign: 'center' }} fontSize={'small'}>{'Characters'}</Typography>
</Button>
    );
}
