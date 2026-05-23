import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Character } from '../services/characterApi';
import { useStore } from '../hooks';
import { selectRootPath } from '../reducers/selectors';
import React from "react";

const rankConfig = [
    { elevation: 12, fontSize: '1.1rem' },
    { elevation: 8,  fontSize: '1rem'   },
    { elevation: 6,  fontSize: '0.9rem' },
    { elevation: 4,  fontSize: '0.8rem' },
    { elevation: 2,  fontSize: '0.8rem' },
];

const ChHeight = { xs: 105, sm: 135, md: 165, lg: 225 };
const ChWidth  = { xs: 70,  sm: 90,  md: 110, lg: 150  };

const styles = {
    container: {
        padding: 2,
    },
    grid: {
        marginBottom: 10,
        justifyContent: 'center',
    },
    cardWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        height: ChHeight,
        width: ChWidth,
        cursor: 'pointer',
        backgroundColor: '#d0d0d0',
        color: '#222',
        border: '1px solid #bbb',
        borderRadius: '6px',
        position: 'relative',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': {
            transform: 'translateY(-4px)',
            backgroundColor: '#e0e0e0',
        },
    },
    cardActionArea: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'flex-end',
    },
    cardMedia: {
        flex: 1,
        objectFit: 'contain' as const,
    },
    cardContent: {
        padding: '6px 8px',
        backgroundColor: 'rgba(0,0,0,0.08)',
        width: '100%',
    },
    characterName: {
        fontWeight: 600,
        color: '#111',
        textAlign: 'center' as const,
        lineHeight: 1.2,
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    badge: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: 'rgba(0,0,0,0.45)',
        color: '#fff',
        borderRadius: '50%',
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 700,
        zIndex: 1,
    },
};

interface WarpRecProps {
    characters: Character[];
}

export default function WarpRec({ characters }: WarpRecProps) {
    const [, dispatch] = useStore(selectRootPath);

    const handleCharacterClick = (characterId: string) => {
        dispatch({ type: 'SET_ROOT_PATH', payload: `/character/${characterId}` });
    };

    return (
        <Box sx={styles.container}>
            <Grid container spacing={2} columns={5} sx={styles.grid}>
                {characters.slice(0, 5).map((ch, index) => (
                    <Grid key={ch.id} size={1} sx={styles.cardWrapper}>
                        <Card elevation={rankConfig[index].elevation} sx={styles.card}>

                            <Box sx={styles.badge}>
                                {index + 1}
                            </Box>

                            <CardActionArea onClick={() => handleCharacterClick(ch.id)} sx={styles.cardActionArea}>
                                <CardMedia
                                    sx={styles.cardMedia}
                                    image={ch.imageUrl}
                                    component="img"
                                />
                                <CardContent sx={styles.cardContent}>
                                    <Typography sx={{ ...styles.characterName, fontSize: rankConfig[index].fontSize }}>
                                        {ch.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
