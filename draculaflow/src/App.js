import logo from './logo.svg';
import './App.css';
import AudioButton from './components/AudioButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Dracula Flow Scripture</h1>
        <img src="/portrait.jpg" alt="My Description" style={{ width: '300px', height: 'auto' }} />
        <p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <AudioButton /> {/* Use the AudioButton component */}
      </header>
      
    </div>





  );
}

export default App;
