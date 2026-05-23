const API_BASE_URL = 'http://localhost:8080/api';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  active: boolean;
  ownedCharacters?: string[];
  profileIcon?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  active: boolean;
}

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

export const userApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    return response.json();
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    return response.json();
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user');
    }
    return response.json();
  },

  getUserByUsername: async (username: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/username/${username}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user');
    }
    return response.json();
  },

  saveOwnedCharacters: async (userId: string, characterNames: string[]): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/owned-characters`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(characterNames),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save owned characters');
    }
    return response.json();
  },

    saveProfileIcon: async (userId: string, iconUrl: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile-icon`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ iconUrl }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save profile icon');
    }
    return response.json();
  },

    changePassword: async (userId: string, newPassword: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ newPassword }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to change password');
    }
    return response.json();
  },
};
