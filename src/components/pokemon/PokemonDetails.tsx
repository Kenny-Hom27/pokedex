import { useState, useRef } from "react";
import type { Pokemon } from "../../types/pokemon";
import styles from "./PokemonDetails.module.css";
import { POKEMON_ATTACK } from "../../constants";

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
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{pokemon.name}</span>
        <span className={styles.hp}>HP {pokemon.stats[0]?.base_stat}</span>
      </div>

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
          alt={pokemon.name}
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

      <div className={styles.stats}>
        <ul>
          {pokemon.stats.map((s) => (
            <li key={s.stat.name}>
              <span className={styles.statsName}>{s.stat.name}</span>
              <span>{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <audio ref={audioRef} src={pokemon.cries.latest} preload="auto" />
        <button onClick={handlePlay} className={styles.attackButton}>
          {POKEMON_ATTACK}
        </button>
      </div>
    </div>
  );
}
