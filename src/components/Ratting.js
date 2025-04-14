import React, { useState } from "react";
import Rating from "react-rating";
import { updateAassignmentTypeUserAnswerUpdateAPI } from "../services/provider";
const Ratting = ({rating, setRating,id}) => {
    // const [rating, setRating] = useState(3);
    const handleRating=async(uid,Val)=>{
        try {
            setRating({...rating,[uid]:Val})
            const formData = new FormData();
            formData.append('score',Val)
            const reponse = await updateAassignmentTypeUserAnswerUpdateAPI(formData,uid)
            if(reponse?.data?.success){
            }
        } catch (error) {
            console.log(error)            
        }
    }
// console.log(rating[id],id)
// console.log(rating)
return (
    <div className="ctmstart_rating">
        <Rating
            initialRating={rating?.[id]}
            emptySymbol={<i className="far fa-star" style={{color:"#D0D5DD"}}></i>}
            fullSymbol={<i className="fa fa-star" style={{color:"#4C60E5"}}></i>}
            onChange={(value) => handleRating(id,value)}
        />
        {/* <p>Your rating:{rating}</p> */}
    </div>
);
};

export default Ratting;
