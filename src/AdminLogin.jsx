import { Link, useNavigate } from "react-router-dom"
import { useRef, useEffect } from "react"

const AdminLogin = ({ user, setUser, setIsLoggedIn, setAccessToken }) => {
    const userRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3500/login', {
                method: 'POST', 
                credentials: 'include', 
                headers: {
                    'Content-type': 'application/json'
                }, 
                body: JSON.stringify(user)
            })

            setUser({
                username: '',
                password: ''
            })

            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
            
            const data = await response.json()

            console.log("succes123");
            setIsLoggedIn(true)
            setAccessToken(data.accessToken)
            navigate('/admin')

        } catch(error) {
            alert(`Error Logging In: ${error.message}`)
        }
    }

    return (
        <div className="form-outer">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="Username" 
                        ref={userRef}
                        required
                        autoComplete="off"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Password"
                        required
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <button type="submit" className="done-button">Login</button>
            </form>

            <div>
                <Link to={'#'}>Forgot Password?</Link>
                <p>New User?
                <Link to={'/admin/register'}> Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default AdminLogin