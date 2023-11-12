import styled from 'styled-components';
import Button from './Button';
import { media } from '@/styles/media';

export const ButtonConnectStyled = styled(Button)`
  width: ${props => props.$isOpen && '219px'};
  height: ${props => props.$isOpen && '48px'};
  @media ${media.mobTab} {
    padding: 8px 24px;
  }
`;
