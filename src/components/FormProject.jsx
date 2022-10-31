import Swal from 'sweetalert2';
import useForm from '../hooks/useForm';
import useProjects from '../hooks/useProjects';

export const FormProject = () => {

   const { name, description, deadline, client, handleChange, resetForm } = useForm({
      name: '',
      description: '',
      deadline: '',
      client: ''
   });
   const { newProject } = useProjects();

   const handleSubmit = async e => {
      e.preventDefault();
      
      if ([name, description, deadline, client].includes('')) {
         return Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios.',
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }

      await newProject({ name, description, deadline, client });
      resetForm();
   }

   return (
      <form
         className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
         onSubmit={handleSubmit}
      >
         <div className="mb-5" >
            <label
               htmlFor="name"
               className="text-gray-700 uppercase font-bold text-sm"
            >
               Nombre del Proyecto
            </label>

            <input
               type="text"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               id="name"
               placeholder="Nombre del proyecto"
               value={name}
               name='name'
               onChange={handleChange}
            />
         </div>

         <div className="mb-5" >
            <label
               htmlFor="description"
               className="text-gray-700 uppercase font-bold text-sm"
            >
               Descripción
            </label>

            <textarea
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               id="description"
               placeholder="Descripción del proyecto"
               value={description}
               name='description'
               onChange={handleChange}
            />
         </div>

         <div className="mb-5" >
            <label
               htmlFor="deadline"
               className="text-gray-700 uppercase font-bold text-sm"
            >
               Fecha de entrega
            </label>

            <input
               type="date"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               id="deadline"
               placeholder="Nombre del proyecto"
               value={deadline}
               name='deadline'
               onChange={handleChange}
            />
         </div>

         <div className="mb-5" >
            <label
               htmlFor="client"
               className="text-gray-700 uppercase font-bold text-sm"
            >
               Nombre del cliente
            </label>

            <input
               type="text"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               id="client"
               placeholder="Nombre del cliente"
               value={client}
               name='client'
               onChange={handleChange}
            />
         </div>

         <input
            type="submit"
            value="Crear proyecto"
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
         />
      </form>
   )
}

