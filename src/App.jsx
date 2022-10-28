import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layout';
import { Login, Register, NewPassword, ResetPassword, ConfirmAccount } from './pages';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='registro' element={<Register />} />
          <Route path='olvide-pass' element={<ResetPassword />} />
          <Route path='olvide-pass/:token' element={<NewPassword />} />
          <Route path='olvide-pass/:token' element={<NewPassword />} />
          <Route path='confirmar/:id' element={<ConfirmAccount />} />
          
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

