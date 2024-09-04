import React, { useState } from 'react'
import './sendmoney.css';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import constant from '../../constant';
const SendMoney = ({setBetAmount,UserName}) => {
  const [amount,setAmount]=useState(0);
  const [sendMoneyPublicKey,setSendMoneyPublicKey]=useState("5zDqt1CtDrd3i8K9L6uDg7jBfbzgjASdNhJ31McvqJZU");
  const wallet = useWallet();
  const { connection } = useConnection();
  const sendMoney=async(e)=>{
      e.preventDefault();
      try{
        const transaction = new Transaction();
        
        transaction.add(SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(sendMoneyPublicKey),
          lamports: amount * LAMPORTS_PER_SOL,
      }));

      let signature=await wallet.sendTransaction(transaction,connection);
      const data={
        "UserName":UserName,
        "amount":amount,
        "walletAddress":wallet.publicKey.toBase58(),
        "toWalletAddress":sendMoneyPublicKey,
        "signature":signature
    
    }
    const params = new URLSearchParams(data);
      //POC:SSE
      let moneySentSSE=new EventSource(`http://localhost:8080/bet?${params.toString()}`);
      let response;
      moneySentSSE.onmessage=(e)=>{
        response=JSON.parse(e.data);
        if(response.message==="waiting for confirmation"){
          //set loading true
          console.log(response.message);
        }
        else if(response.message==="bet received"){
          // setBetAmount(response?.amount);
          alert(`transaction received`);
          moneySentSSE.close();
        }
        else{
          alert(`transaction not received`);
          moneySentSSE.close();
        }
        console.log(JSON.parse(e.data),"sse");
      }
      //POC:SSE
      // const response = await fetch(`${constant.BACKEND_URL}bet`, {
      //   method: 'POST',
      //   headers: {
      //       'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data) // Convert JavaScript object to JSON string
      // });
      // const responseData = await response.json();
      // console.log("response",responseData);
      // setBetAmount(responseData?.amount);
      // console.log(signature);
      alert(`transaction of ${amount} successfull`);
      }catch(err){
        alert("transaction failed");
        console.error(err);
      }
      
  }

  const handleChange=(e)=>{
    setAmount(e.target.value);
}
  return (
    <form className="send-money-wrapper" onSubmit={sendMoney}>
      <p className='buy-coins'>Buy Betting coins</p>
      <input onChange={handleChange}>
      </input>
      <button>
          Buy
      </button>
    </form>
  )
}

export default SendMoney