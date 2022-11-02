import useForm from '../hooks/useForm';
import validator from 'validator';
import Swal from 'sweetalert2';
import useProjects from '../hooks/useProjects';

const initialFormCollaborator = {
   email: ''
}

export const FormCollaborator = () => {

   const { newCollaborator } = useProjects();
   const { handleChange, email } = useForm(initialFormCollaborator);

   const handleSubmit = e => {
      e.preventDefault();

      if (email === '') {
         return Swal.fire({
            title: 'Ingrese un email',
            confirmButtonColor: '#0369a1',
            icon: 'error'
         });
      }

      if (!validator.isEmail(email)) {
         return Swal.fire({
            title: 'Ingrese un email válido',
            confirmButtonColor: '#0369a1',
            icon: 'error'
         });
      }

      newCollaborator(email);
   }

   return (
      <form className="bg-white py-10 px-5 w-full md:w-3/4 lg:w-1/2 rounded-lg shadow" onSubmit={handleSubmit} noValidate >
         <div className="mb-5">

            <label
               htmlFor='email'
               className='text-gray-700 uppercase font-bold text-sm'
            >
               Email del colaborador
            </label>
            <input
               type='email'
               id='email'
               placeholder='ejemplo@correo.com'
               className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
               name='email'
               onChange={handleChange}
               value={email}
            />
         </div>

         <input
            type="submit"
            className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
            value='Buscar colaborador'
         />
      </form>
   )
}
