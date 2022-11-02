import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useProjects from '../hooks/useProjects';
import { Searcher } from './';

export const Header = () => {

   const { handleSearcher, closeAppProjects } = useProjects();
   const { closeAppAuth } = useAuth();

   const handleOut = () => {
      closeAppAuth();
      closeAppProjects();
      localStorage.removeItem('token');
   }

   return (
      <header className="px-4 py-5 bg-white border-b">
         <div className="flex flex-col gap-7 md:gap-0 md:flex-row md:justify-between">
            <Link to='/proyectos'>
               <h2 className="text-4xl text-sky-600 font-black text-center" >
                  NextTask
               </h2>
            </Link >

            <div className="flex flex-col md:flex-row items-center gap-4" >
               <button
                  className="font-bold uppercase"
                  onClick={handleSearcher}
               >
                  Buscar Proyecto
               </button>

               <Link to='/proyectos' className="font-bold uppercase" > Proyectos</Link>

               <button
                  className="text-white text-sm bg-red-600 p-3 rounded-md uppercase font-bold hover:bg-red-700 transition-colors"
                  onClick={handleOut}
               >
                  Cerrar Sesión
               </button>

               <Searcher />
            </div>
         </div>
      </header>
   )
}
