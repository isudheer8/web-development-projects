import GameCard from "../../components/GameCard/GameCard";

const Home = () => {
  const games = [
    { id: 1, name: 'Tic Tac Toe', path: '/tic-tac-toe', description: 'Classic 3x3 grid game' },
    { id: 2, name: 'Rock Paper Scissors', path: '/rock-paper-scissors', description: 'Beat the computer!' },
    { id: 3, name: 'Guess the Number', path: '/guess-the-number', description: 'Test your intuition' },
    { id: 4, name: 'Memory Game', path: '/memory-game', description: 'Test your remembering skills' },
    { 
      id: 5, 
      name: 'Hangman', 
      path: '/hangman', 
      description: 'Word-guessing challenge with limited attempts' 
    },
    { 
      id: 6, 
      name: 'Simon Says', 
      path: '/simon-says', 
      description: 'Repeat the growing color sequence' 
    },
    { 
      id: 7, 
      name: 'Snake Game', 
      path: '/snake-game', 
      description: 'Classic snake navigation & growth challenge' 
    },
    { 
      id: 8, 
      name: 'Sudoku Game', 
      path: '/sudoku-game', 
      description: 'Logical number placement puzzle' 
    },
    { 
      id: 9, 
      name: 'Whac A Mole', 
      path: '/whac-a-mole', 
      description: 'Quick reflexes mole-whacking arcade' 
    },
    { 
      id: 10, 
      name: 'Math Duel', 
      path: '/math-duel', 
      description: 'Fast-paced arithmetic calculation battle' 
    }]

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Mini Arcade</h1>
      <div style={styles.grid}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  }
};

export default Home;