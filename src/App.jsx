import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { Table } from "./Components/Table/Table";
import { Wheel } from "./Components/Wheel/Wheel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
	WalletModalProvider,
	WalletDisconnectButton,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import Balance from "./Components/Balance/Balance";
import CoinBalance from "./Components/CoinBalance/CoinBalance";
import SendMoney from "./Components/SendMoney/SendMoney";
import Auth from "./Components/Auth/Auth";
import NavBar from "./Components/NavBar/NavBar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import constant from './constant.js';  

const App = () => {
	
	const [bets, setBets] = useState({});
	const [betAmount, setBetAmount] = useState(0);
	const [UserName, setUserName] = useState(JSON.parse(localStorage.getItem('profile'))?.UserName);
	const [moves, setMoves] = useState([]);
	const endpoint =import.meta.env.VITE_APP_API_KEY;
		
	
  useEffect(()=>{
      
    setUserName(JSON.parse(localStorage.getItem('profile'))?.UserName);
  },[JSON.parse(localStorage.getItem('profile'))?.UserName]);
 
	useEffect(() => {
		(async () => {
			try {
				const URL = `${constant.BACKEND_URL}bet/${UserName}`;
				let response = await fetch(URL, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				let responseData = await response.json();
				setBetAmount(responseData.coin.amount);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [Object.keys(bets).length,JSON.parse(localStorage.getItem('profile'))?.UserName]);
	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider
				wallets={[]}
				autoConnect
			>
				<WalletModalProvider>
        
					<Router>
						<Routes>
							<Route
								path="/"
								element={
                  <ProtectedRoute>
						<p className="note">kindly use devnet for the solana wallet</p>
					  <div>
						<div className="nav-wrapper">
							<h1 className="website-name">
								Roulette
							</h1>
							<div className="wallets-connection-wrapper">
								<WalletMultiButton />
								<WalletDisconnectButton />
								<Balance coins={betAmount - Object.keys(bets).length}></Balance>
								<CoinBalance
								UserName={UserName}
								coins={betAmount - Object.keys(bets).length}
								></CoinBalance>
								<NavBar UserName={UserName}></NavBar>
							</div>
						</div>
					  

                      <div>
						<SendMoney
							setBetAmount={setBetAmount}
							UserName={UserName}
							></SendMoney>
						
                        <Table
                          moves={moves}
                          setMoves={setMoves}
                          betAmount={betAmount}
                          bets={bets}
                          setBets={setBets}
                        ></Table>
                        <Wheel
                          UserName={UserName}
                          moves={moves}
                          bets={bets}
                          betAmount={betAmount}
                          coins={Object.keys(bets).length}
                        ></Wheel>
                        
                      </div>
                      </div>
                  </ProtectedRoute>
                  
                }
							/>
							<Route
								path="/auth"
								element={
                  <Auth setBetAmount={setBetAmount}>

                  </Auth>
                }
							/>
						</Routes>
					</Router>
					
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export default App;
