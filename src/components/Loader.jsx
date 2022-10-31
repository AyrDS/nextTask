import { BarLoader } from 'react-spinners';

export const Loader = () => {
   return (
      <div
         className='h-96 flex justify-center flex-col items-center'
      >
         <BarLoader height={10} color='#0369a1' className='block'/>
         <h1 className="text-sky-600 font-black text-2xl mt-3" >Cargando...</h1>
      </div>
   )
}
