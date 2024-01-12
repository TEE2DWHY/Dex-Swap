import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// styling
import "./App.css";
// components
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import Footer from "./components/Footer";

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  return (
    <>
      <Router>
        <div className="app">
          <Header
            connect={connect}
            isConnected={isConnected}
            address={address}
          />
          <div className="mainWindow">
            <Routes>
              <Route
                path="/"
                element={<Swap isConnected={isConnected} address={address} />}
              />
              <Route path="/tokens" element={<Tokens />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
