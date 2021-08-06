import Head from 'next/head';
import Header from '../Header';
import css from './Layout.module.css';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => (
  <>
    <Head>
      <title>Xelp</title>
    </Head>

    <Header />

    <main data-testid="layout">
      <div className={css.container}>{children}</div>
    </main>
  </>
);

export default Layout;
