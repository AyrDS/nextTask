import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProject, Loader } from '../components';
import useProjects from '../hooks/useProjects';


export const EditProject = () => {

   const { project, getProject } = useProjects();
   const { id } = useParams();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const callGetProject = async () => {
         await getProject(id);
         setLoading(false);
      }

      callGetProject();
   }, []);

   const { name } = project;

   if (loading) {
      return <Loader />
   }

   return (
      <>
         <h1 className='font-black text-4xl' >Editar Proyecto: {name}</h1>

         <div className="mt-10 flex justify-center" >
            <FormProject />
         </div>
      </>
   )
}

