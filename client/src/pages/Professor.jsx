import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProfessorsContext } from "../context/ProfessorsContext";
import SchoolsList from "../apis/SchoolsList";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const Professor = () => {
  const {id, id1, id2} = useParams();
  const{selectedProfessor, setSelectedProfessor} = useContext(ProfessorsContext); 

  useEffect(() => {
    const fetchData = async () =>{
        try {
          const response = await SchoolsList.get(`/${id}/schools/${id1}/professors/${id2}`);
          setSelectedProfessor(response.data.data.professors);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchData();
    },[]);

    return (
      <div>
        <h1 className='font-weight-light display-1 text-center'>{selectedProfessor && selectedProfessor.professor_name}</h1>
        <h4 className="text-center">{selectedProfessor && selectedProfessor.department}</h4>
        <div className='text-center'>{selectedProfessor && (
          <>
            <div className="mt-3">
              <Reviews/>
              <AddReview/>
            </div>
          </>
        )}</div>
      </div>
)};

export default Professor;