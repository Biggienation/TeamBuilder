import {Card, CardActionArea, CardContent, Grid, Paper} from "@mui/material";
import React from "react";

const ChHeight = { xs: 80, sm: 100, md: 125, lg: 150 }
const ChWidth = { xs: 70, sm: 90, md: 110, lg: 125 }

const CH = [
    { name: 'Ch1', id: 1},
    { name: 'Ch2', id: 2},
    { name: 'Ch3', id: 3},
    { name: 'Ch4', id: 4},
    { name: 'Ch5', id: 5},
    { name: 'Ch6', id: 6},
    { name: 'Ch7', id: 7},
]


export default function Chareters() {
    const [selectedCard, setSelectedCard] = React.useState(0);
    // Should be add to list and not selected card

   return ( <Paper elevation={1} sx={{ padding: 2 }}>
        <Grid container spacing={0.5} >
            {CH.map((ch, index) => (
                <Grid key={ch.id} size={1} >
                    <Card sx={{border: '1px solid black', height: ChHeight, width: ChWidth}}>
                        <CardActionArea
                            onClick={() => setSelectedCard(index)}
                            data-active={selectedCard === index ? '' : undefined}
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent>
                                {ch.name}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                    ))}

        </Grid>
    </Paper>
   )}