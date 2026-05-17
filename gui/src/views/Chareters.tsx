import { Paper, CircularProgress, Typography, Tabs, Tab, Box } from "@mui/material";
import React, { useEffect } from "react";
import { getCharacters, Character } from "../services/characterApi";
import { useStore } from "../hooks";
import { selectUser } from "../reducers/selectors";
import CharacterFilters from "components/CharacterFilters";
import CharacterTab from "components/CharacterTab";
import CollectionTab from "components/CollectionTab";
import GreySpacer from "components/GreySpacer";
import TierTable from "components/TierTable";
import WarpRec from "components/WarpRec";

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
      id={`character-tabpanel-${index}`}
      aria-labelledby={`character-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `character-tab-${index}`,
    'aria-controls': `character-tabpanel-${index}`,
  };
}

export default function Chareters() {
    const [selectedCards, setSelectedCards] = React.useState<string[]>([]);
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [user] = useStore(selectUser);
    const [tabValue, setTabValue] = React.useState(0);
    
    // Filter states
    const [elementFilter, setElementFilter] = React.useState<string>('All');
    const [roleFilter, setRoleFilter] = React.useState<string>('All');
    const [pathFilter, setPathFilter] = React.useState<string>('All');

    useEffect(() => {
        fetchCharacters().then();
    }, []);

    // Initialize selectedCards with user's owned characters
    useEffect(() => {
        if (user && user.ownedCharacters && user.ownedCharacters.length > 0) {
            setSelectedCards(user.ownedCharacters);
        } else {
            setSelectedCards([]);
        }
    }, [user]);

    const fetchCharacters = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCharacters();
            setCharacters(data);
        } catch (err) {
            setError('Failed to load characters');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filter characters based on selected filters
    const filteredCharacters = characters.filter((ch) => {
        const matchesElement = elementFilter === 'All' || ch.element === elementFilter;
        const matchesRole = roleFilter === 'All' || ch.role === roleFilter;
        const matchesPath = pathFilter === 'All' || ch.path === pathFilter;
        return matchesElement && matchesRole && matchesPath;
    });

    // Get unique values for filter options
    const elementOptions = ['All', ...Array.from(new Set(characters.map(ch => ch.element)))];
    const roleOptions = ['All', ...Array.from(new Set(characters.map(ch => ch.role)))];
    const pathOptions = ['All', ...Array.from(new Set(characters.map(ch => ch.path)))];

    const clearFilters = () => {
        setElementFilter('All');
        setRoleFilter('All');
        setPathFilter('All');
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    if (loading) {
        return (
            <Paper elevation={1} sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper elevation={1} sx={{ padding: 2, height: '100dvh', backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            {/* Main Content Layout */}
            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Filter Controls */}
                <Box sx={{ width: 300, flexShrink: 0 }}>
                    <CharacterFilters 
                        elementFilter={elementFilter}
                        roleFilter={roleFilter}
                        pathFilter={pathFilter}
                        onElementFilterChange={setElementFilter}
                        onRoleFilterChange={setRoleFilter}
                        onPathFilterChange={setPathFilter}
                        onClearFilters={clearFilters}
                        elementOptions={elementOptions}
                        roleOptions={roleOptions}
                        pathOptions={pathOptions}
                    />
                </Box>
                
                {/* Tabs and Content */}
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={tabValue} 
                            onChange={handleTabChange} 
                            aria-label="character tabs"
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
                            <Tab label="Characters" {...a11yProps(0)} />
                            {user && <Tab label="Collection" {...a11yProps(1)} />}
                            {user && <Tab label="Warp Recommendations" {...a11yProps(2)}/>}
                            <Tab label="Tier List" {...a11yProps(3)}/>
                        </Tabs>
                        <GreySpacer />
                    </Box>
                    
                    <CustomTabPanel value={tabValue} index={0}>
                            <CharacterTab characters={filteredCharacters} />
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={1}>
                            <CollectionTab
                            characters={filteredCharacters} 
                            selectedCards={selectedCards}
                            setSelectedCards={setSelectedCards}
                            user={user}/>
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={2}>
                        <WarpRec/>
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={3}>
                        <TierTable/>
                    </CustomTabPanel>

                </Box>
            </Box>
        </Paper>
    )}
