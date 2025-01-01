import React, { useState } from 'react';
import Board from './Board';

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];

    if (calculateWinner(squares) || squares[index]) return;

    squares[index] = xIsNext ? 'X' : 'O';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Go to Start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)} className="text-blue-500 transition hover:underline">{destination}</button>
        </li>
      );
    });

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div>
        <h1 className="text-4xl text-center mb-8 font-bold text-gray-800">Tic Tac Toe</h1>
        <Board squares={current} onClick={handleClick} />
        <div className="mt-8 text-center">
          <p className="mb-4 text-lg">{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
          <ul>{renderMoves()}</ul>
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;