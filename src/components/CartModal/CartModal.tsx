import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import styles from './CartModal.module.scss';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(state => state.cart);
  
  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Блокируем скролл
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  // Клик по оверлею
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  const handleCheckout = () => {
    alert('Заказ оформлен! Общая сумма: ' + total.toLocaleString() + ' ₽');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={styles.overlay} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Корзина покупок"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Корзина покупок</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть корзину"
          >
            ×
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className={styles.empty} aria-live="polite">
            <div className={styles.emptyIcon}>🛒</div>
            <p>Корзина пуста</p>
            <p>Добавьте услуги из списка</p>
            <button 
              className={styles.continueShopping}
              onClick={onClose}
            >
              Продолжить покупки
            </button>
          </div>
        ) : (
          <>
            <div className={styles.controls}>
              <span className={styles.itemCount}>
                Товаров: {items.reduce((total, item) => total + item.quantity, 0)}
              </span>
              <button 
                className={styles.clearButton}
                onClick={handleClearCart}
                aria-label="Очистить корзину"
              >
                Очистить корзину
              </button>
            </div>
            
            <div className={styles.items} role="list" aria-label="Выбранные услуги">
              {items.map(item => (
                <div 
                  key={item.id} 
                  className={styles.item}
                  role="listitem"
                  aria-label={`${item.name}, количество: ${item.quantity}, цена: ${item.price} рублей`}
                >
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <span className={styles.itemPrice}>{item.price.toLocaleString()} ₽</span>
                  </div>
                  
                  <div className={styles.itemControls}>
                    <div className={styles.quantityControl}>
                      <button 
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        aria-label={`Уменьшить количество ${item.name}`}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span 
                        className={styles.quantity}
                        aria-label={`Количество: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button 
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        aria-label={`Увеличить количество ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    
                    <div 
                      className={styles.itemSubtotal}
                      aria-label={`Итого за ${item.name}: ${item.price * item.quantity} рублей`}
                    >
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </div>
                    
                    <button 
                      className={styles.removeButton}
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Удалить ${item.name} из корзины`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.summary}>
              <div className={styles.totalRow}>
                <span>Итого:</span>
                <span 
                  className={styles.totalAmount}
                  aria-label={`Общая сумма: ${total} рублей`}
                >
                  {total.toLocaleString()} ₽
                </span>
              </div>
              
              <div className={styles.actions}>
                <button 
                  className={styles.continueButton}
                  onClick={onClose}
                >
                  Продолжить покупки
                </button>
                <button 
                  className={styles.checkoutButton}
                  onClick={handleCheckout}
                  aria-label={`Оформить заказ на сумму ${total} рублей`}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;