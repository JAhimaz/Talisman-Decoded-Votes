import logo from './logo.gif';
import './css/App.css';
import VotesPoller from './components/VotesPoller';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Talisman Votes <span className="App-header-sub">(Polkadot Decoded)</span>
        </p>
        <VotesPoller />
      </header>
    </div>
  );
}

export default App;
