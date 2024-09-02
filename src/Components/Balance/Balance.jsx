import React, { useEffect, useState } from 'react'
import './balance.css';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const Balance = ({coins}) => {
    const {publicKey}= useWallet();
    const {connection}=useConnection();
    const [balance,setBalance]=useState(0);

    const getBalance=async()=>{
        if(publicKey){
        let balance=await connection.getBalance(publicKey);
        setBalance(balance/LAMPORTS_PER_SOL);
        }
        else{
            console.log("connect the wallet");
        }
    }

    useEffect(()=>{
        getBalance();
    },[publicKey,coins]);
    return (
    <div className='wallet-balance'>
        Wallet Balance : {
            balance
        } Sol
    </div>
  )
}

export default Balance