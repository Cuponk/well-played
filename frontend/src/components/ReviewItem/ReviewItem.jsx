import React from 'react';
import './index.css';

const Review = ({review}) => {

    let starIcon;

    switch (review?.overallRating) {
        case 1:
            starIcon = 
            <>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
            </>
            break;
        case 2:
            starIcon = 
            <>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
            </>
            break;
        case 3:
            starIcon =
            <>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
            </>
            break;
        case 4:
            starIcon =
            <>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star'></i>
            </>
            break;
        case 5:
            starIcon =
            <>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
            </>
            break;
        default:
            starIcon = null;
            break;
    }

    return (
        <div className='review-box'>
            <div className="author">
                <i className='fa-regular fa-user'></i>
                {starIcon}
                <p>{review?.authorId?.username}</p>
            </div>
            <div className="sub-ratings">
                <h3>Gameplay: {review?.gameplayRating}</h3>
                <h3>Visuals: {review?.visualsRating}</h3>
                <h3>Story: {review?.storyRating}</h3>
            </div>
            <p>{review?.description}</p>
        </div>
    )
}

export default Review;