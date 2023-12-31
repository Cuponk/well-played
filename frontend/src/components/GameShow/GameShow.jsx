import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import defaultImage from "../../assets/images/drawing-large.png";
import { useState, useEffect } from "react";
import jwtFetch from "../../store/jwt";
import "./GameShow.css";
import OwnedGamesButton from "../OwnedGamesButton/OwnedGamesButton";
import WishlistButton from "../WishlistButton/WishlistButton";
import { useDispatch } from "react-redux";
import LibraryButton from "../../assets/images/add-to-library.svg";
import FilledLibraryButton from "../../assets/images/filled-library.svg";
import wishlistButton from "../../assets/images/wishlist.svg";
import FilledWishlistButton from "../../assets/images/filled-heart.svg";
import { useSelector } from "react-redux";
import Review from "../ReviewItem/ReviewItem";
import CreateReview from "../CreateReview/CreateReview";
import { getReviews } from "../../store/reviews";
import RatingsBar from "../RatingsBar/RatingsBar";

const GameShow = () => {
	const { id } = useParams();
	const currentUser = useSelector(state => state.user);
	const [loaded, setLoaded] = useState(false);
	const [game, setGame] = useState({});
	const [cover, setCover] = useState("");
	const [background, setBackground] = useState("");
	const [screenshots, setScreenshots] = useState([]);
	const ownedGames = useSelector(state => state.ownedGames);
	const wishlist = useSelector(state => state.wishlist);
	const reviews = useSelector(state => Object.values(state.reviews));

	const [ownedIcon, setOwnedIcon] = useState(() => {
		return id.toString() in ownedGames ? FilledLibraryButton : LibraryButton;
	});
	const dispatch = useDispatch();
	const [wishlistIcon, setWishlistIcon] = useState(() => {
		return id.toString() in wishlist ? FilledWishlistButton : wishlistButton;
	});
	const [showCreateReview, setShowCreateReview] = useState(false);

	const parseImages = (url, type) => {
		if (!url) {
			return defaultImage;
		}
		return url.replace("t_thumb", type);
	}

	const parseDate = (date) => {
		let newDate = new Date(date * 1000);
		if (newDate.getFullYear()) {
			return newDate.getFullYear();
		} else {
			return "No Date Found";
		}
	};

	const gameData = {
		gameId: game?.id,
		name: game?.name,
		coverUrl: parseImages(game?.cover?.url, "t_1080p"),
		releaseYear: parseDate(game?.first_release_date)
	}

	const handleRating = (type) => {
		if (reviews.length > 0) {
			let sum = 0;
			reviews.map(review => {
				sum += review[type];
			})
			const avg = sum / reviews.length;
			return avg.toFixed(2);
		}
		return 0;
	}

	useEffect(() => {
		jwtFetch(`/api/igdb/${id}`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data[0]);
				setGame(data[0]);
				setCover(parseImages(data[0].cover?.url, "t_cover_big"));
				if (data[0].screenshots) {
					setBackground(
						parseImages(data[0].screenshots[0].url, "t_1080p")
					);
					setScreenshots(
						data[0].screenshots
							.slice(1)
							.map((screenshot) =>
								parseImages(screenshot.url, "t_screenshot_big")
							)
					);
					setLoaded(true);
				} else {
					setBackground(defaultImage);
					setScreenshots([]);
					setLoaded(true);
				};
			});
	}, [id]);

	useEffect(() => {
		dispatch(getReviews(id));
	}, [dispatch, id]);

	return (
		loaded && (
			<>
				<div className="top-half">
					<img src={background} className="hero-image" />
					<div className="game-header">
						<img src={cover} className="game-cover" />
						<div className="game-info">
							<h1 className="game-title">{game.name}</h1>
							<p className="game-dev-release">
								{game.involved_companies ? game.involved_companies[0].company.name : ""}
								&nbsp;|&nbsp;
								{parseDate(game.first_release_date)}
							</p>
							<p className="game-description">{game.summary}</p>
							<div className="buttons">
								<OwnedGamesButton gameData={gameData} icon={ownedIcon} setIcon={setOwnedIcon} />
								<WishlistButton gameData={gameData} icon={wishlistIcon} setIcon={setWishlistIcon} />
							</div>
						</div>
					</div>
				</div>
				<div className="game-user-info">
					<div className="total-rating-base">
						<div className="rating-header">
							<p>Ratings and Reviews</p>
							{currentUser.id &&
							<button className="add-review" onClick={() => setShowCreateReview(true)}>Create a Review</button>}
							{/* Hide the add review button unless a user is logged in */}
							{showCreateReview && <CreateReview game={game} closeModal={() => setShowCreateReview(false)} user={currentUser} />}
						</div>
						<div className="total-rating">
							<p className="overall-rating-text">{handleRating('overallRating')} </p>
							<i className="fa-solid fa-star total-rating-star-icon"/>
						</div>
						<div className="total-sub-rating">
							<RatingsBar type={"Gameplay"} rating={handleRating('gameplayRating')}/> 
							<RatingsBar type={"Story"} rating={handleRating('storyRating')}/>
							<RatingsBar type={"Visuals"} rating={handleRating('visualsRating')}/>
						</div>
					</div>
					<div className="reviews">
						{reviews.map((review) => (
							<Review review={review} />
						))}
					</div>
				</div>
			</>
		)
	);
};

export default GameShow;
