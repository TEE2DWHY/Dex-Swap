import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import tokenList from "../tokenList.json";
import axios from "axios";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
const Swap = (props) => {
  const { address, isConnected } = props;
  const [slippage, setSlippage] = useState(2.5);
  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [changeToken, setChangeToken] = useState(1);
  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }
  const [messageApi, contextHolder] = message.useMessage();
  const [err, setErr] = useState("");
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  async function fetchPrices(one, two) {
    try {
      const res = await axios.get(
        `https://dex-ztgo.onrender.com/tokens/get-prices`,
        {
          params: { addressOne: one, addressTwo: two },
        }
      );
      setPrices(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchDexSwap() {
    try {
      const allowance = await axios.get(
        `https://dex-ztgo.onrender.com/swap/v5.2/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
      );
      // console.log(allowance);
      if (allowance.data.allowance === "0") {
        const approve = await axios.get(
          `https://dex-ztgo.onrender.com/swap/v5.2/1/approve/transaction?tokenAddress=${tokenOne.address}`
        );
        setTxDetails(approve.data);
        console.log(txDetails);
        // console.log("not approved");
        return;
      }
      console.log("make swap");
      const tx = await axios.get(
        `https://dex-ztgo.onrender.com/swap/v5.2/1/swap?src=${
          tokenOne.address
        }&dst=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
          tokenOne.decimals + tokenOneAmount.length,
          "0"
        )}&address=${address}&slippage=${slippage}`
      );
      let decimals = Number(`1E${tokenTwo.decimals}`);
      setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

      setTxDetails(tx.data.tx);
      // console.log(tx.data.tx);
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
    }
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      fetchPrices(tokenList[i].address, tokenTwo.address);
    } else {
      setTokenTwo(tokenList[i]);
      fetchPrices(tokenOne.address, tokenList[i].address);
    }
    setIsOpen(false);
  }

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);
  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);

  useEffect(() => {
    messageApi.destroy();

    if (isLoading) {
      messageApi.open({
        type: "loading",
        content: "Transaction is Pending...",
        duration: 0,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    messageApi.destroy();
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Transaction Successful",
        duration: 1.5,
      });
    } else if (txDetails.to) {
      messageApi.open({
        type: "error",
        content: "Transaction Failed",
        duration: 1.5,
      });
    }
  }, [isSuccess]);

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>Swap</h4>
          <Popover
            content={settings}
            title="Settings"
            placement="bottomRight"
            trigger="click"
          >
            <SettingOutlined className="cog" />
          </Popover>
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices}
          />
          <Input
            placeholder="0"
            value={tokenTwoAmount}
            disabled={true}
            type="number"
          />
          <div className="switchButton" onClick={switchTokens}>
            <ArrowDownOutlined className="switchArrow" />
          </div>
          <div className="assetOne" onClick={() => openModal(1)}>
            <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
            {tokenOne.ticker}
            <DownOutlined />
          </div>
          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
            {tokenTwo.ticker}
            <DownOutlined />
          </div>
        </div>
        <div
          className="swapButton"
          disabled={!tokenOneAmount || !isConnected}
          onClick={() => fetchDexSwap()}
        >
          Swap
        </div>
        {err && <p className="err">{err}</p>}
      </div>
    </>
  );
};

export default Swap;
