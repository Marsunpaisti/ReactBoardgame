import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import { GameBoardContextProvider } from './contexts/GameBoardContext';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <GameBoardContextProvider>
            <Layout />
        </GameBoardContextProvider>
    </React.StrictMode>,
);
