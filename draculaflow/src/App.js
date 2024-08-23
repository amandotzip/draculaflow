import logo from './logo.svg';
import './App.css';
import AudioVisualizer from './components/AudioVisualizer';

function App() {
  const backgroundImage = `${process.env.PUBLIC_URL}/background.jpg`;
  console.log('Background Image Path:', backgroundImage);
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100vh'
    }}
      className="App"
    >

      <header className="App-header">
        <h1>DRACULA FLOW SCRIPTURE</h1>
        <img src={`${process.env.PUBLIC_URL}/portrait.jpg`} alt="My Description" style={{ width: '50%', maxWidth: '500px', height: 'auto' }} />
        <AudioVisualizer /> {/* Use the AudioButton component */}
      </header>

    </div>





  );
}

export default App;
