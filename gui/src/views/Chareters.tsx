import {Card, CardActionArea, CardContent, Grid, Paper, CircularProgress, Typography, CardMedia, Button, Box} from "@mui/material";
import React, { useEffect } from "react";
import { getCharacters, Character } from "../services/characterApi";
import { userApi } from "../services/userApi";
import { useStore } from "../hooks";
import { selectUser } from "../reducers/selectors";
import GreenSpacer from "components/GreenSpacer";
import CharacterFilters from "components/CharacterFilters";

const ChHeight = { xs: 80, sm: 100, md: 125, lg: 150 }
const ChWidth = { xs: 70, sm: 90, md: 110, lg: 125 }

export default function Chareters() {
    const [selectedCards, setSelectedCards] = React.useState<string[]>([]);
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [saving, setSaving] = React.useState(false);
    const [user] = useStore(selectUser);
    
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

    const handleSaveOwnedCharacters = async () => {
        if (!user) {
            setError('No user logged in');
            return;
        }

        try {
            setSaving(true);
            await userApi.saveOwnedCharacters(user.id, selectedCards);
            setError(null);
            alert('Characters saved successfully!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to save owned characters';
            setError(errorMessage);
            console.error(err);
        } finally {
            setSaving(false);
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

    if (loading) {
        return (
            <Paper elevation={1} sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Paper>
        );
    }

    if (error && !saving) {
        return (
            <Paper elevation={1} sx={{ padding: 2 }}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={1} sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
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

                <Box sx={{ flex: 1 }}>
                    <Grid container spacing={0.1} columns={5}>
                        {filteredCharacters.map((ch) => (
                                <Grid key={ch.id} size={1} >
                                    <Card sx={{height: ChHeight, width: ChWidth}}>
                                        <CardActionArea
                                            onClick={() => {
                                                setSelectedCards((prev) =>
                                                    prev.includes(ch.name) ? prev.filter((i) => i !== ch.name) : [...prev, ch.name]
                                                )
                                            }}
                                            data-active={selectedCards.includes(ch.name) ? '' : undefined}
                                            sx={{
                                                height: '100%',
                                                '&[data-active]': {
                                                    backgroundColor: 'action.selected',
                                                    '&:hover': {
                                                        backgroundColor: 'action.selectedHover',
                                                    },
                                                },
                                            }}
                                        >
                                            <CardMedia
                                                sx={{ height: '70%', objectFit: 'contain' }}
                                                image={ch.imageUrl}
                                            />
                                            <CardContent>
                                                {ch.name}
                                            </CardContent>
                                            <GreenSpacer/>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={handleSaveOwnedCharacters}
                        disabled={saving || selectedCards.length === 0 || !user}
                        sx={{ backgroundColor: '#7E8C54', '&:hover': { backgroundColor: '#ABD726' } }}
                    >
                        {saving ? 'Saving...' : 'Save Characters'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    )}
