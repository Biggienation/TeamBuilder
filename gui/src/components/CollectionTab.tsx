import React from 'react';
import { Card, CardActionArea, CardContent, Grid, CardMedia, Box, Typography, Button } from '@mui/material';
import GreenSpacer from 'components/GreenSpacer';
import { Character } from '../services/characterApi';
import { userApi } from '../services/userApi';

interface CollectionTabProps {
  characters: Character[];
  selectedCards: string[];
  setSelectedCards: React.Dispatch<React.SetStateAction<string[]>>;
  user: any;
}

const ChHeight = { xs: 80, sm: 100, md: 125, lg: 150 }
const ChWidth = { xs: 70, sm: 90, md: 110, lg: 125 }

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

      <Grid container spacing={1} columns={5} sx={{ marginBottom: 10, paddingLeft: 10 }}>
        {characters.map((ch) => (
          <Grid key={ch.id} size={1}>
            <Card sx={{ height: ChHeight, width: ChWidth }}>
              <CardActionArea
                onClick={() => {
                  setSelectedCards((prev) =>
                    prev.includes(ch.name) ? prev.filter((i) => i !== ch.name) : [...prev, ch.name]
                  )
                }}
                data-active={selectedCards.includes(ch.name) ? '' : undefined}
                sx={{
                    height: '100%',
                    '&[data-active]': {
                        backgroundColor: '#7E8C54',
                        '&:hover': {
                            backgroundColor: '#ABD726',
                        },
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
                <GreenSpacer />
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
