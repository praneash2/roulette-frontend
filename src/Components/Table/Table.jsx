
import { RouletteTable } from 'react-casino-roulette';

import 'react-casino-roulette/dist/index.css';
import { useNavigate } from 'react-router-dom';

export const Table = ({moves,setMoves,betAmount,bets,setBets}) => {
  const navigate = useNavigate();
  const reset=()=>{
    navigate(0);
  }
  const handleBet = (betData) => {
    const { id } = betData;
    
    
    if(Object.keys(bets).length<betAmount){
      setBets((prevState) => ({
        ...prevState,
        [id]: {
          icon: 'https://cdn-icons-png.flaticon.com/512/10095/10095709.png',
        },
      }));
      setMoves((prevState) => ([
        ...prevState,
        {type:betData.bet,
        payload:betData.payload
        }
      ]));
      
    }
    console.log(betData);
  };

  return (
    <div>
      <div className="play-again">
							<button  onClick={reset}>Reset coins</button>
			</div>
      <div style={{ maxWidth: 800, margin: 'auto' }}>
      
      <RouletteTable bets={bets} onBet={handleBet} />
    </div>
    </div>
    
  );
};