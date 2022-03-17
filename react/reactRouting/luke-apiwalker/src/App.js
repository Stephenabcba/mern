import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  // useHistory
} from "react-router-dom";
import Search from './components/Search';
import PersonDisplay from './components/PersonDisplay';
import PlanetDisplay from './components/PlanetDisplay';
import SearchResult from './components/SearchResult';
import NotFound from './components/NotFound';

function App() {

  // initialize state
  const [categories, setCategories] = useState({});
  const [search, setSearch] = useState("https://swapi.dev/api/");
  const [searchResult, setSearchResult] = useState("");


  // get all categories from Star Wars API
  useEffect(() => {
    fetch("https://swapi.dev/api/")
      .then(r => r.json())
      .then(result => setCategories(result))
      .catch(err => console.log(err))
  }, [])

  // useEffect(() => {
  //   fetch(search)
  //     .then(r => r.json())
  //     .then(result => {
  //       setSearchResult(result)
  //     })
  // }, [search])


  return (
    <BrowserRouter>
      <div className="App">
        <h1>Star Wars API Caller</h1>
        <Search setSearch={setSearch} categories={categories} />

        <Route path="/:query/:id">
          {/* <h1>Route testing</h1> */}
          {/* <p>{JSON.stringify(search)}</p> */}
          <SearchResult search={search} setSearchResult={setSearchResult} categories={categories} setSearch={setSearch}>
            <Switch>
              <Route path="/people/:id">
                {/* <p>search result {JSON.stringify(searchResult)}</p> */}
                <PersonDisplay searchResult={searchResult} />

              </Route>
              <Route path="/planets/:id">
                <h2>Planet Search Result</h2>
                {/* <p>search result {JSON.stringify(searchResult)}</p> */}
                <PlanetDisplay searchResult={searchResult} />
              </Route>
              <Route path="/:category">
                <h2>Other Categories</h2>
                {/* <p>search result {JSON.stringify(searchResult)}</p>
            <p>{JSON.stringify(Object.entries(searchResult))}</p> */}
                {(searchResult.result === undefined && searchResult.detail === undefined) ?
                  <>
                    <h3>There are no formatting for this category yet.</h3>
                    <p>Instead, all information regarding this item is shown in bullet points below.</p>
                    {Object.entries(searchResult).map((item, idx) =>
                      <li key={idx}>{item[0]}:{item[1]}</li>
                    )}
                  </>
                  : <NotFound />}
              </Route>
            </Switch>
          </SearchResult>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
