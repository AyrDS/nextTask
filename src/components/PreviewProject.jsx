import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PreviewProject = ({ name, _id, client, description, author }) => {

   const { auth } = useAuth();

   return (
      <div className='border-b p-5 flex flex-col md:flex-row justify-between items-center gap-5' >
         <div className='flex flex-col md:flex-row items-center gap-5'>
            <div>
               <p className='font-bold text-xl' >{name}</p>
               <p className='text-base my-3' >{description}</p>
               <p className='text-sm' >Cliente: <span className='font-bold' >{client}</span></p>
            </div>

            {
               auth.uid !== author &&
               <p
                  className='p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase text-center'
               >
                  Colaborador
               </p>
            }
         </div>

         <Link
            to={`${_id}`}
            className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold transition-colors'
         >
            Ver Proyecto
         </Link>
      </div>
   )
}
