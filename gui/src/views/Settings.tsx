import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { getProfileIcons } from "../services/utilApi";
import { useStore } from "../hooks";
import { selectUser } from "../reducers/selectors";
import { userApi } from "../services/userApi";

const styles = {
    paper: {
        color: 'white',
        minHeight: '100dvh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '40px',
    },
    innerContainer: {
        maxWidth: 800,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 4,
    },
    section: {
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        padding: '32px 40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 2,
    },
    sectionTitle: {
        color: '#222',
        fontWeight: 700,
        fontSize: '1rem',
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        '&::before': { content: '"•"' },
    },
    fieldLabel: {
        color: '#888',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05rem',
    },
    fieldValue: {
        color: '#222',
        fontSize: '1rem',
        fontWeight: 500,
    },
    fieldRow: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '2px',
    },
    divider: {
        borderBottom: '1px solid #ddd',
        my: 1,
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            borderRadius: '2px',
            '& fieldset': { borderColor: '#ddd' },
            '&:hover fieldset': { borderColor: '#bbb' },
            '&.Mui-focused fieldset': { borderColor: '#f9b84b' },
        },
        '& .MuiInputBase-input': { color: '#222' },
    },
    iconGrid: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: '10px',
    },
    iconWrapper: {
        cursor: 'pointer',
        borderRadius: '50%',
        border: '2px solid transparent',
        transition: 'border 0.15s',
        '&:hover': { border: '2px solid #bbb' },
    },
    iconWrapperSelected: {
        cursor: 'pointer',
        borderRadius: '50%',
        border: '2px solid #f9c95e',
    },
    iconImg: {
        height: 70,
        width: 70,
        borderRadius: '50%',
        border: '1px solid #ddd',
        objectFit: 'cover' as const,
        display: 'block',
    },
    saveButton: {
        backgroundColor: '#f9c95e',
        color: '#222',
        fontWeight: 700,
        borderRadius: '20px',
        textTransform: 'none' as const,
        boxShadow: 'none',
        px: 4,
        py: 1,
        alignSelf: 'flex-start' as const,
        '&:hover': { backgroundColor: '#f5b830', boxShadow: 'none' },
        '&.Mui-disabled': { backgroundColor: '#fde4a0', color: '#888' },
    },
    outlinedButton: {
        color: '#222',
        borderColor: '#ccc',
        borderRadius: '20px',
        textTransform: 'none' as const,
        px: 3,
        py: 1,
        alignSelf: 'flex-start' as const,
        '&:hover': { borderColor: '#f9b84b', color: '#222', backgroundColor: 'transparent' },
    },
    statRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1,
        borderBottom: '1px solid #eee',
        '&:last-child': { borderBottom: 'none' },
    },
    statLabel: {
        color: '#555',
        fontSize: '0.9rem',
    },
    statValue: {
        color: '#222',
        fontWeight: 600,
        fontSize: '0.9rem',
    },
};

