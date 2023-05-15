import { useState, createContext } from "react";

export const SchoolsContext = createContext();

export const SchoolsContextProvider =  props => {
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);

    const addSchools  = (school) => {
        setSchools([...schools, school]);
    }

    return(
       < SchoolsContext.Provider 
            value={{schools, setSchools, selectedSchool, setSelectedSchool, addSchools}}>
            {props.children}
       </SchoolsContext.Provider>
)}; 