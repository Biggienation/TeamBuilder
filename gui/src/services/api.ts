// API Service for communicating with the backend

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface Character {
  id: string;
  name: string;
  tier: string;
  level: number;
  role: string;
  imageUrl?: string;
  description?: string;
}

export const getCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(`${API_URL}/characters`);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacterById = async (id: string): Promise<Character> => {
  try {
    const response = await fetch(`${API_URL}/characters/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch character');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

export const createCharacter = async (character: Omit<Character, 'id'>): Promise<Character> => {
  try {
    const response = await fetch(`${API_URL}/characters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
    if (!response.ok) {
      throw new Error('Failed to create character');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating character:', error);
    throw error;
  }
};

export const updateCharacter = async (id: string, character: Partial<Character>): Promise<Character> => {
  try {
    const response = await fetch(`${API_URL}/characters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
    if (!response.ok) {
      throw new Error('Failed to update character');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating character:', error);
    throw error;
  }
};

export const deleteCharacter = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/characters/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete character');
    }
  } catch (error) {
    console.error('Error deleting character:', error);
    throw error;
  }
};

export const getCharactersByTier = async (tier: string): Promise<Character[]> => {
  try {
    const response = await fetch(`${API_URL}/characters/tier/${tier}`);
    if (!response.ok) {
      throw new Error('Failed to fetch characters by tier');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters by tier:', error);
    throw error;
  }
};

export const getCharactersByRole = async (role: string): Promise<Character[]> => {
  try {
    const response = await fetch(`${API_URL}/characters/role/${role}`);
    if (!response.ok) {
      throw new Error('Failed to fetch characters by role');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters by role:', error);
    throw error;
  }
};

export const searchCharactersByName = async (name: string): Promise<Character[]> => {
  try {
    const response = await fetch(`${API_URL}/characters/search/${name}`);
    if (!response.ok) {
      throw new Error('Failed to search characters');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching characters:', error);
    throw error;
  }
};

