import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import PokemonListPage from "./pages/PokemonListPage/PokemonListPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage/PokemonDetailsPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
