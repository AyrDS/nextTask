import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useForm from '../hooks/useForm';
import { Loader } from '../components';
import clientAxios from '../config/clientAxios';

const initialFormNewPassword = {
   password: '',
   password2: ''
}

export const NewPassword = () => {
   const navigate = useNavigate();
   const { token } = useParams();
   const [ok, setOk] = useState(null);
   const [loading, setLoading] = useState(true);
   const { handleChange, password, password2 } = useForm(initialFormNewPassword);

   useEffect(() => {
      const confirmToken = async () => {
         try {
            await clientAxios(`/users/reset-password/${token}`);

            setOk(true);
         } catch (error) {

         } finally {
            setLoading(false);
         }
      }

      confirmToken();
   }, []);

   const handleSubmit = async e => {
      e.preventDefault();

      if (password.length < 6) {
         return Swal.fire({
            title: 'Error',
            text: 'La contraseña debe tener un mínimo de 6 caracteres.',
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }

      if (password !== password2) {
         return Swal.fire({
            title: 'Error',
            text: 'Las contraseñas no coinciden.',
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }

      try {
         const { data } = await clientAxios.post(`/users/reset-password/${token}`, { password });

         Swal.fire({
            text: data.msg,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timerProgressBar: true,
            customClass: {
               timerProgressBar: 'timer'
            }
         });

         setTimeout(() => {
            navigate('/');
         }, 2001);

      } catch (error) {
         return Swal.fire({
            title: 'Error',
            text: `${error.response.data.msg}.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   if (loading) {
      return <Loader />
   }

   return (
      <>
         <h1 className="text-sky-600 font-black text-2xl" >Reestablecer contraseña</h1>

         {
            ok
               ? <form className="my-5 bg-white shadow rounded-lg p-8" onSubmit={handleSubmit} >

                  <div className="my-5" >
                     <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                     >
                        Nueva Contraseña
                     </label>
                     <input
                        type="password"
                        placeholder="Tu contraseña"
                        id="password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        name='password'
                        onChange={handleChange}
                     />
                  </div>

                  <div className="my-5" >
                     <label
                        htmlFor="password2"
                        className="uppercase text-gray-600 block text-xl font-bold"
                     >
                        Repetir contraseña
                     </label>
                     <input
                        type="password"
                        placeholder="Repetir contraseña"
                        id="password2"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        name='password2'
                        onChange={handleChange}
                     />
                  </div>

                  <input
                     type="submit"
                     value='Cambiar contraseña'
                     className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-800 transition-all"
                  />
               </form>

               :
               <>
                  <h1 className='text-red-600 font-black text-4xl text-center mt-10' >Token inválido</h1>
                  <Link
                     to='/'
                     className='block text-center font-bold my-5 lg:my-2 text-slate-500 uppercase mt-3 text-base hover:text-slate-700'
                  >
                     Volver
                  </Link>
               </>
         }

      </>
   )
}
