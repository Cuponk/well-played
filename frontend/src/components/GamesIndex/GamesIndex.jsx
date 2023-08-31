import { useEffect, useState } from "react";
import "./GamesIndex.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../store/games";
import GameIndexItem from "../GameIndexItem/GameIndexItem";
import jwtFetch from "../../store/jwt";

function GamesIndex() {
  // const dispatch = useDispatch();
  // const games = Object.values(useSelector((state) => state.games));
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);

  // useEffect(() => {
  //   // dispatch(fetchGames());
  // }, []);

  const handleSubmit = (e) => {
    //adding the fetch method here for now, will add to redux later
    e.preventDefault();
    jwtFetch(`/api/igdb/search/${search}`)
      .then((res) => res.json())
      .then((fin) => {
        console.log(fin)
        setGames(fin);
      })
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
    console.log("clicked");
  }

  // games.map((game) => {
  //   console.log(game);
  // })

  return (
    <>
      <div className="games-index-container">
        <h2>Search for a game</h2>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a game"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <span className="checkbox">
            <input type="checkbox" className="actual-checkbox" id="dropdown-checkbox" onClick={handleDrop}/>
            <label htmlFor="dropdown-checkbox">
              <i className={`fa-solid fa-caret-up ${dropdown ? "rotate" : ""}`}/>
            </label>
          </span>
          { dropdown && (
            <div className="dropdown">
              not yet
            </div>)}
        </form>
        <ul className="games-index">
            {games.map((game) => 
              <GameIndexItem game={game} key={game.id}/>
            )}
        </ul>
      </div>
    </>
  )
}

export default GamesIndex;
