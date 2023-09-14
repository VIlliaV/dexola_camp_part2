import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Ellipse, Pages } from './SharedLayout.styled';
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
      <Ellipse></Ellipse>
      <main>
        <HeroSection />
        <SectionWrapper className="pages_section">
          <Navigation />
          <Pages>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </Pages>
        </SectionWrapper>
      </main>
      <Footer />
    </Container>
  );
};
