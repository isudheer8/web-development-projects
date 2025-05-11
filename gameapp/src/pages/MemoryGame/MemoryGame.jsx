import { useState, useEffect } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  const symbols = ['🎨', '🎮', '🎲', '🎸', '🎭', '🎪', '🎯', '🎱'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const doubledSymbols = [...symbols, ...symbols];
    const shuffled = doubledSymbols
      .sort(() => Math.random() - 0.5)
      .map((sym, id) => ({ id, sym }));
    
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  const handleClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].sym === cards[second].sym) {
        setSolved([...solved, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
      setMoves(m => m + 1);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Memory Game</h2>
      <p style={styles.moves}>Moves: {moves}</p>
      
      <div style={styles.grid}>
        {cards.map(({ id, sym }) => (
          <button
            key={id}
            style={{
              ...styles.card,
              backgroundColor: flipped.includes(id) || solved.includes(id) 
                ? '#ecf0f1' 
                : '#3498db'
            }}
            onClick={() => handleClick(id)}
            disabled={solved.includes(id)}
          >
            {(flipped.includes(id) || solved.includes(id)) ? sym : '?'}
          </button>
        ))}
      </div>

      <GameControls onReset={initializeGame} />
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    maxWidth: '500px',
    margin: '2rem auto',
  },
  card: {
    width: '80px',
    height: '80px',
    fontSize: '2rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  moves: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
  }
};

export default MemoryGame;