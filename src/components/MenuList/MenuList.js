import styles from './MenuList.module.scss'
import MenuListItem from '../MenuListItem/MenuListItem'

export default function MenuList({ menuItems, handleAddToOrder }) {
  const items = menuItems.map(item =>
    <MenuListItem
      key={item._id}
      handleAddToOrder={handleAddToOrder}
      menuItem={item}
    />
  );
  return (
    <div className={styles.MenuList}>
      {items}
    </div>
  );
}