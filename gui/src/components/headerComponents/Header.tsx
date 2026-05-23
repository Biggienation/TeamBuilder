import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useStore } from '../../hooks';
import { selectRootPath, selectUser } from '../../reducers/selectors';
import HeaderButtonFullSize from 'components/headerComponents/HeaderButtonFullSize';
import LogoButton from 'components/headerComponents/LogoButton';

const authenticatedSettings = ['Settings', 'Logout'];
const unauthenticatedSettings = ['Login'];

const styles = {
    appBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    desktopLogoBox: {
        display: { xs: 'none', md: 'flex' },
        gap: 2,
    },
    mobileMenuBox: {
        flexGrow: 1,
        display: { xs: 'flex', md: 'none' },
    },
    desktopNavBox: {
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
    },
    userBox: {
        flexGrow: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
    },
    username: {
        color: 'white',
    },
    personIcon: {
        height: 70,
        width: 70,
    },
    userIconButton: {
        p: 0,
        border: '1px solid #f9c95e',
    },
    mobileTitle: {
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    userMenu: {
        mt: '45px',
        '& .MuiPaper-root': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            borderRadius: '0px',
            padding: '8px',
            minWidth: 220,
        },
        '& .MuiList-root': {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: 0,
        },
    },
    menuItem: {
        backgroundColor: '#fff',
        borderRadius: '999px',
        justifyContent: 'center',
        padding: '10px 16px',
        '&:hover': {
            backgroundColor: '#f0f0f0',
        },
    },
    menuItemText: {
        textAlign: 'center' as const,
        fontWeight: 500,
        color: '#111',
        fontSize: '0.95rem',
    },
};

export default function Header() {
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

    return (
        <AppBar position="static" color="default" sx={styles.appBar}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={styles.desktopLogoBox}>
                        <LogoButton handleNav={handleNav} handleCloseNavMenu={handleCloseNavMenu} />
                    </Box>

                    <Box sx={styles.mobileMenuBox}>
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
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuItem onClick={() => { handleCloseNavMenu(); handleNav('/characters'); }}>
                                <Typography sx={styles.menuItemText}>Characters</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseNavMenu(); handleNav('/teamSetup'); }}>
                                <Typography sx={styles.menuItemText}>Team Setup</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={styles.desktopNavBox}>
                        <HeaderButtonFullSize
                            src="http://localhost:8080/images/icons/Profile-Transparent.png"
                            alt="Characters"
                            handleCloseNavMenu={handleCloseNavMenu}
                            handleNav={handleNav}
                            nav="/characters"
                        />
                        <HeaderButtonFullSize
                            src="http://localhost:8080/images/icons/Team-Transparent.png"
                            alt="Team Setup"
                            handleCloseNavMenu={handleCloseNavMenu}
                            handleNav={handleNav}
                            nav="/teamSetup"
                        />
                    </Box>

                    {user ? (
                        <Box sx={styles.userBox}>
                            <Typography sx={styles.username}>
                                {user.username}
                            </Typography>
                            <IconButton onClick={handleOpenUserMenu} sx={styles.userIconButton}>
                                <img src={user.profileIcon} alt="Profile" style={styles.personIcon} />
                            </IconButton>
                            <Menu
                                sx={styles.userMenu}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleSettings(setting)} sx={styles.menuItem}>
                                        <Typography sx={styles.menuItemText}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        settings.map((setting: string) => (
                            <HeaderButtonFullSize
                                key={setting}
                                src="http://localhost:8080/images/icons/NamelessHonor-Transparent.png"
                                alt={setting}
                                handleCloseNavMenu={handleCloseNavMenu}
                                handleNav={handleNav}
                                nav={'/' + setting.toLowerCase()}
                            />
                        ))
                    )}

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => { handleCloseNavMenu(); handleNav('/home'); }}
                        sx={styles.mobileTitle}
                    >
                        Team Builder
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
