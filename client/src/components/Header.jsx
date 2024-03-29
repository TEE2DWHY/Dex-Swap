import { Link } from "react-router-dom";
import eth from "../assets/images/eth.svg";
import logo from "../assets/images/logo.webp";

const Header = (props) => {
  const { address, isConnected, connect, disconnect } = props;
  return (
    <>
      <header>
        <div className="leftH">
          <img src={logo} alt="logo" className="logo" />
          <Link to="/">
            <div className="headerItem">Swap</div>
          </Link>
          <Link to="/#">
            <div className="headerItem">Tokens</div>
          </Link>
        </div>
        <div className="rightH">
          <div className="headerItem">
            <img src={eth} alt="eth-img" className="eth" />
            Ethereum
          </div>
          <div className="connectButton" onClick={connect}>
            {isConnected
              ? address.slice(0, 4) + "..." + address.slice(38)
              : "Connect"}
          </div>
          {/* {isConnected && ( */}
          <button
            className="connectButton"
            onClick={disconnect}
            disabled={!isConnected}
          >
            Disconnect
          </button>
          {/* )} */}
        </div>
      </header>
    </>
  );
};

export default Header;
