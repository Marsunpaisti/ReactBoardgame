import { Vector2 } from '@math.gl/core';

export interface GameState {
    gameObjects: Record<string, AnyGameObject>;
}

export enum GameObjectTypes {
    TextGameObject = 'TextGameObject',
    MeepleGameObject = 'MeepleGameObject',
}

export interface BaseGameObject {
    objectId: string;
    position: Vector2;
    transitionDuration?: number;
}

export interface TextGameObject extends BaseGameObject {
    type: GameObjectTypes.TextGameObject;
    text: string;
}

export interface MeepleGameObject extends BaseGameObject {
    type: GameObjectTypes.MeepleGameObject;
}

export type IGameStateUpdater = (
    updateFunction: (prev: GameState) => GameState,
) => void;

export type ITransitionDurationProvider = () => number;

export type AnyGameObject = MeepleGameObject | TextGameObject;
