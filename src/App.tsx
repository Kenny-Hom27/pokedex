import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
