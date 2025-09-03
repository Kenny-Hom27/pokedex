import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";

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
