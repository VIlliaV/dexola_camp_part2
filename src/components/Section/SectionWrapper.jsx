import HeadContainer from '../HeadContainer/HeadContainer';
import { SectionStyled } from './SectionWrapper.styled';

const SectionWrapper = ({ children }) => {
  return (
    <SectionStyled className="section">
      <HeadContainer>{children}</HeadContainer>
    </SectionStyled>
  );
};

export default SectionWrapper;
