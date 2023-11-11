import styled from 'styled-components';
import { media } from '@/styles/media';
import { headerBackground } from '../../styles/styledConst/styledConst';
import SectionWrapper from '../Section/SectionWrapper';
import HeadContainer from '../HeadContainer/HeadContainer';

export const SectionWrapperHero = styled(SectionWrapper)`
  position: static;
  padding-top: 65px;
  ${headerBackground}

  @media ${media.tablet} {
    padding-top: 102px;
  }
  @media ${media.desktop} {
    padding-top: 94px;
  }
`;

export const HeadContainerHero = styled(HeadContainer)`
  gap: 16px;
  & h1 {
    @media ${media.mobTab} {
      width: 75.73333vw;
    }
  }
`;

export const ContractInfo = styled.ul`
  display: flex;
  justify-content: start;

  @media ${media.mobTab} {
    justify-content: space-between;
  }
  @media ${media.tablet} {
    gap: 24px;
  }
  @media ${media.desktop} {
    gap: 40px;
  }
`;
