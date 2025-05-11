const GameControls = ({ onReset, onUndo }) => {
    return (
      <div style={styles.container}>
        <button onClick={onReset} style={styles.button}>
          Reset Game
        </button>
        <button onClick={onUndo} style={styles.button}>
          Undo Move
        </button>
      </div>
    );
  };
  
  const styles = {
    container: {
      marginTop: '2rem',
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }
  };
  
  export default GameControls;