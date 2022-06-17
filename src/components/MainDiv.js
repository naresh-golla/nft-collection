import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BossGif from "../images/preview_3.gif"
// import BossGif from "../images/6.png"
import { UserDataContext } from "./StateContext";
import contractAbi from "../utils/contractAbi.json"
import { WhitelistedAddress } from "../utils/constants.js"


export default function MainDiv() {

    const [inputValue, setInputValue] = useState(2)
    const [cost, setCost] = useState(55)
    const [userMintedNFTs, setUserMintedNFTs] = useState([])
    const [totalSupply, setTotalSupply] = useState(0)


    const CONTRACT_ADDRESS = "0x2c81BFFBC20c2ed38a6F90f949687fD970279e57"

    const user_Data_Context = useContext(UserDataContext)
    let userData = user_Data_Context.userData


    let handleInput = (e) => {
        console.log(e.target.value)
        setInputValue(e.target.value)
    }
    let handleMinus = () => {
        if (inputValue > 0) {
            setInputValue(inputValue - 1)
        }
    }
    let handlePlus = () => {
        setInputValue(inputValue + 1)
    }
    useEffect(() => {
        if(userData.userAddress){
            fetchMints()
            let WhitelistedArray = WhitelistedAddress.map(item=>item.toLowerCase());
            let isWhiteListed = WhitelistedArray.includes(userData.userAddress.toLowerCase())
            user_Data_Context.setUserData(prevState => ({
                ...prevState,
                isWhiteListed: isWhiteListed
            }))            
        }

    }, [userData.userAddress])

    useEffect(() => {
        user_Data_Context.setUserData(prevState => ({
            ...prevState,
            userMintedNFTs: userMintedNFTs
        }))
    }, [userMintedNFTs])

    useEffect(()=>{

    },[userData.isWhiteListed])

    const mintNFT = async () => {
        console.log("mint")
        // setLoading(true);
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
                let price = cost * inputValue;
                if (userData.userAddress === "0x422938990fed07aeb904260b1094943afc2e366d") {
                    price = 0;
                }
                let tx = await contract.mint(inputValue, { value: ethers.utils.parseEther(price.toString()) })
                await tx.wait();
                console.log("tx-hash", tx.hash)
                console.log("NFT Minted at tx https://explorer.liberty10.shardeum.org/transaction/" + tx.hash)
                toast.success('Your Shardian Boss Baby NFT Minted!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                fetchMints();
            }
        } catch (error) {
            console.log("error while minting NFT", error)
            toast.error('Error while Minting!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        // setLoading(false);
    }

    const fetchMints = async () => {
        // setLoading(true)
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
                console.log("contract", contract)
                console.log("userData.userAddress", userData.userAddress)
                let allTokenIdsOfAdrress = await contract.walletOfOwner(userData.userAddress);
                // let allTokenIdsOfAdrress = await contract.walletOfOwner("0x422938990fed07aeb904260b1094943afc2e366d");
                console.log("allTokenIdsOfAdrress-->", allTokenIdsOfAdrress);
                let totalSupply = await contract.totalSupply();
                setTotalSupply(parseInt(totalSupply._hex)) 
                setUserMintedNFTs(allTokenIdsOfAdrress);
                // setLoading(false)
            }
        } catch (error) {
            console.log("fetch minted NFTs error", error);
            // setLoading(false)
            toast.error('Error while loading Address/NFT!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className="mainDiv" id="mint">
            <div className="left">
                <div className="title">Boss Baby NFT</div>
                <div className="sub_title">Mint yours before we sell out 🚀</div>
                <div className="mints">{totalSupply}/5555</div>
                <div className="number">
                    <div className="minus pumi" onClick={handleMinus}>-</div>
                    <input type="number" value={inputValue} onChange={(e) => handleInput(e)} />
                    <div className="plus pumi" onClick={handlePlus}>+</div>
                </div>
                {(inputValue > 0 && inputValue < 3) ? (
                    <div className="sub_title u-mt-10">Price : {inputValue} X {cost} = {inputValue * cost} $SHM</div>) : (
                    <div className="sub_title u-mt-10">Whitelisted address can mint 2 NFTs</div>
                )}
                <button
                    disabled={!userData.isShardeum || inputValue < 1 || inputValue > 2 || !userData.isWhiteListed}
                    className="connect_button connect_button3"
                    onClick={mintNFT}
                >
                    Mint Your NFT
                </button>
            </div>
            <div className="right">
                <div className="right_img">
                    <img alt="shardeum NFT" src={BossGif} />
                </div>
            </div>
        </div>
    )
}
