import { Vector2 } from '@math.gl/core';
import React, { PropsWithChildren, useState } from 'react';
import { GameState } from 'shared/src/gamelogic/gamestate';
import { moveGameObject } from 'shared/src/gamelogic/moveGameObject';
import { delay } from '../utils/delay';

export interface IGameBoardContext {
    cameraPosition: Vector2;
    setCameraPosition: React.Dispatch<React.SetStateAction<Vector2>>;
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    gameObjectWalkPath: (id: string, path: Vector2[]) => void;
}

export const GameBoardContext = React.createContext<IGameBoardContext>(
    {} as IGameBoardContext,
);

export const GameBoardContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [cameraPosition, setCameraPosition] = useState<Vector2>(
        new Vector2(0, 0),
    );
    const [gameState, setGameState] = useState<GameState>({
        gameObjects: {
            TextObject1: {
                type: 'TextGameObject',
                text: 'TextObject1',
                objectId: 'TextObject1',
                position: new Vector2(0, 0),
            },
            TextObject2: {
                type: 'TextGameObject',
                text: 'TextObject2',
                objectId: 'TextObject2',
                position: new Vector2(100, 100),
            },
            MeepleGameObject1: {
                type: 'MeepleGameObject',
                objectId: 'MeepleGameObject1',
                position: new Vector2(-100, 300),
            },
        },
    });

    const gameObjectWalkPath = async (id: string, path: Vector2[]) => {
        for (const position of path) {
            setGameState((prev) => moveGameObject(prev, id, position));
            await delay(500);
        }
    };

    return (
        <GameBoardContext.Provider
            value={{
                cameraPosition,
                setCameraPosition,
                gameState,
                setGameState,
                gameObjectWalkPath,
            }}
        >
            {children}
        </GameBoardContext.Provider>
    );
};
