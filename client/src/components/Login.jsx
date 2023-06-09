import { useContext, useState } from "react";
import SchoolsList from "../apis/SchoolsList";
import { UsersContext } from "../context/UsersContext";
import {Link, useNavigate} from "react-router-dom"


const Login = () => {
    const navigate = useNavigate();
    const{loggedUser, setLoggedUser} = useContext(UsersContext); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await SchoolsList.get(`/${email}/${password}`,{
                email: email,
                password: password
            });
            setLoggedUser(response.data.data.users);
            navigate(`/${response.data.data.users.usr_id}/schools`);
        } catch (err) {
            setErrorMessage('Invalid - Error occured during Login');
            console.log(err.errorMessage);
        }
    };    
    return (
        <div>
            <form>
                {errorMessage && (
                    <div className="text-sm text-danger">
                        {errorMessage}
                    </div>
                    )
                }

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
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
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Login</button>
                <h4 className="">Need an account? 
                    <Link className="" to='/Signup'> Sign Up</Link>
                </h4>
            </form>
        </div>
)};

export default Login;
