import React from 'react';
import CartIcon from '../CartIcon/CartIcon';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  onCartIconClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onCartIconClick }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInfo}>
            <h1>Онлайн-сервис выбора услуг</h1>
            <p>Выберите нужные услуги и добавьте их в корзину</p>
          </div>
          <CartIcon onClick={onCartIconClick} />
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Сервис выбора услуг. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Layout;