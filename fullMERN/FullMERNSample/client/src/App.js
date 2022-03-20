import './App.css';
import Main from './components/Main';
import Detail from './components/Detail';
import Update from './components/Update';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Sample MERN Project</h1>
        <h2>People database 👷‍♀️👨‍⚕️👩‍🎓👩‍🍳</h2>
        <p>This webapp offers basic CRUD functionalities, but needs some refactoring in React frontend for smoother experience.</p>
        <Link to="/people">Go back home 🏡</Link>
        <Switch>
          <Route path="/people/:id/edit">
            <Update />
          </Route>
          <Route exact path="/people/">
            <Main />
          </Route>
          <Route path="/people/:id">
            <Detail />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
