import { useState, createContext } from "react";

export const ProfessorsContext = createContext();

export const ProfessorsContextProvider =  props => {
    const [professors, setProfessors] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(null);

    const addProfessors  = (professor) => {
        setProfessors([...professors, professor]);
    }

    return(
       < ProfessorsContext.Provider 
            value={{professors, setProfessors, selectedProfessor, setSelectedProfessor, addProfessors}}>
            {props.children}
       </ProfessorsContext.Provider>
)}; 