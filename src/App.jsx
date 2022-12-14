import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from './components';
import { AuthLayout, PrivateRoutes } from './layout';
import { Login, Register, NewPassword, ResetPassword, ConfirmAccount, Projects, NewProject, Project, EditProject, NewCollaborator } from './pages';
import useAuth from './hooks/useAuth';

export const App = () => {

  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />
  }

  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='registro' element={<Register />} />
        <Route path='olvide-pass' element={<ResetPassword />} />
        <Route path='olvide-pass/:token' element={<NewPassword />} />
        <Route path='confirmar/:token' element={<ConfirmAccount />} />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>

      <Route path='/proyectos' element={<PrivateRoutes />} >
        <Route index element={<Projects />} />
        <Route path='nuevo' element={<NewProject />} />
        <Route path='nuevo-colaborador/:id' element={<NewCollaborator />} />
        <Route path=':id' element={<Project />} />
        <Route path='editar/:id' element={<EditProject />} />
      </Route>
    </Routes>
  )
}

