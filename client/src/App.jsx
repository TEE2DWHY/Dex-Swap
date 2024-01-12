import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// styling
import "./App.css";
// components
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Header />
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Swap />} />
              <Route path="/tokens" element={<Tokens />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
