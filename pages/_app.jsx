import Head from 'next/head';
import '../styles/global.css';

// eslint-disable-next-line react/prop-types
function Xelp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      );
    </>
  );
}

export default Xelp;
