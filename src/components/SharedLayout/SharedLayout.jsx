import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from './SharedLayout.styled';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WalletInfo from '../WalletInfo/WalletInfo';
import Navigation from '../Navigation/Navigation';
import SectionWrapper from '../Section/SectionWrapper';

// import Loader from 'components/Loader/Loader';

export const SharedLayout = () => {
  return (
    <Container>
      <Header />
      <main>
        <WalletInfo />
        <SectionWrapper>
          <Navigation />
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </SectionWrapper>
      </main>
      <Footer />
    </Container>
  );
};
