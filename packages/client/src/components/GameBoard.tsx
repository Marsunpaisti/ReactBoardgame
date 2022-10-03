import { Vector2 } from '@math.gl/core';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { GameBoardContext } from '../contexts/GameBoardContext';
import './GameBoard.scss';
import { RenderGameObject } from './GameObjectVisual';

export const GameBoard = () => {
    const gameBoardRef = useRef<HTMLDivElement>(null);
    const { cameraPosition, setCameraPosition, gameState, gameObjectWalkPath } =
        useContext(GameBoardContext);

    const onArrowKey = useCallback(
        (event: KeyboardEvent) => {
            const cameraStep = 10;
            let offset: Vector2 = new Vector2(0, 0);
            switch (event.key) {
                case 'ArrowUp':
                    offset = offset.addScaledVector([0, -1], cameraStep);
                    break;
                case 'ArrowDown':
                    offset = offset.addScaledVector([0, 1], cameraStep);
                    break;
                case 'ArrowLeft':
                    offset = offset.addScaledVector([-1, 0], cameraStep);
                    break;
                case 'ArrowRight':
                    offset = offset.addScaledVector([1, 0], cameraStep);
                    break;
            }

            setCameraPosition((prev) => prev.clone().add(offset));
        },
        [setCameraPosition],
    );

    useEffect(() => {
        document.addEventListener('keydown', onArrowKey);
        return () => document.removeEventListener('keydown', onArrowKey);
    }, []);

    const onClick = useCallback(
        (e: MouseEvent) => {
            if (gameBoardRef.current == null) return;
            const rect = gameBoardRef.current.getBoundingClientRect();
            const boardCenter = new Vector2(
                (rect.left + rect.right) / 2,
                (rect.top + rect.bottom) / 2,
            );
            const offsetFromBoardCenter = new Vector2(
                e.clientX,
                e.clientY,
            ).subtract(boardCenter);
            const boardPosition = cameraPosition
                .clone()
                .add(offsetFromBoardCenter);
            gameObjectWalkPath('MeepleGameObject1', [
                new Vector2(0, 0),
                boardPosition,
            ]);
        },
        [gameBoardRef, cameraPosition, gameObjectWalkPath],
    );

    useEffect(() => {
        if (gameBoardRef.current == null) return;

        const boardRef = gameBoardRef.current;
        boardRef.addEventListener('click', onClick);
        return () => boardRef.removeEventListener('click', onClick);
    }, [gameBoardRef, onClick]);

    return (
        <div className="gameBoard" ref={gameBoardRef}>
            <div
                className="boardContent"
                style={{
                    transform: `translate(${-cameraPosition.x}px, ${-cameraPosition.y}px)`,
                }}
            >
                {Object.values(gameState.gameObjects).map((gob) => {
                    return RenderGameObject(gob);
                })}
            </div>
        </div>
    );
};
