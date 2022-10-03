import { PropsWithChildren } from 'react';
import {
    AnyGameObject,
    GameObjectTypes,
    MeepleGameObject,
    TextGameObject,
} from 'shared/src/gamelogic/gamestate';

export type GameObjectComponentProps = {
    transitionDuration: number;
};
export type GameObjectVisualProps = AnyGameObject & GameObjectComponentProps;

export const GameObjectVisual: React.FC<
    GameObjectVisualProps & PropsWithChildren
> = ({ children, position, transitionDuration }) => {
    return (
        <div
            className="boardItem"
            style={{
                position: 'absolute',
                border: '1px solid green',
                width: 'max-content',
                height: 'max-content',
                minWidth: 'max-content',
                minHeight: 'max-content',
                transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                transitionDuration: `${transitionDuration}ms`,
                transitionTimingFunction: 'linear',
            }}
        >
            {children}
        </div>
    );
};

export const TextGameObjectComponent: React.FC<
    TextGameObject & GameObjectVisualProps
> = (props) => {
    return <GameObjectVisual {...props}>{props.text}</GameObjectVisual>;
};

export const MeepleGameObjectComponent: React.FC<
    MeepleGameObject & GameObjectVisualProps
> = (props) => {
    return <GameObjectVisual {...props}>Meeple</GameObjectVisual>;
};

export const GameObjectComponents = {
    [GameObjectTypes.MeepleGameObject]: MeepleGameObjectComponent,
    [GameObjectTypes.TextGameObject]: TextGameObjectComponent,
};

export const RenderGameObject = (gameObject: GameObjectVisualProps) => {
    switch (gameObject.type) {
        case GameObjectTypes.MeepleGameObject:
            return (
                <MeepleGameObjectComponent
                    key={gameObject.objectId}
                    {...gameObject}
                />
            );
        case GameObjectTypes.TextGameObject:
            return (
                <TextGameObjectComponent
                    key={gameObject.objectId}
                    {...gameObject}
                />
            );
    }
};
