import { useState, createContext } from "react";

const UserDataContext = createContext();

const UserDataProvider = (props) => {
  const [userData, setUserData] = useState({
      userAddress:null,
      isShardeum:false,
      userMintedNFTs:[],
      isWhiteListed:false
  });
  // the state that we'll be storing the user info

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </UserDataContext.Provider>
  );
};
export { UserDataContext, UserDataProvider };