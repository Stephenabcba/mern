import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import PlayerMain from './components/PlayerMain';
import GameMain from './components/GameMain';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route path="/players">
          <div>
            <Link to="/players/list" style={{ fontWeight: "bold" }}>Manage Players</Link>
            <span>  |  </span>
            <Link to="/status/game/1">Manage Player Status</Link>
          </div>
          <PlayerMain />
        </Route>
        <Route path="/status/game/:gameNum">
          <div>
            <Link to="/players/list">Manage Players</Link>
            <span>  |  </span>
            <Link to="/status/game/1" style={{ fontWeight: "bold" }}>Manage Player Status</Link>
          </div>
          <GameMain />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
