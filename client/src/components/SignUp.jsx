import { useContext, useState } from "react";
import SchoolsList from "../apis/SchoolsList";
import {UsersContext } from "../context/UsersContext";
import {Link, useNavigate} from "react-router-dom"


const Login = () => {
    const navigate = useNavigate();
    const {addUser} = useContext(UsersContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
             const response = await SchoolsList.post('/Signup',{
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            });
            addUser(response.data.data.users);
            response && navigate(`/`);
        } catch (err) {
            setErrorMessage('Invalid - Error occured during SignUp');
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
                    <label htmlFor="firstName">First Name</label>
                        <input id="firstName" 
                            type="firstName" 
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="form-control"  
                            placeholder="First Name"
                        />
            
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" 
                            type="lastName" 
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="form-control"  
                            placeholder="Last Name"
                        />
            
                </div>                               
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
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">SignUp</button>
                <h4 className="">Need an account? 
                    <Link className="" to='/'>Login</Link>
                </h4>
            </form>
        </div>
)};

export default Login;
