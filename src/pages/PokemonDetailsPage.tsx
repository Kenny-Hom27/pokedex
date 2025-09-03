import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPokemonById } from "../utils/api";
import type { Pokemon } from "../types/pokemon";
import styles from "./PokemonDetailsPage.module.css";
import PokemonDetails from "../components/pokemon/PokemonDetails";
import Button from "../components/common/Button";
import {
  ARIA_BACK_TO_POKEDEX,
  ARIA_POKEMON_GOTO,
  ARIA_POKEMON_NAV,
  LOADING,
  NO_POKEMON_FOUND,
  POKEDEX_BACK,
  POKEMON_LOADING_ERROR,
  POKEMON_NEXT,
  POKEMON_PREVIOUS,
} from "../constants";

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const currentId = Number(id);
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId + 1;

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchPokemonById(id)
      .then((data) => {
        setPokemon(data);
        setError(null);
      })
      .catch(() => setError(POKEMON_LOADING_ERROR))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>{LOADING}</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>{NO_POKEMON_FOUND}</p>;

  return (
    <main>
      <nav aria-label={ARIA_BACK_TO_POKEDEX}>
        <Link
          to="/"
          className={styles.navButton}
          aria-label={ARIA_BACK_TO_POKEDEX}
        >
          {POKEDEX_BACK}
        </Link>
      </nav>

      <PokemonDetails pokemon={pokemon} />

      <nav
        className={`${styles.buttonRow} ${!prevId ? styles.flexEnd : ""} ${
          !nextId ? styles.flexStart : ""
        }`}
        aria-label={ARIA_POKEMON_NAV}
      >
        {prevId && (
          <Button
            handleClick={() => navigate(`/pokemon/${prevId}`)}
            className={styles.navButton}
            text={POKEMON_PREVIOUS}
            ariaLabel={`${ARIA_POKEMON_GOTO} ${prevId}`}
          />
        )}

        {nextId && (
          <Button
            handleClick={() => navigate(`/pokemon/${nextId}`)}
            className={styles.navButton}
            text={POKEMON_NEXT}
            ariaLabel={`${ARIA_POKEMON_GOTO} ${nextId}`}
          />
        )}
      </nav>
    </main>
  );
}
