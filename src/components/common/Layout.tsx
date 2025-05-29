import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="ie-flex-col flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex-shrink-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;