import logo from './logo.gif';
import './css/App.css';
import VotesPoller from './components/VotesPoller';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="https://talisman.xyz" target="_blank" rel="noreferrer" className='Hidden-link'>
          <img src={logo} className="App-logo" alt="logo" />
        </a>

        <p>
          Talisman Votes <span className="App-header-sub">(Polkadot Decoded)</span>
        </p>
        <a href="https://decoded.polkadot.network/vote/?search=Talisman" target="_blank" rel="noreferrer">
          <div className='Vote-btn'> Vote Now </div>
        </a>
        <VotesPoller />
      </header>
    </div>
  );
}

export default App;
