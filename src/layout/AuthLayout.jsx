import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const AuthLayout = () => {

   const { auth } = useAuth();

   if (auth.uid) {
      return <Navigate to='/proyectos' replace />
   }

   return (
      <>
         <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center' >
            <div className='md:w-3/4 lg:w-2/4' >
               <h1 className='text-center text-4xl mb-10 font-bold text-stone-800' >
                  Tus <span className='text-red-500' >proyectos</span> en un solo lugar
               </h1>
               <Outlet />
            </div>
         </main>
      </>
   )
}

