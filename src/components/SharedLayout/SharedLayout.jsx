import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Ellipse } from './SharedLayout.styled';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Navigation from '../Navigation/Navigation';
import SectionWrapper from '../Section/SectionWrapper';
import HeroSection from '../HeroSection/HeroSection';
import OperationStatus from '../OperationStatus/OperationStatus';

// import Loader from 'components/Loader/Loader';

const SharedLayout = ({ statusStake }) => {
  const stake = 345;
  return (
    <Container>
      <Header />
      <Ellipse />
      <main>
        <HeroSection />
        <SectionWrapper className="pages_section">
          <Navigation />
          <Suspense fallback={null}>
            <Outlet stake={stake} />
          </Suspense>
          <OperationStatus media="tablet" statusStake={statusStake} />
        </SectionWrapper>
      </main>
      <Footer />
    </Container>
  );
};

export default SharedLayout;
