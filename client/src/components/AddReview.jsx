import { useContext, useState } from "react";
import SchoolsList from "../apis/SchoolsList";
import { ReviewsContext } from "../context/ReviewsContext";
import { useParams } from "react-router-dom";

const AddReview = () => {
    const{id, id1, id2} = useParams();
    const {addReviews} = useContext(ReviewsContext);
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`

    const [course_name, setCourseName] = useState ('');
    const [rating, setRating] = useState ('Rating');
    const [attendance, setAttendance] = useState ('Attendance');
    const [textbook, setTextbook] = useState ('Textbook');
    const [forCredit, setForCredit] = useState ('For Credit');
    const [takeAgain, setTakeAgain] = useState ('Would Retake Again?');
    const [quality, setQuality] = useState ('Quality');
    const [difficulty, setDifficulty] = useState ('Difficulty');
    const [review_description, setReviewDescription] = useState ('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await SchoolsList.post(`/${id}/schools/${id1}/professors/${id2}`,{
                course_name,
                date,
                rating,
                attendance,
                textbook,
                for_credit: forCredit,
                would_take_again: takeAgain,
                quality,
                difficulty,
                review_description
            });
            addReviews(response.data.data.reviews);
            setCourseName('');
            setRating('Rating');
            setAttendance('Attendance');
            setTextbook('Textbook');
            setForCredit('For Credit');
            setTakeAgain("Would Take Again?");
            setQuality('Quality');
            setDifficulty('Difficulty');
            setReviewDescription('');
            
        } catch (err) {
            console.log(err.message);  
        }
    };

  return (
    <div className="card border-dark mb-2">
        <form id='add-review-form' action="">
            <label>REVIEW FORM</label>
            <div className='form-row'>
                <div className='col mx-sm-3 mb-2'>
                        <label htmlFor="course_name"></label>
                        <textarea value={course_name} 
                            onChange = {e => setCourseName(e.target.value)} 
                            tyoe='text'
                             className='form-control border-dark' 
                             placeholder='Course Name'
                        />
                    </div>
                    <div className="form-group  mx-sm-3 d-flex justify-content-between">
                        <select className="form-select form-select-sm border-dark"
                            value={rating}
                            onChange = {e => setRating(e.target.value)}>
                                <option disabled>Rating</option>
                                <option value="1">Awful</option>
                                <option value="2">Ok</option>
                                <option value="3">Good</option>
                                <option value="4">Great</option>
                                <option value="5">Awesome</option>
                        </select>

                        <select className="form-select form-select-sm border-dark"
                            value={attendance}
                            onChange = {e => setAttendance(e.target.value)}>
                                <option disabled>Attendance</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                        </select>
            
                        <select className="form-select form-select-sm border-dark"
                            value={textbook}
                            onChange = {e => setTextbook(e.target.value)}>
                                <option disabled>Textbook</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                        </select>

                        <select className="form-select form-select-sm border-dark"
                            value={forCredit}
                            onChange = {e => setForCredit(e.target.value)}>
                                <option disabled>For Credit</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                        </select>
                    </div>
                    <div className="form-group mx-sm-3 d-flex justify-content-between my-3">

                        <select className="form-select form-select-sm border-dark"
                            value={takeAgain}
                            onChange = {e => setTakeAgain(e.target.value)}>
                                <option disabled>Would Retake Again?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                        </select>

                        <select className="form-select form-select-sm border-dark"
                            value={quality}
                            onChange = {e => setQuality(e.target.value)}>
                                <option disabled>Quality</option>
                                <option value="1.0">1.0</option>
                                <option value="2.0">2.0</option>
                                <option value="3.0">3.0</option>
                                <option value="4.0">4.0</option>
                                <option value="5.0">5.0</option>
                        </select>

                        <select className="form-select form-select-sm border-dark"
                            value={difficulty}
                            onChange = {e => setDifficulty(e.target.value)}>
                                <option disabled>Difficulty</option>
                                <option value="1.0">1.0</option>
                                <option value="2.0">2.0</option>
                                <option value="3.0">3.0</option>
                                <option value="4.0">4.0</option>
                                <option value="5.0">5.0</option>
                        </select>
                    </div>
   
                    <div className='col mx-sm-3 mb-2'>
                        <label htmlFor="review_description"></label>
                        <textarea value={review_description} 
                            onChange = {e => setReviewDescription(e.target.value)} 
                            tyoe='text'
                             className='form-control border-dark' 
                             placeholder='Review Description'
                        />
                    </div>
                </div>
                <div className='col mb-2'>
                    <button onClick={handleSubmit} type='submit' className='btn btn-primary mx-sm-3 mb-2'>Submit</button>
                </div>
            </form>
    </div>
    )
}

export default AddReview;
