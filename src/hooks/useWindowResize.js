import { useEffect } from 'react';

const useWindowResize = (callBack) => {
  useEffect(() => {
    function handleResize() {
      if (callBack) {
        callBack();
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [callBack]);
};

export default useWindowResize;
