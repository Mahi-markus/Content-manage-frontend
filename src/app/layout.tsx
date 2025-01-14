import React from 'react';
import Link from 'next/link';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header>
          {/* <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/logout">Logout</Link></li>
              <li><Link href="/writers">Writer Dashboard</Link></li>
              <li><Link href="/admin">Admin Dashboard</Link></li>
            </ul>
          </nav> */}
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 My CMS</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;