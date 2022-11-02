import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../config/clientAxios';
import useAuth from '../hooks/useAuth';
import useSocketContext from '../hooks/useSocketContext';

export const ProjectsContext = createContext();
const { Provider } = ProjectsContext;

export const ProjectsProvider = ({ children }) => {

   const navigate = useNavigate();
   const { auth } = useAuth();
   const { socket } = useSocketContext();

   const [projects, setProjects] = useState([]);
   const [project, setProject] = useState({});
   const [modalFormTask, setModalFormTask] = useState(false);
   const [task, setTask] = useState({});
   const [collaborator, setCollaborator] = useState({});
   const [searcher, setSearcher] = useState(false);

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
   }, [auth]);

   useEffect(() => {
      socket?.on('task-added', newTask => {
         if (newTask.project === project._id) {
            newTaskSocket(newTask);
         }
      })
   }, [socket, project]);

   useEffect(() => {
      socket?.on('task-deleted', task => {
         if (task.project === project._id) {
            deletedTask(task);
         }
      })
   }, [socket, project]);

   useEffect(() => {
      socket?.on('task-updated', task => {
         if (task.project === project._id) {
            updatedTask(task);
         }
      })
   }, [socket, project]);

   useEffect(() => {
      socket?.on('task-state', task => {
         if (task.project._id === project._id) {
            setStateSocket(task);
         }
      })
   }, [socket, project]);

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
         return data;
      } catch (error) {
         // console.log(error);
         return error;
      }
   }

   const deleteProject = async id => {
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

         await clientAxios.delete(`/projects/${id}`, config);

         const projectsUpdated = projects.filter(projectState => projectState._id !== id);
         setProjects(projectsUpdated);

         Swal.fire({
            title: 'Proyecto Eliminado',
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
            navigate(`/proyectos`);
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

   const handleModalTask = () => {
      setModalFormTask(!modalFormTask);
      setTask({});
   }

   const newTask = async task => {
      try {
         const token = localStorage.getItem('token');
         if (!token) return;

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         const { data } = await clientAxios.post('/tasks', task, config);

         const projectUpdated = { ...project };
         projectUpdated.tasks = [...projectUpdated.tasks, data];

         setProject(projectUpdated);
         setModalFormTask(false);

         socket?.emit('new-task', data);
      } catch (error) {
         Swal.fire({
            title: 'Error',
            text: `Error inesperado.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const editTask = async task => {

      try {
         const token = localStorage.getItem('token');
         if (!token) return;

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

         const projectUpdated = { ...project }
         projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === data._id ? data : taskState);

         setProject(projectUpdated)
         setModalFormTask(false);
         socket?.emit('update-task', data)
         setTask({});
      } catch (error) {
         Swal.fire({
            title: 'Error',
            text: `Error inesperado.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const handleEditTask = async task => {
      task.deadline = task.deadline.split('T')[0];
      setTask(task);
      setModalFormTask(true);
   }

   const deleteTask = async task => {
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

         await clientAxios.delete(`/tasks/${task._id}`, config);

         const projectUpdated = { ...project }
         projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id);

         setProject(projectUpdated);

         socket?.emit('delete-task', task);
         setTask({});
         Swal.fire({
            title: 'Tarea eliminada',
            icon: 'success',
            confirmButtonColor: '#0369a1'
         });
      } catch (error) {
         Swal.fire({
            title: 'Error',
            text: `Error inesperado.`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const newCollaborator = async email => {
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

         const { data } = await clientAxios.post('/projects/collaborators', { email }, config);
         setCollaborator(data);
         Swal.close();
      } catch (error) {
         Swal.fire({
            title: 'Error',
            text: `${error.response.data.msg}`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const addCollaborator = async email => {
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

         const { data } = await clientAxios.post(`/projects/collaborators/${project._id}`, email, config);
         setCollaborator({});
         Swal.fire({
            title: 'Colaborador añadido',
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
            navigate(`/proyectos/${project._id}`);
         }, 2001);
      } catch (error) {
         Swal.fire({
            title: 'Error',
            text: `${error.response.data.msg}`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const deleteCollaborator = async (uid) => {
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

         const { data } = await clientAxios.post(`/projects/del-collaborators/${project._id}`, { uid }, config);

         const projectUpdated = { ...project }
         projectUpdated.collaborators = projectUpdated.collaborators.filter(col => col.uid !== uid);
         setProject(projectUpdated);

         setCollaborator({});
         Swal.fire({
            title: `${data.msg}`,
            icon: 'success',
            confirmButtonColor: '#0369a1'
         });
      } catch (error) {
         Swal.fire({
            title: 'Error',
            text: `${error.response.data.msg}`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const setTaskState = async id => {
      try {
         const token = localStorage.getItem('token');
         if (!token) return;

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         const { data } = await clientAxios.post(`/tasks/state/${id}`, {}, config);
         const projectUpdated = { ...project };
         projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === data._id ? data : taskState);

         setProject(projectUpdated);
         socket?.emit('set-state', data);
         setTask({});
      } catch (error) {
         Swal.fire({
            title: 'Error',
            text: `${error.response.data.msg}`,
            icon: 'error',
            confirmButtonColor: '#0369a1'
         });
      }
   }

   const handleSearcher = () => {
      setSearcher(!searcher);
   }

   //Socket IO
   const newTaskSocket = task => {
      const projectUpdated = { ...project };
      projectUpdated.tasks = [...projectUpdated.tasks, task];

      setProject(projectUpdated);
   }

   const deletedTask = task => {
      const projectUpdated = { ...project }
      projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id);

      setProject(projectUpdated);
   }

   const updatedTask = task => {
      const projectUpdated = { ...project }
      projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === task._id ? task : taskState);

      setProject(projectUpdated)
   }

   const setStateSocket = task => {
      const projectUpdated = { ...project };
      projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === task._id ? task : taskState);

      setProject(projectUpdated);
   }

   return (
      <Provider
         value={{
            collaborator,
            modalFormTask,
            project,
            projects,
            task,
            searcher,
            addCollaborator,
            deleteCollaborator,
            deleteProject,
            deleteTask,
            editProject,
            editTask,
            getProject,
            handleEditTask,
            handleModalTask,
            newCollaborator,
            newProject,
            newTask,
            setTaskState,
            handleSearcher,
         }}
      >
         {children}
      </Provider>
   )
}
