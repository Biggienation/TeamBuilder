import React, { useEffect } from 'react'
import {
    CircularProgress, Grid, Paper, Typography, Tabs, Tab, Box,
    FormControlLabel, Switch, Button, Select, MenuItem, FormControl,
    InputLabel, SelectChangeEvent, TextField
} from "@mui/material";
import TeamCard from "components/TeamCard";
import { getTeams, Team, reportTeam } from "../services/teamApi";
import { useStore } from "../hooks";
import { selectUser } from "../reducers/selectors";
import { Character, getCharacters } from "../services/characterApi";

const tabs = ['General', 'Memory of Chaos', 'Pure Fiction', 'Apocalyptic Shadow', 'Anomaly Arbitration'];
const selectableTabs = tabs.filter((tab) => tab !== 'General');

const styles = {
    paper: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100%',
        overflow: 'auto',
    },
    paperLoading: {
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
    },
    filterBar: {
        padding: '8px 16px',
        backgroundColor: '#d8d8d8',
        borderBottom: '1px solid #bbb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
    },
    switch: {
        '& .MuiSwitch-switchBase.Mui-checked': { color: '#f9c95e' },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#f9c95e' },
    },
    filterLabel: {
        color: '#222',
        fontWeight: 500,
    },
    tabBorder: {
        borderBottom: 1,
        borderColor: 'divider',
    },
    tabs: {
        '& .MuiTab-root': {
            color: 'white',
            '&.Mui-selected': { color: 'white', backgroundColor: '#7E8C54' },
        },
        '& .MuiTabs-indicator': { backgroundColor: '#7E8C54' },
    },
    grid: {
        padding: 2,
        justifyContent: 'center',
    },
    emptyText: {
        color: 'white',
        padding: 4,
        textAlign: 'center' as const,
    },
    reportBox: {
        backgroundColor: '#f0f0f0',
        border: '1px solid #bbb',
        borderRadius: '6px',
        margin: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 2,
    },
    reportTitle: {
        color: '#222',
        fontWeight: 700,
        fontSize: '1rem',
        mb: 1,
    },
    reportGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
    },
    select: {
        backgroundColor: '#fff',
        borderRadius: '2px',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#bbb' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f9b84b' },
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
        '& .MuiInputLabel-root': { color: '#888' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#f9b84b' },
    },
    reportActions: {
        display: 'flex',
        gap: 1,
        mt: 1,
    },
    submitButton: {
        backgroundColor: '#f9c95e',
        color: '#222',
        fontWeight: 700,
        borderRadius: '20px',
        textTransform: 'none' as const,
        boxShadow: 'none',
        px: 3,
        '&:hover': { backgroundColor: '#f5b830', boxShadow: 'none' },
        '&.Mui-disabled': { backgroundColor: '#fde4a0', color: '#888' },
    },
    cancelButton: {
        color: '#222',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: '20px',
        textTransform: 'none' as const,
        px: 3,
        '&:hover': { borderColor: '#f9b84b', backgroundColor: 'transparent' },
    },
    reportButton: {
        color: '#222',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: '20px',
        textTransform: 'none' as const,
        px: 3,
        '&:hover': { borderColor: '#aaa', backgroundColor: 'transparent' },
    },
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface ReportForm {
    name: string;
    character1: string;
    character2: string;
    character3: string;
    character4: string;
    category: string;
}

const emptyForm: ReportForm = {
    name: '',
    character1: '',
    character2: '',
    character3: '',
    character4: '',
    category: '',
};

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`builder-tabpanel-${index}`}
            aria-labelledby={`builder-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `builder-tab-${index}`,
        'aria-controls': `builder-tabpanel-${index}`,
    };
}

export default function TeamSetup() {
    const [teams, setTeams] = React.useState<Team[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [tabValue, setTabValue] = React.useState(0);
    const [filterBuildable, setFilterBuildable] = React.useState(false);
    const [user] = useStore(selectUser);
    const [reporting, setReporting] = React.useState(false);
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [submitting, setSubmitting] = React.useState(false);
    const [reportForm, setReportForm] = React.useState<ReportForm>(emptyForm);

    useEffect(() => {
        fetchTeams().then();
        fetchCharacters().then();
    }, []);

    const fetchTeams = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getTeams();
            setTeams(data);
        } catch (err) {
            setError('Failed to load teams');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCharacters = async () => {
        try {
            const data = await getCharacters();
            setCharacters(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleReportChange = (field: keyof ReportForm) => (e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
        setReportForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const selectedCharacters = [
        reportForm.character1,
        reportForm.character2,
        reportForm.character3,
        reportForm.character4,
    ].filter(Boolean);

    const availableCharacters = (currentField: keyof ReportForm) =>
        characters.filter((ch) => {
            const otherSelected = selectedCharacters.filter((name) => name !== reportForm[currentField]);
            return !otherSelected.includes(ch.name);
        });

    const handleReport = async () => {
        const { name, character1, character2, character3, character4, category } = reportForm;
        if (!name || !character1 || !character2 || !character3 || !character4 || !category) return;
        try {
            setSubmitting(true);
            await reportTeam(user.id, { name, character1, character2, character3, character4, category });
            setReporting(false);
            setReportForm(emptyForm);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const getFilteredTeams = (tabIndex: number) => {
        let filtered = teams.filter((team) => {
            if (!team.categories || team.categories.length === 0) return true;
            return team.categories.includes(tabs[tabIndex]);
        });

        if (filterBuildable && user?.ownedCharacters && user.ownedCharacters.length > 0) {
            filtered = filtered.filter((team) => {
                const teamCharacters = [
                    team.character1?.name,
                    team.character2?.name,
                    team.character3?.name,
                    team.character4?.name,
                ].filter(Boolean) as string[];
                return teamCharacters.every((charName) => user.ownedCharacters!.includes(charName));
            });
        }

        return filtered.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    };

    const isFormValid = reportForm.name &&
        reportForm.character1 && reportForm.character2 &&
        reportForm.character3 && reportForm.character4 &&
        reportForm.category;

    const characterSelect = (label: string, field: 'character1' | 'character2' | 'character3' | 'character4') => (
        <FormControl fullWidth size="small">
            <InputLabel>{label}</InputLabel>
            <Select
                value={reportForm[field]}
                onChange={handleReportChange(field) as (e: SelectChangeEvent) => void}
                sx={styles.select}
                label={label}
            >
                {availableCharacters(field).map((ch) => (
                    <MenuItem key={ch.id} value={ch.name}>{ch.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    if (loading) {
        return (
            <Paper elevation={1} sx={styles.paperLoading}>
                <CircularProgress />
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper elevation={1} sx={styles.paperLoading}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={1} sx={styles.paper}>

            {user && (<Box sx={styles.filterBar}>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={filterBuildable}
                                onChange={(e) => setFilterBuildable(e.target.checked)}
                                sx={styles.switch}
                            />
                        }
                        label={<Typography sx={styles.filterLabel}>Show only buildable teams</Typography>}
                    />

                <Button variant="outlined" onClick={() => setReporting((prev) => !prev)} sx={styles.reportButton}>
                    {reporting ? 'Cancel' : 'Report a team'}
                </Button>
            </Box>)}

            {reporting && (
                <Box sx={styles.reportBox}>
                    <Typography sx={styles.reportTitle}>• Report a Team</Typography>

                    <TextField
                        label="Team Name"
                        size="small"
                        fullWidth
                        value={reportForm.name}
                        onChange={handleReportChange('name') as (e: React.ChangeEvent<HTMLInputElement>) => void}
                        sx={styles.textField}
                    />

                    <Box sx={styles.reportGrid}>
                        {characterSelect('Character 1', 'character1')}
                        {characterSelect('Character 2', 'character2')}
                        {characterSelect('Character 3', 'character3')}
                        {characterSelect('Character 4', 'character4')}
                    </Box>

                    <FormControl fullWidth size="small">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={reportForm.category}
                            onChange={handleReportChange('category') as (e: SelectChangeEvent) => void}
                            sx={styles.select}
                            label="Category"
                        >
                            {selectableTabs.map((tab) => (
                                <MenuItem key={tab} value={tab}>{tab}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={styles.reportActions}>
                        <Button
                            variant="contained"
                            onClick={handleReport}
                            sx={styles.submitButton}
                            disabled={submitting || !isFormValid}
                        >
                            {submitting ? 'Submitting...' : 'Submit'}
                        </Button>
                        <Button variant="outlined" onClick={() => { setReporting(false); setReportForm(emptyForm); }} sx={styles.cancelButton}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )}

            <Box sx={styles.tabBorder}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="team tabs" sx={styles.tabs}>
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>

            {tabs.map((tab, index) => (
                <CustomTabPanel key={index} value={tabValue} index={index}>
                    {getFilteredTeams(index).length > 0 ? (
                        <Grid container spacing={2} sx={styles.grid}>
                            {getFilteredTeams(index).map((data) => (
                                <Grid key={data.id}>
                                    <TeamCard data={data} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography sx={styles.emptyText}>
                            {filterBuildable ? 'No buildable teams with your characters' : 'No teams available'}
                        </Typography>
                    )}
                </CustomTabPanel>
            ))}

        </Paper>
    );
}
