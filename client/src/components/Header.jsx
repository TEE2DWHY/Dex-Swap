import { Link } from "react-router-dom";
import eth from "../assets/images/eth.svg";
import moralisLogo from "../assets/images/moralis-logo.svg";

const Header = () => {
  return (
    <>
      <header>
        <div className="leftH">
          <img src={moralisLogo} alt="logo" className="logo" />
          <Link to="/">
            <div className="headerItem">Swap</div>
          </Link>
          <Link to="/tokens">
            <div className="headerItem">Tokens</div>
          </Link>
        </div>
        <div className="rightH">
          <div className="headerItem">
            <img src={eth} alt="eth-img" className="eth" />
            Ethereum
          </div>
          <div className="connectButton">Connect</div>
        </div>
      </header>
    </>
  );
};

export default Header;
