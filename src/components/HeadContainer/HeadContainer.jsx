import { HeaderContainerStyled } from './HeadContainer.styled';

const HeadContainer = ({ className, children }) => {
  return <HeaderContainerStyled className={className}>{children}</HeaderContainerStyled>;
};

export default HeadContainer;
