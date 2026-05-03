import {Card, CardActionArea, CardContent, Grid, Paper, CircularProgress, Typography, CardMedia} from "@mui/material";
import React, { useEffect } from "react";
import { getCharacters, Character } from "../services/characterApi";

const ChHeight = { xs: 80, sm: 100, md: 125, lg: 150 }
const ChWidth = { xs: 70, sm: 90, md: 110, lg: 125 }

export default function Chareters() {
    const [selectedCards, setSelectedCards] = React.useState<string[]>([]);
    const [characters, setCharacters] = React.useState<Character[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        fetchCharacters().then();
    }, []);

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
        <Paper elevation={1} sx={{ padding: 2 }}>
            <Grid container spacing={0.5} columns={5}>
                {characters.map((ch) => (
                    <Grid key={ch.id} size={1} >
                        <Card sx={{border: '1px solid black', height: ChHeight, width: ChWidth}}>
                            <CardActionArea
                                onClick={() => {
                                    setSelectedCards((prev) =>
                                        prev.includes(ch.id) ? prev.filter((i) => i !== ch.id) : [...prev, ch.id]
                                    )
                                }}
                                data-active={selectedCards.includes(ch.id) ? '' : undefined}
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
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )}
