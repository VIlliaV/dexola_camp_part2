import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from './SharedLayout.styled';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Navigation from '../Navigation/Navigation';
import SectionWrapper from '../Section/SectionWrapper';
import HeroSection from '../HeroSection/HeroSection';

// import Loader from 'components/Loader/Loader';

export const SharedLayout = () => {
  return (
    <Container>
      <Header />
      <main>
        <HeroSection />
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
