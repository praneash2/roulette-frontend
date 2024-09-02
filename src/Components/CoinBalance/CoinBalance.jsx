import React, { useEffect } from "react";
import './coinBalance.css';
const CoinBalance = ({ UserName, coins }) => {
	
	return <div className="coin-balance-wrapper"
	>Betting Coin Balance : {coins}</div>;
};

export default CoinBalance;
