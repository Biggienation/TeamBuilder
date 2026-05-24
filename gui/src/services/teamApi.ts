import {Character} from "./characterApi";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface Team {
    id: string;
    name: string;
    categories: string[];
    description: string;
    character1: Character;
    character2: Character;
    character3: Character;
    character4: Character;
    score: number;
}

export interface ReportTeamRequest {
    name: string;
    character1: string;
    character2: string;
    character3: string;
    character4: string;
    category: string;
}

export const getTeams = async (): Promise<Team[]> => {
    try {
        const response = await fetch(`${API_URL}/teams/general`);
        if (!response.ok) throw new Error('Failed to fetch teams');
        return await response.json();
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
}

export const getMemoryOfChaos = async (): Promise<Team[]> => {
    try {
        const response = await fetch(`${API_URL}/teams/memoryofchaos`);
        if (!response.ok) throw new Error('Failed to fetch Memory of Chaos teams');
        return await response.json();
    } catch (error) {
        console.error('Error fetching Memory of Chaos teams:', error);
        throw error;
    }
}

export const getPureFiction = async (): Promise<Team[]> => {
    try {
        const response = await fetch(`${API_URL}/teams/purefiction`);
        if (!response.ok) throw new Error('Failed to fetch Pure Fiction teams');
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pure Fiction teams:', error);
        throw error;
    }
}

export const getApocalypticShadow = async (): Promise<Team[]> => {
    try {
        const response = await fetch(`${API_URL}/teams/apocalypticshadow`);
        if (!response.ok) throw new Error('Failed to fetch Apocalyptic Shadow teams');
        return await response.json();
    } catch (error) {
        console.error('Error fetching Apocalyptic Shadow teams:', error);
        throw error;
    }
}

export const getAnomalyArbitration = async (): Promise<Team[]> => {
    try {
        const response = await fetch(`${API_URL}/teams/anomalyarbitration`);
        if (!response.ok) throw new Error('Failed to fetch Anomaly Arbitration teams');
        return await response.json();
    } catch (error) {
        console.error('Error fetching Anomaly Arbitration teams:', error);
        throw error;
    }
}

export const reportTeam = async (userId: string, teamData: ReportTeamRequest): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/teams/${userId}/report`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData),
        });
        if (!response.ok) throw new Error('Failed to report team');
    } catch (error) {
        console.error('Error reporting team:', error);
        throw error;
    }
}
