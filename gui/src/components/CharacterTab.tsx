import React from 'react';
import { Card, CardActionArea, CardContent, Grid, CardMedia, Box } from '@mui/material';
import GreySpacer from '../components/GreySpacer';
import { Character } from '../services/characterApi';
import { useStore } from '../hooks';
import { selectRootPath } from '../reducers/selectors';

interface CharacterTabProps {
  characters: Character[];
}


const Square = { xs: 70, sm: 90, md: 110, lg: 125 }

export default function CharacterTab({ characters }: CharacterTabProps) {
  const [, dispatch] = useStore(selectRootPath);

  const handleCharacterClick = (characterId: string) => {
    dispatch({ type: 'SET_ROOT_PATH', payload: `/character/${characterId}` });
  };

  return (
    <Box sx={{ padding: 2,}}>
      <Grid container spacing={1} columns={7} sx={{ marginBottom: 10}}>
        {characters.map((ch) => (
          <Grid key={ch.id} size={1}>
            <Card sx={{ height: Square, width: Square, cursor: 'pointer' ,
                position: 'relative',
                backgroundColor: 'rgb(0, 0, 0, 0.4)',
                color: 'white',
                border: '1px solid grey',
                borderRadius: '4px',
                '&:hover': {
                    border: '1px solid white',
                }}}>
              <CardActionArea
                onClick={() => handleCharacterClick(ch.id)}
                sx={{
                  height: '100%',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <CardMedia
                  sx={{ height: '100%', objectFit: 'contain' }}
                  image={ch.imageUrl}
                />
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: '4px 8px',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}>
                  {ch.name}
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

      </Grid>
    </Box>
  );
}
