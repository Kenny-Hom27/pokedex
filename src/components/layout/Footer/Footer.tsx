import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Pokédex Project</p>
      <p>Built by Kenny Hom</p>
    </footer>
  );
}
