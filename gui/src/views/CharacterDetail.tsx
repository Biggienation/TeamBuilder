import React, { useEffect } from 'react';
import { Paper, Box, Typography, Button, CircularProgress, Card, CardMedia } from '@mui/material';
import { useStore } from '../hooks';
import { selectRootPath } from '../reducers/selectors';
import { getCharacterById, Character } from '../services/characterApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CharacterDetail() {
  const [, dispatch] = useStore(selectRootPath);
  const [character, setCharacter] = React.useState<Character | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Extract character ID from the rootPath (e.g., "/character/123" -> "123")
  const [rootPath] = useStore(selectRootPath);
  const characterId = rootPath.split('/')[2];

  useEffect(() => {
    if (characterId) {
      fetchCharacter();
    }
  }, [characterId]);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCharacterById(characterId);
      setCharacter(data);
    } catch (err) {
      setError('Failed to load character');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    dispatch({ type: 'SET_ROOT_PATH', payload: '/chareters' });
  };

  if (loading) {
    return (
      <Paper elevation={1} sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error || !character) {
    return (
      <Paper elevation={1} sx={{ padding: 2 }}>
        <Typography color="error" sx={{ marginBottom: 2 }}>{error || 'Character not found'}</Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ backgroundColor: '#7E8C54', '&:hover': { backgroundColor: '#ABD726' } }}
        >
          Back to Characters
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={{ padding: 4 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Button 
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ color: '#7E8C54', '&:hover': { color: '#ABD726' } }}
        >
          Back to Characters
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Character Image */}
        <Box sx={{ flex: 0, minWidth: 300 }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={character.imageUrl}
              alt={character.name}
              sx={{ objectFit: 'contain', padding: 2 }}
            />
          </Card>
        </Box>

        {/* Character Information */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#7E8C54' }}>
            {character.name}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                TIER
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {character.tier}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                RARITY
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {character.rarity}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                ELEMENT
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {character.element}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                PATH
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {character.path}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                ROLE
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {character.role}
              </Typography>
            </Box>
          </Box>

          {character.description && (
            <Box>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                DESCRIPTION
              </Typography>
              <Typography variant="body1">
                {character.description}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
