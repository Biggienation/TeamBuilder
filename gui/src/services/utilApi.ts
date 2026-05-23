
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';


export  const getProfileIcons = async () : Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/util/profileicons`);
        if (!response.ok) {
            throw new Error('Failed to fetch profile icons');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching profile icons:', error);
        throw error;
    }
}
