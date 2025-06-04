import './reset.css';
import './App.css';

import WorldMap from './stages/World/WorldMap';

const App = () => {
  return (
    <div className="app">
      <WorldMap>

        <button className="start-fight-button">
          Start fight
        </button>
      </WorldMap>
    </div>
  );
};

export default App;
