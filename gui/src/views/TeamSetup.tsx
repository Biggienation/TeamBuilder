import React, { useEffect } from 'react'
import { CircularProgress, Grid, Paper, Typography, Tabs, Tab, Box, FormControlLabel, Switch } from "@mui/material";
import TeamCard from "components/TeamCard";
import { getTeams, Team } from "../services/teamApi";
import { useStore } from "../hooks";
import { selectUser } from "../reducers/selectors";

const tabs = ['General', 'Memory of Chaos', 'Pure Fiction', 'Apocalyptic Shadow', 'Anomaly Arbitration'];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

    useEffect(() => {
        fetchTeams().then();
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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Filter teams based on tab and buildable status
    const getFilteredTeams = (tabIndex: number) => {
        let filtered = teams.filter((team) => {
            // If team has no categories, show it in all tabs (fallback)
            if (!team.categories || team.categories.length === 0) {
                return true;
            }
            return team.categories.includes(tabs[tabIndex]);
        });
        if (filterBuildable && user?.ownedCharacters) {
            filtered = filtered.filter((team) => {
                // Get character names from team
                const character1 = (team.character1 as any)?.name;
                const character2 = (team.character2 as any)?.name;
                const character3 = (team.character3 as any)?.name;
                const character4 = (team.character4 as any)?.name;

                const teamCharacters = [character1, character2, character3, character4].filter(Boolean);
                
                return teamCharacters.every((charName) => 
                    user.ownedCharacters!.includes(charName)
                );

            });
        }
        
        return filtered;
    };

    if (loading) {
        return (
            <Paper elevation={1} sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper elevation={1} sx={{ padding: 2 }}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={1} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', height : '100%', overflow: 'auto' }}>
            <Box sx={{ marginBottom: 2, backgroundColor: '#808080'}}>
                <FormControlLabel
                    control={
                        <Switch 
                            checked={filterBuildable} 
                            onChange={(e) => setFilterBuildable(e.target.checked)}
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: 'white',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#7E8C54',
                                },
                            }}
                        />
                    }
                    label="Show only buildable teams"
                />
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange} 
                    aria-label="team tabs"
                    sx={{
                        '& .MuiTab-root': {
                            color: 'white',
                            '&.Mui-selected': {
                                color: 'white',
                                backgroundColor: '#7E8C54',
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#7E8C54',
                        },
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>

            {tabs.map((tab, index) => (
                <CustomTabPanel key={index} value={tabValue} index={index}>
                    <Grid className="grid" container direction="column" alignItems="center" gap={2} sx={{ padding: 2 }}>
                        {getFilteredTeams(index).length > 0 ? (
                            getFilteredTeams(index).map((data) => (
                                <TeamCard key={data.id} data={data} />
                            ))
                        ) : (
                            <Typography color="textSecondary">
                                {filterBuildable ? 'No buildable teams with your characters' : 'No teams available'}
                            </Typography>
                        )}
                    </Grid>
                </CustomTabPanel>
            ))}
        </Paper>
    )
}
