import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SchoolsContext } from "../context/SchoolsContext";
import SchoolsList from "../apis/SchoolsList";
import Professors from "../components/Professors";
import AddProfessor from "../components/AddProfessor";


const School = () => {
  const {id, id1} = useParams();
  const{selectedSchool, setSelectedSchool} = useContext(SchoolsContext); 

  useEffect(() => {
    const fetchData = async () =>{
        try {
          const response = await SchoolsList.get(`/${id}/schools/${id1}`);
          setSelectedSchool(response.data.data.schools);
          
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchData();
    },[]);

    return (
      <div>
        <h1 className='font-weight-light display-1 text-center'>{selectedSchool && selectedSchool.school_name}</h1>
        <div className='text-center'>{selectedSchool && (
          <>
            <div className="mt-3">
              <AddProfessor/>
              <Professors/>
            </div>
          </>
        )}</div>
      </div>
)};

export default School;