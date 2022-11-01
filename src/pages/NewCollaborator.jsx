import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormCollaborator, Loader } from '../components';
import useProjects from '../hooks/useProjects';

export const NewCollaborator = () => {

   const { getProject, project } = useProjects()
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
         <h1 className="text-4xl font-black" >Añadir Colaborador(a) al proyecto: {name} </h1>

         <div className="mt-10 flex justify-center" >
            <FormCollaborator />
         </div>
      </>
   )
}

