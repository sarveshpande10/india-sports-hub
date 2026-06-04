import { Link, useNavigate } from "react-router-dom"
import { useRef, useEffect } from "react"

const AdminRegister = ({ user, setUser }) => {
    const userRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3500/register', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                }, 
                body: JSON.stringify(user)
            })
            setUser({
                username: '',
                password: ''
            })
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            else {
                console.log("succes123");
                
                navigate('/admin')
            }

        } catch(error) {
            alert(`Error Signing Up: ${error.message}`)
        }
    }

    return (
        <div className="form-outer">
            <h2>SIGN UP</h2>
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
                <button type="submit" className="done-button">Sign Up</button>
            </form>

            <div>
                <p>Already Registered?
                <Link to={'/admin/login'}> Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default AdminRegister