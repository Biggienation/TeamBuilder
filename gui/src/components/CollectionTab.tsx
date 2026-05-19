import React from 'react';
import { Card, CardActionArea, CardContent, Grid, CardMedia, Box, Typography, Button } from '@mui/material';
import GreySpacer from '../components/GreySpacer';
import { Character } from '../services/characterApi';
import { userApi } from '../services/userApi';

interface CollectionTabProps {
  characters: Character[];
  selectedCards: string[];
  setSelectedCards: React.Dispatch<React.SetStateAction<string[]>>;
  user: any;
}


const Square = { xs: 70, sm: 90, md: 110, lg: 125 }

export default function CollectionTab({ characters, selectedCards, setSelectedCards, user }: CollectionTabProps) {
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSaveOwnedCharacters = async () => {
    if (!user) {
      setError('No user logged in');
      return;
    }

    try {
      setSaving(true);
      await userApi.saveOwnedCharacters(user.id, selectedCards);
      user.ownedCharacters = selectedCards; // Update local user data
      setError(null);
      alert('Characters saved successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save owned characters';
      setError(errorMessage);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>

      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

        <Grid container spacing={1} columns={7} sx={{ marginBottom: 10}}>
        {characters.map((ch) => (
            <Grid key={ch.id} size={1}>
                <Card sx={{ height: Square, width: Square, cursor: 'pointer' ,
                    position: 'relative',
                    backgroundColor: 'rgb(0, 0, 0, 0.4)',
                    color: 'white',
                    border: '2px solid grey',
                    borderRadius: '4px',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }}}>
              <CardActionArea
                onClick={() => {
                  setSelectedCards((prev) =>
                    prev.includes(ch.name) ? prev.filter((i) => i !== ch.name) : [...prev, ch.name]
                  )
                }}
                data-active={selectedCards.includes(ch.name) ? '' : undefined}
                sx={{
                    height: '100%',
                    position: 'relative',
                    '&[data-active]': {
                        backgroundColor: 'rgb(20, 27, 45, 0.9)',
                        color: 'rgb(20, 27, 45, 0.9)',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
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

        <Button
            variant="contained"
            onClick={handleSaveOwnedCharacters}
            disabled={saving || selectedCards.length === 0 || !user}
            sx={{ backgroundColor: '#7E8C54', '&:hover': { backgroundColor: '#ABD726' } }}
        >
            {saving ? 'Saving...' : 'Save Characters'}
        </Button>
    </Box>
  );
}
