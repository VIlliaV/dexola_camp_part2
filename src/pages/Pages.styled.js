import styled from 'styled-components';
import { media, padding } from '@/styles/media';

export const PagesContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 29px 0px 32px;
  display: grid;
  grid-template-rows: 1fr auto;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: var(--accent);
    transform: translate(-${padding.mobile}px, 0);
  }

  @media ${media.tablet} {
    padding: 32px 24px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: 32px;
    min-height: 341px;
    max-height: 100%;
    border: 1px solid var(--accent);
    &::before {
      display: none;
    }
  }
  & button {
    align-self: start;

    @media ${media.mobTab} {
      flex: 1;
    }
  }
`;

export const PagesHead = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  & h2 {
    text-transform: capitalize;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--additionally);
  }
`;
