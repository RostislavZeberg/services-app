import React from 'react';
import { useAppSelector } from '../../hooks';
import styles from './CartIcon.module.scss';

interface CartIconProps {
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const itemCount = useAppSelector(state => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <button 
      className={styles.cartIcon}
      onClick={onClick}
      aria-label={`Корзина покупок, ${itemCount} товаров`}
    >
      <svg 
        className={styles.icon}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      
      {itemCount > 0 && (
        <span className={styles.badge}>{itemCount > 99 ? '99+' : itemCount}</span>
      )}
    </button>
  );
};

export default CartIcon;