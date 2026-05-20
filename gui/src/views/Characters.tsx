import { Paper, CircularProgress, Tabs, Tab, Box } from "@mui/material";
import React, { useEffect } from "react";
import {getCharacters, Character, getRecommendedCharacters} from "../services/characterApi";
import { useStore } from "../hooks";
import { selectUser } from "../reducers/selectors";
import CharacterTab from "components/CharacterTab";
import CollectionTab from "components/CollectionTab";
import GreySpacer from "components/GreySpacer";
import TierTable from "components/TierTable";
import WarpRec from "components/WarpRec";
import CharacterFilters from "../components/CharacterFilters";

const styles = {
    paper: {
        height: '100dvh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        overflow: 'auto',
    },
    paperLoading: {
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    mainLayout: {
        display: 'flex',
        gap: 3,
    },
    filterBox: {
        width: 300,
        flexShrink: 0,
    },
    contentBox: {
        flex: 1,
        paddingTop: 2,
    },
    tabBorder: {
        borderBottom: 1,
        borderColor: 'divider',
    },
    tabs: {
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
    },
};

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

export default function Characters() {
    const [selectedCards, setSelectedCards] = React.useState<string[]>([]);
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [recommendedCharacters, setRecommendedCharacters] = React.useState<Character[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [user] = useStore(selectUser);
    const [tabValue, setTabValue] = React.useState(0);

    const [elementFilter, setElementFilter] = React.useState<string[]>([]);
    const [roleFilter, setRoleFilter] = React.useState<string[]>([]);
    const [pathFilter, setPathFilter] = React.useState<string[]>([]);

    useEffect(() => {
        fetchCharacters().then();
        fetchRecommendedCharacters().then();
    }, []);

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

    const fetchRecommendedCharacters = async () => {
        try {
            const data = await getRecommendedCharacters(user.id);
            setRecommendedCharacters(data);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredCharacters = characters.filter((ch) => {
        const matchesElement = elementFilter.length === 0 || elementFilter.includes(ch.element);
        const matchesRole = roleFilter.length === 0 || roleFilter.includes(ch.role);
        const matchesPath = pathFilter.length === 0 || pathFilter.includes(ch.path);
        return matchesElement && matchesRole && matchesPath;
    });

    const elementOptions = Array.from(new Set(characters.map(ch => ch.element)));
    const roleOptions = Array.from(new Set(characters.map(ch => ch.role)));
    const pathOptions = Array.from(new Set(characters.map(ch => ch.path)));

    const clearFilters = () => {
        setElementFilter([]);
        setRoleFilter([]);
        setPathFilter([]);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    if (loading) {
        return (
            <Paper elevation={1} sx={styles.paperLoading}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper elevation={1} sx={styles.paper}>
            <Box sx={styles.mainLayout}>
                <Box sx={styles.filterBox}>
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

                <Box sx={styles.contentBox}>
                    <Box sx={styles.tabBorder}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="character tabs"
                            sx={styles.tabs}
                        >
                            <Tab label="Characters" {...a11yProps(0)} />
                            {user && <Tab label="Collection" {...a11yProps(1)} />}
                            {user && <Tab label="Warp Recommendations" {...a11yProps(2)} />}
                            <Tab label="Tier List" {...a11yProps(3)} />
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
                            user={user}
                        />
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={2}>
                        <WarpRec characters={recommendedCharacters} />
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={3}>
                        <TierTable />
                    </CustomTabPanel>
                </Box>
            </Box>
        </Paper>
    );
}
