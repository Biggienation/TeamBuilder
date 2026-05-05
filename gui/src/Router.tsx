import { useStore } from './hooks';
import Home from './views/Home';
import Chareters from './views/Chareters';
import CharacterDetail from './views/CharacterDetail';
import Builder from './views/Builder';
import Login from './views/Login';
import Register from './views/Register';
import Settings from './views/Settings';
import { selectRootPath } from './reducers/selectors';
import React from 'react';

export default function Router() {
    const [rootPath] = useStore(selectRootPath);

    // Check if it's a character detail page (e.g., "/character/123")
    if (rootPath.startsWith('/character/')) {
        return <CharacterDetail />;
    }

    switch (rootPath) {
        case '/home':
            return <Home />;
        case '/chareters':
            return <Chareters />;
        case '/builder':
            return <Builder />;
        case '/login':
            return <Login />;
        case '/register':
            return <Register />;
        case '/settings':
            return <Settings />;
        default:
            return <Home />;
    }
}
