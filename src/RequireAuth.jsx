import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const RequireAuth = ({ isLoggedIn, setIsLoggedIn, setAccessToken }) => {

    useEffect(() => {
        const fun = async () => {
        try {
            const refreshResponse = await fetch('http://localhost:3500/refresh', {
            credentials: 'include'
            })
            if(!refreshResponse.ok) {
            if(refreshResponse.status === 403) {
                alert('Session expired. Please login again.')
                // navigate('/admin/login')
                setIsLoggedIn(false)
                return
            }
            else throw new Error(`${refreshResponse.status} ${refreshResponse.statusText}`)
            }        
            setIsLoggedIn(true)
            const data = await refreshResponse.json()
            setAccessToken(data.accessToken)
        } catch(error) {
            alert(`Error logging in: ${error.message}`)
        }
        }

        fun()
    }, [])
        
    return isLoggedIn === true
        ? <Outlet />
        : isLoggedIn === false ? <Navigate to="/admin/login" replace />
        : <p>Loading...</p>
}

export default RequireAuth