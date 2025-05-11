import { useState } from 'react';
import GameControls from '../../components/GameControls/GameControls';

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const createBoardState = () => initialBoard.map(row => 
  row.map(value => ({
    value,
    isEditable: value === 0,
    isValid: true
  }))
);

const SudokuGame = () => {
  const [history, setHistory] = useState([createBoardState()]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedCell, setSelectedCell] = useState(null);
  const [mistakes, setMistakes] = useState(0);

  const currentBoard = history[historyIndex];

  const isValidMove = (row, col, value) => {
    if (value === 0) return true;
    
    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && currentBoard[row][i].value === value) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && currentBoard[i][col].value === value) return false;
    }
    
    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (i !== row && j !== col && currentBoard[i][j].value === value) return false;
      }
    }
    
    return true;
  };

  const handleCellClick = (row, col) => {
    if (currentBoard[row][col].isEditable) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (number) => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    const newBoard = JSON.parse(JSON.stringify(currentBoard));
    const isValid = isValidMove(row, col, number);
    
    newBoard[row][col] = {
      ...newBoard[row][col],
      value: number,
      isValid
    };
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBoard);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    if (!isValid) setMistakes(m => m + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setHistory([createBoardState()]);
    setHistoryIndex(0);
    setMistakes(0);
    setSelectedCell(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sudoku</h2>
      <p style={styles.mistakes}>Mistakes: {mistakes}</p>
      
      <div style={styles.grid}>
        {currentBoard.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{
                  ...styles.cell,
                  ...(cell.isEditable && styles.editableCell),
                  ...(selectedCell?.row === rowIndex && 
                      selectedCell?.col === colIndex && styles.selectedCell),
                  ...(!cell.isValid && styles.invalidCell),
                  borderLeft: colIndex % 3 === 0 ? '2px solid #2c3e50' : 'none',
                  borderTop: rowIndex % 3 === 0 ? '2px solid #2c3e50' : 'none'
                }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell.value !== 0 ? cell.value : ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={styles.controls}>
        <div style={styles.numberPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              style={styles.numberButton}
              onClick={() => handleNumberInput(num)}
            >
              {num}
            </button>
          ))}
          <button
            style={styles.numberButton}
            onClick={() => handleNumberInput(0)}
          >
            Clear
          </button>
        </div>

        <div style={styles.historyControls}>
          <button
            style={styles.undoButton}
            onClick={handleUndo}
            disabled={historyIndex === 0}
          >
            Undo
          </button>
          <button
            style={styles.redoButton}
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
          >
            Redo
          </button>
        </div>
      </div>

      <GameControls onReset={resetGame} />
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
    marginBottom: '1rem',
  },
  grid: {
    display: 'inline-block',
    border: '2px solid #2c3e50',
    margin: '1rem 0',
  },
  row: {
    display: 'flex',
  },
  cell: {
    width: '40px',
    height: '40px',
    border: '1px solid #bdc3c7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  editableCell: {
    backgroundColor: '#ecf0f1',
  },
  selectedCell: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  invalidCell: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  mistakes: {
    color: '#e74c3c',
    fontSize: '1.1rem',
    margin: '0.5rem 0',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    margin: '1rem 0',
  },
  numberPad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
    maxWidth: '300px',
  },
  numberButton: {
    padding: '8px',
    fontSize: '1.1rem',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#27ae60',
    }
  },
  historyControls: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  undoButton: {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:disabled': {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    }
  },
  redoButton: {
    padding: '8px 16px',
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:disabled': {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    }
  }
};

export default SudokuGame;