import { useState } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  const choices = ['Rock', 'Paper', 'Scissors'];

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'draw';
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handlePlay = (choice) => {
    const computer = getComputerChoice();
    const outcome = determineWinner(choice, computer);
    
    setPlayerChoice(choice);
    setComputerChoice(computer);
    
    setScore(prev => ({
      wins: outcome === 'win' ? prev.wins + 1 : prev.wins,
      losses: outcome === 'lose' ? prev.losses + 1 : prev.losses,
      draws: outcome === 'draw' ? prev.draws + 1 : prev.draws
    }));
    
    setResult(outcome);
  };

  const handleReset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ wins: 0, losses: 0, draws: 0 });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Rock Paper Scissors</h2>
      
      <div style={styles.scoreboard}>
        <p>Wins: {score.wins}</p>
        <p>Losses: {score.losses}</p>
        <p>Draws: {score.draws}</p>
      </div>

      <div style={styles.choices}>
        {choices.map((choice) => (
          <button
            key={choice}
            style={styles.choiceButton}
            onClick={() => handlePlay(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {playerChoice && (
        <div style={styles.results}>
          <p>Your choice: {playerChoice}</p>
          <p>Computer's choice: {computerChoice}</p>
          <h3 style={styles.resultText}>
            {result === 'win' && 'You Won! 🎉'}
            {result === 'lose' && 'You Lost! 😢'}
            {result === 'draw' && 'Draw! 🤝'}
          </h3>
        </div>
      )}

      <GameControls onReset={handleReset} />
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
  choices: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    margin: '2rem 0',
  },
  choiceButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textTransform: 'capitalize',
  },
  results: {
    margin: '2rem auto',
    padding: '1rem',
    backgroundColor: '#ecf0f1',
    borderRadius: '8px',
    maxWidth: '400px',
  },
  resultText: {
    color: '#2c3e50',
    margin: '1rem 0',
  },
  scoreboard: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '2rem',
    fontSize: '1.1rem',
  }
};

export default RockPaperScissors;