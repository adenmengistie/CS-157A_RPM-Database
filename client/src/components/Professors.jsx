import { useEffect, useContext } from "react";
import SchoolsList from "../apis/SchoolsList";
import { ProfessorsContext } from "../context/ProfessorsContext";
import { useNavigate, useParams } from "react-router-dom";

const Professors = (props) => {
    const {professors, setProfessors} = useContext(ProfessorsContext);
    const {id, id1} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SchoolsList.get(`/${id}/schools/${id1}/professors`);
                setProfessors(response.data.data.professors);
            } catch (err) {
                console.log(err.message);  
            }
        };
        fetchData(); 
    },[]);

    const handleDelete = async (e, id2) => {
        e.stopPropagation();

        try {
            const response = await SchoolsList.delete(`/${id}/schools/${id1}/professors/${id2}`);
                setProfessors(professors.filter(professor => {
                    return professor.professor_id !== id2     
                }))
        } catch (err) {
            console.log(err.message);
        }
    };
    
    const handleSelect = (e, id2) => {
        e.stopPropagation();

        navigate(`/${id}/schools/${id1}/professors/${id2}`);
    };

    return (
        <div className='list-group'>
            <table className="table table-hover table-light">
                <thead>
                    <tr className='text-center'>
                        <th scope="col">Professor Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">DELETE</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {professors && professors.map(professor => { 
                        return(
                            <tr onClick={(e) => handleSelect(e, professor.professor_id)} key={professor.professor_id}> 
                                <td>{professor.professor_name}</td>
                                <td>{professor.department}</td>
                                <td><button onClick={(e) => handleDelete(e, professor.professor_id)} 
                                    type='submit' className='btn btn-danger'>DELETE</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
)};

export default Professors;