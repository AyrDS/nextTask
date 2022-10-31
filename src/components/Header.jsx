import { Link } from "react-router-dom"

export const Header = () => {
   return (
      <header className="px-4 py-5 bg-white border-b">
         <div className="flex flex-col gap-7 md:gap-0 md:flex-row md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center" >
               UpTask
            </h2>

            <input
               type="search"
               placeholder="Buscar Proyecto"
               className="rounded-lg lg:w-96 block p-2 border"
            />

            <div className="flex items-center gap-4" >
               <Link to='/proyectos' className="font-bold uppercase" > Proyectos</Link>

               <button
                  className="text-white text-sm bg-red-600 p-3 rounded-md uppercase font-bold hover:bg-red-700 transition-colors"
               >
                  Cerrar Sesión</button>
            </div>
         </div>
      </header>
   )
}
