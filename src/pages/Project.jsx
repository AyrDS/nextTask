import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Collaborator, Loader, Task } from '../components';
import ModalFormularioTarea from '../components/ModalFormTask';
import useProjects from '../hooks/useProjects';

export const Project = () => {

   const { id } = useParams();
   const { getProject, project, handleModalTask } = useProjects();
   const [loading, setLoading] = useState(true);
   const [ok, setOk] = useState(true);

   useEffect(() => {
      const callGetProject = async () => {
         const data = await getProject(id)
         if (data?.response?.status === 401) {
            setOk(false);
         }

         setLoading(false);
      }

      callGetProject();
   }, []);

   const { name, tasks } = project;

   if (loading) {
      return <Loader />
   }

   return (
      !ok
         ? <h1 className='font-black text-4xl text-center' >No puedes acceder a este proyecto</h1>
         : <>
            <div className='flex justify-between items-center' >
               <h1 className='font-black text-4xl' >{name}</h1>

               <div className='text-gray-500 hover:text-black cursor-pointer' >

                  <Link
                     to={`/proyectos/editar/${id}`}
                     className='uppercase font-bold flex items-center gap-2'
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                     </svg>
                     Editar
                  </Link>
               </div>
            </div>

            <button
               className='flex items-center justify-center gap-2 ext-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center transition-colors hover:bg-sky-600 mt-5'
               onClick={handleModalTask}
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>

               Nueva tarea
            </button>

            <p className='font-bold text-xl mt-10' >Tareas del Proyecto</p>
            <div className='bg-white shadow mt-10 rounded-lg' >
               {
                  tasks?.length
                     ? tasks.map(task => (
                        <Task key={task._id} task={task} />
                     ))
                     : <p className='text-center my-5 p-10' >No hay tareas en este proyecto</p>
               }
            </div>

            <div className='flex items-center justify-between mt-10' >
               <p className='font-bold text-xl' >Colaboradores</p>
               <Link
                  to={`/proyectos/nuevo-colaborador/${project._id}`}
                  className='text-gray-500 hover:text-black uppercase font-bold'
               >
                  Añadir
               </Link>
            </div>

            <div className='bg-white shadow mt-10 rounded-lg' >
               {
                  project.collaborators.length
                     ? project.collaborators.map(c => (
                        <Collaborator key={c.uid} collaborator={c} />
                     ))
                     : <p className='text-center my-5 p-10' >No hay colaboradores en este proyecto</p>
               }
            </div>

            <ModalFormularioTarea />
         </>
   )
}

