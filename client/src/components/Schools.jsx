import { useEffect, useContext } from "react";
import SchoolsList from "../apis/SchoolsList";
import { SchoolsContext } from "../context/SchoolsContext";
import { useNavigate, useParams } from "react-router-dom";

const Schools = (props) => {
    const {schools, setSchools} = useContext(SchoolsContext);
    const {id} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SchoolsList.get(`/schools`);
                setSchools(response.data.data.schools);
            } catch (err) {
                console.log(err.message);  
            }
        };
        fetchData(); 
    },[]);

    const handleDelete = async (e, id1) => {
        e.stopPropagation();

        try {
            const response = await SchoolsList.delete(`/${id}/schools/${id1}`);
                setSchools(schools.filter(school => {
                    return school.school_id !== id1     
                }))
        } catch (err) {
            console.log(err.message);
        }
    };
    
    const handleSelect = (e, id1) => {
        e.stopPropagation();

        navigate(`/${id}/schools/${id1}`);
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
