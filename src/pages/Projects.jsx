import { PreviewProject } from '../components';
import useProjects from '../hooks/useProjects';

export const Projects = () => {

   const { projects } = useProjects();

   return (
      <>
         <h1 className="text-4xl font-black" >Proyectos</h1>

         <div className="bg-white shadow mt-10 rounded-lg" >
            {
               projects.length > 0
                  ? projects.map(project => (
                     <PreviewProject key={project._id} {...project} />
                  ))
                  : <p className='p-5' >No hay proyectos</p>
            }
         </div>
      </>
   )
}
