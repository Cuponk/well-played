import React from 'react';

const Review = ({review}) => {

    return (
        <div className='review-box'>
            <div className="author">
                <i className='fa-regular fa-user'></i>
                <h1>{review.authorId.username}</h1>
            </div>
            <h2>Overall: {review.overallRating}</h2>
            <div className="sub-ratings">
                <h3>Gameplay: {review.gameplayRating}</h3>
                <h3>Visuals: {review.visualsRating}</h3>
                <h3>Story: {review.storyRating}</h3>
            </div>
            <p>{review.description}</p>
        </div>
    )
}

export default Review;