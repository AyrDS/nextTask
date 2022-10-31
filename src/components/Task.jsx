import { useEffect, useState } from "react";
import { formatDate } from "../helpers/formatDate";

export const Task = ({ description, priority, name, deadline, state, _id }) => {

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

   return (
      <div className=" border-b p-5 flex justify-between items-center" >
         <div>
            <p className="mb-2 text-xl" >{name}</p>
            <p className="mb-2 text-sm text-gray-500 uppercase" >{description}</p>
            <p className="mb-2 text-xl" >{formatDate(deadline)}</p>
            <p className={`mb-2 ${colorPriority} font-bold`} >Prioridad: {priority}</p>
         </div>

         <div className="flex gap-2" >
            <button
               className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
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
            >
               Eliminar
            </button>
         </div>
      </div>
   )
}

