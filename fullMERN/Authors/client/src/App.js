import './App.css';
import { Switch, Route } from 'react-router-dom';
import ShowAll from './components/ShowAll';
import CreateOne from './components/CreateOne';
import UpdateOne from './components/UpdateOne';

function App() {
  return (
    <div className="App">
      <h1>Favorite authors</h1>
      <Switch>
        <Route path='/new'>
          <CreateOne />
        </Route>
        <Route path='/edit/:id'>
          <UpdateOne />
        </Route>
        <Route path='/'>
          <ShowAll />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
