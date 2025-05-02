import React, { useEffect } from 'react';
import err404 from '../../img/err404.png';

const NotFound = () => {
  useEffect(() => {
    /*Bloquea el scroll*/
    document.body.style.overflow = 'hidden';

    /*Limpieza al desmontar el componente*/
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={err404} alt="404 Not Found" className="max-w-full max-h-[80vh] object-contain" />
    </div>
  );
};

export default NotFound;
