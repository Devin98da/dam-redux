import './App.css';
import Checkerboard from './components/checkerboard/checkerboard';
import Winner from './winner/Winner';

function App() {

 return (
    <div className="App">
      <Winner/>
      <Checkerboard/>
    </div>
  );
}

export default App;
