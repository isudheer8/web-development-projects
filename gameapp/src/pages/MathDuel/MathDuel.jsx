import { useState, useEffect } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const operations = ['+', '-', '×'];
const difficultyLevels = [
  { maxNumber: 10, time: 10 },    // Level 1
  { maxNumber: 20, time: 15 },     // Level 2
  { maxNumber: 30, time: 20 },     // Level 3
  { maxNumber: 50, time: 22 },     // Level 4
  { maxNumber: 100, time: 25 },    // Level 5
];

const generateProblem = (level) => {
  const { maxNumber } = difficultyLevels[level];
  const num1 = Math.floor(Math.random() * maxNumber) + 1;
  const num2 = Math.floor(Math.random() * maxNumber) + 1;
  const op = operations[Math.floor(Math.random() * operations.length)];

  let answer;
  switch(op) {
    case '+': answer = num1 + num2; break;
    case '-': answer = num1 - num2; break;
    case '×': answer = num1 * num2; break;
    default: answer = 0;
  }

  return {
    problem: `${num1} ${op} ${num2}`,
    answer,
    level,
  };
};

const MathDuel = () => {
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [level, setLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLevel(0);
    setProblem(generateProblem(0));
    setTimeLeft(difficultyLevels[0].time);
    setUserAnswer('');
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    if (!problem || !isPlaying) return;

    if (parseInt(userAnswer) === problem.answer) {
      // Correct answer
      setScore(s => s + (level + 1) * 10);
      const newLevel = score + 1 >= (level + 1) * 5 ? Math.min(level + 1, 4) : level;
      setLevel(newLevel);
      setProblem(generateProblem(newLevel));
      setTimeLeft(difficultyLevels[newLevel].time);
    } else {
      // Wrong answer
      endGame();
    }
    setUserAnswer('');
  };

  const endGame = () => {
    setIsPlaying(false);
    setTimeLeft(0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Math Duel!</h2>
      <div style={styles.stats}>
        <p style={styles.score}>Score: {score}</p>
        <p style={styles.level}>Level: {level + 1}</p>
        <p style={styles.timer}>Time: {timeLeft}s</p>
      </div>

      {isPlaying ? (
        <form onSubmit={checkAnswer} style={styles.gameArea}>
          <div style={styles.problem}>
            {problem?.problem} = ?
          </div>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            style={styles.input}
            autoFocus
            disabled={!isPlaying}
          />
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      ) : (
        <div style={styles.controls}>
          {timeLeft === 0 && (
            <p style={styles.gameOver}>Game Over! Final Score: {score}</p>
          )}
          <button style={styles.startButton} onClick={startGame}>
            Start Game
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
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    margin: '1rem 0',
  },
  score: {
    color: '#27ae60',
    fontSize: '1.2rem',
  },
  level: {
    color: '#2980b9',
    fontSize: '1.2rem',
  },
  timer: {
    color: '#e67e22',
    fontSize: '1.2rem',
  },
  gameArea: {
    margin: '2rem 0',
  },
  problem: {
    fontSize: '3rem',
    margin: '1rem 0',
    color: '#2c3e50',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1.5rem',
    width: '150px',
    margin: '1rem',
    textAlign: 'center',
    borderRadius: '5px',
    border: '2px solid #3498db',
  },
  submitButton: {
    padding: '0.8rem 2rem',
    fontSize: '1.2rem',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '1rem auto',
    '&:hover': {
      backgroundColor: '#27ae60',
    }
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
    '&:hover': {
      backgroundColor: '#2980b9',
    }
  },
  gameOver: {
    color: '#e74c3c',
    fontSize: '1.5rem',
    margin: '1rem 0',
  }
};

export default MathDuel;