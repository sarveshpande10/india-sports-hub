import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({ isLoggedIn }) => {

    return isLoggedIn
        ? <Outlet />
        : <Navigate to="/admin/login" replace />
}

export default RequireAuth