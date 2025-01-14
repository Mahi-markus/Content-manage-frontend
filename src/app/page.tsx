import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './ContentLayout.module.css';
import ContentLayout from './layout copy'; // Adjust the import path if necessary

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the CMS</h1>
      <ContentLayout>
        <header className={styles.header}>
          <nav>
            <ul className={styles.navList}>
              <li className={styles.navItem}><Link href="/">Home</Link></li>
              <li className={styles.navItem}><Link href="/login">Login</Link></li>
              <li className={styles.navItem}><Link href="/logout">Logout</Link></li>
              <li className={styles.navItem}><Link href="/writers">Writer Dashboard</Link></li>
              {/* <li className={styles.navItem}><Link href="/admin">Admin Dashboard</Link></li> */}
              <li className={styles.navItem}><Link href="/contents">Contents</Link></li>
              <li className={styles.navItem}><Link href="/feedback">Feeback</Link></li>
              <li className={styles.navItem}><Link href="/register">Register</Link></li>
            </ul>
          </nav>
        </header>
      </ContentLayout>
    </div>
  );
};

export default HomePage;