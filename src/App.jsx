import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DataSciPortfolio from './components/DataSciPortfolio';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data-science-portfolio" element={<DataSciPortfolio />} />
      </Routes>
    </div>
  );
}

export default App;