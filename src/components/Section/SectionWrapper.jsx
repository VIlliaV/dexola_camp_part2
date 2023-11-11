// import HeadContainer from '../HeadContainer/HeadContainer';
import { SectionStyled } from './SectionWrapper.styled';

const SectionWrapper = ({ children, className = '' }) => {
  return <SectionStyled className={`section ${className}`}>{children}</SectionStyled>;
};

export default SectionWrapper;
