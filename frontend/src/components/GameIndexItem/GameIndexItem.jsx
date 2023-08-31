import "./GameIndexItem.css";
import defaultImage from "../../assets/images/drawing.jpg";

function GameIndexItem({ game, id }) {

  const parseImages = (url, type) => {
    if (!url) {
      return defaultImage;
    }
    return url.replace("t_thumb", type);
}

  return (
    <li className="game-item">
      <p>{game.name}</p>
      <img src={parseImages(game.cover?.url, 't_cover_small')} className="index-cover" />
      <p>{game.genres[0].name ? game.genres[0].name : ''}</p>
    </li>
  )
}

export default GameIndexItem;
