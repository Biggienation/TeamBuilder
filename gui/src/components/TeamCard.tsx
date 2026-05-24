import {Card, CardActionArea, CardContent, Typography, Box, CardMedia} from '@mui/material';
import React from 'react';
import GreySpacer from "../components/GreySpacer";
import {Team} from "../services/teamApi";

const Square = {xs: 70, sm: 90, md: 105, lg: 125};

const styles = {
    outerCard: {
        backgroundColor: '#e0e0e0',
        color: '#222',
        border: '1px solid #bbb',
        borderRadius: '6px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    },
    card: {
        height: Square,
        width: Square,
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: '#e0e0e0',
        color: '#222',
        borderRadius: '4px',
        '&:hover': { backgroundColor: '#c4c4c4' },
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '4px 8px',
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#fff',
    },
    media: {
        height: '100%',
        objectFit: 'contain',
    },
    cardActionArea: {
        padding: 2,
    },
    cardContent: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 2,
    },
    characterRow: {
        display: 'flex',
        gap: 1,
        justifyContent: 'flex-start',
    },
    teamName: {
        color: '#111',
    },
    teamDescription: {
        color: '#555',
    },
} as const;

interface TeamCardProps {
    data?: Team;
}

export default function TeamCard({ data }: TeamCardProps) {
    return (
        <Card elevation={5} sx={styles.outerCard}>
            <GreySpacer />
            <CardActionArea sx={styles.cardActionArea}>
                <CardContent sx={styles.cardContent}>
                    <Box sx={styles.characterRow}>
                        {[data?.character1, data?.character2, data?.character3, data?.character4].map((char, i) => (
                            <Card key={i} sx={styles.card}>
                                <CardMedia sx={styles.media} image={char?.imageUrl} />
                                <Box sx={styles.box}>{char?.name}</Box>
                            </Card>
                        ))}
                    </Box>
                    <Typography gutterBottom variant="h5" sx={styles.teamName}>
                        {data ? data.name : 'Team Name'}
                    </Typography>
                    <Typography variant="body2" sx={styles.teamDescription}>
                        {data ? data.description : 'Team Description'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
