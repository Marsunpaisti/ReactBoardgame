import { GameState, IGameStateUpdater, ITransitionDurationProvider } from "shared/src/gamelogic/gamestate";
import { Vector2 } from '@math.gl/core';
import { delay } from "../gamelogic/delay";

export const gameObjectWalkPathAction =  (
    updateGameState: IGameStateUpdater, transitionDuration: ITransitionDurationProvider) => 
    async (id: string, path: Vector2[]) => {
    for (const position of path) {
        updateGameState((prev) =>
            setGameObjectTransitionDuration(prev, id, transitionDuration()),
        );
        updateGameState((prev) => setGameObjectPosition(prev, id, position));
        await delay(transitionDuration());
    }
};

const setGameObjectPosition = (gameState: GameState, objectId: string, position: Vector2) => {
    const newGameState = { ...gameState, gameObjects: { ...gameState.gameObjects, [objectId]: { ...gameState.gameObjects[objectId], position} } };
    return newGameState;
}
const setGameObjectTransitionDuration = (gameState: GameState, objectId: string, duration: number) => {
    const newGameState = { ...gameState, gameObjects: { ...gameState.gameObjects, [objectId]: { ...gameState.gameObjects[objectId], transitionDuration: duration} } };
    return newGameState;
}