import StarRating from "./StarRating"
import { useEffect, useContext } from "react";
import SchoolsList from "../apis/SchoolsList";
import { ReviewsContext } from "../context/ReviewsContext";
import {useParams } from "react-router-dom";


const Reviews = (props) => {
    const {reviews, setReviews} = useContext(ReviewsContext);
    const {id, id1, id2} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SchoolsList.get(`/${id}/schools/${id1}/professors/${id2}/reviews`);
                setReviews(response.data.data.reviews);
                console.log(response.data.data.reviews);
            } catch (err) {
                console.log(err.message);  
            }
        };
        fetchData(); 
    },[]);

    return (
        <div className="mb-2">
            {reviews && reviews.map(review => { 
                return(
                    <div className='card text-black bg-light border-dark mb-4 mt-2'>
                        <div className="card-header d-flex justify-content-between">
                            <span>
                                <span className='card text-black bg-light'>{review.course_name}</span>
                                <span ><StarRating rating={review.rating}/></span>
                            </span>
                            <span>Date: {review.date}</span>
                        </div>
                        <div className="card-header d-flex justify-content-between">
                            <span>For Credit: <span>{review.for_credit ? 
                                <span>Yes</span> : <span>No</span>}
                            </span></span>
                            <span>Attendance: <span>{review.attendance ? 
                                <span>Yes</span> : <span>No</span>}
                            </span></span>
                            <span>Would Take Again? <span>{review.would_take_again ? 
                                <span>Yes</span> : <span>No</span>}
                            </span></span>
                            <span>Textbook: <span>{review.textbook ? 
                                <span>Yes</span> : <span>No</span>}
                            </span></span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.review_description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
)};

export default Reviews;
