import { GameState } from "shared/src/gamelogic/gamestate";
import { Vector2 } from '@math.gl/core';

export const moveGameObject = (gameState: GameState, objectId: string, position: Vector2) => {
    const newGameState = { ...gameState, gameObjects: { ...gameState.gameObjects, [objectId]: { ...gameState.gameObjects[objectId], position} } };
    return newGameState;
}