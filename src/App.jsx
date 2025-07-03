import React, { useState } from 'react';
import './App.css';
import History from './history.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [selectedSide, setSelectedSide] = useState('');
  const [userNumber, setUserNumber] = useState(0);
  const [computerNumber, setComputerNumber] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [round, setRound] = useState(1);

  const generateComputerNumber = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const determineWinner = (userNumber, computerNumber, selectedSide) => {
    const total = userNumber + computerNumber;
    const isEven = total % 2 === 0;

    if ((selectedSide === 'odd' && isEven) || (selectedSide === 'even' && !isEven)) {
      return "lose";
    } else {
      return "win";
    }
  };

  const handlePlay = () => {
    if (!selectedSide) {
      toast.warn("Please select 'Odd' or 'Even' before playing!");
      return;
    }
    if (userNumber === 0) {
      toast.warn("Please select your number before playing!");
      return;
    }

    const rand = generateComputerNumber();
    setComputerNumber(rand);

    const result = determineWinner(userNumber, rand, selectedSide);
    setGameResult(result);

    // Save game to history with current round number
    setGameHistory(prev => [
      ...prev,
      {
        round,
        userNumber,
        computerNumber: rand,
        selectedSide,
        result,
      },
    ]);

    setRound(prev => prev + 1); // Move to next round

    // Show toast
    if (result === "win") {
      toast.success("🎉 You Win!");
    } else {
      toast.error("😞 You Lose!");
    }
  };

  const handleSideChange = (e) => {
    setSelectedSide(e.target.value);
    setGameResult(null);
  };

  const handleNumberChange = (e) => {
    setUserNumber(parseInt(e.target.value, 10));
    setGameResult(null);
  };

  return (
    <>
      <div className="side-selection">
        <p className='side-selection__title'>SELECT YOUR SIDE:</p>
        <br />
        <label>
          <input
            type="radio"
            name="side"
            value="odd"
            checked={selectedSide === "odd"}
            onChange={handleSideChange}
          />
          Odd
        </label>

        <label>
          <input
            type="radio"
            name="side"
            value="even"
            checked={selectedSide === "even"}
            onChange={handleSideChange}
          />
          Even
        </label>
      </div>

      <hr />

      <div className="game-container">
        <div className="player-box">
          <div className="player-box__number">{userNumber}</div>
          <p>YOU</p>
        </div>

        <div className="computer-box">
          <div className="computer-box__number">{computerNumber}</div>
          <p>COMPUTER</p>
        </div>
      </div>

      <div className="number-selection">
        <p className="number-selection__title">SELECT YOUR NUMBER</p>

        <div className="number-selection__options">
          {[1, 2, 3, 4, 5].map(n => (
            <label key={n}>
              <input
                type="radio"
                name="userNumber"
                value={n}
                checked={userNumber === n}
                onChange={handleNumberChange}
              />
              {n}
            </label>
          ))}
        </div>

        <button
          className="play-button"
          onClick={handlePlay}
          disabled={!selectedSide || userNumber === 0}
        >
          PLAY
        </button>
      </div>

      <div className="history">
        <h2>Game History</h2>

        {gameHistory.map((game, index) => (
          <History
            key={index}
            round={game.round}
            userNumber={game.userNumber}
            computerNumber={game.computerNumber}
            selectedSide={game.selectedSide}
            gameResult={game.result}
          />
        ))}
      </div>

     
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
