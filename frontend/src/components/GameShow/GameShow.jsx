import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import defaultImage from "../../assets/images/drawing-large.png";
import { useState, useEffect } from "react";
import jwtFetch from "../../store/jwt";
import "./GameShow.css";
import OwnedGamesButton from "../OwnedGamesButton/OwnedGamesButton";
import WishlistButton from "../WishlistButton/WishlistButton";

import LibraryButton from "../../assets/images/add-to-library.svg";
import FilledLibraryButton from "../../assets/images/filled-library.svg";
import wishlistButton from "../../assets/images/wishlist.svg";
import FilledWishlistButton from "../../assets/images/filled-heart.svg";
import { useSelector } from "react-redux";

const GameShow = () => {
	const { id } = useParams();
	const [loaded, setLoaded] = useState(false);
	const [game, setGame] = useState({});
	const [cover, setCover] = useState("");
	const [background, setBackground] = useState("");
	const [screenshots, setScreenshots] = useState([]);
	const ownedGames = useSelector(state => state.ownedGames);
	const wishlist = useSelector(state => state.wishlist);

	const [ownedIcon, setOwnedIcon] = useState(() => {
		return id.toString() in ownedGames ? FilledLibraryButton : LibraryButton;
	});

	const [wishlistIcon, setWishlistIcon] = useState(() => {
		return id.toString() in wishlist ? FilledWishlistButton : wishlistButton;
	});

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
				<div className="bottom-half"></div>
			</>
		)
	);
};

export default GameShow;
