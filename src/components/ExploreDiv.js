import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import BossGif from "../images/preview.gif"
import BossGif from "../images/6.png"
import TwitterIcon from "../images/twitter.svg"
import { UserDataContext } from "./StateContext";
import contractAbi from "../utils/contractAbi.json"
import { Link } from "react-router-dom";
import { Share } from 'react-twitter-widgets'


export default function ExploreDiv({ tokenId }) {

    const [updatedMintedNFTs, setUpdatedMintedNFTs] = useState([]);
    const [tokenIdVal, setTokenIdVal] = useState(tokenId)

    const user_Data_Context = useContext(UserDataContext)
    let userData = user_Data_Context.userData
    let userMintedNFTs = userData.userMintedNFTs;

    // useEffect(() => {
    //     window.location.reload()
    // }, [])
    useEffect(() => {
        let updatedMintedNFTs = userMintedNFTs.map(item => {
            return parseInt(item._hex)
        })
        setUpdatedMintedNFTs(updatedMintedNFTs)
    }, [userMintedNFTs])

    console.log("userMintedNFTs", userData.userMintedNFTs)
    console.log("updatedMintedNFTs", updatedMintedNFTs)

    const shareTweet = () => {
        console.log("shareTweet")
    }
    let handleMinus = () => {
        if (tokenIdVal > 0) {
            setTokenIdVal(Number(tokenIdVal) - 1)
        }
    }
    let handlePlus = () => {
        setTokenIdVal(Number(tokenIdVal) + 1)
    }
    return (
        <div>
                <script src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            <div className="mainDiv explore" id="mint">
                <div className="left">
                    <div className="mints">#{tokenId}</div>
                    <div className="title">Boss Baby NFT</div>
                    <div className="sub_title">Let's just say I'm the boss 🚀</div>
                    {/* <button
                        className="connect_button connect_button3" 
                    // onClick={shareTweet}
                    >*/}
                    {/* <div class="button_div">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Hey! checkout my Shardian Boss PFP NFT" data-url={`https://boss.shardeum.us/explore/${tokenId}`} data-hashtags="Shardeum NFT ShardeumNFT SHM" data-related="nftshm" data-show-count="false">Tweet</a>
                            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                        </div> */}
                    {/* <a href="https://twitter.com/intent/tweet?text=View%20Drawing%2337%20@drawyournft_xyz&url=https://drawyournft.xyz/view/37" */}
                            {/* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                                class="twitter-share-button" data-size="large"
                                data-text="Hey! checkout my Shardian Boss PFP #NFT  🔥 
                                collection #22 on shardeum liberty🗽 @nftshm #shardeum #ShardeumNFT ❤"
                                data-url={`https://boss.shardeum.us/explore/${tokenId}`}
                                data-show-count="false">
                                    Tweet
                            </a> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                <span>Tweet</span> */}
                    <button
                        className="connect_button connect_button3 connect_twitter">
                        <div class="button_div">
                            <Share url={`https://boss.shardeum.us/explore/${tokenId}`} 
                                   options={{ 
                                       text: "Hey! checkout my Shardian Boss PFP #NFT  🔥 collection #22 on shardeum liberty🗽 @nftshm @NischalShetty #shardeum #ShardeumNFT ❤" ,
                                       size: "large" 
                                    }}
                            />
                        </div>
                    </button>
                </div>
                <div className="right">
                    <div className="right_img">
                        {/* <img alt="shardeum NFT" src={BossGif} /> */}
                        <img alt="NFT" src={`https://gateway.pinata.cloud/ipfs/QmZowxGrcPE6TX7nGnUkGKyd91UP7RcfzNtPw2hxzoh9Sn/${tokenId}.png`} />
                    </div>
                </div>
            </div>
            <div class="navigation">
                <div className="number mainDiv">
                    {(tokenIdVal > 1 && tokenIdVal <= 5555) &&
                        <Link to={`/explore/${Number(tokenIdVal) - 1}`} className="minus pumiNav" onClick={handleMinus}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="arrow"><path _ngcontent-yty-c14="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                            &nbsp;<span>#{Number(tokenIdVal) - 1}</span>
                        </Link>
                    }
                    {(tokenIdVal > 0 && tokenIdVal < 5555) &&
                        <Link to={`/explore/${Number(tokenIdVal) + 1}`} className="plus pumiNav" onClick={handlePlus}>
                            <span>#{Number(tokenIdVal) + 1}</span> &nbsp;
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="arrow"><path _ngcontent-yty-c14="" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}
