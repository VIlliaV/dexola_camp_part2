import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Ellipse, SectionWrapperShared } from './SharedLayout.styled';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import HeroSection from '../HeroSection/HeroSection';
import OperationStatus from '../OperationStatus/OperationStatus';
import FallBack from '../FallBack/FallBack';
import HeadContainer from '../HeadContainer/HeadContainer';

const SharedLayout = () => {
  return (
    <Container>
      <Header />
      <Ellipse />
      <main>
        <HeroSection />
        <SectionWrapperShared>
          <HeadContainer>
            <Navigation />
            <Suspense fallback={<FallBack />}>
              <Outlet />
            </Suspense>
            <OperationStatus media="tablet" />
          </HeadContainer>
        </SectionWrapperShared>
      </main>
      <Footer />
    </Container>
  );
};

export default SharedLayout;
