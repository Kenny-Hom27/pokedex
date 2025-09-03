import { useEffect, useState } from "react";
import { fetchPokemonList } from "../utils/api";
import type { PokemonListResult } from "../types/pokemon";
import PokemonCard from "../components/pokemon/PokemonCard";
import { Link } from "react-router-dom";
import styles from "./PokemonListPage.module.css";
import Button from "../components/common/Button";
import {
  ARIA_LOAD_MORE_POKEMON,
  ARIA_VIEW_DETAILS,
  LOADING,
  OFFSET,
  POKEMON_HEADER,
  POKEMON_LOADING_ERROR,
  SHOW_MORE,
} from "../constants";

export default function PokemonListPage() {
  const [pokemon, setPokemon] = useState<PokemonListResult[]>([]);
  const [currentOffSet, setCurrentOffSet] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokemonList(0, OFFSET).then((data) => {
      setPokemon(data.results);
    });
  }, []);

  const loadPokemon = async (newOffset: number) => {
    setLoading(true);
    try {
      const data = await fetchPokemonList(newOffset, OFFSET);
      setPokemon((prev) => [...prev, ...data.results]);
    } catch (err) {
      console.error(POKEMON_LOADING_ERROR, err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    const newOffset = currentOffSet + OFFSET;
    setCurrentOffSet(newOffset);
    loadPokemon(newOffset);
  };

  return (
    <main>
      <h2 className={styles.header}>{POKEMON_HEADER}</h2>

      <ul className={styles.grid} role="list">
        {pokemon.map((p, idx) => {
          const id = idx + 1;
          return (
            <li key={p.name}>
              <Link
                to={`/pokemon/${id}`}
                className={styles.cardLink}
                aria-label={`${ARIA_VIEW_DETAILS} ${p.name}`}
              >
                <PokemonCard id={id} name={p.name} />
              </Link>
            </li>
          );
        })}
      </ul>

      <nav
        className={styles.loadMoreWrapper}
        aria-label={ARIA_LOAD_MORE_POKEMON}
      >
        <Button
          className={styles.loadMoreButton}
          handleClick={handleShowMore}
          text={loading ? LOADING : SHOW_MORE}
          ariaLabel={ARIA_LOAD_MORE_POKEMON}
          disabled={loading}
        />
      </nav>
    </main>
  );
}
