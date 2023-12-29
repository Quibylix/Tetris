import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img src="/tetris-icon.png" alt="Tetris logo" />
      <h1 className={styles.title}>TETRIS</h1>
      <img src="/tetris-icon.png" alt="Tetris logo" />
    </nav>
  );
}
