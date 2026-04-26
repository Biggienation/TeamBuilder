import React from 'react'
import {Grid} from "@mui/material";
import TeamCard from "components/TeamCard";

export default function Builder () {
  return (
    <Grid className="grid" container direction="column" alignItems="center" gap={2}>
        # TODO: Replace with actual team data
        <TeamCard />
        <TeamCard />
        <TeamCard />
    </Grid>
  )
}