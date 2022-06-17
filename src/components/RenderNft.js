import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "./StateContext";

export default function RenderNft() {

  const [updatedMintedNFTs, setUpdatedMintedNFTs] = useState([]);

  const user_Data_Context = useContext(UserDataContext)
  let userData = user_Data_Context.userData
  let userMintedNFTs = userData.userMintedNFTs;

  useEffect(() => {
    let updatedMintedNFTs = userMintedNFTs.map(item => {
      return parseInt(item._hex)
    })
    setUpdatedMintedNFTs(updatedMintedNFTs)
  }, [userMintedNFTs])

  console.log("userMintedNFTs", userData.userMintedNFTs)
  console.log("updatedMintedNFTs", updatedMintedNFTs)

  const renderMints = () => {
    if (updatedMintedNFTs.length > 0) {
      <div>
        <div>Your NFT Collection ({updatedMintedNFTs.length})</div>
        {
          updatedMintedNFTs.map((item, index) => {
            return (
              <div key={index}>

                <img alt="{NFT}" src={`https://gateway.pinata.cloud/ipfs/QmcLkK5x1QW3v3etFZrxq9Wg8UGc3exQYj2Y73cwXoskFs/${item}.png`} />
              </div>
            )
          })
        }
      </div>
    }
  }
  return (
    <div>
      {(updatedMintedNFTs.length > 0) &&
        <div class="collection_wrapper">
          <div>Your NFT Collection ({updatedMintedNFTs.length})</div>
          <div class="collection_wrapper_nft">
            {
              updatedMintedNFTs.map((item, index) => {
                return (
                  <div key={index}>
                    <Link to={`/explore/${Number(item)}`}>
                      <img alt="NFT" height="300" src={`https://gateway.pinata.cloud/ipfs/QmZowxGrcPE6TX7nGnUkGKyd91UP7RcfzNtPw2hxzoh9Sn/${item}.png`} />
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}
