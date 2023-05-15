import { useContext, useState } from "react";
import SchoolsList from "../apis/SchoolsList";
import { SchoolsContext } from "../context/SchoolsContext";

const AddSchools = () => {

    const {addSchools} = useContext(SchoolsContext);
    const [name, setName] = useState ('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await SchoolsList.post('/',{
                school_name: name,
            });
            addSchools(response.data.data.schools);
            
        } catch (err) {
            console.log(err.message);  
        }
    };

    return (
        <div className='mb-4'>
            <form id='school-add-form' className='row'>
                <div className='col mx-sm-3 mb-2'>
                        <input value={name} 
                            onChange = {e => setName(e.target.value)} 
                            tyoe='text'
                             className='form-control' 
                             placeholder='school name'
                        />
                </div>
                <div className='col mb-2'>
                    <button onClick={handleSubmit} type='submit' className='btn btn-primary mx-sm-3 mb-2'>ADD</button>
                </div>
            </form>
        </div>
  
)};

export default AddSchools;
