import { useState } from 'react';
import { useUser } from '../lib/hooks';
import Layout from '../components/Layout';

import RestaurantResearchForm from '../components/RestaurantResearchForm';

const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const user = useUser();

  return (
    <Layout>
      <h2>Are there any food that you absolutely can’t live without ?</h2>

      <RestaurantResearchForm
        handleBusinesses={(newArray) => setBusinesses(newArray)}
      />

      <div className="businessesContainer">
        {businesses.length > 0 &&
          businesses.map((item) => <h3>{item.name}</h3>)}
      </div>

      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
