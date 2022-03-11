import './App.css';
import Tabs from './components/Tabs';

function App() {
  const tabs = [
    { label: "Tab 0", content: "Tab 0 content is neutral" },
    { label: "Tab 1", content: "Tab 1 content is cool" },
    { label: "Tab 2", content: "Tab 2 content is hot" },
    { label: "Tab 3", content: "Tab 3 content is freezing" },
    { label: "Tab 4", content: "Tab 4 content is frozen" },
    { label: "Tab 5", content: "Tab 5 content is melting" },
  ]
  return (
    <div className="App">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default App;
