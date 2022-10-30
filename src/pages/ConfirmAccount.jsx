import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export const ConfirmAccount = () => {

   const { token } = useParams();
   const [ok, setOk] = useState(null);

   useEffect(() => {
      const confirmAccount = async () => {
         try {
            await axios(`${import.meta.env.VITE_API_URL}/users/confirm/${token}`);

            setOk(true);
         } catch (error) {
            console.log(error);
         }
      }

      confirmAccount();
   }, []);

   return (
      <>
         {
            ok
               ? <div>
                  <h1 className="text-sky-600 font-black text-3xl text-center inset-y-1/2" >¡Cuenta confirmada!</h1>
                  <Link
                     to='/'
                     className='block text-center mt-5 text-slate-500 uppercase text-lg hover:text-slate-700'
                  >
                     Inicia Sesión
                  </Link>
               </div>

               : <h1 className="text-sky-600 font-black text-3xl text-center inset-y-1/2" >Token no válido</h1>
         }
      </>
   )
}
