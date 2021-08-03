import { useState } from 'react';
import Layout from '../components/Layout';
import BusinessCard from '../components/BusinessCard';
import RestaurantResearchForm from '../components/BusinessResearchForm';
import css from '../styles/index.module.css';

const Home = () => {
  const [businesses, setBusinesses] = useState([]);

  return (
    <Layout>
      <h2>Are there any food that you absolutely can’t live without ?</h2>

      <RestaurantResearchForm
        handleBusinesses={(newArray) => setBusinesses(newArray)}
      />

      <div className={css.businessesContainer}>
        {businesses.length > 0 &&
          businesses.map((business) => (
            <BusinessCard key={business.id} businessData={business} />
          ))}
      </div>
    </Layout>
  );
};

export default Home;
