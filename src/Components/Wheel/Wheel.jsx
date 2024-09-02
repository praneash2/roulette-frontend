import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { RouletteWheel } from 'react-casino-roulette';
import './wheel.css';
import 'react-casino-roulette/dist/index.css';
import constant from '../../constant';
export const Wheel = ({UserName,moves,bets,betAmount,coins}) => {
  const [start, setStart] = useState(false);
  const [winningBet, setWinningBet] = useState('-1');
  const {publicKey}=useWallet();
  
  // useEffect(() => {
  //   console.log("Start state changed:", start,window);
  //   // document.querySelector('.spin-btn').addEventListener('click',doSpin);
  // }, [start]);
  const doSpin = async () => {
    
    //TODO: randomise this from backend
    if(!publicKey){
      alert("connect the wallet");
      return;
    }
    if(coins==0){
      alert("place the coins in the table");
      return;
    }
    const winningBet='5';
    console.log("ddd",coins);
    
    const toWalletAddress="5zDqt1CtDrd3i8K9L6uDg7jBfbzgjASdNhJ31McvqJZU";
    // let UserName="praneash2@gmai.com";
    let data={
      "UserName":UserName,
      "moves":moves,
      "amount":coins,
      "walletAddress":publicKey.toBase58(),
      "toWalletAddress":toWalletAddress
  
  }   
  try{
    setStart(true);
      const response = await fetch(`${constant.BACKEND_URL}spin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // Convert JavaScript object to JSON string
    });
    const responseData = await response.json();
    console.log("response",responseData);
    if(responseData?.message=="you won"||responseData?.message=="you lost"){
      setWinningBet(responseData?.value.toString());
      // console.log("winning value",responseData?.value);
      setStart(true);
      setTimeout(()=>{
        if(responseData?.message=="you won"){
          alert("you won");
        }
        else{
          alert("you lost");
        }
      },10000);
      // setStart(false);
      
    }
    else{
      alert(responseData?.message);
      setStart(false);
    }
    console.log("username",UserName,"moves",moves,"amount",coins,"walletAddress",publicKey.toBase58(),"toWalletAddress",toWalletAddress);
  }
  catch(err){
    console.log("spinning error");
    setStart(false);
  }
  };
 
  return (
    <div>
      <div className='spin-wrapper'>
  
        <button className='spin-btn' type="button" disabled={start} onClick={doSpin}>
          Spin
        </button>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <RouletteWheel start={start} winningBet={winningBet} />
      </div>
      
    </div>
  );
};