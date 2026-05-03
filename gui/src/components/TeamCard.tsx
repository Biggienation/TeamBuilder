import {Card, CardActionArea, CardContent, Typography, Box, Paper, CircularProgress} from '@mui/material';
import React, {useEffect} from 'react';
import GreenSpacer from "components/GreenSpacer";
import {getTeams, Team} from "../services/teamApi";

const ChHeight = { xs: 80, sm: 100, md: 120, lg: 150 }
const ChWidth = { xs: 70, sm: 90, md: 105, lg: 125 }

export default function TeamCard() {
    const [teams, setTeams] = React.useState<Team[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() =>  {
        fetchTeams().then();
    }, []);

    const fetchTeams = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getTeams();
            setTeams(data);
        } catch (err) {
            setError('Failed to load teams');
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
        <Card elevation={5} color={"default"}>
            <GreenSpacer />
            <CardActionArea sx={{padding: 2}}>
                <CardContent sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start' }}>
                        <Card sx={{border: '1px solid black', height: ChHeight, width: ChWidth, flexShrink: 0}}/>
                        <Card sx={{border: '1px solid black', height: ChHeight, width: ChWidth, flexShrink: 0}}/>
                        <Card sx={{border: '1px solid black', height: ChHeight, width: ChWidth, flexShrink: 0}}/>
                        <Card sx={{border: '1px solid black', height: ChHeight, width: ChWidth, flexShrink: 0}}/>
                    </Box>
                    <Typography gutterBottom variant="h5" component="div">
                        Team Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Team description goes here.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
