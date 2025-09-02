import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPokemonById } from "../utils/api";
import type { Pokemon } from "../types/pokemon";
import styles from "./PokemonDetailsPage.module.css";
import PokemonDetails from "../components/pokemon/PokemonDetails";
import Button from "../components/common/Button";
import {
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
  const nextId = currentId < 151 ? currentId + 1 : null;

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
    <div>
      <Link to="/" className={styles.navButton}>
        {POKEDEX_BACK}
      </Link>
      <PokemonDetails pokemon={pokemon} />
      <div className={styles.buttonRow}>
        {prevId && (
          <Button
            handleClick={() => navigate(`/pokemon/${prevId}`)}
            className={styles.navButton}
            text={POKEMON_PREVIOUS}
          />
        )}
        {nextId && (
          <Button
            handleClick={() => navigate(`/pokemon/${nextId}`)}
            className={styles.navButton}
            text={POKEMON_NEXT}
          />
        )}
      </div>
    </div>
  );
}
