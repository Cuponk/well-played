import React, { useState } from "react";
import "./CreateReview.css";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";

function CreateReview({ game, closeModal, user }) {
  const dispatch = useDispatch();
  const ratingCategories = ["Overall", "Gameplay", "Visuals", "Story"];
  const [hoverRatingValue, setHoverRatingValue] = useState({
    "Overall": 0,
    "Gameplay": 0,
    "Visuals": 0,
    "Story": 0
  });
  const [ratingValue, setRating] = useState({ Overall: 0, Gameplay: 0, Visuals: 0, Story: 0 });
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const handleBackgroundClick = (e) => {
    e.stopPropagation();
    closeModal();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ratingValue.Overall === 0 || ratingValue.Gameplay === 0 || ratingValue.Visuals === 0 || ratingValue.Story === 0) {
      setErrors(["Please fill out all of the ratings and try submitting again."]);
      return;
    }
    const reviewData = {
      authorId: user.id,
      gameId: game.id,
      description: body,
      overallRating: ratingValue.Overall,
      gameplayRating: ratingValue.Gameplay,
      storyRating: ratingValue.Story,
      visualsRating: ratingValue.Visuals
    }
    dispatch(createReview(reviewData));
    closeModal();
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
                            <i

                              className="fa-solid fa-star create-review-rating-category-star-icon"
                              onClick={() => setRating({ ...ratingValue, [category]: num })}
                            />
                          ) : (
                            <i
                              className="fa-regular fa-star create-review-rating-category-star-icon"

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
            <textarea className="create-review-body-textarea" placeholder="Write your review here..." onChange={e => setBody(e.currentTarget.value)} required></textarea>
          </div>
          <div className="inputErrors"><p>{errors}</p></div>
          <div className="create-review-submit">
            <button>Submit Review</button>
          </div>
        </form>
      </div >
    </div >
  )
}

export default CreateReview;