export default function Settings() {
    const [profileIcons, setProfileIcons] = React.useState<string[]>([]);
    const [selectedProfileIcon, setSelectedProfileIcon] = React.useState<string | null>(null);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [changingPassword, setChangingPassword] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [user, dispatch] = useStore(selectUser);

    async function fetchProfileIcon() {
        try {
            const data = await getProfileIcons();
            setProfileIcons(data.map((icon) => `http://localhost:8080/images/profileicon/${icon}`));
        } catch (error) {
            console.error('Error fetching profile icon:', error);
        }
    }

    async function handleSaveProfilePicture() {
        if (!user) { setError('No user logged in'); return; }
        if (!selectedProfileIcon) { setError('No profile icon selected'); return; }
        try {
            setSaving(true);
            await userApi.saveProfileIcon(user.id, selectedProfileIcon);
            dispatch({ type: 'SET_USER', payload: { ...user, profileIcon: selectedProfileIcon } });
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save profile picture');
        } finally {
            setSaving(false);
        }
    }

    async function handleChangePassword() {
        if (!user) return;
        if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
        try {
            setSaving(true);
            await userApi.changePassword(user.id, newPassword);
            setChangingPassword(false);
            setNewPassword('');
            setConfirmPassword('');
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to change password');
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => { fetchProfileIcon().then(); }, []);

    return (
        <Paper elevation={1} sx={styles.paper}>
            <Box sx={styles.innerContainer}>

                {/* Account */}
                <Box sx={styles.section}>
                    <Typography sx={styles.sectionTitle}>Account</Typography>

                    <Box sx={styles.fieldRow}>
                        <Typography sx={styles.fieldLabel}>Username</Typography>
                        <Typography sx={styles.fieldValue}>{user?.username ?? '—'}</Typography>
                    </Box>

                    <Box sx={styles.divider} />

                    <Box sx={styles.fieldRow}>
                        <Typography sx={styles.fieldLabel}>Email</Typography>
                        <Typography sx={styles.fieldValue}>{user?.email ?? '—'}</Typography>
                    </Box>

                    <Box sx={styles.divider} />

                    {!changingPassword ? (
                        <Button variant="outlined" sx={styles.outlinedButton} onClick={() => setChangingPassword(true)}>
                            Change Password
                        </Button>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <TextField
                                placeholder="New password"
                                type="password"
                                size="small"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                sx={styles.textField}
                                label=""
                                InputLabelProps={{ shrink: false }}
                            />
                            <TextField
                                placeholder="Confirm new password"
                                type="password"
                                size="small"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={styles.textField}
                                label=""
                                InputLabelProps={{ shrink: false }}
                            />
                            {error && <Typography sx={{ color: 'error.main', fontSize: '0.85rem' }}>{error}</Typography>}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="contained" sx={styles.saveButton} onClick={handleChangePassword} disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Password'}
                                </Button>
                                <Button variant="outlined" sx={styles.outlinedButton} onClick={() => { setChangingPassword(false); setError(null); }}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Statistics */}
                <Box sx={styles.section}>
                    <Typography sx={styles.sectionTitle}>Statistics</Typography>
                    <Box sx={styles.statRow}>
                        <Typography sx={styles.statLabel}>Characters Owned</Typography>
                        <Typography sx={styles.statValue}>{user?.ownedCharacters?.length ?? 0}</Typography>
                    </Box>
                    <Box sx={styles.statRow}>
                        <Typography sx={styles.statLabel}>Teams Saved</Typography>
                        <Typography sx={styles.statValue}>{user?.teams?.length ?? 0}</Typography>
                    </Box>
                </Box>

                {/* Profile Icon */}
                <Box sx={styles.section}>
                    <Typography sx={styles.sectionTitle}>Profile Icon</Typography>
                    <Box sx={styles.iconGrid}>
                        {profileIcons.map((iconUrl, index) => (
                            <Box
                                key={index}
                                sx={selectedProfileIcon === iconUrl ? styles.iconWrapperSelected : styles.iconWrapper}
                                onClick={() => setSelectedProfileIcon(iconUrl)}
                            >
                                <img src={iconUrl} alt="Profile Icon" style={styles.iconImg} />
                            </Box>
                        ))}
                    </Box>
                    {error && <Typography sx={{ color: 'error.main', fontSize: '0.85rem' }}>{error}</Typography>}
                    <Button
                        variant="contained"
                        onClick={handleSaveProfilePicture}
                        sx={styles.saveButton}
                        disabled={saving || !selectedProfileIcon}
                    >
                        {saving ? 'Saving...' : 'Save Icon'}
                    </Button>
                </Box>

                {/* Endgame Content */}
                <Box sx={styles.section}>
                    <Typography sx={styles.sectionTitle}>Endgame Content</Typography>
                </Box>

            </Box>
        </Paper>
    );
}
