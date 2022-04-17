/** @jsxImportSource @emotion/react */

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import PokeList from './pages/pokelist';
import PokeDetail from './pages/pokedetail';
import NavBar from './components/Navbar';
import MyPoke from './pages/mypoke';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route exact path="/" element={<PokeList/>} />
          <Route path="/poke/:name" element={<PokeDetail/>} />
          <Route path="/MyPokemon" element={<MyPoke/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <PokeList/>
    // </div>
  );
}

export default App;
