import React, { useState } from "react";
import "./CreateReview.css";
import { useDispatch } from "react-redux";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function CreateReview({ game, closeModal, user }) {
  const dispatch = useDispatch();
  const ratingCategories = ["Overall", "Gameplay", "Visuals", "Story"];
  const [hoverRatingValue, setHoverRatingValue] = useState({
    "Overall": 0,
    "Gameplay": 0,
    "Visuals": 0,
    "Story": 0
  });
  // const [hoverRatingValue, setHoverRatingValue] = useState({ rating: '', num: 0 });
  const [ratingValue, setRating] = useState({ Overall: 0, Gameplay: 0, Visuals: 0, Story: 0 });

  const handleBackgroundClick = (e) => {
    e.stopPropagation();
    closeModal();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const review = {
    //   userId: user.id,
    //   gameId: game.id,
    //   rating: ratingValue,
    //   body: e.target.body.value
    // }
    // dispatch(createReview(review));
    // closeModal();
  }

  return (
    <div className="modal">
      <div className="modal-background" onClick={handleBackgroundClick}></div>
      <div className="modal-content">
        <form className="create-review-form" onSubmit={handleSubmit}>
          <div className="create-review-header">
            <h1 className="create-review-title">Create a Review</h1>
            <h3 className="create-review-game-title">{game.name}</h3>
          </div>
          <div className="create-review-rating">
            {ratingCategories.map((category, i) => {
              return (
                <div className="create-review-rating-category" key={i}>
                  <h4 className="create-review-rating-category-title">{category}</h4>
                  <div className="create-review-rating-category-stars">
                    {[1, 2, 3, 4, 5].map((num) => {
                      return (
                        <div
                          className="create-review-rating-category-star"
                          key={num}
                          onMouseEnter={() => setHoverRatingValue({ ...hoverRatingValue, [category]: num })}
                          onMouseLeave={() => setHoverRatingValue({ rating: '', num: 0 })}
                        >
                          {num <= hoverRatingValue[category] || num <= ratingValue[category] ? (
                            <AiFillStar
                              className="create-review-rating-category-star-icon"
                              onClick={() => setRating({ ...ratingValue, [category]: num })}
                            />
                          ) : (
                            <AiOutlineStar
                              className="create-review-rating-category-star-icon"
                              onClick={() => setRating({ ...ratingValue, [category]: num })}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="create-review-body">
            <textarea className="create-review-body-textarea" placeholder="Write your review here..."></textarea>
          </div>
          <div className="create-review-submit">
            <button>Submit Review</button>
          </div>
        </form>
      </div >
    </div >
  )
}

export default CreateReview;
