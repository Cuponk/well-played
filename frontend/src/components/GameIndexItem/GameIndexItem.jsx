import "./GameIndexItem.css";
import defaultImage from "../../assets/images/drawing.jpg";
import { ReactComponent as LibraryAdd } from "../../assets/images/add-to-library.svg";
import { ReactComponent as Wishlist } from "../../assets/images/wishlist.svg";
import OwnedGamesButton from "../OwnedGamesButton/OwnedGamesButton";
import WishlistButton from "../WishlistButton/WishlistButton";

function GameIndexItem({ game, id }) {

  const parseImages = (url, type) => {
    if (!url) {
      return defaultImage;
    }
    return url.replace("t_thumb", type);
  }

  const handleRedirect = (id) => {
    //github copilot told me to do this and it worked
    window.location.href = `/games/${game.id}`;
  }

  const parseDate = (date) => {
    let newDate = new Date(date * 1000);
    if (newDate.getFullYear()) {
      return newDate.getFullYear();
    } else {
      return 'No Date Found'
    }
  }

  const gameData = {
	gameId: game?.id,
	name: game?.name,
	coverUrl: parseImages(game?.cover?.url, "t_1080p"),
	releaseYear: parseDate(game?.first_release_date)
}

  return (
    <button className="game-item">
      <img src={parseImages(game.cover?.url, 't_cover_small')} className="index-cover" onClick={handleRedirect} />
      <div className="game-readable">
        <div className="game-details">
          <p>{game.name}</p>
          <p>{game.involved_companies ? game.involved_companies[0].company.name : 'No Company Found'}</p>
          <p>{game.genres ? game.genres[0].name : ''}</p>
          <p>{parseDate(game.first_release_date)}</p>
        </div>
        <div className="game-buttons">
		  <OwnedGamesButton gameData={gameData}/>
		  <WishlistButton gameData={gameData} />
        </div>
      </div>
    </button>
  )
}

export default GameIndexItem;
