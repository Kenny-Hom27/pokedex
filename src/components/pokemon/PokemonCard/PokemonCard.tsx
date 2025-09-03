import styles from "./PokemonCard.module.css";

interface PokemonCardProps {
  id: number;
  name: string;
}

export default function PokemonCard({ id, name }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <article className={styles.card} aria-label={`Pokémon card for ${name}`}>
      <img src={imageUrl} alt={`Sprite of ${name}`} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
    </article>
  );
}
