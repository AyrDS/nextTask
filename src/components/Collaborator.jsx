import Swal from 'sweetalert2';
import useProjects from '../hooks/useProjects';

export const Collaborator = ({ collaborator }) => {

   const { deleteCollaborator } = useProjects();
   const { name, email, uid } = collaborator;

   const handleDelete = () => {
      Swal.fire({
         title: '¿Desea eliminar este colaborador del proyecto?',
         text: 'Una vez eliminado, esta persona no podrá acceder al proyecto',
         icon: 'warning',
         showDenyButton: true,
         confirmButtonColor: '#0369a1',
         confirmButtonText: 'Si',
         customClass: {
            confirmButton: 'confirmBtn'
         },
         focusConfirm: false
      }).then(({ value }) => {
         if (!value) return;
         deleteCollaborator(uid);
      })
   }

   return (
      <div className="border-b p-5 flex justify-between items-center" >
         <div>
            <p className="font-bold" >{name}</p>
            <p className="text-sm text-gray-700" >{email}</p>
         </div>

         <div>
            <button
               className="bg-red-600 text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
               onClick={handleDelete}
            >
               Eliminar
            </button>
         </div>
      </div>
   )
}

