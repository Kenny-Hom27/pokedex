import { useState, useRef } from "react";
import type { Pokemon } from "../../../types/pokemon";
import styles from "./PokemonDetails.module.css";
import { ARIA_STATS, POKEMON_ATTACK } from "../../../constants";

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export default function PokemonDetails({ pokemon }: PokemonDetailProps) {
  const [hovered, setHovered] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  };

  return (
    <div
      className={styles.card}
      role="region"
      aria-label={`${pokemon.name} details`}
    >
      <header className={styles.header}>
        <h2 className={styles.name}>{pokemon.name}</h2>
        <span
          className={styles.hp}
          aria-label={`HP ${pokemon.stats[0]?.base_stat}`}
        >
          HP {pokemon.stats[0]?.base_stat}
        </span>
      </header>

      <div
        className={styles.imageWrapper}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={
            hovered
              ? pokemon.sprites.back_default
              : pokemon.sprites.front_default
          }
          alt={`${pokemon.name} sprite`}
          className={styles.image}
        />
      </div>

      <div className={styles.types}>
        {pokemon.types.map((t) => (
          <span key={t.slot} className={styles.type}>
            {t.type.name}
          </span>
        ))}
      </div>

      <section className={styles.stats} aria-label={ARIA_STATS}>
        <ul>
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              <span className={styles.statsName}>{s.stat.name}</span>
              <span aria-label={`${s.stat.name} ${s.base_stat}`}>
                {s.base_stat}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div>
        <audio ref={audioRef} src={pokemon.cries.latest} preload="auto" />
        <button
          onClick={handlePlay}
          className={styles.attackButton}
          aria-label={`${pokemon.name}'s cry`}
        >
          {POKEMON_ATTACK}
        </button>
      </div>
    </div>
  );
}
