import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
   return (
      <>
         <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center' >
            <div className='md:w-2/3 lg:w-2/5' >
               <h1 className='text-center text-4xl mb-10 font-bold text-stone-800' >
                  Tus <span className='text-red-500' >proyectos</span> en un solo lugar
               </h1>
               <Outlet />
            </div>
         </main>
      </>
   )
}

