import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ServiceList from './components/ServiceList/ServiceList';
import CartModal from './components/CartModal/CartModal';
import Layout from './components/Layout/Layout';
import { services } from './data/services';
import './App.scss';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Provider store={store}>
      <Layout onCartIconClick={() => setIsCartOpen(true)}>
        <div className="app-container">
          <ServiceList services={services} />
        </div>
      </Layout>
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </Provider>
  );
};

export default App;