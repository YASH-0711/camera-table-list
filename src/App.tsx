import { Header } from './components/Header';
import { CameraTable } from './components/CameraTable';
import { mockCameras } from './data/mock';
import './App.css';

function App() {

  return (
    <>
    <div className="app-container">
      <Header />
      <div className="app-content">
        <CameraTable cameras={mockCameras} />
      </div>
    </div>
    </>
  )
}

export default App
