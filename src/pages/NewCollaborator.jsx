import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormCollaborator, Loader } from '../components';
import useProjects from '../hooks/useProjects';

export const NewCollaborator = () => {

   const { getProject, project, collaborator, addCollaborator } = useProjects()
   const { id } = useParams();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const callGetProject = async () => {
         await getProject(id);
         setLoading(false);
      }

      callGetProject();
   }, []);

   const { name } = project;

   if (loading) {
      return <Loader />
   }

   return (
      <>
         <h1 className="text-4xl font-black" >Añadir Colaborador(a) al proyecto: {name} </h1>

         <div className="mt-10 flex justify-center" >
            <FormCollaborator />
         </div>

         {
            collaborator?.uid &&
            <div className='flex justify-center mt-10' >
               <div className='bg-white py-8 px-5 md:w-3/4 lg:w-1/2 rounded-lg shadow w-full' >
                  <h2 className='text-center mb-8 lg:mb-10 text-2xl font-bold'>Resultado: </h2>

                  <div className='flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between items-center' >
                     <p>{collaborator.name}</p>

                     <button
                        className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                        onClick={() => addCollaborator({ email: collaborator.email })}
                     >
                        Agregar al proyecto
                     </button>
                  </div>
               </div>
            </div>
         }
      </>
   )
}

