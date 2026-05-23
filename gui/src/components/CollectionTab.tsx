import React from 'react';
import { Card, CardActionArea, CardMedia, Box, Typography, Button, Grid } from '@mui/material';
import { Character } from '../services/characterApi';
import { userApi } from '../services/userApi';

const styles = {
    container: {
        padding: 2,
    },
    errorText: {
        marginBottom: 2,
        color: 'error.main',
    },
    grid: {
        marginBottom: 10,
    },
    card: {
        height: { xs: 70, sm: 90, md: 110, lg: 125 },
        width: { xs: 70, sm: 90, md: 110, lg: 125 },
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        color: 'white',
        border: '1px solid grey',
        borderRadius: '4px',
        '&:hover': {
            border: '1px solid white',
        },
    },
    cardActionArea: {
        height: '100%',
        position: 'relative',
        '&[data-active]': {
            border: '1px solid #f9c95e',
            backgroundColor: '#f9c95e',
            '&:hover': {
                backgroundColor: 'action.hover',
            },
        },
    },
    cardMedia: {
        height: '100%',
        objectFit: 'contain' as const,
    },
    nameLabel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '4px 8px',
        textAlign: 'center' as const,
        fontSize: '0.875rem',
        fontWeight: 500,
    },
};

interface CollectionTabProps {
    characters: Character[];
    selectedCards: string[];
    setSelectedCards: React.Dispatch<React.SetStateAction<string[]>>;
    user: any;
}

export default function CollectionTab({ characters, selectedCards, setSelectedCards }: CollectionTabProps) {
    return (
        <Box sx={styles.container}>
            <Grid container spacing={1} columns={7} sx={styles.grid}>
                {characters.map((ch) => (
                    <Grid key={ch.id} size={1}>
                        <Card sx={styles.card}>
                            <CardActionArea
                                onClick={() =>
                                    setSelectedCards((prev) =>
                                        prev.includes(ch.name) ? prev.filter((i) => i !== ch.name) : [...prev, ch.name]
                                    )
                                }
                                data-active={selectedCards.includes(ch.name) ? '' : undefined}
                                sx={styles.cardActionArea}
                            >
                                <CardMedia sx={styles.cardMedia} image={ch.imageUrl} />
                                <Box sx={styles.nameLabel}>{ch.name}</Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
