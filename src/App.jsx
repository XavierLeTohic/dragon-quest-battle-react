import './reset.css';
import './App.css';

import WorldMap from './World/WorldMap';

const App = () => {




  return (
    <div>
      <WorldMap>

        <button className="start-fight-button">
          Start fight
        </button>
      </WorldMap>
    </div>
  );
};

export default App;
