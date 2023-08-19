import styles from './Navbar.module.scss'
import Logo from '../Logo/Logo'

export default function Navbar({ categories, activeCat, setActiveCat }) {
  const cats = categories.map(cat =>
    <li
      key={cat}
      className={cat === activeCat ? styles.active : ''}
      // FYI, the below will also work, but will give a warning
      // className={cat === activeCat && 'active'}
      onClick={() => setActiveCat(cat)}
    >
      {cat}
    </li>
  )
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {cats}
      </ul>
    </nav>
  )
}