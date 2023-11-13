import styled from 'styled-components';
import { media } from '@/styles/media';
import { BackdropStyled } from '../../../styles/styledConst/componentStyled';

export const SignTipStyled = styled.div`
  position: ${props => (props.$active ? 'static' : 'relative')};
  background-color: transparent;
  border: none;
  @media ${media.desktop} {
    position: relative;
  }
`;

export const BackdropStyledTip = styled(BackdropStyled)`
  display: ${props => (props.$active ? 'block' : 'none')};
  @media ${media.desktop} {
    display: none;
  }
`;
