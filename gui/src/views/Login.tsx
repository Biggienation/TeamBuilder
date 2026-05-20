import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Paper, Divider, IconButton } from '@mui/material';
import { useStore } from '../hooks';
import { selectRootPath } from '../reducers/selectors';
import { userApi, LoginRequest } from '../services/userApi';

const styles = {
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        padding: '40px 48px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: '0px 30px 0px 0px',
        width: '480px',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    },
    formBox: {
        width: '100%',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            borderRadius: '2px',
            '& fieldset': { borderColor: '#ddd' },
            '&:hover fieldset': { borderColor: '#bbb' },
            '&.Mui-focused fieldset': { borderColor: '#f9b84b' },
        },
        '& .MuiInputBase-input::placeholder': { color: '#aaa', opacity: 1 },
    },
    linksBox: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 1,
    },
    linkButton: {
        color: '#f5a623',
        textTransform: 'none',
        fontWeight: 600,
        p: 0,
        minWidth: 0,
        '&:hover': { background: 'none', textDecoration: 'underline' },
    },
    submitButton: {
        mt: 2,
        mb: 2,
        py: 1.5,
        backgroundColor: '#f9c95e',
        color: '#222',
        fontWeight: 700,
        fontSize: '1rem',
        borderRadius: '2px',
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#f5b830',
            boxShadow: 'none',
        },
        '&.Mui-disabled': {
            backgroundColor: '#fde4a0',
            color: '#888',
        },
    },
    divider: {
        color: '#aaa',
        fontSize: '0.85rem',
        mb: 2,
    },
    socialBox: {
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
    },
    socialButtonApple: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#1a1a1a',
        '&:hover': { opacity: 0.85, background: '#1a1a1a' },
    },
    socialButtonFacebook: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#1877f2',
        '&:hover': { opacity: 0.85, background: '#1877f2' },
    },
    socialButtonTwitter: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#1da1f2',
        '&:hover': { opacity: 0.85, background: '#1da1f2' },
    },
    socialButtonGameCenter: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ff3b6e, #ff9f1c, #2dc76d, #007aff)',
        '&:hover': { opacity: 0.85, background: 'linear-gradient(135deg, #ff3b6e, #ff9f1c, #2dc76d, #007aff)' },
    },
};

export default function Login() {
    const [, dispatch] = useStore(selectRootPath);
    const [formData, setFormData] = useState<LoginRequest>({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await userApi.login(formData);
            dispatch({ type: 'SET_USER', payload: response.user });
            dispatch({ type: 'SET_TOKEN', payload: response.token });
            dispatch({ type: 'SET_ROOT_PATH', payload: '/home' });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container sx={styles.container}>
            <Paper sx={styles.paper} elevation={0}>

                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Team Builder
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={styles.formBox}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        placeholder="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                        variant="outlined"
                        sx={styles.textField}
                        InputLabelProps={{ shrink: false }}
                        label=""
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        placeholder="Enter password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        sx={styles.textField}
                        InputLabelProps={{ shrink: false }}
                        label=""
                    />

                    {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

                    <Box sx={styles.linksBox}>
                        <Button
                            variant="text"
                            onClick={() => dispatch({ type: 'SET_ROOT_PATH', payload: '/register' })}
                            sx={styles.linkButton}
                        >
                            Register now
                        </Button>
                        <Button variant="text" sx={styles.linkButton}>
                            Forgot password?
                        </Button>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={styles.submitButton}
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </Button>

                    <Divider sx={styles.divider}>Log in with</Divider>

                    <Box sx={styles.socialBox}>
                        <IconButton sx={styles.socialButtonApple}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.42.07 2.4.83 3.23.85.96-.04 1.87-.82 3.18-.87 1.4-.04 2.79.57 3.76 1.77-3.1 1.87-2.6 6.07.6 7.2-.52 1.37-1.13 2.67-2.77 3.93zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                            </svg>
                        </IconButton>
                        <IconButton sx={styles.socialButtonFacebook}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                            </svg>
                        </IconButton>
                        <IconButton sx={styles.socialButtonTwitter}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </IconButton>
                        <IconButton sx={styles.socialButtonGameCenter}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-3-8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-3 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                            </svg>
                        </IconButton>
                    </Box>

                </Box>
            </Paper>
        </Container>
    );
}
