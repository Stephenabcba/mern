import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { useParams } from 'react-router';

function App() {
  const VarInput = (props) => {
    const { inputVar } = useParams();
    return (<>
      {isNaN(inputVar) ? <h2>The word is: {inputVar}</h2> : <h2>The number is: {inputVar}</h2>}
    </>)
  }

  const ColorInput = (props) => {
    const { text, textColor, backgroundColor } = useParams();
    console.log(textColor)
    return (
      <p style={{ color: textColor, backgroundColor: backgroundColor, padding: "20px" }}>The word is: {text}</p>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <h2>Welcome</h2>
          </Route>
          <Route path="/:text/:textColor/:backgroundColor">
            <ColorInput />
          </Route>
          <Route path="/:inputVar">
            <VarInput />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
