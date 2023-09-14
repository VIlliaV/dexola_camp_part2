import HeadContainer from '../HeadContainer/HeadContainer';
import { SectionStyled } from './SectionWrapper.styled';

const SectionWrapper = ({ children, className }) => {
  return (
    <SectionStyled className={`section ${className}`}>
      <HeadContainer>{children}</HeadContainer>
    </SectionStyled>
  );
};

export default SectionWrapper;
