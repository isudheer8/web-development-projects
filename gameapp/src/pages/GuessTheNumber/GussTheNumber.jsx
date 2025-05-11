import { useState, useEffect } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const GuessTheNumber = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameWon(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userGuess = parseInt(guess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100');
      return;
    }

    setAttempts(prev => prev + 1);

    if (userGuess === targetNumber) {
      setMessage(`🎉 Correct! You won in ${attempts + 1} attempts!`);
      setGameWon(true);
    } else if (userGuess < targetNumber) {
      setMessage('⬆️ Try a higher number');
    } else {
      setMessage('⬇️ Try a lower number');
    }

    setGuess('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Guess the Number (1-100)</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          style={styles.input}
          placeholder="Enter your guess"
          min="1"
          max="100"
          disabled={gameWon}
        />
        <button
          type="submit"
          style={styles.submitButton}
          disabled={gameWon}
        >
          Check
        </button>
      </form>

      <p style={styles.message}>{message}</p>
      <p style={styles.attempts}>Attempts: {attempts}</p>

      <GameControls onReset={startNewGame} />
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '2rem',
  },
  form: {
    margin: '2rem 0',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1.1rem',
    width: '200px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '0.5rem 1rem',
    fontSize: '1.1rem',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    minHeight: '2rem',
    margin: '1rem 0',
  },
  attempts: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
  }
};

export default GuessTheNumber;