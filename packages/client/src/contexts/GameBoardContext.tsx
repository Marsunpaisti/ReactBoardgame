import { Vector2 } from '@math.gl/core';
import React, { PropsWithChildren, useState } from 'react';
import { GameObjectTypes, GameState } from 'shared/src/gamelogic/gamestate';
import { gameObjectWalkPathAction } from 'shared/src/gamelogic/actions';

export interface IGameBoardContext {
    cameraPosition: Vector2;
    setCameraPosition: React.Dispatch<React.SetStateAction<Vector2>>;
    gameState: GameState;
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
    const TRANSITION_DURATION = 250;
    const [gameState, setGameState] = useState<GameState>({
        gameObjects: {
            TextObject1: {
                type: GameObjectTypes.TextGameObject,
                text: 'TextObject1',
                objectId: 'TextObject1',
                position: new Vector2(0, 0),
            },
            TextObject2: {
                type: GameObjectTypes.TextGameObject,
                text: 'TextObject2',
                objectId: 'TextObject2',
                position: new Vector2(100, 100),
            },
            MeepleGameObject1: {
                type: GameObjectTypes.MeepleGameObject,
                objectId: 'MeepleGameObject1',
                position: new Vector2(-100, 300),
            },
        },
    });

    const gameObjectWalkPath = gameObjectWalkPathAction(
        setGameState,
        () => TRANSITION_DURATION,
    );

    return (
        <GameBoardContext.Provider
            value={{
                cameraPosition,
                setCameraPosition,
                gameState,
                gameObjectWalkPath,
            }}
        >
            {children}
        </GameBoardContext.Provider>
    );
};
