import logo from './logo.svg';
import './App.css';
import AudioVisualizer from './components/AudioVisualizer';
import BackgroundImageComponent from './components/BackgroundImageComponent';

function App() {
  return (
    <div className="App">
      {/* <BackgroundImageComponent /> */}
      <header className="App-header">
      <h1>DRACULA FLOW SCRIPTURE</h1>
        <img src="/portrait.jpg" alt="My Description" style={{ width: '50%', maxWidth: '500px', height: 'auto' }} />
        <p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <AudioVisualizer /> {/* Use the AudioButton component */}
      </header>
      
    </div>





  );
}

export default App;
