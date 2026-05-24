import React from 'react';
import { Card, CardActionArea, CardMedia, Box, Grid } from '@mui/material';
import { Character } from '../services/characterApi';
import { useStore } from '../hooks';
import { selectRootPath } from '../reducers/selectors';

const styles = {
    container: {
        padding: 2,
    },
    grid: {
        paddingBottom: 10,
        overflow: 'auto',
        height: 'calc(100dvh - 200px)',
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
        '&:hover': {
            backgroundColor: 'action.hover',
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

interface CharacterTabProps {
    characters: Character[];
}

export default function CharacterTab({ characters }: CharacterTabProps) {
    const [, dispatch] = useStore(selectRootPath);

    const handleCharacterClick = (characterId: string) => {
        dispatch({ type: 'SET_ROOT_PATH', payload: `/character/${characterId}` });
    };

    return (
        <Box sx={styles.container}>
            <Grid container spacing={1} columns={7} sx={styles.grid}>
                {characters.map((ch) => (
                    <Grid key={ch.id} size={1}>
                        <Card sx={styles.card}>
                            <CardActionArea onClick={() => handleCharacterClick(ch.id)} sx={styles.cardActionArea}>
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
