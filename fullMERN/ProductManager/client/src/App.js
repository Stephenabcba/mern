import './App.css';
import React, { useState } from 'react';
import Form from './components/Form';
import {
  Switch, Route, Link
} from 'react-router-dom';
import DisplayAll from './components/DisplayAll';
import DisplayOne from './components/DisplayOne';
import EditOne from './components/EditOne';

function App() {
  const [newestProduct, setNewestProduct] = useState({})
  return (
    <div className="App">
      <h1>Product Manager</h1>
      <Link to="/">Go back home</Link>
      <Switch>
        <Route exact path="/">
          <Form setNewestProduct={setNewestProduct} />
          <hr />
          <DisplayAll newestProduct={newestProduct} />
        </Route>
        <Route path="/:id/edit">
          <EditOne setNewestProduct={setNewestProduct} />
        </Route>
        <Route path="/:id">
          <DisplayOne />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
