import {Card, CardActionArea, CardContent, Typography, Box, CardMedia} from '@mui/material';
import React from 'react';
import GreySpacer from "../components/GreySpacer";
import {Team} from "../services/teamApi";

const Square = {xs: 70, sm: 90, md: 105, lg: 125}

const styles = {
    card: {
        height: Square, width: Square, cursor: 'pointer' ,
        position: 'relative',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        color: 'white',
        border: '2px solid grey',
        borderRadius: '4px',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '4px 8px',
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 500,
    },
    media: {
        height: '100%',
        objectFit: 'contain'
    }
} as const;

interface TeamCardProps {
    data?: Team
}

export default function TeamCard({data}: TeamCardProps) {
    return (
        <Card elevation={5} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'white', border: '2px solid grey', borderRadius: '4px'}}>
            <GreySpacer/>
            <CardActionArea sx={{padding: 2}}>
                <CardContent sx={{padding: 0, display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-start'}}>
                        <Card sx={styles.card}>
                            <CardMedia
                                sx={styles.media}
                                image={data?.character1.imageUrl}
                            />
                            <Box sx={styles.box}>
                                {data?.character1.name}
                            </Box>
                        </Card>
                        <Card sx={styles.card}>
                            <CardMedia
                                sx={styles.media}
                                image={data?.character2.imageUrl}
                            />
                            <Box sx={styles.box}>
                                {data?.character2.name}
                            </Box>
                        </Card>
                        <Card sx={styles.card}>
                            <CardMedia
                                sx={styles.media}
                                image={data?.character3.imageUrl}
                            />
                            <Box sx={styles.box}>
                                {data?.character3.name}
                            </Box>
                        </Card>
                        <Card sx={styles.card}>
                            <CardMedia
                                sx={styles.media}
                                image={data?.character4.imageUrl}
                            />
                            <Box sx={styles.box}>
                                {data?.character4.name}
                            </Box>
                        </Card>
                    </Box>
                    <Typography gutterBottom variant="h5" component="div">
                        {data ? data.name : 'Team Name'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data ? data.description : 'Team Description'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
