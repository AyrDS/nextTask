import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { formatDate } from '../helpers/formatDate';
import useProjects from '../hooks/useProjects';

export const Task = ({ task }) => {

   const { description, priority, name, deadline, state, _id } = task;

   const { handleEditTask, deleteTask } = useProjects();
   const [colorPriority, setColorPriority] = useState('');

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
         focusConfirm: false
      }).then(({ value }) => {
         if (!value) return;

         deleteTask(_id)
      })
   }

   return (
      <div className=" border-b p-5 flex justify-between items-center" >
         <div>
            <p className="mb-2 text-xl" >{name}</p>
            <p className="mb-2 text-sm text-gray-500 uppercase" >{description}</p>
            <p className="mb-2 text-sm" >{formatDate(deadline)}</p>
            <p className={`mb-2 ${colorPriority} font-bold`} >Prioridad: {priority}</p>
         </div>

         <div className="flex gap-2" >
            <button
               className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
               onClick={() => handleEditTask(task)}
            >
               Editar
            </button>

            {
               state
                  ? <button
                     className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                  >
                     Completa
                  </button>
                  : <button
                     className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                  >
                     Incompleta
                  </button>
            }

            <button
               className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
               onClick={handleDelete}
            >
               Eliminar
            </button>
         </div>
      </div>
   )
}

