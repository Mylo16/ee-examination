import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import './App.css';
import Navbar from './components/Navbar';
import Results from './components/Results';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/quiz' element={<Quiz />} />
        <Route exact path='/results' element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
