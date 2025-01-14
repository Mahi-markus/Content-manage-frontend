"use client"; // Marking the file as a client component

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './ContentLayout.module.css'; // Adjust the import path if necessary

interface LayoutProps {
  children: React.ReactNode;
}

const ContentLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>My CMS</title>
        <meta name="description" content="Content page layout" />
      </Head>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href="/">Home</Link></li>
            <li className={styles.navItem}><Link href="/login">Login</Link></li>
            <li className={styles.navItem}><Link href="/logout">Logout</Link></li>
            <li className={styles.navItem}><Link href="/writers">Writer Dashboard</Link></li>
            <li className={styles.navItem}><Link href="/admin">Admin Dashboard</Link></li>
            <li className={styles.navItem}><Link href="/contents">Contents</Link></li>
          </ul>
        </nav>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2025 My CMS</p>
      </footer>
    </>
  );
};

export default ContentLayout;