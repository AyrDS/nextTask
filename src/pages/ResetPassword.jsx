import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import useForm from '../hooks/useForm';

export const ResetPassword = () => {

   const { email, handleChange } = useForm({
      email: '',
   });

   const handleSubmit = async e => {
      e.preventDefault();

      if (email === '') {
         return Swal.fire({
            title: 'Error',
            text: `El email es obligatorio.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }

      try {
         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/reset-password`, { email });

         Swal.fire({
            text: `${data.msg}.`,
            icon: 'success',
            confirmButtonColor: '#0369a1'
         });
      } catch (error) {
         console.log(error.response.data.msg);
         Swal.fire({
            title: 'Error',
            text: `${error.response.data.msg}.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }

   }

   return (
      <>
         <h1 className="text-sky-600 font-black text-2xl" >Recuperar Contraseña</h1>

         <form className="my-5 bg-white shadow rounded-lg p-8" onSubmit={handleSubmit} >
            <div className="my-5" >
               <label
                  htmlFor="email"
                  className="uppercase text-gray-600 block text-xl font-bold"
               >
                  Email
               </label>
               <input
                  type="email"
                  placeholder="ejemplo@email.com"
                  id="email"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  name='email'
                  onChange={handleChange}
               />
            </div>

            <input
               type="submit"
               value='Enviar instrucciones'
               className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-800 transition-all"
            />
         </form>

         <nav className="lg:flex lg:justify-between" >
            <Link
               to='/registro'
               className='block text-center my-5 lg:my-2 text-slate-500 uppercase text-sm hover:text-slate-700'
            >
               ¿No tienes cuenta?
            </Link>

            <Link
               to='/'
               className='block text-center my-5 lg:my-2 text-slate-500 uppercase text-sm hover:text-slate-700'
            >
               ¿Ya tienes cuenta?
            </Link>
         </nav>
      </>
   )
}
