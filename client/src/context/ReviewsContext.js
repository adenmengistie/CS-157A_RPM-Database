import { useState, createContext } from "react";

export const ReviewsContext = createContext();

export const ReviewsContextProvider =  props => {
    const [reviews, setReviews] = useState([]);

    const addReviews = (review) => {
        setReviews([...reviews, review]);
    }

    return(
       < ReviewsContext.Provider 
            value={{reviews, setReviews, addReviews}}>
            {props.children}
       </ReviewsContext.Provider>
)}; 