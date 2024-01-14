import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// styling
import "./App.css";
// components
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import Footer from "./components/Footer";
// images
import preloader from "./assets/images/beam-ethereum-icon.gif";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { address, isConnected } = useAccount();
  const { connect, error } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const { disconnect } = useDisconnect();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, [3000]);
  });

  useEffect(() => {
    if (error && error.message === "Connector not found") {
      alert("Please Install Metamask In Browser or Open In Dapp Browser");
      return;
    }
  }, [error]);

  return (
    <>
      <Router>
        {isLoading && (
          <div className="preloader">
            <img
              className="preloader-img"
              src={preloader}
              alt="preloader-img"
            />
          </div>
        )}
        <div className="app">
          <Header
            connect={connect}
            isConnected={isConnected}
            address={address}
            disconnect={disconnect}
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
