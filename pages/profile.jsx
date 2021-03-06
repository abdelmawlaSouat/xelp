import Head from 'next/head';
import { useUser } from '../lib/hooks';
import Layout from '../components/Layout';

const Profile = () => {
  const [user] = useUser();

  return (
    <Layout>
      <Head>
        <title>Xelp - Your Profile</title>
      </Head>

      <h1>Profile</h1>

      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  );
};

export default Profile;
