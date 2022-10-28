export const NewPassword = () => {
   return (
      <>
         <h1 className="text-sky-600 font-black text-2xl" >Reestablecer contraseña</h1>
         <form className="my-5 bg-white shadow rounded-lg p-8" >

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
               value='Cambiar contraseña'
               className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-800 transition-all"
            />
         </form>

      </>
   )
}
