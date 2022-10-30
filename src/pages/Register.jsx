import { Link } from 'react-router-dom';
import validator from 'validator';
import Swal from 'sweetalert2';
import useForm from '../hooks/useForm';
import axios from 'axios';

export const Register = () => {

   const { name, email, password, password2, handleChange, resetForm } = useForm({
      name: '',
      email: '',
      password: '',
      password2: ''
   });


   const handleSubmit = async e => {
      e.preventDefault();

      if ([name, email, password, password2].includes('')) {
         return Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios.',
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }

      if (!validator.isEmail(email)) {
         return Swal.fire({
            title: 'Error',
            text: 'Ingrese un email válido.',
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }

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
         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users`, { name, email, password });

         Swal.fire({
            title: 'Usuario creado correctamente',
            text: `${data.msg}.`,
            icon: 'success',
            confirmButtonColor: '#0369a1'
         });

         resetForm();
      } catch (error) {
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
         <h1 className="text-sky-600 font-black text-2xl" >Crea tu cuenta</h1>

         <form className="my-5 bg-white shadow rounded-lg p-8" onSubmit={handleSubmit} >
            <div className="my-5" >
               <label
                  htmlFor="name"
                  className="uppercase text-gray-600 block text-xl font-bold"
               >
                  Nombre
               </label>
               <input
                  type="text"
                  placeholder="Tu nombre"
                  id="name"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  name='name'
                  value={name}
                  onChange={handleChange}
               />
            </div>

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
                  value={email}
                  onChange={handleChange}
               />
            </div>

            <div className="my-5" >
               <label
                  htmlFor="password"
                  className="uppercase text-gray-600 block text-xl font-bold"
               >
                  Contraseña
               </label>
               <input
                  type="password"
                  placeholder="Tu contraseña"
                  id="password"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  name='password'
                  value={password}
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
                  value={password2}
                  onChange={handleChange}
               />
            </div>

            <input
               type="submit"
               value='Crear Cuenta'
               className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-800 transition-all"
            />

         </form>

         <nav className="lg:flex lg:justify-between" >
            <Link
               to='/'
               className='block text-center my-5 lg:my-2 text-slate-500 uppercase text-sm hover:text-slate-700'
            >
               ¿Ya tienes cuenta?
            </Link>

            <Link
               to='/olvide-pass'
               className='block text-center my-5 lg:my-2 text-slate-500 uppercase text-sm hover:text-slate-700'
            >
               ¿No puedes iniciar sesión?
            </Link>
         </nav>
      </>
   )
}