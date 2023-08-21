import styles from './MenuListItem.module.scss'

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <div className={styles.MenuListItem}>
      <img src={menuItem.emojiURL} width="100" height="100" />
      <div className={styles.menuContent}>
        <div className={styles.name}>{menuItem.name}</div>
        <div className={styles.description}>{menuItem.description}</div>
        <div className={styles.buy}>
          <div className={styles.price}>${menuItem.price.toFixed(2)}</div>
          <button className="btn-sm" onClick={() => handleAddToOrder(menuItem._id)}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}