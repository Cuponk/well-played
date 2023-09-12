import jwtFetch from "./jwt";

const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";

const receiveReviews = (reviews) => ({
    type: RECEIVE_REVIEWS,
    reviews,
});

export const getReviews = (id) => async (dispatch) => {
    const res = await jwtFetch(`/api/reviews/reviews/${id}`);
    const reviews = await res.json();
    return dispatch(receiveReviews(reviews));
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
        default:
            return state;
    }
}

export default reviewsReducer;