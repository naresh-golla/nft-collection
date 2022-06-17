import React, { useState, useEffect, useContext } from "react";
import Logo from "../images/logo.png"
import shardeumLogo from '../images/Layer_3.svg';
import metaMaskLogo from '../images/metamask.svg';
import { networks } from '../utils/networks';
import { UserDataContext } from "./StateContext"
import { Link } from "react-router-dom";

export default function Header({ noLinks }) {
  const [loading, setLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [isShardeum, setIsShardeum] = useState('');

  const user_Data_Context = useContext(UserDataContext)
  // console.log("user_Data_Context", user_Data_Context)  
  console.log("props", noLinks)

  useEffect(() => {
    isWalletConnected()
  }, [])

  useEffect(() => {
    user_Data_Context.setUserData(prevState => ({
      ...prevState,
      userAddress: currentAccount,
      isShardeum: isShardeum
    }))
    localStorage.setItem("currentAccount", currentAccount)
  }, [currentAccount, isShardeum])

  const handleWalletConnect = async () => {
    setLoading(true)
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("get metamask , -> https://metamask.io/")
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        })
        if (accounts.length !== 0) {
          console.log("accounts[0]", accounts[0]);
          setCurrentAccount(accounts[0])
        } else {
          console.log("not authorisation to sign in")
        }
      }
    } catch (error) {
      console.log("connect error", error)
      setLoading(false)
    }
    setLoading(false)
  }

  //accounts changed / network changed
  const isWalletConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get MetaMask -> https://metamask.io/");
      return
    } else {
      console.log("we have ethereum object", ethereum)
    }

    const accounts = await ethereum.request({
      method: "eth_accounts"
    })
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("found authorised account", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorised account found")
    }

    const chainId = await ethereum.request({
      method: "eth_chainId"
    })
    console.log("chainId", networks[chainId])
    setNetwork(networks[chainId])

    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      setCurrentAccount(accounts[0]);
    })

    if (chainId !== '0x1f90') {
      console.log("Wrong Network")
      setIsShardeum(false)
    } else {
      setIsShardeum(true)
    }
  }

  const switchNetwork = async () => {
    setLoading(true)
    if (window.ethereum) {
      try {
        // Try to switch to the shardeum liberty testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1f90' }], // Check networks.js for hexadecimal network ids
        });

        window.location.reload()
      } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        if (error.code === 4902) {
          try {
            let res = await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x1f90',
                  chainName: 'Shardeum Liberty 1.1',
                  rpcUrls: ['https://liberty10.shardeum.org/'],
                  nativeCurrency: {
                    name: "Shardeum",
                    symbol: "SHM",
                    decimals: 18
                  },
                  blockExplorerUrls: ["https://explorer.liberty10.shardeum.org/"]
                },
              ],
            });
            setTimeout(function () {
              window.location.reload()
            }, 100);
            console.log("rresss", res);
            setLoading(false)
          } catch (error) {
            console.log(error);
            setLoading(false)
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
      setLoading(false)
    }
  }

  return (
    <div className="hearer_nav">
      <div>
        <Link to="/">
          <div className="title title_link">Shardian Boss NFT</div>
        </Link>
      </div>
      {(noLinks !== undefined) ? (<div></div>) : (
        <ul className="hearer_nav_ul">
          <Link to={`/explore/1`}>
            <li><a href="">Explore</a></li>
          </Link>
          <li><a href="#mint">Mint</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      )
      }
      <div className="header_connect">
        <button className="connect_button" onClick={handleWalletConnect}>
          {/* <img alt="Network logo" className="logo" src={ network.includes("Shardeum") ? shardeumLogo : ethLogo} /> */}
          <img alt="Network logo" className="logo" src={shardeumLogo} />
          {currentAccount ? (isShardeum ? <a rel="noopener noreferrer" target="_blank" href={`https://explorer.liberty10.shardeum.org/account/` + currentAccount}> {currentAccount.slice(0, 6)} ... {currentAccount.slice(-4)}</a> : "Switch Network") : <p>Connect Wallet</p>}
        </button>
        {!isShardeum && <button className="connect_button connect_button2" onClick={switchNetwork}><img alt="Network logo" className="logo" src={metaMaskLogo} /></button>}
      </div>
    </div>
  )
}

