import { Container } from './HeadContainer.styled';

const HeadContainer = ({ children }) => {
  return <Container className="container">{children}</Container>;
};

export default HeadContainer;
