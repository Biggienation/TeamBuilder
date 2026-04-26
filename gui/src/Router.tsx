import { useStore } from './hooks';
import Home from './views/Home';
import Chareters from './views/Chareters';
import Builder from './views/Builder';
import { selectRootPath } from './reducers/selectors';
import React from 'react';

export default function Router() {
    const [rootPath] = useStore(selectRootPath);

    switch (rootPath) {
        case '/home':
            return <Home />;
        case '/chareters':
            return <Chareters />;
        case '/builder':
            return <Builder />;
        default:
            return <Home />;
    }
}