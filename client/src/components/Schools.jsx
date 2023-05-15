import { useEffect, useContext } from "react";
import SchoolsList from "../apis/SchoolsList";
import { SchoolsContext } from "../context/SchoolsContext";
import { useNavigate } from "react-router-dom";

const Schools = (props) => {
    const {schools, setSchools} = useContext(SchoolsContext);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SchoolsList.get('/');
                setSchools(response.data.data.schools);
            } catch (err) {
                console.log(err.message);  
            }
        };
        fetchData(); 
    },[]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();

        try {
            const response = await SchoolsList.delete(`/${id}`);
                setSchools(schools.filter(school => {
                    return school.school_id !== id     
                }))
        } catch (err) {
            console.log(err.message);
        }
    };
    
    const handleSelect = (e, id) => {
        e.stopPropagation();
        
        navigate(`/schools/${id}`);
    };

    return (
        <div className='list-group'>
            <table className="table table-hover table-light">
                <thead>
                    <tr className='text-center'>
                        <th scope="col">School Name</th>
                        <th scope="col">DELETE</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {schools && schools.map(school => { 
                        return(
                            <tr onClick={(e) => handleSelect(e, school.school_id)} key={school.school_id}> 
                                <td>{school.school_name}</td>
                                <td><button onClick={(e) => handleDelete(e, school.school_id)} 
                                    type='submit' className='btn btn-danger'>DELETE</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
)};

export default Schools;
