import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SchoolsContext } from "../context/SchoolsContext";
import SchoolsList from "../apis/SchoolsList";

const School = () => {
  const {id} = useParams();
  const{selectedSchool, setSelectedSchool} = useContext(SchoolsContext); 

  useEffect(() => {
    const fetchData = async () =>{
        try {
          const response = await SchoolsList.get(`/${id}`);
          setSelectedSchool(response.data.data.schools);
          
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchData();
    },[]);

    return (
      <div>
        <h1 className='text-center'>{selectedSchool && selectedSchool.school_name}</h1>
      </div>
)};

export default School;