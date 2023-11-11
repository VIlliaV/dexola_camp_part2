import { SectionStyled } from './SectionWrapper.styled';

const SectionWrapper = ({ children, className = '' }) => {
  return <SectionStyled className={className}>{children}</SectionStyled>;
};

export default SectionWrapper;
