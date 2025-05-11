import { useState, useEffect, useRef } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const SimonSays = () => {
  const colors = ['#e74c3c', '#2ecc71', '#3498db', '#f1c40f'];
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      generateSequence();
    }
  }, [isPlaying]);

  const generateSequence = () => {
    const newSequence = [...sequence];
    newSequence.push(Math.floor(Math.random() * 4));
    setSequence(newSequence);
    playSequence(newSequence);
  };

  const playSequence = (seq) => {
    seq.forEach((colorIndex, i) => {
      timeoutRef.current = setTimeout(() => {
        highlightColor(colorIndex);
      }, i * 800);
    });
  };

  const highlightColor = (index) => {
    const buttons = document.querySelectorAll('.simon-button');
    buttons[index].style.opacity = '0.5';
    setTimeout(() => {
      buttons[index].style.opacity = '1';
    }, 300);
  };

  const handleColorClick = (index) => {
    if (!isPlaying) return;
    
    highlightColor(index);
    const newInput = [...playerInput, index];
    
    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      gameOver();
      return;
    }

    if (newInput.length === sequence.length) {
      setLevel(l => l + 1);
      setPlayerInput([]);
      setTimeout(generateSequence, 1000);
    } else {
      setPlayerInput(newInput);
    }
  };

  const gameOver = () => {
    setIsPlaying(false);
    setSequence([]);
    setPlayerInput([]);
    setLevel(1);
  };

  const startGame = () => {
    setIsPlaying(true);
    setPlayerInput([]);
    setSequence([]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Simon Says</h2>
      <p style={styles.level}>Level: {level}</p>
      
      <div style={styles.board}>
        {colors.map((color, index) => (
          <button
            key={index}
            className="simon-button"
            style={{
              ...styles.button,
              backgroundColor: color,
            }}
            onClick={() => handleColorClick(index)}
          />
        ))}
      </div>

      {!isPlaying && (
        <button style={styles.startButton} onClick={startGame}>
          Start Game
        </button>
      )}

      <GameControls onReset={gameOver} />
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
    marginBottom: '1rem',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    maxWidth: '400px',
    margin: '2rem auto',
  },
  button: {
    width: '150px',
    height: '150px',
    borderRadius: '15px',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
  },
  level: {
    fontSize: '1.5rem',
    color: '#7f8c8d',
  },
  startButton: {
    padding: '0.8rem 2rem',
    fontSize: '1.2rem',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '1rem 0',
  }
};

export default SimonSays;