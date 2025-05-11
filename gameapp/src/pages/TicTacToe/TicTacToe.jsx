import { useState } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tic Tac Toe</h2>
      <div style={styles.board}>
        {board.map((cell, index) => (
          <button
            key={index}
            style={styles.cell}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <p style={styles.status}>
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </p>
      <GameControls onReset={handleReset} />
    </div>
  );
};

// Helper function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    color: '#2c3e50',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100px)',
    gap: '10px',
    justifyContent: 'center',
    margin: '2rem auto',
  },
  cell: {
    width: '100px',
    height: '100px',
    fontSize: '2rem',
    backgroundColor: '#ecf0f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  status: {
    fontSize: '1.2rem',
    color: '#2c3e50',
  }
};

export default TicTacToe;