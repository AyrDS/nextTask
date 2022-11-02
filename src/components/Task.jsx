import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { formatDate } from '../helpers/formatDate';
import useAdmin from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';

export const Task = ({ task }) => {

   const { description, priority, name, deadline, state, _id, completed } = task;

   const { handleEditTask, deleteTask, setTaskState } = useProjects();
   const [colorPriority, setColorPriority] = useState('');

   const admin = useAdmin();

   useEffect(() => {
      switch (priority) {
         case 'Baja':
            setColorPriority('text-green-800');
            break;

         case 'Media':
            setColorPriority('text-orange-500');
            break;

         case 'Alta':
            setColorPriority('text-red-700');
            break;

         default:
            break;
      }
   }, []);

   const handleDelete = () => {
      Swal.fire({
         title: '¿Desea eliminar este proyecto?',
         text: 'Esta acción es irreversible',
         icon: 'warning',
         showDenyButton: true,
         confirmButtonColor: '#0369a1',
         confirmButtonText: 'Si',
         customClass: {
            confirmButton: 'confirmBtn'
         },
         focusConfirm: false
      }).then(({ value }) => {
         if (!value) return;

         deleteTask(task);
      })
   }

   return (
      <div className=" border-b p-5 flex justify-between items-center" >
         <div className='flex flex-col items-start' >
            <p className="mb-2 text-xl" >{name}</p>
            <p className="mb-2 text-sm text-gray-500 uppercase" >{description}</p>
            <p className="mb-2 text-sm" >{formatDate(deadline)}</p>
            <p className={`mb-2 ${colorPriority} font-bold`} >Prioridad: {priority}</p>
            {
               state &&
               <p
                  className='text-xs bg-green-600 uppercase rounded-lg p-2 text-white font-bold'>
                  Completada por: {completed.name}
               </p>
            }
         </div>

         <div className="flex flex-col lg:flex-row gap-2" >
            {
               admin &&
               <button
                  className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                  onClick={() => handleEditTask(task)}
               >
                  Editar
               </button>
            }

            <button
               className={`${state ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
               onClick={() => setTaskState(_id)}
            >
               {state ? 'Completa' : 'Incompleta'}
            </button>


            {
               admin &&
               <button
                  className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                  onClick={handleDelete}
               >
                  Eliminar
               </button>
            }
         </div>
      </div>
   )
}

