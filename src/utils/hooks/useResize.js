import { useState, useEffect } from 'react';

export const useResize = () => {
  const [widthResize, setWidthResize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = event => {
      setWidthResize(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    widthResize,
  };
};
