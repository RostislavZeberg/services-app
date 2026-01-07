import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(state => state.cart);
  
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
  };
  
  // Обработчики для клавиатуры
  const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };
  
  if (items.length === 0) {
    return (
      <div className={styles.cart} role="region" aria-label="Корзина покупок">
        <h2 className={styles.title}>Корзина</h2>
        <div className={styles.empty} aria-live="polite">
          <p>Корзина пуста</p>
          <p>Добавьте услуги из списка</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.cart} role="region" aria-label="Корзина покупок">
      <div className={styles.header}>
        <h2 className={styles.title}>Корзина</h2>
        <button 
          className={styles.clearButton}
          onClick={handleClearCart}
          onKeyPress={(e) => handleKeyPress(e, handleClearCart)}
          aria-label="Очистить корзину"
        >
          Очистить
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
                  onKeyPress={(e) => handleKeyPress(e, () => handleQuantityChange(item.id, item.quantity - 1))}
                  aria-label={`Уменьшить количество ${item.name}`}
                  disabled={item.quantity <= 1}
                >
                  -
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
                  onKeyPress={(e) => handleKeyPress(e, () => handleQuantityChange(item.id, item.quantity + 1))}
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
                onKeyPress={(e) => handleKeyPress(e, () => handleRemove(item.id))}
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
        
        <button 
          className={styles.checkoutButton}
          onClick={handleCheckout}
          onKeyPress={(e) => handleKeyPress(e, handleCheckout)}
          aria-label={`Оформить заказ на сумму ${total} рублей`}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default Cart;