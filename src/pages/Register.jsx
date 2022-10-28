import { Link } from 'react-router-dom';


export const Register = () => {
   return (
      <>
         <h1 className="text-sky-600 font-black text-2xl" >Crea tu cuenta</h1>

         <form className="my-5 bg-white shadow rounded-lg p-8" >
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