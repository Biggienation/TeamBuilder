import React, { useEffect } from 'react'
import {CircularProgress, Grid, Paper, Typography} from "@mui/material";
import TeamCard from "components/TeamCard";
import {getTeams, Team} from "../services/teamApi";

export default function Builder () {

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
      <Paper elevation={1} sx={{ padding: 2 }}>
    <Grid className="grid" container direction="column" alignItems="center" gap={2}>
        {teams.map((data) => (
                <TeamCard data={data} />
        ))}
    </Grid>
      </Paper>
  )
}
