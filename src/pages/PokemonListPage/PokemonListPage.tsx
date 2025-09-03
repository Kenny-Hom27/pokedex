import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { fetchPokemonList } from "../../utils/api";
import type { PokemonListResult } from "../../types/pokemon";
import PokemonCard from "../../components/pokemon/PokemonCard/PokemonCard";
import Button from "../../components/common/Button";
import styles from "./PokemonListPage.module.css";
import {
  ARIA_LOAD_MORE_POKEMON,
  ARIA_VIEW_DETAILS,
  LOADING,
  OFFSET,
  POKEMON_HEADER,
  POKEMON_LOADING_ERROR,
  SEARCH_POKEMON,
  SHOW_MORE,
} from "../../constants";

export default function PokemonListPage() {
  const [pokemon, setPokemon] = useState<PokemonListResult[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchPokemonList(0, OFFSET)
      .then((data) => setPokemon(data.results))
      .catch((err) => console.error(POKEMON_LOADING_ERROR, err));
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
    const newOffset = currentOffset + OFFSET;
    setCurrentOffset(newOffset);
    loadPokemon(newOffset);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main>
      <h2 className={styles.header}>{POKEMON_HEADER}</h2>

      <div className={styles.filterWrapper}>
        <label htmlFor="pokemon-filter" className={styles.filterLabel}>
          {SEARCH_POKEMON}
        </label>
        <input
          id="pokemon-filter"
          type="text"
          onChange={handleFilterChange}
          value={filter}
          className={styles.filterInput}
          placeholder="Search"
        />
      </div>

      <ul className={styles.grid} role="list">
        {filteredPokemon.map((p) => {
          const id = Number(
            p.url
              .split("/")
              .filter((str) => str)
              .pop()
          );

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
