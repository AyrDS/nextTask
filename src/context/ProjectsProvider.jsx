import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../config/clientAxios';

export const ProjectsContext = createContext();
const { Provider } = ProjectsContext;

export const ProjectsProvider = ({ children }) => {

   const navigate = useNavigate();
   const [projects, setProjects] = useState([]);
   const [project, setProject] = useState({});

   useEffect(() => {
      const getProjects = async () => {
         try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
               }
            }

            const { data } = await clientAxios('/projects', config);
            setProjects(data);
         } catch (error) {
            console.log(error);
         }
      }

      getProjects();
   }, []);

   const editProject = async project => {
      Swal.showLoading();

      try {
         const token = localStorage.getItem('token');
         if (!token) return;

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         const { data } = await clientAxios.put(`/projects/${project.id}`, project, config);
         const projectsUpdated = projects.map(projectState => projectState._id === data._id ? data : projectState);
         setProjects(projectsUpdated);

         Swal.fire({
            title: 'Proyecto Actualizado',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timerProgressBar: true,
            customClass: {
               timerProgressBar: 'timer'
            }
         });

         setTimeout(() => {
            navigate(`/proyectos/${data._id}`);
         }, 2001);
      } catch (error) {
         Swal.fire({
            title: 'Error',
            text: `Error inesperado.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const newProject = async project => {
      Swal.showLoading();
      try {
         const token = localStorage.getItem('token');
         if (!token) return;

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         const { data } = await clientAxios.post('/projects', project, config);

         setProjects([...projects, data]);

         Swal.fire({
            title: 'Proyecto creado',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timerProgressBar: true,
            customClass: {
               timerProgressBar: 'timer'
            }
         });

         setTimeout(() => {
            navigate('/proyectos');
         }, 2001);
      } catch (error) {
         console.log(error);
         Swal.fire({
            title: 'Error',
            text: `Error inesperado.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const getProject = async id => {
      try {
         const token = localStorage.getItem('token');
         if (!token) return;

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         const { data } = await clientAxios(`/projects/${id}`, config);
         data.deadline = data.deadline.split('T')[0];
         setProject(data);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <Provider
         value={{
            projects,
            project,
            newProject,
            getProject,
            editProject,
         }}
      >
         {children}
      </Provider>
   )
}
