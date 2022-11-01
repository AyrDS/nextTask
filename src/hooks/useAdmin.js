import useAuth from './useAuth';
import useProjects from './useProjects';

const useAdmin = () => {
   const { project } = useProjects();
   const { auth } = useAuth();
   return project.author === auth.uid;
}

export default useAdmin;
