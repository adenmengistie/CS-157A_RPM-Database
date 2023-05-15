import { useContext, useState } from "react";
import SchoolsList from "../apis/SchoolsList";
import { ProfessorsContext } from "../context/ProfessorsContext";
import { useParams } from "react-router-dom";

const AddProfessors = () => {
    const{id, id1} = useParams();
    const {addProfessors} = useContext(ProfessorsContext);
    const [name, setName] = useState ('');
    const [department, setDepartment] = useState ('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await SchoolsList.post(`/${id}/schools/${id1}/professors`,{
                professor_name: name,
                department
            });
            addProfessors(response.data.data.professors);
        } catch (err) {
            console.log(err.message);  
        }
    };  

    return (
        <div className='mb-4'>
            <form id='add-school-form' className='row'>
                <div className='col mx-sm-3 mb-2'>
                        <input value={name} 
                            onChange = {e => setName(e.target.value)} 
                            tyoe='text'
                             className='form-control' 
                             placeholder='Professor Name'
                        />
                </div>

                <div className='col mx-sm-3 mb-2'>
                        <input value={department} 
                            onChange = {e => setDepartment(e.target.value)} 
                            tyoe='text'
                             className='form-control' 
                             placeholder='Department'
                        />
                </div>
                <div className='col mb-2'>
                    <button onClick={handleSubmit} type='submit' className='btn btn-primary mx-sm-3 mb-2'>ADD</button>
                </div>
            </form>
        </div>
  
)};

export default AddProfessors;