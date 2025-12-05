import { Header } from "./components/Header";
import { CameraTable } from "./components/CameraTable";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <div className="app-content">
          <CameraTable
            apiUrl="https://api-app-staging.wobot.ai/app/v1/fetch/cameras"
            apiToken="4ApVMIn5sTxeW7GQ5VWeWiy"
          />
        </div>
      </div>
    </>
  );
}

export default App;
