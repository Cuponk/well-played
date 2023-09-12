import jwtFetch from "./jwt";

const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";

const receiveReviews = (reviews) => ({
    type: RECEIVE_REVIEWS,
    reviews,
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
});

export const getReviews = (id) => async (dispatch) => {
    const res = await jwtFetch(`/api/reviews/reviews/${id}`);
    const reviews = await res.json();
    return dispatch(receiveReviews(reviews));
}

export const createReview = (review) => async (dispatch) => {
    const res = await jwtFetch(`/api/reviews/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    });
    const newReview = await res.json();
    return dispatch(addReview(newReview));
}

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_REVIEWS:
			const newState = {};
			if (action.reviews.length > 0) {
				action.reviews.forEach((review) => {
					newState[review._id] = review;
				})
			}
            return newState;
        case ADD_REVIEW:
            return { ...state, [action.review._id]: action.review };
        default:
            return state;
    }
}

export default reviewsReducer;
