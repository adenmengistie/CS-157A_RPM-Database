import { useState } from "react";
import {useNavigate} from "react-router-dom"


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            navigate('/schools');
        } catch (err) {
            console.log(err.message);
        }
    };
        
    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                        <input id="email_input" 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-control"  
                            placeholder="Enter email"
                        />
            
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                        <input id="password_input" 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="form-control"  
                            placeholder="Password"/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
)};

export default Login;
