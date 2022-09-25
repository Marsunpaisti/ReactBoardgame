import { Vector2 } from '@math.gl/core';
import React, { PropsWithChildren, useState } from 'react';

export interface IGameBoardContext {
  cameraPosition: Vector2;
  setCameraPosition: React.Dispatch<React.SetStateAction<Vector2>>;
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
  return (
    <GameBoardContext.Provider value={{ cameraPosition, setCameraPosition }}>
      {children}
    </GameBoardContext.Provider>
  );
};
