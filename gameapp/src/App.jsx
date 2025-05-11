import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import TicTacToe from './pages/TicTacToe/TicTacToe';
import RockPaperScissors from './pages/RockPaperScissors/RockPaperScissors';
import GuessTheNumber from './pages/GuessTheNumber/GussTheNumber';
import Hangman from './pages/Hangman/Hangman';
import SimonSays from './pages/SimonSays/SimonSays';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import SnakeGame from './pages/SnakeGame/SnakeGame';
import SudokuGame from './pages/SudokuGame/SudokuGame';
import MathDuel from './pages/MathDuel/MathDuel';
import WhacAMole from './pages/WhacAMole/WhacAMole';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
            <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
            <Route path="/guess-the-number" element={<GuessTheNumber />} />
            <Route path="/memory-game" element={<MemoryGame />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/simon-says" element={<SimonSays />} />
            <Route path="/snake-game" element={<SnakeGame />} />
            <Route path="/sudoku-game" element={<SudokuGame />} />
            <Route path="/whac-a-mole" element={<WhacAMole />} />
            <Route path="/math-duel" element={<MathDuel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;