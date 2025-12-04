import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Rules from './pages/Rules';
import Tutorial from './pages/Tutorial';
import Game from './pages/Game';
import Practice from './pages/Practice';
import Strategy from './pages/Strategy';
import Statistics from './pages/Statistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/tutorial/:moduleId" element={<Tutorial />} />
        <Route path="/game" element={<Game />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;

