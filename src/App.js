/** @jsxImportSource @emotion/react */

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import PokeList from './pages/pokelist';
import PokeDetail from './pages/pokedetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PokeList/>} />
        <Route path="/poke/:name" element={<PokeDetail/>} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <PokeList/>
    // </div>
  );
}

export default App;
