import { Vector2 } from '@math.gl/core';
import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { GameBoardContext } from '../contexts/GameBoardContext';
import './GameBoard.scss';

export const GameBoard = () => {
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const { cameraPosition, setCameraPosition } = useContext(GameBoardContext);

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

      setCameraPosition((prev) => prev.add(offset).clone());
    },
    [setCameraPosition],
  );

  useEffect(() => {
    document.addEventListener('keydown', onArrowKey);
    return () => document.removeEventListener('keydown', onArrowKey);
  }, []);

  return (
    <div className="gameBoard" ref={gameBoardRef}>
      <div
        className="boardContent"
        style={{
          transform: `translate(${cameraPosition.x}px, ${cameraPosition.y}px)`,
        }}
      >
        <GameBoardItem position={new Vector2()}>GameBoardItem</GameBoardItem>
      </div>
    </div>
  );
};

export interface GameBoardItemProps extends PropsWithChildren {
  position: Vector2;
}

export const GameBoardItem: React.FC<GameBoardItemProps> = ({
  children,
  position,
}) => {
  return (
    <div
      className="boardItem"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      {children}
    </div>
  );
};
