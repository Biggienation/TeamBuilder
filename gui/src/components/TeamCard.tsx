import {Card, CardActionArea, CardContent, Typography, Box, CardMedia} from '@mui/material';
import React from 'react';
import GreySpacer from "../components/GreySpacer";
import {Team} from "../services/teamApi";

const ChHeight = {xs: 80, sm: 100, md: 120, lg: 150}
const ChWidth = {xs: 70, sm: 90, md: 105, lg: 125}

interface TeamCardProps {
    data?: Team
}

export default function TeamCard({data}: TeamCardProps) {
    return (
        <Card elevation={5} color={"default"}>
            <GreySpacer/>
            <CardActionArea sx={{padding: 2}}>
                <CardContent sx={{padding: 0, display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-start'}}>
                        <Card sx={{height: ChHeight, width: ChWidth, flexShrink: 0}}>
                            <CardMedia
                                sx={{ height: '70%', objectFit: 'contain' }}
                                image={data?.character1.imageUrl}
                            />
                            <CardContent>
                                {data?.character1.name}
                            </CardContent>
                        </Card>
                        <Card sx={{height: ChHeight, width: ChWidth, flexShrink: 0}}>
                            <CardMedia
                                sx={{ height: '70%', objectFit: 'contain' }}
                                image={data?.character2.imageUrl}
                            />
                            <CardContent>
                                {data?.character2.name}
                            </CardContent>
                        </Card>
                        <Card sx={{height: ChHeight, width: ChWidth, flexShrink: 0}}>
                            <CardMedia
                                sx={{ height: '70%', objectFit: 'contain' }}
                                image={data?.character3.imageUrl}
                            />
                            <CardContent>
                                {data?.character3.name}
                            </CardContent>
                        </Card>
                        <Card sx={{height: ChHeight, width: ChWidth, flexShrink: 0}}>
                            <CardMedia
                                sx={{ height: '70%', objectFit: 'contain' }}
                                image={data?.character4.imageUrl}
                            />
                            <CardContent>
                                {data?.character4.name}
                            </CardContent>
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
