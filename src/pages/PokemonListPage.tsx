import { useEffect, useState } from "react";
import { fetchPokemonList } from "../utils/api";
import type { PokemonListResult } from "../types/pokemon";
import PokemonCard from "../components/pokemon/PokemonCard";
import { Link } from "react-router-dom";
import styles from "./PokemonListPage.module.css";
import Button from "../components/common/Button";
import {
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
    <div>
      <h1 className={styles.header}>{POKEMON_HEADER}</h1>
      <div className={styles.grid}>
        {pokemon.map((p, idx) => {
          const id = idx + 1;
          return (
            <Link key={p.name} to={`/pokemon/${id}`}>
              <PokemonCard id={id} name={p.name} />
            </Link>
          );
        })}
      </div>

      <div className={styles.loadMoreWrapper}>
        <Button
          className={styles.loadMoreButton}
          handleClick={handleShowMore}
          text={loading ? LOADING : SHOW_MORE}
        />
      </div>
    </div>
  );
}
