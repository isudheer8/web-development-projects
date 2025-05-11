import { useState } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const Hangman = () => {
  const words = ['REACT', 'JAVASCRIPT', 'COMPONENT', 'HOOKS', 'PROPS'];
  const [selectedWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const maxAttempts = 6;

  const displayWord = selectedWord
    .split('')
    .map(letter => guessedLetters.includes(letter) ? letter : '_')
    .join(' ');

  const remainingAttempts = maxAttempts - guessedLetters
    .filter(letter => !selectedWord.includes(letter)).length;

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
  };

  const gameWon = !displayWord.includes('_');
  const gameLost = remainingAttempts <= 0;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Hangman</h2>
      
      <p style={styles.word}>{displayWord}</p>
      
      <div style={styles.attempts}>
        Remaining attempts: {remainingAttempts}
      </div>

      <div style={styles.keyboard}>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <button
            key={letter}
            style={styles.key}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || gameWon || gameLost}
          >
            {letter}
          </button>
        ))}
      </div>

      {gameWon && <p style={styles.result}>Congratulations! You won! 🎉</p>}
      {gameLost && <p style={styles.result}>Game Over! The word was: {selectedWord}</p>}

      <GameControls onReset={() => window.location.reload()} />
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
  word: {
    fontSize: '2rem',
    letterSpacing: '0.5rem',
    margin: '2rem 0',
    color: '#2c3e50',
  },
  keyboard: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    justifyContent: 'center',
    maxWidth: '600px',
    margin: '2rem auto',
  },
  key: {
    width: '40px',
    height: '40px',
    fontSize: '1.1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  attempts: {
    color: '#e74c3c',
    fontSize: '1.2rem',
  },
  result: {
    fontSize: '1.5rem',
    color: '#2ecc71',
    margin: '1rem 0',
  }
};

export default Hangman;