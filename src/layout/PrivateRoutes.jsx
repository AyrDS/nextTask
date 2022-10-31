import { Outlet, Navigate } from 'react-router-dom';
import { Header, Loader, Sidebar } from '../components';
import useAuth from '../hooks/useAuth';

export const PrivateRoutes = () => {
   const { auth, isLoading } = useAuth();
   const { uid } = auth;
   const token = localStorage.getItem('token') || null;

   if (isLoading) {
      return <Loader />
   }

   return (
      <>
         {
            uid && token
               ? (
                  <div className='bg-gray-100' >
                     <Header />

                     <div className='md:flex md:min-h-screen' >
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
