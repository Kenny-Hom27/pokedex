import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { POKEDEX_BACK } from "../../../constants";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} aria-label={POKEDEX_BACK}>
        Pokédex
      </Link>
    </header>
  );
}
