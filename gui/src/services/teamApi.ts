import {Character} from "./api";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface Team {
    id: string;
    name: string;
    description: string;
    character1 : Character;
    character2 : Character;
    character3 : Character;
    character4 : Character;
}

export  const getTeams = async () : Promise<Team[]> => {
    try {
        const response = await fetch(`${API_URL}/teams`);
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
}
