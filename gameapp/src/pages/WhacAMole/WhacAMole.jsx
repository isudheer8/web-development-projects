import { useState, useEffect, useRef } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const WhacAMole = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [isPlaying, setIsPlaying] = useState(false);

  const moleIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const timeouts = useRef([]);

  useEffect(() => {
    if (isPlaying) {
      setMoles(Array(9).fill(false));
      setScore(0);
      setTimeLeft(30);

      // Timer interval
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      // Mole popping logic
      moleIntervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * 9);
        setMoles(currentMoles => {
          const newMoles = [...currentMoles];
          newMoles[randomIndex] = true;
          return newMoles;
        });

        const timeout = setTimeout(() => {
          setMoles(currentMoles => {
            const newMoles = [...currentMoles];
            newMoles[randomIndex] = false;
            return newMoles;
          });
        }, 1500);

        timeouts.current.push(timeout);
      }, 2000);
    }

    return () => {
      clearInterval(timerIntervalRef.current);
      clearInterval(moleIntervalRef.current);
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [isPlaying]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [timeLeft]);

  const whackMole = (index) => {
    if (moles[index] && isPlaying) {
      setScore(s => s + 10);
      setMoles(currentMoles => {
        const newMoles = [...currentMoles];
        newMoles[index] = false;
        return newMoles;
      });
    }
  };

  const startGame = () => {
    setIsPlaying(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Whac-a-Mole!</h2>
      <div style={styles.scoreBoard}>
        <p style={styles.score}>Score: {score}</p>
        <p style={styles.timer}>Time: {timeLeft}s</p>
      </div>

      <div style={styles.grid}>
        {moles.map((isUp, index) => (
          <button
            key={index}
            style={{
              ...styles.moleButton,
              backgroundColor: isUp ? '#e74c3c' : '#2ecc71',
              transform: `translateY(${isUp ? '-30%' : '0'})`
            }}
            onClick={() => whackMole(index)}
            disabled={!isPlaying}
          >
            {isUp ? '🐭' : '🕳️'}
          </button>
        ))}
      </div>

      {!isPlaying && (
        <div style={styles.controls}>
          {timeLeft === 0 && <p style={styles.gameOver}>Game Over! Final Score: {score}</p>}
          <button style={styles.startButton} onClick={startGame}>
            {timeLeft === 0 ? 'Play Again' : 'Start Game'}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    color: '#2c3e50',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  scoreBoard: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    margin: '1rem 0',
  },
  score: {
    color: '#27ae60',
    fontSize: '1.2rem',
  },
  timer: {
    color: '#e67e22',
    fontSize: '1.2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    maxWidth: '400px',
    margin: '1rem auto',
  },
  moleButton: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    fontSize: '2rem',
    transition: 'all 0.2s ease-in-out',
  },
  controls: {
    marginTop: '2rem',
  },
  startButton: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  gameOver: {
    color: '#e74c3c',
    fontSize: '1.5rem',
    margin: '1rem 0',
  }
};

export default WhacAMole;
