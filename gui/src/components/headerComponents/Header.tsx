import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useStore } from '../../hooks';
import { selectRootPath, selectUser } from '../../reducers/selectors';
import AdbIcon from '@mui/icons-material/Adb';
import {grey} from "@mui/material/colors";
import {createTheme} from "@mui/material";

import HeaderButtonFullSize from 'components/headerComponents/HeaderButtonFullSize';

const authenticatedSettings = ['Settings', 'Logout'];
const unauthenticatedSettings = ['Login', 'Register'];

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
    },
});

function Header() {
  const [, dispatch] = useStore(selectRootPath);
  const [user] = useStore(selectUser);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleNav = (path: string) => {
    dispatch({ type: 'SET_ROOT_PATH', payload: path });
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'SET_ROOT_PATH', payload: '/home' });
    handleCloseUserMenu();
  };

  const handleSettings = (setting: string) => {
    if (setting === 'Logout') {
      handleLogout();
    } else {
      handleNav('/' + setting.toLowerCase());
      handleCloseUserMenu();
    }
  };

  const settings = user ? authenticatedSettings : unauthenticatedSettings;

    // @ts-ignore
    return (
    <AppBar position="static" color={'default'} sx={{backgroundColor: 'rgba(0, 0, 0, 0.9)',}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <div style={{ alignItems: "center", color: 'white', display: 'flex', flexDirection: "row", backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '2px, solid, grey', marginRight: 9, padding: 28, borderRadius: 4}}>
          <Typography
              onClick={() => { handleCloseNavMenu(); handleNav('/home'); }}
            variant="h6"
            noWrap
            component="a"
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
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </div>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <MenuItem key={'Characters'} onClick={() => { handleCloseNavMenu(); handleNav('/characters'); }}>
                  <Typography sx={{ textAlign: 'center' }}>{'Characters'}</Typography>
                </MenuItem>
                <MenuItem key={'TeamSetup'} onClick={() => { handleCloseNavMenu(); handleNav('/teamSetup'); }}>
                    <Typography sx={{ textAlign: 'center' }}>{'Team Setup'}</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <HeaderButtonFullSize src={"http://localhost:8080/images/icons/Profile-Transparent.png"} alt={'Characters'}
                                    handleCloseNavMenu={handleCloseNavMenu} handleNav={handleNav} nav={'/characters'} />
              <HeaderButtonFullSize src={"http://localhost:8080/images/icons/Team-Transparent.png"} alt={'Team Setup'}
                                    handleCloseNavMenu={handleCloseNavMenu} handleNav={handleNav} nav={'/teamSetup'} />
          </Box>
            { user ? <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ...(user ? { border: '2px solid #7E8C54' } : {}) }}>
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSettings(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> : settings.map((setting : string) => (
                <HeaderButtonFullSize src={"http://localhost:8080/images/icons/Team-Transparent.png"} alt={setting}
                                      handleCloseNavMenu={handleCloseNavMenu} handleNav={handleNav} nav={'/' + setting.toLowerCase()} />
            ))}

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
              onClick={() => { handleCloseNavMenu(); handleNav('/home'); }}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Team Builder
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
