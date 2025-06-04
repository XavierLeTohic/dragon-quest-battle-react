import "./reset.css";
import "./App.css";

import Battle from "./stages/Battle/battle";
import WorldMap from "./stages/World/WorldMap";
import { GameProvider, useGame } from "./hooks/useGame";

const App = () => {
  const {gameStart, setGameStart} = useGame(); 

  const onClick = () => {
    setGameStart(true);
  }

  console.log(gameStart);

	return (
    <div className="app">
      <WorldMap>
        {!gameStart && <button type="button" className="start-fight-button" onClick={onClick}>Start fight</button>}
        {gameStart && <Battle />}
      </WorldMap>
    </div>
	);
};

function AppWithProvider() {
  return <GameProvider><App /></GameProvider>
}

export default AppWithProvider;
