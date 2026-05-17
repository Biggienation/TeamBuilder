import React from 'react';
import { Card, CardActionArea, CardContent, Grid, CardMedia, Box } from '@mui/material';
import GreySpacer from '../components/GreySpacer';
import { Character } from '../services/characterApi';
import { useStore } from '../hooks';
import { selectRootPath } from '../reducers/selectors';

interface CharacterTabProps {
  characters: Character[];
}

const ChHeight = { xs: 80, sm: 100, md: 125, lg: 150 }
const ChWidth = { xs: 70, sm: 90, md: 110, lg: 125 }

export default function CharacterTab({ characters }: CharacterTabProps) {
  const [, dispatch] = useStore(selectRootPath);

  const handleCharacterClick = (characterId: string) => {
    dispatch({ type: 'SET_ROOT_PATH', payload: `/character/${characterId}` });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={1} columns={5} sx={{ marginBottom: 10, paddingLeft: 10 }}>
        {characters.map((ch) => (
          <Grid key={ch.id} size={1}>
            <Card sx={{ height: ChHeight, width: ChWidth, cursor: 'pointer' ,
                backgroundColor: 'rgb(0, 0, 0, 0.4)',
                color: 'white',
                border: '2px solid grey',
                borderRadius: '4px',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }}}>
              <CardActionArea
                onClick={() => handleCharacterClick(ch.id)}
                sx={{
                  height: '100%',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <CardMedia
                  sx={{ height: '70%', objectFit: 'contain' }}
                  image={ch.imageUrl}
                />
                <CardContent>
                  {ch.name}
                </CardContent>
                <GreySpacer />
              </CardActionArea>
            </Card>
          </Grid>
        ))}

      </Grid>
    </Box>
  );
}
