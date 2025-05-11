import { useState, useEffect } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const SnakeGame = () => {
  const GRID_SIZE = 20;
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Generate new food position
  const generateFood = () => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE)
  });

  // Reset game state
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
  };

  // Keyboard controls handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  // Game movement logic
  useEffect(() => {
    if (gameOver || (direction.x === 0 && direction.y === 0)) return;

    const gameInterval = setInterval(() => {
      setSnake((prev) => {
        const head = { 
          x: prev[0].x + direction.x,
          y: prev[0].y + direction.y
        };

        // Check collisions
        if (head.x < 0 || head.x >= GRID_SIZE || 
            head.y < 0 || head.y >= GRID_SIZE ||
            prev.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        // Check food consumption
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood());
          setScore(s => s + 1);
          return [head, ...prev];
        }

        return [head, ...prev.slice(0, -1)];
      });
    }, 200); // Slower movement (200ms interval)

    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Snake Game</h2>
      <p style={styles.score}>Score: {score}</p>
      {gameOver && <p style={styles.gameOver}>Game Over!</p>}
      
      <div style={styles.grid}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              style={{
                ...styles.cell,
                backgroundColor: isSnake ? '#2ecc71' : isFood ? '#e74c3c' : '#ecf0f1'
              }}
            />
          );
        })}
      </div>

      <GameControls onReset={resetGame} />
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${20}, 20px)`,
    gap: '2px',
    justifyContent: 'center',
    margin: '1rem auto',
    backgroundColor: '#bdc3c7',
    padding: '2px',
    borderRadius: '5px',
  },
  cell: {
    width: '20px',
    height: '20px',
    borderRadius: '3px',
  },
  score: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    margin: '0.5rem 0',
  },
  gameOver: {
    color: '#e74c3c',
    fontSize: '1.5rem',
    margin: '1rem 0',
  }
};

export default SnakeGame;