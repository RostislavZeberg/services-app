import React from 'react';
import { services } from '../../data/services';
import styles from './ServiceList.module.scss';
import { useAppDispatch } from '../../hooks';
import { addToCart } from '../../store/cartSlice';
import type { Service } from '../../types';

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = () => {
  const dispatch = useAppDispatch();
  
  const handleAddToCart = (service: Service) => {
    dispatch(addToCart(service));
  };
  
  const handleKeyPress = (event: React.KeyboardEvent, service: Service) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAddToCart(service);
    }
  };
  
  return (
    <div className={styles.serviceList}>
      <h2 className={styles.title}>Наши услуги</h2>
      <div className={styles.grid}>
        {services.map(service => (
          <div 
            key={service.id} 
            className={styles.card}
            tabIndex={0}
            role="article"
            aria-label={`Услуга: ${service.name}, Цена: ${service.price} рублей`}
          >
            <div className={styles.cardContent}>
              <span className={styles.category}>{service.category}</span>
              <h3 className={styles.name}>{service.name}</h3>
              <p className={styles.description}>{service.description}</p>
              <div className={styles.footer}>
                <span className={styles.price}>{service.price.toLocaleString()} ₽</span>
                <button 
                  className={styles.addButton}
                  onClick={() => handleAddToCart(service)}
                  onKeyPress={(e) => handleKeyPress(e, service)}
                  aria-label={`Добавить ${service.name} в корзину за ${service.price} рублей`}
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;