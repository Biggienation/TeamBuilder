import React from 'react'
import {Grid, Paper} from "@mui/material";
import TeamCard from "components/TeamCard";

export default function Builder () {
  return (
      <Paper elevation={1} sx={{ padding: 2 }}>
    <Grid className="grid" container direction="column" alignItems="center" gap={2}>
        # TODO: Replace with actual team data
        <TeamCard />
        <TeamCard />
        <TeamCard />
    </Grid>
      </Paper>
  )
}
