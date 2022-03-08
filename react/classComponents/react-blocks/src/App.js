
import './App.css';
import Navigation from './components/NavigationComponent';
import Header from './components/HeaderComponent';
import Main from "./components/MainComponent"
import SubContents from "./components/SubContentsComponent"
import Advertisement from './components/AdvertisementComponent';

function App() {
  return (
    <div className="app">
      <Header />
      <Navigation />
      <Main>
        <SubContents /><SubContents /><SubContents />
        <Advertisement />
      </Main>
    </div>
  );
}

export default App

