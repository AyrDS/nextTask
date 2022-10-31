import { Link, useNavigate } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import useForm from '../hooks/useForm';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

export const Login = () => {
   const { handleChange, email, password } = useForm({
      email: '',
      password: '',
   });
   const navigate = useNavigate();
   const { setAuth } = useAuth();

   const handleSubmit = async e => {
      e.preventDefault();

      if ([email, password].includes('')) {
         return Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios.',
            icon: 'error',
            confirmButtonColor: '#0369a1'
         })
      }

      try {
         const { data } = await clientAxios.post('/users/login', { email, password });

         localStorage.setItem('token', data.token);
         setAuth(data);
         navigate('/proyectos');
      } catch (error) {
         return Swal.fire({
            title: 'Error',
            text: `${error.response.data.msg}.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         })
      }
   }

   return (
      <>
         <h1 className="text-sky-600 font-black text-2xl" >Inciar Sesión</h1>

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
                  value={email}
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
                  onChange={handleChange}
                  value={password}
               />
            </div>

            <input
               type="submit"
               value='Iniciar Sesión'
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
               to='/olvide-pass'
               className='block text-center my-5 lg:my-2 text-slate-500 uppercase text-sm hover:text-slate-700'
            >
               ¿No puedes iniciar sesión?
            </Link>
         </nav>
      </>
   )
}
