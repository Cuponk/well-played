import { useEffect, useState } from "react";
import "./GamesIndex.css";
import GameIndexItem from "../GameIndexItem/GameIndexItem";
import jwtFetch from "../../store/jwt";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { fetchWishlist } from "../../store/wishlist";
import { fetchOwnedGames } from "../../store/ownedGames";

function GamesIndex() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [pageButton, setPageButton] = useState(false);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [library, setLibrary] = useState(false);
  const userWishlist = useSelector(state => state.wishlist);
  const userOwnedGames = useSelector(state => state.ownedGames); 
  const currentUser = useSelector(state => state.user);
  const friends = useSelector(state => state.friends);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      search: search,
      genre: genre,
      year: parseYear(year),
    }
    jwtFetch(`/api/igdb/search/advanced/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((fin) => {
        setGames(fin);
      })

    setPageButton(true);
    // if (currentUser) {
      
    //   parseFriends(games);
    // }

  }

  //igdb has offset option for pagination :D
  const handlePaginate = (e) => {
    e.preventDefault();
    setPage(page + 1);
    console.log(page)
    const payload = {
      search: search,
      genre: genre,
      year: parseYear(year),
    }
    console.log(payload);
    jwtFetch(`/api/igdb/search/advanced/page/${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((fin) => {
        setGames([...games, ...fin]);
      })
  }

  const parseYear = (year) => {
    if (!year) {
      return ['', ''];
    }
    const start = new Date(year, 0, 1).getTime(); 
    const end = new Date(year, 11, 31).getTime(); 

    return [start, end];
  }

  //placeholder for friends, copilot did this
  // const parseFriends = (games) => {
  //   const payload = {
  //     games: games,
  //     friends: friends,
  //   }
  //   jwtFetch(`/api/igdb/search/advanced/friends`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .then((res) => res.json())
  //     .then((fin) => {
  //       setGames(fin);
  //     })
      
  // }

  return (
    <>
      <div className="games-index-container">
        <form className="search-form" onSubmit={handleSubmit}>
              <h2>Search for a game</h2>
              <div className="search-form-top">
                <button onClick={handleSubmit} className="submit-button"><i className="fa-solid fa-search"/></button>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search for a game"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            <div className="advanced-dropdown">
              <div className="advanced-dropdown-content">
                <label className="genre"> 
                  <select className="genre-select" onChange={(e) => setGenre(e.target.value)} value={genre}>
                    <option value="">Genre</option>
                    <option value="4">Fighting</option>
                    <option value="5">Shooter</option>
                    <option value="7">Music</option>
                    <option value="8">Platform</option>
                    <option value="9">Puzzle</option>
                    <option value="10">Racing</option>
                    <option value="12">Role-playing (RPG)</option>
                    <option value="14">Sports</option>
                    <option value="15">Strategy</option>
                    <option value="25">Hack and slash/Beat 'em up</option>
                    <option value="31">Adventure</option>
                    <option value="32">Indie</option>
                    <option value="34">Visual Novel</option>
                    <option value="33">Arcade</option>
                    <option value="36">MOBA</option>
                  </select>
                </label>
                <label className="year">
                  <input type="Number" className="year-input" placeholder="Year" onChange={(e) => setYear(e.target.value)} value={year}/>
                </label>
                <label className="wishlist">
                  <input type="checkbox" className="wishlist-checkbox" onClick={() => setWishlist(!wishlist)}/>
                  <span className="wishlist-span">Wishlisted by Friends</span>
                </label>
                <label className="library">
                  <input type="checkbox" className="library-checkbox" onClick={() => setLibrary(!library)}/>
                  <span className="library-span">Owned by friends</span>
                </label>
              </div>
            </div>
        </form>
        <ul className="games-index">
            {games.map((game) => 
              <>
                <GameIndexItem game={game} key={game.id} wishlist={userWishlist} ownedGames={userOwnedGames}/>
              </>
            )}
        </ul>
        <button onClick={handlePaginate} className={"load-more " + (pageButton ? "" : "hidden")}>Load More Results</button>
      </div>
    </>
  )
}

export default GamesIndex;
