import { GameLogicHelloWorld } from 'shared/src/gamelogic/gamestate';
import { GameBoard } from './GameBoard';
import './Layout.scss';
GameLogicHelloWorld();

function Layout() {
  return (
    <div className="contentContainer">
      <GameBoard />
    </div>
  );
}

export default Layout;
