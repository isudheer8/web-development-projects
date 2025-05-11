import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>Mini Arcade</Link>
      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/tic-tac-toe" style={styles.link}>Tic Tac Toe</Link>
        <Link to="/rock-paper-scissors" style={styles.link}>RPS</Link>
        <Link to="/memory-game" style={styles.link}>Memory Game</Link>
        <Link to="/hangman" style={styles.link}>Hangman</Link>
        <Link to="/snake-game" style={styles.link}>Snake Game</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white',
  },
  logo: {
    fontSize: '1.5rem',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  linksContainer: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
  }
};

export default Navbar;