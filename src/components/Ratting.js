import React, { useState } from "react";
import Rating from "react-rating";
const Ratting = () => {
    const [rating, setRating] = useState(3);

return (
    <div className="ctmstart_rating">
        <Rating
            initialRating={rating}
            emptySymbol={<i className="far fa-star" style={{color:"#D0D5DD"}}></i>}
            fullSymbol={<i className="fa fa-star" style={{color:"#4C60E5"}}></i>}
            onChange={(value) => setRating(value)}
        />
        {/* <p>Your rating:{rating}</p> */}
    </div>
);
};

export default Ratting;
