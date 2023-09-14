import React, { useEffect } from 'react';
import './index.css';

const Review = ({review}) => {
const getStars = (num) => {
    let starIcon;

        switch (num) {
            case 1:
                starIcon = 
                <div className='stars'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                </div>
                break;
            case 2:
                starIcon = 
                <div className='stars'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                </div>
                break;
            case 3:
                starIcon =
                <div className='stars'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                </div>
                break;
            case 4:
                starIcon =
                <div className='stars'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-regular fa-star'></i>
                </div>
                break;
            case 5:
                starIcon =
                <div className='stars'>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                </div>
                break;
            default:
                starIcon = null;
                break;
        }
        return starIcon;
    }

    return (
        <div className='review-box'>
            <div className="review-left-side">
                <div className="author">
                    <i className='fa-regular fa-user'/>
                    <div className="name-overall">
                        <div className="stars">{getStars(review?.overallRating)}</div>
                        <p>{review?.authorId?.username}</p>
                    </div>
                </div>
                <div className="sub-ratings">
                    <h3>Gameplay <br/> {getStars(review?.gameplayRating)}</h3>
                    <h3>Visuals <br/> {getStars(review?.visualsRating)}</h3>
                    <h3>Story <br/> {getStars(review?.storyRating)}</h3>

                </div>
            </div>
            <div className='review-description'>{review?.description}</div>
        </div>
    )
}

export default Review;