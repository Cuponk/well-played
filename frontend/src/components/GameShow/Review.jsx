import resct from 'react';

const Review = ({review}) => {

    return (
        <div>
            <h1>Review</h1>
            {review.overallRating}
            {review.gameplayRating}
            {review.visualRating}
            {review.storyRating}
            {review.description}
            {review.username}
        </div>
    )
}

export default Review;