import { useEffect } from "react";
import "./GamesIndex.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../store/games";
import GameIndexItem from "../GameIndexItem/GameIndexItem";

function GamesIndex() {
  const dispatch = useDispatch();
  const games = Object.values(useSelector((state) => state.games));

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <>
      <div className="games-index-container">
        <h1>Well Played Search</h1>
        <h2>Search for a game</h2>
        {games.map((game) => {
          return <GameIndexItem key={game._id} game={game} />;
        })}
      </div>
    </>
  )
}

export default GamesIndex;
