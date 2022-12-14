import { Outlet, Navigate } from 'react-router-dom';
import { Header, Loader, Sidebar } from '../components';
import useAuth from '../hooks/useAuth';

export const PrivateRoutes = () => {
   const { auth, isLoading } = useAuth();
   const { uid } = auth;

   if (isLoading) {
      return <Loader />
   }

   return (
      <>
         {
            uid
               ? (
                  <div className='bg-gray-100' >
                     <Header />

                     <div className='md:flex' >
                        <Sidebar />

                        <main className='p-10 flex-1' >
                           <Outlet />
                        </main>
                     </div>
                  </div>
               )
               : <Navigate replace to='/' />
         }
      </>
   )
}
