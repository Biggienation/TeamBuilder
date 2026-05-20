import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Paper, IconButton } from '@mui/material';
import { useStore } from '../hooks';
import { selectRootPath } from '../reducers/selectors';
import { userApi, RegisterRequest } from '../services/userApi';

const styles = {
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    submitButton: {
        mt: 2,
        mb: 1,
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
    loginButton: {
        color: '#f5a623',
        textTransform: 'none',
        fontWeight: 600,
        p: 0,
        minWidth: 0,
        '&:hover': { background: 'none', textDecoration: 'underline' },
    },
};

export default function Register() {
    const [, dispatch] = useStore(selectRootPath);
    const [formData, setFormData] = useState<RegisterRequest>({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
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
            await userApi.register(formData);
            dispatch({ type: 'SET_ROOT_PATH', payload: '/login' });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container sx={styles.container}>
            <Paper sx={styles.paper} elevation={0}>

                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Register
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
                        id="email"
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        value={formData.email}
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
                        placeholder="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        sx={styles.textField}
                        InputLabelProps={{ shrink: false }}
                        label=""
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleChange}
                        variant="outlined"
                        sx={styles.textField}
                        InputLabelProps={{ shrink: false }}
                        label=""
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleChange}
                        variant="outlined"
                        sx={styles.textField}
                        InputLabelProps={{ shrink: false }}
                        label=""
                    />

                    {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={styles.submitButton}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Button
                            variant="text"
                            onClick={() => dispatch({ type: 'SET_ROOT_PATH', payload: '/login' })}
                            sx={styles.loginButton}
                        >
                            Already have an account? Login
                        </Button>
                    </Box>
                </Box>

            </Paper>
        </Container>
    );
};
