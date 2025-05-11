import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{game.name}</h3>
      <p style={styles.description}>{game.description}</p>
      <Link to={game.path} style={styles.button}>Play Now</Link>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    padding: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  title: {
    color: '#2c3e50',
    margin: '0 0 1rem 0',
  },
  description: {
    color: '#7f8c8d',
    marginBottom: '1.5rem',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
  }
};

export default GameCard;